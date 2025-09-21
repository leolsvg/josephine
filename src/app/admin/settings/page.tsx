"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {
  const [params, setParams] = useState<{
    id?: string;
    personnes_min_par_resa: number;
    personnes_max_par_resa: number;
    capacite_max_par_creneau: number;
    capacite_max_par_service: number;
  }>({
    personnes_min_par_resa: 1,
    personnes_max_par_resa: 10,
    capacite_max_par_creneau: 20,
    capacite_max_par_service: 50,
  });
  const supabase = createClient();

  useEffect(() => {
    const fetchParams = async () => {
      const { data, error } = await supabase
        .from("parametres_reservation")
        .select("*")
        .single();

      if (error) {
        console.error("Erreur fetch :", error);
        return;
      }

      if (data) setParams(data);
    };

    fetchParams();
  }, [supabase]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams((prev) => ({
      ...prev,
      [e.target.name]: Number(e.target.value),
    }));
  };

  const handleSave = async () => {
    if (!params.id) {
      alert("Erreur : ID non trouvé pour la mise à jour.");
      return;
    }

    const { error } = await supabase
      .from("parametres_reservation")
      .update({
        personnes_min_par_resa: params.personnes_min_par_resa,
        personnes_max_par_resa: params.personnes_max_par_resa,
        capacite_max_par_creneau: params.capacite_max_par_creneau,
        capacite_max_par_service: params.capacite_max_par_service,
      })
      .eq("id", params.id);

    if (error) {
      alert("Erreur lors de la mise à jour.");
      console.error(error);
    } else {
      alert("Paramètres mis à jour !");
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto mt-12 px-4 sm:px-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Paramètres de réservation
      </h1>

      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">
            Nombre minimum de personnes :
          </label>
          <input
            type="number"
            name="personnes_min_par_resa"
            value={params.personnes_min_par_resa}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Nombre maximum de personnes pour une réservation :
          </label>
          <input
            type="number"
            name="personnes_max_par_resa"
            value={params.personnes_max_par_resa}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Capacité maximum par créneau :
          </label>
          <input
            type="number"
            name="capacite_max_par_creneau"
            value={params.capacite_max_par_creneau}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Capacité maximum par service :
          </label>
          <input
            type="number"
            name="capacite_max_par_service"
            value={params.capacite_max_par_service}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full sm:w-auto mt-4 bg-[#000150] text-white px-6 py-2 rounded hover:bg-[#1a1a80] transition"
        >
          Sauvegarder
        </button>
      </div>
    </div>
  );
}
