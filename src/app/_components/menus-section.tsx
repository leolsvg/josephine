import type { Route } from "next";
import Link from "next/link";
import { JosephineIcon } from "@/components/josephine-icon";
import type { NavItem } from "@/lib/utils";
import { Section } from "./section";
import { SectionTitle } from "./section-title";

const menus: NavItem<Route>[] = [
  { title: "Menu déjeuner", href: `/les_cartes/menu_dejeuner` as Route },
  {
    title: "Carte soir et week-end",
    href: "/les_cartes/soir_weekend" as Route,
  },
  { title: "Nos vins", href: "/les_cartes/les_vins" as Route },
  { title: "Nos boissons", href: "/les_cartes/les_boissons" as Route },
  { title: "Nos spiritueux", href: "/les_cartes/les_spiritueux" as Route },
];

export function MenusSection() {
  return (
    <Section id="menu">
      <SectionTitle>Menu & Cartes</SectionTitle>
      <div className="flex flex-wrap gap-6 justify-center">
        {menus.map((m) => (
          <Link key={m.href} href={m.href}>
            <MenuCard title={m.title} />
          </Link>
        ))}
      </div>
    </Section>
  );
}

function MenuCard({ title }: { title: string }) {
  return (
    <div className="hover:scale-105 transition-transform">
      <div className="bg-gray-900 p-6 w-70 h-50">
        <div className="bg-white flex flex-col justify-center items-center gap-6 p-6 size-full">
          <JosephineIcon className="size-14" />
          <span className="text-yellow-700 font-bold text-sm">{title}</span>
        </div>
      </div>
    </div>
  );
}
