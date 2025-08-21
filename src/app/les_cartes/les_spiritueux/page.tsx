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
      title: "LA SÉLECTION DE WHISKIES",
      items: [
        {
          name: "Whisky Le Conquérant Bio Franc Tireur 46°",
          price: "8,90€",
          description:
            "Made in Normandie. Finale longue et légèrement acidulée. Recette complexe de malt d’orge bio offrant des notes pâtissières, cacao pur, intense, et fruits à noyau. À découvrir…",
        },
        {
          name: "Whisky Pur Malt Le Tourbé Franc Tireur Bio 46°",
          price: "8,90€",
          description:
            "Whisky normand pur malt d’orge bio subtilement tourbé. Création artisanale vieillie en fût de chêne lui apportant une couleur ambrée.",
        },
      ],
    },
    {
      title: "LA SÉLECTION DE RHUMS",
      items: [
        {
          name: "Rhum Le Normand Bio Franc Tireur 46°",
          price: "8,90€",
          description:
            "Mélasse bio pour un rhum de caractère aux parfums exotiques, lentement distillé dans un alambic à colonne. Brassé, fermenté, distillé puis vieilli en fût toasté (chauffe aux saveurs normandes).",
        },
      ],
    },
    {
      title: "LA SÉLECTION DE DIGESTIFS",
      items: [
        {
          name: "La Vodka Pomme C’est Nous",
          price: "7,50€",
          description:
            "Alcool de blé français. Rondeur obtenue grâce à un passage unique aux pommes. Pure et qualitative.",
        },
        {
          name: "Le Cold Brew C’est Nous",
          price: "7,50€",
          description:
            "Liqueur de café intense sans amertume, extraite à froid goutte à goutte pour conserver la finesse et la fraîcheur du café. À boire pure, sur dessert ou en cocktail.",
        },
        {
          name: "Gin C’est Nous",
          price: "7,50€",
          description:
            "Gin à base d’alcool de blé macéré une nuit avec des aromates, puis passé en alambic traditionnel. Équilibré, belle concentration d’arômes subtils.",
        },
        {
          name: "Calvados Fermier LEMORTON AOC Domfrontais 10 ans",
          price: "9€",
          description:
            "Calvados fin, équilibré et léger. À 10 ans, bouquet fruité reconnaissable, saveurs harmonieuses et grande longueur en bouche.",
        },
        {
          name: "Calva Sassy XO",
          price: "8€",
          description:
            "Vieilli minimum 6 ans en fûts de chêne (teinte acajou). Belle structure tannique, grande finesse en bouche. Idéal avec un cigare.",
        },
        {
          name: "Cognac Grande Champagne XO Raymond Ragnaud",
          price: "11€",
          description:
            "Très belle persistance et final, révélant la plénitude d’un cognac somptueux dont on garde longtemps le souvenir.",
        },
        {
          name: "Bas Armagnac Tariquet XO",
          price: "11€",
          description:
            "Assemblage d’eaux-de-vie de plus de 15 ans. Armagnac souple et complexe, alliant finesse et puissance, typique du domaine Tariquet.",
        },
        {
          name: "P’tit Calva Arrangés Poire Vanille BIO",
          price: "7€",
          description:
            "Boisson 100% normande. Poire mûre et vanille de Madagascar. Liqueur au Calvados sans colorants, conservateurs ni arôme artificiel.",
        },
        {
          name: "P’tit Calva Arrangés Citron de Sorrente BIO",
          price: "7€",
          description:
            "Citron de Sorrente (souvent utilisé pour le limoncello). À déguster frais en apéritif ou digestif.",
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
          NOS SPIRITUEUX
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
