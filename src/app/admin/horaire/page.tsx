"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Horaire {
  id: string;
  jour: string;
  heure_debut: string;
  heure_fin: string;
}

export default function AdminHoraires() {
  const [horaires, setHoraires] = useState<Horaire[]>([]);
  const [jour, setJour] = useState("lundi");
  const [heureDebut, setHeureDebut] = useState("12:00");
  const [heureFin, setHeureFin] = useState("14:00");

  useEffect(() => {
    fetchHoraires();
  }, []);

  async function fetchHoraires() {
    const { data, error } = await supabase
      .from("horaires_ouverture")
      .select("*")
      .order("jour", { ascending: true });
    if (!error) setHoraires(data);
  }

  async function ajouterHoraire() {
    if (heureDebut >= heureFin) {
      alert("Heure de début doit être avant l'heure de fin.");
      return;
    }

    const { error } = await supabase.from("horaires_ouverture").insert({
      jour,
      heure_debut: heureDebut,
      heure_fin: heureFin,
    });

    if (!error) {
      setJour("lundi");
      setHeureDebut("12:00");
      setHeureFin("14:00");
      fetchHoraires();
    }
  }

  async function supprimerHoraire(id: string) {
    const { error } = await supabase
      .from("horaires_ouverture")
      .delete()
      .eq("id", id);
    if (!error) fetchHoraires();
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Gestion des horaires d’ouverture
      </h1>

      <div className="flex gap-4 mb-6 items-end">
        <select
          value={jour}
          onChange={(e) => setJour(e.target.value)}
          className="border p-2 rounded w-full"
        >
          {[
            "lundi",
            "mardi",
            "mercredi",
            "jeudi",
            "vendredi",
            "samedi",
            "dimanche",
          ].map((j) => (
            <option key={j} value={j}>
              {j.charAt(0).toUpperCase() + j.slice(1)}
            </option>
          ))}
        </select>

        <input
          type="time"
          value={heureDebut}
          onChange={(e) => setHeureDebut(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="time"
          value={heureFin}
          onChange={(e) => setHeureFin(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={ajouterHoraire}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Ajouter
        </button>
      </div>

      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Jour</th>
            <th className="p-2">Heure début</th>
            <th className="p-2">Heure fin</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {horaires.map((horaire) => (
            <tr key={horaire.id} className="border-t">
              <td className="p-2 capitalize">{horaire.jour}</td>
              <td className="p-2">{horaire.heure_debut}</td>
              <td className="p-2">{horaire.heure_fin}</td>
              <td className="p-2">
                <button
                  onClick={() => supprimerHoraire(horaire.id)}
                  className="text-red-600 hover:underline"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
          {horaires.length === 0 && (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500">
                Aucun horaire pour l’instant.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
