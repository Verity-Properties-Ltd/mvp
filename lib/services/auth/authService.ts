/**
 * Placeholder mock auth service for Phase 1. verity-frontend's real authService.mock.ts
 * (the actual source this should be ported from byte-for-byte) wasn't available in this
 * environment — replace this file wholesale once that source is provided.
 */

export type Role = "buyer" | "developer";

export interface Session {
  email: string;
  role: Role;
}

export class EmailExistsError extends Error {
  constructor(email: string) {
    super(`An account already exists for ${email}.`);
    this.name = "EmailExistsError";
  }
}

const DIRECTORY_KEY = "verity:mock:directory";

function readDirectory(): Record<string, Role> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(DIRECTORY_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function writeDirectory(directory: Record<string, Role>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(DIRECTORY_KEY, JSON.stringify(directory));
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  async signIn(email: string, password: string): Promise<Session> {
    void password;
    await delay(600);
    const directory = readDirectory();
    const role = directory[email.toLowerCase()] ?? "buyer";
    return { email, role };
  },

  async signUp(email: string, password: string, role: Role): Promise<Session> {
    void password;
    await delay(600);
    const directory = readDirectory();
    const key = email.toLowerCase();
    if (directory[key]) {
      throw new EmailExistsError(email);
    }
    directory[key] = role;
    writeDirectory(directory);
    return { email, role };
  },
};
