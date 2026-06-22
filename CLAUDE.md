# CLAUDE.md — Verity `mvp`

Engineering source of truth for the **`mvp`** repository: the single, canonical Verity frontend. Read this at the start of every session. This file **absorbs the former `AGENTS.md`** — keep `AGENTS.md` as a one-line pointer to this file.

Verity Property Technologies Ltd. · Lagos / Houston · `verity.properties`

> **Current / Target convention.** This repo is mid-build. Lines tagged **[current]** describe what the code does today (a marketing + waitlist teaser with stubbed auth). Lines tagged **[target]** describe what we're building toward per the PRD. Per the governance rule (§2), the code wins for *current behaviour*; targets are build goals, not contradictions.

---

## 1. What Verity is

Verity is property-data infrastructure for African real-estate markets. It produces, maintains, and distributes verified property records. The product is **trust**: the public verification page is the artifact a diaspora buyer screenshots and forwards to a lawyer, family member, or bank.

Three surfaces, one shared data graph:

| Surface | Audience | Route base [target] |
| --- | --- | --- |
| Verification Reports (buyer flow) | Diaspora buyers, lawyers, agents | `/app/buyer/*` |
| Developer Workspace | Real-estate developers | `/app/developer/*` |
| Internal Admin Console | Analysts, ops, super admins | `/app/internal/*` |
| Public Verification Page | Anyone, no auth | `/v/{VPID}` |
| Marketing / waitlist | Public | `/` |

**[current]** The live route at `/` renders `WaitlistPage` — buyer waitlist + Founding 50 partner signup. The full marketing `LandingPage` exists as a component but is not yet the active route. At M3 cutover the waitlist swaps to "Start a verification."

MVP scope is **Lagos State only**. Marketplace, Bank API, multi-state, and native apps are out of scope (§12).

Verifications are analyst-reviewed title reports. The public SLA is the **tier turnaround: Standard 7 business days, Premium 3** (§ domain-model) — not the legacy "48 hours" teaser line, which should be retired in a copy pass.

---

## 2. Governance — which document wins

Source documents were written at different times and operate at **different layers**:

