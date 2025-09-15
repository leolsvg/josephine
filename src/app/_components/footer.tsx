import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 pt-10 pb-3" id="contact">
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-10">
        <section>
          <FooterSectionTitle>Contact</FooterSectionTitle>
          <FooterSectionContent>
            <a href="mailto:contact@josephine.fr" className="hover:underline">
              contact@josephine-cherbourg.fr
            </a>
            <a href="tel:+33233873164" className="hover:underline">
              +33 2 33 87 31 64
            </a>
            <a
              href="https://maps.app.goo.gl/nUairufUmvsgi8mT6"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              12 Place de la République, 50100 Cherbourg
            </a>
          </FooterSectionContent>
        </section>
        <section>
          <FooterSectionTitle>Suivez-nous</FooterSectionTitle>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/josephine_cherbourg/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/socials/instagram.svg"
                alt="Instagram"
                className="size-8 hover:opacity-75 transition"
                width={48}
                height={48}
              />
            </a>
            <a
              href="https://g.co/kgs/BFut6H7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/socials/google.svg"
                alt="Google"
                className="size-8 hover:opacity-75 transition"
                width={48}
                height={48}
              />
            </a>
          </div>
        </section>
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
      </div>
      <div className="border-t border-gray-700 mt-10 pt-3 text-center text-xs text-gray-400">
        © 2025 Restaurant Joséphine. Tous droits réservés.
      </div>
    </footer>
  );
}

function FooterSectionContent({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-1">{children}</div>;
}

function FooterSectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-lg font-semibold mb-2">{children}</h2>;
}
