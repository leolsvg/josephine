"use client";

import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import type { TMenuService } from "@/server/db/types";
import { MENUS_QUERY_KEY } from "./use-menus";

export function useAddMenu() {
  return useMutation({
    mutationFn: async ({ service }: { service: TMenuService }) => {
      const { error } = await supabase.from("menus").insert({
        description: "Nouveau plat",
        price: 0,
        category: "plat",
        service,
      });
      if (error) throw new Error(error.message);
    },
    onSuccess: (_1, _2, _3, ctx) => {
      return ctx.client.invalidateQueries({
        queryKey: MENUS_QUERY_KEY,
      });
    },
  });
}
