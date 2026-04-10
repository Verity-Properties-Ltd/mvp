'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

const VerityLogo = () => (
    <div className="flex items-center gap-2">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <path d="M16 2L4 7V16C4 22.627 9.373 28 16 30C22.627 28 28 22.627 28 16V7L16 2Z"
                fill="url(#signin-shield)" />
            <path d="M11 16L14.5 19.5L21 13" stroke="white" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round" />
            <defs>
                <linearGradient id="signin-shield" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F0D080" />
                    <stop offset="1" stopColor="#C9A84C" />
                </linearGradient>
            </defs>
        </svg>
        <span className="text-white font-bold tracking-[0.15em] text-[15px] uppercase">
            VERI<span className="text-[#C9A84C]">TY</span>
        </span>
    </div>
);

// Shared autofill-safe input style
const inputClass = `
    w-full h-12 px-4 bg-white/10 text-white placeholder:text-white/30
    rounded-2xl text-sm border border-white/10 outline-none transition-all
    focus:bg-white/15 focus:border-[#C9A84C]/60
    [&:-webkit-autofill]:!bg-[#1a2e45]
    [&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_#1a2e45_inset]
    [&:-webkit-autofill]:![-webkit-text-fill-color:white]
`;

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setError('');
        if (!email.trim() || !email.includes('@')) {
            setError('Please enter a valid email address.');
            return;
        }
        if (!password) {
            setError('Please enter your password.');
            return;
        }
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1000));
        setLoading(false);
        router.push('/dashboard');
    };

    return (
        <div className="min-h-screen bg-[#062642] flex flex-col">
            {/* Nav */}
            <nav className="flex items-center justify-between px-8 py-5">
                <VerityLogo />
                <Link href="/sign-up"
                    className="text-sm text-[#C9A84C] underline underline-offset-4 hover:text-[#F0D080] transition-colors">
                    Create account
                </Link>
            </nav>

            {/* Form */}
            <div className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-[440px]">

                    <div className="mb-8">
                        <p className="text-2xl font-bold text-white">Welcome back</p>
                        <p className="text-sm text-white/40 mt-1">Sign in to your Verity dashboard</p>
                    </div>

                    {error && (
                        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3 mb-5">
                            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                            <p className="text-sm text-red-400">{error}</p>
                        </div>
                    )}

                    <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-7 space-y-5">

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="block text-[13px] font-medium text-white/70">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your e-mail address"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                className={inputClass}
                                style={{ WebkitBoxShadow: '0 0 0px 1000px #1a2e45 inset', WebkitTextFillColor: email ? 'white' : undefined }}
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label className="block text-[13px] font-medium text-white/70">Password</label>
                                <Link href="/forgot-password"
                                    className="text-[12px] text-[#C9A84C] hover:text-[#F0D080] transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                    className={`${inputClass} pr-12`}
                                    style={{ WebkitBoxShadow: '0 0 0px 1000px #1a2e45 inset', WebkitTextFillColor: 'white' }}
                                />
                                <button type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors">
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full h-12 bg-[#C9A84C] hover:bg-[#B8962E] disabled:opacity-60
                                disabled:cursor-not-allowed text-white font-semibold text-sm
                                rounded-2xl transition-colors flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Signing in…
                                </>
                            ) : 'Sign in'}
                        </button>
                    </div>

                    <p className="text-center text-sm text-white/30 mt-5">
                        Don't have an account?{' '}
                        <Link href="/sign-up" className="text-[#C9A84C] hover:text-[#F0D080] transition-colors">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>

            <p className="text-center text-xs text-white/20 pb-6">
                © 2026 Verity Proptech Ltd · NDPR Compliant
            </p>

            {/* Global autofill override */}
            <style>{`
                input:-webkit-autofill,
                input:-webkit-autofill:hover,
                input:-webkit-autofill:focus {
                    -webkit-box-shadow: 0 0 0px 1000px #1a2e45 inset !important;
                    -webkit-text-fill-color: white !important;
                    caret-color: white;
                    transition: background-color 5000s ease-in-out 0s;
                }
            `}</style>
        </div>
    );
}