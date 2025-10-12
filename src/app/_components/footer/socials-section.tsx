import Image from "next/image";
import { Josephine } from "@/lib/josephine";
import { FooterSectionTitle } from "./footer-section";

export function SocialsSection() {
  return (
    <section>
      <FooterSectionTitle>Suivez-nous</FooterSectionTitle>
      <div className="flex gap-4">
        <a
          href={Josephine.socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/socials/instagram.svg"
            alt="Instagram"
            className="size-8 hover:opacity-75 transition"
            width={32}
            height={32}
          />
        </a>
        <a
          href={Josephine.socials.google}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/socials/google.svg"
            alt="Google"
            className="size-8 hover:opacity-75 transition"
            width={32}
            height={32}
          />
        </a>
      </div>
    </section>
  );
}
