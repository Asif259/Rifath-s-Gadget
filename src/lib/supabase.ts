import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/delivery";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  "";

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

if (!supabaseUrl || !supabaseAnonKey) {
  if (import.meta.env.DEV) {
    console.warn(
      "[Supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not set. Please populate .env.local to connect to Supabase."
    );
  }
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
