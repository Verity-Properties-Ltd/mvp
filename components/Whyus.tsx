"use client"

import { useRef, useEffect, useState } from "react"

const useInView = (threshold = 0.08) => {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
            { threshold }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [threshold])
    return { ref, visible }
}

const PILLARS = [
    {
        num: "01",
        heading: "Why we're doing this",
        body: "We've seen what fraud does to Nigerian families — buyers who saved for years, defrauded in days. The tools to fix this exist; the will to build them properly hasn't. Verity is the work we wished someone else would do. We stopped waiting.",
    },
    {
        num: "02",
        heading: "The market we're building toward",
        body: "A market where every transaction is verifiable, where reputation compounds instead of leaking, where fraud doesn't pay because the structure makes it impossible. That market doesn't exist in Nigeria today. We're building the layer that lets it.",
    },
    {
        num: "03",
        heading: "How we work",
        body: "No shortcuts. We're meeting the Land Registry in person. Talking to lawyers, not around them. Onboarding developers one signed agreement at a time. The route to a trustworthy property market in Nigeria is uncharted — and we're walking it deliberately.",
    },
]

export default function WhyUs() {
    const { ref, visible } = useInView()

    return (
        <section
            ref={ref}
            aria-labelledby="whyus-heading"
            className="bg-[#F5F2ED]"
            id="why-us"
        >
            <div className="mx-auto px-4 sm:px-12 py-24" style={{ maxWidth: 1280 }}>

                {/* ── Top ── */}
                <div
                    className="mb-16"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(10px)",
                        transition: "opacity 0.6s ease, transform 0.6s ease",
                    }}
                >
                    <div className="flex items-center gap-2.5 mb-5">
                        <span
                            aria-hidden="true"
                            className="block w-5 h-px bg-[#C9A961] flex-shrink-0"
                        />
                        <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#A88A45]">
                            Why us, why now
                        </span>
                    </div>

                    <h2
                        id="whyus-heading"
                        className="font-serif font-medium text-[#1E2260] mb-5"
                        style={{ fontSize: "clamp(36px, 4vw, 52px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
                    >
                        What we <em className="italic text-[#C9A961]">stand for.</em>
                    </h2>

                    <p
                        className="font-sans text-[15px] leading-[1.75] text-[#6B6F77] font-normal max-w-[56ch]"
                    >
                        We stand for a future where every property claim can be verified
                        before money changes hands.
                    </p>
                </div>

                {/* ── Three columns ── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {PILLARS.map((p, i) => (
                        <div
                            key={p.num}
                            className="bg-white px-8 pt-3 pb-6 rounded-md"
                            style={{
                                boxShadow: "0 2px 16px -4px rgba(30,34,96,0.08), 0 1px 4px -2px rgba(30,34,96,0.04)",
                                opacity: visible ? 1 : 0,
                                transform: visible ? "translateY(0)" : "translateY(14px)",
                                transition: `opacity 0.6s ease ${100 + i * 100}ms, transform 0.6s ease ${100 + i * 100}ms`,
                            }}
                        >
                            {/* Large faded number */}
                            <div
                                className="font-serif italic font-normal leading-none mb-7"
                                style={{
                                    fontSize: "clamp(32px, 6vw, 70px)",
                                    letterSpacing: "-0.03em",
                                    color: "rgba(30,34,96,0.10)",
                                }}
                            >
                                {p.num}
                            </div>

                            <h3
                                className="font-serif font-semibold text-[#1E2260] mb-4"
                                style={{ fontSize: "clamp(18px, 1.8vw, 24px)", lineHeight: 1.25 }}
                            >
                                {p.heading}
                            </h3>

                            <p className="font-sans text-[14.5px] leading-[1.85] text-[#4A4E5A] font-normal">
                                {p.body}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}