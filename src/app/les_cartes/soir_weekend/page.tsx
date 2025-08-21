"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Plat {
  id: string;
  titre: string;
  description: string;
  categorie: string;
  cartes: string;
  prix: string;
}

export default function CartePage() {
  const [plats, setPlats] = useState<Plat[]>([]);

  useEffect(() => {
    const fetchPlats = async () => {
      const { data, error } = await supabase
        .from("menus")
        .select("*")
        .eq("cartes", "soir"); // ✅ NE GARDER QUE LES PLATS DU SOIR

      if (error) {
        console.error("Erreur chargement menu :", error);
        return;
      }

      if (data) {
        console.log("Données reçues de Supabase :", data);
        setPlats(data);
      }
    };

    fetchPlats();
  }, []);

  const titresCategorie: Record<string, string> = {
    partager: "À PARTAGER",
    entree: "ENTRÉES",
    plat: "PLATS",
    fromage: "FROMAGE",
    dessert: "DESSERTS",
  };

  const categoriesOrdre = ["partager", "entree", "plat", "fromage", "dessert"];

  return (
    <div className="relative flex flex-col lg:flex-row">
      {/* Bouton retour accueil */}
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

      {/* Image fixe à droite (desktop) ou bloc au-dessus (mobile) */}
      <div
        className="w-full lg:w-1/2 h-64 lg:h-screen bg-cover bg-center lg:fixed lg:right-0 lg:top-0"
        style={{ backgroundImage: "url('/img/table2.jpeg')" }}
      />

      {/* Contenu scrollable à gauche */}
      <div className="w-full lg:w-1/2 px-6 sm:px-8 py-20 space-y-20 lg:mr-auto">
        <h1 className="text-[32px] sm:text-[42px] lg:text-[46px] mb-10 text-[#000000] text-center lg:text-left">
          Carte du soir et du week-end
        </h1>

        {categoriesOrdre.map((catKey) => {
          const platsCat = plats.filter((p) => p.categorie === catKey);
          if (platsCat.length === 0) return null;

          return (
            <section key={catKey}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#000000]">
                {titresCategorie[catKey]}
              </h2>
              <ul className="space-y-4">
                {platsCat.map((plat) => (
                  <li
                    key={plat.id}
                    className="flex justify-between border-b pb-2 text-black text-sm sm:text-base"
                  >
                    <p>{plat.description}</p>
                    <span className="font-semibold">
                      {plat.prix ? (
                        `${plat.prix}€`
                      ) : (
                        <span className="text-gray-400 italic">—</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      {/* Bouton Réserver */}
      <Link
        href="/reservation"
        className="fixed bottom-4 right-4 z-50 bg-[#000150] text-white px-5 py-3 text-sm sm:text-base rounded-full shadow-lg hover:bg-[#1a1a80] transition"
      >
        Réserver
      </Link>
    </div>
  );
}
