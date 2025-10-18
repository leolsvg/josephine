"use client";

import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/lib/trpc/react";

export function useUpdateMenu() {
  const trpc = useTRPC();

  return useMutation(
    trpc.menus.patch.mutationOptions({
      onSuccess: (_1, _2, _3, ctx) => {
        return ctx.client.invalidateQueries({
          queryKey: trpc.menus.get.queryKey(),
        });
      },
    }),
  );
}
