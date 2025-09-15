"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Plat {
  id: number;
  description: string;
  category: string;
  service: string;
}

export default function CartePage() {
  const [plats, setPlats] = useState<Plat[]>([]);
  useEffect(() => {
    const fetchPlats = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("menus")
        .select("*")
        .eq("service", "midi"); // ✅ NE GARDER QUE LES PLATS DU MIDI

      if (error) {
        console.error("Erreur chargement menu :", error);
        return;
      }

      if (data) {
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
        <ChevronLeft />
      </Link>

      {/* Image : fixe à droite sur grand écran, en haut sinon */}
      <div
        className="hidden lg:block w-full lg:w-1/2 h-64 lg:h-screen bg-cover bg-center lg:fixed lg:right-0 lg:top-0"
        style={{ backgroundImage: "url('/restaurant/table.jpeg')" }}
      />

      {/* Contenu scrollable */}
      <div className="w-full lg:w-1/2 px-6 sm:px-8 py-20 space-y-10 lg:mr-auto">
        <h1 className="text-[32px] sm:text-[42px] lg:text-[46px] mb-6 text-[#000000] text-center lg:text-left">
          Carte du déjeuner
        </h1>
        <h2 className="font-bold text-[16px] sm:text-[28px] lg:text-[22px] text-[#000000] text-center lg:text-left leading-relaxed">
          Entrée + Plat ou Plat + Dessert 19€ <br />
          Entrée + Plat + Dessert 24€ <br />
          Plat seul 16€
        </h2>

        {categoriesOrdre.map((catKey) => {
          const platsCat = plats.filter((p) => p.category === catKey);
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
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <Link
        href="/reservation"
        className="fixed bottom-4 right-4 z-50 bg-[#000150] text-white px-5 py-3 text-sm sm:text-base rounded-full shadow-lg hover:bg-[#1a1a80] transition"
      >
        Réserver
      </Link>
    </div>
  );
}
