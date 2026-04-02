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
            className="w-full"
            style={{
                background: "#F9FAFB",
                scrollMarginTop: "80px",
                paddingTop: "80px",
                paddingBottom: "80px",
            }}
        >
            <div className="max-w-[720px] mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-12">
                    <span
                        className="text-[11px] font-semibold tracking-[0.15em] uppercase"
                        style={{ color: "#0D7A5F" }}
                    >
                        FAQ
                    </span>
                    <div className="h-[2px] w-6 rounded-full mx-auto mt-3" style={{ background: "#C9A84C" }} />
                    <h2
                        className="mt-4 font-bold text-[32px] font-serif"
                        style={{ color: "#1B3F6B" }}
                    >
                        Common questions.
                    </h2>
                </div>

                {/* Accordion */}
                <div
                    className="rounded-xl overflow-hidden"
                    style={{
                        background: "white",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                        border: "1px solid #F3F4F6",
                    }}
                >
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            style={{ borderBottom: i < faqs.length - 1 ? "1px solid #F3F4F6" : undefined }}
                        >
                            <button
                                type="button"
                                className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors duration-150 hover:bg-gray-50 min-h-[60px]"
                                onClick={() => setOpen(open === i ? null : i)}
                                aria-expanded={open === i}
                            >
                                <span
                                    className="font-semibold text-base pr-4 leading-snug"
                                    style={{ color: "#1B3F6B" }}
                                >
                                    {faq.q}
                                </span>
                                <span
                                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-150"
                                    style={{
                                        background: open === i ? "#0D7A5F" : "#F3F4F6",
                                        color: open === i ? "white" : "#6B7280",
                                    }}
                                >
                                    {open === i ? (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                            <path d="M5 12h14" />
                                        </svg>
                                    ) : (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                            <path d="M12 5v14M5 12h14" />
                                        </svg>
                                    )}
                                </span>
                            </button>

                            {open === i && (
                                <div className="px-6 pb-5" style={{ color: "#374151" }}>
                                    <p className="text-sm leading-relaxed">{faq.a}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* WhatsApp CTA */}
                <div className="text-center mt-12">
                    <h3
                        className="font-semibold text-xl mb-4 font-serif"
                        style={{ color: "#1B3F6B" }}
                    >
                        Still have questions?
                    </h3>
                    <a
                        href="https://wa.me/14692516652?text=Hi%20Verity%2C%20I%20have%20a%20question"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-150 hover:shadow-md active:scale-[0.98]"
                        style={{ background: "#25D366" }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        Chat with us on WhatsApp
                    </a>
                </div>

            </div>
        </section>
    );
}