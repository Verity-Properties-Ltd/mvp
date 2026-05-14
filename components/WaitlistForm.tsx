"use client"

import { useState, useRef, useEffect } from "react"

const useInView = (threshold = 0.08) => {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
            { threshold }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [threshold])
    return { ref, visible }
}

// ── Shared field wrapper ───────────────────────────────────────────────────────
const Field = ({
    label,
    required,
    optional,
    children,
    full = false,
}: {
    label: string
    required?: boolean
    optional?: boolean
    children: React.ReactNode
    full?: boolean
}) => (
    <div className={full ? "col-span-2" : ""}>
        <div className="flex items-center gap-2 mb-2.5">
            <span className="font-sans text-[9px] uppercase tracking-[0.22em] text-[#C9A961]">
                {label}
            </span>
            {required && (
                <span className="font-sans text-[9px] uppercase tracking-[0.18em] text-[rgba(245,242,237,0.35)]">
                    — Required
                </span>
            )}
            {optional && (
                <span className="font-sans text-[9px] uppercase tracking-[0.18em] text-[rgba(245,242,237,0.35)]">
                    — Optional
                </span>
            )}
        </div>
        {children}
    </div>
)

const inputClass =
    "w-full bg-[#171A4A] border border-[rgba(245,242,237,0.10)] text-[#F5F2ED] font-sans text-[15px] px-4 py-3.5 placeholder:text-[rgba(245,242,237,0.25)] placeholder:italic focus:outline-none focus:border-[#C9A961] transition-colors duration-150"

const selectClass =
    "w-full bg-[#171A4A] border border-[rgba(245,242,237,0.10)] text-[#F5F2ED] font-sans text-[15px] px-4 py-3.5 appearance-none focus:outline-none focus:border-[#C9A961] transition-colors duration-150 cursor-pointer"

// ── Chevron icon for selects ───────────────────────────────────────────────────
const Chevron = () => (
    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
        <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
            <path d="M1 1l5 5 5-5" stroke="#C9A961" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </div>
)

// ── Buyer form ─────────────────────────────────────────────────────────────────
const BuyerForm = ({ visible }: { visible: boolean }) => {
    const [submitted, setSubmitted] = useState(false)

    if (submitted) return <Confirmation />

    return (
        <div
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
            }}
        >
            {/* Header */}
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                    <span className="block w-8 h-px bg-[#C9A961] flex-shrink-0" />
                    <span className="font-sans text-[9px] uppercase tracking-[0.26em] text-[#C9A961]">
                        Buyer Waitlist
                    </span>
                </div>
                <h2
                    className="font-serif font-normal text-[#F5F2ED] mb-5"
                    style={{ fontSize: "clamp(28px, 3.5vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
                >
                    Be first in line when we open <br></br> verification{" "}
                    <em className="italic text-[#C9A961]">to the public.</em>
                </h2>
                <p className="font-sans text-[15px] leading-[1.75] text-[rgba(245,242,237,0.65)] font-normal max-w-[52ch]">
                    We'll email you when the verification platform opens, and we'll
                    prioritise the first cohort of buyers from this waitlist for early
                    access at launch pricing.
                </p>
            </div>

            {/* Form */}
            <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
                className="flex flex-col gap-8"
            >
                <div className="grid grid-cols-2 gap-x-6 gap-y-7">
                    <Field label="Your name" required>
                        <input
                            type="text"
                            required
                            placeholder="Folake Adeyemi"
                            autoComplete="name"
                            className={inputClass}
                        />
                    </Field>

                    <Field label="Email" required>
                        <input
                            type="email"
                            required
                            placeholder="folake@example.com"
                            autoComplete="email"
                            className={inputClass}
                        />
                    </Field>

                    <Field label="Where you're based">
                        <div className="relative">
                            <select className={selectClass} defaultValue="">
                                <option value="" disabled>Select country</option>
                                <option>United Kingdom</option>
                                <option>United States</option>
                                <option>Canada</option>
                                <option>Nigeria</option>
                                <option>United Arab Emirates</option>
                                <option>Germany</option>
                                <option>Ireland</option>
                                <option>Australia</option>
                                <option>South Africa</option>
                                <option>Other</option>
                            </select>
                            <Chevron />
                        </div>
                    </Field>

                    <Field label="Timing">
                        <div className="relative">
                            <select className={selectClass} defaultValue="">
                                <option value="" disabled>When are you buying?</option>
                                <option>I'm in active negotiation now</option>
                                <option>Within 3 months</option>
                                <option>Within 6 months</option>
                                <option>Just researching for now</option>
                            </select>
                            <Chevron />
                        </div>
                    </Field>
                </div>

                {/* Submit */}
                <div className="flex flex-col gap-4 pt-2">
                    <button
                        type="submit"
                        className="wl-submit-btn self-start flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#C9A961] border-b border-[#C9A961] pb-1 bg-transparent cursor-pointer transition-colors duration-150"
                    >
                        Join the buyer waitlist
                        <span aria-hidden="true" className="wl-arrow">→</span>
                    </button>
                    <p className="font-sans italic text-[13px] text-[rgba(245,242,237,0.38)] leading-[1.6]">
                        — We'll email you at launch, nothing else. No marketing, no third-party sharing. Unsubscribe anytime.
                    </p>
                </div>
            </form>
        </div>
    )
}

