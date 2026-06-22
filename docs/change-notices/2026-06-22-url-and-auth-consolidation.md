# Change Notice — URL strategy and auth consolidation

**Date:** 2026-06-22
**Authority:** CLAUDE.md §2 governance rule — recorded here per `MIGRATION_PLAN.md` Decision 1 and 6.

## 1. URL strategy: single-host, path-based

**Supersedes:** PRD §2.1 / UI/UX §2.1's three-subdomain spec.

Authenticated surfaces, the public certificate, and marketing all live on one host (`verity.properties`), distinguished by path rather than subdomain:

- Marketing — `/`
- Buyer — `/app/buyer/*`
- Developer — `/app/developer/*`
- Internal — `/app/internal/*`
- Public certificate — `/v/{VPID}`

## 2. Auth: single sign-in/sign-up, not split by role

**Supersedes:** the split-by-role auth structure implied by earlier design drafts.

`/sign-in` and `/sign-up` are single pages serving both buyer and developer tracks. Sign-up adds a role-picker step (Buyer / Developer) ahead of the existing registration flow. On successful auth, the session's `role` field drives the redirect (`/app/buyer` or `/app/developer`); internal accounts (invite-activation only, never via public signup) redirect to `/app/internal/{subRole}`.

This is an intentional simplification for the Phase 1 build — it reduces auth-surface duplication at the cost of the role-specific copy/validation a split flow could offer. Revisit if buyer and developer registration requirements diverge significantly in later phases.
