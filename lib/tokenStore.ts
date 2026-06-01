// src/lib/tokenstore.ts

const TOKEN_KEY = "verity-token";
const USER_KEY = "verity-user";

export const tokenStore = {
    get: (): string | null => {
        if (typeof window === "undefined") return null;
        return localStorage.getItem(TOKEN_KEY);
    },

    set: (token: string): void => {
        if (typeof window === "undefined") return;
        localStorage.setItem(TOKEN_KEY, token);
    },

    clear: (): void => {
        if (typeof window === "undefined") return;
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    },

    isAuthenticated: (): boolean => {
        return !!tokenStore.get();
    },
};

export const userStore = {
    get: <T = unknown>(): T | null => {
        if (typeof window === "undefined") return null;
        const raw = localStorage.getItem(USER_KEY);
        if (!raw) return null;
        try {
            return JSON.parse(raw) as T;
        } catch {
            return null;
        }
    },

    set: (user: unknown): void => {
        if (typeof window === "undefined") return;
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    },

    clear: (): void => {
        if (typeof window === "undefined") return;
        localStorage.removeItem(USER_KEY);
    },
};