| Concern | Authority |
| --- | --- |
| **Current behaviour, file structure, conventions** | **The codebase** (this file's [current] tags) |
| Repo strategy, routing, Next/Tailwind versions | This file + the single-`mvp` migration decision (supersedes PRD §7.2's "Next 14 monorepo") |
| Product behaviour, personas, pipeline, tiers, confidence model | PRD v2.1 (+ `docs/domain-model.md`) |
| Design tokens, type stack, the five locked rules, voice | PRD §11 / Design System v1.0 (+ `docs/design-system.md`) |
| Live API request/response shapes, enums | Backend OpenAPI spec (+ `docs/api-reference.md`) |
| Property type → RESO mapping, `Verity_NG_*`, DB constraints | `docs/reso-property-types.md` |

**Document-vs-code rule:** when this document and the code disagree, **the code is the source of truth for current behaviour, and this document gets a dated Change Notice.** A requirement here the code hasn't met yet is a *build target*, not a contradiction.

**The one exception: identifier formats.** VPID and VPR (`docs/domain-model.md`) are canonical in the PRD; the code MUST conform. An identifier scheme can't be migrated cheaply once production data exists.

**Known code-vs-spec divergences to migrate (not contradictions — build targets):**
- Fonts: code uses Inter + JetBrains Mono **[current]**; canonical is Cormorant body + DM Mono + DM Sans + Tenor wordmark **[target]** (§ Fonts).
- Auth token in `localStorage` **[current]**; canonical is HTTP-only cookies **[target]** (§7).

---

## 3. Tech stack

**[current] — in the code now:**
- **Next.js 16.2.2**, App Router. ⚠️ This version has breaking changes from older Next; don't assume pre-16 APIs.
- **React 19.2.4**, **TypeScript**.
- **Tailwind CSS v4** — configured via `@import "tailwindcss"` in `app/globals.css`. There is **no `tailwind.config.ts`**; tokens live in `@theme`.
- **shadcn/ui** — components in `components/ui/`, configured in `components.json`. Add via `npx shadcn add <component>` — never hand-write Radix primitives.
- **TanStack Query v5** — all server state. `QueryClient` lives in `app/Providers.tsx`.
- **Axios** — HTTP client; pre-configured instance at `lib/api.ts`.
- **Sonner** — toasts via `<Toaster />` mounted in `Providers`.

**[target] — adopt as auth/wizard surfaces get built:**
- **Zustand** for ephemeral UI state (modals, drawers, filters). Keep server state in TanStack Query exclusively; never mix.
- **React Hook Form + Zod** for forms; Zod schemas mirror the API request bodies in `docs/api-reference.md`.

Backend is **Python/FastAPI**, a separate service (Node.js excluded for the backend). The frontend codes against the OpenAPI spec.

---

## 4. Project structure

**[current] — what exists in the code today:**

```
app/
  layout.tsx              # fonts (next/font), metadata, Providers wrapper
  page.tsx                # renders <WaitlistPage /> (active public route)
  Providers.tsx           # QueryClientProvider + Toaster
  globals.css             # Tailwind v4 @import + @theme tokens + CSS vars

  (auth)/
    sign-in/page.tsx      # sign-in form — STUBBED (hardcoded redirect to /dashboard)
    sign-up/page.tsx      # 3-screen flow: registration → OTP (code: 123456) → checklist — STUBBED

  (marketing)/
    developers/page.tsx   # developer marketing page
    developers/components/
      DeveloperHero.tsx   # hero with dashboard mockup preview
      DeveloperProblem.tsx

  (developers)/
    dashboard/
      layout.tsx          # shell: DeveloperSidebar + DeveloperNavbar
      page.tsx            # overview: stat cards, recent properties table, side panels
      upload/page.tsx     # add property — 3-step single form + bulk CSV upload
      reports/page.tsx    # stub (empty)
      properties/
        page.tsx          # full property list: search, filters, pagination, delete confirm
        [id]/page.tsx     # property detail: Overview / Documents / Verification tabs
      components/
        StatsCard.tsx       # 4 stat cards (hardcoded data)
        RecentProperties.tsx
        DashboardsidePanels.tsx  # donut chart + quick actions
        PropertytypeTag.tsx
        StatusBadge.tsx
    layout/
      DeveloperSidebar.tsx  # collapsible sidebar (Dashboard, Properties active; reports/team/billing/settings disabled)
      DeveloperNavbar.tsx   # top bar: notification bell + profile dropdown

components/               # flat marketing components (shared with (marketing)/)
  LandingPage.tsx         # full buyer marketing page (not the active route yet)
  WaitlistPage.tsx  WaitlistForm.tsx  ReportOrderModal.tsx
  Navbar Hero Problem HowItWorks Pricing Trust Whyus TwoPaths ForDevelopers FAQ Footer
  ui/                     # shadcn primitives (button, dropdown-menu, alert-dialog, sonner)

hooks/
  useWaitlist.tsx         # waitlist mutations + queries (TanStack Query)

lib/
  api.ts                  # Axios instance — baseURL = NEXT_PUBLIC_API_URL/api/v1; 401 interceptor
  tokenStore.ts           # localStorage accessors for auth token + user
  utils.ts                # cn()

types/waitlist.ts         # domain types; enum string values mirror the API spec exactly
types.ts                  # upload form types (TitleEntry, FormData, CsvRow)

docs/
  api-reference.md        # see §14
  architecture.md
  design-system.md
  domain-model.md
  reso-types.md
```

**Dashboard data is all hardcoded mock data** — no TanStack Query hooks wired in any `(developers)/` page yet. Wire real hooks when backend endpoints are ready.

**Known stale route links (bugs, not contradictions):**
- `DashboardsidePanels.tsx` quick actions link to `/developer/upload` and `/developer/properties?status=flagged` — correct paths are `/dashboard/upload` and `/dashboard/properties?status=flagged`
- `properties/[id]/page.tsx` breadcrumb and Edit button link to `/developer/properties` / `/developer/upload?edit=...` — correct paths are `/dashboard/properties` / `/dashboard/upload?edit=...`

**[target] — route zones not yet built:** `app/app/{buyer,developer,internal}/`, `app/v/[vpid]/`; plus `lib/identifiers/` (VPID/VPR) and `lib/reso/` (property-type derivation).

---

## 5. Atomic launch & build phases

The MVP is **one deliverable of five interdependent surfaces** (Landing, Buyer, Developer, Public Page, Internal). **None ships to customers until all five are ready** — one production cutover at M3. Build order ≠ customer exposure.

Four phases, **one PR each, in order**:

1. **Foundation** — tooling, brand tokens via `@theme`, marketing restyle, auth rewire, scaffold `/app/*` + `/v/[vpid]` route shapes.
2. **Developer** — portfolio, add-property wizard, KYC gate, distribute, account.
3. **Buyer + public certificate** — full buyer journey `/app/buyer/*`; public certs `/v/{VPID}`.
4. **Internal** — specialist / ops / admin / registry routes behind subRole guards.

Phase dependencies are real: Phase 2 needs Phase 1's auth + route shapes; Phase 3 needs the developer flow to exist (property records for buyers to verify against); Phase 4 consumes the records Phases 2–3 create.

---

## 6. API & data fetching

Base URL: `${NEXT_PUBLIC_API_URL}/api/v1` (env var has no trailing slash, no `/api/v1`).

- **Always go through TanStack Query hooks** (pattern in `hooks/useWaitlist.tsx`). **No raw `fetch`/`axios` in components.**
- The Axios instance is `lib/api.ts`. Public endpoints need no token; secured endpoints send `Authorization: Bearer <token>`.
- **Error shape:** `{ message?, error?, statusCode? }`. The `extractMessage` helper normalises axios errors to plain strings.
- **401 handling is centralised** in the `api.ts` interceptor (clears auth, redirects to `/sign-in`). Don't duplicate it in components.
- Full endpoint catalogue, enums, and request schemas: `docs/api-reference.md`.

---

## 7. Auth & security

**[current]:** token + user in `localStorage` via `lib/tokenStore.ts` — keys `"verity-token"`, `"verity-user"`. Use `tokenStore.get/set/clear/isAuthenticated` and `userStore.get/set/clear`. **Never read/write `localStorage` directly** — always go through the stores.

**[target] / security rules (non-negotiable as surfaces harden):**
- **Real auth tokens move to HTTP-only cookies** set by the backend. The `localStorage` token above is a teaser-stage stopgap to retire, not the end state.
- **Never log PII** — BVN, NIN, document content — to console, Sentry, or analytics.
- **Never put credentials in URL params.**
- **Mask BVN/NIN to the last 3 digits** in any display.
- NDPR + SCUML posture; all data resides in `af-south-1`.

**Three-track auth boundary [target]:** Buyer signup **never** hits Mono KYC. KYC is **developer-only**, gated at the auth layer. Internal users (analyst/ops/super-admin) **never** appear on public signup — invite-activation only. `UserRole`: `developer_admin`, `developer_viewer`, `buyer`, `verity_admin`, `verity_analyst`. On sign-in, the auth layer returns the role and redirects.

---

## 8. Fonts

**[current]** — three `next/font/google` variables in `app/layout.tsx`:
- `--font-sans` → **Inter** (body)
- `--font-serif` → **Cormorant Garamond** (headings/display)
- `--font-mono` → **JetBrains Mono**

**[target]** — Design System v1.0 type stack (Phase 1 migration):
- Body **and** headings → **Cormorant Garamond** (`--font-serif`)
- Identifiers / eyebrows / meta → **DM Mono** (swap `--font-mono` from JetBrains)
- Rare UI utility only → **DM Sans** (swap `--font-sans` from Inter)
- **Tenor Sans** → wordmark only; wire as a fourth variable used solely by the wordmark component

When migrating, change the families behind the variables in `layout.tsx`; `globals.css` keeps the `--font-sans/serif/mono` names.

---

## 9. The five locked design rules [target — current teaser may not fully comply]

Enforced in CI once Phase 1 lands the lint rules (off-token values, banned properties, Tenor misuse, emoji, exclamation marks). Exceptions need an inline `/* verity-allow: <rule> — <reason> */` + owner review.

1. **One gold per surface.** Gold is signal — never two gold CTAs in one frame.
2. **No gradients; no shadows except true overlays** (modal/dialog, toast). Flat surfaces only.
3. **No exclamation marks in product UI.** Evidence, never opinion. (Marketing copy is exempt.)
4. **No emoji in product UI.** Use DM Mono glyphs, a gold rule, or a labelled state.
5. **Tenor Sans reserved for the wordmark.** Cormorant body, DM Mono identifiers.

### Brand tokens (full set in `docs/design-system.md` / `app/globals.css`)

| Token | Value | Use |
| --- | --- | --- |
| `navy` | `#1E2260` | Anchor — primary brand, text, fills |
| `navy-deep` | `#171A4A` | Elevation — dark surfaces, toasts |
| `navy-soft` | `#2C3078` | Hover/active on navy |
| `cream` | `#F5F2ED` | Ground — page background |
| `cream-shade` | `#EEEAE0` | Raised panels, fills |
| `gold` | `#C9A961` | Signal — one per surface only |
| `gold-deep` | `#A88A45` | Italic copy / gold on light |
| `slate` | `#6B6F77` | Meta, secondary text |
| `slate-soft` | `#9DA1A8` | Disabled, placeholder |
| `teal` | `#0D7A5F` | **[current]** Product UI primary action (buttons, active tab, hover states in developer dashboard). Not yet named in the Design System — treat as a bridge token until Phase 1 canonicalises it. |

Radius scale: `0 / 3 / 6 / 10px / full` (containers cap at 10px; `full` = pills only). Confidence-band colour map is TODO — pull from the `verity-brand/` Drive folder, don't guess.

---

## 10. Voice & tone

Hybrid. Marketing (`/`) may say "we" and carry warmth. **Inside the product, the voice is institutional: no "we", no exclamations, no marketing clichés.** Read-aloud test: read the copy as a property registrar signing an official document. If it sounds like a salesperson, chatbot, or cheerleader, rewrite it. Error messages are plain and specific — never "Invalid input"; say "Please enter a valid Lagos address."

---

## 11. Conventions

**[current] — established in the code:**
- **Use the stores, not raw `localStorage`** (`tokenStore` / `userStore`).
- **Data fetching only through TanStack Query hooks** — no raw `fetch`/`axios` in components.
- **Toasts via Sonner** (`import { toast } from "sonner"`); `<Toaster />` is already mounted.
- **New shadcn components via `npx shadcn add <component>`** — never hand-write Radix.
- **`"use client"`** is required on any component using hooks, event handlers, or browser APIs. Server components are the App Router default.
- **Scroll offsets:** `id` sections have `scroll-margin-top: 80px` (navbar height) set globally in `globals.css`.
- **Type enum string values mirror the backend spec exactly** (`types/waitlist.ts`) — do not rename them.

**[target] — product/domain conventions:**
- **Identifiers are canonical.** VPID = `VRT-` + 8 Base-36 + 1 Luhn = 12 chars; VPR = `VPR-YYYY-NNNNNN`. Render via shared display components; never re-format inline.
- **No developer tier picker.** Standard/Premium is buyer-flow only; developer depth is assigned server-side. Founding 50 verify free through Q3 2027.
- **No developer-supplied internal reference at submission** — the VPID is the cross-reference key.
- **RESO field naming is PascalCase**; Nigeria-specific fields use `Verity_NG_*`. snake_case is wrong. See `docs/reso-property-types.md`.
- **Confidence band ≠ pipeline status.** Band (Platinum…Unconfirmed + Revoked/Expired) is the result grade; status (`uploaded → … → verified/flagged`) is processing state. Keep them separate.

---

## 12. Out of scope — do not silently expand

Marketplace; production Bank/Sovereign API (a single spike may exist); multi-state (Lagos only); native mobile apps (PWA only); insurance integration; advanced ML fraud detection; lawyer/broker professional tier; white-label developer portals; languages other than English. If a request implies any of these, flag it rather than building it.

---

## 13. Environment & commands

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Backend host — no trailing slash, no `/api/v1` |

```bash
npm run dev     # dev server
npm run build   # production build
npm run lint    # ESLint (brand-discipline rules added in Phase 1)
```

---

## 14. Reference files

| File | Contents |
| --- | --- |
| `docs/architecture.md` | Routing, current data layer + target service organisation, state split, build phases |
| `docs/design-system.md` | Full tokens, the 20 banned patterns, type scale, confidence-band colour map, voice |
| `docs/domain-model.md` | VPID/VPR + validation, 6 confidence bands, 8-stage pipeline, status taxonomies, tiers, auth tracks |
| `docs/api-reference.md` | Backend endpoints, auth, enums, request schemas |
| `docs/reso-property-types.md` | 5-category selector → RESO derivation, DB constraints, `Verity_NG_*`, BQ flag |