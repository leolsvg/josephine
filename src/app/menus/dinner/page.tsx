"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import { menuCategories, menuSectionTitles } from "@/lib/utils";
import TableImage from "../../../../public/restaurant/table.jpeg";
import type { Dish } from "../layout";

export default function DinnerPage() {
  const { data } = useQuery({
    queryKey: ["menus", "dinner"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("menus")
        .select("*")
        .eq("service", "soir");

      if (error) {
        throw error;
      }
      return data as Dish[];
    },
  });

  if (!data) return;

  return (
    <>
      <div className="hidden lg:block w-full lg:w-1/2 h-64 lg:h-screen lg:fixed lg:right-0 lg:top-0">
        <Image
          src={TableImage}
          alt="Josephine Table Fenêtre"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
      <div className="w-full lg:w-1/2 px-6 sm:px-8 py-20 space-y-20 lg:mr-auto">
        <h1 className="text-[32px] sm:text-[42px] lg:text-[46px] mb-10 text-black text-center lg:text-left">
          Carte du soir et du week-end
        </h1>
        {menuCategories.map((catKey) => {
          const platsCat = data?.filter((p) => p.category === catKey);
          if (platsCat.length === 0) return null;
          return (
            <section key={catKey}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-black">
                {menuSectionTitles[catKey]}
              </h2>
              <ul className="space-y-4">
                {platsCat.map((plat) => (
                  <li
                    key={plat.id}
                    className="flex justify-between border-b pb-2 text-black text-sm sm:text-base"
                  >
                    <p>{plat.description}</p>
                    <span className="font-semibold">
                      {plat.price ? (
                        `${plat.price}€`
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
    </>
  );
}
