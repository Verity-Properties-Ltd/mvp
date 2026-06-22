# API Reference

Derived from the live backend OpenAPI spec (`verityspec.json`). **This is current truth** for request/response shapes and enums — when the PRD describes something richer, that's a *target* (see `docs/domain-model.md` §4). Base path: `/api/v1`. The frontend swaps mock service seams (`lib/services/`) to real HTTP calls against these endpoints per story.

---

## Authentication

OAuth2 password flow. `POST /api/v1/auth/login` returns a token; protected endpoints expect a bearer token. Per the security rules, the **real** token is held in an HTTP-only cookie set by the backend — not in `localStorage`.

Endpoints marked 🔒 require authentication.

---

## Endpoints by domain

### System
- `GET /health` — health check
- `GET /` (root) — service metadata

### Waitlist (marketing / pre-launch)
- `GET /waitlist` 🔒 — list entries
- `POST /waitlist` — public signup (`WaitlistRequest`)
- `GET /waitlist/founding-partner` 🔒 — list founding-partner applications
- `POST /waitlist/founding-partner` — apply (`FoundingPartnerRequest`)
- `POST /waitlist/notify` 🔒 — notify the waitlist

### Auth
- `POST /auth/register` — developer/company registration (`RegisterRequest`: company_name, **cac_registration_number**, contact_name, email, phone_number, state, password)
- `POST /auth/verify-otp` — verify email (`VerifyOtpRequest`: email, 6-digit otp_code)
- `POST /auth/login` — login (`LoginRequest`: email, password)
- `POST /auth/admin/register` 🔒 — internal user registration (`AdminRegisterRequest`, defaults role `verity_analyst`)
- `POST /auth/admin/login` — internal login
- `POST /auth/refresh` — refresh tokens (`RefreshTokenRequest`)
- `POST /auth/logout` — logout (`RefreshTokenRequest`)

### Users
- `GET /users/me` 🔒
- `PATCH /users/me` 🔒 — (`UserUpdate`: full_name, phone_number, state)

### Companies (developer org)
- `GET /companies/me` 🔒
- `PATCH /companies/me` 🔒 — (`CompanyUpdate`: contact_name, contact_phone, state, billing_plan, billing_cycle)
- `POST /companies/invite` 🔒 — invite team member (`TeamInviteRequest`: email, full_name, role default `developer_viewer`, phone_number, state)

### Properties
- `POST /properties` 🔒 — create (`PropertyCreate`: name, address, lga, state, property_type, title_type)
- `GET /properties` 🔒 — list; query filters: `property_type`, `verification_status`, `state`, `lga`, `search`
- `GET /properties/{property_id}` 🔒
- `PATCH /properties/{property_id}` 🔒 — (`PropertyUpdate`; includes optional `verification_status`)

### Documents
- `POST /documents/upload-url` 🔒 — request a presigned upload URL (`DocumentUploadRequest`: property_id, file_name, file_type, file_size)
- `POST /documents/{document_id}/confirm` 🔒 — confirm an upload completed
- `GET /documents` 🔒 — list

> Upload pattern: request presigned URL → upload file directly to storage → confirm. Two-step; the client uploads to S3, then confirms.

### Verifications
- `GET /verifications/{job_id}` 🔒 — status + results

### Reports
- `GET /reports/{report_id}` 🔒
- `GET /reports/{report_id}/download` 🔒 — PDF
- `GET /reports/verify/{reference_number}` — **public** report verification by reference (no auth) — backs the public certificate page

### Orders (buyer payment)
- `POST /orders` — create (`OrderCreate`: property_id?, buyer_name, buyer_email, property_address, tier, amount, currency default `NGN`, payment_provider default `paystack`)
- `POST /orders/paystack/webhook` — Paystack callback (`x-paystack-signature` header)
- `POST /orders/flutterwave/webhook` — Flutterwave callback (`verif-hash` header)

### Admin (internal console)
- `GET /admin/properties/{property_id}/documents` 🔒
- `GET /admin/queue` 🔒 — verification queue
- `POST /admin/queue/reconcile-dispatch` 🔒
- `POST /admin/queue/{job_id}/approve` 🔒
- `POST /admin/queue/{job_id}/flag` 🔒

---

## Enums

**`UserRole`**: `developer_admin`, `developer_viewer`, `buyer`, `verity_admin`, `verity_analyst`
**`VerificationStatus`**: `uploaded`, `under_review`, `ai_processing`, `analyst_review`, `verified`, `flagged`
**`PortfolioSize`**: `1_10`, `11_50`, `51_200`, `200_plus`
**`FoundingPartnerRole`**: `founder`, `ceo`, `managing_director`, `head_of_sales`, `operations`, `other`
**`WaitlistCountry`**: `uk`, `us`, `canada`, `nigeria`, `uae`, `germany`, `ireland`, `australia`, `south_africa`, `other`
**`WaitlistTiming`**: `active_negotiation`, `within_3_months`, `within_6_months`, `just_researching`

---

## Notes for the frontend

- The `register` flow is **developer/company-oriented** (it takes a CAC number) → matches the developer track. Buyer order creation is a separate, unauthenticated-friendly `POST /orders` path.
- `verification_status` is filterable on `GET /properties` and settable on `PATCH /properties/{id}` — this is the **pipeline** status enum, not the confidence band. The band is a separate concept (`docs/domain-model.md` §2).
- The public certificate page reads `GET /reports/verify/{reference_number}` — the only report endpoint that is unauthenticated.
- Match this catalogue with TanStack Query hooks in `hooks/` (one file per domain), all calling the shared Axios instance in `lib/api.ts` — the pattern established by `hooks/useWaitlist.tsx`. No raw calls in components. Keep `types/` enum string values identical to the enums below, and keep any Zod schemas (target) aligned with the request bodies above.