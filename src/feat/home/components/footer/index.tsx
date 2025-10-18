import { ContactSection } from "./contact-section";
import { LegalSection } from "./lagal-section";
import { ScheduleSection } from "./schedule-section";
import { SocialsSection } from "./socials-section";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 pt-10 pb-3" id="contact">
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-10">
        <ContactSection />
        <SocialsSection />
        <ScheduleSection />
        <LegalSection />
      </div>
      <div className="border-t border-gray-700 mt-10 pt-3 text-center text-xs text-gray-400">
        © 2025 Restaurant Joséphine. Tous droits réservés.
      </div>
    </footer>
  );
}
