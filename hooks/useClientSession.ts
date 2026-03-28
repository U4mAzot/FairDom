"use client";

import type { User } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import { FAIRDOM_SESSION_KEY, type FairdomSession } from "@/lib/clientSession";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { ensureProfileRow } from "@/lib/profileSync";
import { fairdomSessionFromUser } from "@/lib/sessionFromUser";

export function useClientSession() {
  const [session, setSession] = useState<FairdomSession | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  const applyUser = useCallback((next: User | null) => {
    setUser(next);
    if (!next?.email) {
      setSession(null);
      return;
    }
    setSession(fairdomSessionFromUser(next));
    void ensureProfileRow(next).then(({ error }) => {
      if (error) console.warn("[FairDom] ensureProfileRow:", error);
    });
  }, []);

  const sync = useCallback(async () => {
    if (!isSupabaseConfigured()) return;
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    applyUser(data.user);
  }, [applyUser]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!isSupabaseConfigured()) {
      setReady(true);
      return;
    }

    try {
      localStorage.removeItem(FAIRDOM_SESSION_KEY);
    } catch {
      /* ignore */
    }

    const supabase = createClient();
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      if (!mounted) return;
      applyUser(s?.user ?? null);
      setReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      applyUser(nextSession?.user ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [applyUser]);

  const logout = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setSession(null);
      setUser(null);
      return;
    }
    const supabase = createClient();
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
  }, []);

  return { session, user, ready, logout, sync };
}
