import Link from "next/link";
import { FooterSectionContent, FooterSectionTitle } from "./footer-section";

export function LegalSection() {
  return (
    <section>
      <FooterSectionTitle>Informations</FooterSectionTitle>
      <FooterSectionContent>
        <Link href="/legal/legal-notices" className="hover:underline">
          Mentions légales
        </Link>
        <Link href="/legal/privacy" className="hover:underline">
          Confidentialité
        </Link>
      </FooterSectionContent>
    </section>
  );
}
