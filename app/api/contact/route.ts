
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  // Utilisation de la clé API Resend depuis .env
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    return NextResponse.json({ error: 'Clé API Resend manquante.' }, { status: 500 });
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'contact@votre-domaine.com',
      to: 'votre.email@domaine.com',
      subject: `Nouveau message de ${name}`,
      html: `<p><b>Nom:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b> ${message}</p>`
    })
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Erreur lors de l\'envoi de l\'email.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
