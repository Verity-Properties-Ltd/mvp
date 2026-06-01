// src/lib/api.ts

import axios from "axios";
import { tokenStore, userStore } from "./tokenStore";

// NEXT_PUBLIC_API_URL is the bare host (no /api/v1). The spec mounts every
// route under /api/v1, so we append it once here and hooks use clean paths
// like "/waitlist", "/auth/login", etc.
const baseURL = `${process.env.NEXT_PUBLIC_API_URL ?? ""}/api/v1`;

const api = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
});

// ─── Request: attach the access token when present ────────────────────────────
api.interceptors.request.use((config) => {
    const token = tokenStore.get();
    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ─── Response: clear session + bounce on 401 ─────────────────────────────────
// Public endpoints (waitlist, founding-partner) never hit this. It only matters
// once you start calling secured routes. Swap this for a refresh-token flow
// against POST /auth/refresh later if you want silent re-auth.
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;
        if (status === 401 && typeof window !== "undefined") {
            tokenStore.clear();
            userStore.clear();
            if (!window.location.pathname.startsWith("/sign-in")) {
                window.location.href = "/sign-in";
            }
        }
        return Promise.reject(error);
    }
);

export default api;