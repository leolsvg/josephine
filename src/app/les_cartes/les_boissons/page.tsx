"use client";

import Link from "next/link";

type CategoryItem = {
  name: string;
  price: string;
  description?: string;
};

type Category = {
  title: string;
  items: CategoryItem[];
};

export default function CartePage() {
  const categories: Category[] = [
    {
      title: "NOS EAUX",
      items: [
        {
          name: "Plancoët Gazeuse 1L",
          price: "5,90€",
        },
        {
          name: "Plancoët Gazeuse 50cl",
          price: "3,90€",
        },
        {
          name: "Plancoët Plate 1L",
          price: "5€",
        },
        {
          name: "Plancoët Plate 50cl",
          price: "3€",
        },
        {
          name: "Badoit Rouge 33cl",
          price: "3,80€",
        },
      ],
    },
    {
      title: "NOS SOFTS",
      items: [
        {
          name: "Coca-cola 33cl/ coca-cola zéro 33cl",
          price: "3,80€",
        },
        {
          name: "Limonade Artisanale 33cl",
          price: "2,90€",
        },
        {
          name: "Diabolo 33cl (menthe, grenadine, citron, pulco jaune ou vert, pêche et pampelemousse rose)",
          price: "3€",
        },
        {
          name: "Fuze Tea Pêche 25cl",
          price: "3,80€",
        },
        {
          name: "Le coq toqué Bio 25cl (poire, ananas, orange, abricot et tomate romarin)",
          price: "4,80€",
        },
        {
          name: "Haut comme trois pommes bio Les Vergers de la Passion 25cl",
          price: "3,80€",
        },
        {
          name: "Orangina Jaune 25cl",
          price: "3,80€",
        },
        {
          name: "Schweppes 33cl",
          price: "3,80€",
        },
      ],
    },
    {
      title: "NOS APÉRITIFS",
      items: [
        {
          name: "Pastis Grand cru artisanal de Haute-Provence 2cl",
          price: "4,50€",
        },
        {
          name: "Martini Blanc 4cl",
          price: "3,50€",
        },
        {
          name: "Porto Rouge, Tawny Port",
          price: "7€",
        },
        {
          name: "Kir Vin Bourgogne Aligoté 12cl / cassis/ mûre/ pêche de vigne",
          price: "5,30€",
        },
        {
          name: "Pommeau Les Vergers de la Passion 8cl",
          price: "7€",
        },
      ],
    },
    {
      title: "NOS COCKTAILS",
      items: [
        {
          name: "Osez Joséphine",
          description: "Liqueur de mandarine, ginger beer, citron vert",
          price: "9€",
        },
        {
          name: "Gin Tonic",
          description:
            'Gin "C\'est nous" distillerie normande, tonic artisanale',
          price: "8€",
        },
        {
          name: "Moscow Mule",
          description: 'Vodka "C\'est nous", ginger beer, citron vert',
          price: "9€",
        },
        {
          name: "Mojito",
          description:
            'Rhum blanc "3 rivières" 50°, citron vert, eau pétillante, menthe',
          price: "8€",
        },
        {
          name: "Expresso Martini",
          description:
            'Vodka "C\'est nous", liqueur de café "C\'est nous", expresso',
          price: "11€",
        },
        {
          name: "Spritz",
          description: "Apérol, prosseco, eau pétillante",
          price: "9€",
        },
        {
          name: "Spritz Saint Germain",
          description: "Liqueur Saint Germain, prosseco, eau pétillante",
          price: "9€",
        },
      ],
    },
    {
      title: "NOS BIÈRES",
      items: [
        {
          name: "Luxe Du Moulin 25cl",
          price: "3,20€",
        },
        {
          name: "Luxe Du Moulin 50cl",
          price: "6,40€",
        },
        {
          name: "La Jade Farmhouse 25cl",
          price: "4€",
        },
        {
          name: "La Jade Farmhouse 50cl",
          price: "8€",
        },
        {
          name: "La Cadette IPA 25cl",
          price: "4,40€",
        },
        {
          name: "La Cadette IPA 50cl",
          price: "8,80€",
        },
        {
          name: "Picon Bière 25cl",
          price: "4€",
        },
        {
          name: "Picon Bière 25cl",
          price: "8€",
        },
      ],
    },
    {
      title: "NOS BOISSONS CHAUDES",
      items: [
        {
          name: "Expresso",
          description: "Sélection Malongo Grande Réserve",
          price: "2€",
        },
        {
          name: "Expresso Allongé",
          price: "2,20€",
        },
        {
          name: "Double expresso",
          price: "3,80€",
        },
        {
          name: "Noisette",
          price: "2,20€",
        },
        {
          name: "Capuccino",
          price: "3,80€",
        },
        {
          name: "Chocolat chaud",
          price: "3,50€",
        },
        {
          name: "Irish Coffee",
          price: "8€",
        },
        {
          name: "Thés Dammann",
          description:
            "Vert, noir, rooibois agrume, tisane tilleul, menthe poivrée, tisane verveine",
          price: "3,50€",
        },
      ],
    },
  ];

  return (
    <div className="relative flex flex-col lg:flex-row">
      {/* Bouton retour en haut à gauche */}
      <Link
        href="/"
        className="fixed top-4 left-4 z-50 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition"
        aria-label="Retour à l'accueil"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-[#000150]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </Link>

      {/* Image */}
      <div
        className="hidden lg:block w-full lg:w-1/2 h-64 lg:h-screen bg-cover bg-center lg:fixed lg:right-0 lg:top-0"
        style={{ backgroundImage: "url('/img/table2.jpeg')" }}
      />

      {/* Contenu scrollable */}
      <div className="w-full lg:w-1/2 px-6 sm:px-8 py-20 space-y-20 lg:ml-0 lg:mr-auto">
        {/* Titre principal */}
        <h1 className="text-[32px] sm:text-[42px] lg:text-[46px] mb-10 text-[#000000] text-center lg:text-left">
          NOS BOISSONS
        </h1>

        {categories.map((cat) => (
          <section key={cat.title}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#000000]">
              {cat.title}
            </h2>
            <ul className="space-y-4">
              {cat.items.map((item) => (
                <li
                  key={item.name}
                  className="flex justify-between border-b pb-2 text-black text-sm sm:text-base"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    {item.description && (
                      <p className="text-xs sm:text-sm text-gray-600">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <span className="font-semibold">{item.price}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {/* Bouton réserver */}
      <Link
        href="/reservation"
        className="fixed bottom-4 right-4 z-50 bg-[#000150] text-white px-5 py-3 text-sm sm:text-base rounded-full shadow-lg hover:bg-[#1a1a80] transition"
      >
        Réserver
      </Link>
    </div>
  );
}
