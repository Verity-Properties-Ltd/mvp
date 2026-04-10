export default function Trust() {
    const pillars = [
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
            ),
            iconBg: "rgba(13,122,95,0.15)",
            iconColor: "#0D7A5F",
            title: "AI-Powered Verification",
            body: "Advanced machine learning cross-references multiple government databases to detect inconsistencies and potential fraud.",
        },
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
            ),
            iconBg: "rgba(13,122,95,0.15)",
            iconColor: "#0D7A5F",
            title: "Analyst-Reviewed Reports",
            body: "Every report is reviewed by certified legal analysts with expertise in Nigerian property law and land documentation.",
        },
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
            ),
            iconBg: "rgba(201,168,76,0.12)",
            iconColor: "#C9A84C",
            title: "Secure & Compliant",
            body: "Bank-level encryption, Paystack payment security, and full NDPR compliance ensure your data is always protected.",
        },
    ];

    const stats = [
        { value: "50+", label: "Developers Onboarded" },
        { value: "200+", label: "Reports Generated" },
        { value: "98%", label: "On-Time Delivery" },
    ];

    return (
        <section
            aria-label="Why trust Verity"
            className="w-full relative overflow-hidden"
            style={{
                background: "#062642",
                paddingTop: "96px",
                paddingBottom: "96px",
            }}
        >
            {/* Grid overlay */}
            <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.025]"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern id="trust-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#trust-grid)" />
            </svg>

            <div className="relative z-10 max-w-[1200px] mx-auto px-6">

                {/* Header — left aligned like reference */}
                <div className="mb-14">
                    <p
                        className="text-xs font-semibold uppercase w-max mb-6 tracking-[0.15em] px-4 py-1.5 rounded-full"
                        style={{
                            background: "rgba(201,168,76,0.12)",
                            color: "#C9A84C",
                            border: "1px solid rgba(201,168,76,0.3)",
                        }}
                    >
                        Why trust Verity
                    </p>
                    <h2
                        className="font-extrabold text-white leading-[1.1]"
                        style={{
                            fontSize: "clamp(28px, 4vw, 48px)",
                            fontFamily: "var(--font-display)",
                            maxWidth: "560px",
                        }}
                    >
                        Built for trust. Designed for peace of mind
                    </h2>
                </div>

                {/* Pillar cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {pillars.map((pillar) => (
                        <div
                            key={pillar.title}
                            className="rounded-2xl p-8 flex flex-col gap-8 transition-all duration-200 hover:border-white/20"
                            style={{
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.09)",
                            }}
                        >
                            {/* Icon */}
                            <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{
                                    background: pillar.iconBg,
                                    color: pillar.iconColor,
                                    border: `1px solid ${pillar.iconColor}30`,
                                }}
                            >
                                {pillar.icon}
                            </div>

                            {/* Text */}
                            <div className="flex flex-col gap-3">
                                <h3
                                    className="font-bold text-white text-lg leading-snug"
                                >
                                    {pillar.title}
                                </h3>
                                <p
                                    className="text-sm leading-relaxed"
                                    style={{ color: "rgba(255,255,255,0.5)" }}
                                >
                                    {pillar.body}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}