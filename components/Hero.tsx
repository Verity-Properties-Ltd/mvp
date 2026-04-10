"use client";

interface HeroProps {
    onOpenModal: () => void;
}

const STATS = [
    { value: "₦0", label: "Cost to developers" },
    { value: "72 hrs", label: "Full Verification" },
    { value: "4 layers", label: "AI · Record · Registry · Field" },
    { value: "3 tiers", label: "From ₦15,000" },
];

export default function Hero({ onOpenModal }: HeroProps) {
    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <section
            className="relative w-full overflow-hidden"
            style={{ background: "#062642", minHeight: "calc(100vh - 72px)" }}
        >
            {/* ── Background property image with overlay ── */}
            <div className="absolute inset-0">
                {/* Placeholder gradient that mimics a dark property photo */}
                {/* Replace this div with <Image> once you have the actual photo */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(160deg, #0a3a5c 0%, #062642 40%, #041830 100%)",
                    }}
                />

                {/* Dark overlay so text is always readable over a real photo */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(to bottom, rgba(6,38,66,0.72) 0%, rgba(6,38,66,0.55) 40%, rgba(6,38,66,0.85) 80%, rgba(6,38,66,0.97) 100%)",
                    }}
                />
            </div>

            {/* ── Subtle grid overlay ── */}
            <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.035]"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hero-grid)" />
            </svg>

            {/* ── Main content ── */}
            <div
                className="relative z-10 mx-auto flex flex-col items-center justify-center text-center px-6"
                style={{
                    maxWidth: "900px",
                    paddingTop: "clamp(64px, 12vw, 140px)",
                    paddingBottom: "clamp(120px, 16vw, 200px)",
                }}
            >
                {/* Eyebrow */}
                <div className="mb-8 flex items-center justify-center gap-4">
                    <span
                        className="block opacity-50"
                        style={{ height: "1px", width: "clamp(40px, 8vw, 100px)", background: "#C9A84C" }}
                    />
                    <span
                        className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                        style={{ color: "#C9A84C" }}
                    >
                        Properties Verification Platform
                    </span>
                    <span
                        className="block opacity-50"
                        style={{ height: "1px", width: "clamp(40px, 8vw, 100px)", background: "#C9A84C" }}
                    />
                </div>

                {/* Headline — large, bold, impactful */}
                <h1
                    className="text-white font-extrabold leading-[1.05] mb-6"
                    style={{
                        fontSize: "clamp(42px, 8vw, 88px)",
                        fontFamily: "var(--font-display)",
                        letterSpacing: "-0.01em",
                    }}
                >
                    Verify Any Property{" "}
                    <br className="hidden sm:block" />
                    Before You Buy
                </h1>

                {/* Sub-headline */}
                <p
                    className="mx-auto mb-10 leading-relaxed"
                    style={{
                        fontSize: "clamp(15px, 2vw, 18px)",
                        color: "rgba(255,255,255,0.65)",
                        maxWidth: "620px",
                    }}
                >
                    Independent property verification for Nigerians abroad. AI document
                    analysis, public records, and a field agent on the ground in
                    Lagos — before you transfer a single naira.
                </p>

                {/* CTAs */}
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <button
                        type="button"
                        onClick={onOpenModal}
                        className="flex h-[52px] w-full items-center justify-center gap-2 rounded-full px-8 text-base font-semibold transition-all duration-150 hover:opacity-90 active:scale-[0.98] sm:w-auto"
                        style={{ background: "#C9A84C", color: "#062642" }}
                    >
                        Join the waitlist
                    </button>

                    <button
                        type="button"
                        onClick={() => scrollTo("for-developers")}
                        className="flex h-[52px] w-full items-center justify-center rounded-full px-8 text-base font-semibold text-white whitespace-nowrap transition-all duration-150 hover:bg-white/10 active:scale-[0.98] sm:w-auto"
                        style={{ border: "1.5px solid rgba(255,255,255,0.4)" }}
                    >
                        Request a Demo
                    </button>
                </div>
            </div>

            {/* ── Stats bar — pinned to bottom of section ── */}
            <div className="absolute bottom-0 left-0 right-0 z-10">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div
                        className="grid grid-cols-2 lg:grid-cols-4 overflow-hidden"
                        style={{
                            background: "rgba(255,255,255,0.06)",
                            backdropFilter: "blur(12px)",
                            borderTop: "1px solid rgba(255,255,255,0.1)",
                            borderLeft: "1px solid rgba(255,255,255,0.1)",
                            borderRight: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "16px 16px 0 0",
                        }}
                    >
                        {STATS.map((stat, i) => (
                            <div
                                key={stat.label}
                                className="flex flex-col items-center justify-center text-center px-6 py-6"
                                style={{
                                    borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.08)" : undefined,
                                }}
                            >
                                <span
                                    className="font-extrabold leading-none mb-1"
                                    style={{
                                        fontSize: "clamp(20px, 3vw, 28px)",
                                        color: "#C9A84C",
                                        fontFamily: "var(--font-display)",
                                    }}
                                >
                                    {stat.value}
                                </span>
                                <span
                                    className="text-xs font-medium"
                                    style={{ color: "rgba(255,255,255,0.5)" }}
                                >
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}