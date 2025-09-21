import { useQuery } from "@tanstack/react-query";
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
  });
  return data;
}
