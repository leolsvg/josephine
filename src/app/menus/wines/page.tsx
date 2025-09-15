"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";

type CategoryItem = {
  name: string;
  price: string; // Exemple : "12,5cl : 7€" ou "75cl : 28€"
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
          name: 'Crémant de Bourgogne AOP "Noir et Blanc" des Caves de Bailly Lapierre 12,5cl',
          price: "7€",
        },
        {
          name: 'Crémant de Bourgogne AOP "Noir et Blanc" des Caves de Bailly Lapierre 75cl',
          price: "28€",
        },
        {
          name: "Champagne Grand Cru Brut AOP Blanc de Blanc “Éclat de Craie” Domaine R. Champion 12,5cl",
          price: "11€",
        },
        {
          name: "Champagne Grand Cru Brut AOP Blanc de Blanc “Éclat de Craie” Domaine R. Champion 75cl",
          price: "52€",
        },
        {
          name: "Champagne Brut AOP Billecart Salmon 75cl",
          price: "85€",
        },
      ],
    },
    {
      title: "NOS CIDRES",
      items: [
        {
          name: 'Cidre Brut AOP "Cuvée Amour" Maison Hérout 33cl',
          price: "4,90€",
        },
        {
          name: 'Cidre Brut AOP "Tradition" Maison Hérout 75cl',
          price: "18€",
        },
      ],
    },
    {
      title: "NOS ROSÉS",
      subtitle: "La Provence",
      items: [
        {
          name: 'Côte de Provence AOP "Élégance" Mas de Pampelonne 12,5cl',
          price: "5,20€",
        },
        {
          name: 'Côte de Provence AOP "Élégance" Mas de Pampelonne 75cl',
          price: "29€",
        },
        {
          name: 'Côte de Provence AOP "Prestige" de chez Minuty 12,5cl',
          price: "7,90€",
        },
        {
          name: 'Côte de Provence AOP "Prestige" de chez Minuty 75cl',
          price: "45€",
        },
        {
          name: 'IGP d\'Oc "French Défilé" de Chez Anne de Joyeuse 12,5cl',
          price: "3,80€",
        },
        {
          name: 'IGP d\'Oc "French Défilé" de Chez Anne de Joyeuse 75cl',
          price: "21€",
        },
      ],
    },
    {
      title: "NOS ROSÉS",
      subtitle: "La Vallée de la Loire",
      items: [
        {
          name: 'Cabernet d\'Anjou AOP "Domaine Cady" bio 12,5cl',
          price: "3,90€",
        },
        {
          name: 'Cabernet d\'Anjou AOP "Domaine Cady" bio 75cl',
          price: "22€",
        },
      ],
    },
    {
      title: "NOS BLANCS",
      subtitle: "La Bourgogne",
      items: [
        {
          name: "Bourgogne Aligoté AOP Domaine J.L. Maldant 12,5cl",
          price: "5€",
        },
        {
          name: "Bourgogne Aligoté AOP Domaine J.L. Maldant 75cl",
          price: "28€",
        },
        {
          name: 'St Véran AOP "Les Charmones" Domaine de la Feuillarde 12,5cl',
          price: "5,50€",
        },
        {
          name: 'St Véran AOP "Les Charmones" Domaine de la Feuillarde 75cl',
          price: "32€",
        },
        {
          name: "Chablis AOP Domaine Lavantureux 12,5cl",
          price: "7,90€",
        },
        {
          name: "Chablis AOP Domaine Lavantureux 75cl",
          price: "45€",
        },
        {
          name: 'Pouilly Fuissé AOP "Terre de Menhir" Domaine Gilles Morat 12,5cl',
          price: "9,50€",
        },
        {
          name: 'Pouilly Fuissé AOP "Terre de Menhir" Domaine Gilles Morat 75cl',
          price: "52€",
        },
      ],
    },
    {
      title: "NOS BLANCS",
      subtitle: "La Vallée de la Loire",
      items: [
        {
          name: 'IGP du Val de Loire Sauvignon "Mmm" Domaine Fournier 12,5cl',
          price: "4,50€",
        },
        {
          name: 'IGP du Val de Loire Sauvignon "Mmm" Domaine Fournier 75cl',
          price: "26€",
        },
        { name: "Muscadet sur Lie AOP Château Thébaud 12,5cl", price: "5€" },
        { name: "Muscadet sur Lie AOP Château Thébaud 75cl", price: "28€" },
        { name: "Coteaux du Layon AOP Domaine Cady 12,5cl", price: "5€" },
        { name: "Coteaux du Layon AOP Domaine Cady 75cl", price: "28€" },
        {
          name: 'Sancerre AOP "Roc Abbaye" Domaine Florian Mollet 12,5cl',
          price: "7€",
        },
        {
          name: 'Sancerre AOP "Roc Abbaye" Domaine Florian Mollet 75cl',
          price: "39€",
        },
        {
          name: 'Pouilly Fumé AOP "En Travertin" Domaine Henry Bourgeois 12,5cl',
          price: "7,50€",
        },
        {
          name: 'Pouilly Fumé AOP "En Travertin" Domaine Henry Bourgeois 75cl',
          price: "42€",
        },
      ],
    },
    {
      title: "NOS BLANCS",
      subtitle: "La Vallée du Rhône",
      items: [
        {
          name: 'Côte du Rhône AOP "Le Temps est venu" Domaine Stéphane Ogier 12,5cl',
          price: "5,20€",
        },
        {
          name: 'Côte du Rhône AOP "Le Temps est venu" Domaine Stéphane Ogier 75cl',
          price: "29€",
        },
      ],
    },
    {
      title: "NOS ROUGES",
      subtitle: "La Bourgogne",
      items: [
        { name: "Mâcon Mancey AOP Domaine Chapuis 12,5cl", price: "5,20€" },
        { name: "Mâcon Mancey AOP Domaine Chapuis 75cl", price: "29€" },
        {
          name: "Chorey-lès-Beaunes AOP Domaine Jean-Luc Maldant 12,5cl",
          price: "7,90€",
        },
        {
          name: "Chorey-lès-Beaunes AOP Domaine Jean-Luc Maldant 75cl",
          price: "45€",
        },
        {
          name: "Givry 1er Cru AOP Domaine Choffley Valdenaire 12,5cl",
          price: "12€",
        },
        {
          name: "Givry 1er Cru AOP Domaine Choffley Valdenaire 75cl",
          price: "66€",
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
        <ChevronLeft />
      </Link>

      {/* Image */}
      <div
        className="hidden lg:block w-full lg:w-1/2 h-64 lg:h-screen bg-cover bg-center lg:fixed lg:right-0 lg:top-0"
        style={{ backgroundImage: "url('/restaurant/table.jpeg')" }}
      />

      {/* Contenu scrollable */}
      <div className="w-full lg:w-1/2 px-6 sm:px-8 py-20 space-y-16 lg:ml-0 lg:mr-auto">
        <h1 className="text-[32px] sm:text-[42px] lg:text-[46px] mb-10 text-[#000000] text-center lg:text-left">
          NOS VINS
        </h1>

        {categories.map((cat, idx) => (
          <section key={`${cat.title}-${idx}`}>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-6">
              {cat.title}
            </h2>
            {cat.subtitle && (
              <p className="mt-5 mb-4 italic text-gray-700">{cat.subtitle}</p>
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
