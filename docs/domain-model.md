# Domain Model

The product concepts the frontend must model correctly. Source: PRD v2.1 §4, §5, §14. Where the live API differs, the **API contract is current truth** (`docs/api-reference.md`); items marked *(target)* are build targets not yet emitted by the code.

---

## 1. Identifiers (canonical — code MUST conform)

Per the document-vs-code rule, identifier formats are the one place the PRD overrides the code. Render both via shared display components in `lib/identifiers/`; never re-format inline.

### VPID — Verity Property Identifier

- **Format:** `VRT-` (fixed 4 chars) + 8 Base-36 payload chars (`A–Z`, `0–9`) + 1 Luhn mod-36 check digit. **12 characters total.**
- **Example:** `VRT-7K2M9PXQR8` (check digit is the final char).
- **Opaque:** the VPID does **not** encode the address. Non-semantic, collision-checked at generation.
- **Lifecycle:** assigned the moment a property first enters the platform; **permanent**; survives ownership changes, title re-issuance, and address re-numbering. If two records are found to be the same property, they merge — the earlier VPID survives, the later is retired and **never reused**.
- **Display:** DM Mono, `+0.06em` letter-spacing, slate prefix + ink payload, copy-on-click, never wraps mid-identifier.
- **Validation:** verify the Luhn mod-36 check digit client-side so transcription errors are caught without a backend lookup.

### VPR — Verification reference

- **Format:** `VPR-YYYY-NNNNNN` — year + 6-digit sequence within that year.
- One VPID may carry **many** VPRs over time. The public page surfaces the most recent VPR by default; `/v/{VPID}/history` exposes prior ones.
- Display: DM Mono, same treatment as VPID.

> The year-prefixed `VPR-YYYY-NNNNNN` supersedes the unprefixed `VPR-XXXXXXXXX` seen in earlier drafts. Use the prefixed form only.

---

## 2. Confidence bands (the result grade)

A verification produces a **0–100 score**, mapped algorithmically to **six bands**. Bands come from verification depth, not analyst opinion; analyst overrides of the score require dual sign-off.

| Band | Score | Meaning (short) |
| --- | --- | --- |
| Platinum | 90–100 | Multiple verifications over time, registry-confirmed, transaction history, no disputes, all RESO core fields |
| Gold | 75–89 | Registry-confirmed, single high-quality verification, no disputes |
| Silver | 60–74 | Registry-confirmed by direct query, no transaction history, docs reviewed |
| Bronze | 40–59 | Docs reviewed, registry confirmation missing/partial; field-verified mode |
| Provisional | 20–39 | Upload received, AI extraction done but unconfirmed, awaiting analyst |
| Unconfirmed | 0–19 | Submitted, processing not started or failed |

### State overlays (on top of the band, not replacing it)

| State | Trigger | Effect on public page |
| --- | --- | --- |
| **Revoked** | Dispute outcome or re-review finds the original verification unsupportable | "This verification has been revoked on {date}" overlaid on the original band; certificate re-issued with REVOKED watermark; underlying band retained for audit |
| **Expired** | Verification ages past its band-specific validity window, or a registry-side ownership change invalidates it | "This verification has expired on {date}" overlaid on the original band; buyer/developer may commission a fresh verification (new VPR, same VPID) |

The band is preserved underneath; the overlay is what the certificate and public surface render. Tier caps the *maximum* band: Standard → Gold max, Premium → Platinum max.

---

## 3. Verification pipeline — eight internal stages

What the analyst/ops surfaces visualise. The verification moves through these stages (PRD §14.3):

1. **Intake** (AI) — OCR, structured field extraction, document classification
2. **Cross-graph check** (AI) — VPID lookup, conflict detection against existing records
3. **Document authenticity** (AI + specialist) — format checks, cross-document consistency, forgery patterns
4. **Registry verification** (human) — Lagos State Land Registry lookup
5. **Field verification** (human) — physical site inspection (Independent mode / Premium)
6. **Evidence synthesis** (AI) — draft report with proposed band
7. **Specialist sign-off** (human) — licensed Nigerian property professional reviews and signs
8. **Issuance & graph update** (automated) — certificate delivered, graph updated, public page live

