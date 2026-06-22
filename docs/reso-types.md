# RESO Property Types (Nigeria)

Source: RESO Property Type Mapping (Nigeria) v1.1, RESO Data Dictionary v2.0. Governs the property upload form, the 5-category UI selector, TypeScript interfaces, Zod schemas, and OCR field mappings. The frontend's type-derivation logic must agree with the backend DB constraints.

---

## Field naming

| Namespace | Meaning | Example |
| --- | --- | --- |
| RESO standard | Universal, no prefix | `PropertyType`, `PropertySubType` |
| `Verity_*` | Verity global | `Verity_VPID`, `Verity_ConfidenceScore` |
| `Verity_NG_*` | Nigeria-specific | `Verity_NG_HouseStyle`, `Verity_NG_LandZoning` |

PascalCase for RESO and `Verity_*` fields. snake_case is wrong.

---

## Excluded subtypes — never emit these

Two values are blocked **at the DB constraint level** (and must never be produced by frontend derivation):

- **`PropertySubType = 'Duplex'`** — RESO `Duplex` = a two-unit income property. A Nigerian "duplex" = a two-storey single-family home. Semantically opposite. Constraint: `chk_no_reso_duplex`. A Nigerian duplex → `SingleFamilyResidence` + `Verity_NG_HouseStyle = Duplex`.
- **`PropertySubType = 'Condominium'`** — no equivalent in Nigerian property law. Constraint: `chk_no_condominium`. Apartments use `PropertySubType = Apartment`.

Excluded by convention (no constraint): **`ResidentialIncome`** — each unit is recorded separately as `Residential` / `Apartment`.

---

## The 5-category UI selector → RESO derivation

The add-property wizard shows **five categories**. Each resolves to a RESO `PropertyType` + `PropertySubType`. Commercial and Farm are **Phase 2** — define now for type consistency, but don't surface them in the MVP wizard.

### 1. Landed Property → `PropertyType = Land`

| UI label | `PropertySubType` | `Verity_NG_LandZoning` |
| --- | --- | --- |
| Residential Plot | `VacantLand` | `Residential` |
| Commercial Plot | `CommercialLand` | `Commercial` |
| Mixed-Use Plot | `VacantLand` | `MixedUse` |
| Industrial Plot | `CommercialLand` | `Industrial` |
| Agricultural Plot | `AgriculturalLand` | `Agricultural` |

`Verity_NG_LandFeature` (optional attribute, not a category): `Waterfront`, `Reclaimed`, `None`.

### 2. Residential House → `PropertyType = Residential`

`PropertySubType` is derived from House Style + Attachment (hard rule, enforced at API layer):

| `Verity_NG_HouseStyle` | `Verity_NG_HouseAttachment` | `PropertySubType` |
| --- | --- | --- |
| `Bungalow` | `Detached` / `SemiDetached` | `SingleFamilyResidence` |
| `Duplex` | `Detached` / `SemiDetached` | `SingleFamilyResidence` |
| `Terrace` | `Detached` / `SemiDetached` | `Townhouse` |

### 3. Apartment / Flat → `PropertyType = Residential`, `PropertySubType = Apartment` (always)

`Verity_NG_ApartmentStyle` carries the distinction:

| UI label | `Verity_NG_ApartmentStyle` | Tooltip |
| --- | --- | --- |
| Studio | `Studio` | "Also known as Self-Contain" |
| Standard Flat | `StandardFlat` | "Also known as Mini-Flat / One Bedroom" |
| Penthouse | `Penthouse` | — |
| Maisonette | `Maisonette` | Two-floor unit; RESO has no native subtype |

Mini-Flat / Self-Contain are **tooltip labels only**, not separate enum values.

### 4. Commercial → `PropertyType = Commercial` — Phase 2
Subtypes: `Office`, `Retail`, `Industrial`, `Hotel`, `MixedUse`.

### 5. Farm → `PropertyType = Farm` — Phase 2
Agricultural land with active farming infrastructure (distinct from an unimproved Agricultural Plot).

---

## Boys' Quarters (BQ) — cross-cutting (Categories 2 & 3)

| Field | Type | Values |
| --- | --- | --- |
| `Verity_NG_HasBQ` | boolean | toggle |
| `Verity_NG_BQConfig` | string | `Attached`, `Detached`, `Rooftop` (required if HasBQ) |
| `Verity_NG_BQSeparateTitle` | boolean | if true → analyst flag |
| `Verity_NG_BQBedroomsTotal` | int | default 0 |
| `Verity_NG_BQBathroomsFull` | int | default 0 |
| `Verity_NG_BQBathroomsHalf` | int | default 0 |

**Analyst flag threshold:** `Verity_NG_BQBedroomsTotal >= 3 AND Verity_NG_BQSeparateTitle = false` → flag *"BQ is large enough to potentially be separately titled. Verify with seller that the BQ is included in the main C of O."* Goes to the analyst QA queue (not a hard block).

---

## Full `Verity_NG_*` register

| Field | Type | Scope | Values |
| --- | --- | --- | --- |
| `Verity_NG_HouseStyle` | varchar(20) | Cat 2 | `Bungalow`, `Duplex`, `Terrace` |
| `Verity_NG_HouseAttachment` | varchar(20) | Cat 2 | `Detached`, `SemiDetached` |
| `Verity_NG_ApartmentStyle` | varchar(20) | Cat 3 | `Studio`, `StandardFlat`, `Penthouse`, `Maisonette` |
| `Verity_NG_LandZoning` | varchar(20) | Cat 1 | `Residential`, `Commercial`, `MixedUse`, `Industrial`, `Agricultural` |
| `Verity_NG_LandFeature` | varchar(20) | Cat 1 | `Waterfront`, `Reclaimed`, `None` |
| `Verity_NG_HasBQ` | boolean | Cat 2 & 3 | true/false |
| `Verity_NG_BQConfig` | varchar(20) | Cat 2 & 3 | `Attached`, `Detached`, `Rooftop` |
| `Verity_NG_BQSeparateTitle` | boolean | Cat 2 & 3 | true/false |
| `Verity_NG_BQBedroomsTotal` | smallint | Cat 2 & 3 | ≥0 (flag if ≥3 & not separately titled) |
| `Verity_NG_BQBathroomsFull` | smallint | Cat 2 & 3 | ≥0 |
| `Verity_NG_BQBathroomsHalf` | smallint | Cat 2 & 3 | ≥0 |
| `Verity_NG_PlotNumber` | varchar(50) | all | free text |
| `Verity_NG_Neighborhood` | varchar(150) | all | free text (MVP) |

---

## Companion specs (not yet in this repo)

Form/validation detail beyond type mapping lives in: RESO Adoption Brief v1.2, RESO Bathroom Implementation v1.1, Address Capture & RESO Standards v1, RESO Area & Measurement v1. If precise bathroom arithmetic, address parsing, or area/unit rules are needed, pull those specs in rather than improvising.