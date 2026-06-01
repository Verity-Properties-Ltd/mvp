// src/types/waitlist.ts
//
// Types for the Waitlist + Founding Partner domain.
// Enum string values mirror the API spec exactly (verityspec.json) — do not
// change them, they are what the backend validates against.

// ─── Enums (string literal unions matching the API) ───────────────────────────

export type WaitlistCountry =
    | "uk"
    | "us"
    | "canada"
    | "nigeria"
    | "uae"
    | "germany"
    | "ireland"
    | "australia"
    | "south_africa"
    | "other";

export type WaitlistTiming =
    | "active_negotiation"
    | "within_3_months"
    | "within_6_months"
    | "just_researching";

export type PortfolioSize = "1_10" | "11_50" | "51_200" | "200_plus";

export type FoundingPartnerRole =
    | "founder"
    | "ceo"
    | "managing_director"
    | "head_of_sales"
    | "operations"
    | "other";

// ─── Request payloads ─────────────────────────────────────────────────────────

// POST /waitlist  (WaitlistRequest)
export interface WaitlistPayload {
    first_name: string;
    last_name: string;
    email: string;
    country?: WaitlistCountry | null;
    timing?: WaitlistTiming | null;
}

// POST /waitlist/founding-partner  (FoundingPartnerRequest)
export interface FoundingPartnerPayload {
    first_name: string;
    last_name: string;
    work_email: string;
    company_name: string;
    portfolio_size: PortfolioSize;
    role: FoundingPartnerRole;
    website?: string | null;
    about: string;
}

// ─── Entities (returned by the GET admin endpoints) ───────────────────────────
// NOTE: the spec returns an empty response schema for these, so the fields below
// are the expected shape. Adjust to match your actual serializer if it differs.

export interface WaitlistEntry {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    country: WaitlistCountry | null;
    timing: WaitlistTiming | null;
    created_at: string;
}

export interface FoundingPartnerApplication {
    id: string;
    first_name: string;
    last_name: string;
    work_email: string;
    company_name: string;
    portfolio_size: PortfolioSize;
    role: FoundingPartnerRole;
    website: string | null;
    about: string;
    created_at: string;
}

// ─── Responses ────────────────────────────────────────────────────────────────
// The spec returns `{}` for these, so these envelopes are permissive.
// Tighten them once the backend response shape is locked.

export interface WaitlistResponse {
    success?: boolean;
    message?: string;
    data?: WaitlistEntry;
}

export interface FoundingPartnerResponse {
    success?: boolean;
    message?: string;
    data?: FoundingPartnerApplication;
}

export interface ApiError {
    message?: string;
    error?: string;
    statusCode?: number;
}