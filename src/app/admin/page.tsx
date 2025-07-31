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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">
        Espace Administrateur
      </h1>

      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-start items-stretch max-w-3xl mx-auto">
        <Link href="/admin/reservation" className="w-full sm:w-auto">
          <button className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
            Voir les réservations
          </button>
        </Link>

        <Link href="/admin/menu_edit" className="w-full sm:w-auto">
          <button className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
            Modifier le menu
          </button>
        </Link>

        <Link href="/admin/parametre_reservation" className="w-full sm:w-auto">
          <button className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
            Paramètres de réservation
          </button>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}
