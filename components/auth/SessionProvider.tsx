"use client";

import { createContext, useContext, useState } from "react";
import type { Session } from "@/lib/services/auth/authService";
import { getSession } from "@/lib/services/auth/session";

interface SessionContextValue {
  session: Session | null;
  loading: boolean;
}

const SessionContext = createContext<SessionContextValue>({ session: null, loading: true });

export function useSession() {
  return useContext(SessionContext);
}

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  // getSession() is a synchronous localStorage read guarded for SSR (returns null server-side),
  // so a lazy initializer is sufficient — no effect needed, and loading is always false on mount.
  const [session] = useState<Session | null>(() => getSession());

  return (
    <SessionContext.Provider value={{ session, loading: false }}>
      {children}
    </SessionContext.Provider>
  );
}
