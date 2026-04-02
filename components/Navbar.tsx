"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface NavbarProps {
    onOpenModal: () => void;
}

export default function Navbar({ onOpenModal }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        setMenuOpen(false);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-[0_1px_3px_rgba(0,0,0,0.08)]" : ""
                    }`}
                style={{ height: "72px" }}
            >
                <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <rect width="32" height="32" rx="8" fill="#1B3F6B" />
                            <path
                                d="M16 7L22 11.5V16.5C22 20.09 19.42 23.45 16 24.5C12.58 23.45 10 20.09 10 16.5V11.5L16 7Z"
                                fill="#C9A84C"
                                stroke="#C9A84C"
                                strokeWidth="0.5"
                            />
                            <path
                                d="M13.5 16.5L15.5 18.5L19 14.5"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span
                            className="font-bold text-xl tracking-tight"
                            style={{ color: "#1B3F6B", fontFamily: "var(--font-display)" }}
                        >
                            VERITY
                        </span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {[
                            { label: "How it Works", id: "how-it-works" },
                            { label: "Pricing", id: "pricing" },
                            { label: "For Developers", id: "for-developers" },
                            { label: "FAQ", id: "faq" },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollTo(item.id)}
                                className="text-sm cursor-pointer font-medium transition-colors duration-150 hover:text-[#0D7A5F] relative group"
                                style={{ color: "#374151" }}
                            >
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#0D7A5F] transition-all duration-200 group-hover:w-full" />
                            </button>
                        ))}
                    </div>

                    {/* Desktop CTAs */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            href="/login"
                            className="px-4 py-2 text-sm font-semibold rounded-lg border border-[#0D7A5F] text-[#0D7A5F] hover:bg-[#E6F4F0] transition-colors duration-150"
                        >
                            Log in
                        </Link>
                        <button
                            onClick={onOpenModal}
                            className="px-5 py-2 text-sm font-semibold rounded-lg text-white transition-all duration-150 hover:shadow-md active:scale-[0.98]"
                            style={{ background: "#0D7A5F" }}
                        >
                            Get a Report
                        </button>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setMenuOpen(true)}
                        className="md:hidden flex flex-col gap-[5px] p-2"
                        aria-label="Open menu"
                    >
                        <span className="w-6 h-[2px] bg-[#1B3F6B] rounded-full" />
                        <span className="w-6 h-[2px] bg-[#1B3F6B] rounded-full" />
                        <span className="w-6 h-[2px] bg-[#1B3F6B] rounded-full" />
                    </button>
                </div>
            </nav>

            {/* Mobile Full-Screen Menu */}
            <div
                className={`fixed inset-0 z-[100] flex flex-col transition-transform duration-[250ms] ease-out ${menuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                style={{ background: "#0F2340" }}
            >
                <div className="flex items-center justify-between px-6 h-[56px]">
                    <span
                        className="font-bold text-xl tracking-tight text-white"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        VERITY
                    </span>
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="text-white text-2xl p-2"
                        aria-label="Close menu"
                    >
                        ×
                    </button>
                </div>

                <div className="flex flex-col gap-10 px-8 pt-12">
                    {[
                        { label: "How it Works", id: "how-it-works" },
                        { label: "Pricing", id: "pricing" },
                        { label: "For Developers", id: "for-developers" },
                        { label: "FAQ", id: "faq" },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollTo(item.id)}
                            className="text-left text-2xl font-semibold text-white hover:text-[#C9A84C] transition-colors duration-150"
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <div className="mt-auto px-8 pb-12">
                    <button
                        onClick={() => {
                            setMenuOpen(false);
                            onOpenModal();
                        }}
                        className="w-full py-4 text-base font-semibold rounded-xl text-[#1F2937] transition-all duration-150 active:scale-[0.98]"
                        style={{ background: "#C9A84C" }}
                    >
                        Get a Report
                    </button>
                </div>
            </div>
        </>
    );
}