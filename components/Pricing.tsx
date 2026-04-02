"use client";

interface PricingProps {
    onOpenModal: (tier?: string) => void;
}

const tiers = [
    {
        id: "standard",
        name: "Standard",
        turnaround: "72 hours",
        price: "₦10,000",
        priceSub: "/ report",
        tagline: "Individual buyers & first-time investors",
        features: ["Full title document review", "Lagos Land Registry check", "PDF verification report", "Email delivery"],
        cta: "Get Started",
        ctaAction: "modal",
        featured: false,
        turnaroundColor: "#6B7280",
    },
    {
        id: "professional",
        name: "Professional",
        turnaround: "24 hours",
        price: "₦25,000",
        priceSub: "/ report",
        tagline: "Lawyers, agents & due diligence",
        features: ["Everything in Standard", "Priority analyst review", "Encumbrance deep-check", "Share with bank/lawyer"],
        cta: "Get Started",
        ctaAction: "modal",
        featured: true,
        turnaroundColor: "#0D7A5F",
    },
    {
        id: "express",
        name: "Express",
        turnaround: "6–12 hours",
        price: "₦50,000",
        priceSub: "/ report",
        tagline: "Urgent transactions & bank queries",
        features: ["Everything in Professional", "Rush analyst assignment", "Dedicated support line", "WhatsApp notification"],
        cta: "Get Started",
        ctaAction: "modal",
        featured: false,
        turnaroundColor: "#D97706",
    },
    {
        id: "volume",
        name: "Volume",
        turnaround: "As ordered",
        price: "₦150,000",
        priceSub: "/ month (10 credits)",
        tagline: "Law firms & high-frequency users",
        features: ["10 report credits/month", "Credit rollover (1 month)", "Dedicated account manager", "Priority processing"],
        cta: "Contact Us",
        ctaAction: "contact",
        featured: false,
        turnaroundColor: "#6B7280",
    },
    {
        id: "developer",
        name: "Developer Dashboard",
        turnaround: "SaaS — monthly",
        price: "₦200,000",
        priceSub: "/ month",
        tagline: "Real estate developers — portfolio + SaaS",
        features: ["Unlimited uploads", "Bulk CSV processing", "Verified badge on listings", "API access"],
        cta: "Request Demo",
        ctaAction: "scroll",
        featured: false,
        turnaroundColor: "#6B7280",
    },
];

export default function Pricing({ onOpenModal }: PricingProps) {
    const handleCta = (tier: typeof tiers[0]) => {
        if (tier.ctaAction === "modal") {
            onOpenModal(tier.id);
        } else if (tier.ctaAction === "contact") {
            window.location.href = "mailto:hello@verity.properties";
        } else if (tier.ctaAction === "scroll") {
            document.getElementById("for-developers")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section
            id="pricing"
            aria-label="Pricing"
            className="w-full"
            style={{
                background: "#F9FAFB",
                scrollMarginTop: "80px",
                paddingTop: "80px",
                paddingBottom: "80px",
            }}
        >
            <div className="max-w-[1200px] mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-14">
                    <span
                        className="text-[11px] font-semibold tracking-[0.15em] uppercase"
                        style={{ color: "#0D7A5F" }}
                    >
                        Pricing
                    </span>
                    <div className="h-[2px] w-6 rounded-full mx-auto mt-3" style={{ background: "#C9A84C" }} />
                    <h2
                        className="mt-4 font-bold text-[32px] font-serif"
                        style={{ color: "#1B3F6B" }}
                    >
                        Transparent pricing. No hidden fees.
                    </h2>
                </div>

                {/* Cards — horizontal scroll on mobile */}
                <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory md:overflow-visible md:pb-0 md:grid md:grid-cols-3 lg:grid-cols-5">
                    {tiers.map((tier) => (
                        <div
                            key={tier.id}
                            className={`
                                snap-start flex-shrink-0 w-[80vw] sm:w-[300px] md:w-auto
                                rounded-2xl p-8 flex flex-col gap-5 relative
                                transition-all duration-200 group
                                ${tier.featured
                                    ? "border-0 shadow-xl"
                                    : "border border-gray-200 bg-white hover:shadow-lg hover:border-[#C9A84C] cursor-pointer"
                                }
                            `}
                            style={
                                tier.featured
                                    ? { background: "#0F2340", marginTop: "-8px", marginBottom: "-8px" }
                                    : {}
                            }
                        >
                            {/* Most Popular badge */}
                            {tier.featured && (
                                <div
                                    className="absolute -top-3 right-6 px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider"
                                    style={{ background: "#C9A84C", color: "#1F2937" }}
                                >
                                    Most Popular
                                </div>
                            )}

                            {/* Gold top border on hover for non-featured */}
                            {!tier.featured && (
                                <div
                                    className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                    style={{ background: "#C9A84C" }}
                                />
                            )}

                            {/* Tier name */}
                            <div>
                                <h3
                                    className="font-semibold text-lg mb-1 font-serif"
                                    style={{ color: tier.featured ? "white" : "#1B3F6B" }}
                                >
                                    {tier.name}
                                </h3>
                                <span
                                    className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full"
                                    style={{
                                        background: tier.featured ? "rgba(255,255,255,0.15)" : "#F3F4F6",
                                        color: tier.featured ? "rgba(255,255,255,0.8)" : tier.turnaroundColor,
                                    }}
                                >
                                    {tier.turnaround}
                                </span>
                            </div>

                            {/* Price */}
                            <div>
                                <span
                                    className="font-bold font-serif"
                                    style={{
                                        fontSize: "32px",
                                        color: tier.featured ? "#C9A84C" : "#1B3F6B",
                                        lineHeight: 1,
                                    }}
                                >
                                    {tier.price}
                                </span>
                                <span
                                    className="text-sm ml-1"
                                    style={{ color: tier.featured ? "rgba(255,255,255,0.5)" : "#6B7280" }}
                                >
                                    {tier.priceSub}
                                </span>
                                <p
                                    className="text-xs mt-1"
                                    style={{ color: tier.featured ? "rgba(255,255,255,0.5)" : "#6B7280" }}
                                >
                                    {tier.tagline}
                                </p>
                            </div>

                            {/* Features */}
                            <ul className="flex flex-col gap-2 flex-1">
                                {tier.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2 text-sm">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            className="flex-shrink-0 mt-0.5"
                                        >
                                            <path
                                                d="M20 6L9 17L4 12"
                                                stroke={tier.featured ? "#C9A84C" : "#0D7A5F"}
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <span style={{ color: tier.featured ? "rgba(255,255,255,0.8)" : "#374151" }}>
                                            {f}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <button
                                type="button"
                                onClick={() => handleCta(tier)}
                                className="w-full cursor-pointer py-3 rounded-lg font-semibold text-sm text-white transition-all duration-150 active:scale-[0.98] hover:opacity-90"
                                style={{ background: "#0D7A5F" }}
                            >
                                {tier.cta}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Footnote */}
                <p className="text-center text-xs mt-8" style={{ color: "#6B7280" }}>
                    All prices in Nigerian Naira (₦). Payments via Paystack (NGN) or Flutterwave (GBP/USD/EUR for diaspora). Prices shown exclude VAT where applicable.
                </p>
            </div>
        </section>
    );
}