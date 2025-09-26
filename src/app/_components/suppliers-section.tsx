import Image from "next/image";
import type { ReactNode } from "react";
import Cave from "../../../public/suppliers/cave_a_fromage.png";
import Chatel from "../../../public/suppliers/chatel.png";
import Vergers from "../../../public/suppliers/vergers_de_la_passion.png";
import { Section } from "./section";
import { SectionTitle } from "./section-title";

const suppliers = [
  {
    title: "La cave à fromages",
    src: Cave,
    href: "https://www.lacaveafromagescherbourg.com/",
  },
  {
    title: "Chatel",
    src: Chatel,
    href: "https://www.facebook.com/boulangeriechatel/",
  },
  {
    title: "Les vergers de la passion",
    src: Vergers,
    href: "https://les-vergers-de-la-passion-cidrerie.fr/",
  },
];

export function SuppliersSection() {
  return (
    <Section id="suppliers">
      <SectionTitle>Nos Fournisseurs Locaux</SectionTitle>
      <p className="text-center max-w-4xl">
        Chez Joséphine, la qualité commence par le choix des bons partenaires.
        Nous travaillons main dans la main avec des producteurs et artisans
        locaux passionnés, qui partagent nos valeurs de fraîcheur, de
        saisonnalité et de respect du produit. Découvrez ceux qui nous
        permettent chaque jour de vous proposer une cuisine sincère et
        savoureuse.
      </p>
      <SupplierSeparator />
      <div className="flex flex-wrap gap-6 container justify-evenly">
        {suppliers.map((s) => (
          <a
            href={s.href}
            key={s.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SupplierCard>
              <Image src={s.src} alt={s.title} className="max-h-40" />
            </SupplierCard>
          </a>
        ))}
      </div>
    </Section>
  );
}

function SupplierCard({ children }: { children: ReactNode }) {
  return (
    <div className="size-60 bg-gray-400 flex justify-center items-center">
      {children}
    </div>
  );
}

function SupplierSeparator() {
  return (
    <div className="flex justify-center items-center mb-12">
      <div className="w-24 h-px bg-black"></div>
      <div className="mx-2 w-2 h-2 border-2 border-black rounded-full"></div>
      <div className="mx-1 w-3 h-3 border-2 border-black rounded-full"></div>
      <div className="mx-2 w-2 h-2 border-2 border-black rounded-full"></div>
      <div className="w-24 h-px bg-black"></div>
    </div>
  );
}
