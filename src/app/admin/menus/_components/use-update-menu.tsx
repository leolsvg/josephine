"use client";

import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import type { TMenu } from "@/server/db/types";
import { MENUS_QUERY_KEY } from "./use-menus";

export function useUpdateMenu() {
  return useMutation({
    mutationFn: async ({
      field,
      id,
      value,
    }: {
      id: number;
      field: keyof TMenu;
      value: string;
    }) => {
      const { error } = await supabase
        .from("menus")
        .update({ [field]: value })
        .eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: (_1, _2, _3, ctx) => {
      return ctx.client.invalidateQueries({
        queryKey: MENUS_QUERY_KEY,
      });
    },
  });
}
