'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ChevronRight, MapPin, Calendar, User, Building2,
    FileText, Download, Eye, CheckCircle2, Clock,
    ShieldCheck, TriangleAlert, X, Pencil,
    BrainCircuit, UserCheck, CircleDot,
} from 'lucide-react';
import PropertyTypeTag, { PropertyType } from '../../components/PropertytypeTag';
import StatusBadge, { StatusType } from '../../components/StatusBadge';

// ─── Mock property data ───────────────────────────────────────────────────────
const MOCK_PROPERTY = {
    id: '1',
    refCode: 'LGS/ETI/2025/001',
    address: '15 Admiralty Way, Lekki Phase 1, Lagos',
    type: 'Apartment Building' as PropertyType,
    lga: 'Eti-Osa',
    state: 'Lagos',
    gpsLat: '6.4281',
    gpsLon: '3.4219',
    sizeSqft: '1800',
    bedrooms: '3',
    bathrooms: '3',
    description: 'A luxury 3-bedroom apartment on the 5th floor of an 8-storey building in the heart of Lekki Phase 1. Features include a fitted kitchen, en-suite bathrooms, 24-hour security, backup power, and a rooftop terrace with views of the Atlantic Ocean.',
    status: 'Verified' as StatusType,
    uploadedBy: 'Adebayo Okonkwo',
    uploadedAt: '14 Jan 2025',
    verifiedAt: '16 Jan 2025',
    photos: [
        { id: '1', label: 'Front View' },
        { id: '2', label: 'Living Room' },
        { id: '3', label: 'Master Bedroom' },
        { id: '4', label: 'Kitchen' },
        { id: '5', label: 'Exterior' },
    ],
    documents: [
        { id: '1', name: 'Certificate_of_Occupancy_15_Admiralty.pdf', titleType: 'Certificate of Occupancy (C of O)', uploadedAt: '14 Jan 2025', size: '2.4 MB' },
        { id: '2', name: 'Survey_Plan_Lekki_Phase1.pdf', titleType: 'Survey Plan', uploadedAt: '14 Jan 2025', size: '1.1 MB' },
    ],
    verification: {
        currentStep: 4, // 1=Uploaded, 2=Under Review, 3=AI Processing, 4=Analyst Review, 5=Verified
        estimatedCompletion: null,
        riskRating: 'Low' as 'Low' | 'Medium' | 'High',
        overallResult: 'VERIFIED' as 'VERIFIED' | 'CONDITIONAL' | 'FLAGGED',
        summary: 'This property has been successfully verified. Title ownership is confirmed, no fraud indicators detected, and the AVM valuation is consistent with comparable properties in the Lekki Phase 1 area.',
        avmValue: '₦185,000,000',
        avmConfidence: 87,
        checks: [
            { name: 'Title Authenticity', description: 'Document verified against Lagos Land Registry records.', result: 'pass' as const },
            { name: 'Ownership Verification', description: 'Registered owner confirmed — no conflicting claims found.', result: 'pass' as const },
            { name: 'Double-Selling Detection', description: 'Address cross-checked against existing verified properties.', result: 'pass' as const },
            { name: 'Boundary Dispute Check', description: 'GPS coordinates verified — no boundary conflicts within 50m.', result: 'pass' as const },
            { name: 'Price Anomaly Detection', description: 'Listing price is within expected range for this LGA and property type.', result: 'pass' as const },
        ],
        extractedFields: [
            { field: 'Title Number', value: 'MO/2019/3421', confidence: 'High' as const },
            { field: 'Registered Owner', value: 'Okonkwo Properties Ltd', confidence: 'High' as const },
            { field: 'Date of Issue', value: '12 March 2019', confidence: 'High' as const },
            { field: 'Land Use', value: 'Residential', confidence: 'High' as const },
            { field: 'Plot Size', value: '1,800 sqft', confidence: 'Medium' as const },
            { field: 'LGA', value: 'Eti-Osa', confidence: 'High' as const },
        ],
        analystNotes: 'All documents are consistent and authentic. Survey plan dimensions match the C of O description. No encumbrances or caveats noted at time of search.',
        analystRef: 'VRT-ANA-0042',
    },
};

