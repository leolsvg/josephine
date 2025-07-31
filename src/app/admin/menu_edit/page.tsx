"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const categoriesOrdre = ["partager", "entree", "plat", "fromage", "dessert"];

export default function ModifierCartePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [plats, setPlats] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        setSession(session);
        fetchPlats();
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const fetchPlats = async () => {
    const { data, error } = await supabase.from("menus").select("*");
    if (!error) setPlats(data || []);
  };

  const updatePlat = async (id: string, field: string, value: string) => {
    const { error } = await supabase
      .from("menus")
      .update({ [field]: value })
      .eq("id", id);
    if (error) {
      console.error("❌ Erreur update :", error.message);
    }
  };

  const deletePlat = async (id: string) => {
    await supabase.from("menus").delete().eq("id", id);
    fetchPlats();
  };

  const ajouterPlat = async (type: "midi" | "soir") => {
    setIsAdding(true);
    const { data, error } = await supabase
      .from("menus")
      .insert({
        description: "Nouveau plat",
        prix: "0",
        categorie: "plat",
        cartes: type,
      })
      .select();

    if (!error && data) {
      fetchPlats();
    }
    setIsAdding(false);
  };

  const renderTable = (
    data: any[],
    updatePlat: (id: string, field: string, value: string) => void,
    deletePlat: (id: string) => void
  ) => {
    const platsTries = [...data].sort(
      (a, b) =>
        categoriesOrdre.indexOf(a.categorie) -
        categoriesOrdre.indexOf(b.categorie)
    );

    return (
      <div className="overflow-x-auto border rounded">
        <table className="min-w-full bg-white text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Description</th>
              <th className="p-2">Prix</th>
              <th className="p-2">Catégorie</th>
              <th className="p-2">Carte</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {platsTries.map((plat) => (
              <tr key={plat.id} className="border-t">
                <td className="p-2 min-w-[200px]">
                  <input
                    defaultValue={plat.description}
                    onBlur={(e) =>
                      updatePlat(plat.id, "description", e.target.value)
                    }
                    className="w-full border px-2 py-1 rounded"
                  />
                </td>
                <td className="p-2 min-w-[80px]">
                  <input
                    defaultValue={plat.prix}
                    onBlur={(e) => updatePlat(plat.id, "prix", e.target.value)}
                    className="w-full border px-2 py-1 rounded"
                  />
                </td>
                <td className="p-2 min-w-[120px]">
                  <select
                    defaultValue={plat.categorie}
                    onBlur={(e) =>
                      updatePlat(plat.id, "categorie", e.target.value)
                    }
                    className="w-full border px-2 py-1 rounded"
                  >
                    <option value="partager">À partager</option>
                    <option value="entree">Entrée</option>
                    <option value="plat">Plat</option>
                    <option value="fromage">Fromage</option>
                    <option value="dessert">Dessert</option>
                  </select>
                </td>
                <td className="p-2 min-w-[100px]">
                  <select
                    defaultValue={plat.cartes}
                    onBlur={(e) =>
                      updatePlat(plat.id, "cartes", e.target.value)
                    }
                    className="w-full border px-2 py-1 rounded"
                  >
                    <option value="midi">Midi</option>
                    <option value="soir">Soir</option>
                  </select>
                </td>
                <td className="p-2 min-w-[90px]">
                  <button
                    onClick={() => deletePlat(plat.id)}
                    className="text-red-600 hover:underline"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  if (loading) return <div className="p-8">Chargement...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Modifier la carte</h1>
      </div>

      {/* 🟡 MENU MIDI */}
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-4">
          <h2 className="text-xl font-semibold">Menu du midi</h2>
          <button
            onClick={() => ajouterPlat("midi")}
            disabled={isAdding}
            className="bg-[#000150] text-white px-4 py-2 rounded hover:bg-[#1a1a80] disabled:opacity-50"
          >
            {isAdding ? "Ajout..." : "➕ Ajouter un plat (midi)"}
          </button>
        </div>
        {renderTable(
          plats.filter((p) => p.cartes === "midi"),
          updatePlat,
          deletePlat
        )}
      </div>

      {/* 🔵 MENU SOIR */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-4">
          <h2 className="text-xl font-semibold">Menu du soir</h2>
          <button
            onClick={() => ajouterPlat("soir")}
            disabled={isAdding}
            className="bg-[#000150] text-white px-4 py-2 rounded hover:bg-[#1a1a80] disabled:opacity-50"
          >
            {isAdding ? "Ajout..." : "➕ Ajouter un plat (soir)"}
          </button>
        </div>
        {renderTable(
          plats.filter((p) => p.cartes === "soir"),
          updatePlat,
          deletePlat
        )}
      </div>
    </div>
  );
}
