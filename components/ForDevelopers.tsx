"use client";

import { useState } from "react";

export default function ForDevelopers() {
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState({ name: "", company_name: "", email: "", phone: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async () => {
        setStatus("loading");
        try {
            const res = await fetch("/api/v1/leads/developer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, source: "landing_developer_section" }),
            });
            if (res.ok) {
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    const valueProps = [
        {
            label: "Upload in bulk",
            desc: "PDF, JPG, and PNG. Multiple documents per property.",
        },
        {
            label: "Track every property",
            desc: "From uploaded to verified, in one real-time view.",
        },
        {
            label: "Generate bank-ready certificates",
            desc: "Share with lenders and investors with one click.",
        },
    ];

    return (
        <>
            <section
                id="for-developers"
                aria-label="For Developers"
                className="w-full relative overflow-hidden"
                style={{
                    background: "#0F2340",
                    scrollMarginTop: "80px",
                    paddingTop: "80px",
                    paddingBottom: "80px",
                }}
            >
                {/* Background pattern */}
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                    <svg className="absolute right-0 top-0 h-full opacity-[0.03]" viewBox="0 0 400 600" fill="none">
                        <circle cx="300" cy="300" r="250" stroke="white" strokeWidth="60" />
                        <circle cx="300" cy="300" r="150" stroke="white" strokeWidth="40" />
                        <circle cx="300" cy="300" r="50" stroke="white" strokeWidth="20" />
                    </svg>
                </div>

                <div className="relative z-10 max-w-[1200px] mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Left — text */}
                        <div>
                            <span
                                className="text-[11px] font-semibold tracking-[0.15em] uppercase"
                                style={{ color: "#C9A84C" }}
                            >
                                For Developers
                            </span>
                            <h2
                                className="mt-4 font-bold font-serif text-white leading-tight mb-4"
                                style={{ fontSize: "clamp(28px, 3vw, 36px)" }}
                            >
                                One dashboard for your entire property portfolio.
                            </h2>
                            <p
                                className="text-base mb-10 leading-relaxed"
                                style={{ color: "rgba(255,255,255,0.7)" }}
                            >
                                Upload title documents, track verification status in real time, and generate bank-ready certificates for every plot you own.
                            </p>

                            <div className="flex flex-col gap-5 mb-10">
                                {valueProps.map((vp) => (
                                    <div key={vp.label} className="flex items-start gap-3">
                                        <div
                                            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                            style={{ background: "#0D7A5F" }}
                                        >
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                                <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-white">{vp.label}</span>
                                            <span style={{ color: "rgba(255,255,255,0.6)" }}> — {vp.desc}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(true)}
                                    className="px-8 py-3.5 rounded-xl font-semibold text-base transition-all duration-150 hover:shadow-lg active:scale-[0.98]"
                                    style={{ background: "#C9A84C", color: "#1F2937" }}
                                >
                                    Request a Developer Dashboard Demo
                                </button>
                                <p
                                    className="mt-3 text-xs italic"
                                    style={{ color: "rgba(255,255,255,0.5)" }}
                                >
                                    Free first 5 verifications for new developer accounts — limited time offer.
                                </p>
                            </div>
                        </div>

                        {/* Right — visual mockup */}
                        <div className="hidden lg:flex items-center justify-center">
                            <div
                                className="w-full max-w-[500px] rounded-2xl overflow-hidden"
                                style={{
                                    background: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
                                }}
                            >
                                {/* Browser chrome */}
                                <div
                                    className="flex items-center gap-2 px-4 py-3"
                                    style={{ background: "rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                                >
                                    <span className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
                                    <span className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
                                    <span className="w-3 h-3 rounded-full bg-green-500 opacity-70" />
                                    <span
                                        className="ml-3 flex-1 text-xs text-center px-3 py-1 rounded"
                                        style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)" }}
                                    >
                                        dashboard.verity.properties
                                    </span>
                                </div>

                                {/* Dashboard preview */}
                                <div className="p-5">
                                    {/* Stat row */}
                                    <div className="grid grid-cols-3 gap-3 mb-4">
                                        {[
                                            { label: "Total", val: "247" },
                                            { label: "Verified", val: "189" },
                                            { label: "Pending", val: "58" },
                                        ].map((s) => (
                                            <div
                                                key={s.label}
                                                className="rounded-lg p-3 text-center"
                                                style={{ background: "rgba(255,255,255,0.06)" }}
                                            >
                                                <div className="font-bold font-serif text-lg text-white">
                                                    {s.val}
                                                </div>
                                                <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                                                    {s.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Property rows */}
                                    <div className="rounded-lg overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                                        {[
                                            { addr: "15 Bourdillon Rd, Ikoyi", status: "Verified", statusColor: "#15803D", statusBg: "#DCFCE7" },
                                            { addr: "24 Admiralty Way, Lekki", status: "Verified", statusColor: "#15803D", statusBg: "#DCFCE7" },
                                            { addr: "8 Close B, Victoria Island", status: "Pending", statusColor: "#D97706", statusBg: "#FEF3C7" },
                                            { addr: "Plot 5 Banana Island", status: "Verified", statusColor: "#15803D", statusBg: "#DCFCE7" },
                                        ].map((row, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center justify-between px-3 py-2.5"
                                                style={{
                                                    borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : undefined,
                                                    background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                                                }}
                                            >
                                                <span className="text-[11px] text-white/60 truncate max-w-[180px]">{row.addr}</span>
                                                <span
                                                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                                                    style={{ background: row.statusBg, color: row.statusColor }}
                                                >
                                                    {row.status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Bottom CTA */}
                                    <button
                                        type="button"
                                        className="w-full mt-4 py-2.5 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90"
                                        style={{ background: "#0D7A5F" }}
                                    >
                                        + Upload New Property
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Demo Request Modal */}
            {modalOpen && (
                <div
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4"
                    style={{ background: "rgba(0,0,0,0.5)" }}
                    onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
                >
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[480px] p-8 relative">
                        <button
                            type="button"
                            onClick={() => setModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-light"
                        >
                            ×
                        </button>

                        {status === "success" ? (
                            <div className="text-center py-8">
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                                    style={{ background: "#DCFCE7" }}
                                >
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17L4 12" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3
                                    className="font-bold font-serif text-xl mb-2"
                                    style={{ color: "#1B3F6B" }}
                                >
                                    Request Received!
                                </h3>
                                <p className="text-sm" style={{ color: "#374151" }}>
                                    Thanks — Sheun will be in touch within 24 hours.
                                </p>
                            </div>
                        ) : (
                            <>
                                <h3
                                    className="font-bold font-serif text-xl mb-1"
                                    style={{ color: "#1B3F6B" }}
                                >
                                    Request a Developer Demo
                                </h3>
                                <p className="text-sm mb-6" style={{ color: "#6B7280" }}>
                                    Tell us about your portfolio and we&apos;ll get in touch within 24 hours.
                                </p>

                                <div className="flex flex-col gap-4">
                                    {[
                                        { label: "Your Name", key: "name", type: "text", placeholder: "Chukwu Emeka" },
                                        { label: "Company Name", key: "company_name", type: "text", placeholder: "Emeka Estates Ltd." },
                                        { label: "Work Email", key: "email", type: "email", placeholder: "chukwu@emekaestates.com" },
                                        { label: "Phone Number", key: "phone", type: "tel", placeholder: "+234 800 000 0000" },
                                    ].map((field) => (
                                        <div key={field.key}>
                                            <label
                                                className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                                                style={{ color: "#6B7280" }}
                                            >
                                                {field.label}
                                            </label>
                                            <input
                                                type={field.type}
                                                placeholder={field.placeholder}
                                                value={form[field.key as keyof typeof form]}
                                                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all duration-150 focus:border-[#1B3F6B] focus:shadow-[0_0_0_3px_rgba(27,63,107,0.1)]"
                                                style={{ borderColor: "#D1D5DB", color: "#111827" }}
                                            />
                                        </div>
                                    ))}

                                    {status === "error" && (
                                        <p className="text-sm text-red-600">
                                            Something went wrong.{" "}
                                            <a href="mailto:hello@verity.properties" className="underline">
                                                Email us instead
                                            </a>
                                        </p>
                                    )}

                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={status === "loading"}
                                        className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-150 active:scale-[0.98] disabled:opacity-60 hover:opacity-90"
                                        style={{ background: "#0D7A5F" }}
                                    >
                                        {status === "loading" ? "Submitting..." : "Submit Request"}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}