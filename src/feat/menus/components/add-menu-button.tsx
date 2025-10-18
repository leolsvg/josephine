"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { TMenuService } from "../db/types";
import { useAddMenu } from "./use-add-menu";

export function AddMenuButton({ service }: { service: TMenuService }) {
  const { mutate, isPending } = useAddMenu();
  return (
    <Button onClick={() => mutate({ service })} disabled={isPending}>
      {isPending && <Spinner />}
      <Plus />
      Ajouter un plat ({service})
    </Button>
  );
}
