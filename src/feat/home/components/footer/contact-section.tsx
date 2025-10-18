import { Josephine } from "@/lib/josephine";
import { FooterSectionContent, FooterSectionTitle } from "./footer-section";

export function ContactSection() {
  return (
    <section>
      <FooterSectionTitle>Contact</FooterSectionTitle>
      <FooterSectionContent>
        <a href={`mailto:${Josephine.email}`} className="hover:underline">
          {Josephine.email}
        </a>
        <a href={`tel:${Josephine.phone}`} className="hover:underline">
          {Josephine.phone}
        </a>
        <a
          href={Josephine.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {Josephine.address}
        </a>
      </FooterSectionContent>
    </section>
  );
}
