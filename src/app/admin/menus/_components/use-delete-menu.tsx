"use client";

import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { MENUS_QUERY_KEY } from "./use-menus";

export function useDeleteMenu() {
  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const { error } = await supabase.from("menus").delete().eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: (_1, _2, _3, ctx) => {
      return ctx.client.invalidateQueries({
        queryKey: MENUS_QUERY_KEY,
      });
    },
  });
}
