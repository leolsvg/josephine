"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/lib/supabase/client";
import type { TMenu, TMenuCategory, TMenuService } from "@/server/db/types";

const MENUS_QUERY_KEY = ["menus"];

const menuCategories = [
  "partager",
  "entree",
  "plat",
  "fromage",
  "dessert",
] as const satisfies TMenuCategory[];

function useMenus() {
  return useQuery({
    queryKey: MENUS_QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await supabase.from("menus").select("*");
      if (error) {
        console.error("❌ Erreur fetch menus :", error.message);
        return;
      }
      return data as TMenu[];
    },
  });
}

function useUpdateMenu() {
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

function useDeleteMenu() {
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

function useAddMenu() {
  return useMutation({
    mutationFn: async ({ type }: { type: TMenuService }) => {
      const { error } = await supabase.from("menus").insert({
        description: "Nouveau plat",
        price: 0,
        category: "plat",
        service: type,
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

export default function MenusPage() {
  const { data: menus, isPending } = useMenus();
  const { mutate: addMenu, isPending: isAdding } = useAddMenu();

  if (isPending) return <div className="p-8">Chargement...</div>;
  if (!menus) return;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Modifier la carte</h1>
      </div>

      <div className="mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-4">
          <h2 className="text-xl font-semibold">Menu du midi</h2>
          <Button onClick={() => addMenu({ type: "midi" })} disabled={isAdding}>
            {isAdding ? (
              "Ajout..."
            ) : (
              <>
                <Plus />
                Ajouter un plat (midi)
              </>
            )}
          </Button>
        </div>
        <MenuTable data={menus.filter((p) => p.service === "midi")} />
      </div>

      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-4">
          <h2 className="text-xl font-semibold">Menu du soir</h2>
          <Button onClick={() => addMenu({ type: "soir" })} disabled={isAdding}>
            {isAdding ? (
              "Ajout..."
            ) : (
              <>
                <Plus />
                Ajouter un plat (soir)
              </>
            )}
          </Button>
        </div>

        <MenuTable data={menus.filter((p) => p.service === "soir")} />
      </div>
    </div>
  );
}

function MenuTable({ data }: { data: TMenu[] }) {
  const { mutate: deleteMenu } = useDeleteMenu();
  const { mutate: updateMenu } = useUpdateMenu();
  const orderedItems = data.toSorted(
    (a, b) =>
      menuCategories.indexOf(a.category) - menuCategories.indexOf(b.category),
  );
  return (
    <Card className="py-0 overflow-hidden overflow-x-scroll">
      <Table>
        <TableHeader>
          <TableRow className="bg-accent hover:bg-accent">
            <TableHead>Description</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Service</TableHead>
            <TableHead className="w-0" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderedItems.map((plat) => (
            <TableRow key={plat.id}>
              <TableCell>
                <Input
                  defaultValue={plat.description}
                  onBlur={(e) =>
                    updateMenu({
                      id: plat.id,
                      field: "description",
                      value: e.target.value,
                    })
                  }
                />
              </TableCell>
              <TableCell>
                <Input
                  defaultValue={String(plat.price)}
                  onBlur={(e) =>
                    updateMenu({
                      id: plat.id,
                      field: "price",
                      value: e.target.value,
                    })
                  }
                />
              </TableCell>
              <TableCell>
                <Select
                  defaultValue={plat.category}
                  onValueChange={(v) =>
                    updateMenu({
                      id: plat.id,
                      field: "category",
                      value: v as TMenuCategory,
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="partager">À partager</SelectItem>
                    <SelectItem value="entree">Entrée</SelectItem>
                    <SelectItem value="plat">Plat</SelectItem>
                    <SelectItem value="fromage">Fromage</SelectItem>
                    <SelectItem value="dessert">Dessert</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="p-2 min-w-[100px]">
                <Select
                  defaultValue={plat.service}
                  onValueChange={(v) =>
                    updateMenu({
                      id: plat.id,
                      field: "service",
                      value: v as TMenuService,
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="midi">Midi</SelectItem>
                    <SelectItem value="soir">Soir</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="p-2 min-w-[90px]">
                <Button
                  onClick={() => deleteMenu({ id: plat.id })}
                  variant="ghost"
                  className="text-destructive"
                >
                  Supprimer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
