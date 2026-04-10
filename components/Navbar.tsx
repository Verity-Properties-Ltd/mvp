"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface NavbarProps {
    onOpenModal: () => void;
}

const NAV_LINKS = [
    { label: "How it Works", id: "how-it-works" },
    { label: "Pricing", id: "pricing" },
    { label: "Developer", id: "for-developers", path: "/developers" }, // Added path
    { label: "FAQ", id: "faq" },
];

export default function Navbar({ onOpenModal }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter()

    const handleNavClick = (link: { id: string; path?: string }) => {
        setMenuOpen(false);

        if (link.path) {
            // Navigate to the new page
            router.push(link.path);
        } else {
            // Smooth scroll to section
            document.getElementById(link.id)?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    };

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        setMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <>
            {/* ── Navbar wrapper — floats over page ── */}
            <div
                className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6"
                style={{ paddingTop: scrolled ? "10px" : "16px", transition: "padding 300ms ease" }}
            >
                <nav
                    className="w-full flex items-center justify-between px-6 transition-all duration-300"
                    style={{
                        maxWidth: "1100px",
                        height: "60px",
                        borderRadius: "9999px",
                        background: scrolled
                            ? "rgba(6,38,66,0.92)"
                            : "rgba(6,38,66,0.75)",
                        backdropFilter: "blur(16px)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        boxShadow: scrolled
                            ? "0 8px 32px rgba(0,0,0,0.3)"
                            : "0 2px 12px rgba(0,0,0,0.15)",
                    }}
                >
                    {/* Logo */}
                    <button
                        type="button"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="flex items-center gap-2 flex-shrink-0"
                    >
                        {/* Shield icon */}
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z"
                                fill="#C9A84C"
                            />
                            <path
                                d="M9 12l2 2 4-4"
                                stroke="white"
                                strokeWidth="1.75"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span
                            className="font-extrabold text-white tracking-widest text-sm"
                            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.2em" }}
                        >
                            VERITY
                        </span>
                    </button>

                    {/* Desktop nav links */}
                    <div className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <button
                                key={link.id}
                                type="button"
                                onClick={() => handleNavClick(link)} // Pass the object
                                className="text-sm cursor-pointer font-medium transition-colors duration-150 hover:text-white"
                                style={{ color: "rgba(255,255,255,0.65)" }}
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center">
                        <button
                            type="button"
                            onClick={onOpenModal}
                            className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-150 hover:opacity-90 active:scale-[0.97]"
                            style={{ background: "#C9A84C", color: "#062642" }}
                        >
                            Join the Waitlist
                        </button>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        type="button"
                        onClick={() => setMenuOpen(true)}
                        className="md:hidden flex flex-col gap-[5px] p-2"
                        aria-label="Open menu"
                    >
                        <span className="w-5 h-[2px] rounded-full" style={{ background: "rgba(255,255,255,0.8)" }} />
                        <span className="w-5 h-[2px] rounded-full" style={{ background: "rgba(255,255,255,0.8)" }} />
                        <span className="w-3 h-[2px] rounded-full" style={{ background: "rgba(255,255,255,0.8)" }} />
                    </button>
                </nav>
            </div>

            {/* ── Mobile full-screen menu ── */}
            <div
                className={`fixed inset-0 z-[100] flex flex-col transition-transform duration-[250ms] ease-out ${menuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                style={{ background: "#062642" }}
            >
                {/* Mobile menu header */}
                <div
                    className="flex items-center justify-between px-6 h-[72px]"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                >
                    <div className="flex items-center gap-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z"
                                fill="#C9A84C"
                            />
                            <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span
                            className="font-extrabold text-white text-sm tracking-widest"
                            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.2em" }}
                        >
                            VERITY
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setMenuOpen(false)}
                        className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
                        style={{ background: "rgba(255,255,255,0.08)", color: "white" }}
                        aria-label="Close menu"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Mobile nav links */}
                <div className="flex flex-col px-8 pt-10 gap-2 flex-1">
                    {NAV_LINKS.map((link, i) => (
                        <button
                            key={link.id}
                            type="button"
                            onClick={() => scrollTo(link.id)}
                            className="text-left py-4 text-2xl font-semibold text-white transition-colors duration-150 hover:text-[#C9A84C]"
                            style={{
                                borderBottom: i < NAV_LINKS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : undefined,
                                fontFamily: "var(--font-display)",
                            }}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>

                {/* Mobile CTA */}
                <div className="px-8 pb-12">
                    <button
                        type="button"
                        onClick={() => {
                            setMenuOpen(false);
                            onOpenModal();
                        }}
                        className="w-full py-4 rounded-full text-base font-semibold transition-all duration-150 active:scale-[0.98]"
                        style={{ background: "#C9A84C", color: "#062642" }}
                    >
                        Join the Waitlist
                    </button>
                </div>
            </div>
        </>
    );
}