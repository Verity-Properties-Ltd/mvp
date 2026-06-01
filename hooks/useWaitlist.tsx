// src/hooks/useWaitlist.ts

import api from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { ApiError } from "@/types/waitlist";
import type {
    WaitlistPayload,
    WaitlistResponse,
    WaitlistEntry,
    FoundingPartnerPayload,
    FoundingPartnerResponse,
    FoundingPartnerApplication,
} from "@/types/waitlist";

// ─── Helper ───────────────────────────────────────────────────────────────────

function extractMessage(error: unknown): string {
    const err = error as AxiosError<ApiError>;
    return (
        err.response?.data?.message ??
        err.response?.data?.error ??
        "Something went wrong. Please try again."
    );
}

// ─── POST /waitlist ───────────────────────────────────────────────────────────
// Public — buyer waitlist signup.

export function useWaitlistSignup() {
    return useMutation({
        mutationFn: async (payload: WaitlistPayload) => {
            try {
                const { data } = await api.post<WaitlistResponse>("/waitlist", payload);
                return data;
            } catch (error) {
                throw new Error(extractMessage(error));
            }
        },
    });
}

// ─── POST /waitlist/founding-partner ──────────────────────────────────────────
// Public — Founding 50 developer application.

export function useFoundingPartnerApply() {
    return useMutation({
        mutationFn: async (payload: FoundingPartnerPayload) => {
            try {
                const { data } = await api.post<FoundingPartnerResponse>(
                    "/waitlist/founding-partner",
                    payload
                );
                return data;
            } catch (error) {
                throw new Error(extractMessage(error));
            }
        },
    });
}

// ─── GET /waitlist ────────────────────────────────────────────────────────────
// Secured (admin) — list all waitlist entries.

export function useWaitlistEntries() {
    return useQuery({
        queryKey: ["waitlist", "entries"],
        queryFn: async () => {
            const { data } = await api.get<WaitlistEntry[]>("/waitlist");
            return data;
        },
    });
}

// ─── GET /waitlist/founding-partner ───────────────────────────────────────────
// Secured (admin) — list all Founding Partner applications.

export function useFoundingPartnerApplications() {
    return useQuery({
        queryKey: ["waitlist", "founding-partners"],
        queryFn: async () => {
            const { data } = await api.get<FoundingPartnerApplication[]>(
                "/waitlist/founding-partner"
            );
            return data;
        },
    });
}

// ─── POST /waitlist/notify ────────────────────────────────────────────────────
// Secured (admin) — trigger the "we're live" notification to the waitlist.

export function useNotifyWaitlist() {
    return useMutation({
        mutationFn: async () => {
            try {
                const { data } = await api.post("/waitlist/notify");
                return data;
            } catch (error) {
                throw new Error(extractMessage(error));
            }
        },
    });
}