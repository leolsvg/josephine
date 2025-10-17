"use client";

import Image from "next/image";
import TableImage from "../../../../public/restaurant/table.jpeg";
import {
  Menu,
  MenuImage,
  MenuPrice,
  MenuSectionContent,
  MenuSectionItem,
  MenuSectionTitle,
  MenuTitle,
} from "../_components/menu";
import { wines } from "./wines";

export default function WinesPage() {
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
        <MenuTitle>NOS VINS</MenuTitle>
        {wines.map((cat, idx) => (
          <section key={`${cat.title}-${idx}`}>
            <MenuSectionTitle>{cat.title}</MenuSectionTitle>
            {cat.subtitle && (
              <p className="mt-5 mb-4 italic text-gray-700">{cat.subtitle}</p>
            )}
            <MenuSectionContent>
              {cat.items.map((item) => (
                <MenuSectionItem key={item.name + item.price}>
                  <p className="font-medium">{item.name}</p>
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
