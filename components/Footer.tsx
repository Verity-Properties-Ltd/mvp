"use client"

import Link from "next/link"
import Image from "next/image"

interface FooterProps {
    onOpenModal: () => void
}

export default function Footer({ onOpenModal }: FooterProps) {
    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    const LinkItem = ({
        href,
        children,
        onClick,
    }: {
        href?: string
        children: React.ReactNode
        onClick?: () => void
    }) => {
        const cls =
            "font-sans text-[14px] leading-relaxed text-slate hover:text-navy transition-colors duration-150 text-left cursor-pointer"
        if (onClick) {
            return (
                <button type="button" onClick={onClick} className={cls}>
                    {children}
                </button>
            )
        }
        return (
            <Link href={href || "#"} className={cls}>
                {children}
            </Link>
        )
    }

    return (
        <footer className="w-full bg-white border-t border-navy/10">

            {/* ── Main grid ── */}
            <div className="max-w-[1280px] mx-auto px-12 py-16">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">

                    {/* Col 1 — Brand */}
                    <div className="col-span-2 lg:col-span-1 flex flex-col gap-6">
                        <div>
                            <Image
                                src="/verityLogo.png"
                                alt="Verity"
                                width={120}
                                height={40}
                                className="object-contain object-left"
                            />
                        </div>

                        <p className="font-sans text-[14px] leading-relaxed text-slate max-w-[24ch]">
                            Nigeria's property trust layer.
                        </p>

                        {/* Social icons */}
                        <div className="flex items-center gap-3">
                            <a
                                href="https://linkedin.com/company/verity-ng"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="w-8 h-8 flex items-center justify-center text-slate hover:text-navy transition-colors duration-150 rounded-sm border border-navy/12"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                            <a
                                href="https://twitter.com/verity_ng"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Twitter / X"
                                className="w-8 h-8 flex items-center justify-center text-slate hover:text-navy transition-colors duration-150 rounded-sm border border-navy/12"
                            >
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Col 2 — Product */}
                    <div>
                        <h4
                            className="font-sans text-[10px] font-semibold uppercase tracking-[0.20em] text-navy mb-5"
                        >
                            Product
                        </h4>
                        <div className="flex flex-col gap-3">
                            <LinkItem onClick={() => scrollTo("how-it-works")}>How it works</LinkItem>
                            <LinkItem onClick={() => scrollTo("pricing")}>Pricing</LinkItem>
                        </div>
                    </div>

                    {/* Col 3 — Company */}
                    <div>
                        <h4
                            className="font-sans text-[10px] font-semibold uppercase tracking-[0.20em] text-navy mb-5"
                        >
                            Company
                        </h4>
                        <div className="flex flex-col gap-3">
                            <LinkItem href="/privacy">Privacy policy</LinkItem>
                            <LinkItem href="/terms">Terms of service</LinkItem>
                        </div>
                    </div>

                    {/* Col 4 — Contact */}
                    <div>
                        <h4
                            className="font-sans text-[10px] font-semibold uppercase tracking-[0.20em] text-navy mb-5"
                        >
                            Contact
                        </h4>
                        <div className="flex flex-col gap-3">
                            <a
                                href="mailto:hello@verity.properties"
                                className="font-sans text-[14px] text-slate hover:text-navy transition-colors duration-150"
                            >
                                hello@verity.properties
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            {/* ── Copyright bar ── */}
            <div className="px-12 py-5 border-t border-navy/8">
                <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
                    <span className="font-sans text-[12px] text-slate-soft">
                        Made in Lagos 🇳🇬
                    </span>
                    <span className="font-sans text-[12px] text-slate-soft text-center">
                        © 2026 Verity Property Technologies, Ltd. · CAC Registered · NDPR Compliant
                    </span>
                </div>
            </div>

        </footer>
    )
}