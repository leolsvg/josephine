import { createBrowserClient } from "@supabase/ssr";
import { env } from "@/lib/env";

export const supabase = createBrowserClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true, // ensures session is restored on reload
      autoRefreshToken: true,
    },
  },
);
