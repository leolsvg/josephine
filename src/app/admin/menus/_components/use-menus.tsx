"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import type { TMenu } from "@/server/db/types";

export const MENUS_QUERY_KEY = ["menus"];

export function useMenus() {
  return useSuspenseQuery({
    queryKey: MENUS_QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await supabase.from("menus").select("*");
      if (error) {
        throw new Error("❌ Erreur fetch menus :", {
          cause: error,
        });
      }
      return data as TMenu[];
    },
  });
}
