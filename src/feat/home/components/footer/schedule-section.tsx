import { getCachedPlace } from "@/feat/home/server/routers/places";
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
  const days = Array.isArray(place?.regularOpeningHours?.weekdayDescriptions)
    ? place.regularOpeningHours.weekdayDescriptions
    : [];
  if (days.length === 0) return null;
  return (
    <ul className="text-sm">
      {days.map((d) => (
        <li key={d}>{d}</li>
      ))}
    </ul>
  );
}
