"use client";

import { useCallback, useEffect, useState } from "react";
import {
  FAIRDOM_SESSION_KEY,
  clearSession as clearStored,
  readSession,
  writeSession as writeStored,
  type FairdomSession,
} from "@/lib/clientSession";

export function useClientSession() {
  const [session, setSession] = useState<FairdomSession | null>(null);
  const [ready, setReady] = useState(false);

  const sync = useCallback(() => {
    setSession(readSession());
  }, []);

  useEffect(() => {
    sync();
    setReady(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === FAIRDOM_SESSION_KEY || e.key === null) sync();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("fairdom-session-change", sync);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("fairdom-session-change", sync);
    };
  }, [sync]);

  const login = useCallback((next: FairdomSession) => {
    writeStored(next);
    setSession(next);
  }, []);

  const logout = useCallback(() => {
    clearStored();
    setSession(null);
  }, []);

  return { session, ready, login, logout, sync };
}
