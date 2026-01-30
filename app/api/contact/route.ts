
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

const htmlTemplate = (data: { name: string; email: string; message: string }) => `
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Nouveau message — Portfolio</title>
<style>
  body {
    background-color: #f9fafb;
    font-family: 'Inter', Arial, sans-serif;
    margin: 0;
    padding: 0;
    color: #333;
  }
  .container {
    max-width: 600px;
    margin: auto;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e1e1e1;
  }
  .header {
    background: linear-gradient(90deg, #405de6, #833ab4);
    text-align: center;
    padding: 30px 20px;
    color: #fff;
    font-size: 24px;
    font-weight: bold;
  }
  .body {
    padding: 20px 25px;
  }
  .body h2 {
    font-size: 20px;
    margin-bottom: 10px;
    color: #111;
  }
  .body p {
    font-size: 16px;
    margin: 8px 0;
    line-height: 1.5;
  }
  .footer {
    font-size: 14px;
    text-align: center;
    padding: 15px 10px;
    color: #777;
  }
  .label {
    font-weight: bold;
    color: #555;
  }
  .value {
    margin-bottom: 12px;
  }
  .cta-btn {
    display: inline-block;
    background: #405de6;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 500;
    margin-top: 18px;
    margin-bottom: 8px;
    font-size: 16px;
  }
  @media only screen and (max-width: 600px) {
    .header {
      font-size: 20px;
      padding: 25px 15px;
    }
    .body h2 {
      font-size: 18px;
    }
  }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      ✉️ Nouveau message reçu !
    </div>
    <div class="body">
      <h2>Détails du message</h2>
      <p><span class="label">Nom :</span><br/>
         <span class="value">${data.name}</span>
      </p>
      <p><span class="label">Email :</span><br/>
         <span class="value">${data.email}</span>
      </p>
      <p><span class="label">Message :</span><br/>
         <span class="value">${data.message}</span>
      </p>
      <hr style="border:none;border-top:1px solid #eee;margin:20px 0;"/>
      <p>
        📌 <strong>Envoyé depuis :</strong> Page Contact du portfolio
      </p>
      <a class="cta-btn" href="mailto:${data.email}">Voir le message</a>
    </div>
    <div class="footer">
      Portfolio — © ${new Date().getFullYear()} • Conçu avec ❤️
    </div>
  </div>
</body>
</html>
`;

const textTemplate = (data: { name: string; email: string; message: string }) =>
  `Nouveau message reçu sur le portfolio !\n\nNom: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}\n\nEnvoyé depuis la page Contact du portfolio.`;

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json();

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'Clé API Resend manquante.' }, { status: 500 });
  }

  try {
    await resend.emails.send({
      from: 'Contact Portfolio <onboarding@resend.dev>',
      to: ['nathnathchav@gmail.com'],
      subject: `💌 Nouveau message de ${name}`,
      html: htmlTemplate({ name, email, message }),
      text: textTemplate({ name, email, message }),
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur lors de l'envoi de l'email." }, { status: 500 });
  }
}
