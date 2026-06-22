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
            className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50"
            onClick={(e) => {
                if (e.target === e.currentTarget && step < 3) onClose();
            }}
        >
            <div
                className="bg-white w-full sm:max-w-[560px] sm:rounded-2xl rounded-t-2xl overflow-hidden shadow-2xl"
                style={{ maxHeight: "95vh", overflowY: "auto" }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-cream-shade">
                    <div className="flex items-center gap-3">
                        {step > 1 && step < 4 && (
                            <button
                                onClick={() => setStep(step - 1)}
                                className="text-teal flex items-center gap-1 text-sm font-medium hover:opacity-70 transition-opacity"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 12H5M12 5l-7 7 7 7" />
                                </svg>
                                Back
                            </button>
                        )}
                        <h2
                            className="font-bold text-lg text-navy"
                            style={{ fontFamily: "var(--font-display)" }}
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
                            className="text-slate-soft hover:text-navy text-2xl font-light w-8 h-8 flex items-center justify-center rounded-lg hover:bg-cream-shade transition-colors"
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
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${s <= step ? "text-white" : "text-slate-soft"
                                        } ${s < step ? "bg-success" : s === step ? "bg-teal" : "bg-cream-shade"}`}
                                >
                                    {s < step ? (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 6L9 17L4 12" />
                                        </svg>
                                    ) : s}
                                </div>
                                {i < 2 && (
                                    <div className={`h-[2px] w-16 ${s < step ? "bg-success" : "bg-cream-shade"}`} />
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
                                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-slate">
                                    Property Address
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter property address, e.g. 15 Bourdillon Road, Ikoyi"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all duration-150 border-line text-navy focus:border-navy focus:shadow-[0_0_0_3px_var(--line-strong)]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-slate">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="Your email — report delivered here"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all duration-150 border-line text-navy focus:border-navy focus:shadow-[0_0_0_3px_var(--line-strong)]"
                                />
                            </div>

                            {/* WhatsApp opt-in */}
                            <div className="flex items-center justify-between p-4 rounded-xl bg-cream-shade border border-cream-shade">
                                <div>
                                    <p className="text-sm font-medium text-navy">WhatsApp notification</p>
                                    <p className="text-xs text-slate">Send me a notification when my report is ready</p>
                                </div>
                                <button
                                    onClick={() => setWhatsappOptIn(!whatsappOptIn)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${whatsappOptIn ? "bg-teal" : "bg-line-strong"
                                        }`}
                                >
                                    <span
                                        className="inline-block h-4 w-4 rounded-full bg-white transition-transform duration-200"
                                        style={{ transform: whatsappOptIn ? "translateX(22px)" : "translateX(2px)" }}
                                    />
                                </button>
                            </div>

                            {whatsappOptIn && (
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-slate">
                                        WhatsApp Number
                                    </label>
                                    <div className="flex">
                                        <span className="px-3 py-3 rounded-l-lg border border-r-0 text-sm font-medium bg-cream-shade border-line text-slate">
                                            +234
                                        </span>
                                        <input
                                            type="tel"
                                            placeholder="8000000000"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="flex-1 px-4 py-3 rounded-r-lg border text-sm outline-none border-line text-navy focus:border-navy"
                                        />
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={() => setStep(2)}
                                disabled={!isStep1Valid}
                                className="w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-150 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed bg-teal"
                            >
                                Continue →
                            </button>
                            <p className="text-center text-xs text-slate-soft">
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
                                    className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-150 w-full ${selectedTier === tier.id
                                            ? "border-2 border-teal bg-teal/12"
                                            : "border-[1.5px] border-line bg-white"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedTier === tier.id ? "border-teal bg-teal" : "border-line bg-white"
                                                }`}
                                        >
                                            {selectedTier === tier.id && (
                                                <div className="w-2 h-2 rounded-full bg-white" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm text-navy">{tier.name}</p>
                                            <p className="text-xs text-slate">{tier.turnaround} · {tier.desc}</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-base flex-shrink-0 ml-2 text-navy">
                                        {tier.price}
                                    </span>
                                </button>
                            ))}

                            <button
                                onClick={() => setStep(3)}
                                className="w-full py-3.5 mt-2 rounded-xl font-semibold text-white transition-all duration-150 active:scale-[0.98] bg-teal"
                            >
                                Continue →
                            </button>
                        </div>
                    )}

                    {/* Step 3 */}
                    {step === 3 && (
                        <div className="flex flex-col gap-5">
                            {/* Order summary */}
                            <div className="rounded-xl p-5 bg-cream-shade border border-cream-shade">
                                <p className="text-xs font-semibold uppercase tracking-wider mb-3 text-slate-soft">Order Summary</p>
                                <p className="font-semibold text-sm mb-1 text-navy">{address}</p>
                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-line">
                                    <div>
                                        <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-teal/12 text-teal">
                                            {selectedTierObj.name}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-bold text-2xl text-navy" style={{ fontFamily: "var(--font-display)" }}>
                                            {selectedTierObj.price}
                                        </span>
                                        <p className="text-xs text-slate-soft">+ VAT where applicable</p>
                                    </div>
                                </div>
                            </div>

                            {payError && (
                                <div className="px-4 py-3 rounded-lg text-sm bg-danger/15 text-danger">
                                    {payError}
                                </div>
                            )}

                            <button
                                onClick={handlePay}
                                disabled={loading}
                                className="w-full py-4 rounded-xl font-semibold text-white text-base transition-all duration-150 active:scale-[0.98] disabled:opacity-60 bg-teal"
                            >
                                {loading ? "Processing..." : `Pay ${selectedTierObj.price}`}
                            </button>

                            <div className="text-center">
                                <div className="flex items-center justify-center gap-2 mb-1">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--slate-soft)" strokeWidth="2">
                                        <rect x="3" y="11" width="18" height="11" rx="2" />
                                        <path d="M7 11V7a5 5 0 0110 0v4" />
                                    </svg>
                                    <span className="text-xs text-slate-soft">Secured by Paystack</span>
                                </div>
                                <p className="text-xs text-slate-soft">
                                    Diaspora buyers (UK, US, Canada, UAE) — GBP/USD/EUR cards accepted via Flutterwave.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Step 4 — Confirmation */}
                    {step === 4 && (
                        <div className="text-center py-6">
                            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-success/15">
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                                    <path d="M20 6L9 17L4 12" stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                            <h2
                                className="font-bold text-2xl mb-3 text-navy"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                Your order is confirmed.
                            </h2>
                            <p className="text-sm mb-6 text-slate">
                                We&apos;ve received your request and payment. Our team is on it.
                            </p>

                            <div className="rounded-xl p-5 mb-6 text-left bg-cream-shade border border-cream-shade">
                                <p className="text-sm mb-2 text-slate">
                                    Your verification report will be delivered to{" "}
                                    <span className="font-semibold text-navy">{email}</span>{" "}
                                    by <span className="font-semibold">{getDeliveryDate(selectedTier)}</span>.
                                </p>
                                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-line">
                                    <span className="text-xs text-slate-soft">Reference:</span>
                                    <span
                                        className="text-sm font-bold tracking-wider text-navy"
                                        style={{ fontFamily: "monospace" }}
                                    >
                                        {reference || `VRT-2026-${orderId || "000001"}`}
                                    </span>
                                </div>
                                <p className="text-xs mt-1 text-slate-soft">
                                    Quote this in any correspondence with us.
                                </p>
                            </div>

                            <button
                                onClick={onClose}
                                className="w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-150 active:scale-[0.98] bg-teal"
                            >
                                Done
                            </button>
                            <button className="mt-3 text-sm w-full text-center transition-colors hover:opacity-70 text-teal">
                                Upload documents to speed up verification →
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}