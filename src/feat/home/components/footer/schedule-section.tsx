import { FooterSectionContent, FooterSectionTitle } from "./footer-section";

const openingHours = [
  "mercredi 12:00–14:00, 19:00–21:00",
  "jeudi 12:00–14:00, 19:00–21:00",
  "vendredi 12:00–14:00, 19:00–21:30",
  "samedi 12:00–14:00, 19:00–21:30",
  "mardi 19:00–21:00",
] as const;

export function ScheduleSection() {
  return (
    <section>
      <FooterSectionTitle>Horaires</FooterSectionTitle>
      <FooterSectionContent>
        <Schedule />
      </FooterSectionContent>
    </section>
  );
}

function Schedule() {
  return (
    <ul className="text-sm">
      {openingHours.map((day) => (
        <li key={day}>{day}</li>
      ))}
    </ul>
  );
}
