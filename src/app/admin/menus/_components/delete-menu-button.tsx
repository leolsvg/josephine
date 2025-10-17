"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { TMenu } from "@/server/db/types";
import { useDeleteMenu } from "./use-delete-menu";

export function DeleteMenuButton({ id }: { id: TMenu["id"] }) {
  const { mutate: deleteMenu, isPending } = useDeleteMenu();
  return (
    <Button
      onClick={() => deleteMenu({ id })}
      variant="destructive"
      disabled={isPending}
    >
      {isPending && <Spinner />}
      <Trash />
    </Button>
  );
}
