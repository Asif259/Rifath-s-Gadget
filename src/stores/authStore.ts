import { create } from "zustand";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

interface AuthState {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
}

async function checkAdminStatus(userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("admin_users")
      .select("id")
      .eq("id", userId)
      .maybeSingle();
    if (error) {
      console.warn("[Auth] Failed to check admin status:", error.message);
      return false;
    }
    return Boolean(data);
  } catch (err) {
    console.warn("[Auth] Exception checking admin status:", err);
    return false;
  }
}

// shortcut: admin removed mid-session not re-detected until reload/sign-out (RLS still guards data).
let verifiedUserId: string | null = null;

export const useAuthStore = create<AuthState>(() => ({
  session: null,
  user: null,
  isAdmin: false,
  loading: true,

  signIn: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { error: new Error(error.message) };
      if (data.user) {
        const admin = await checkAdminStatus(data.user.id);
        if (!admin) {
          await supabase.auth.signOut();
          return {
            error: new Error(
              "Access Denied: Your account is authenticated, but is not registered in public.admin_users.",
            ),
          };
        }
      }
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err : new Error(String(err)) };
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      return { error: error ? new Error(error.message) : null };
    } catch (err) {
      return { error: err instanceof Error ? err : new Error(String(err)) };
    }
  },
}));

async function syncSession(s: Session | null) {
  const set = useAuthStore.setState;
  if (!s?.user) {
    verifiedUserId = null;
    set({ session: null, user: null, isAdmin: false, loading: false });
    return;
  }
  // Focus/tab-switch re-fires SIGNED_IN/TOKEN_REFRESHED for the same user: refresh the
  // session silently, no loader (loader unmounts the dashboard).
  if (s.user.id === verifiedUserId) {
    set({ session: s });
    return;
  }
  set({ loading: true });
  const isAdmin = await checkAdminStatus(s.user.id);
  verifiedUserId = s.user.id;
  set({ session: s, user: s.user, isAdmin, loading: false });
}

supabase.auth.getSession().then(({ data: { session } }) => syncSession(session));
supabase.auth.onAuthStateChange((_e, s) => {
  void syncSession(s);
});
