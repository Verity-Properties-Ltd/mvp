'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Search, SlidersHorizontal, Plus, MoreHorizontal,
    Eye, Pencil, Trash2, ChevronDown, Upload
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import PropertyTypeTag, { PropertyType } from '../components/PropertytypeTag';
import StatusBadge, { StatusType } from '../components/StatusBadge';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Property {
    id: string;
    refCode: string;
    address: string;
    type: PropertyType;
    lga: string;
    titleType: string;
    dateUploaded: string;
    status: StatusType;
}

// ─── Mock data ────────────────────────────────────────────────────────────────
const allProperties: Property[] = [
    { id: '1', refCode: 'LGS/ETI/2025/001', address: '15 Admiralty Way, Lekki Phase 1, Lagos', type: 'Apartment Building', lga: 'Eti-Osa', titleType: 'C of O', dateUploaded: '14 Jan 2025', status: 'Verified' },
    { id: '2', refCode: 'LGS/ETI/2025/002', address: 'Plot 44B, Osapa London Estate, Lekki', type: 'Landed Property', lga: 'Eti-Osa', titleType: 'Deed of Assignment', dateUploaded: '16 Jan 2025', status: 'Pending' },
    { id: '3', refCode: 'LGS/ETI/2025/003', address: '7 Idowu Taylor Street, Victoria Island', type: 'Commercial Space', lga: 'Eti-Osa', titleType: 'C of O', dateUploaded: '17 Jan 2025', status: 'Verified' },
    { id: '4', refCode: 'LGS/IKJ/2025/004', address: '22 Allen Avenue, Ikeja GRA', type: 'Duplex', lga: 'Ikeja', titleType: "Governor's Consent", dateUploaded: '19 Jan 2025', status: 'Verified' },
    { id: '5', refCode: 'LGS/SUR/2025/005', address: 'Block 3 Flat 5, Surulere Housing Estate', type: 'Apartment Building', lga: 'Surulere', titleType: 'C of O', dateUploaded: '20 Jan 2025', status: 'Flagged' },
    { id: '6', refCode: 'LGS/IBJ/2025/006', address: 'Plot 789, Ibeju-Lekki Free Trade Zone', type: 'Landed Property', lga: 'Ibeju-Lekki', titleType: 'Gazette', dateUploaded: '22 Jan 2025', status: 'Pending' },
    { id: '7', refCode: 'LGS/ETI/2025/007', address: '10 Bourdillon Road, Ikoyi', type: 'Duplex', lga: 'Eti-Osa', titleType: 'C of O', dateUploaded: '23 Jan 2025', status: 'Verified' },
    { id: '8', refCode: 'LGS/ALI/2025/008', address: '33 Akowonjo Road, Egbeda', type: 'Landed Property', lga: 'Alimosho', titleType: 'Deed of Assignment', dateUploaded: '24 Jan 2025', status: 'Pending' },
    { id: '9', refCode: 'LGS/ETI/2025/009', address: 'Plot 12, Chevron Drive, Lekki', type: 'Commercial Space', lga: 'Eti-Osa', titleType: "Governor's Consent", dateUploaded: '25 Jan 2025', status: 'Verified' },
    { id: '10', refCode: 'LGS/IKJ/2025/010', address: 'Flat 2B, Maryland Estate, Ikeja', type: 'Apartment Building', lga: 'Ikeja', titleType: 'C of O', dateUploaded: '26 Jan 2025', status: 'Pending' },
    { id: '11', refCode: 'LGS/ETI/2025/011', address: '5 Karimu Kotun Street, Victoria Island', type: 'Commercial Space', lga: 'Eti-Osa', titleType: 'C of O', dateUploaded: '27 Jan 2025', status: 'Verified' },
    { id: '12', refCode: 'LGS/KOS/2025/012', address: 'Plot 201, Magodo Phase 2, Lagos', type: 'Duplex', lga: 'Kosofe', titleType: "Governor's Consent", dateUploaded: '28 Jan 2025', status: 'Flagged' },
    { id: '13', refCode: 'LGS/IKJ/2025/013', address: '18 Opebi Road, Ikeja', type: 'Apartment Building', lga: 'Ikeja', titleType: 'Deed of Assignment', dateUploaded: '29 Jan 2025', status: 'Verified' },
    { id: '14', refCode: 'LGS/ALI/2025/014', address: 'Plot 45, Alimosho Housing Scheme', type: 'Landed Property', lga: 'Alimosho', titleType: 'Excision', dateUploaded: '30 Jan 2025', status: 'Pending' },
    { id: '15', refCode: 'LGS/ETI/2025/015', address: '3 Ozumba Mbadiwe Avenue, V.I.', type: 'Commercial Space', lga: 'Eti-Osa', titleType: 'C of O', dateUploaded: '31 Jan 2025', status: 'Verified' },
    { id: '16', refCode: 'LGS/ETI/2025/016', address: 'Plot 88, Badore Road, Ajah', type: 'Landed Property', lga: 'Eti-Osa', titleType: 'Registered Survey', dateUploaded: '1 Feb 2025', status: 'Pending' },
    { id: '17', refCode: 'LGS/ETI/2025/017', address: '9 Adetokunbo Ademola Street, V.I.', type: 'Commercial Space', lga: 'Eti-Osa', titleType: 'C of O', dateUploaded: '2 Feb 2025', status: 'Verified' },
    { id: '18', refCode: 'LGS/ETI/2025/018', address: 'Plot 22, Sangotedo Estate, Ajah', type: 'Duplex', lga: 'Eti-Osa', titleType: 'Deed of Assignment', dateUploaded: '3 Feb 2025', status: 'Flagged' },
    { id: '19', refCode: 'LGS/ETI/2025/019', address: '11 Awolowo Road, Ikoyi', type: 'Apartment Building', lga: 'Eti-Osa', titleType: 'C of O', dateUploaded: '4 Feb 2025', status: 'Verified' },
    { id: '20', refCode: 'LGS/KOS/2025/020', address: 'Plot 114, Ketu-Alapere, Lagos', type: 'Landed Property', lga: 'Kosofe', titleType: 'Gazette', dateUploaded: '5 Feb 2025', status: 'Pending' },
    { id: '21', refCode: 'LGS/ETI/2025/021', address: '4 Eko Atlantic Boulevard, Lagos', type: 'Commercial Space', lga: 'Eti-Osa', titleType: 'C of O', dateUploaded: '6 Feb 2025', status: 'Verified' },
    { id: '22', refCode: 'LGS/IKJ/2025/022', address: 'Block 7, Omole Phase 1, Ikeja', type: 'Apartment Building', lga: 'Ikeja', titleType: 'Deed of Assignment', dateUploaded: '7 Feb 2025', status: 'Pending' },
    { id: '23', refCode: 'LGS/ETI/2025/023', address: '20 Glover Road, Ikoyi', type: 'Duplex', lga: 'Eti-Osa', titleType: "Governor's Consent", dateUploaded: '8 Feb 2025', status: 'Verified' },
    { id: '24', refCode: 'LGS/ALI/2025/024', address: 'Plot 56, Idimu Road, Alimosho', type: 'Landed Property', lga: 'Alimosho', titleType: 'Excision', dateUploaded: '9 Feb 2025', status: 'Pending' },
    { id: '25', refCode: 'LGS/ETI/2025/025', address: '8 Kofo Abayomi Street, V.I.', type: 'Commercial Space', lga: 'Eti-Osa', titleType: 'C of O', dateUploaded: '10 Feb 2025', status: 'Verified' },
];

