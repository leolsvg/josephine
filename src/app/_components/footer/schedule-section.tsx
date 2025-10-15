import { getCachedPlace } from "@/server/routers/places";
import { FooterSectionContent, FooterSectionTitle } from "./footer-section";

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

async function Schedule() {
  const place = await getCachedPlace();
  if (!place) return;
  return (
    <ul className="text-sm">
      {place.regularOpeningHours.weekdayDescriptions.map((d) => (
        <li key={d}>{d}</li>
      ))}
    </ul>
  );
}
