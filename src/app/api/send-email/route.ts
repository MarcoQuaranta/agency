import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Funzione per ottenere IP dalla whitelist
function getWhitelistedIPs(): string[] {
  const defaultIPs = ['31.156.225.224', '::1', '127.0.0.1'];
  const whitelistFile = path.join(process.cwd(), 'whitelist-ips.json');
  
  try {
    if (fs.existsSync(whitelistFile)) {
      const content = fs.readFileSync(whitelistFile, 'utf8');
      const data = JSON.parse(content);
      // Combina IP dal file con quelli di default per evitare problemi
      const fileIPs = data.ips || [];
      return [...new Set([...defaultIPs, ...fileIPs])];
    }
  } catch (error) {
    // Ignora errore lettura whitelist
  }
  // IP di default sempre consentiti
  return defaultIPs;
}

// Funzione per controllare se l'IP ha già inviato un questionario incompleto
function hasIncompleteQuestionnaireSentFromIP(clientIP: string): boolean {
  const whitelistedIPs = getWhitelistedIPs();
  
  // IP in whitelist possono sempre inviare
  if (whitelistedIPs.includes(clientIP)) {
    return false;
  }
  
  const incompleteIPsFile = path.join(process.cwd(), 'incomplete-questionnaire-ips.json');
  
  try {
    if (fs.existsSync(incompleteIPsFile)) {
      const content = fs.readFileSync(incompleteIPsFile, 'utf8');
      const ips = JSON.parse(content);
      return ips.includes(clientIP);
    }
  } catch (error) {
    // Ignora errore lettura file IP
  }
  
  return false;
}

// Funzione per salvare l'IP che ha inviato un questionario incompleto
function addIncompleteQuestionnaireIP(clientIP: string): void {
  const whitelistedIPs = getWhitelistedIPs();
  
  // Non salvare IP in whitelist
  if (whitelistedIPs.includes(clientIP)) {
    return;
  }
  
  const incompleteIPsFile = path.join(process.cwd(), 'incomplete-questionnaire-ips.json');
  let ips: string[] = [];
  
  try {
    if (fs.existsSync(incompleteIPsFile)) {
      const content = fs.readFileSync(incompleteIPsFile, 'utf8');
      ips = JSON.parse(content) || [];
    }
  } catch (error) {
    // Crea nuovo file IP incompleti
  }
  
  if (!ips.includes(clientIP)) {
    ips.push(clientIP);
    
    try {
      fs.writeFileSync(incompleteIPsFile, JSON.stringify(ips, null, 2));
    } catch (error) {
      // Ignora errore scrittura file IP
    }
  }
}

// Funzione per ottenere l'IP del client
function getClientIP(req: NextRequest): string {
  // Vercel forwarded IP
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  // Vercel real IP
  const realIP = req.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  
  // Fallback
  return req.headers.get('x-forwarded-for') || 'unknown';
}

// Funzione per generare ID progressivo
function getNextCandidateId(): number {
  const counterFile = path.join(process.cwd(), 'candidate-counter.txt');
  let currentId = 1;

  try {
    if (fs.existsSync(counterFile)) {
      const content = fs.readFileSync(counterFile, 'utf8');
      currentId = parseInt(content) || 1;
    }
  } catch (error) {
    // Crea nuovo file contatore
  }

  const nextId = currentId + 1;
  
  try {
    fs.writeFileSync(counterFile, nextId.toString());
  } catch (error) {
    // Ignora errore scrittura contatore
  }

  return currentId;
}

// Configurazione del trasporter per Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // La tua email Gmail
    pass: process.env.EMAIL_APP_PASSWORD, // App Password di Gmail
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
    
    const { contactData, questionnaireData, isIncomplete = false } = body;

    // Ottieni IP del client
    const clientIP = getClientIP(req);

    // Se è un questionario incompleto, controlla se l'IP ha già inviato
    if (isIncomplete && hasIncompleteQuestionnaireSentFromIP(clientIP)) {
      return NextResponse.json({ 
        success: false, 
        message: 'Questionario incompleto già inviato da questo IP' 
      });
    }

    // Genera ID progressivo
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
          <p style="text-align: center; font-size: 18px; color: #64748b; margin: 0;">ID Candidatura: <strong>#${candidateId.toString().padStart(4, '0')}</strong></p>
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
        </div>
      </body>
    </html>
    `;

    // Configurazione del messaggio
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'candidature.safescale@gmail.com',
      subject: `🚀 ID#${candidateId.toString().padStart(4, '0')} - Candidatura ${contactData.nome} ${contactData.cognome}${isIncomplete ? ' - Questionario Incompleto' : ''}`,
      html: emailHtml,
    };

    // Invia l'email
    await transporter.sendMail(mailOptions);

    // Se è un questionario incompleto inviato con successo, salva l'IP
    if (isIncomplete) {
      addIncompleteQuestionnaireIP(clientIP);
    }

    return NextResponse.json({ success: true, message: 'Email inviata con successo' });
  } catch (error) {
    // Errore invio email
    return NextResponse.json(
      { success: false, error: 'Errore nell\'invio dell\'email' },
      { status: 500 }
    );
  }
}