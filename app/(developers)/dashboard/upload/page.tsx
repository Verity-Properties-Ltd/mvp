'use client';

import React, { useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    MapPin, ChevronDown, Landmark, Building2, Store, Home,
    Upload, X, FileText, CheckCircle2, Plus, Download,
    AlertCircle, Eye, Loader2,
} from 'lucide-react';
import { CsvRow, FormData, TitleEntry } from '@/types';


// ─── Constants ────────────────────────────────────────────────────────────────
const LAGOS_LGAS = [
    'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa',
    'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye',
    'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland',
    'Mushin', 'Ojo', 'Oshodi-Isolo', 'Shomolu', 'Surulere',
];

const TITLE_TYPES = [
    'Certificate of Occupancy (C of O)',
    'Deed of Assignment',
    'Survey Plan',
    "Governor's Consent",
    'Gazette Entry',
    'Excision',
    'Registered Survey',
    'Other',
];

const PROPERTY_TYPES = [
    { id: 'Landed Property', label: 'Landed Property', desc: 'Bare land with no structure', icon: Landmark },
    { id: 'Apartment Building', label: 'Apartment Building', desc: 'Multi-unit residential building', icon: Building2 },
    { id: 'Commercial Space', label: 'Commercial Space', desc: 'Office or retail space', icon: Store },
    { id: 'Duplex', label: 'Duplex', desc: 'Two-unit residential property', icon: Home },
];

const INITIAL_FORM: FormData = {
    propertyName: '', address: '', gpsLat: '', gpsLon: '',
    lga: '', state: 'Lagos', propertyType: '',
    bedrooms: '', bathrooms: '', sizeSqft: '', description: '',
    titles: [{ id: crypto.randomUUID(), titleType: '', ownerName: '', file: null }],
    photos: [],
};

// ─── Shared UI components ─────────────────────────────────────────────────────
const Label = ({ children, required }: { children: React.ReactNode; required?: boolean }) => (
    <label className="block text-sm font-semibold text-[#111827] mb-1.5">
        {children}{required && <span className="text-[#DC2626] ml-0.5">*</span>}
    </label>
);

const Input = ({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props} className={`w-full h-11 px-4 text-sm text-[#111827] bg-white border border-[#E5E7EB]
        rounded-xl placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0D7A5F]/20
        focus:border-[#0D7A5F] transition-colors ${className}`} />
);

