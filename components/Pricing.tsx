"use client";

interface PricingProps {
    onOpenModal: (tier?: string) => void;
}

const tiers = [
    {
        id: "basic",
        label: "BASIC",
        price: "₦15,000",
        turnaround: "72 hours turnaround",
        features: [
            "Full title document review",
            "Lagos Land Registry check",
            "PDF verification report",
            "Email delivery",
        ],
        cta: "Get Started",
        ctaAction: "modal",
        featured: false,
    },
    {
        id: "standard",
        label: "STANDARD",
        price: "₦35,000",
        turnaround: "48 hours turnaround",
        features: [
            "Everything in Basic",
            "Priority analyst review",
            "Encumbrance deep-check",
            "Ownership history trace",
            "Share with bank/lawyer",
        ],
        cta: "Get Started",
        ctaAction: "modal",
        featured: true,
    },
    {
        id: "premium",
        label: "PREMIUM",
        price: "₦75,000",
        turnaround: "24 hours turnaround",
        features: [
            "Everything in Standard",
            "Rush analyst assignment",
            "Field agent verification",
            "Dedicated support line",
            "WhatsApp notification",
            "Legal recommendation note",
        ],
        cta: "Get Started",
        ctaAction: "modal",
        featured: false,
    },
];

export default function Pricing({ onOpenModal }: PricingProps) {
    const handleCta = (tier: typeof tiers[0]) => {
        if (tier.ctaAction === "modal") onOpenModal(tier.id);
        else if (tier.ctaAction === "contact") {
            window.location.href = "mailto:hello@verity.properties";
        }
    };

    return (
        <section
            id="pricing"
            aria-label="Pricing"
            className="w-full relative overflow-hidden bg-navy"
            style={{
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
                    <pattern id="pricing-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#pricing-grid)" />
            </svg>

            <div className="relative z-10 max-w-[1200px] mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <p
                        className="text-xs font-semibold uppercase w-max mb-6 tracking-[0.15em] px-4 py-1.5 rounded-full mx-auto text-gold bg-gold/12 border border-gold/30"
                    >
                        Pricing
                    </p>
                    <h2
                        className="font-extrabold text-white mb-4"
                        style={{
                            fontSize: "clamp(28px, 4vw, 48px)",
                            fontFamily: "var(--font-display)",
                            lineHeight: 1.1,
                        }}
                    >
                        Simple, honest pricing
                    </h2>
                    <p
                        className="mx-auto text-white/50"
                        style={{
                            fontSize: "clamp(14px, 1.5vw, 16px)",
                            maxWidth: "420px",
                            lineHeight: 1.6,
                        }}
                    >
                        No hidden fees. No subscriptions. Pay only for the report you need.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch pt-6">
                    {tiers.map((tier) => (
                        <div
                            key={tier.id}
                            className={`relative rounded-2xl flex flex-col transition-all duration-200 border ${tier.featured ? "bg-white/9 border-white/18" : "bg-white/4 border-white/9"
                                }`}
                        >
                            {/* Most Popular badge */}
                            {tier.featured && (
                                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                                    <span className="text-[11px] font-bold uppercase tracking-widest px-5 py-1.5 rounded-full flex items-center gap-1.5 bg-gold text-navy">
                                        ✦ Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="p-8 flex flex-col flex-1">
                                {/* Label */}
                                <p className="text-xs font-semibold uppercase tracking-[0.15em] mb-3 text-white/45">
                                    {tier.label}
                                </p>

                                {/* Price */}
                                <p
                                    className="font-extrabold text-white mb-3 leading-none"
                                    style={{
                                        fontSize: "clamp(36px, 4vw, 52px)",
                                        fontFamily: "var(--font-display)",
                                    }}
                                >
                                    {tier.price}
                                </p>

                                {/* Turnaround badge */}
                                <div className="mb-6">
                                    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full text-teal-light bg-teal/15 border border-teal/25">
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                        {tier.turnaround}
                                    </span>
                                </div>

                                {/* Divider */}
                                <div className="mb-6 h-px bg-white/8" />

                                {/* Features */}
                                <ul className="flex flex-col gap-3 flex-1 mb-8">
                                    {tier.features.map((f) => (
                                        <li key={f} className="flex items-center gap-3 text-sm">
                                            <svg
                                                width="16" height="16" viewBox="0 0 24 24"
                                                fill="none" className="flex-shrink-0"
                                            >
                                                <circle cx="12" cy="12" r="10" stroke="var(--teal)" strokeWidth="1.5" />
                                                <path d="M8 12l3 3 5-5" stroke="var(--teal)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span className="text-white/65">{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <button
                                    type="button"
                                    onClick={() => handleCta(tier)}
                                    className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-150 active:scale-[0.98] hover:opacity-90 ${tier.featured
                                            ? "bg-gold text-navy"
                                            : "bg-transparent text-white border border-white/25"
                                        }`}
                                >
                                    {tier.cta}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footnote */}
                <p className="text-center text-xs mt-10 text-white/30">
                    All prices in Nigerian Naira (₦). Payments via Paystack (NGN) or Flutterwave (GBP/USD/EUR for diaspora). Prices shown exclude VAT where applicable.
                </p>

            </div>
        </section>
    );
}