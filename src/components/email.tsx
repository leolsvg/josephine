interface EmailTemplateProps {
  name: string;
  date: string; // ex: "2025-08-30"
  time: string;
  personnes: number;
}

export function EmailTemplate({
  name,
  date,
  time,
  personnes,
}: EmailTemplateProps) {
  // convertir la string en Date
  const formattedDate = new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div>
      <h2>Bonjour {name},</h2>
      <p>
        Votre réservation au <b>restaurant Joséphine</b> est confirmée :
      </p>
      <ul>
        <li>Date : {formattedDate}</li>
        <li>Heure : {time}</li>
        <li>Nombre de personnes : {personnes}</li>
      </ul>
      <p>Nous avons hâte de vous accueillir 🍷🍴</p>
      <p>À bientôt,</p>
      <p>
        <b>L&apos;équipe Joséphine</b>
      </p>
    </div>
  );
}
