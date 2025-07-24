"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Vérifie si l'utilisateur est connecté
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
      } else {
        setSession(session);
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return <div className="p-8">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Espace Administrateur</h1>
        <Link href="/admin/reservation">
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
            Voir les réservations
          </button>
        </Link>
        <Link href="/admin/menu_edit">
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
            Modifier le menu
          </button>
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Déconnexion
        </button>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <p>
          Bienvenue dans la page admin. Tu peux afficher ici les réservations,
          modifier le menu, etc.
        </p>
      </div>
    </div>
  );
}
