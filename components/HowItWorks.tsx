export default function HowItWorks() {
    const steps = [
        {
            number: "01",
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                </svg>
            ),
            title: "Submit",
            body: "Enter the property address and choose your verification tier. Pay securely via Paystack — no account required.",
        },
        {
            number: "02",
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                    <path d="M11 8v6M8 11h6" />
                </svg>
            ),
            title: "Verify",
            body: "Our AI pipeline and Verity-certified analyst team cross-check the title documents against Lagos Land Registry records.",
        },
        {
            number: "03",
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
            ),
            title: "Receive",
            body: "Your detailed verification report arrives within 48 hours. Download it, share it with your lawyer, and transact with confidence.",
        },
    ];

    return (
        <section
            id="how-it-works"
            aria-label="How Verity works"
            className="w-full bg-white"
            style={{ scrollMarginTop: "80px", paddingTop: "80px", paddingBottom: "80px" }}
        >
            <div className="max-w-[1100px] mx-auto px-6">
                {/* Section label */}
                <div className="text-center mb-12">
                    <div className="flex flex-col items-center gap-3">
                        <span
                            className="text-[11px] font-semibold tracking-[0.15em] uppercase"
                            style={{ color: "#0D7A5F" }}
                        >
                            How It Works
                        </span>
                        <div className="h-[2px] w-6 rounded-full" style={{ background: "#C9A84C" }} />
                    </div>
                    <h2
                        className="mt-4 font-bold text-[32px] leading-tight font-serif"
                        style={{ color: "#1B3F6B" }}
                    >
                        Verify any Nigerian property in three steps.
                    </h2>
                </div>

                {/* Steps */}
                <div className="flex flex-col md:flex-row gap-6 items-stretch relative">
                    {steps.map((step, i) => (
                        <div key={step.number} className="flex flex-row md:flex-col items-start md:items-stretch flex-1 gap-4 md:gap-0 relative">
                            {/* Connector arrow — desktop only */}
                            {i < steps.length - 1 && (
                                <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-[calc(50%+12px)] z-10 items-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12h14M13 6l6 6-6 6" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            )}

                            {/* Card */}
                            <div
                                className="flex-1 bg-white rounded-xl p-8 flex flex-col gap-5 transition-all duration-200 hover:shadow-lg group border border-gray-100"
                                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                            >
                                {/* Step number */}
                                <span
                                    className="font-bold font-serif leading-none transition-colors duration-200"
                                    style={{
                                        fontSize: "48px",
                                        color: "#C9A84C",
                                        lineHeight: 1,
                                    }}
                                >
                                    {step.number}
                                </span>

                                {/* Icon */}
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                                    style={{ background: "#E6F4F0", color: "#0D7A5F" }}
                                >
                                    {step.icon}
                                </div>

                                {/* Text */}
                                <div>
                                    <h3
                                        className="font-semibold text-xl mb-2 font-serif"
                                        style={{ color: "#1B3F6B" }}
                                    >
                                        {step.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>
                                        {step.body}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}