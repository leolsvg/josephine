"use client";

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
import type { TMenuCategory, TMenuService } from "@/server/db/types";
import { useDeleteMenu } from "./use-delete-menu";
import { useMenus } from "./use-menus";
import { useUpdateMenu } from "./use-update-menu";

export const menuCategories = [
  "partager",
  "entree",
  "plat",
  "fromage",
  "dessert",
] as const satisfies TMenuCategory[];

export function MenuTable({ service }: { service: TMenuService }) {
  const { data } = useMenus();
  const { mutate: deleteMenu } = useDeleteMenu();
  const { mutate: updateMenu } = useUpdateMenu();
  const menus = data.filter((p) => p.service === service);
  const orderedItems = menus.toSorted(
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
