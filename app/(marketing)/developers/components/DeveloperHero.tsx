"use client";

interface DeveloperHeroProps {
    onOpenModal: () => void;
}

const STATS = [
    { value: "₦0", label: "Cost to developers" },
    { value: "48 hrs", label: "Batch verification" },
    { value: "100+", label: "Properties per upload" },
    { value: "CSV", label: "Bulk upload supported" },
];

const PROPERTIES = [
    { name: "Lekki Phase 1 – Plot 14A", date: "Mar 12, 2025", type: "Residential Land", status: "Verified" },
    { name: "Victoria Island Office Complex", date: "Mar 28, 2025", type: "Commercial", status: "Pending" },
    { name: "Ajah Estate Block C", date: "Apr 01, 2025", type: "Residential", status: "Flagged" },
    { name: "Ikoyi Waterfront Plot", date: "Apr 09, 2025", type: "Land", status: "Verified" },
];

const STATUS_STYLES: Record<string, { dot: string; text: string; bg: string }> = {
    Verified: { dot: "#4ade80", text: "#4ade80", bg: "rgba(74,222,128,0.12)" },
    Pending: { dot: "#fbbf24", text: "#fbbf24", bg: "rgba(251,191,36,0.12)" },
    Flagged: { dot: "#f87171", text: "#f87171", bg: "rgba(248,113,113,0.12)" },
};

