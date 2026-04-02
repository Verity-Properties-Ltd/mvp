"use client";

import Link from "next/link";

interface FooterProps {
    onOpenModal: () => void;
}

export default function Footer({ onOpenModal }: FooterProps) {
    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const LinkItem = ({
        href,
        children,
        onClick,
    }: {
        href?: string;
        children: React.ReactNode;
        onClick?: () => void;
    }) => {
        const cls = "text-sm transition-colors duration-150 hover:text-white cursor-pointer text-left";
        const style = { color: "rgba(255,255,255,0.65)" };
        if (onClick) {
            return <button type="button" onClick={onClick} className={cls} style={style}>{children}</button>;
        }
        return <Link href={href || "#"} className={cls} style={style}>{children}</Link>;
    };

    return (
        <footer style={{ background: "#0F2340" }} className="w-full">
            <div className="max-w-[1280px] mx-auto px-6 py-16">
                {/* 2-col on mobile, 4-col on desktop */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">

                    {/* Col 1 — Brand */}
                    <div className="col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-3">
                            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                                <rect width="32" height="32" rx="8" fill="rgba(255,255,255,0.1)" />
                                <path
                                    d="M16 7L22 11.5V16.5C22 20.09 19.42 23.45 16 24.5C12.58 23.45 10 20.09 10 16.5V11.5L16 7Z"
                                    fill="#C9A84C"
                                />
                                <path d="M13.5 16.5L15.5 18.5L19 14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="font-bold font-serif text-lg text-white tracking-tight">
                                VERITY
                            </span>
                        </div>
                        <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
                            Nigeria&apos;s property trust layer.
                        </p>
                        <div className="flex items-center gap-3">
                            <a
                                href="https://linkedin.com/company/verity-ng"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150 hover:text-[#C9A84C]"
                                style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}
                                aria-label="LinkedIn"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                            <a
                                href="https://twitter.com/verity_ng"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150 hover:text-[#C9A84C]"
                                style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}
                                aria-label="Twitter/X"
                            >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Col 2 — Product */}
                    <div>
                        <h4
                            className="text-[11px] font-semibold tracking-[0.15em] uppercase mb-5"
                            style={{ color: "#C9A84C" }}
                        >
                            Product
                        </h4>
                        <div className="flex flex-col gap-3">
                            <LinkItem onClick={() => scrollTo("how-it-works")}>How it Works</LinkItem>
                            <LinkItem onClick={() => scrollTo("pricing")}>Pricing</LinkItem>
                            <LinkItem onClick={() => scrollTo("for-developers")}>For Developers</LinkItem>
                            <LinkItem onClick={onOpenModal}>Get a Report</LinkItem>
                        </div>
                    </div>

                    {/* Col 3 — Company */}
                    <div>
                        <h4
                            className="text-[11px] font-semibold tracking-[0.15em] uppercase mb-5"
                            style={{ color: "#C9A84C" }}
                        >
                            Company
                        </h4>
                        <div className="flex flex-col gap-3">
                            <LinkItem href="/about">About Verity</LinkItem>
                            <LinkItem onClick={() => scrollTo("faq")}>FAQ</LinkItem>
                            <LinkItem href="/privacy">Privacy Policy</LinkItem>
                            <LinkItem href="/terms">Terms of Service</LinkItem>
                        </div>
                    </div>

                    {/* Col 4 — Contact */}
                    <div>
                        <h4
                            className="text-[11px] font-semibold tracking-[0.15em] uppercase mb-5"
                            style={{ color: "#C9A84C" }}
                        >
                            Contact
                        </h4>
                        <div className="flex flex-col gap-3">
                            <a
                                href="mailto:hello@verity.properties"
                                className="text-sm transition-colors duration-150 hover:text-white"
                                style={{ color: "rgba(255,255,255,0.65)" }}
                            >
                                hello@verity.properties
                            </a>
                            <a
                                href="https://wa.me/14692516652?text=Hi%20Verity%2C%20I%20have%20a%20question"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm transition-colors duration-150 hover:text-white flex items-center gap-1.5"
                                style={{ color: "rgba(255,255,255,0.65)" }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                WhatsApp
                            </a>
                            <span className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                                Lagos, Nigeria
                            </span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Copyright bar */}
            <div
                className="border-t px-6 py-5"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
                <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                        Made in Lagos 🇳🇬
                    </span>
                    <span className="text-xs text-center" style={{ color: "rgba(255,255,255,0.4)" }}>
                        © 2026 Verity Proptech Ltd. · CAC Registered · NDPR Compliant
                    </span>
                </div>
            </div>
        </footer>
    );
}