// ── Developer form ─────────────────────────────────────────────────────────────
const DeveloperForm = ({ visible }: { visible: boolean }) => {
    const [submitted, setSubmitted] = useState(false)

    if (submitted) return <Confirmation />

    return (
        <div
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
            }}
        >
            {/* Header */}
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                    <span className="block w-8 h-px bg-[#C9A961] flex-shrink-0" />
                    <span className="font-sans text-[9px] uppercase tracking-[0.26em] text-[#C9A961]">
                        Founding 50
                    </span>
                </div>
                <h2
                    className="font-serif font-normal text-[#F5F2ED] mb-5"
                    style={{ fontSize: "clamp(28px, 3.5vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
                >
                    Apply to be a{" "}
                    <em className="italic text-[#C9A961]">Founding 50 Partner.</em>
                </h2>
                <p className="font-sans text-[15px] leading-[1.75] text-[rgba(245,242,237,0.65)] font-normal max-w-[52ch]">
                    Limited to the first 50 admitted developers. Reviewed by the
                    founding team — we read every application and respond within
                    five business days. The CEO does the onboarding call himself.
                </p>
            </div>

            {/* Form */}
            <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
                className="flex flex-col gap-8"
            >
                <div className="grid grid-cols-2 gap-x-6 gap-y-7">
                    <Field label="Your name" required>
                        <input
                            type="text"
                            required
                            placeholder="Oladipo Awolaja"
                            autoComplete="name"
                            className={inputClass}
                        />
                    </Field>

                    <Field label="Work email" required>
                        <input
                            type="email"
                            required
                            placeholder="you@company.com"
                            autoComplete="email"
                            className={inputClass}
                        />
                    </Field>

                    <Field label="Company">
                        <input
                            type="text"
                            placeholder="Registered company name"
                            autoComplete="organization"
                            className={inputClass}
                        />
                    </Field>

                    <Field label="Portfolio size">
                        <div className="relative">
                            <select className={selectClass} defaultValue="">
                                <option value="" disabled>Active properties</option>
                                <option>1 – 10 properties</option>
                                <option>11 – 50 properties</option>
                                <option>51 – 200 properties</option>
                                <option>200+ properties</option>
                            </select>
                            <Chevron />
                        </div>
                    </Field>

                    <Field label="Your role">
                        <div className="relative">
                            <select className={selectClass} defaultValue="">
                                <option value="" disabled>Select role</option>
                                <option>Founder</option>
                                <option>CEO</option>
                                <option>Managing Director</option>
                                <option>Head of Sales</option>
                                <option>Operations</option>
                                <option>Other</option>
                            </select>
                            <Chevron />
                        </div>
                    </Field>

                    <Field label="Website" optional>
                        <input
                            type="text"
                            placeholder="company.com"
                            autoComplete="url"
                            className={inputClass}
                        />
                    </Field>

                    <Field label="What you're building" optional full>
                        <textarea
                            rows={4}
                            placeholder="A few lines on your active portfolio, geographies, and what brought you here…"
                            className={`${inputClass} resize-none placeholder:not-italic`}
                        />
                    </Field>
                </div>

                {/* Submit */}
                <div className="flex flex-col gap-4 pt-2">
                    <button
                        type="submit"
                        className="wl-submit-btn self-start flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#C9A961] border-b border-[#C9A961] pb-1 bg-transparent cursor-pointer transition-colors duration-150"
                    >
                        Submit application
                        <span aria-hidden="true" className="wl-arrow">→</span>
                    </button>
                    <p className="font-sans italic text-[13px] text-[rgba(245,242,237,0.38)] leading-[1.6]">
                        — Reviewed within 5 business days. Successful applicants get a 20-minute onboarding call with the CEO. Limited to first 50.
                    </p>
                </div>
            </form>
        </div>
    )
}

