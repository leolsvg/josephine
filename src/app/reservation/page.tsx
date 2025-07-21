"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ReservationPage() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [personnes, setPersonnes] = useState(1);
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const personnesVal = Number(personnes);
    if (isNaN(personnesVal) || personnesVal < 1) {
      setError("Nombre de personnes invalide.");
      return;
    }

    const { error } = await supabase.from("reservation").insert([
      {
        nom,
        email,
        personnes: personnesVal,
        date,
        notes,
      },
    ]);

    if (error) {
      console.error(error);
      setError("Une erreur est survenue. Veuillez réessayer.");
    } else {
      setSuccess(true);
      setNom("");
      setEmail("");
      setPersonnes(1);
      setDate("");
      setNotes("");

      setTimeout(() => {
        router.push("/");
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Réserver une table</h1>

        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Nombre de personnes"
          value={personnes.toString()}
          onChange={(e) => {
            const parsed = parseInt(e.target.value);
            if (!isNaN(parsed)) {
              setPersonnes(parsed);
            } else {
              setPersonnes(1);
            }
          }}
          min={1}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          placeholder="Notes (facultatif)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {error && <p className="text-red-500">{error}</p>}
        {success && (
          <p className="text-green-600">Réservation envoyée avec succès !</p>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
        >
          Réserver
        </button>
      </form>
    </div>
  );
}
