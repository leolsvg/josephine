import { Resend } from "resend";
import { EmailTemplate } from "@/components/email";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailRequest {
  email: string;
  name: string;
  date: string;
  time: string;
}

export async function POST(request: Request) {
  const { email, name, date, time } = (await request.json()) as EmailRequest;
  try {
    const { data, error } = await resend.emails.send({
      from: "Restaurant Josephine <no-reply@josephine-cherbourg.fr>",
      to: [email],
      bcc: ["leorenouf2@icloud.com", "s.scelles@gmail.com"],
      subject: "Réservation confirmée - Restaurant Josephine",
      react: EmailTemplate({ name, date, time }),
    });

    if (error) {
      console.log("send email error", error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.log("try catch", error);
    return Response.json({ error }, { status: 500 });
  }
}
