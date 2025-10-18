"use client";

import Image from "next/image";
import {
  Menu,
  MenuImage,
  MenuPrice,
  MenuSectionContent,
  MenuSectionItem,
  MenuSectionItemDescription,
  MenuSectionTitle,
  MenuTitle,
} from "@/feat/menus/components/menu";
import { drinks } from "@/feat/menus/db/drinks";
import TableWindowImage from "../../../../public/restaurant/table-window.jpeg";

export default function DrinksPage() {
  return (
    <>
      <MenuImage>
        <Image
          src={TableWindowImage}
          alt="Josephine Table Fenêtre"
          fill
          placeholder="blur"
          className="object-cover object-center"
          priority
        />
      </MenuImage>
      <Menu>
        <MenuTitle>NOS BOISSONS</MenuTitle>
        {drinks.map((cat) => (
          <section key={cat.title}>
            <MenuSectionTitle>{cat.title}</MenuSectionTitle>
            <MenuSectionContent>
              {cat.items.map((item) => (
                <MenuSectionItem key={item.name}>
                  <div>
                    <div className="font-medium">{item.name}</div>
                    {item.description && (
                      <MenuSectionItemDescription>
                        {item.description}
                      </MenuSectionItemDescription>
                    )}
                  </div>
                  <MenuPrice>{item.price}</MenuPrice>
                </MenuSectionItem>
              ))}
            </MenuSectionContent>
          </section>
        ))}
      </Menu>
    </>
  );
}
