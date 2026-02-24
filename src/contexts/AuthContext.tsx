import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: { first_name: string; avatar_url: string | null } | null;
  subscribed: boolean;
  subscriptionEnd: string | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshSubscription: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<AuthState["profile"]>(null);
  const [subscribed, setSubscribed] = useState(false);
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("first_name, avatar_url")
      .eq("id", userId)
      .single();
    if (data) setProfile(data);
  };

  const refreshSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("check-subscription");
      if (!error && data) {
        setSubscribed(data.subscribed ?? false);
        setSubscriptionEnd(data.subscription_end ?? null);
      }
    } catch {
      // silently fail
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, sess) => {
        setSession(sess);
        setUser(sess?.user ?? null);
        if (sess?.user) {
          await fetchProfile(sess.user.id);
          await refreshSubscription();
        } else {
          setProfile(null);
          setSubscribed(false);
          setSubscriptionEnd(null);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session: sess } }) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess?.user) {
        fetchProfile(sess.user.id);
        refreshSubscription();
      }
      setLoading(false);
    });

    // Refresh subscription every 60s
    const interval = setInterval(() => {
      if (user) refreshSubscription();
    }, 60000);

    return () => {
      subscription.unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setSubscribed(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, subscribed, subscriptionEnd, loading, signOut, refreshSubscription }}>
      {children}
    </AuthContext.Provider>
  );
};
