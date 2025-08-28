import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configurazione del trasporter per Gmail
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // La tua email Gmail
    pass: process.env.EMAIL_APP_PASSWORD, // App Password di Gmail
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { contactData, questionnaireData } = body;

    // Formatta i dati per l'email
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
        const sectionText = `${section.title}\n${section.fields
          .filter(field => field.value)
          .map(field => `${field.label}: ${field.value}`)
          .join('\n')}`;
        return sectionText;
      }).join('\n\n');
    };

    // Costruisci il messaggio email
    const emailContent = `
📋 NUOVA CANDIDATURA SAFESCALE

📞 DATI DI CONTATTO:
Nome: ${contactData.nome}
Cognome: ${contactData.cognome}
Telefono: ${contactData.telefono}
Email: ${contactData.email}

📝 QUESTIONARIO COMPLETO:

${formatQuestionnaireData(questionnaireData)}

---
Data di invio: ${new Date().toLocaleString('it-IT')}
    `.trim();

    // Configurazione del messaggio
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'candidature.safescale@gmail.com',
      subject: `🚀 Nuova Candidatura SafeScale - ${contactData.nome} ${contactData.cognome}`,
      text: emailContent,
    };

    // Invia l'email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email inviata con successo' });
  } catch (error) {
    console.error('Errore invio email:', error);
    return NextResponse.json(
      { success: false, error: 'Errore nell\'invio dell\'email' },
      { status: 500 }
    );
  }
}