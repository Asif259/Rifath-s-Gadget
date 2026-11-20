import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const checkAdminStatus = async (userId: string): Promise<boolean> => {
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
  };

  useEffect(() => {
    let mounted = true;

    const syncSession = async (currentSession: Session | null) => {
      if (!currentSession?.user) {
        if (mounted) {
          setSession(null);
          setUser(null);
          setIsAdmin(false);
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      const adminStatus = await checkAdminStatus(currentSession.user.id);
      if (mounted) {
        setSession(currentSession);
        setUser(currentSession.user);
        setIsAdmin(adminStatus);
        setLoading(false);
      }
    };

    // 1. Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      syncSession(session);
    });

    // 2. Listen to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      syncSession(currentSession);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        return { error: new Error(error.message) };
      }

      if (data.user) {
        const adminStatus = await checkAdminStatus(data.user.id);
        if (!adminStatus) {
          await supabase.auth.signOut();
          return {
            error: new Error(
              "Access Denied: Your account is authenticated, but is not registered in public.admin_users."
            ),
          };
        }
      }

      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err : new Error(String(err)) };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      return { error: error ? new Error(error.message) : null };
    } catch (err) {
      return { error: err instanceof Error ? err : new Error(String(err)) };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        isAdmin,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
