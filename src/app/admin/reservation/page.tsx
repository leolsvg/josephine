"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface Reservation {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  personnes: number;
  date: string; // datetime ISO ou timestamptz côté DB
  notes: string;
  arrivee: boolean;
}

type SavingState = Record<string, boolean>;

export default function AdminReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<SavingState>({});
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    nom: "",
    email: "",
    telephone: "",
    personnes: 1,
    date: "",
    notes: "",
  });

  const [q, setQ] = useState(""); // recherche rapide
  const router = useRouter();

  const fetchData = useCallback(async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      router.push("/login");
      return;
    }

    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("reservation")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      console.error("Erreur de récupération :", error.message);
      setError(error.message);
    } else {
      setReservations((data || []) as Reservation[]);
    }

    setLoading(false);
  }, [router]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // refresh 30s
    return () => clearInterval(interval);
  }, [fetchData]);

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
    setSaving((s) => ({ ...s, [res.id]: true }));
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
    setSaving((s) => ({ ...s, [res.id]: false }));
  };

  // ----- ÉDITION INLINE (patch) -----
  const patchReservation = async (id: string, patch: Partial<Reservation>) => {
    setSaving((s) => ({ ...s, [id]: true }));
    setError(null);

    // UI optimiste
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...patch } : r))
    );

    const { error } = await supabase
      .from("reservation")
      .update(patch)
      .eq("id", id);

    if (error) {
      // rollback minimal : on refetch si erreur
      console.error("Erreur update:", error.message);
      setError(error.message);
      fetchData();
    }

    setSaving((s) => ({ ...s, [id]: false }));
  };

  // petite aide : enregistrer au blur/Enter
  const handleEditableBlur =
    (r: Reservation, field: keyof Reservation) =>
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.currentTarget.value;
      // si rien n'a changé, on ne patch pas
      if ((r[field] ?? "") === value) return;
      // notes: conserver null/"" selon ton schéma. Ici: string vide -> null pour notes
      if (field === "notes") {
        patchReservation(r.id, {
          notes: value.trim() === "" ? "" : value,
        } as Partial<Reservation>);
      } else if (field === "nom") {
        patchReservation(r.id, { nom: value } as Partial<Reservation>);
      }
    };

  const handleEditableKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    }
    // Éscape -> annule visuellement en re-blurant (le refetch périodique remettra la valeur)
    if (e.key === "Escape") {
      (e.target as HTMLInputElement).blur();
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      email: form.email.trim() === "" ? null : form.email.trim(), // facultatif
    };

    const { error } = await supabase.from("reservation").insert([payload]);
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

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return reservations;
    return reservations.filter((r) =>
      [r.nom, r.email, r.telephone, r.notes]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(s))
    );
  }, [reservations, q]);

  if (loading) return <p className="p-6">Chargement...</p>;

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Réservations</h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Recherche (nom, email, tel, notes)"
            className="border rounded px-3 py-2 w-full sm:w-80"
          />
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Déconnexion
          </button>
        </div>
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
            placeholder="Email facultatif"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border p-2 rounded"
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
              setForm({
                ...form,
                personnes: parseInt(e.target.value || "1", 10),
              })
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

      {error && (
        <div className="mb-3 text-sm text-red-600">Erreur : {error}</div>
      )}

      {filtered.length === 0 ? (
        <p>Aucune réservation pour le moment.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow rounded text-sm">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3 min-w-[160px]">Nom (éditable)</th>
                <th className="p-3 min-w-[180px]">Email</th>
                <th className="p-3 min-w-[140px]">Téléphone</th>
                <th className="p-3 min-w-[90px]">Personnes</th>
                <th className="p-3 min-w-[170px]">Date</th>
                <th className="p-3 min-w-[220px]">Notes (éditable)</th>
                <th className="p-3 min-w-[70px] text-center">Arrivé ?</th>
                <th className="p-3 min-w-[120px]">État</th>
                <th className="p-3 min-w-[100px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t">
                  {/* NOM — input inline */}
                  <td className="p-3">
                    <input
                      defaultValue={r.nom}
                      onBlur={handleEditableBlur(r, "nom")}
                      onKeyDown={handleEditableKeyDown}
                      className="border rounded px-2 py-1 w-full"
                    />
                  </td>

                  <td className="p-3">{r.email}</td>
                  <td className="p-3">{r.telephone}</td>
                  <td className="p-3">{r.personnes}</td>
                  <td className="p-3">
                    {new Date(r.date).toLocaleString("fr-FR")}
                  </td>

                  {/* NOTES — textarea inline */}
                  <td className="p-3">
                    <textarea
                      defaultValue={r.notes || ""}
                      onBlur={handleEditableBlur(r, "notes")}
                      onKeyDown={handleEditableKeyDown}
                      className="border rounded px-2 py-1 w-full min-h-[36px]"
                      rows={2}
                    />
                  </td>

                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={!!r.arrivee}
                      onChange={() => handleCheckArrivee(r)}
                    />
                  </td>

                  <td className="p-3">
                    {saving[r.id] ? (
                      <span className="text-xs text-gray-500">Sauvegarde…</span>
                    ) : (
                      <span className="text-xs text-gray-400">OK</span>
                    )}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(r.id)}
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
