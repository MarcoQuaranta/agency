import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Ottieni IP del client
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIP = req.headers.get('x-real-ip');
  
  let clientIP = 'unknown';
  
  if (forwardedFor) {
    clientIP = forwardedFor.split(',')[0].trim();
  } else if (realIP) {
    clientIP = realIP;
  }
  
  return NextResponse.json({ ip: clientIP });
}