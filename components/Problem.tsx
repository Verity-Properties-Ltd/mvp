export default function Problem() {
    const problems = [
        {
            number: "01",
            title: "Double Sale",
            body: "The same property sold to multiple buyers using identical documents. You only find out when construction begins.",
        },
        {
            number: "02",
            title: "Forged Title Documents",
            body: "Certificates that pass visual checks — but fail at the registry level.",
        },
        {
            number: "03",
            title: "Hidden Government Acquisition",
            body: "Land already claimed by the government, quietly resold with no visible warning.",
        },
    ];

    return (
        <section
            aria-label="The Problem"
            className="w-full relative overflow-hidden"
            style={{
                background: "#062642",
                paddingTop: "96px",
                paddingBottom: "96px",
            }}
        >
            {/* Subtle grid overlay */}
            <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.025]"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern id="problem-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#problem-grid)" />
            </svg>

            <div className="relative z-10 max-w-[1200px] mx-auto px-6">
                {/* Badge */}
                <div className="flex items-center justify-center mb-6">
                    <span
                        className="text-xs mx-auto font-semibold uppercase tracking-[0.15em] px-4 py-1.5 rounded-full"
                        style={{
                            background: "rgba(201,168,76,0.12)",
                            color: "#C9A84C",
                            border: "1px solid rgba(201,168,76,0.3)",
                        }}
                    >
                        The Problem
                    </span>
                </div>

                {/* Two-column header */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 items-end">

                    {/* Left — badge + headline */}
                    <div>

                        <h2
                            className="font-extrabold leading-[1.1] text-white"
                            style={{
                                fontSize: "clamp(28px, 4vw, 48px)",
                                fontFamily: "var(--font-display)",
                            }}
                        >
                            Most property fraud in Lagos doesn&apos;t always look like fraud
                        </h2>
                    </div>

                    {/* Right — descriptive copy, aligned to bottom of headline */}
                    <p
                        className="leading-relaxed lg:text-right"
                        style={{
                            fontSize: "clamp(14px, 1.5vw, 16px)",
                            color: "rgba(255,255,255,0.6)",
                        }}
                    >
                        It looks legitimate. Stamped documents. Smooth-talking agents.
                        Clean paperwork. But behind it? Duplicate ownership. Forged titles.
                        Government acquisition. And by the time you find out, your money is
                        already gone.
                    </p>
                </div>

                {/* Problem cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {problems.map((p) => (
                        <div
                            key={p.number}
                            className="rounded-2xl p-8 flex flex-col gap-6 transition-all duration-200 hover:border-white/20"
                            style={{
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.1)",
                            }}
                        >
                            <span
                                className="font-extrabold leading-none"
                                style={{
                                    fontSize: "48px",
                                    color: "#C9A84C",
                                    fontFamily: "var(--font-display)",
                                    lineHeight: 1,
                                }}
                            >
                                {p.number}
                            </span>

                            <div className="flex flex-col gap-3">
                                <h3
                                    className="font-bold text-white text-lg leading-snug"
                                    style={{ fontFamily: "var(--font-heading, var(--font-display))" }}
                                >
                                    {p.title}
                                </h3>
                                <p
                                    className="text-sm leading-relaxed"
                                    style={{ color: "rgba(255,255,255,0.55)" }}
                                >
                                    {p.body}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}