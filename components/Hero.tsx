"use client";

interface HeroProps {
    onOpenModal: () => void;
}

const TRUST_ITEMS = [
    { icon: "✓", text: "500+ Documents Verified" },
    { icon: "⏱", text: "48-Hour Turnaround" },
    { icon: "🔒", text: "Paystack Secured" },
    { icon: "🛡", text: "NDPR Compliant" },
];

export default function Hero({ onOpenModal }: HeroProps) {
    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <section
            className="relative w-full overflow-hidden mt-[72px]"
            style={{ background: "#0F2340", paddingTop: "128px", paddingBottom: "96px" }}
        >
            {/* ── Subtle grid overlay ── */}
            <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hero-grid)" />
            </svg>

            {/* ── Radial glow ── */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
                style={{ background: "radial-gradient(ellipse, #2A5298 0%, transparent 70%)" }}
            />

            {/* ── Main content ── */}
            <div className="relative z-10 mx-auto max-w-[800px] px-6 text-center">

                {/* Eyebrow label */}
                <div className="mb-6 flex items-center justify-center gap-4">
                    <span className="block h-px w-10 opacity-60" style={{ background: "#C9A84C" }} />
                    <span
                        className="text-[11px] font-semibold uppercase tracking-[0.15em]"
                        style={{ color: "#C9A84C" }}
                    >
                        Nigeria&apos;s Property Verification Platform
                    </span>
                    <span className="block h-px w-10 opacity-60" style={{ background: "#C9A84C" }} />
                </div>

                {/* Headline — font-serif maps to Georgia/serif stack, no CSS var needed */}
                <h1
                    className="mb-6 font-serif font-extrabold leading-[1.2] text-white"
                    style={{ fontSize: "clamp(30px, 5vw, 48px)" }}
                >
                    Verify Any Nigerian{" "}
                    <span style={{ color: "#C9A84C" }}>Property Title</span>{" "}
                    in 48 Hours.
                </h1>

                {/* Sub-headline */}
                <p
                    className="mx-auto mb-10 max-w-[600px] leading-relaxed"
                    style={{ fontSize: "clamp(16px, 2vw, 18px)", color: "rgba(255,255,255,0.75)" }}
                >
                    Stop fraud before it stops you. Verity delivers AI-powered,
                    analyst-verified title reports for Lagos properties — trusted by
                    buyers, developers, and law firms.
                </p>

                {/* CTA group */}
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <button
                        type="button"
                        onClick={onOpenModal}
                        className="flex h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-8 text-base font-semibold text-white transition-all duration-150 hover:opacity-90 active:scale-[0.98] sm:w-auto"
                        style={{ background: "#0D7A5F" }}
                    >
                        {/* Shield-check icon */}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 12l2 2 4-4" />
                            <path d="M12 3a9 9 0 100 18A9 9 0 0012 3z" />
                        </svg>
                        Get a Verification Report
                    </button>

                    <button
                        type="button"
                        onClick={() => scrollTo("for-developers")}
                        className="flex h-[52px] w-full items-center justify-center rounded-lg px-8 text-base font-semibold text-white whitespace-nowrap transition-all duration-150 hover:bg-white/10 active:scale-[0.98] sm:w-auto"
                        style={{ border: "1.5px solid rgba(255,255,255,0.5)" }}
                    >
                        For Developers — Upload Your Portfolio
                    </button>
                </div>

                {/* Trust bar */}
                <div className="mt-10 border-t border-white/10 pt-8">
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
                        {TRUST_ITEMS.map((item) => (
                            <div
                                key={item.text}
                                className="flex items-center gap-2 text-sm"
                                style={{ color: "rgba(255,255,255,0.55)" }}
                            >
                                <span style={{ color: "#C9A84C" }}>{item.icon}</span>
                                <span>{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}