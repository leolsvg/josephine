"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface Reservation {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  personnes: number;
  date: string;
  notes: string;
  arrivee: boolean;
}

export default function AdminReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    nom: "",
    email: "",
    telephone: "",
    personnes: 1,
    date: "",
    notes: "",
  });

  const router = useRouter();

  const fetchData = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      router.push("/login");
      return;
    }

    const { data, error } = await supabase
      .from("reservation")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      console.error("Erreur de récupération :", error.message);
    } else {
      setReservations(data as Reservation[]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // actualise toutes les 30s
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette réservation ?"
    );
    if (!confirmDelete) return;

    const { error } = await supabase.from("reservation").delete().eq("id", id);
    if (error) {
      console.error("Erreur lors de la suppression :", error.message);
    } else {
      setReservations((prev) => prev.filter((res) => res.id !== id));
    }
  };

  const handleCheckArrivee = async (res: Reservation) => {
    const { error } = await supabase
      .from("reservation")
      .update({ arrivee: !res.arrivee })
      .eq("id", res.id);

    if (error) {
      console.error("Erreur maj arrivée:", error.message);
    } else {
      setReservations((prev) =>
        prev.map((r) => (r.id === res.id ? { ...r, arrivee: !res.arrivee } : r))
      );
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("reservation").insert([form]);
    if (error) {
      console.error("Erreur insertion :", error.message);
    } else {
      setForm({
        nom: "",
        email: "",
        telephone: "",
        personnes: 1,
        date: "",
        notes: "",
      });
      setShowForm(false);
      fetchData();
    }
  };

  if (loading) return <p className="p-6">Chargement...</p>;

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Réservations</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Déconnexion
        </button>
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Nouvelle réservation
      </button>

      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          className="bg-white p-4 rounded shadow mb-6 space-y-3"
        >
          <input
            type="text"
            placeholder="Nom"
            value={form.nom}
            onChange={(e) => setForm({ ...form, nom: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="tel"
            placeholder="Téléphone"
            value={form.telephone}
            onChange={(e) => setForm({ ...form, telephone: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Personnes"
            value={form.personnes}
            min={1}
            onChange={(e) =>
              setForm({ ...form, personnes: parseInt(e.target.value) })
            }
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="datetime-local"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            placeholder="Notes (facultatif)"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
          >
            Enregistrer
          </button>
        </form>
      )}

      {reservations.length === 0 ? (
        <p>Aucune réservation pour le moment.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow rounded text-sm">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3 min-w-[120px]">Nom</th>
                <th className="p-3 min-w-[160px]">Email</th>
                <th className="p-3 min-w-[120px]">Téléphone</th>
                <th className="p-3 min-w-[90px]">Personnes</th>
                <th className="p-3 min-w-[160px]">Date</th>
                <th className="p-3 min-w-[160px]">Notes</th>
                <th className="p-3 min-w-[70px] text-center">Arrivé ?</th>
                <th className="p-3 min-w-[100px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((res) => (
                <tr key={res.id} className="border-t">
                  <td className="p-3">{res.nom}</td>
                  <td className="p-3">{res.email}</td>
                  <td className="p-3">{res.telephone}</td>
                  <td className="p-3">{res.personnes}</td>
                  <td className="p-3">
                    {new Date(res.date).toLocaleString("fr-FR")}
                  </td>
                  <td className="p-3">{res.notes}</td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={!!res.arrivee}
                      onChange={() => handleCheckArrivee(res)}
                    />
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(res.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
