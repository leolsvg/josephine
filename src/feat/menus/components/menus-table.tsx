"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
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
import { useTRPC } from "@/lib/trpc/react";
import {
  menuCategories,
  type TMenuCategory,
  type TMenuService,
} from "../db/types";
import { DeleteMenuButton } from "./delete-menu-button";
import { useUpdateMenu } from "./use-update-menu";

export function MenuTable({ service }: { service: TMenuService }) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.menus.get.queryOptions());
  const { mutate: updateMenu } = useUpdateMenu();
  const menus = data.filter((p) => p.service === service);
  const orderedItems = useMemo(
    () =>
      menus.toSorted((a, b) => {
        const categoryDiff =
          menuCategories.indexOf(a.category) -
          menuCategories.indexOf(b.category);
        if (categoryDiff !== 0) return categoryDiff;
        return a.id - b.id;
      }),
    [menus],
  );
  return (
    <Card className="py-0 overflow-hidden overflow-x-scroll">
      <Table>
        <TableHeader>
          <TableRow className="bg-accent hover:bg-accent">
            <TableHead>Description</TableHead>
            <TableHead className="w-30">Prix</TableHead>
            <TableHead className="w-0">Catégorie</TableHead>
            <TableHead className="w-0">Service</TableHead>
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
                      value: {
                        description: e.target.value,
                      },
                    })
                  }
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  step={0.5}
                  defaultValue={String(plat.price)}
                  onBlur={(e) =>
                    updateMenu({
                      id: plat.id,
                      value: {
                        price: Number(e.target.value),
                      },
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
                      value: {
                        category: v as TMenuCategory,
                      },
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
              <TableCell>
                <Select
                  defaultValue={plat.service}
                  onValueChange={(v) =>
                    updateMenu({
                      id: plat.id,
                      value: {
                        service: v as TMenuService,
                      },
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
              <TableCell>
                <DeleteMenuButton id={plat.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
