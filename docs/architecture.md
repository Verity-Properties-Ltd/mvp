# Architecture

The single `mvp` Next 16 app. This expands CLAUDE.md §4–6.

---

## 1. Routing (path-based, single host)

No subdomains. One host, three route zones.

| Path | Zone | Auth | Notes |
| --- | --- | --- | --- |
| `/` | Marketing | public | Hero, TwoPaths, WhyUs, HowItWorks, Pricing, FAQ, Trust, ForDevelopers, WaitlistForm — restyled to brand tokens |
| `/sign-in`, `/sign-up` | Auth | public | Single pages, not split by role. Sign-up offers buyer / developer. On sign-in, `authService` returns role → redirect |
| `/app/buyer/*` | Buyer | buyer | Mobile-first |
| `/app/developer/*` | Developer | developer (KYC-gated) | Desktop-primary |
| `/app/internal/*` | Internal | internal subRoles | Desktop; analyst / ops / super-admin guards |
| `/v/{VPID}` | Public certificate | public | The trust artifact; indexable; OG/Twitter cards |
| `/v/{VPID}/history` | Public | public | Prior VPRs for the same VPID |

Route groups: `app/(marketing)/`, `app/(auth)/`, `app/app/{buyer,developer,internal}/`, `app/v/[vpid]/`.

---

## 2. Auth guards

- A middleware/guard reads the session and resolves the **track** (buyer / developer / internal) and, for internal, the **subRole**.
- Buyer routes never require KYC. Developer routes are gated behind Mono KYC completion. Internal routes are unreachable without an invite-activated internal account.
- Real sessions are HTTP-only cookies set by the backend; the guard reads server-side. (The `verity:session` localStorage key is the *mock* path only.)

---

## 3. State management split

- **TanStack Query v5 [current]** — all server state. `QueryClient` in `app/Providers.tsx`. Hooks (e.g. `hooks/useWaitlist.tsx`) wrap every call; `refetchInterval` only where polling is needed (analyst queue, buyer request status, developer home).
- **Zustand [target]** — ephemeral UI state only (modal/drawer open-close, filters, wizard step). Not yet in the code; add as the auth/wizard surfaces land. Never put server data in Zustand.
- **React Hook Form + Zod [target]** — form state + validation; not yet in the code. Zod schemas mirror the API request bodies in `docs/api-reference.md`.

---

## 4. Data layer (current) and service organisation (target)

**[current] — how the code fetches today:**
- One Axios instance in `lib/api.ts`, `baseURL = ${NEXT_PUBLIC_API_URL}/api/v1`. A response interceptor handles 401 centrally (clears auth via the stores, redirects to `/sign-in`). Don't duplicate 401 logic in components.
- All calls go through **TanStack Query hooks** in `hooks/` — never raw `fetch`/`axios` in components.
- Error shape `{ message?, error?, statusCode? }`, normalised to a string by the `extractMessage` helper.
- Auth token + user in `localStorage` via `lib/tokenStore.ts` (`tokenStore`, `userStore`); keys `"verity-token"`, `"verity-user"`. Always use the stores; never touch `localStorage` directly.

**[target] — as more surfaces land:**
- Keep the one-Axios-instance + hooks pattern; add a hooks file per domain (`useProperties`, `useDocuments`, `useOrders`, `useVerification`, `useCertificate`, `useKyc`) mirroring the endpoints in `docs/api-reference.md`.
- **Move the real auth token to an HTTP-only cookie** set by the backend; retire the `localStorage` token (the security rule). `tokenStore` becomes a thin client-readable user/role accessor, not a token vault.
- A `lib/services/` interface layer with swappable mock/real impls is **optional** — it's the verity-frontend convention, not required here. If adopted for offline dev/tests, namespace any mock localStorage keys clearly (e.g. `verity:mock:*`) so they're never confused with the real `verity-token`/`verity-user`.

---

## 5. Build phases (one PR each, in order)

| Phase | Name | Ships |
| --- | --- | --- |
| 1 | Foundation | Tooling, `@theme` brand tokens, marketing restyle, auth rewire, scaffolded `/app/*` + `/v/[vpid]` route shapes |
| 2 | Developer | Portfolio, add-property wizard, KYC gate, distribute, account |
| 3 | Buyer + public certificate | Full buyer journey `/app/buyer/*`; public certs `/v/{VPID}` |
| 4 | Internal | Specialist / ops / admin / registry routes behind subRole guards |

Phase dependencies are real: Phase 2 depends on Phase 1's auth + route shapes; Phase 3's buyer flow depends on the developer flow existing (property records for buyers to verify against); Phase 4 consumes the verification records Phases 2–3 create. Don't start a phase whose foundation hasn't shipped.

Remember the atomic-launch rule: all five surfaces (Landing, Buyer, Developer, Public Page, Internal) go live together at M3. Build order ≠ customer exposure.

---

## 6. shadcn integration

shadcn provides primitive behaviour + accessibility (dialog, alert-dialog, dropdown, etc.). The brand layer overrides visuals:
- Re-map shadcn's CSS variables (`--background`, `--foreground`, `--primary`, `--border`, `--ring`, …) to Verity tokens in `app/globals.css`.
- Remove shadows from everything except dialog/toast (the only true overlays).
- Cap radius at `10px`; pills use `full`.
- One gold accent per surface — don't let a shadcn default accent become a second signal colour.

When in doubt, a shadcn component should be unrecognisable as shadcn once themed — it should read as Verity.