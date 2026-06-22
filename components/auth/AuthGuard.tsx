"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Role } from "@/lib/services/auth/authService";
import { useSession } from "./SessionProvider";

/**
 * Minimal guard for Phase 1 — checks session presence/role and redirects.
 * Full subRole + KYC gating lands in Phase 2/3 per docs/architecture.md §2.
 */
export default function AuthGuard({
  role,
  children,
}: {
  role: Role;
  children: React.ReactNode;
}) {
  const { session, loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!session) {
      router.replace("/sign-in");
      return;
    }
    if (session.role !== role) {
      router.replace(session.role === "developer" ? "/app/developer" : "/app/buyer");
    }
  }, [loading, session, role, router]);

  if (loading || !session || session.role !== role) return null;

  return <>{children}</>;
}
