# Design System

Source: PRD §11 + Design System v1.0. The canonical, complete source (full 20-pattern banned list, semantic colour tokens, spacing/elevation/motion, confidence-band colour map) lives in the `verity-brand/` Google Drive folder and its `docs/design-system-standards.md`. This file captures what's needed to build; if a value isn't here, get it from the Drive folder rather than inventing one.

---

## 1. Colour tokens

Defined once in `app/globals.css` via `@theme`. **No hardcoded hex in components — ever.**

| Token | Hex | Use |
| --- | --- | --- |
| `navy` | `#1E2260` | Anchor — primary brand, text, solid fills |
| `navy-deep` | `#171A4A` | Elevation — dark surfaces, toasts |
| `navy-soft` | `#2C3078` | Hover/active step on navy |
| `cream` | `#F5F2ED` | Ground — default page background |
| `cream-shade` | `#EEEAE0` | Surface — raised panels, fills |
| `gold` | `#C9A961` | Signal — **one per surface only** |
| `gold-deep` | `#A88A45` | Italic copy, gold text on light |
| `slate` | `#6B6F77` | Meta, secondary text |
| `slate-soft` | `#9DA1A8` | Disabled, placeholder |

Semantic tokens (success / warning / danger / info) and the **confidence-band colour map** (one colour treatment per band: Platinum / Gold / Silver / Bronze / Provisional / Unconfirmed, plus Revoked / Expired) are defined in the canonical Drive folder — pull them from there when building band display, and add them to `@theme` once confirmed. Do not guess band colours.

---

## 2. Typography — four families, locked jobs

| Family | Job | Never |
| --- | --- | --- |
| **Cormorant Garamond** (serif) | Headings, body, tagline. Italic only for the tagline + ≤3-word emphasis | — |
| **DM Mono** | Identifiers (VPID, VPR), eyebrows, meta | — |
| **DM Sans** | Rare UI utility only | Headings/body |
| **Tenor Sans** (display) | **Wordmark only** | Body, headings, UI — anything but the wordmark |

Load fonts with `font-display: swap`. Do not introduce a fifth family.

---

## 3. Radius, elevation, motion

- **Radius scale:** `0 / 3 / 6 / 10px / full`. Containers cap at `10px`. `full` is for pills (badges, toggles, avatars) only.
- **Elevation:** **flat surfaces only.** Shadows are permitted **only** on true overlays — modal/dialog and toast. No shadow on cards, inputs, buttons, panels.
- **No gradients** anywhere.
- **Motion:** respect `prefers-reduced-motion` — no transitions/animations for users who request reduced motion.

---

## 4. The five locked rules

1. **One gold per surface.** Gold is signal; two gold CTAs on one frame means neither gets it.
2. **No gradients; no shadows except true overlays** (modal, toast).
3. **No exclamation marks in product UI.** Evidence, never opinion. (Marketing copy is exempt.)
4. **No emoji in product UI.** Use DM Mono glyphs, a gold rule, or a labelled state.
5. **Tenor Sans reserved for the wordmark.** Cormorant for display/body, DM Mono for identifiers.

CI lint enforces: off-token colour values, banned CSS properties (gradient, non-overlay shadow), Tenor Sans misuse, emoji in product copy, exclamation marks in product copy. Exceptions need an inline `/* verity-allow: <rule> — <reason> */` plus owner review.

---

## 5. Banned patterns (the short list)

The full twenty (visual / interaction-and-motion / copy) are in the Drive folder's `docs/design-system-standards.md`. Read it once carefully. The frequently-hit ones:

- Gradients of any kind.
- Shadows on non-overlay surfaces.
- A second gold accent in one frame.
- Emoji or exclamation marks in product UI.
- Tenor Sans outside the wordmark.
- Off-token colours (any hex not in §1).
- Radius above `10px` on a container.

---

## 6. Voice & tone

Hybrid:
- **Marketing (`/`)** — "we" is allowed; warmth is allowed; still no clichés.
- **Product (everything authenticated + the certificate)** — institutional. No "we". No exclamations. No marketing clichés. Evidence, not opinion.

**Read-aloud test:** read the copy in the voice of a property registrar signing an official document. If it sounds like a salesperson, a chatbot, or a cheerleader, rewrite it.

Error messages are plain English and specific — never "Invalid input". Say what to do: "Please enter a valid Lagos address."

---

## 7. Trust-critical components

Three domain primitives are trust-critical — changes require founder/design-lead review, not routine review:

- **VpidDisplay** — `VRT-XXXXXXXXX`, DM Mono, copy-on-click. (Format in `docs/domain-model.md`.)
- **VprDisplay** — `VPR-YYYY-NNNNNN`, DM Mono.
- **ConfidenceBand** — the six-band ladder + Revoked/Expired overlays.

Build these as first-class shared components and route every identifier/band through them. Never render an identifier or band ad hoc.