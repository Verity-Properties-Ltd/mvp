"use client"

import { useEffect, useRef, useState } from "react"

// ── Animated grid background ──────────────────────────────────────────────────
const GridField = () => (
    <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
    >
        <defs>
            <pattern id="vgrid" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(201,169,97,0.07)" strokeWidth="0.8" />
            </pattern>
            <radialGradient id="fade-mask" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="100%" stopColor="#1E2260" stopOpacity="0.55" />
            </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#vgrid)" />
        <rect width="100%" height="100%" fill="url(#fade-mask)" />
    </svg>
)

// ── Stat item ─────────────────────────────────────────────────────────────────
const Stat = ({
    value,
    label,
    delay,
}: {
    value: string
    label: string
    delay: number
}) => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), delay)
        return () => clearTimeout(t)
    }, [delay])

    return (
        <div
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
        >
            <div
                className="font-serif italic leading-none mb-1.5"
                style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 28,
                    fontWeight: 400,
                    color: "#C9A961",
                }}
            >
                {value}
            </div>
            <div
                style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    letterSpacing: "0.20em",
                    textTransform: "uppercase",
                    color: "rgba(245,242,237,0.90)",
                }}
            >
                {label}
            </div>
        </div>
    )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Hero() {
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const t = setTimeout(() => setLoaded(true), 80)
        return () => clearTimeout(t)
    }, [])

    return (
        <>
            <section
                aria-labelledby="hero-heading"
                className="relative min-h-screen flex flex-col justify-between overflow-hidden"
            >
                {/* ── Property image background ─────────────────────────── */}
                <div className="absolute inset-0 z-0">
                    {/* The property image */}
                    <img
                        src="/property.png"
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover object-center"
                    />
                    {/* Dark navy overlay — heavy at bottom, lighter at top */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(to bottom, rgba(30,34,96,0.72) 0%, rgba(30,34,96,0.55) 40%, rgba(30,34,96,0.88) 80%, rgba(30,34,96,0.97) 100%)",
                        }}
                    />
                    {/* Subtle left-side vignette to help text pop */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(to right, rgba(30,34,96,0.45) 0%, transparent 60%)",
                        }}
                    />
                </div>

                {/* ── Animated grid on top of image ─────────────────────── */}
                <GridField />

                {/* ── Content ───────────────────────────────────────────── */}
                <div className="relative z-10 flex flex-col justify-between min-h-screen px-4 sm:px-12 py-20 md:px-20 lg:px-28 max-w-5xl">
                    {/* Top content group */}
                    <div className="flex flex-col gap-8">
                        {/* Eyebrow */}
                        <div
                            className="flex items-center gap-3.5"
                            style={{
                                opacity: loaded ? 1 : 0,
                                transform: loaded ? "translateY(0)" : "translateY(10px)",
                                transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
                            }}
                        >
                            <span className="block w-6 h-px flex-shrink-0" style={{ backgroundColor: "#C9A961" }} />
                            <span
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: 9,
                                    letterSpacing: "0.26em",
                                    textTransform: "uppercase",
                                    color: "#C9A961",
                                }}
                            >
                                Coming to Lagos, 2026
                            </span>
                        </div>

                        {/* Headline */}
                        <h1
                            id="hero-heading"
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontWeight: 400,
                                fontSize: "clamp(44px, 5.5vw, 76px)",
                                lineHeight: 1.05,
                                letterSpacing: "-0.025em",
                                color: "#F5F2ED",
                                maxWidth: "14ch",
                                opacity: loaded ? 1 : 0,
                                transform: loaded ? "translateY(0)" : "translateY(14px)",
                                transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
                            }}
                        >
                            The trust layer for African real estate is{" "}
                            <em
                                style={{
                                    fontStyle: "italic",
                                    color: "#C9A961",
                                    marginTop: 4,
                                }}
                            >
                                being built.
                            </em>
                        </h1>

                        {/* Body copy */}
                        <p
                            className="text-white font-normal"
                            style={{
                                fontSize: 19,
                                lineHeight: 1.7,
                                maxWidth: "38ch",
                                opacity: loaded ? 1 : 0,
                                transform: loaded ? "translateY(0)" : "translateY(10px)",
                                transition: "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
                            }}

                        >
                            Verity is the property verification and transaction infrastructure
                            for African real estate — building now, with founding partners.
                        </p>

                        {/* CTA group */}
                        <div
                            className="flex items-center flex-wrap gap-5"
                            style={{
                                opacity: loaded ? 1 : 0,
                                transform: loaded ? "translateY(0)" : "translateY(10px)",
                                transition: "opacity 0.7s ease 0.45s, transform 0.7s ease 0.45s",
                            }}
                        >
                            <a
                                href="#waitlist-form"
                                className="verity-primary-cta flex items-center gap-2.5"
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: 14,
                                    letterSpacing: "0.20em",
                                    textTransform: "uppercase",
                                    color: "#1E2260",
                                    backgroundColor: "#C9A961",
                                    border: "1px solid #C9A961",
                                    padding: "14px 28px",
                                    cursor: "pointer",
                                    transition: "background-color 0.2s ease, border-color 0.2s ease",
                                }}
                            >
                                Join the waitlist
                                <span aria-hidden="true" className="verity-arrow">→</span>
                            </a>
                        </div>
                    </div>

                    {/* Bottom stats */}
                    <div
                        className="pt-9 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-9"
                        style={{ borderTop: "1px solid rgba(201,169,97,0.18)" }}
                    >
                        <Stat value="₦100B+" label="Lost to fraud annually" delay={600} />
                        <Stat value="48hr" label="Verification turnaround" delay={750} />
                        <Stat value="50" label="Founding partner slots" delay={900} />
                    </div>
                </div>
            </section >

            <style>{`
        .verity-primary-cta:hover {
          background-color: #B8963A !important;
          border-color: #B8963A !important;
        }
        .verity-ghost-link:hover {
          color: rgba(245,242,237,0.85) !important;
        }
        @media (prefers-reduced-motion: no-preference) {
          .verity-arrow {
            display: inline-block;
            transition: transform 0.2s ease;
          }
          .verity-primary-cta:hover .verity-arrow {
            transform: translateX(4px);
          }
        }
        @media (max-width: 640px) {
          section {
            padding-left: 1.5rem !important;
            padding-right: 1.5rem !important;
          }
        }
      `}</style>
        </>
    )
}