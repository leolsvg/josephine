"use client";

export default function CartePage() {
  const categories = [
    {
      title: "À PARTAGER",
      items: [
        {
          name: "Involtini de chèvre speck / boudin ibérique",
          price: "9€",
        },
      ],
    },
    {
      title: "ENTRÉES",
      items: [
        {
          name: "Crudo de merlu / tomate / poivron / basilic",
          price: "9€",
        },
        {
          name: "Velouté de courgettes / œuf parfait / crumble sésame et satay",
          price: "10€",
        },
      ],
    },
    {
      title: "PLATS",
      items: [
        {
          name: "Noix de veau / choux-fleur / jus au foin",
          price: "26€",
        },
        {
          name: "Pêche du jour / Fregola / émulsion bisque de langoustines",
          price: "24€",
          italic: true,
        },
        {
          name: "Filet mignon de cochon / sarrasin grillé / jus aux épices douces",
          price: "25€",
        },
        {
          name: "Plat végétarien : Riz vénéré, cuisson pilaf / écume lait coco gingembre",
          price: "18€",
        },
      ],
    },
    {
      title: "FROMAGE",
      items: [
        {
          name: "Sélection “La cave à fromages” / chutney",
          price: "11€",
        },
      ],
    },
    {
      title: "DESSERTS",
      items: [
        {
          name: "Tartelette aux abricots et romarin / chantilly au chocolat ivoire",
          price: "10€",
        },
        {
          name: "Mousse au chocolat / caramel à la vanille / chouchous aux noix de pécan",
          price: "9€",
        },
      ],
    },
  ];

  return (
    <div className="relative flex flex-col lg:flex-row">
      {/* Bouton retour en haut à gauche */}
      <a
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
      </a>

      {/* Image */}
      <div
        className="w-full lg:w-1/2 h-64 lg:h-screen bg-cover bg-center lg:fixed lg:right-0 lg:top-0"
        style={{ backgroundImage: "url('/img/bar.jpg')" }}
      />

      {/* Contenu scrollable */}
      <div className="w-full lg:w-1/2 px-6 sm:px-8 py-20 space-y-20 lg:ml-0 lg:mr-auto">
        {/* Titre principal */}
        <h1 className="text-[32px] sm:text-[42px] lg:text-[46px] mb-10 text-[#000000] text-center lg:text-left">
          Carte du soir et du week-end
        </h1>

        {categories.map((cat, index) => (
          <section key={index}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#000000]">
              {cat.title}
            </h2>
            <ul className="space-y-4">
              {cat.items.map((item, i) => (
                <li
                  key={i}
                  className="flex justify-between border-b pb-2 text-black text-sm sm:text-base"
                >
                  <p className={item.italic ? "italic" : ""}>{item.name}</p>
                  <span className="font-semibold">{item.price}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {/* Bouton réserver */}
      <a
        href="/#reservation"
        className="fixed bottom-4 right-4 z-50 bg-[#000150] text-white px-5 py-3 text-sm sm:text-base rounded-full shadow-lg hover:bg-[#1a1a80] transition"
      >
        Réserver
      </a>
    </div>
  );
}
