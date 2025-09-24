import { NextRequest, NextResponse } from 'next/server';

// Funzione per ottenere l'IP del client (identica a quella in send-email)
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
  
  const allHeaders: Record<string, string> = {};
  
  for (const header of headers) {
    const value = req.headers.get(header);
    if (value) {
      allHeaders[header] = value;
      // x-forwarded-for può contenere multiple IP separate da virgole
      const ip = value.split(',')[0].trim();
      if (ip && ip !== 'unknown') {
        // Primo header valido trovato
        if (!allHeaders['detected_ip']) {
          allHeaders['detected_ip'] = ip;
          allHeaders['detected_from'] = header;
        }
      }
    }
  }
  
  // Se siamo su Vercel, prova a prendere l'IP dalla connessione
  const vercelIp = req.headers.get('x-vercel-forwarded-for');
  if (vercelIp) {
    allHeaders['vercel_ip'] = vercelIp;
    if (!allHeaders['detected_ip']) {
      allHeaders['detected_ip'] = vercelIp.split(',')[0].trim();
      allHeaders['detected_from'] = 'vercel_ip';
    }
  }
  
  // Se non abbiamo ancora un IP, usa unknown
  if (!allHeaders['detected_ip']) {
    allHeaders['detected_ip'] = 'unknown';
    allHeaders['detected_from'] = 'none';
  }
  
  return JSON.stringify(allHeaders, null, 2);
}

export async function GET(req: NextRequest) {
  const ipInfo = getClientIP(req);
  
  return NextResponse.json({
    message: 'Debug IP Detection',
    details: JSON.parse(ipInfo)
  });
}