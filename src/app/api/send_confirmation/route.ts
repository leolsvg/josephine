import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, name, date, time } = await req.json();

    if (!email || !name || !date || !time) {
      return NextResponse.json(
        { success: false, error: "Champs requis manquants." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "onboarding@resend.dev", // ou un domaine validé chez Resend
      to: email, // email du client
      subject: "Confirmation de votre réservation - Restaurant Joséphine",
      html: `
        <h2>Bonjour ${name},</h2>
        <p>Votre réservation au <b>restaurant Joséphine</b> est confirmée :</p>
        <ul>
          <li>Date : ${date}</li>
          <li>Heure : ${time}</li>
        </ul>
        <p>Nous avons hâte de vous accueillir 🍷🍴</p>
        <p>À bientôt,</p>
        <p><b>L'équipe Joséphine</b></p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur envoi email:", err);
    return NextResponse.json(
      { success: false, error: "Erreur lors de l'envoi de l'email." },
      { status: 500 }
    );
  }
}
