import { Menu, MenuImage } from "@/feat/menus/components/menu";
import Image from "next/image";
import TableImage from "../../../../public/restaurant/table.jpeg";

export default function StValentinMenuPage() {
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
        <h1 className="text-[32px] sm:text-[42px] lg:text-[46px] mb-6 text-black text-center lg:text-left">
          Menu Saint-Valentin
        </h1>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-black text-right">
            70€
          </h2>
          <ul className="space-y-4"></ul>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-black">
            Mise en bouche
          </h2>
          <ul className="space-y-4">
            <li className="flex justify-between border-b pb-2 text-black text-sm sm:text-base">
              <p>Mise en bouche aperitive et coupe de champagne</p>
              <span className="text-gray-400 italic font-normal mx-3">-</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-black">
            Entree
          </h2>
          <ul className="space-y-4">
            <li className="flex justify-between border-b pb-2 text-black text-sm sm:text-base">
              <p>
                Carpaccio de Saint-jacques a la vanille et fruit de la passion
              </p>
              <span className="text-gray-400 italic font-normal mx-3">-</span>
            </li>
            <li className="flex justify-between border-b pb-2 text-black text-sm sm:text-base">
              <p>Marbre de foie gras a la framboise, tuile croustillante</p>
              <span className="text-gray-400 italic font-normal mx-3">-</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-black">
            Plat
          </h2>
          <ul className="space-y-4">
            <li className="flex justify-between border-b pb-2 text-black text-sm sm:text-base">
              <p>Pave de veau basse temperature</p>
              <span className="text-gray-400 italic font-normal mx-3">-</span>
            </li>
            <li className="flex justify-between border-b pb-2 text-black text-sm sm:text-base">
              <p>
                Mousseline de legumes, strate de pommes de terre au Beaufort,
                jus aux epices douces
              </p>
              <span className="text-gray-400 italic font-normal mx-3">-</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-black">
            Dessert
          </h2>
          <ul className="space-y-4">
            <li className="flex justify-between border-b pb-2 text-black text-sm sm:text-base">
              <p>Entremets chocolat noir et cacahuete</p>
              <span className="text-gray-400 italic font-normal mx-3">-</span>
            </li>
            <li className="flex justify-between border-b pb-2 text-black text-sm sm:text-base">
              <p>Cremeux Dulcey et chouchoux croustillants</p>
              <span className="text-gray-400 italic font-normal mx-3">-</span>
            </li>
          </ul>
        </section>
      </Menu>
    </>
  );
}
