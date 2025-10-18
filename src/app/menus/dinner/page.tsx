import Image from "next/image";
import {
  Menu,
  MenuImage,
  MenuPrice,
  MenuSectionContent,
  MenuSectionItem,
  MenuSectionTitle,
  MenuTitle,
} from "@/feat/menus/components/menu";
import { caller } from "@/lib/trpc/server";
import { menuSectionTitles } from "@/lib/utils";
import TableImage from "../../../../public/restaurant/table.jpeg";

export default async function DinnerPage() {
  const menu = await caller.menus.getByService({ service: "soir" });
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
        <MenuTitle>Carte du soir et du week-end</MenuTitle>
        {menu.map(([c, p]) => (
          <section key={c}>
            <MenuSectionTitle>{menuSectionTitles[c]}</MenuSectionTitle>
            <MenuSectionContent>
              {p.map((plat) => (
                <MenuSectionItem key={plat.id}>
                  <p>{plat.description}</p>
                  <MenuPrice>{plat.price}</MenuPrice>
                </MenuSectionItem>
              ))}
            </MenuSectionContent>
          </section>
        ))}
      </Menu>
    </>
  );
}
