# Consolidate verity-frontend into mvp as the single frontend repo

## Context

The team is dissolving the `verity-frontend` monorepo (apps/landing + apps/app + apps/public-page + packages/{brand,fixtures,reso,storybook}) and moving to a clean two-repo split:

- **verity-backend** — already exists at `Verity-Properties-Ltd/verity-backend` (out of scope here).
- **mvp** — at `Verity-Properties-Ltd/mvp`; this becomes the **single canonical frontend**.

`mvp` today is a Next.js 16.2.2 single-app teaser: marketing landing + stubbed auth + a generic developer dashboard with no real data. `verity-frontend` is where all the real product work lives: buyer + developer + internal surfaces, brand token system, mock service seams that mirror the eventual backend API, RESO types, NG LGA dataset, and the public certificate page.

The goal is to land the full surface of verity-frontend inside mvp without bringing the monorepo plumbing, then archive verity-frontend.

## Decisions locked in

1. **URL strategy** — path-based on a single host. Marketing at `/`. Authenticated surfaces under `/app/*` (e.g. `/app/buyer`, `/app/developer/portfolio`, `/app/internal/specialist`). Public certificates at `/v/{VPID}`. **Requires** a dated Change Notice to PRD §2.1 / UI/UX §2.1 to record the divergence from the three-subdomain spec.
2. **Styling** — keep Tailwind v4 + shadcn primitives, but wire `packages/brand` CSS variables into `globals.css` and re-export them as Tailwind v4 `@theme` tokens. shadcn primitives are restyled to brand. All hardcoded hex in mvp (`#C9A84C`, `#062642`, etc.) is replaced with tokens.
3. **Next version** — stay on Next 16.x (mvp's current 16.2.2). React 19.2.4.
4. **Phasing** — four PRs: Foundation → Developer → Buyer → Internal. Order revised per @Divineverity review (mvp#1): finish the existing developer dashboard surface before opening the buyer flow.
5. **Marketing** — keep mvp's marketing content (Hero, TwoPaths, Whyus, HowItWorks, Pricing, FAQ, Trust, ForDevelopers, WaitlistForm). Restyle to brand tokens. Discard `verity-frontend/apps/landing` entirely.
6. **Auth + developer dashboard** — keep mvp's visual shells, rewire internals to call verity-frontend's mock services. Single `/sign-in` and `/sign-up` pages are preserved (NOT split into buyer/developer); on successful auth the response from `authService.signIn` dictates the redirect (`/app/buyer` vs `/app/developer`). The split-by-role auth structure from verity-frontend is **not** carried over — this is an intentional simplification documented in the Change Notice.

## Migration scope at a glance

From verity-frontend (~180 TS files), keep:

- `packages/brand/tokens/*.css` → `mvp/app/styles/tokens/` (imported by `globals.css`)
- `packages/brand/jsx/*` → `mvp/components/brand/` (Vpid, Vpr, ConfidenceBand, BandDisplay, VerityMark, VerityWordmark, VerityLogo, FormField primitives, Modal)
- `packages/reso/src/{index,ng-lgas,address}.ts` → `mvp/lib/reso/`
- `packages/fixtures/src/*` → `mvp/lib/fixtures/`
- `apps/app/src/lib/types/` + `apps/app/src/dev/lib/types/` → `mvp/lib/types/`
- `apps/app/src/lib/services/` + `apps/app/src/dev/lib/services/` → `mvp/lib/services/{buyer,developer}/` (interfaces preserved; mock implementations carried over for now)
- `apps/public-page/src/lib/services/` → `mvp/lib/services/public/`
- All buyer routes (`buyer/*`) → `mvp/app/app/buyer/*`
- All developer routes (`developer/*`) → `mvp/app/app/developer/*`
- All internal routes (`internal/*`) → `mvp/app/app/internal/*`
- Public certificate route (`v/[vpid]`) → `mvp/app/v/[vpid]/*`
- Components under `apps/app/src/components/` and `apps/app/src/dev/components/` → `mvp/components/buyer/` and `mvp/components/developer/`

Discard from verity-frontend:

- `apps/landing/*` (mvp marketing replaces it)
- `packages/storybook/*` (not part of runtime; future repo decision)
- `reference/developer-dashboard/*` (pre-React mockups)
- The monorepo plumbing (`package.json` workspaces, per-app `package.json`, per-app `tsconfig.json`, per-app `next.config.ts`)
- The `@verity/*` workspace import paths and the `@/` vs `@dev/` tsconfig split

Discard from mvp:

- `app/(developers)/dashboard/page.tsx` mock data (keep layout, replace data source)
- `lib/utils.ts` is preserved (shadcn `cn()` is still useful)
- `components/ui/*` shadcn primitives are preserved but restyled

## Phase 1 — Foundation (PR 1)

Goal: tokens, marketing restyle, scaffolding ready for surfaces to land.

1. **Brand token integration**
   - Copy `verity-frontend/packages/brand/tokens/{colors,typography,spacing,motion,patterns,components,index}.css` into `mvp/app/styles/tokens/`.
   - Import the aggregator from `mvp/app/globals.css`.
   - In `globals.css`, define a `@theme` block that re-exports CSS variables as Tailwind v4 tokens (e.g. `--color-gold: var(--verity-gold);`, `--font-display: var(--verity-font-cormorant);`).
   - Copy the brand JSX components from `packages/brand/jsx/` into `mvp/components/brand/`. Drop the `@verity/brand/jsx` import path; use relative imports.
   - Set up `next/font` for Cormorant Garamond, DM Mono, DM Sans, Tenor Sans. Wire to CSS variables consumed by tokens.

2. **Marketing restyle**
   - Audit every hardcoded hex in `mvp/components/*` (Hero, Navbar, TwoPaths, Whyus, HowItWorks, Pricing, FAQ, Trust, Footer, ForDevelopers, WaitlistForm, ReportOrderModal, LandingPage).
   - Replace `#C9A84C`/`#C9A961` → `var(--verity-gold)` (Tailwind class `text-gold`/`bg-gold`).
   - Replace `#062642`/`#1E2260` → `var(--verity-navy)`.
   - Replace `#F5F2ED` → `var(--verity-cream)`.
   - Remove `linear-gradient` overlay on Hero (lines 106–107). Replace with flat token or fixed-opacity overlay.
   - Remove `linearGradient` defs in shield SVGs (Hero, auth pages). Replace with VerityMark JSX from `mvp/components/brand/`.

3. **Auth shell rewire**
   - Keep `app/(auth)/sign-in/page.tsx` and `app/(auth)/sign-up/page.tsx` as single pages.
   - Replace stub `handleSubmit` with calls to `authService.signIn` / `authService.signUp` (mock impl from verity-frontend, dropped into `mvp/lib/services/auth/`).
   - The unified mock is ported from `verity-frontend/apps/app/src/dev/lib/services/mocks/authService.mock.ts` (developer-side includes `EmailExistsError`). Buyer-side variant is folded in during Phase 3 if any divergence is found.
   - On signin success, read `session.role` and `router.push('/app/buyer')` or `'/app/developer')`. On `internal`, push `/app/internal/{subRole}`.
   - Sign-up has role-picker step added (radio: Buyer vs Developer) before the existing 3-step flow.
   - Add `<SessionProvider>` reading from `localStorage['verity:session']` at `app/layout.tsx`.
   - Add `<AuthGuard>` component at `mvp/components/auth/AuthGuard.tsx` (ported from verity-frontend `SignedInGuard`).

4. **Path migration**
   - Move `app/(developers)/dashboard/*` → `app/app/developer/*` (keep stubs as placeholders; Phase 2 fills them).
   - Restructure existing `app/(developers)/layout` → `app/app/developer/layout.tsx`.
   - Create `app/app/buyer/layout.tsx` + `app/app/buyer/page.tsx` (stub: "Buyer surface — ships in Phase 3").
   - Create `app/app/internal/layout.tsx` + `app/app/internal/{specialist,ops,admin,registry}/page.tsx` (stubs: "Internal surface — ships in Phase 4"). These are throwaway placeholders that Phase 4 replaces.
   - Marketing routes stay where they are.

5. **PRD Change Notice**
   - Add a `docs/change-notices/2026-06-11-url-and-auth-consolidation.md` recording: (a) move from three subdomains to single-host path-based, (b) collapse split-by-role auth into a single signin/signup page. Notion PRD §2.1 / UI/UX §2.5 update required by lifeofladi.

Acceptance for PR 1: `npm run dev` loads marketing, tokens visible in computed styles, signin redirects to the correct surface (developer → real shell, buyer/internal → stub placeholders), no broken imports.

## Phase 2 — Developer surface (PR 2)

Goal: full developer journey ported under `/app/developer/*`, mvp dashboard shell rewired. Phase 2 also brings in cross-cutting shared libs (auth types, RESO, fixtures) that Phase 3 reuses.

1. **Lib drops** (Phase 2 brings in shared libs first; Phase 3 adds buyer-specific layer on top)
   - Shared / cross-cutting:
     - `apps/app/src/lib/types/{auth,verification,certificate}.ts` → `mvp/lib/types/` (Session shape, BandTier, Certificate type — needed by developer property-detail rendering).
     - `packages/reso/src/{index,ng-lgas,address}.ts` → `mvp/lib/reso/` (used by developer add-property wizard).
     - `packages/fixtures/src/*` → `mvp/lib/fixtures/` (VERIFICATION_SEEDS consumed by `propertyService.mock`).
   - Developer-specific:
     - `apps/app/src/dev/lib/types/{property,kyc,add,account,distribution}.ts` → `mvp/lib/types/developer/`.
     - `apps/app/src/dev/lib/services/index.ts` + `mocks/{kycService,propertyService,distributionService,accountService}.mock.ts` → `mvp/lib/services/developer/`. (`authService.mock` already ported in Phase 1.)

2. **Dashboard rewire** (existing mvp `app/app/developer/page.tsx`)
   - Keep the layout structure (StatsCard, RecentProperties, side panels).
   - Replace mock numbers with `propertyService.getDashboard()` shape: KpiSnapshot, BandTotals, AttentionItems, ActivityEvents.
   - Add `<QuickActions>` from `mvp/components/developer/QuickActions.tsx`.

3. **Developer routes** (under `app/app/developer/`)
   - `/portfolio`, `/portfolio/[vpid]`, `/portfolio/add/{type,csv,documents,review}`
   - `/distribute`, `/kyc/prove`, `/account`

4. **Developer components** → `mvp/components/developer/`
   - All wizard, property-detail, distribute, KYC, and account components from `apps/app/src/dev/components/`.
   - Where a buyer counterpart will exist (AddressSection, CategorySelector, etc.), keep developer copies here; Phase 3 lands buyer counterparts and extraction to `mvp/components/shared/wizard/` is deferred to a follow-up cleanup PR to avoid scope creep.

5. **AuthGuard**
   - Developer routes wrap in `<AuthGuard role="developer">`.
   - KYC gate: `<KycGate>` redirects unverified developers to `/app/developer/kyc/prove`.

Acceptance for PR 2: end-to-end developer flow works against mocks. Sign up → KYC prove → portfolio add (single + CSV) → portfolio table → property detail → distribute share link.

## Phase 3 — Buyer surface + public-page (PR 3)

Goal: full buyer journey ported under `/app/buyer/*` and `/v/{VPID}` working.

1. **Lib drops** (auth, verification, certificate, reso, fixtures already in place from Phase 2)
   - `apps/app/src/lib/types/request.ts` → `mvp/lib/types/`.
   - `apps/app/src/lib/services/index.ts` + `mocks/requestService.mock.ts` → `mvp/lib/services/buyer/`. Re-uses the unified `authService` ported in Phase 1; verifies no buyer/developer divergence in shape.

2. **Buyer routes** (all under `app/app/buyer/`)
   - `/` (dashboard CTA), `/account`, `/history`
   - `/request/new/{property,documents,tier,payment,confirmed}` with the wizard layout
   - `/requests/[id]`, `/requests/[id]/certificate`, `/requests/[id]/share`

3. **Buyer components** → `mvp/components/buyer/`
   - Wizard: AddressSection, CategorySelector, HouseStyleSelector, ApartmentStyleSelector, LandSubCategorySelector, BedsBathsSelector, BQToggle, WizardFooter, StepBar, PageHead, RequestSidebar
   - Certificate: CertMasthead, CertProperty, CertSign, CertFoot
   - Dashboard: RequestRow
   - Verification: BandPill, BandBlock, StatusTrack
   - Chrome: DesktopRail, AppBar, BuyerTabs

4. **Public certificate**
   - Copy `apps/public-page/src/lib/services/index.ts` → `mvp/lib/services/public/`.
   - Create `app/v/[vpid]/page.tsx` rendering `PublicCertClient` from `mvp/components/public/`.
   - Confirm fixture data resolves the seed VPIDs.

5. **CSS class prefix collision**
   - verity-frontend buyer components use `.bf-*` class prefixes; developer uses `.dv-*`. Drop both prefixes during port — Tailwind utilities + brand tokens carry the styling. Where component-scoped CSS modules are necessary, use `*.module.css` next to the component.

6. **AuthGuard**
   - Buyer routes wrap in `<AuthGuard role="buyer">`. Redirect to `/sign-in` if missing session.

Acceptance for PR 3: end-to-end buyer flow works against mock services. Sign in → request wizard → submit → see request in dashboard → open certificate → copy `/v/{VPID}` link → public page renders.

## Phase 4 — Internal scaffolds (PR 4)

Goal: internal/* scaffolds available behind the right subRole guards. Covers all four internal subRoles — `specialist`, `ops`, `admin`, `registry` — not admin alone. (@Divineverity's review used "admin" as shorthand for this whole phase.)

1. Copy `apps/app/src/app/internal/{specialist,ops,admin,registry}/*` → `mvp/app/app/internal/`.
2. Copy `InProgressShell` component and `InternalRail` chrome.
3. Wire `<AuthGuard role="internal" subRole="..." />` per route.
4. No backend wiring expected — these stay as InProgressShell placeholders matching the verity-frontend state today.

Acceptance for PR 4: internal routes load behind the right subRole, InProgressShells render the spec + acceptance criteria.

## Cross-cutting concerns

- **No path aliases needed beyond `@/*` → `./`**. Drop the `@dev/*` split; developer code lives under `components/developer/`, `lib/services/developer/`, `lib/types/developer/`.
- **localStorage keys preserved verbatim** so verity-frontend's mock services keep working: `verity:session`, `verity:requests`, `verity:dev-kyc`, `verity:dev-properties`, `verity:dev-portfolio-empty`, `verity:add-property-drafts:v1`.
- **Service interfaces are the boundary** to the future backend. Don't introduce coupling; mock implementations swap to fetch-based clients later.
- **Trust-critical components** (Vpid, Vpr, ConfidenceBand, BandDisplay, VerityMark, VerityWordmark) — port byte-for-byte, no opportunistic refactors. Per PRD §11.2, changes need founder review.
- **CI lint hooks** for banned patterns (off-token hex, gradients outside `.seal`, Tenor outside wordmark) — port from verity-frontend if they exist; otherwise log a follow-up to wire them.

## Critical files to modify

In `mvp`:

- `package.json` — add deps from verity-frontend that aren't shadcn-provided (no `@verity/*` packages; everything is local now).
- `tsconfig.json` — confirm `@/*` → `./` is sufficient.
- `next.config.ts` — confirm; no rewrites needed for single-host.
- `app/layout.tsx` — wire fonts, brand tokens, SessionProvider.
- `app/globals.css` — import brand token CSS, define Tailwind v4 `@theme` block.
- `app/(auth)/sign-in/page.tsx`, `app/(auth)/sign-up/page.tsx` — rewire to authService.
- All components in `components/` — restyle to brand tokens.

New top-level dirs in `mvp`:

- `app/app/{buyer,developer,internal}/*`
- `app/v/[vpid]/*`
- `app/styles/tokens/*`
- `components/{brand,buyer,developer,public,auth}/*`
- `lib/{services,types,reso,fixtures}/*`
- `docs/change-notices/`

Delete from `mvp` (Phase 1):

- Hardcoded hex everywhere in `components/*`
- `(developers)/dashboard` mock-data inlines (replaced by service calls)

After PR 4 lands, archive `Verity-Properties-Ltd/verity-frontend`.

## Verification

Per phase, run all of:

```
npm install
npm run dev   # → http://localhost:3000
npm run build
npm run lint
```

End-to-end checks per phase (manual, in browser):

- **Phase 1**: marketing renders with brand fonts/colors; computed styles show `var(--verity-*)` tokens; signin/signup pages reskinned and redirect correctly using mock authService.
- **Phase 2**: developer flow round-trips: sign up → KYC stub → portfolio add (single + CSV) → property detail → distribute link.
- **Phase 3**: buyer flow round-trips: sign in → `/app/buyer` → `/app/buyer/request/new/*` wizard → confirm → certificate → `/v/{VPID}` resolves on a fresh browser session.
- **Phase 4**: each `/app/internal/{specialist,ops,admin,registry}` route renders the InProgressShell behind correct subRole guard; switching subRole in session (via DevTools localStorage edit) toggles access.

Regression checks across phases:

- Lighthouse perf score on `/` ≥ 90 after token restyle.
- No `linear-gradient` outside `.seal` selectors (`rg "linear-gradient" mvp/`).
- No raw hex in `components/*` after Phase 1 (`rg "#[0-9a-fA-F]{6}" mvp/components`).
- All `@verity/*` import paths gone (`rg "@verity/" mvp/`).
- All `@dev/` import paths gone (`rg "@dev/" mvp/`).

## Open follow-ups (out of scope here)

- Wire CI lint for banned patterns.
- Extract shared wizard components from buyer/developer duplicates.
- Replace mock services with real backend clients once API contract is signed.
- Build Paystack, PDF generation, real email delivery (tracked separately; backend dependency).
- Storybook decision (port from `packages/storybook` or skip).
- Archive `Verity-Properties-Ltd/verity-frontend` after all four PRs ship.