export default function DeveloperHero({ onOpenModal }: DeveloperHeroProps) {
    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <section
            className="relative w-full overflow-hidden"
            style={{ background: "#062642", minHeight: "calc(100vh - 72px)" }}
        >
            {/* ── Background gradient ── */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(160deg, #0a3a5c 0%, #062642 40%, #041830 100%)",
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(6,38,66,0.72) 0%, rgba(6,38,66,0.55) 40%, rgba(6,38,66,0.85) 80%, rgba(6,38,66,0.97) 100%)",
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
                    <pattern id="dev-hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dev-hero-grid)" />
            </svg>

            {/* ── Hero text block — centred, same as original Hero ── */}
            <div
                className="relative z-10 mx-auto flex flex-col items-center text-center px-6"
                style={{
                    maxWidth: "900px",
                    paddingTop: "clamp(64px, 12vw, 140px)",
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
                        Trusted by Lagos developers
                    </span>
                    <span
                        className="block opacity-50"
                        style={{ height: "1px", width: "clamp(40px, 8vw, 100px)", background: "#C9A84C" }}
                    />
                </div>

                {/* Headline */}
                <h1
                    className="text-white font-extrabold leading-[1.05] mb-6"
                    style={{
                        fontSize: "clamp(22px, 8vw, 58px)",
                        fontFamily: "var(--font-display)",
                        letterSpacing: "-0.01em",
                    }}
                >
                    One Dashboard. All Your
                    <br className="hidden sm:block" />
                    Properties All Verified
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
                    Stop wasting hours managing property documents across email and
                    WhatsApp. Verity gives real estate developers one place to manage,
                    verify, and portfolio-track all their properties — with bank-ready
                    certificates in 48 hours.
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

            {/* ── Dashboard mockup — below hero text, full width, partially cut off ── */}
            <div
                className="relative z-10 mx-auto px-6 mt-16"
                style={{ maxWidth: "1200px", paddingBottom: "clamp(140px, 18vw, 200px)" }}
            >
                <div
                    className="w-full overflow-hidden"
                    style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "16px 16px 0 0",
                        boxShadow: "0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,168,76,0.06)",
                    }}
                >
                    {/* Window chrome */}
                    <div
                        className="flex items-center justify-between px-5 py-3"
                        style={{
                            background: "rgba(6,38,66,0.8)",
                            borderBottom: "1px solid rgba(255,255,255,0.07)",
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex gap-[6px]">
                                <span className="block w-[10px] h-[10px] rounded-full" style={{ background: "#ff5f57" }} />
                                <span className="block w-[10px] h-[10px] rounded-full" style={{ background: "#ffbd2e" }} />
                                <span className="block w-[10px] h-[10px] rounded-full" style={{ background: "#28c840" }} />
                            </div>
                            <span
                                className="text-[11px] font-medium"
                                style={{ color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}
                            >
                                Verity Dashboard
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                                April 2025
                            </span>
                            <span
                                className="flex items-center gap-1.5 text-[11px] font-semibold px-2 py-1 rounded-full"
                                style={{
                                    background: "rgba(13,122,95,0.2)",
                                    color: "#4ade80",
                                    border: "1px solid rgba(74,222,128,0.2)",
                                }}
                            >
                                <span
                                    className="block w-[6px] h-[6px] rounded-full"
                                    style={{ background: "#4ade80", animation: "pulse-dot 2s ease-in-out infinite" }}
                                />
                                Live
                            </span>
                        </div>
                    </div>

                    {/* Stats row */}
                    <div
                        className="grid grid-cols-3"
                        style={{
                            borderBottom: "1px solid rgba(255,255,255,0.07)",
                            background: "rgba(6,38,66,0.5)",
                        }}
                    >
                        {[
                            { num: "24", label: "Total Properties", color: "#fff" },
                            { num: "18", label: "Verified", color: "#4ade80" },
                            { num: "6", label: "Pending", color: "#fbbf24" },
                        ].map((s, i) => (
                            <div
                                key={s.label}
                                className="flex flex-col px-6 py-5 text-left"
                                style={{
                                    borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : undefined,
                                }}
                            >
                                <span
                                    className="font-extrabold leading-none mb-1"
                                    style={{
                                        fontSize: "clamp(22px, 3vw, 32px)",
                                        color: s.color,
                                        fontFamily: "var(--font-display)",
                                    }}
                                >
                                    {s.num}
                                </span>
                                <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                                    {s.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Table header */}
                    <div
                        className="grid px-6 py-3"
                        style={{
                            gridTemplateColumns: "1fr 200px 130px",
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                        }}
                    >
                        {["Property", "Type", "Status"].map((col) => (
                            <span
                                key={col}
                                className="text-[10px] font-semibold uppercase tracking-widest text-left"
                                style={{ color: "rgba(255,255,255,0.3)" }}
                            >
                                {col}
                            </span>
                        ))}
                    </div>

                    {/* Table rows */}
                    {PROPERTIES.map((p, i) => {
                        const s = STATUS_STYLES[p.status];
                        const isLast = i === PROPERTIES.length - 1;
                        return (
                            <div
                                key={p.name}
                                className="grid px-6 py-[16px] items-center"
                                style={{
                                    gridTemplateColumns: "1fr 200px 130px",
                                    borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.05)",
                                    opacity: isLast ? 0.35 : 1,
                                }}
                            >
                                <div className="text-left">
                                    <div
                                        className="font-medium text-[14px]"
                                        style={{ color: "rgba(255,255,255,0.88)" }}
                                    >
                                        {p.name}
                                    </div>
                                    <div
                                        className="text-[11px] mt-[3px]"
                                        style={{ color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}
                                    >
                                        {p.date}
                                    </div>
                                </div>
                                <span
                                    className="text-[13px] text-left"
                                    style={{ color: "rgba(255,255,255,0.45)" }}
                                >
                                    {p.type}
                                </span>
                                <div className="flex justify-start">
                                    <span
                                        className="inline-flex items-center gap-[6px] text-[11px] font-semibold px-3 py-[4px] rounded-full"
                                        style={{
                                            background: s.bg,
                                            color: s.text,
                                            border: `1px solid ${s.dot}30`,
                                        }}
                                    >
                                        <span
                                            className="block w-[5px] h-[5px] rounded-full flex-shrink-0"
                                            style={{ background: s.dot }}
                                        />
                                        {p.status}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <style>{`
                @keyframes pulse-dot {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50%       { opacity: 0.4; transform: scale(0.8); }
                }
            `}</style>
        </section>
    );
}