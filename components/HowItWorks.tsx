export default function HowItWorks() {
    const steps = [
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M9 13l2 2 4-4" />
                </svg>
            ),
            title: "Submit Property Details",
            body: "Provide the property address and title documents. Our secure platform accepts all major document formats.",
            active: false,
        },
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                </svg>
            ),
            title: "AI + Analyst Verification",
            body: "Our AI scans government databases while certified analysts review title authenticity and ownership history.",
            active: true,
        },
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
            ),
            title: "Receive Detailed Report",
            body: "Get a comprehensive report with verification status, ownership details, and legal recommendations within 48 hours.",
            active: false,
        },
    ];

    return (
        <section
            id="how-it-works"
            aria-label="How Verity works"
            className="w-full relative overflow-hidden"
            style={{
                background: "#062642",
                scrollMarginTop: "80px",
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
                    <pattern id="hiw-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hiw-grid)" />
            </svg>

            <div className="relative z-10 max-w-[1200px] mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <p
                        className="text-xs font-semibold uppercase w-max mb-6 tracking-[0.15em] px-4 py-1.5 rounded-full mx-auto"
                        style={{
                            background: "rgba(201,168,76,0.12)",
                            color: "#C9A84C",
                            border: "1px solid rgba(201,168,76,0.3)",
                        }}
                    >
                        How it works
                    </p>
                    <h2
                        className="font-extrabold text-white mb-4"
                        style={{
                            fontSize: "clamp(28px, 4vw, 48px)",
                            fontFamily: "var(--font-display)",
                            lineHeight: 1.1,
                        }}
                    >
                        Verify any property in three steps
                    </h2>
                    <p
                        className="mx-auto"
                        style={{
                            fontSize: "clamp(14px, 1.5vw, 16px)",
                            color: "rgba(255,255,255,0.5)",
                            maxWidth: "480px",
                            lineHeight: 1.6,
                        }}
                    >
                        A streamlined process that&apos;s simple, fast, and backed by real expertise.
                    </p>
                </div>

                {/* Step cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {steps.map((step) => (
                        <div
                            key={step.title}
                            className="relative rounded-2xl p-8 flex flex-col gap-6 overflow-hidden transition-all duration-200"
                            style={{
                                background: step.active
                                    ? "rgba(255,255,255,0.08)"
                                    : "rgba(255,255,255,0.04)",
                                border: step.active
                                    ? "1px solid rgba(255,255,255,0.15)"
                                    : "1px solid rgba(255,255,255,0.08)",
                            }}
                        >
                            {/* Teal top accent bar — active card only */}
                            {step.active && (
                                <div
                                    className="absolute top-0 left-8 right-8 h-[2px] rounded-full"
                                    style={{ background: "linear-gradient(90deg, #0D7A5F, #14B88A)" }}
                                />
                            )}

                            {/* Icon */}
                            <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{
                                    background: "rgba(201,168,76,0.12)",
                                    color: "#C9A84C",
                                    border: "1px solid rgba(201,168,76,0.2)",
                                }}
                            >
                                {step.icon}
                            </div>

                            {/* Text */}
                            <div className="flex flex-col gap-3">
                                <h3
                                    className="font-bold text-white text-lg leading-snug"
                                >
                                    {step.title}
                                </h3>
                                <p
                                    className="text-sm leading-relaxed"
                                    style={{ color: "rgba(255,255,255,0.55)" }}
                                >
                                    {step.body}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}