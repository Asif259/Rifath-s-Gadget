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

      if (error || !data) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    let mounted = true;

    // 1. Initial session check
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!mounted) return;

      if (session?.user) {
        setSession(session);
        setUser(session.user);
        const adminStatus = await checkAdminStatus(session.user.id);
        if (mounted) {
          setIsAdmin(adminStatus);
          setLoading(false);
        }
      } else {
        setSession(null);
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
      }
    });

    // 2. Listen to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      if (!mounted) return;

      if (currentSession?.user) {
        setSession(currentSession);
        setUser(currentSession.user);
        const adminStatus = await checkAdminStatus(currentSession.user.id);
        if (mounted) {
          setIsAdmin(adminStatus);
          setLoading(false);
        }
      } else {
        setSession(null);
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
      }
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
            error: new Error("Access Denied: Your account is not authorized as an administrator."),
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
