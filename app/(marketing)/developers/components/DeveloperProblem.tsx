export default function DeveloperProblem() {
    const problems = [
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
            ),
            title: "Scattered Documents",
            body: "Property files spread across email threads, WhatsApp chats, USB drives, and filing cabinets. Critical documents are always one missed message away from being lost.",
            consequence: "Delays close of sale by weeks",
        },
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                </svg>
            ),
            title: "No Single Source of Truth",
            body: "When your team, your lawyer, and your bank all have different versions of the same document, you spend more time reconciling records than actually developing.",
            consequence: "Banks reject applications",
        },
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
            ),
            title: "Fraud & Title Risk",
            body: "Double sales, forged C of O, hidden government acquisition. Without proper verification, you could purchase land that's already been sold or claimed by the state.",
            consequence: "Millions lost to bad title",
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
                        className="text-xs font-semibold uppercase tracking-[0.15em] px-4 py-1.5 rounded-full"
                        style={{
                            background: "rgba(201,168,76,0.12)",
                            color: "#C9A84C",
                            border: "1px solid rgba(201,168,76,0.3)",
                        }}
                    >
                        The Problem
                    </span>
                </div>

                {/* Centered headline */}
                <div className="text-center mb-6">
                    <h2
                        className="font-extrabold leading-[1.1] text-white"
                        style={{
                            fontSize: "clamp(28px, 4vw, 48px)",
                            fontFamily: "var(--font-display)",
                        }}
                    >
                        The Problem Developers Face Everyday
                    </h2>
                </div>

                {/* Centered subtext */}
                <p
                    className="text-center mx-auto mb-16 leading-relaxed"
                    style={{
                        fontSize: "clamp(14px, 1.5vw, 16px)",
                        color: "rgba(255,255,255,0.6)",
                        maxWidth: "600px",
                    }}
                >
                    It looks legitimate. Stamped documents. Smooth-talking agents.
                    Clean paperwork. But behind it? Duplicate ownership. Forged titles.
                    Government acquisition. And by the time you find out, your money is
                    already gone.
                </p>

                {/* Problem cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {problems.map((p) => (
                        <div
                            key={p.title}
                            className="rounded-2xl flex flex-col transition-all duration-200 hover:border-white/20"
                            style={{
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.08)",
                            }}
                        >
                            {/* Card body */}
                            <div className="p-8 flex flex-col gap-5 flex-1">
                                {/* Icon badge */}
                                <div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                                    style={{
                                        background: "rgba(255,255,255,0.07)",
                                        color: "#C9A84C",
                                    }}
                                >
                                    {p.icon}
                                </div>

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

                            {/* Consequence footer */}
                            <div
                                className="px-8 py-5"
                                style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                            >
                                <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#E05252" }}>
                                    <span
                                        className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                                        style={{ background: "#E05252" }}
                                    />
                                    {p.consequence}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}