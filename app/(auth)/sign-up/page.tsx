'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Eye, EyeOff, AlertCircle, Mail,
    CheckCircle2, Users, Building2, Upload,
    ChevronRight,
} from 'lucide-react';

// ─── Shared: Logo ─────────────────────────────────────────────────────────────
const VerityLogo = () => (
    <div className="flex items-center gap-2">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <path d="M16 2L4 7V16C4 22.627 9.373 28 16 30C22.627 28 28 22.627 28 16V7L16 2Z"
                fill="url(#logo-grad)" />
            <path d="M11 16L14.5 19.5L21 13" stroke="white" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round" />
            <defs>
                <linearGradient id="logo-grad" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F0D080" /><stop offset="1" stopColor="#C9A84C" />
                </linearGradient>
            </defs>
        </svg>
        <span className="text-white font-bold tracking-[0.15em] text-[15px] uppercase">
            VERI<span className="text-[#C9A84C]">TY</span>
        </span>
    </div>
);

// ─── Shared: Nav ──────────────────────────────────────────────────────────────
const AuthNav = ({ rightLabel, rightHref }: { rightLabel: string; rightHref: string }) => (
    <nav className="flex items-center justify-between px-8 py-5 shrink-0">
        <VerityLogo />
        <Link href={rightHref}
            className="text-sm text-[#C9A84C] underline underline-offset-4 hover:text-[#F0D080] transition-colors">
            {rightLabel}
        </Link>
    </nav>
);

