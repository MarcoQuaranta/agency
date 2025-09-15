import { NextRequest, NextResponse } from 'next/server';
import { checkDuplicateSubmission } from '@/lib/db';

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

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email mancante' },
        { status: 400 }
      );
    }

    // Ottieni IP del client
    const clientIP = getClientIP(req);
    const normalizedEmail = email.toLowerCase();

    // Se è in whitelist, non applicare controlli duplicati
    if (WHITELIST_IPS.includes(clientIP)) {
      return NextResponse.json({
        success: true,
        isDuplicate: false
      });
    }

    // Controlla duplicati nel database (ultimi 24 ore)
    const isDuplicate = await checkDuplicateSubmission(normalizedEmail, clientIP);

    return NextResponse.json({
      success: true,
      isDuplicate: isDuplicate
    });

  } catch (error) {
    console.error('[ERROR] Controllo duplicati fallito:', error);
    return NextResponse.json(
      { success: false, error: 'Errore nel controllo duplicati' },
      { status: 500 }
    );
  }
}