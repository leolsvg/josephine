"use client";

import { AuthError } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import type { TLogin } from "./use-login-form";

export function useSignIn() {
  const router = useRouter();
  return useMutation({
    mutationFn: async ({ email, password }: TLogin) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    },
    onSuccess: () => router.push("/admin/bookings"),
    onError: (e) => {
      if (e instanceof AuthError && e.code === "invalid_credentials")
        return toast.error("Email ou mot de passe invalide.");
      if (e instanceof Error) {
        return toast.error(`Une erreur est survenue : ${e.message}.`);
      }
      return toast.error(`Une erreur inconnue est survenue.`);
    },
  });
}
