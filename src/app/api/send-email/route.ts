import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Cache in memoria per tracking submissions (persiste tra richieste su Vercel Edge)
// Nota: questa cache si resetta quando la funzione viene "cold started"
const submissionsCache = new Map<string, { timestamp: number, count: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 ora in millisecondi
const MAX_SUBMISSIONS_PER_WINDOW = 2; // Max 2 invii per ora per email/IP

// Pulizia cache periodica (rimuove entries vecchie)
function cleanupCache() {
  const now = Date.now();
  const keysToDelete: string[] = [];
  
  submissionsCache.forEach((value, key) => {
    if (now - value.timestamp > RATE_LIMIT_WINDOW) {
      keysToDelete.push(key);
    }
  });
  
  keysToDelete.forEach(key => submissionsCache.delete(key));
}

// Controlla rate limit
function checkRateLimit(identifier: string): { allowed: boolean, message?: string } {
  cleanupCache();
  
  const now = Date.now();
  const existing = submissionsCache.get(identifier);
  
  if (existing) {
    // Se sono passati più di 1 ora, resetta
    if (now - existing.timestamp > RATE_LIMIT_WINDOW) {
      submissionsCache.set(identifier, { timestamp: now, count: 1 });
      return { allowed: true };
    }
    
    // Se siamo ancora nella finestra temporale
    if (existing.count >= MAX_SUBMISSIONS_PER_WINDOW) {
      const minutesLeft = Math.ceil((RATE_LIMIT_WINDOW - (now - existing.timestamp)) / 60000);
      return { 
        allowed: false, 
        message: `Hai raggiunto il limite di invii. Riprova tra ${minutesLeft} minuti.`
      };
    }
    
    // Incrementa il contatore
    existing.count++;
    return { allowed: true };
  }
  
  // Prima submission
  submissionsCache.set(identifier, { timestamp: now, count: 1 });
  return { allowed: true };
}

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
  const ip = req.ip || req.headers.get('x-vercel-forwarded-for');
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

    // Se non è in whitelist, applica rate limiting
    if (!WHITELIST_IPS.includes(clientIP)) {
      // Usa combinazione email + IP per identificare univocamente
      const identifier = `${email}_${clientIP}`;
      
      // Per questionari completi, controlla rate limit
      if (!isIncomplete) {
        const rateLimitCheck = checkRateLimit(identifier);
        if (!rateLimitCheck.allowed) {
          console.log(`[RATE LIMIT] Bloccato: ${identifier}`);
          return NextResponse.json({ 
            success: false, 
            message: rateLimitCheck.message 
          });
        }
      }
      
      // Per questionari incompleti, usa sessionStorage lato client + rate limit leggero
      if (isIncomplete) {
        const incompleteIdentifier = `incomplete_${identifier}`;
        const rateLimitCheck = checkRateLimit(incompleteIdentifier);
        if (!rateLimitCheck.allowed) {
          return NextResponse.json({ 
            success: false, 
            message: 'Questionario incompleto già inviato recentemente' 
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
            { label: "Settore di appartenenza", value: data.sector === 'Altro' ? data.sectorOther : data.sector },
          ]
        },
        {
          title: "🔹 Sezione 2 – Cosa produci/vendi",
          fields: [
            { label: "Cosa produci/vendi", value: data.production },
            { label: "Prodotto best seller", value: data.bestSeller },
            { label: "Margine di profitto per prodotto", value: data.margin },
            { label: "Disponibilità prodotti", value: data.availability },
          ]
        },
        {
          title: "🔹 Sezione 3 – Le tue vendite",
          fields: [
            { label: "Vendi già online", value: data.onlineSales },
            { label: "Ordini mensili", value: data.monthlyOrders },
            { label: "Budget pubblicitario mensile", value: data.adInvestment },
            { label: "Canali di vendita", value: Array.isArray(data.salesChannels) ? data.salesChannels.join(', ') : data.salesChannels },
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
            { label: "Obiettivo principale", value: data.objective },
            { label: "Fatturato annuo", value: data.revenue },
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