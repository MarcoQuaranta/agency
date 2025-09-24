import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

import { checkDuplicateSubmission, checkRateLimit,saveSubmission } from '@/lib/db';

// Lista di IP sempre consentiti (per testing)
const WHITELIST_IPS = ['31.156.225.224', '::1', '127.0.0.1'];

// Funzione per ottenere l'IP del client (migliorata per Vercel)
function getClientIP(req: NextRequest): string {
  // Headers Vercel/Cloudflare
  const headers = [
    'x-real-ip',
    'x-forwarded-for',
    'x-client-ip',
    'x-forwarded',
    'forwarded-for',
    'forwarded',
    'cf-connecting-ip', // Cloudflare
    'true-client-ip', // Cloudflare Enterprise
  ];
  
  for (const header of headers) {
    const value = req.headers.get(header);
    if (value) {
      // x-forwarded-for può contenere multiple IP separate da virgole
      const ip = value.split(',')[0].trim();
      if (ip && ip !== 'unknown') {
        return ip;
      }
    }
  }
  
  // Se siamo su Vercel, prova a prendere l'IP dalla connessione
  const ip = req.headers.get('x-vercel-forwarded-for');
  if (ip) {
    return ip.split(',')[0].trim();
  }
  
  // Fallback
  return 'unknown';
}

// Funzione per generare ID progressivo (usa timestamp + random per evitare collisioni)
function getNextCandidateId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 5);
  return `${timestamp}-${random}`;
}

