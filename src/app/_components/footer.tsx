import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Josephine } from "@/lib/josephine";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 pt-10 pb-3" id="contact">
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-10">
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
