"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ParametresReservation() {
  const [params, setParams] = useState<{
    id?: string; // UUID ici
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
  }, []);

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
    <div className="max-w-xl mx-auto mt-12 space-y-4">
      <h1 className="text-2xl font-bold">Paramètres de réservation</h1>

      <label className="block">
        Nombre minimum de personnes :
        <input
          type="number"
          name="personnes_min_par_resa"
          value={params.personnes_min_par_resa}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </label>

      <label className="block">
        Nombre maximum de personnes pour une réservation :
        <input
          type="number"
          name="personnes_max_par_resa"
          value={params.personnes_max_par_resa}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </label>

      <label className="block">
        Capacité maximum par créneau :
        <input
          type="number"
          name="capacite_max_par_creneau"
          value={params.capacite_max_par_creneau}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </label>

      <label className="block">
        Capacité maximum par service :
        <input
          type="number"
          name="capacite_max_par_service"
          value={params.capacite_max_par_service}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </label>

      <button
        onClick={handleSave}
        className="bg-black text-white p-2 rounded hover:bg-gray-800"
      >
        Sauvegarder
      </button>
    </div>
  );
}
