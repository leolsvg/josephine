"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import { createClient } from "@/lib/supabase/client";
import type { TMenuCategory, TMenuService } from "@/server/db/types";

const menuCategories = [
  "partager",
  "entree",
  "plat",
  "fromage",
  "dessert",
] as const satisfies TMenuCategory[];

interface MenuItem {
  id: string;
  description: string;
  price: number;
  category: TMenuCategory;
  service: TMenuService;
}

export default function ModifierCartePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [, setSession] = useState<unknown>(null); // on n'utilise pas session → on ignore la 1ère valeur
  const [plats, setPlats] = useState<MenuItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const supabase = createClient();
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      setSession(session);
      await fetchPlats();
      setLoading(false);
    };

    checkSession();
  }, [router, supabase]); // ajoute router pour éviter le warning react-hooks/exhaustive-deps

  const fetchPlats = async () => {
    const { data, error } = await supabase.from("menus").select("*");
    if (error) {
      console.error("❌ Erreur fetch menus :", error.message);
      return;
    }
    setPlats((data as MenuItem[]) || []);
  };

  const updatePlat = async (
    id: string,
    field: keyof MenuItem,
    value: string,
  ) => {
    const { error } = await supabase
      .from("menus")
      .update({ [field]: value })
      .eq("id", id);
    if (error) {
      console.error("❌ Erreur update :", error.message);
      return;
    }
    // Optionnel: mettre à jour localement pour une sensation instantanée
    setPlats((prev) =>
      prev.map((p) =>
        p.id === id ? ({ ...p, [field]: value } as MenuItem) : p,
      ),
    );
  };

  const deletePlat = async (id: string) => {
    const { error } = await supabase.from("menus").delete().eq("id", id);
    if (error) {
      console.error("❌ Erreur delete :", error.message);
      return;
    }
    setPlats((prev) => prev.filter((p) => p.id !== id));
  };

  const ajouterPlat = async (type: TMenuService) => {
    setIsAdding(true);
    const { data, error } = await supabase
      .from("menus")
      .insert({
        description: "Nouveau plat",
        price: 0,
        category: "plat",
        service: type,
      })
      .select();

    if (error) {
      console.error("❌ Erreur insert :", error.message);
      setIsAdding(false);
      return;
    }

    if (data && data.length) {
      setPlats((prev) => [...prev, data[0] as MenuItem]);
    }
    setIsAdding(false);
  };

  const renderTable = (
    data: MenuItem[],
    updatePlatFn: (id: string, field: keyof MenuItem, value: string) => void,
    deletePlatFn: (id: string) => void,
  ) => {
    const orderedItems = data.toSorted(
      (a, b) =>
        menuCategories.indexOf(a.category) - menuCategories.indexOf(b.category),
    );
    return (
      <Card className="py-0 overflow-hidden overflow-x-scroll">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
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
                      updatePlatFn(plat.id, "description", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    defaultValue={String(plat.price)}
                    onBlur={(e) =>
                      updatePlatFn(plat.id, "price", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Select
                    defaultValue={plat.category}
                    onValueChange={(v) =>
                      updatePlatFn(plat.id, "category", v as TMenuCategory)
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
                      updatePlatFn(plat.id, "service", v as TMenuService)
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
                    onClick={() => deletePlatFn(plat.id)}
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
  };

  if (loading) return <div className="p-8">Chargement...</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Modifier la carte</h1>
      </div>

      <div className="mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-4">
          <h2 className="text-xl font-semibold">Menu du midi</h2>
          <Button onClick={() => ajouterPlat("midi")} disabled={isAdding}>
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
        {renderTable(
          plats.filter((p) => p.service === "midi"),
          updatePlat,
          deletePlat,
        )}
      </div>

      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-4">
          <h2 className="text-xl font-semibold">Menu du soir</h2>
          <Button onClick={() => ajouterPlat("soir")} disabled={isAdding}>
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
        {renderTable(
          plats.filter((p) => p.service === "soir"),
          updatePlat,
          deletePlat,
        )}
      </div>
    </div>
  );
}