// ─── Shared: Progress bar ─────────────────────────────────────────────────────
const ProgressBar = ({ step, total }: { step: number; total: number }) => (
    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-[#C9A84C] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(step / total) * 100}%` }} />
    </div>
);

// ─── Shared: Text input ───────────────────────────────────────────────────────
const AuthInput = ({
    label, placeholder, type = 'text', value, onChange,
    error, helper, rightElement, onKeyDown,
}: {
    label: string; placeholder: string; type?: string;
    value: string; onChange: (v: string) => void;
    error?: string; helper?: string;
    rightElement?: React.ReactNode;
    onKeyDown?: (e: React.KeyboardEvent) => void;
}) => (
    <div className="space-y-1.5">
        <label className="block text-[13px] font-medium text-white/70">{label}</label>
        <div className="relative">
            <input
                type={type} placeholder={placeholder} value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={onKeyDown}
                className={`w-full h-12 px-4 ${rightElement ? 'pr-12' : ''} bg-white/10 text-white
                    placeholder:text-white/30 rounded-2xl text-sm border outline-none transition-all
                    focus:bg-white/15 focus:border-[#C9A84C]/60
                    ${error ? 'border-red-400/60' : 'border-white/10'}`}
            />
            {rightElement && (
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightElement}</div>
            )}
        </div>
        {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
        {helper && !error && <p className="text-xs text-white/35 mt-1">{helper}</p>}
    </div>
);

// ─── Shared: Select ───────────────────────────────────────────────────────────
const AuthSelect = ({
    label, value, onChange, options, error,
}: {
    label: string; value: string; onChange: (v: string) => void;
    options: string[]; error?: string;
}) => (
    <div className="space-y-1.5">
        <label className="block text-[13px] font-medium text-white/70">{label}</label>
        <select value={value} onChange={(e) => onChange(e.target.value)}
            className={`w-full h-12 px-4 bg-white/10 text-white rounded-2xl text-sm border
                outline-none transition-all focus:bg-white/15 focus:border-[#C9A84C]/60
                appearance-none cursor-pointer
                ${error ? 'border-red-400/60' : 'border-white/10'}
                [&>option]:bg-[#0F2340] [&>option]:text-white`}>
            <option value="">Select state</option>
            {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
);

// ─── Shared: Gold CTA ─────────────────────────────────────────────────────────
const GoldButton = ({
    children, onClick, disabled, loading,
}: {
    children: React.ReactNode; onClick?: () => void;
    disabled?: boolean; loading?: boolean;
}) => (
    <button onClick={onClick} disabled={disabled || loading}
        className="w-full h-12 bg-[#C9A84C] hover:bg-[#B8962E] disabled:opacity-50
            disabled:cursor-not-allowed text-white font-semibold text-sm
            rounded-2xl transition-colors flex items-center justify-center gap-2">
        {loading ? (
            <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {children}
            </>
        ) : children}
    </button>
);

// ─── Eye toggle ───────────────────────────────────────────────────────────────
const EyeToggle = ({ show, onToggle }: { show: boolean; onToggle: () => void }) => (
    <button type="button" onClick={onToggle}
        className="text-white/40 hover:text-white/70 transition-colors">
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
);

const STATES = ['Lagos', 'Abuja (FCT)', 'Rivers', 'Ogun', 'Oyo', 'Kano', 'Delta', 'Anambra', 'Enugu', 'Kaduna'];

interface RegForm {
    fullName: string; email: string; password: string; confirmPassword: string;
    companyName: string; cacNumber: string; contactName: string;
    phone: string; state: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 1 — REGISTRATION
// ═══════════════════════════════════════════════════════════════════════════════
const RegistrationScreen = ({ onComplete }: { onComplete: (email: string) => void }) => {
    const [step, setStep] = useState(1);
    const [showPw, setShowPw] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [errors, setErrors] = useState<Partial<RegForm>>({});
    const [form, setForm] = useState<RegForm>({
        fullName: '', email: '', password: '', confirmPassword: '',
        companyName: '', cacNumber: '', contactName: '', phone: '', state: '',
    });

    const set = (f: keyof RegForm, v: string) => {
        setForm((p) => ({ ...p, [f]: v }));
        setErrors((e) => ({ ...e, [f]: '' }));
    };

    const validate = () => {
        const e: Partial<RegForm> = {};
        if (step === 1) {
            if (!form.fullName.trim()) e.fullName = 'Full name is required';
            if (!form.email.includes('@')) e.email = 'Enter a valid email address';
            if (form.password.length < 8) e.password = 'Minimum 8 characters';
            if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
        }
        if (step === 2) {
            if (!form.companyName.trim()) e.companyName = 'Company name is required';
            if (!form.cacNumber.trim()) e.cacNumber = 'CAC number is required';
            if (!form.contactName.trim()) e.contactName = 'Contact name is required';
        }
        if (step === 3) {
            if (!form.phone.trim()) e.phone = 'Phone number is required';
            if (!form.state) e.state = 'Please select a state';
        }
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleContinue = () => {
        if (!validate()) return;
        if (step < 3) { setStep((s) => s + 1); return; }
        onComplete(form.email);
    };

    const stepFields = [
        <div key={1} className="space-y-4">
            <AuthInput label="Full name" placeholder="Enter your full name"
                value={form.fullName} onChange={(v) => set('fullName', v)} error={errors.fullName} />
            <AuthInput label="Email" placeholder="Enter your e-mail address" type="email"
                value={form.email} onChange={(v) => set('email', v)} error={errors.email} />
            <AuthInput label="Password" placeholder="Create a password"
                type={showPw ? 'text' : 'password'}
                value={form.password} onChange={(v) => set('password', v)}
                error={errors.password} helper="Minimum 8 characters"
                rightElement={<EyeToggle show={showPw} onToggle={() => setShowPw((s) => !s)} />} />
            <AuthInput label="Confirm Password" placeholder="Re-enter your password"
                type={showConfirm ? 'text' : 'password'}
                value={form.confirmPassword} onChange={(v) => set('confirmPassword', v)}
                error={errors.confirmPassword}
                rightElement={<EyeToggle show={showConfirm} onToggle={() => setShowConfirm((s) => !s)} />} />
        </div>,
        <div key={2} className="space-y-4">
            <AuthInput label="Company Name" placeholder="Enter your company/org. name"
                value={form.companyName} onChange={(v) => set('companyName', v)} error={errors.companyName} />
            <AuthInput label="CAC Registration Number" placeholder="e.g. RC-123456"
                value={form.cacNumber} onChange={(v) => set('cacNumber', v)}
                error={errors.cacNumber} helper="Format: RC-XXXXXX or BN-XXXXXX" />
            <AuthInput label="Contact Name" placeholder="Primary contact person"
                value={form.contactName} onChange={(v) => set('contactName', v)} error={errors.contactName} />
        </div>,
        <div key={3} className="space-y-4">
            <AuthInput label="Phone Number" placeholder="+234 — enter your phone number" type="tel"
                value={form.phone} onChange={(v) => set('phone', v)} error={errors.phone} />
            <AuthSelect label="State" value={form.state} onChange={(v) => set('state', v)}
                options={STATES} error={errors.state} />
        </div>,
    ];

    return (
        <div className="min-h-screen bg-[#062642] flex flex-col">
            <AuthNav rightLabel="Sign in" rightHref="/sign-in" />
            <div className="flex-1 flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-[440px]">
                    <div className="mb-6">
                        <p className="text-2xl font-bold text-white">
                            Step <span className="text-white/40 font-normal text-xl">{step}/3</span>
                        </p>
                        <p className="text-sm text-white/40 mt-1 mb-4">Please provide some of your information</p>
                        <ProgressBar step={step} total={3} />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-7 space-y-5">
                        {stepFields[step - 1]}
                        <GoldButton onClick={handleContinue}>
                            {step === 3 ? 'Create Account' : 'Continue'}
                        </GoldButton>
                    </div>
                    {step > 1 && (
                        <button onClick={() => setStep((s) => s - 1)}
                            className="w-full text-center text-sm text-white/30 hover:text-white/60 transition-colors mt-4">
                            ← Back
                        </button>
                    )}
                    {step === 1 && (
                        <p className="text-center text-sm text-white/30 mt-4">
                            Already have an account?{' '}
                            <Link href="/sign-in" className="text-[#C9A84C] hover:text-[#F0D080] transition-colors">
                                Sign in
                            </Link>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 2 — EMAIL OTP VERIFICATION
// ═══════════════════════════════════════════════════════════════════════════════
const EmailVerificationScreen = ({
    email, onVerified, onBack,
}: { email: string; onVerified: () => void; onBack: () => void }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(60);
    const [shake, setShake] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (resendTimer <= 0) return;
        const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
        return () => clearTimeout(t);
    }, [resendTimer]);

    const handleDigit = (idx: number, val: string) => {
        const digit = val.replace(/\D/g, '').slice(-1);
        const next = [...otp];
        next[idx] = digit;
        setOtp(next);
        setError('');
        if (digit && idx < 5) inputRefs.current[idx + 1]?.focus();
    };

    const handleKeyDown = (idx: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[idx] && idx > 0)
            inputRefs.current[idx - 1]?.focus();
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (text.length === 6) {
            setOtp(text.split(''));
            inputRefs.current[5]?.focus();
        }
    };

    const handleVerify = async () => {
        const code = otp.join('');
        if (code.length < 6) { setError('Please enter the full 6-digit code.'); return; }
        setLoading(true);
        await new Promise((r) => setTimeout(r, 900));
        setLoading(false);
        if (code !== '123456') {
            setError('Incorrect code. Try again.');
            setShake(true);
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
            setTimeout(() => setShake(false), 600);
            return;
        }
        onVerified();
    };

    return (
        <div className="min-h-screen bg-[#062642] flex flex-col">
            <AuthNav rightLabel="Sign in" rightHref="/sign-in" />
            <div className="flex-1 flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-[440px]">
                    <div className="w-16 h-16 rounded-2xl bg-[#C9A84C]/15 border border-[#C9A84C]/20
                        flex items-center justify-center mx-auto mb-6">
                        <Mail className="w-7 h-7 text-[#C9A84C]" />
                    </div>
                    <div className="text-center mb-7">
                        <h2 className="text-2xl font-bold text-white">Check your email</h2>
                        <p className="text-sm text-white/40 mt-2 leading-relaxed">
                            We sent a 6-digit code to{' '}
                            <span className="text-white/70 font-medium">{email}</span>
                        </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-7 space-y-6">
                        <div
                            className="flex gap-3 justify-center"
                            style={shake ? { animation: 'shake 0.5s ease-in-out' } : {}}>
                            {otp.map((digit, i) => (
                                <input key={i}
                                    ref={(el) => { inputRefs.current[i] = el; }}
                                    type="text" inputMode="numeric" maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleDigit(i, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(i, e)}
                                    onPaste={handlePaste}
                                    className={`w-11 h-14 text-center text-xl font-bold text-white
                                        bg-white/10 rounded-xl border outline-none transition-all
                                        focus:border-[#C9A84C] focus:bg-white/15
                                        ${error ? 'border-red-400/60' : digit ? 'border-[#C9A84C]/50' : 'border-white/10'}`}
                                />
                            ))}
                        </div>
                        {error && (
                            <div className="flex items-center gap-2 justify-center">
                                <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                                <p className="text-xs text-red-400">{error}</p>
                            </div>
                        )}
                        <GoldButton onClick={handleVerify} loading={loading}>
                            {loading ? 'Verifying…' : 'Verify Email'}
                        </GoldButton>
                        <div className="text-center">
                            {resendTimer > 0 ? (
                                <p className="text-xs text-white/30">
                                    Resend code in <span className="text-white/50 font-semibold">{resendTimer}s</span>
                                </p>
                            ) : (
                                <button onClick={() => { setResendTimer(60); setOtp(['', '', '', '', '', '']); setError(''); }}
                                    className="text-xs text-[#C9A84C] hover:text-[#F0D080] transition-colors font-medium">
                                    Resend code
                                </button>
                            )}
                        </div>
                    </div>
                    <button onClick={onBack}
                        className="w-full text-center text-sm text-white/30 hover:text-white/60 transition-colors mt-4">
                        ← Wrong email? Go back
                    </button>
                </div>
            </div>
            <style>{`@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}`}</style>
        </div>
    );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 3 — ONBOARDING CHECKLIST
// ═══════════════════════════════════════════════════════════════════════════════
const OnboardingChecklist = () => {
    const router = useRouter();

    const tasks = [
        { label: 'Upload your first document', desc: 'Add a company document to begin your verification process.', icon: Upload, done: true, href: '/dashboard/upload' },
        { label: 'Complete company profile', desc: 'Add your company logo, description, and contact details.', icon: Building2, done: true, href: '/dashboard' },
        { label: 'Invite a team member', desc: 'Collaborate with your team by inviting colleagues.', icon: Users, done: false, href: '/dashboard' },
    ];

    const completedCount = tasks.filter((t) => t.done).length;
    const percent = Math.round((completedCount / tasks.length) * 100);
    const nextTask = tasks.find((t) => !t.done);
    const r = 18; const circ = 2 * Math.PI * r; const dash = (percent / 100) * circ;

    return (
        <div className="min-h-screen bg-[#062642] flex flex-col">
            <AuthNav rightLabel="Sign in" rightHref="/sign-in" />
            <div className="flex-1 flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-[480px]">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-white">You're almost ready</h1>
                        <p className="text-sm text-white/40 mt-1">Complete these steps to unlock the full power of your dashboard.</p>
                    </div>
                    {/* Progress card */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 mb-3 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-white/40 font-medium">Setup progress</p>
                            <p className="text-[17px] font-bold text-[#C9A84C] mt-0.5">{completedCount} of {tasks.length} completed</p>
                        </div>
                        <div className="relative w-12 h-12">
                            <svg width="48" height="48" viewBox="0 0 48 48" className="-rotate-90">
                                <circle cx="24" cy="24" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                                <circle cx="24" cy="24" r={r} fill="none" stroke="#C9A84C" strokeWidth="4"
                                    strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-[#C9A84C]">{percent}%</span>
                        </div>
                    </div>
                    {/* Tasks */}
                    <div className="space-y-2 mb-5">
                        {tasks.map((task, i) => {
                            const Icon = task.icon;
                            return (
                                <div key={i} onClick={() => !task.done && router.push(task.href)}
                                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all
                                        ${task.done ? 'bg-white/5 border-white/10' : 'bg-white/5 border-white/10 hover:border-[#C9A84C]/40 cursor-pointer'}`}>
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${task.done ? 'bg-[#C9A84C]/15' : 'bg-white/8'}`}>
                                        {task.done
                                            ? <CheckCircle2 className="w-5 h-5 text-[#C9A84C]" />
                                            : <Icon className="w-4 h-4 text-white/40" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm font-semibold leading-tight ${task.done ? 'text-[#C9A84C]' : 'text-white'}`}>{task.label}</p>
                                        <p className="text-xs text-white/40 mt-0.5 leading-snug">{task.desc}</p>
                                    </div>
                                    {!task.done && <ChevronRight className="w-4 h-4 text-white/30 shrink-0" />}
                                </div>
                            );
                        })}
                    </div>
                    <GoldButton onClick={() => router.push(nextTask?.href ?? '/dashboard/upload')}>
                        {nextTask ? 'Upload your document' : 'Go to Dashboard →'}
                    </GoldButton>
                    <button onClick={() => router.push('/dashboard')}
                        className="w-full text-center text-sm text-white/25 hover:text-white/50 transition-colors mt-4">
                        Skip for now
                    </button>
                </div>
            </div>
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
};

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT — Orchestrates the full flow
// ═══════════════════════════════════════════════════════════════════════════════
type Screen = 'register' | 'verify' | 'checklist';

export default function RegisterPage() {
    const [screen, setScreen] = useState<Screen>('register');
    const [email, setEmail] = useState('');

    if (screen === 'register') return (
        <RegistrationScreen onComplete={(e) => { setEmail(e); setScreen('verify'); }} />
    );
    if (screen === 'verify') return (
        <EmailVerificationScreen email={email} onVerified={() => setScreen('checklist')} onBack={() => setScreen('register')} />
    );
    return <OnboardingChecklist />;
}