// ── Confirmation state ─────────────────────────────────────────────────────────
const Confirmation = () => (
    <div className="flex flex-col items-start gap-6 py-8">
        <div className="w-14 h-14 rounded-full bg-[#C9A961] flex items-center justify-center flex-shrink-0">
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                <path d="M1 8l6 6L21 1" stroke="#1E2260" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
        <div>
            <h3
                className="font-serif font-normal text-[#F5F2ED] mb-3"
                style={{ fontSize: "clamp(24px, 3vw, 38px)", lineHeight: 1.15, letterSpacing: "-0.015em" }}
            >
                You're on the list.
            </h3>
            <p className="font-sans text-[15px] leading-[1.75] text-[rgba(245,242,237,0.6)] max-w-[44ch]">
                We'll be in touch. Check your email for a confirmation in the next few minutes.
            </p>
        </div>
    </div>
)

// ── Main export ────────────────────────────────────────────────────────────────
type Tab = "buyer" | "developer"

export default function WaitlistForm() {
    const { ref, visible } = useInView()
    const [activeTab, setActiveTab] = useState<Tab>("buyer")

    return (
        <>
            <section
                id="waitlist-form"
                ref={ref}
                aria-labelledby="waitlist-heading"
                className="bg-[#1E2260]"
            >
                <div
                    className="mx-auto px-4 sm:px-12 pt-20 pb-28"
                    style={{ maxWidth: 1280 }}
                >
                    {/* ── Top eyebrow ── */}
                    <div
                        className="flex items-center gap-3 mb-14"
                        style={{
                            opacity: visible ? 1 : 0,
                            transform: visible ? "translateY(0)" : "translateY(8px)",
                            transition: "opacity 0.5s ease, transform 0.5s ease",
                        }}
                    >
                        <span className="block w-8 h-px bg-[#C9A961] flex-shrink-0" />
                        <span className="font-sans text-[9px] uppercase tracking-[0.26em] text-[rgba(245,242,237,0.5)]">
                            A small step · Two minutes
                        </span>
                    </div>

                    {/* ── Tab toggle ── */}
                    <div
                        className="grid grid-cols-2 mb-16"
                        style={{
                            borderBottom: "1px solid rgba(245,242,237,0.10)",
                            opacity: visible ? 1 : 0,
                            transition: "opacity 0.5s ease 0.1s",
                        }}
                        role="tablist"
                        aria-label="Waitlist type"
                    >
                        {(["buyer", "developer"] as Tab[]).map((tab) => (
                            <button
                                key={tab}
                                role="tab"
                                aria-selected={activeTab === tab}
                                aria-controls={`panel-${tab}`}
                                onClick={() => setActiveTab(tab)}
                                className="font-mono text-[11px] uppercase tracking-[0.26em] py-5 text-center transition-colors duration-150 cursor-pointer bg-transparent border-none"
                                style={{
                                    color: activeTab === tab ? "#C9A961" : "rgba(245,242,237,0.35)",
                                    borderBottom: activeTab === tab ? "1px solid #C9A961" : "1px solid transparent",
                                    marginBottom: -1,
                                }}
                            >
                                {tab === "buyer" ? "I'm a buyer" : "I'm a developer"}
                            </button>
                        ))}
                    </div>

                    {/* ── Form panels ── */}
                    <div style={{ maxWidth: 880 }}>
                        <div
                            id="panel-buyer"
                            role="tabpanel"
                            aria-labelledby="tab-buyer"
                            hidden={activeTab !== "buyer"}
                        >
                            <BuyerForm visible={visible && activeTab === "buyer"} />
                        </div>
                        <div
                            id="panel-developer"
                            role="tabpanel"
                            aria-labelledby="tab-developer"
                            hidden={activeTab !== "developer"}
                        >
                            <DeveloperForm visible={visible && activeTab === "developer"} />
                        </div>
                    </div>
                </div>
            </section>

            <style>{`
                .wl-submit-btn:hover { color: rgba(245,242,237,0.85) !important; border-color: rgba(245,242,237,0.85) !important; }
                @media (prefers-reduced-motion: no-preference) {
                    .wl-arrow { display: inline-block; transition: transform 0.18s ease; }
                    .wl-submit-btn:hover .wl-arrow { transform: translateX(4px); }
                }
                select option { background-color: #171A4A; color: #F5F2ED; }
            `}</style>
        </>
    )
}