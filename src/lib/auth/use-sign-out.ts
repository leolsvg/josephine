"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { supabase } from "../supabase/client";

export function useSignOut() {
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: async () => {
      await supabase.auth.signOut();
      router.push("/auth/login");
    },
  });
  return { signOut: mutate };
}
