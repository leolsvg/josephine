interface EmailTemplateProps {
	name: string;
	date: string;
	time: string;
}

export function EmailTemplate({ name, date, time }: EmailTemplateProps) {
	return (
		<div>
			<h2>Bonjour {name},</h2>
			<p>
				Votre réservation au <b>restaurant Joséphine</b> est confirmée :
			</p>
			<ul>
				<li>Date : {date}</li>
				<li>Heure : {time}</li>
			</ul>
			<p>Nous avons hâte de vous accueillir 🍷🍴</p>
			<p>À bientôt,</p>
			<p>
				<b>L&apos;équipe Joséphine</b>
			</p>
		</div>
	);
}