// Configurazione del trasporter per Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    // Gestisce sia JSON normale che Blob da sendBeacon
    let body;
    const contentType = req.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      body = await req.json();
    } else {
      // Per sendBeacon che invia come text/plain o application/octet-stream
      const text = await req.text();
      try {
        body = JSON.parse(text);
      } catch {
        return NextResponse.json(
          { success: false, error: 'Invalid request format' },
          { status: 400 }
        );
      }
    }
    
    const { contactData, questionnaireData, isIncomplete = false, sessionToken } = body;

    // Validazione base
    if (!contactData?.email || !contactData?.nome) {
      return NextResponse.json(
        { success: false, message: 'Dati di contatto mancanti' },
        { status: 400 }
      );
    }

    // Ottieni IP del client
    const clientIP = getClientIP(req);
    const email = contactData.email.toLowerCase();
    
    console.log(`[DEBUG] Richiesta da IP: ${clientIP}, Email: ${email}, Incompleto: ${isIncomplete}`);

    // Se non è in whitelist, applica controlli
    if (!WHITELIST_IPS.includes(clientIP)) {
      // Usa combinazione email + IP per identificare univocamente
      const identifier = `${email}_${clientIP}`;
      
      // Per questionari completi, controlla duplicati nel database
      if (!isIncomplete) {
        // Controlla duplicati nel database (ultimi 24 ore)
        const isDuplicate = await checkDuplicateSubmission(email, clientIP);
        if (isDuplicate) {
          console.log(`[DUPLICATE] Bloccato: ${identifier}`);
          return NextResponse.json({ 
            success: false, 
            message: 'Hai già inviato una candidatura completa nelle ultime 24 ore' 
          });
        }
        
        // I questionari completi possono sempre essere inviati se non sono duplicati
        // Non applicare rate limit per i questionari completi
      }
      
      // Per questionari incompleti, applica rate limit stretto (1 per ora)
      if (isIncomplete) {
        const incompleteIdentifier = `incomplete_${identifier}`;
        const rateLimitCheck = await checkRateLimit(incompleteIdentifier, 1, 60); // SOLO 1 invio per ora
        if (!rateLimitCheck.allowed) {
          console.log(`[RATE LIMIT INCOMPLETE] Bloccato: ${incompleteIdentifier}`);
          return NextResponse.json({ 
            success: false, 
            message: 'Hai già inviato un questionario incompleto. Riprova tra un\'ora o completa il questionario.' 
          });
        }
      }
    }

    // Genera ID candidatura
    const candidateId = getNextCandidateId();

    // Formatta i dati per l'email con HTML
    const formatQuestionnaireData = (data: any) => {
      const sections = [
        {
          title: "🔹 Sezione 1 – Chi sei",
          fields: [
            { label: "Nome del brand/azienda", value: data.brandName },
            { label: "Sito web", value: data.website },
            { label: "Profilo Instagram", value: data.instagram },
            { label: "Profilo TikTok", value: data.tiktok },
            { label: "Profilo Facebook", value: data.facebook },
            { label: "Altri social", value: data.otherSocial },
            { label: "Settore di appartenenza", value: data.sector === 'Altro' ? data.sectorOther : data.sector },
          ]
        },
        {
          title: "🔹 Sezione 2 – I tuoi prodotti",
          fields: [
            { label: "Come nascono i tuoi prodotti", value: data.production === 'Altro' ? data.productionOther : data.production },
            { label: "Gestione disponibilità", value: data.availability === 'Altro' ? data.availabilityOther : data.availability },
            { label: "Prodotto best seller e prezzo", value: data.bestSeller },
            { label: "Margine lordo medio", value: data.margin },
          ]
        },
        {
          title: "🔹 Sezione 3 – Vendite & Marketing",
          fields: [
            { label: "Hai già venduto online", value: data.onlineSales },
            { label: "Ordini mensili medi", value: data.monthlyOrders },
            { label: "Ticket medio", value: data.ticketMedio },
            { label: "Canali marketing attivi", value: Array.isArray(data.marketingChannels) ? data.marketingChannels.join(', ') : data.marketingChannels },
            { label: "Investimento advertising passato", value: data.adInvestment },
          ]
        },
        {
          title: "🔹 Sezione 4 – Logistica",
          fields: [
            { label: "Modalità di spedizione", value: data.shipping === 'Altro' ? data.shippingOther : data.shipping },
            { label: "Gestione resi", value: data.returns },
            { label: "Paesi di spedizione", value: data.countries },
          ]
        },
        {
          title: "🔹 Sezione 5 – Obiettivi e situazione aziendale",
          fields: [
            { label: "Obiettivo principale", value: data.objective === 'Altro' ? data.objectiveOther : data.objective },
            { label: "Fatturato medio mensile", value: data.revenue },
            { label: "Dimensione del team", value: data.team },
            { label: "Principali ostacoli", value: data.obstacles },
          ]
        }
      ];

      return sections.map(section => {
        const sectionHtml = `
          <div style="margin-bottom: 30px;">
            <h3 style="font-size: 18px; color: #2563eb; margin-bottom: 15px; font-weight: bold;">${section.title}</h3>
            <div style="margin-left: 20px;">
              ${section.fields
                .filter(field => field.value)
                .map(field => `<div style="margin-bottom: 8px; font-size: 16px;"><strong>${field.label}:</strong> ${field.value}</div>`)
                .join('')}
            </div>
          </div>
        `;
        return sectionHtml;
      }).join('');
    };

    // Costruisci il messaggio email in HTML
    const emailHtml = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f8fafc; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
          <h1 style="font-size: 28px; color: #1e40af; text-align: center; margin-bottom: 10px;">📋 NUOVA CANDIDATURA SAFESCALE${isIncomplete ? ' - INCOMPLETA' : ''}</h1>
          <p style="text-align: center; font-size: 18px; color: #64748b; margin: 0;">ID Candidatura: <strong>#${candidateId}</strong></p>
          ${isIncomplete ? '<p style="text-align: center; font-size: 16px; color: #dc2626; margin: 10px 0 0 0; font-weight: bold;">⚠️ Questionario chiuso senza completamento</p>' : ''}
        </div>

        <div style="background-color: #eff6ff; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
          <h2 style="font-size: 22px; color: #1e40af; margin-bottom: 20px;">📞 DATI DI CONTATTO</h2>
          <div style="font-size: 16px; line-height: 1.8;">
            <div style="margin-bottom: 8px;"><strong>Nome:</strong> ${contactData.nome}</div>
            <div style="margin-bottom: 8px;"><strong>Cognome:</strong> ${contactData.cognome}</div>
            <div style="margin-bottom: 8px;"><strong>Telefono:</strong> ${contactData.telefono}</div>
            <div style="margin-bottom: 8px;"><strong>Email:</strong> ${contactData.email}</div>
          </div>
        </div>

        ${questionnaireData && Object.values(questionnaireData).some(v => v) ? `
        <div style="background-color: #f0f9ff; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
          <h2 style="font-size: 22px; color: #1e40af; margin-bottom: 25px;">📝 QUESTIONARIO</h2>
          ${formatQuestionnaireData(questionnaireData)}
        </div>
        ` : `
        <div style="background-color: #fff3cd; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
          <h2 style="font-size: 22px; color: #856404; margin-bottom: 15px;">⚠️ QUESTIONARIO NON COMPILATO</h2>
          <p style="font-size: 16px; color: #856404; margin: 0;">L'utente ha abbandonato dopo aver compilato solo il form di contatto.</p>
        </div>
        `}

        <div style="text-align: center; padding: 20px; background-color: #f1f5f9; border-radius: 8px; margin-top: 30px;">
          <p style="font-size: 14px; color: #64748b; margin: 0;">
            <strong>Data di invio:</strong> ${new Date().toLocaleString('it-IT')}
          </p>
          <p style="font-size: 12px; color: #94a3b8; margin: 5px 0 0 0;">
            IP: ${clientIP} | Session: ${sessionToken || 'N/A'}
          </p>
        </div>
      </body>
    </html>
    `;

    // Configurazione del messaggio
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'candidature.safescale@gmail.com',
      subject: `🚀 ID#${candidateId} - Candidatura ${contactData.nome} ${contactData.cognome}${isIncomplete ? ' - Questionario Incompleto' : ''}`,
      html: emailHtml,
    };

    // Invia l'email
    await transporter.sendMail(mailOptions);
    
    // Salva nel database
    try {
      await saveSubmission({
        candidateId,
        email: contactData.email,
        nome: contactData.nome,
        cognome: contactData.cognome,
        telefono: contactData.telefono,
        ipAddress: clientIP,
        sessionToken,
        questionnaireData,
        isIncomplete
      });
      console.log(`[DATABASE] Salvato: ID ${candidateId}`);
    } catch (dbError) {
      console.error('[DATABASE] Errore salvataggio:', dbError);
      // Non bloccare l'invio email se il database fallisce
    }
    
    console.log(`[SUCCESS] Email inviata - ID: ${candidateId}, IP: ${clientIP}, Email: ${email}`);

    return NextResponse.json({ 
      success: true, 
      message: 'Email inviata con successo',
      candidateId: candidateId
    });
    
  } catch (error) {
    console.error('[ERROR] Invio email fallito:', error);
    return NextResponse.json(
      { success: false, error: 'Errore nell\'invio dell\'email' },
      { status: 500 }
    );
  }
}