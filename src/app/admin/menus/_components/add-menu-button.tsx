"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TMenuService } from "@/server/db/types";
import { useAddMenu } from "./use-add-menu";

export function AddMenuButton({ service }: { service: TMenuService }) {
  const { mutate, isPending } = useAddMenu();
  return (
    <Button onClick={() => mutate({ service })} disabled={isPending}>
      {isPending ? (
        "Ajout..."
      ) : (
        <>
          <Plus />
          Ajouter un plat ({service})
        </>
      )}
    </Button>
  );
}
