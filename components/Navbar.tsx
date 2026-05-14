"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

const NAV_LINKS = [
    { label: "Two Paths", href: "#two-paths" },
    { label: "Why Us", href: "#why-us" },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 12)
        window.addEventListener("scroll", handler, { passive: true })
        return () => window.removeEventListener("scroll", handler)
    }, [])

    return (
        <>
            <header
                className={[
                    "sticky top-0 z-50 transition-all duration-300",
                    scrolled
                        ? "bg-[#F5F2ED]/95 border-b border-[#1E2260]/10 backdrop-blur-xl"
                        : "bg-[#F5F2ED]/80 border-b border-transparent backdrop-blur-md",
                ].join(" ")}
            >
                <div className="max-w-[1320px] mx-auto px-8 md:px-10 h-[66px] flex items-center justify-between">

                    {/* Brand */}
                    <Link href="/" aria-label="Verity — home">
                        <img src="/verityLogo.png" className="w-24" alt="Verity" />
                    </Link>

                    {/* Desktop Nav */}
                    <nav
                        aria-label="Main navigation"
                        className="hidden md:flex items-center gap-9"
                    >
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="
                                    font-mono text-[11px] tracking-[0.18em] uppercase
                                    text-[#6B6F77] border-b border-transparent pb-0.5
                                    transition-all duration-200
                                    hover:text-[#1E2260] hover:border-[#C9A961]
                                "
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right cluster */}
                    <div className="flex items-center gap-4">

                        {/* Live status — desktop only */}
                        <div className="hidden md:flex items-center gap-2 mr-2 pr-6 border-r border-[#1E2260]/10">
                            <span
                                aria-hidden="true"
                                className="block w-[5px] h-[5px] rounded-full bg-[#C9A961] animate-[verity-pulse_2.4s_ease-in-out_infinite]"
                            />
                            <span className="font-mono text-[9px] tracking-[0.20em] uppercase text-[#9DA1A8]">
                                In build · Lagos · 2026
                            </span>
                        </div>

                        {/* Single CTA */}
                        <a
                            href="#waitlist-form"
                            className="
                                hidden sm:inline-flex items-center gap-2
                                font-mono text-[10px] tracking-[0.18em] uppercase
                                text-[#F5F2ED] bg-[#1E2260] border border-[#1E2260]
                                px-5 py-2.5
                                transition-all duration-200
                                hover:bg-[#14174A] hover:border-[#14174A]
                                group
                            "
                        >
                            Join the waitlist
                            <span
                                aria-hidden="true"
                                className="text-[11px] transition-transform duration-200 group-hover:translate-x-1"
                            >
                                →
                            </span>
                        </a>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                            aria-expanded={mobileOpen}
                            className="md:hidden p-1.5 text-[#1E2260]"
                        >
                            {mobileOpen ? (
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                    <line x1="2" y1="2" x2="16" y2="16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                                    <line x1="16" y1="2" x2="2" y2="16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                                </svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                    <line x1="2" y1="5" x2="16" y2="5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                                    <line x1="2" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                                    <line x1="2" y1="13" x2="10" y2="13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div className="md:hidden bg-[#F5F2ED] border-t border-[#1E2260]/08 px-6 pt-5 pb-7">
                        <nav aria-label="Mobile navigation" className="flex flex-col">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="
                                        font-mono text-[11px] tracking-[0.18em] uppercase
                                        text-[#1E2260] no-underline
                                        py-3.5 border-b border-[#1E2260]/07
                                        flex justify-between items-center
                                    "
                                >
                                    {link.label}
                                    <span className="text-[#C9A961] text-xs">→</span>
                                </Link>
                            ))}
                        </nav>

                        <div className="mt-6">
                            <Link
                                href="#form-section"
                                onClick={() => setMobileOpen(false)}
                                className="
                                    font-mono text-[11px] tracking-[0.18em] uppercase
                                    text-[#F5F2ED] bg-[#1E2260] border border-[#1E2260]
                                    py-3.5 px-5 w-full text-center block
                                    hover:bg-[#14174A]
                                "
                            >
                                Join the waitlist →
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            <style>{`
                @keyframes verity-pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(0.85); }
                }
            `}</style>
        </>
    )
}