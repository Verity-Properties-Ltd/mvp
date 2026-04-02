"use client";

import { useState, useEffect } from "react";

interface ReportOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    preSelectedTier?: string;
}

type Tier = "standard" | "professional" | "express";

const tiers: { id: Tier; name: string; turnaround: string; price: string; amount: number; desc: string }[] = [
    {
        id: "standard",
        name: "Standard",
        turnaround: "72-hour turnaround",
        price: "₦10,000",
        amount: 10000,
        desc: "Suitable for individual buyers and investors",
    },
    {
        id: "professional",
        name: "Professional",
        turnaround: "24-hour turnaround",
        price: "₦25,000",
        amount: 25000,
        desc: "For lawyers, agents, and due diligence",
    },
    {
        id: "express",
        name: "Express",
        turnaround: "6–12 hour turnaround",
        price: "₦50,000",
        amount: 50000,
        desc: "Urgent transactions and time-sensitive deals",
    },
];

function getDeliveryDate(tier: Tier): string {
    const now = new Date();
    const hours = tier === "express" ? 12 : tier === "professional" ? 24 : 72;
    now.setHours(now.getHours() + hours);
    return now.toLocaleString("en-NG", {
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
    });
}

export default function ReportOrderModal({ isOpen, onClose, preSelectedTier }: ReportOrderModalProps) {
    const [step, setStep] = useState(1);
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [whatsappOptIn, setWhatsappOptIn] = useState(false);
    const [phone, setPhone] = useState("");
    const [selectedTier, setSelectedTier] = useState<Tier>(
        (preSelectedTier as Tier) || "standard"
    );
    const [orderId, setOrderId] = useState("");
    const [reference, setReference] = useState("");
    const [payError, setPayError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (preSelectedTier && tiers.find((t) => t.id === preSelectedTier)) {
            setSelectedTier(preSelectedTier as Tier);
            if (isOpen) setStep(2);
        }
    }, [preSelectedTier, isOpen]);

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setStep(1);
                setAddress("");
                setEmail("");
                setWhatsappOptIn(false);
                setPhone("");
                setPayError("");
                setLoading(false);
            }, 300);
        }
    }, [isOpen]);

    const handlePay = async () => {
        setLoading(true);
        setPayError("");
        try {
            const res = await fetch("/api/v1/reports/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    address,
                    email,
                    tier: selectedTier,
                    ...(whatsappOptIn && { whatsapp_phone: phone }),
                }),
            });
            if (!res.ok) throw new Error("Order creation failed");
            const data = await res.json();
            setOrderId(data.order_id);
            setReference(`VRT-2026-${String(Math.floor(Math.random() * 999999)).padStart(6, "0")}`);
            setStep(4);
        } catch {
            setPayError("Something went wrong. Please try again or email hello@verity.properties.");
        } finally {
            setLoading(false);
        }
    };

    const selectedTierObj = tiers.find((t) => t.id === selectedTier)!;
    const isStep1Valid = address.trim().length > 5 && /\S+@\S+\.\S+/.test(email);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-0 sm:p-4"
            style={{ background: "rgba(0,0,0,0.5)" }}
            onClick={(e) => {
                if (e.target === e.currentTarget && step < 3) onClose();
            }}
        >
            <div
                className="bg-white w-full sm:max-w-[560px] sm:rounded-2xl rounded-t-2xl overflow-hidden"
                style={{ boxShadow: "0 25px 80px rgba(0,0,0,0.3)", maxHeight: "95vh", overflowY: "auto" }}
            >
                {/* Header */}
                <div
                    className="flex items-center justify-between px-6 py-5 border-b"
                    style={{ borderColor: "#F3F4F6" }}
                >
                    <div className="flex items-center gap-3">
                        {step > 1 && step < 4 && (
                            <button
                                onClick={() => setStep(step - 1)}
                                className="text-[#0D7A5F] flex items-center gap-1 text-sm font-medium hover:opacity-70 transition-opacity"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 12H5M12 5l-7 7 7 7" />
                                </svg>
                                Back
                            </button>
                        )}
                        <h2
                            className="font-bold text-lg"
                            style={{ color: "#1B3F6B", fontFamily: "var(--font-display)" }}
                        >
                            {step === 1 && "Verify a Property"}
                            {step === 2 && "Choose Your Report Tier"}
                            {step === 3 && "Review & Pay"}
                            {step === 4 && ""}
                        </h2>
                    </div>
                    {step !== 4 && (
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-700 text-2xl font-light w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            ×
                        </button>
                    )}
                </div>

                {/* Step indicator */}
                {step < 4 && (
                    <div className="flex items-center justify-center gap-0 px-6 pt-5 pb-2">
                        {[1, 2, 3].map((s, i) => (
                            <div key={s} className="flex items-center">
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200"
                                    style={{
                                        background: s < step ? "#15803D" : s === step ? "#0D7A5F" : "#E5E7EB",
                                        color: s <= step ? "white" : "#9CA3AF",
                                    }}
                                >
                                    {s < step ? (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 6L9 17L4 12" />
                                        </svg>
                                    ) : s}
                                </div>
                                {i < 2 && (
                                    <div
                                        className="h-[2px] w-16"
                                        style={{ background: s < step ? "#15803D" : "#E5E7EB" }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Body */}
                <div className="px-6 py-6">
                    {/* Step 1 */}
                    {step === 1 && (
                        <div className="flex flex-col gap-5">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#6B7280" }}>
                                    Property Address
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter property address, e.g. 15 Bourdillon Road, Ikoyi"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all duration-150 focus:border-[#1B3F6B] focus:shadow-[0_0_0_3px_rgba(27,63,107,0.08)]"
                                    style={{ borderColor: "#D1D5DB", color: "#111827" }}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#6B7280" }}>
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="Your email — report delivered here"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all duration-150 focus:border-[#1B3F6B] focus:shadow-[0_0_0_3px_rgba(27,63,107,0.08)]"
                                    style={{ borderColor: "#D1D5DB", color: "#111827" }}
                                />
                            </div>

                            {/* WhatsApp opt-in */}
                            <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: "#F9FAFB", border: "1px solid #F3F4F6" }}>
                                <div>
                                    <p className="text-sm font-medium" style={{ color: "#1B3F6B" }}>WhatsApp notification</p>
                                    <p className="text-xs" style={{ color: "#6B7280" }}>Send me a notification when my report is ready</p>
                                </div>
                                <button
                                    onClick={() => setWhatsappOptIn(!whatsappOptIn)}
                                    className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200"
                                    style={{ background: whatsappOptIn ? "#0D7A5F" : "#D1D5DB" }}
                                >
                                    <span
                                        className="inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200"
                                        style={{ transform: whatsappOptIn ? "translateX(22px)" : "translateX(2px)" }}
                                    />
                                </button>
                            </div>

                            {whatsappOptIn && (
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#6B7280" }}>
                                        WhatsApp Number
                                    </label>
                                    <div className="flex">
                                        <span
                                            className="px-3 py-3 rounded-l-lg border border-r-0 text-sm font-medium"
                                            style={{ background: "#F9FAFB", borderColor: "#D1D5DB", color: "#374151" }}
                                        >
                                            +234
                                        </span>
                                        <input
                                            type="tel"
                                            placeholder="8000000000"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="flex-1 px-4 py-3 rounded-r-lg border text-sm outline-none focus:border-[#1B3F6B]"
                                            style={{ borderColor: "#D1D5DB", color: "#111827" }}
                                        />
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={() => setStep(2)}
                                disabled={!isStep1Valid}
                                className="w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-150 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                                style={{ background: "#0D7A5F" }}
                            >
                                Continue →
                            </button>
                            <p className="text-center text-xs" style={{ color: "#9CA3AF" }}>
                                Your contact details are used only for report delivery. We do not share your data.
                            </p>
                        </div>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                        <div className="flex flex-col gap-4">
                            {tiers.map((tier) => (
                                <button
                                    key={tier.id}
                                    onClick={() => setSelectedTier(tier.id)}
                                    className="flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-150 w-full"
                                    style={{
                                        borderColor: selectedTier === tier.id ? "#0D7A5F" : "#E5E7EB",
                                        borderWidth: selectedTier === tier.id ? "2px" : "1.5px",
                                        background: selectedTier === tier.id ? "#E6F4F0" : "white",
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                                            style={{
                                                borderColor: selectedTier === tier.id ? "#0D7A5F" : "#D1D5DB",
                                                background: selectedTier === tier.id ? "#0D7A5F" : "white",
                                            }}
                                        >
                                            {selectedTier === tier.id && (
                                                <div className="w-2 h-2 rounded-full bg-white" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm" style={{ color: "#1B3F6B" }}>{tier.name}</p>
                                            <p className="text-xs" style={{ color: "#6B7280" }}>{tier.turnaround} · {tier.desc}</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-base flex-shrink-0 ml-2" style={{ color: "#1B3F6B" }}>
                                        {tier.price}
                                    </span>
                                </button>
                            ))}

                            <button
                                onClick={() => setStep(3)}
                                className="w-full py-3.5 mt-2 rounded-xl font-semibold text-white transition-all duration-150 active:scale-[0.98]"
                                style={{ background: "#0D7A5F" }}
                            >
                                Continue →
                            </button>
                        </div>
                    )}

                    {/* Step 3 */}
                    {step === 3 && (
                        <div className="flex flex-col gap-5">
                            {/* Order summary */}
                            <div className="rounded-xl p-5" style={{ background: "#F9FAFB", border: "1px solid #F3F4F6" }}>
                                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#9CA3AF" }}>Order Summary</p>
                                <p className="font-semibold text-sm mb-1" style={{ color: "#111827" }}>{address}</p>
                                <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: "#E5E7EB" }}>
                                    <div>
                                        <span
                                            className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full"
                                            style={{ background: "#E6F4F0", color: "#0D7A5F" }}
                                        >
                                            {selectedTierObj.name}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-bold text-2xl" style={{ color: "#1B3F6B", fontFamily: "var(--font-display)" }}>
                                            {selectedTierObj.price}
                                        </span>
                                        <p className="text-xs" style={{ color: "#9CA3AF" }}>+ VAT where applicable</p>
                                    </div>
                                </div>
                            </div>

                            {payError && (
                                <div className="px-4 py-3 rounded-lg text-sm" style={{ background: "#FEE2E2", color: "#DC2626" }}>
                                    {payError}
                                </div>
                            )}

                            <button
                                onClick={handlePay}
                                disabled={loading}
                                className="w-full py-4 rounded-xl font-semibold text-white text-base transition-all duration-150 active:scale-[0.98] disabled:opacity-60"
                                style={{ background: "#0D7A5F" }}
                            >
                                {loading ? "Processing..." : `Pay ${selectedTierObj.price}`}
                            </button>

                            <div className="text-center">
                                <div className="flex items-center justify-center gap-2 mb-1">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                                        <rect x="3" y="11" width="18" height="11" rx="2" />
                                        <path d="M7 11V7a5 5 0 0110 0v4" />
                                    </svg>
                                    <span className="text-xs" style={{ color: "#9CA3AF" }}>Secured by Paystack</span>
                                </div>
                                <p className="text-xs" style={{ color: "#9CA3AF" }}>
                                    Diaspora buyers (UK, US, Canada, UAE) — GBP/USD/EUR cards accepted via Flutterwave.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Step 4 — Confirmation */}
                    {step === 4 && (
                        <div className="text-center py-6">
                            <div
                                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                                style={{ background: "#DCFCE7" }}
                            >
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                                    <path d="M20 6L9 17L4 12" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                            <h2
                                className="font-bold text-2xl mb-3"
                                style={{ color: "#1B3F6B", fontFamily: "var(--font-display)" }}
                            >
                                Your order is confirmed.
                            </h2>
                            <p className="text-sm mb-6" style={{ color: "#374151" }}>
                                We&apos;ve received your request and payment. Our team is on it.
                            </p>

                            <div
                                className="rounded-xl p-5 mb-6 text-left"
                                style={{ background: "#F9FAFB", border: "1px solid #F3F4F6" }}
                            >
                                <p className="text-sm mb-2" style={{ color: "#374151" }}>
                                    Your verification report will be delivered to{" "}
                                    <span className="font-semibold" style={{ color: "#1B3F6B" }}>{email}</span>{" "}
                                    by <span className="font-semibold">{getDeliveryDate(selectedTier)}</span>.
                                </p>
                                <div className="flex items-center gap-2 mt-4 pt-4 border-t" style={{ borderColor: "#E5E7EB" }}>
                                    <span className="text-xs" style={{ color: "#9CA3AF" }}>Reference:</span>
                                    <span
                                        className="text-sm font-bold tracking-wider"
                                        style={{ color: "#1B3F6B", fontFamily: "monospace" }}
                                    >
                                        {reference || `VRT-2026-${orderId || "000001"}`}
                                    </span>
                                </div>
                                <p className="text-xs mt-1" style={{ color: "#9CA3AF" }}>
                                    Quote this in any correspondence with us.
                                </p>
                            </div>

                            <button
                                onClick={onClose}
                                className="w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-150 active:scale-[0.98]"
                                style={{ background: "#0D7A5F" }}
                            >
                                Done
                            </button>
                            <button className="mt-3 text-sm w-full text-center transition-colors hover:opacity-70" style={{ color: "#0D7A5F" }}>
                                Upload documents to speed up verification →
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}