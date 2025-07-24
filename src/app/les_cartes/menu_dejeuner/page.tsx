"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Plat {
  id: string;
  titre: string;
  description: string;
  categorie: string;
  cartes: string;
}

export default function CartePage() {
  const [plats, setPlats] = useState<Plat[]>([]);

  useEffect(() => {
    const fetchPlats = async () => {
      const { data, error } = await supabase
        .from("menus")
        .select("*")
        .eq("cartes", "midi"); // ✅ NE GARDER QUE LES PLATS DU MIDI

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
    <div className="relative flex">
      {/* Bouton retour accueil */}
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

      {/* Image fixe à droite */}
      <div
        className="hidden lg:block w-1/2 h-screen fixed right-0 top-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/img/bar.jpg')" }}
      />

      {/* Contenu scrollable à gauche */}
      <div className="w-full lg:w-1/2 px-8 py-20 space-y-20">
        <h1 className="text-[46px] mb-10 text-[#000000]">Carte du déjeuner</h1>

        {categoriesOrdre.map((catKey) => {
          const platsCat = plats.filter((p) => p.categorie === catKey);
          if (platsCat.length === 0) return null;

          return (
            <section key={catKey}>
              <h2 className="text-3xl font-bold mb-6">
                {titresCategorie[catKey]}
              </h2>
              <ul className="space-y-4">
                {platsCat.map((plat) => (
                  <li
                    key={plat.id}
                    className="flex justify-between border-b pb-2 text-black"
                  >
                    <p>{plat.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      {/* Bouton Réserver */}
      <a
        href="/#reservation"
        className="fixed bottom-4 right-4 z-50 bg-[#000150] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#1a1a80] transition"
      >
        Réserver
      </a>
    </div>
  );
}
