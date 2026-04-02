export default function Trust() {
    const pillars = [
        {
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                </svg>
            ),
            title: "AI-Powered Accuracy",
            body: "Our custom-trained AI extracts data from every Nigerian title document format — including aged, handwritten, and degraded records that off-the-shelf OCR cannot read.",
        },
        {
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
            ),
            title: "Analyst-Reviewed Every Report",
            body: "No report leaves Verity without human review. Every AI extraction is verified by a Verity-certified analyst before delivery. You get a report you can share with a lawyer or a bank.",
        },
        {
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
            ),
            title: "NDPR-Compliant & Encrypted",
            body: "Your documents are stored in AWS Lagos (af-south-1), encrypted at rest with AES-256, and never shared beyond the verification process. We comply fully with Nigeria's Data Protection Regulation.",
        },
    ];

    const stats = [
        { value: "50+", label: "Developers Onboarded" },
        { value: "200+", label: "Reports Generated" },
        { value: "98%", label: "On-Time Delivery" },
    ];

    return (
        <section
            aria-label="Why Verity"
            className="w-full bg-white"
            style={{ paddingTop: "80px", paddingBottom: "80px" }}
        >
            <div className="max-w-[1100px] mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-14">
                    <span
                        className="text-[11px] font-semibold tracking-[0.15em] uppercase"
                        style={{ color: "#0D7A5F" }}
                    >
                        Why Verity
                    </span>
                    <div className="h-[2px] w-6 rounded-full mx-auto mt-3" style={{ background: "#C9A84C" }} />
                    <h2
                        className="mt-4 font-bold text-[32px] font-serif"
                        style={{ color: "#1B3F6B" }}
                    >
                        Built for the realities of Nigerian property.
                    </h2>
                </div>

                {/* Trust Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {pillars.map((pillar) => (
                        <div key={pillar.title} className="text-center flex flex-col items-center gap-4">
                            <div
                                className="w-[72px] h-[72px] rounded-full flex items-center justify-center flex-shrink-0"
                                style={{ background: "#E6F4F0", color: "#0D7A5F" }}
                            >
                                {pillar.icon}
                            </div>
                            <h3
                                className="font-semibold text-lg font-serif"
                                style={{ color: "#1B3F6B" }}
                            >
                                {pillar.title}
                            </h3>
                            <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>
                                {pillar.body}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="h-px w-full mb-16" style={{ background: "#F3F4F6" }} />

                {/* Stats row */}
                <div
                    className="rounded-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-3"
                    style={{ background: "#0F2340" }}
                >
                    {stats.map((stat, i) => (
                        <div
                            key={stat.label}
                            className="relative flex flex-col items-center justify-center text-center px-10 py-12"
                            style={{
                                borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.08)" : undefined,
                                borderBottom: "none",
                            }}
                        >
                            {/* Gold accent line above value */}
                            <div
                                className="w-8 h-[3px] rounded-full mb-5"
                                style={{ background: "#C9A84C" }}
                            />

                            {/* Stat value */}
                            <div
                                className="font-bold font-serif leading-none mb-3"
                                style={{ fontSize: "52px", color: "#C9A84C" }}
                            >
                                {stat.value}
                            </div>

                            {/* Label */}
                            <p
                                className="text-sm font-medium tracking-wide uppercase"
                                style={{ color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em" }}
                            >
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}