// ─── Filter Select ────────────────────────────────────────────────────────────
const FilterSelect = ({
    placeholder,
    options,
    value,
    onChange,
}: {
    placeholder: string;
    options: string[];
    value: string;
    onChange: (v: string) => void;
}) => (
    <div className="relative">
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="appearance-none h-10 pl-3 pr-8 text-sm text-[#374151] bg-white border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D7A5F]/20 focus:border-[#0D7A5F] transition-colors cursor-pointer min-w-[130px]"
        >
            <option value="">{placeholder}</option>
            {options.map((o) => (
                <option key={o} value={o}>{o}</option>
            ))}
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF] pointer-events-none" />
    </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const ROWS_PER_PAGE_OPTIONS = [20, 50, 100];

export default function PropertiesPage() {
    const router = useRouter();

    // filters
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [lgaFilter, setLgaFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [titleFilter, setTitleFilter] = useState('');

    // pagination
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);

    // delete modal
    const [deleteTarget, setDeleteTarget] = useState<Property | null>(null);

    // ── derived ──
    const filtered = allProperties.filter((p) => {
        const q = search.toLowerCase();
        return (
            (!q || p.address.toLowerCase().includes(q) || p.refCode.toLowerCase().includes(q)) &&
            (!typeFilter || p.type === typeFilter) &&
            (!lgaFilter || p.lga === lgaFilter) &&
            (!statusFilter || p.status === statusFilter) &&
            (!titleFilter || p.titleType === titleFilter)
        );
    });

    const totalPages = Math.ceil(filtered.length / rowsPerPage);
    const paginated = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const uniqueTypes = [...new Set(allProperties.map((p) => p.type))];
    const uniqueLgas = [...new Set(allProperties.map((p) => p.lga))].sort();
    const uniqueStatuses = ['Verified', 'Pending', 'Flagged', 'Under Review'];
    const uniqueTitles = [...new Set(allProperties.map((p) => p.titleType))].sort();

    const hasFilters = search || typeFilter || lgaFilter || statusFilter || titleFilter;

    const clearFilters = () => {
        setSearch(''); setTypeFilter(''); setLgaFilter('');
        setStatusFilter(''); setTitleFilter(''); setCurrentPage(1);
    };

    const handleDelete = (property: Property) => setDeleteTarget(property);
    const confirmDelete = () => {
        // wire to API later
        console.log('Delete property:', deleteTarget?.id);
        setDeleteTarget(null);
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB] p-6 md:p-8">

            {/* ── Page header ── */}
            <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-[#6B7280] font-medium">
                    {filtered.length} propert{filtered.length === 1 ? 'y' : 'ies'} found
                </p>
                <button
                    onClick={() => router.push('/dashboard/upload')}
                    className="flex cursor-pointer items-center gap-2 bg-[#C9A84C] hover:bg-[#B8962E] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
                >
                    <Upload className="w-4 h-4" />
                    Add Property
                </button>
            </div>

            {/* ── Filter bar ── */}
            <div className="bg-white rounded-2xl border border-[#F3F4F6] mb-4">
                <div className="flex flex-wrap items-center gap-3 px-4 py-3">
                    {/* Filter icon */}
                    <div className="p-1.5 rounded-lg border border-[#E5E7EB] text-[#6B7280]">
                        <SlidersHorizontal className="w-4 h-4" />
                    </div>

                    {/* Search */}
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                        <input
                            type="text"
                            placeholder="Search by address..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                            className="w-full h-10 pl-9 pr-4 text-sm text-[#111827] bg-transparent border border-[#E5E7EB] rounded-xl placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0D7A5F]/20 focus:border-[#0D7A5F] transition-colors"
                        />
                    </div>

                    {/* Dropdowns */}
                    <FilterSelect placeholder="Type" options={uniqueTypes} value={typeFilter} onChange={(v) => { setTypeFilter(v); setCurrentPage(1); }} />
                    <FilterSelect placeholder="LGA" options={uniqueLgas} value={lgaFilter} onChange={(v) => { setLgaFilter(v); setCurrentPage(1); }} />
                    <FilterSelect placeholder="Status" options={uniqueStatuses} value={statusFilter} onChange={(v) => { setStatusFilter(v); setCurrentPage(1); }} />
                    <FilterSelect placeholder="Title Type" options={uniqueTitles} value={titleFilter} onChange={(v) => { setTitleFilter(v); setCurrentPage(1); }} />

                    {hasFilters && (
                        <button
                            onClick={clearFilters}
                            className="text-sm text-[#0D7A5F] font-medium hover:text-[#0A6450] transition-colors whitespace-nowrap"
                        >
                            Clear filters
                        </button>
                    )}
                </div>
            </div>

            {/* ── Table ── */}
            <div className="bg-white rounded-2xl border border-[#F3F4F6] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#F3F4F6]">
                                {['Property Address', 'Type', 'LGA', 'Title Type', 'Date Uploaded', 'Status', ''].map((col, i) => (
                                    <th
                                        key={i}
                                        className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]"
                                    >
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-16 text-center">
                                        <p className="text-sm font-medium text-[#374151]">No properties found</p>
                                        <p className="text-xs text-[#9CA3AF] mt-1">Try adjusting your filters</p>
                                    </td>
                                </tr>
                            ) : (
                                paginated.map((property, idx) => (
                                    <tr
                                        key={property.id}
                                        className={`
                                            border-b border-[#F9FAFB] hover:bg-[#F0FDF9] transition-colors group
                                            ${idx % 2 === 1 ? 'bg-[#FAFAFA]' : 'bg-white'}
                                        `}
                                    >
                                        {/* Address + ref */}
                                        <td
                                            className="px-6 py-4 cursor-pointer"
                                            onClick={() => router.push(`/dashboard/properties/${property.id}`)}
                                        >
                                            <p className="text-sm font-medium text-[#111827] whitespace-nowrap">
                                                {property.address}
                                            </p>
                                            <p className="text-[11px] text-[#9CA3AF] mt-0.5 font-mono">
                                                {property.refCode}
                                            </p>
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap cursor-pointer"
                                            onClick={() => router.push(`/dashboard/properties/${property.id}`)}
                                        >
                                            <PropertyTypeTag type={property.type} />
                                        </td>
                                        <td
                                            className="px-6 py-4 text-sm text-[#6B7280] whitespace-nowrap cursor-pointer"
                                            onClick={() => router.push(`/dashboard/properties/${property.id}`)}
                                        >
                                            {property.lga}
                                        </td>
                                        <td
                                            className="px-6 py-4 text-sm text-[#6B7280] whitespace-nowrap cursor-pointer"
                                            onClick={() => router.push(`/dashboard/properties/${property.id}`)}
                                        >
                                            {property.titleType}
                                        </td>
                                        <td
                                            className="px-6 py-4 text-sm text-[#6B7280] whitespace-nowrap cursor-pointer"
                                            onClick={() => router.push(`/dashboard/properties/${property.id}`)}
                                        >
                                            {property.dateUploaded}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap cursor-pointer"
                                            onClick={() => router.push(`/dashboard/properties/${property.id}`)}
                                        >
                                            <StatusBadge status={property.status} />
                                        </td>

                                        {/* Actions — stops row click propagation */}
                                        <td className="px-4 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#374151] hover:bg-[#F3F4F6] transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-44">
                                                    <DropdownMenuItem
                                                        onClick={() => router.push(`/dashboard/properties/${property.id}`)}
                                                        className="flex items-center gap-2 cursor-pointer"
                                                    >
                                                        <Eye className="w-4 h-4 text-[#6B7280]" />
                                                        <span>View Details</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => router.push(`/dashboard/upload?edit=${property.id}`)}
                                                        className="flex items-center gap-2 cursor-pointer"
                                                    >
                                                        <Pencil className="w-4 h-4 text-[#6B7280]" />
                                                        <span>Edit</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        onClick={() => handleDelete(property)}
                                                        className="flex items-center gap-2 cursor-pointer text-[#DC2626] focus:text-[#DC2626] focus:bg-[#FEE2E2]"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        <span>Delete</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ── Pagination ── */}
                {filtered.length > 0 && (
                    <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-t border-[#F3F4F6]">
                        <div />

                        {/* Page info + nav */}
                        <div className="flex items-center gap-3">

                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 h-8 rounded-lg text-sm font-medium text-[#6B7280] hover:bg-[#F3F4F6] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                    Previous
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === page
                                            ? 'bg-[#0D7A5F] text-white'
                                            : 'text-[#6B7280] hover:bg-[#F3F4F6]'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-3 h-8 rounded-lg text-sm font-medium text-[#6B7280] hover:bg-[#F3F4F6] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ── Delete Confirm Modal ── */}
            <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                <AlertDialogContent className="max-w-md rounded-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-[#111827]">Delete Property</AlertDialogTitle>
                        <AlertDialogDescription className="text-[#6B7280]">
                            Are you sure you want to delete{' '}
                            <span className="font-semibold text-[#111827]">
                                {deleteTarget?.address}
                            </span>
                            ? This action cannot be undone and all associated verification data will be permanently removed.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-xl border-[#E5E7EB] text-[#374151]">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white"
                        >
                            Delete Property
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    );
}