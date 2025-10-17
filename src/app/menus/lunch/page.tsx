import Image from "next/image";
import { caller } from "@/lib/trpc/server";
import { menuSectionTitles, priceIntl } from "@/lib/utils";
import TableImage from "../../../../public/restaurant/table.jpeg";
import {
  Menu,
  MenuImage,
  MenuSectionContent,
  MenuSectionItem,
  MenuSectionTitle,
  MenuTitle,
} from "../_components/menu";

export default async function LunchPage() {
  const menu = await caller.menus.getByService({ service: "midi" });
  return (
    <>
      <MenuImage>
        <Image
          src={TableImage}
          alt="Josephine Table"
          fill
          placeholder="blur"
          className="object-cover object-center"
          priority
        />
      </MenuImage>
      <Menu>
        <MenuTitle>Carte du déjeuner</MenuTitle>
        <ul className="font-bold text-[16px] sm:text-[28px] lg:text-[22px] text-black text-center lg:text-left leading-relaxed">
          <li>Entrée + Plat ou Plat + Dessert {priceIntl.format(19)}</li>
          <li>Entrée + Plat + Dessert {priceIntl.format(24)}</li>
          <li>Plat seul {priceIntl.format(16)}</li>
        </ul>
        {menu.map(([c, p]) => (
          <section key={c}>
            <MenuSectionTitle>{menuSectionTitles[c]}</MenuSectionTitle>
            <MenuSectionContent>
              {p.map((plat) => (
                <MenuSectionItem key={plat.id}>
                  <p>{plat.description}</p>
                </MenuSectionItem>
              ))}
            </MenuSectionContent>
          </section>
        ))}
      </Menu>
    </>
  );
}
