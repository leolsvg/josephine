"use client";

import Link from "next/link";

type CategoryItem = {
  name: string;
  price: string;
  description?: string;
};

type Category = {
  title: string;
  subtitle?: string;
  items: CategoryItem[];
};

export default function CartePage() {
  const categories: Category[] = [
    {
      title: "NOS BULLES",
      items: [
        {
          name: 'Crémant de Bourgogne AOP "Noir et Blanc" des Caves de Bailly Lapierre',
          price: "12,5cl : 7€",
        },
        {
          name: 'Crémant de Bourgogne AOP "Noir et Blanc" des Caves de Bailly Lapierre',
          price: "75cl : 28€",
        },
        {
          name: "Champagne Grand Cru Brut AOP Blanc de Blanc “Éclat de Craie” Domaine R. Champion",
          price: "12,5cl : 11€",
        },
        {
          name: "Champagne Grand Cru Brut AOP Blanc de Blanc “Éclat de Craie” Domaine R. Champion",
          price: "75cl : 52€",
        },
        {
          name: "Champagne Brut AOP Billecart Salmon",
          price: "75cl : 85€",
        },
      ],
    },
    {
      title: "NOS CIDRES",
      items: [
        {
          name: 'Cidre Brut AOP "Cuvée Amour" Maison Hérout',
          price: "33cl : 4,90€",
        },
        {
          name: 'Cidre Brut AOP "Tradition" Maison Hérout',
          price: "75cl : 18€",
        },
      ],
    },
    {
      title: "NOS ROSÉS",
      subtitle: "La Provence",
      items: [
        {
          name: 'Côte de Provence AOP "Élégance" Mas de Pampelonne',
          price: "12,5cl : 5,20€",
        },
        {
          name: 'Côte de Provence AOP "Élégance" Mas de Pampelonne',
          price: "75cl : 29€",
        },
        {
          name: 'Côte de Provence AOP "Prestige" de chez Minuty',
          price: "12,5cl : 7,90€",
        },
        {
          name: 'Côte de Provence AOP "Prestige" de chez Minuty',
          price: "75cl : 45€",
        },
        {
          name: 'IGP d\'Oc "French Défilé" de Chez Anne de Joyeuse',
          price: "12,5cl : 3,80€",
        },
        {
          name: 'IGP d\'Oc "French Défilé" de Chez Anne de Joyeuse',
          price: "75cl : 21€",
        },
      ],
    },
    {
      title: "NOS ROSÉS",
      subtitle: "La Vallée de la Loire",
      items: [
        {
          name: 'Cabernet d\'Anjou AOP "Domaine Cady" bio',
          price: "12,5cl : 3,90€",
        },
        {
          name: 'Cabernet d\'Anjou AOP "Domaine Cady" bio',
          price: "75cl : 22€",
        },
      ],
    },
    {
      title: "NOS BLANCS",
      subtitle: "La Bourgogne",
      items: [
        {
          name: "Bourgogne Aligoté AOP Domaine J.L. Maldant",
          price: "12,5cl : 5€",
        },
        {
          name: "Bourgogne Aligoté AOP Domaine J.L. Maldant",
          price: "75cl : 28€",
        },
        {
          name: 'St Véran AOP "Les Charmones" Domaine de la Feuillarde',
          price: "12,5cl : 5,50€",
        },
        {
          name: 'St Véran AOP "Les Charmones" Domaine de la Feuillarde',
          price: "75cl : 32€",
        },
        { name: "Chablis AOP Domaine Lavantureux", price: "12,5cl : 7,90€" },
        { name: "Chablis AOP Domaine Lavantureux", price: "75cl : 45€" },
        {
          name: 'Pouilly Fuissé AOP "Terre de Menhir" Domaine Gilles Morat',
          price: "12,5cl : 9,50€",
        },
        {
          name: 'Pouilly Fuissé AOP "Terre de Menhir" Domaine Gilles Morat',
          price: "75cl : 52€",
        },
      ],
    },
    {
      title: "NOS BLANCS",
      subtitle: "La Vallée de la Loire",
      items: [
        {
          name: 'IGP du Val de Loire Sauvignon "Mmm" Domaine Fournier',
          price: "12,5cl : 4,50€",
        },
        {
          name: 'IGP du Val de Loire Sauvignon "Mmm" Domaine Fournier',
          price: "75cl : 26€",
        },
        { name: "Muscadet sur Lie AOP Château Thébaud", price: "12,5cl : 5€" },
        { name: "Muscadet sur Lie AOP Château Thébaud", price: "75cl : 28€" },
        { name: "Coteaux du Layon AOP Domaine Cady", price: "12,5cl : 5€" },
        { name: "Coteaux du Layon AOP Domaine Cady", price: "75cl : 28€" },
        {
          name: 'Sancerre AOP "Roc Abbaye" Domaine Florian Mollet',
          price: "12,5cl : 7€",
        },
        {
          name: 'Sancerre AOP "Roc Abbaye" Domaine Florian Mollet',
          price: "75cl : 39€",
        },
        {
          name: 'Pouilly Fumé AOP "En Travertin" Domaine Henry Bourgeois',
          price: "12,5cl : 7,50€",
        },
        {
          name: 'Pouilly Fumé AOP "En Travertin" Domaine Henry Bourgeois',
          price: "75cl : 42€",
        },
      ],
    },
    {
      title: "NOS BLANCS",
      subtitle: "La Vallée du Rhône",
      items: [
        {
          name: 'Côte du Rhône AOP "Le Temps est venu" Domaine Stéphane Ogier',
          price: "12,5cl : 5,20€",
        },
        {
          name: 'Côte du Rhône AOP "Le Temps est venu" Domaine Stéphane Ogier',
          price: "75cl : 29€",
        },
      ],
    },
    {
      title: "NOS ROUGES",
      subtitle: "La Bourgogne",
      items: [
        { name: "Mâcon Mancey AOP Domaine Chapuis", price: "12,5cl : 5,20€" },
        { name: "Mâcon Mancey AOP Domaine Chapuis", price: "75cl : 29€" },
        {
          name: "Chorey-lès-Beaunes AOP Domaine Jean-Luc Maldant",
          price: "12,5cl : 7,90€",
        },
        {
          name: "Chorey-lès-Beaunes AOP Domaine Jean-Luc Maldant",
          price: "75cl : 45€",
        },
        {
          name: "Givry 1er Cru AOP Domaine Choffley Valdenaire",
          price: "12,5cl : 12€",
        },
        {
          name: "Givry 1er Cru AOP Domaine Choffley Valdenaire",
          price: "75cl : 66€",
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
        className="w-full lg:w-1/2 h-64 lg:h-screen bg-cover bg-center lg:fixed lg:right-0 lg:top-0"
        style={{ backgroundImage: "url('/img/bar.jpg')" }}
      />

      {/* Contenu scrollable */}
      <div className="w-full lg:w-1/2 px-6 sm:px-8 py-20 space-y-16 lg:ml-0 lg:mr-auto">
        <h1 className="text-[32px] sm:text-[42px] lg:text-[46px] mb-10 text-[#000000] text-center lg:text-left">
          NOS VINS
        </h1>

        {categories.map((cat, idx) => (
          <section key={`${cat.title}-${idx}`}>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#000000]">
              {cat.title}
            </h2>
            {cat.subtitle && (
              <p className="mt-1 mb-4 italic text-gray-700">{cat.subtitle}</p>
            )}
            <ul className="space-y-4">
              {cat.items.map((item) => (
                <li
                  key={item.name + item.price}
                  className="flex justify-between border-b pb-2 text-black text-sm sm:text-base"
                >
                  <p className="font-medium">{item.name}</p>
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