// ─── Verification steps ───────────────────────────────────────────────────────
const VERIFICATION_STEPS = [
    { n: 1, label: 'Uploaded', icon: Upload2 },
    { n: 2, label: 'Under Review', icon: Eye },
    { n: 3, label: 'AI Processing', icon: BrainCircuit },
    { n: 4, label: 'Analyst Review', icon: UserCheck },
    { n: 5, label: 'Complete', icon: ShieldCheck },
];

function Upload2({ className }: { className?: string }) {
    return <FileText className={className} />;
}

// ─── Confidence badge ─────────────────────────────────────────────────────────
const ConfidenceBadge = ({ level }: { level: 'High' | 'Medium' | 'Low' }) => {
    const styles = {
        High: 'bg-[#DCFCE7] text-[#15803D]',
        Medium: 'bg-[#FEF3C7] text-[#D97706]',
        Low: 'bg-[#FEE2E2] text-[#DC2626]',
    };
    return (
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${styles[level]}`}>
            {level}
        </span>
    );
};

// ─── Check result row ─────────────────────────────────────────────────────────
const CheckRow = ({ name, description, result }: {
    name: string; description: string; result: 'pass' | 'attention' | 'fail' | 'na';
}) => {
    const config = {
        pass: { bg: 'bg-[#15803D]', icon: <CheckCircle2 className="w-4 h-4 text-white" />, label: 'Pass', badge: 'bg-[#DCFCE7] text-[#15803D]' },
        attention: { bg: 'bg-[#D97706]', icon: <TriangleAlert className="w-4 h-4 text-white" />, label: 'Attention Required', badge: 'bg-[#FEF3C7] text-[#D97706]' },
        fail: { bg: 'bg-[#DC2626]', icon: <X className="w-4 h-4 text-white" />, label: 'Failed', badge: 'bg-[#FEE2E2] text-[#DC2626]' },
        na: { bg: 'bg-[#9CA3AF]', icon: <CircleDot className="w-4 h-4 text-white" />, label: 'Not Performed', badge: 'bg-[#F3F4F6] text-[#6B7280]' },
    }[result];

    return (
        <div className="flex items-start gap-4 py-4 border-b border-[#F3F4F6] last:border-0">
            <div className={`w-9 h-9 rounded-full ${config.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                {config.icon}
            </div>
            <div className="flex-1">
                <p className="text-sm font-semibold text-[#111827]">{name}</p>
                <p className="text-xs text-[#6B7280] mt-0.5">{description}</p>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${config.badge}`}>
                {config.label}
            </span>
        </div>
    );
};

// ─── Document preview drawer ──────────────────────────────────────────────────
const DocumentDrawer = ({ doc, onClose }: {
    doc: typeof MOCK_PROPERTY.documents[0] | null; onClose: () => void;
}) => {
    if (!doc) return null;
    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
            {/* Drawer */}
            <div className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-white z-50 flex flex-col">
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#F3F4F6]">
                    <div>
                        <p className="text-sm font-semibold text-[#111827] truncate max-w-[340px]">{doc.name}</p>
                        <p className="text-xs text-[#9CA3AF] mt-0.5">{doc.titleType} · {doc.size}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-xl hover:bg-[#F3F4F6] text-[#6B7280] transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>
                {/* Preview placeholder */}
                <div className="flex-1 bg-[#F9FAFB] flex flex-col items-center justify-center gap-3 p-8">
                    <FileText className="w-12 h-12 text-[#D1D5DB]" />
                    <p className="text-sm font-medium text-[#374151]">Document Preview</p>
                    <p className="text-xs text-[#9CA3AF] text-center">
                        PDF viewer renders here. Wire to an iframe or react-pdf in production.
                    </p>
                    <button className="mt-2 flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0D7A5F] text-white text-sm font-semibold hover:bg-[#0A6450] transition-colors">
                        <Download className="w-4 h-4" /> Download
                    </button>
                </div>
            </div>
        </>
    );
};

// ─── Photo gallery ────────────────────────────────────────────────────────────
const PhotoGallery = ({ photos }: { photos: typeof MOCK_PROPERTY.photos }) => {
    const [active, setActive] = useState(0);

    // Placeholder colors to simulate photos
    const colors = ['#E6F4F0', '#EBF2FA', '#FEF3C7', '#FEE2E2', '#F3F4F6'];

    return (
        <div className="space-y-3">
            {/* Main image */}
            <div className="w-full h-64 rounded-xl flex items-center justify-center relative overflow-hidden border border-[#E5E7EB]"
                style={{ background: colors[active] }}>
                <div className="flex flex-col items-center gap-2 text-[#9CA3AF]">
                    <Building2 className="w-10 h-10" />
                    <span className="text-sm font-medium">{photos[active]?.label}</span>
                </div>
                {/* Badge */}
                <div className="absolute top-3 left-3 bg-black/40 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    {active + 1} / {photos.length}
                </div>
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-1">
                {photos.map((p, i) => (
                    <button key={p.id} onClick={() => setActive(i)}
                        className={`w-16 h-16 shrink-0 rounded-lg border-2 flex items-center justify-center transition-colors
                            ${active === i ? 'border-[#0D7A5F]' : 'border-[#E5E7EB] hover:border-[#D1D5DB]'}`}
                        style={{ background: colors[i] }}>
                        <Building2 className="w-5 h-5 text-[#9CA3AF]" />
                    </button>
                ))}
            </div>
        </div>
    );
};

// ─── Main page ────────────────────────────────────────────────────────────────
export default function PropertyDetailPage() {
    const router = useRouter();
    const property = MOCK_PROPERTY;
    const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'result'>('overview');
    const [previewDoc, setPreviewDoc] = useState<typeof MOCK_PROPERTY.documents[0] | null>(null);

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'documents', label: 'Documents' },
        { id: 'result', label: 'Verification Result' },
    ] as const;

    const isVerified = property.status === 'Verified';
    const isPending = property.status === 'Pending';

    // ── Overview tab ──
    const renderOverview = () => (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
            {/* Left — photos + description + status tracker */}
            <div className="space-y-6">
                {/* Photos */}
                <div className="bg-white border border-[#F3F4F6] rounded-2xl p-6">
                    <h3 className="text-sm font-bold text-[#111827] mb-4">Property Photos</h3>
                    {property.photos.length > 0
                        ? <PhotoGallery photos={property.photos} />
                        : <div className="h-48 bg-[#F9FAFB] rounded-xl flex items-center justify-center text-sm text-[#9CA3AF]">No photos uploaded</div>
                    }
                </div>

                {/* Description */}
                {property.description && (
                    <div className="bg-white border border-[#F3F4F6] rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-[#111827] mb-3">Description</h3>
                        <p className="text-sm text-[#6B7280] leading-relaxed">{property.description}</p>
                    </div>
                )}

                {/* Verification status tracker */}
                <div className="bg-white border border-[#F3F4F6] rounded-2xl p-6">
                    <h3 className="text-sm font-bold text-[#111827] mb-6">Verification Progress</h3>
                    <div className="flex items-center">
                        {VERIFICATION_STEPS.map((step, idx) => {
                            const done = property.verification.currentStep > step.n;
                            const current = property.verification.currentStep === step.n;
                            return (
                                <React.Fragment key={step.n}>
                                    <div className="flex flex-col items-center gap-2 shrink-0">
                                        <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors
                                            ${done ? 'bg-[#15803D]' :
                                                current ? 'bg-[#0D7A5F]' :
                                                    'bg-[#F3F4F6]'}`}>
                                            {done
                                                ? <CheckCircle2 className="w-4 h-4 text-white" />
                                                : <step.icon className={`w-4 h-4 ${current ? 'text-white' : 'text-[#9CA3AF]'}`} />
                                            }
                                        </div>
                                        <span className={`text-[10px] font-semibold text-center max-w-[72px] leading-tight
                                            ${done || current ? 'text-[#111827]' : 'text-[#9CA3AF]'}`}>
                                            {step.label}
                                        </span>
                                    </div>
                                    {idx < VERIFICATION_STEPS.length - 1 && (
                                        <div className={`flex-1 h-px mx-2 mb-5 transition-colors ${done ? 'bg-[#15803D]' : 'bg-[#E5E7EB]'}`} />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Right — property meta panel */}
            <div className="space-y-4">
                <div className="bg-white border border-[#F3F4F6] rounded-2xl p-6">
                    <h3 className="text-sm font-bold text-[#111827] mb-4">Property Information</h3>
                    <div className="space-y-3">
                        {[
                            { label: 'Reference', value: property.refCode, mono: true },
                            { label: 'Address', value: property.address },
                            { label: 'LGA', value: property.lga },
                            { label: 'State', value: property.state },
                            ...(property.bedrooms ? [{ label: 'Bedrooms', value: `${property.bedrooms} bed` }] : []),
                            ...(property.bathrooms ? [{ label: 'Bathrooms', value: `${property.bathrooms} bath` }] : []),
                            ...(property.sizeSqft ? [{ label: 'Size', value: `${parseInt(property.sizeSqft).toLocaleString()} sqft` }] : []),
                            { label: 'GPS', value: `${property.gpsLat}, ${property.gpsLon}` },
                            { label: 'Uploaded by', value: property.uploadedBy },
                            { label: 'Upload date', value: property.uploadedAt },
                            ...(property.verifiedAt ? [{ label: 'Verified on', value: property.verifiedAt }] : []),
                        ].map(({ label, value, mono }) => (
                            <div key={label} className="flex items-start gap-3">
                                <span className="w-28 shrink-0 text-xs text-[#9CA3AF] font-medium pt-0.5">{label}</span>
                                <span className={`text-sm text-[#111827] font-medium flex-1 ${mono ? 'font-mono text-xs' : ''}`}>
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AVM value — shown if verified */}
                {isVerified && (
                    <div className="bg-[#0F2340] border border-[#0F2340] rounded-2xl p-6">
                        <p className="text-xs text-white/50 font-semibold uppercase tracking-widest mb-1">AVM Valuation</p>
                        <p className="text-2xl font-bold text-[#C9A84C]">{property.verification.avmValue}</p>
                        <p className="text-xs text-white/60 mt-1">
                            Confidence: {property.verification.avmConfidence}% · Based on comparable properties in {property.lga}
                        </p>
                    </div>
                )}

                {/* Quick actions */}
                <div className="bg-white border border-[#F3F4F6] rounded-2xl p-6">
                    <h3 className="text-sm font-bold text-[#111827] mb-3">Actions</h3>
                    <div className="space-y-2">
                        <button onClick={() => router.push(`/developer/upload?edit=${property.id}`)}
                            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm font-semibold text-[#374151] hover:bg-[#F9FAFB] transition-colors">
                            <Pencil className="w-4 h-4 text-[#6B7280]" /> Edit Property
                        </button>
                        {isVerified && (
                            <button onClick={() => setActiveTab('result')}
                                className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0D7A5F] hover:bg-[#0A6450] text-white text-sm font-semibold transition-colors">
                                <Download className="w-4 h-4" /> Download Certificate
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    // ── Documents tab ──
    const renderDocuments = () => (
        <div className="bg-white border border-[#F3F4F6] rounded-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-[#F3F4F6]">
                <h3 className="text-sm font-bold text-[#111827]">Title Documents</h3>
                <p className="text-xs text-[#9CA3AF] mt-0.5">{property.documents.length} document{property.documents.length !== 1 ? 's' : ''} uploaded</p>
            </div>
            <table className="w-full">
                <thead>
                    <tr className="border-b border-[#F3F4F6]">
                        {['Document Name', 'Title Type', 'Uploaded', 'Size', ''].map((h, i) => (
                            <th key={i} className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {property.documents.map((doc, idx) => (
                        <tr key={doc.id} className={`border-b border-[#F9FAFB] hover:bg-[#F9FAFB] transition-colors ${idx % 2 === 1 ? 'bg-[#FAFAFA]' : ''}`}>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#EBF2FA] flex items-center justify-center shrink-0">
                                        <FileText className="w-4 h-4 text-[#2A5298]" />
                                    </div>
                                    <span className="text-sm font-medium text-[#111827]">{doc.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-[#6B7280]">{doc.titleType}</td>
                            <td className="px-6 py-4 text-sm text-[#6B7280]">{doc.uploadedAt}</td>
                            <td className="px-6 py-4 text-sm text-[#6B7280]">{doc.size}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setPreviewDoc(doc)}
                                        className="p-2 rounded-lg text-[#6B7280] hover:text-[#0D7A5F] hover:bg-[#E6F4F0] transition-colors"
                                        title="Preview">
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 rounded-lg text-[#6B7280] hover:text-[#0D7A5F] hover:bg-[#E6F4F0] transition-colors"
                                        title="Download">
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    // ── Verification result tab ──
    const renderResult = () => {
        if (isPending) return (
            <div className="space-y-4">
                {/* In-progress banner */}
                <div className="flex items-start gap-4 bg-[#FEF3C7] border border-[#FDE68A] rounded-2xl px-6 py-5">
                    <Clock className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-[#92400E]">Verification in progress</p>
                        <p className="text-xs text-[#D97706] mt-0.5">Estimated completion: within 2 hours. You'll receive an email notification when complete.</p>
                    </div>
                </div>

                {/* Skeleton preview */}
                <div className="bg-white border border-[#F3F4F6] rounded-2xl p-6 space-y-4">
                    <div className="h-4 w-32 bg-[#F3F4F6] rounded-full animate-pulse" />
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="h-3 bg-[#F3F4F6] rounded-full animate-pulse" style={{ width: `${30 + i * 8}%` }} />
                            <div className="h-3 bg-[#F3F4F6] rounded-full animate-pulse flex-1" />
                        </div>
                    ))}
                </div>
            </div>
        );

        const riskConfig = {
            Low: { bg: 'bg-[#DCFCE7]', text: 'text-[#15803D]', border: 'border-[#BBF7D0]', icon: <ShieldCheck className="w-5 h-5" /> },
            Medium: { bg: 'bg-[#FEF3C7]', text: 'text-[#D97706]', border: 'border-[#FDE68A]', icon: <TriangleAlert className="w-5 h-5" /> },
            High: { bg: 'bg-[#FEE2E2]', text: 'text-[#DC2626]', border: 'border-[#FECACA]', icon: <TriangleAlert className="w-5 h-5" /> },
        }[property.verification.riskRating];

        return (
            <div className="space-y-5">
                {/* Risk rating banner */}
                <div className={`flex items-start gap-4 ${riskConfig.bg} border ${riskConfig.border} rounded-2xl px-6 py-5`}>
                    <div className={riskConfig.text}>{riskConfig.icon}</div>
                    <div>
                        <p className={`text-sm font-bold ${riskConfig.text}`}>
                            {property.verification.overallResult} — {property.verification.riskRating} Risk
                        </p>
                        <p className={`text-xs mt-0.5 ${riskConfig.text} opacity-80`}>
                            {property.verification.summary}
                        </p>
                    </div>
                    <button className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0D7A5F] text-white text-sm font-semibold hover:bg-[#0A6450] transition-colors shrink-0">
                        <Download className="w-4 h-4" /> Certificate
                    </button>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                    {/* Extracted fields */}
                    <div className="bg-white border border-[#F3F4F6] rounded-2xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-[#F3F4F6]">
                            <h3 className="text-sm font-bold text-[#111827]">Extracted Fields</h3>
                            <p className="text-xs text-[#9CA3AF] mt-0.5">Data pulled from title documents by AI</p>
                        </div>
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#F3F4F6]">
                                    {['Field', 'Value', 'Confidence'].map((h) => (
                                        <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {property.verification.extractedFields.map((row, i) => (
                                    <tr key={i} className={`border-b border-[#F9FAFB] ${i % 2 === 1 ? 'bg-[#FAFAFA]' : ''}`}>
                                        <td className="px-5 py-3 text-xs font-semibold text-[#6B7280]">{row.field}</td>
                                        <td className="px-5 py-3 text-sm font-medium text-[#111827]">{row.value}</td>
                                        <td className="px-5 py-3"><ConfidenceBadge level={row.confidence} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Checks */}
                    <div className="bg-white border border-[#F3F4F6] rounded-2xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-[#F3F4F6]">
                            <h3 className="text-sm font-bold text-[#111827]">Verification Checks</h3>
                            <p className="text-xs text-[#9CA3AF] mt-0.5">
                                {property.verification.checks.filter((c) => c.result === 'pass').length} passed ·{' '}
                                {property.verification.checks.filter((c) => c.result !== 'pass').length} flagged
                            </p>
                        </div>
                        <div className="px-6">
                            {property.verification.checks.map((check, i) => (
                                <CheckRow key={i} {...check} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Analyst notes */}
                {property.verification.analystNotes && (
                    <div className="bg-white border border-[#F3F4F6] rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-3">
                            <UserCheck className="w-4 h-4 text-[#0D7A5F]" />
                            <h3 className="text-sm font-bold text-[#111827]">Analyst Notes</h3>
                            <span className="ml-auto text-xs font-mono text-[#9CA3AF]">{property.verification.analystRef}</span>
                        </div>
                        <div className="border-l-4 border-[#C9A84C] pl-4">
                            <p className="text-sm text-[#374151] leading-relaxed italic">
                                "{property.verification.analystNotes}"
                            </p>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB] p-6 md:p-8">
            {/* ── Breadcrumb ── */}
            <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF] mb-4">
                <Link href="/dashboard" className="hover:text-[#374151] transition-colors">Dashboard</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href="/developer/properties" className="hover:text-[#374151] transition-colors">Properties</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-[#374151] font-medium truncate max-w-[240px]">{property.address}</span>
            </div>

            {/* ── Page header ── */}
            <div className="mb-1">
                <div className="flex items-start justify-between gap-4">
                    <h1 className="text-xl font-bold text-[#111827] leading-tight">{property.address}</h1>
                </div>
                <div className="flex items-center gap-3 mt-2">
                    <PropertyTypeTag type={property.type} />
                    <span className="w-1 h-1 rounded-full bg-[#D1D5DB]" />
                    <StatusBadge status={property.status} />
                    <span className="w-1 h-1 rounded-full bg-[#D1D5DB]" />
                    <span className="text-xs font-mono text-[#9CA3AF]">{property.refCode}</span>
                </div>
            </div>

            {/* Gold divider */}
            <div className="w-full h-px bg-[#C9A84C] opacity-30 my-5" />

            {/* ── Tabs ── */}
            <div className="flex items-center gap-1 border-b border-[#E5E7EB] mb-6">
                {tabs.map((tab) => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-3 text-sm font-semibold transition-colors border-b-2 -mb-px
                            ${activeTab === tab.id
                                ? 'border-[#0D7A5F] text-[#0D7A5F]'
                                : 'border-transparent text-[#6B7280] hover:text-[#374151]'
                            }`}>
                        {tab.label}
                        {tab.id === 'result' && isPending && (
                            <span className="ml-2 w-2 h-2 rounded-full bg-[#D97706] inline-block" />
                        )}
                    </button>
                ))}
            </div>

            {/* ── Tab content ── */}
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'documents' && renderDocuments()}
            {activeTab === 'result' && renderResult()}

            {/* ── Document drawer ── */}
            <DocumentDrawer doc={previewDoc} onClose={() => setPreviewDoc(null)} />
        </div>
    );
}