Five evidence workstreams run across these stages: **Title, Ownership, Encumbrance, Survey, Risk.**

---

## 4. Status taxonomies — current vs target

Three different "status" notions exist. Keep them distinct.

**(a) Pipeline status — CURRENT (what the live API returns).** The `VerificationStatus` enum from the backend OpenAPI spec:

```
uploaded → under_review → ai_processing → analyst_review → verified | flagged
```

This is what `/verifications/{job_id}` and the admin queue surface today. Build the analyst/ops/buyer-status UI against **this** enum now.

**(b) Verification.status & Property.status — TARGET (PRD §4.2, not yet emitted).** A richer taxonomy the PRD describes as the destination:
- `Verification.status`: `submitted / in_progress / awaiting_buyer / completed / cancelled / refunded / revoked`
- `Property.status`: `draft / verified / in-verification / awaiting-docs / expiring / expired`
- The developer portfolio reads `Property.status`; the buyer request detail reads `Verification.status`.

Treat (b) as a build target. Do not retrofit the UI to it until the API emits it; when the API changes, update this file with a Change Notice.

**(c) Confidence band** — §2 above. This is the *grade*, not a processing state. A verification can be `analyst_review` (pipeline) and have no band yet, or `verified` with a `Gold` band. Never collapse band and status into one field.

---

## 5. Tiers

Buyer-flow only. **No developer tier picker.**

| Tier | Price | Turnaround (target / hard) | Max band | Notes |
| --- | --- | --- | --- | --- |
| Standard | ₦50,000 | 7 BD / 10 BD | Gold | |
| Premium | ₦150,000 | 3 BD / 5 BD | Platinum | Includes Lagos State Land Registry liaison |

Payment in Naira plus USD/GBP/EUR cards via **Paystack** (primary) and **Flutterwave** (fallback). Founding 50 developers verify **free through Q3 2027**, then ₦250k/month; their properties show no per-property pricing and have depth assigned server-side.

---

## 6. Three-track auth

Three user tracks resolved at the auth layer:

| Track | Signup | KYC | Lands at |
| --- | --- | --- | --- |
| **Buyer** | Public self-signup | **Never** hits Mono KYC | `/app/buyer/*` |
| **Developer** | Public self-signup | **Mono KYC required** (Lookup + Prove Tier 2), gated before workspace access; manual fallback capped 5/quarter w/ CEO sign-off | `/app/developer/*` |
| **Internal** (analyst / ops / super admin) | **Never** public signup — invite-activation only | n/a | `/app/internal/*` (subRole guards) |

`UserRole` enum from the API: `developer_admin`, `developer_viewer`, `buyer`, `verity_admin`, `verity_analyst`. On sign-in, `authService` returns the role and the app redirects accordingly.

---

## 7. Six personas (who features serve)

Canonical set (PRD §3) — supersedes any lighter three-persona set in older design docs:

1. **Adaeze** — diaspora buyer (Houston). Mobile, 60-seconds-to-pay if trust signals are present. Needs the public page + bank-readable certificate.
2. **Tunde** — Lagos developer. Wants to prove a portfolio is legitimate without case-by-case explanation; bank-acceptable formatting.
3. **Mrs. Okonkwo** — senior lawyer. Outsource registry cross-reference, keep legal judgment; defensible audit trail.
4. **Adaobi** — bank mortgage officer. API access, bulk verification, standardised formats (post-MVP).
5. **Femi** — independent agent. Wants a verified badge + directory listing (post-MVP).
6. **Ifeoma** — Lagos State Land Registry officer. Partnership gatekeeper.

Only Adaeze, Tunde, and the internal team are first-class in the MVP surfaces; the rest shape later phases.