const SelectField = ({ children, className = '', ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
    <div className="relative">
        <select {...props} className={`w-full h-11 pl-4 pr-10 text-sm text-[#111827] bg-white border
            border-[#E5E7EB] rounded-xl appearance-none focus:outline-none focus:ring-2
            focus:ring-[#0D7A5F]/20 focus:border-[#0D7A5F] transition-colors ${className}`}>
            {children}
        </select>
        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
    </div>
);

const Textarea = ({ ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea {...props} className="w-full px-4 py-3 text-sm text-[#111827] bg-white border border-[#E5E7EB]
        rounded-xl placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0D7A5F]/20
        focus:border-[#0D7A5F] transition-colors resize-none" />
);

// ─── Step indicator ───────────────────────────────────────────────────────────
const steps = [
    { n: 1, label: 'Property Details' },
    { n: 2, label: 'Title & Documents' },
    { n: 3, label: 'Review & Submit' },
];

const StepIndicator = ({ current }: { current: number }) => (
    <div className="bg-white border border-[#F3F4F6] rounded-2xl mb-6">
        <div className="flex items-center px-8 py-5">
            {steps.map((step, idx) => (
                <React.Fragment key={step.n}>
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors
                            ${current === step.n ? 'bg-[#0F2340] text-white' :
                                current > step.n ? 'bg-[#0D7A5F] text-white' :
                                    'bg-[#F3F4F6] text-[#9CA3AF]'}`}>
                            {current > step.n ? <CheckCircle2 className="w-4 h-4" /> : step.n}
                        </div>
                        <div>
                            <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wide font-medium">Step {step.n}</p>
                            <p className={`text-sm font-semibold leading-tight ${current === step.n ? 'text-[#111827]' : 'text-[#9CA3AF]'}`}>
                                {step.label}
                            </p>
                        </div>
                    </div>
                    {idx < steps.length - 1 && (
                        <div className={`flex-1 h-px mx-6 transition-colors ${current > step.n ? 'bg-[#0D7A5F]' : 'bg-[#E5E7EB]'}`} />
                    )}
                </React.Fragment>
            ))}
        </div>
    </div>
);

// ─── Review row ───────────────────────────────────────────────────────────────
const ReviewRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-start py-3 border-b border-[#F3F4F6] last:border-0">
        <span className="w-48 shrink-0 text-sm text-[#6B7280]">{label}</span>
        <span className="text-sm font-medium text-[#111827]">{value || '—'}</span>
    </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// SINGLE PROPERTY FORM
// ═══════════════════════════════════════════════════════════════════════════════
const SinglePropertyForm = ({ isEdit }: { isEdit: boolean }) => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [form, setForm] = useState<FormData>(INITIAL_FORM);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const photoInputRef = useRef<HTMLInputElement>(null);

    const setField = (field: keyof FormData, value: string) => {
        setForm((f) => ({ ...f, [field]: value }));
        setErrors((e) => ({ ...e, [field]: '' }));
    };

    // ── Title entries ──
    const addTitle = () => setForm((f) => ({
        ...f,
        titles: [...f.titles, { id: crypto.randomUUID(), titleType: '', ownerName: '', file: null }],
    }));

    const removeTitle = (id: string) => setForm((f) => ({
        ...f, titles: f.titles.filter((t) => t.id !== id),
    }));

    const updateTitle = (id: string, field: keyof TitleEntry, value: string | File | null) => {
        setForm((f) => ({
            ...f,
            titles: f.titles.map((t) => t.id === id ? { ...t, [field]: value } : t),
        }));
        setErrors((e) => ({ ...e, [`title_${id}_${field}`]: '' }));
    };

    // ── Validation ──
    const validateStep1 = () => {
        const e: Record<string, string> = {};
        if (!form.address.trim()) e.address = 'Property address is required';
        if (!form.lga) e.lga = 'Please select an LGA';
        if (!form.propertyType) e.propertyType = 'Please select a property type';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const validateStep2 = () => {
        const e: Record<string, string> = {};
        form.titles.forEach((t) => {
            if (!t.titleType) e[`title_${t.id}_titleType`] = 'Select a title type';
            if (!t.ownerName.trim()) e[`title_${t.id}_ownerName`] = 'Owner name is required';
            if (!t.file) e[`title_${t.id}_file`] = 'Upload the document for this title';
        });
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleNext = () => {
        if (step === 1 && !validateStep1()) return;
        if (step === 2 && !validateStep2()) return;
        setStep((s) => s + 1);
        window.scrollTo(0, 0);
    };

    const handleSubmit = () => {
        console.log('Submit:', form);
        router.push('/dashboard/properties');
    };

    // ── Step 1 ──
    const renderStep1 = () => (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-[#111827]">Property Details</h2>
                <p className="text-sm text-[#6B7280] mt-1">Provide the basic information about the property.</p>
            </div>

            <div>
                <Label>Property Name</Label>
                <Input placeholder="e.g. Lekki Tower Block A (optional)"
                    value={form.propertyName} onChange={(e) => setField('propertyName', e.target.value)} />
            </div>

            <div>
                <Label required>Property Address</Label>
                <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                    <input placeholder="Start typing address..." value={form.address}
                        onChange={(e) => setField('address', e.target.value)}
                        className={`w-full h-11 pl-10 pr-4 text-sm text-[#111827] bg-white border rounded-xl
                            placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0D7A5F]/20
                            focus:border-[#0D7A5F] transition-colors
                            ${errors.address ? 'border-[#DC2626]' : 'border-[#E5E7EB]'}`} />
                </div>
                {errors.address && <p className="text-xs text-[#DC2626] mt-1">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label>GPS Latitude</Label>
                    <Input placeholder="e.g. 6.4281" value={form.gpsLat}
                        onChange={(e) => setField('gpsLat', e.target.value)} />
                </div>
                <div>
                    <Label>GPS Longitude</Label>
                    <Input placeholder="e.g. 3.4219" value={form.gpsLon}
                        onChange={(e) => setField('gpsLon', e.target.value)} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label required>Local Government Area (LGA)</Label>
                    <SelectField value={form.lga} onChange={(e) => setField('lga', e.target.value)}>
                        <option value="">Select LGA</option>
                        {LAGOS_LGAS.map((l) => <option key={l} value={l}>{l}</option>)}
                    </SelectField>
                    {errors.lga && <p className="text-xs text-[#DC2626] mt-1">{errors.lga}</p>}
                </div>
                <div>
                    <Label required>State</Label>
                    <SelectField value={form.state} onChange={(e) => setField('state', e.target.value)}>
                        {['Lagos', 'Abuja', 'Rivers', 'Ogun', 'Oyo'].map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </SelectField>
                </div>
            </div>

            <div>
                <Label required>Property Type</Label>
                {errors.propertyType && <p className="text-xs text-[#DC2626] mb-2">{errors.propertyType}</p>}
                <div className="grid grid-cols-2 gap-3">
                    {PROPERTY_TYPES.map(({ id, label, desc, icon: Icon }) => {
                        const active = form.propertyType === id;
                        return (
                            <button key={id} type="button" onClick={() => setField('propertyType', id)}
                                className={`flex flex-col items-start gap-2 p-4 rounded-xl border-2 text-left transition-all
                                    ${active ? 'border-[#0D7A5F] bg-[#E6F4F0]' : 'border-[#E5E7EB] hover:border-[#D1D5DB] bg-white'}`}>
                                <Icon className={`w-6 h-6 ${active ? 'text-[#0D7A5F]' : 'text-[#9CA3AF]'}`} />
                                <div>
                                    <p className={`text-sm font-semibold ${active ? 'text-[#0D7A5F]' : 'text-[#111827]'}`}>{label}</p>
                                    <p className="text-xs text-[#6B7280] mt-0.5">{desc}</p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {form.propertyType && form.propertyType !== 'Landed Property' && (
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <Label>Bedrooms</Label>
                        <SelectField value={form.bedrooms} onChange={(e) => setField('bedrooms', e.target.value)}>
                            <option value="">Select</option>
                            {['Studio', '1', '2', '3', '4', '5', '6+'].map((n) => <option key={n} value={n}>{n}</option>)}
                        </SelectField>
                    </div>
                    <div>
                        <Label>Bathrooms</Label>
                        <SelectField value={form.bathrooms} onChange={(e) => setField('bathrooms', e.target.value)}>
                            <option value="">Select</option>
                            {['1', '2', '3', '4', '5+'].map((n) => <option key={n} value={n}>{n}</option>)}
                        </SelectField>
                    </div>
                    <div>
                        <Label>Size (sqft)</Label>
                        <Input type="number" placeholder="e.g. 1200" value={form.sizeSqft}
                            onChange={(e) => setField('sizeSqft', e.target.value)} />
                    </div>
                </div>
            )}

            {form.propertyType === 'Landed Property' && (
                <div>
                    <Label>Plot Size (sqft)</Label>
                    <Input type="number" placeholder="e.g. 5000" value={form.sizeSqft}
                        onChange={(e) => setField('sizeSqft', e.target.value)} />
                </div>
            )}

            <div>
                <Label>Description</Label>
                <Textarea rows={4} placeholder="Describe the property — location highlights, features, nearby landmarks..."
                    value={form.description} onChange={(e) => setField('description', e.target.value)} />
            </div>
        </div>
    );

    // ── Step 2 ──
    const renderStep2 = () => (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-[#111827]">Title & Documents</h2>
                <p className="text-sm text-[#6B7280] mt-1">
                    Add each title document separately. Select the title type, enter the registered owner, then upload the corresponding document.
                </p>
            </div>

            {/* Title entries */}
            <div className="space-y-4">
                {form.titles.map((title, idx) => {
                    const titleTypeErr = errors[`title_${title.id}_titleType`];
                    const ownerErr = errors[`title_${title.id}_ownerName`];
                    const fileErr = errors[`title_${title.id}_file`];
                    const fileInputRef = React.createRef<HTMLInputElement>();

                    return (
                        <div key={title.id} className="border border-[#E5E7EB] rounded-xl overflow-hidden">
                            {/* Entry header */}
                            <div className="flex items-center justify-between px-5 py-3 bg-[#F9FAFB] border-b border-[#E5E7EB]">
                                <p className="text-sm font-semibold text-[#374151]">
                                    Title Document {idx + 1}
                                </p>
                                {form.titles.length > 1 && (
                                    <button type="button" onClick={() => removeTitle(title.id)}
                                        className="text-[#9CA3AF] hover:text-[#DC2626] transition-colors p-1 rounded-lg hover:bg-[#FEE2E2]">
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            <div className="p-5 space-y-4">
                                {/* Title type + owner in 2 cols */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label required>Title Type</Label>
                                        <SelectField
                                            value={title.titleType}
                                            onChange={(e) => updateTitle(title.id, 'titleType', e.target.value)}
                                            className={titleTypeErr ? 'border-[#DC2626]' : ''}
                                        >
                                            <option value="">Select title type</option>
                                            {TITLE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                                        </SelectField>
                                        {titleTypeErr && <p className="text-xs text-[#DC2626] mt-1">{titleTypeErr}</p>}
                                    </div>
                                    <div>
                                        <Label required>Registered Owner Name</Label>
                                        <Input
                                            placeholder="As it appears on the document"
                                            value={title.ownerName}
                                            onChange={(e) => updateTitle(title.id, 'ownerName', e.target.value)}
                                            className={ownerErr ? 'border-[#DC2626]' : ''}
                                        />
                                        {ownerErr && <p className="text-xs text-[#DC2626] mt-1">{ownerErr}</p>}
                                    </div>
                                </div>

                                {/* Document upload for this specific title */}
                                <div>
                                    <Label required>
                                        Upload Document
                                        {title.titleType && (
                                            <span className="ml-1.5 text-xs font-normal text-[#9CA3AF]">
                                                — {title.titleType}
                                            </span>
                                        )}
                                    </Label>

                                    {title.file ? (
                                        // File selected state
                                        <div className="flex items-center gap-3 bg-[#F0FDF9] border border-[#BBF7D0] rounded-xl px-4 py-3">
                                            <FileText className="w-4 h-4 text-[#15803D] shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-[#111827] truncate">{title.file.name}</p>
                                                <p className="text-xs text-[#6B7280]">{(title.file.size / 1024 / 1024).toFixed(1)} MB</p>
                                            </div>
                                            <button type="button"
                                                onClick={() => updateTitle(title.id, 'file', null)}
                                                className="text-[#9CA3AF] hover:text-[#DC2626] transition-colors shrink-0">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        // Upload dropzone
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors
                                                ${fileErr ? 'border-[#DC2626] bg-[#FEF2F2]' : 'border-[#E5E7EB] hover:border-[#0D7A5F] hover:bg-[#F9FAFB]'}`}
                                        >
                                            <Upload className={`w-5 h-5 mx-auto mb-1.5 ${fileErr ? 'text-[#DC2626]' : 'text-[#9CA3AF]'}`} />
                                            <p className="text-sm font-medium text-[#374151]">
                                                {title.titleType
                                                    ? `Upload ${title.titleType}`
                                                    : 'Upload document'}
                                            </p>
                                            <p className="text-xs text-[#9CA3AF] mt-0.5">PDF, JPG, or PNG — max 20MB</p>
                                            <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden"
                                                onChange={(e) => {
                                                    const f = e.target.files?.[0];
                                                    if (f) updateTitle(title.id, 'file', f);
                                                }} />
                                        </div>
                                    )}
                                    {fileErr && <p className="text-xs text-[#DC2626] mt-1">{fileErr}</p>}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Add another title */}
            <button type="button" onClick={addTitle}
                className="flex items-center gap-2 text-sm font-semibold text-[#0D7A5F] hover:text-[#0A6450] transition-colors">
                <Plus className="w-4 h-4" />
                Add another title document
            </button>

            {/* Photos */}
            <div className="pt-2 border-t border-[#F3F4F6]">
                <Label>Property Photos</Label>
                <p className="text-xs text-[#9CA3AF] mb-3">
                    Recommended: front view, interior, surrounding area. Helps agents and buyers on the marketplace.
                </p>
                {form.photos.length > 0 ? (
                    <div className="space-y-2 mb-3">
                        {form.photos.map((f, i) => (
                            <div key={i} className="flex items-center gap-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-2.5">
                                <FileText className="w-4 h-4 text-[#6B7280] shrink-0" />
                                <span className="text-sm text-[#374151] flex-1 truncate">{f.name}</span>
                                <span className="text-xs text-[#9CA3AF] shrink-0">{(f.size / 1024 / 1024).toFixed(1)} MB</span>
                                <button type="button"
                                    onClick={() => setForm((d) => ({ ...d, photos: d.photos.filter((_, idx) => idx !== i) }))}
                                    className="text-[#9CA3AF] hover:text-[#DC2626] transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : null}
                <div onClick={() => photoInputRef.current?.click()}
                    className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-5 text-center cursor-pointer hover:border-[#0D7A5F] hover:bg-[#F9FAFB] transition-colors">
                    <Upload className="w-5 h-5 mx-auto mb-1.5 text-[#9CA3AF]" />
                    <p className="text-sm font-medium text-[#374151]">Upload photos</p>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">JPG or PNG — multiple files allowed</p>
                    <input ref={photoInputRef} type="file" accept="image/*" multiple className="hidden"
                        onChange={(e) => {
                            const files = Array.from(e.target.files ?? []);
                            setForm((d) => ({ ...d, photos: [...d.photos, ...files] }));
                        }} />
                </div>
            </div>

            {/* Security note */}
            <div className="flex items-start gap-3 bg-[#F0FDF9] border border-[#BBF7D0] rounded-xl px-4 py-3">
                <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                <p className="text-xs text-[#15803D] leading-relaxed">
                    Documents are encrypted at rest (AWS S3) and only accessed by Verity-certified analysts during verification.
                </p>
            </div>
        </div>
    );

    // ── Step 3 ──
    const renderStep3 = () => (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-[#111827]">Review & Submit</h2>
                <p className="text-sm text-[#6B7280] mt-1">Review all details before submitting for verification.</p>
            </div>

            <div className="bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] px-5 py-1">
                <div className="flex items-center justify-between pt-3 pb-2 border-b border-[#E5E7EB]">
                    <p className="text-sm font-bold text-[#111827]">Property Details</p>
                    <button type="button" onClick={() => setStep(1)}
                        className="text-xs font-semibold text-[#0D7A5F] hover:underline">Edit</button>
                </div>
                <ReviewRow label="Property Name" value={form.propertyName || 'Not provided'} />
                <ReviewRow label="Address" value={form.address} />
                <ReviewRow label="LGA / State" value={`${form.lga}, ${form.state}`} />
                <ReviewRow label="Property Type" value={form.propertyType} />
                {form.propertyType !== 'Landed Property' && (
                    <ReviewRow label="Bedrooms / Bathrooms" value={`${form.bedrooms || '—'} bed / ${form.bathrooms || '—'} bath`} />
                )}
                <ReviewRow label="Size" value={form.sizeSqft ? `${form.sizeSqft} sqft` : '—'} />
                <ReviewRow label="GPS" value={form.gpsLat && form.gpsLon ? `${form.gpsLat}, ${form.gpsLon}` : 'Not provided'} />
            </div>

            <div className="bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] px-5 py-1">
                <div className="flex items-center justify-between pt-3 pb-2 border-b border-[#E5E7EB]">
                    <p className="text-sm font-bold text-[#111827]">Title Documents ({form.titles.length})</p>
                    <button type="button" onClick={() => setStep(2)}
                        className="text-xs font-semibold text-[#0D7A5F] hover:underline">Edit</button>
                </div>
                {form.titles.map((t, i) => (
                    <div key={t.id} className="py-3 border-b border-[#F3F4F6] last:border-0">
                        <div className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-[#0D7A5F] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                                {i + 1}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-[#111827]">{t.titleType}</p>
                                <p className="text-xs text-[#6B7280] mt-0.5">Owner: {t.ownerName}</p>
                                <p className="text-xs text-[#9CA3AF] mt-0.5">{t.file?.name}</p>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="py-3">
                    <ReviewRow label="Photos" value={form.photos.length > 0 ? `${form.photos.length} photo(s) uploaded` : 'None'} />
                </div>
            </div>

            <div className="bg-[#EBF2FA] border border-[#BFDBFE] rounded-xl px-5 py-4">
                <p className="text-sm font-bold text-[#1B3F6B] mb-2">What happens after you submit?</p>
                <ol className="space-y-1.5">
                    {[
                        'Property enters the verification queue immediately.',
                        'AI pipeline processes title documents (within 1 hour).',
                        'A Verity-certified analyst reviews all findings.',
                        'Email notification sent once complete (standard: 2 hours).',
                        'Verified properties appear automatically on the marketplace.',
                    ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[#2A5298]">
                            <span className="w-4 h-4 rounded-full bg-[#2A5298] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                                {i + 1}
                            </span>
                            {item}
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );

    return (
        <>
            <StepIndicator current={step} />
            <div className="bg-white border border-[#F3F4F6] rounded-2xl">
                <div className="px-8 py-8">
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                    {step === 3 && renderStep3()}

                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#F3F4F6]">
                        <button type="button"
                            onClick={() => step === 1 ? router.back() : setStep((s) => s - 1)}
                            className="px-5 py-2.5 rounded-xl border border-[#E5E7EB] text-sm font-semibold text-[#374151] hover:bg-[#F9FAFB] transition-colors">
                            {step === 1 ? 'Cancel' : '← Back'}
                        </button>
                        {step < 3 ? (
                            <button type="button" onClick={handleNext}
                                className="px-6 py-2.5 cursor-pointer rounded-xl bg-[#0D7A5F] hover:bg-[#0A6450] text-white text-sm font-semibold transition-colors">
                                Continue →
                            </button>
                        ) : (
                            <button type="button" onClick={handleSubmit}
                                className="px-6 py-2.5 cursor-pointer rounded-xl bg-[#0D7A5F] hover:bg-[#0A6450] text-white text-sm font-semibold transition-colors">
                                {isEdit ? 'Save Changes' : 'Submit for Verification'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

// ═══════════════════════════════════════════════════════════════════════════════
// BULK CSV UPLOAD
// ═══════════════════════════════════════════════════════════════════════════════
const CSV_TEMPLATE_HEADERS = 'address,lga,state,property_type,title_type,owner_name,gps_lat,gps_lon,description';
const CSV_TEMPLATE_EXAMPLE = '15 Admiralty Way Lekki,Eti-Osa,Lagos,Apartment Building,Certificate of Occupancy (C of O),John Adeyemi,6.4281,3.4219,Luxury apartment in Lekki Phase 1';

type BulkStep = 'upload' | 'preview' | 'submitting' | 'done';

const BulkCsvUpload = () => {
    const router = useRouter();
    const fileRef = useRef<HTMLInputElement>(null);
    const [bulkStep, setBulkStep] = useState<BulkStep>('upload');
    const [csvFile, setCsvFile] = useState<File | null>(null);
    const [dragging, setDragging] = useState(false);
    const [rows, setRows] = useState<CsvRow[]>([]);
    const [progress, setProgress] = useState(0);

    const downloadTemplate = () => {
        const content = `${CSV_TEMPLATE_HEADERS}\n${CSV_TEMPLATE_EXAMPLE}`;
        const blob = new Blob([content], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'verity_bulk_upload_template.csv';
        a.click(); URL.revokeObjectURL(url);
    };

    const parseCSV = (text: string): CsvRow[] => {
        const lines = text.trim().split('\n');
        const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
        return lines.slice(1).map((line) => {
            const vals = line.split(',').map((v) => v.trim());
            const row: Record<string, string> = {};
            headers.forEach((h, i) => { row[h] = vals[i] ?? ''; });

            const errors: string[] = [];
            if (!row['address']) errors.push('Missing address');
            if (!row['lga']) errors.push('Missing LGA');
            if (!row['property_type']) errors.push('Missing property type');
            if (!row['title_type']) errors.push('Missing title type');
            if (!row['owner_name']) errors.push('Missing owner name');

            return {
                address: row['address'] ?? '',
                lga: row['lga'] ?? '',
                property_type: row['property_type'] ?? '',
                title_type: row['title_type'] ?? '',
                owner_name: row['owner_name'] ?? '',
                gps_lat: row['gps_lat'] ?? '',
                gps_lon: row['gps_lon'] ?? '',
                status: errors.length > 0 ? 'error' : 'valid',
                error: errors.join(', '),
            };
        });
    };

    const handleFile = (file: File) => {
        if (!file.name.endsWith('.csv')) return;
        setCsvFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            const parsed = parseCSV(e.target?.result as string);
            setRows(parsed);
            setBulkStep('preview');
        };
        reader.readAsText(file);
    };

    const validRows = rows.filter((r) => r.status === 'valid');
    const invalidRows = rows.filter((r) => r.status === 'error');

    const handleSubmitBulk = () => {
        setBulkStep('submitting');
        let p = 0;
        const interval = setInterval(() => {
            p += Math.floor(Math.random() * 15) + 5;
            if (p >= 100) { p = 100; clearInterval(interval); setBulkStep('done'); }
            setProgress(p);
        }, 400);
    };

    // Upload state
    if (bulkStep === 'upload') return (
        <div className="bg-white border border-[#F3F4F6] rounded-2xl px-8 py-8 space-y-6">
            <div>
                <h2 className="text-xl font-bold text-[#111827]">Bulk Upload via CSV</h2>
                <p className="text-sm text-[#6B7280] mt-1">
                    Upload up to 500 properties at once. Download the template, fill it in, then upload.
                </p>
            </div>

            {/* Template download */}
            <div className="flex items-start gap-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-5">
                <div className="w-10 h-10 rounded-xl bg-[#EBF2FA] flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-[#2A5298]" />
                </div>
                <div className="flex-1">
                    <p className="text-sm font-semibold text-[#111827]">Verity Bulk Upload Template</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">
                        CSV with required columns: address, lga, state, property_type, title_type, owner_name, gps_lat, gps_lon, description
                    </p>
                </div>
                <button onClick={downloadTemplate}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#E5E7EB] text-sm font-semibold text-[#374151] hover:bg-white transition-colors shrink-0">
                    <Download className="w-4 h-4" />
                    Download
                </button>
            </div>

            {/* CSV dropzone */}
            <div>
                <Label required>Upload CSV File</Label>
                <div
                    onClick={() => fileRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => {
                        e.preventDefault(); setDragging(false);
                        const f = e.dataTransfer.files[0];
                        if (f) handleFile(f);
                    }}
                    className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors
                        ${dragging ? 'border-[#0D7A5F] bg-[#E6F4F0]' : 'border-[#E5E7EB] hover:border-[#0D7A5F] hover:bg-[#F9FAFB]'}`}
                >
                    <Upload className={`w-8 h-8 mx-auto mb-3 ${dragging ? 'text-[#0D7A5F]' : 'text-[#D1D5DB]'}`} />
                    <p className="text-sm font-semibold text-[#374151]">Drop your CSV file here</p>
                    <p className="text-xs text-[#9CA3AF] mt-1">or click to browse — .csv files only</p>
                    <input ref={fileRef} type="file" accept=".csv" className="hidden"
                        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
                </div>
            </div>

            {/* Notes */}
            <div className="flex items-start gap-3 bg-[#FEF3C7] border border-[#FDE68A] rounded-xl px-4 py-3">
                <AlertCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                <div className="text-xs text-[#92400E] space-y-0.5">
                    <p className="font-semibold">Before uploading</p>
                    <p>Title documents must be uploaded individually per property after bulk upload is processed. The CSV sets up the property records — you'll be prompted to attach documents after.</p>
                </div>
            </div>
        </div>
    );

    // Preview state
    if (bulkStep === 'preview') return (
        <div className="bg-white border border-[#F3F4F6] rounded-2xl px-8 py-8 space-y-6">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-xl font-bold text-[#111827]">Preview & Confirm</h2>
                    <p className="text-sm text-[#6B7280] mt-1">
                        {csvFile?.name} · {rows.length} rows detected
                    </p>
                </div>
                <button onClick={() => { setBulkStep('upload'); setCsvFile(null); setRows([]); }}
                    className="text-sm text-[#6B7280] hover:text-[#374151] flex items-center gap-1">
                    <X className="w-4 h-4" /> Change file
                </button>
            </div>

            {/* Summary pills */}
            <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#DCFCE7] text-[#15803D] text-sm font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                    {validRows.length} valid
                </span>
                {invalidRows.length > 0 && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FEE2E2] text-[#DC2626] text-sm font-semibold">
                        <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
                        {invalidRows.length} with errors
                    </span>
                )}
            </div>

            {/* Preview table */}
            <div className="border border-[#E5E7EB] rounded-xl overflow-hidden">
                <div className="overflow-x-auto max-h-[380px] overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-[#F9FAFB] border-b border-[#E5E7EB]">
                            <tr>
                                {['#', 'Address', 'LGA', 'Type', 'Title Type', 'Owner', 'Status'].map((h) => (
                                    <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, i) => (
                                <tr key={i} className={`border-b border-[#F9FAFB] ${row.status === 'error' ? 'bg-[#FFF5F5]' : i % 2 === 1 ? 'bg-[#FAFAFA]' : 'bg-white'}`}>
                                    <td className="px-4 py-3 text-[#9CA3AF] font-mono text-xs">{i + 1}</td>
                                    <td className="px-4 py-3 text-[#111827] font-medium max-w-[200px] truncate">{row.address || <span className="text-[#DC2626]">Missing</span>}</td>
                                    <td className="px-4 py-3 text-[#6B7280]">{row.lga || '—'}</td>
                                    <td className="px-4 py-3 text-[#6B7280]">{row.property_type || '—'}</td>
                                    <td className="px-4 py-3 text-[#6B7280]">{row.title_type || '—'}</td>
                                    <td className="px-4 py-3 text-[#6B7280]">{row.owner_name || '—'}</td>
                                    <td className="px-4 py-3">
                                        {row.status === 'valid' ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] text-xs font-semibold">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" /> Valid
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FEE2E2] text-[#DC2626] text-xs font-semibold"
                                                title={row.error}>
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" /> Error
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {invalidRows.length > 0 && (
                <div className="flex items-start gap-3 bg-[#FEF2F2] border border-[#FECACA] rounded-xl px-4 py-3">
                    <AlertCircle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                    <p className="text-xs text-[#991B1B]">
                        <span className="font-semibold">{invalidRows.length} row{invalidRows.length > 1 ? 's' : ''} have errors</span> and will be skipped.
                        Fix them in your CSV and re-upload, or proceed with the {validRows.length} valid properties.
                    </p>
                </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-[#F3F4F6]">
                <button onClick={() => { setBulkStep('upload'); setCsvFile(null); setRows([]); }}
                    className="px-5 py-2.5 rounded-xl border border-[#E5E7EB] text-sm font-semibold text-[#374151] hover:bg-[#F9FAFB] transition-colors">
                    ← Back
                </button>
                <button onClick={handleSubmitBulk} disabled={validRows.length === 0}
                    className="px-6 py-2.5 rounded-xl bg-[#0D7A5F] hover:bg-[#0A6450] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors">
                    Submit {validRows.length} Propert{validRows.length === 1 ? 'y' : 'ies'} for Verification
                </button>
            </div>
        </div>
    );

    // Submitting state
    if (bulkStep === 'submitting') return (
        <div className="bg-white border border-[#F3F4F6] rounded-2xl px-8 py-16 flex flex-col items-center text-center gap-6">
            <Loader2 className="w-10 h-10 text-[#0D7A5F] animate-spin" />
            <div>
                <h2 className="text-xl font-bold text-[#111827]">Uploading properties…</h2>
                <p className="text-sm text-[#6B7280] mt-1">Processing {validRows.length} properties</p>
            </div>
            <div className="w-full max-w-sm">
                <div className="flex justify-between text-xs text-[#6B7280] mb-1.5">
                    <span>Progress</span><span>{progress}%</span>
                </div>
                <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                    <div className="h-full bg-[#0D7A5F] rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }} />
                </div>
            </div>
        </div>
    );

    // Done state
    return (
        <div className="bg-white border border-[#F3F4F6] rounded-2xl px-8 py-16 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#DCFCE7] flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-[#15803D]" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-[#111827]">{validRows.length} properties uploaded!</h2>
                <p className="text-sm text-[#6B7280] mt-1">
                    They've entered the verification queue. You'll receive an email once processing is complete.
                </p>
            </div>
            <div className="flex items-center gap-3 mt-2">
                <button onClick={() => { setBulkStep('upload'); setCsvFile(null); setRows([]); setProgress(0); }}
                    className="px-5 py-2.5 rounded-xl border border-[#E5E7EB] text-sm font-semibold text-[#374151] hover:bg-[#F9FAFB] transition-colors">
                    Upload another batch
                </button>
                <button onClick={() => router.push('/dashboard/properties')}
                    className="px-5 py-2.5 rounded-xl bg-[#0D7A5F] hover:bg-[#0A6450] text-white text-sm font-semibold transition-colors">
                    View properties →
                </button>
            </div>
        </div>
    );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE — wires both modes together
// ═══════════════════════════════════════════════════════════════════════════════
function UploadPageInner() {
    const searchParams = useSearchParams();
    const isEdit = !!searchParams.get('edit');
    const [mode, setMode] = useState<'single' | 'bulk'>('single');

    return (
        <div className="min-h-screen bg-[#F9FAFB] p-6 md:p-8 max-w-6xl mx-auto">
            {/* Page header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
                    {isEdit ? 'Edit Property' : 'Add Property'}
                </h1>
                <p className="text-sm text-[#6B7280] mt-1">
                    {isEdit
                        ? 'Update the details for this property.'
                        : 'Add a single property or upload multiple at once via CSV.'}
                </p>
            </div>

            {/* Mode toggle — hidden in edit mode */}
            {!isEdit && (
                <div className="flex items-center gap-1 bg-white border border-[#E5E7EB] rounded-xl p-1 w-fit mb-6">
                    {(['single', 'bulk'] as const).map((m) => (
                        <button key={m} onClick={() => setMode(m)}
                            className={`px-5 py-2 cursor-pointer rounded-lg text-sm font-semibold transition-colors
                            ${mode === m
                                    ? 'bg-[#C9A84C] text-white'
                                    : 'text-[#6B7280] hover:text-[#374151]'
                                }`}>
                            {m === 'single' ? 'Single Property' : 'Bulk Upload (CSV)'}
                        </button>
                    ))}
                </div>
            )}

            {/* Content */}
            {mode === 'single' || isEdit
                ? <SinglePropertyForm isEdit={isEdit} />
                : <BulkCsvUpload />
            }
        </div>
    );
}

export default function UploadPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#F9FAFB]" />}>
            <UploadPageInner />
        </Suspense>
    );
}