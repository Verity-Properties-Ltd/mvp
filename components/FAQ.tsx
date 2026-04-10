"use client";

import { useState } from "react";

const faqs = [
    {
        q: "What documents can Verity verify?",
        a: "Certificate of Occupancy (C of O), Deed of Assignment, Survey Plans, Governor's Consent, Gazette entries, Deed of Lease, and Power of Attorney. If your document type is not listed, contact us — we handle most Lagos-registered title documents.",
    },
    {
        q: "How does Verity access land registry records?",
        a: "Verity works directly with the Lagos Land Registry to cross-reference title numbers and ownership records. For the MVP phase, this includes manual registry searches conducted by our team. Full API integration with the Lagos e-GIS portal is in progress.",
    },
    {
        q: "What does 'verified' actually mean?",
        a: "A verified status means our AI pipeline and a Verity-certified analyst have reviewed the title document, confirmed its authenticity against known formats, cross-referenced the title number with registry records, and found no encumbrances or red flags at the time of the search. The report details exactly what was checked and the result of each check.",
    },
    {
        q: "Is my document data secure?",
        a: "Yes. Your documents are stored in AWS Lagos (af-south-1), encrypted at rest with AES-256, and encrypted in transit with TLS 1.3. Only Verity analysts access your documents for verification purposes. We comply fully with Nigeria's Data Protection Regulation (NDPR). Documents are deleted on request.",
    },
    {
        q: "How do I receive my report?",
        a: "Your report is delivered as a PDF to the email address you provide at checkout. You will also receive a WhatsApp notification (if you opt in). Reports are typically delivered within 48 hours for Standard tier, 24 hours for Professional, and 6–12 hours for Express.",
    },
    {
        q: "Can I use the report as legal evidence?",
        a: "The Verity Verification Report is a professional due diligence tool, not a substitute for legal advice. It is designed to be shared with your conveyancing lawyer as part of their due diligence process. Most Lagos conveyancing lawyers accept Verity reports as supporting documentation.",
    },
    {
        q: "Do you cover properties outside Lagos?",
        a: "The MVP covers Lagos State properties only. Abuja (FCT) is planned for launch at Series A (Year 2). If you have an urgent query for another state, contact us and we will advise on what we can accommodate manually.",
    },
];

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section
            id="faq"
            aria-label="Frequently asked questions"
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
                    <pattern id="faq-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#faq-grid)" />
            </svg>

            <div className="relative z-10 max-w-[760px] mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-12">
                    <p
                        className="text-xs font-semibold uppercase w-max mb-6 tracking-[0.15em] px-4 py-1.5 rounded-full mx-auto"
                        style={{
                            background: "rgba(201,168,76,0.12)",
                            color: "#C9A84C",
                            border: "1px solid rgba(201,168,76,0.3)",
                        }}
                    >
                        Frequently Asked Questions
                    </p>
                    <h2
                        className="font-extrabold text-white leading-[1.1]"
                        style={{
                            fontSize: "clamp(28px, 4vw, 48px)",
                            fontFamily: "var(--font-display)",
                            color: "rgba(255,255,255,0.85)",
                        }}
                    >
                        Everything you need to know{" "}
                        <br className="hidden sm:block" />
                        before you get started.
                    </h2>
                </div>

                {/* Accordion container */}
                <div
                    className="rounded-2xl overflow-hidden mb-10"
                    style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                    }}
                >
                    {faqs.map((faq, i) => {
                        const isOpen = open === i;
                        return (
                            <div
                                key={i}
                                style={{
                                    borderBottom: i < faqs.length - 1
                                        ? "1px solid rgba(255,255,255,0.07)"
                                        : undefined,
                                }}
                            >
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-between px-7 py-5 text-left transition-colors duration-150 gap-6"
                                    style={{
                                        background: isOpen ? "rgba(255,255,255,0.04)" : "transparent",
                                    }}
                                    onClick={() => setOpen(isOpen ? null : i)}
                                    aria-expanded={isOpen}
                                >
                                    <span
                                        className="text-sm font-medium leading-snug"
                                        style={{ color: isOpen ? "white" : "rgba(255,255,255,0.8)" }}
                                    >
                                        {faq.q}
                                    </span>

                                    {/* Chevron icon */}
                                    <span
                                        className="flex-shrink-0 transition-transform duration-200"
                                        style={{
                                            color: "#C9A84C",
                                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                                        }}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M6 9l6 6 6-6" />
                                        </svg>
                                    </span>
                                </button>

                                {isOpen && (
                                    <div className="px-7 pb-6">
                                        <p
                                            className="text-sm leading-relaxed"
                                            style={{ color: "rgba(255,255,255,0.5)" }}
                                        >
                                            {faq.a}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA — inline, minimal */}
                <div className="flex items-center justify-center gap-2 text-sm">
                    <span style={{ color: "rgba(255,255,255,0.4)" }}>
                        Still have questions?
                    </span>
                    <a
                        href="https://wa.me/14692516652?text=Hi%20Verity%2C%20I%20have%20a%20question"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold transition-opacity duration-150 hover:opacity-70 flex items-center gap-1"
                        style={{ color: "#C9A84C" }}
                    >
                        Talk to our team →
                    </a>
                </div>

            </div>
        </section>
    );
}