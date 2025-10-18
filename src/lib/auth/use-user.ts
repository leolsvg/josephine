"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { supabase } from "../supabase/client";

export function useUser() {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data) router.replace("/auth/login");
      return data.user;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
    retry: false,
  });
  return data;
}

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
