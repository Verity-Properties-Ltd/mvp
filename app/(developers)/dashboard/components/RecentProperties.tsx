'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import PropertyTypeTag, { PropertyType } from './PropertytypeTag';
import StatusBadge, { StatusType } from './StatusBadge';

interface Property {
    id: string;
    address: string;
    type: PropertyType;
    lga: string;
    titleType: string;
    dateUploaded: string;
    status: StatusType;
}

const recentProperties: Property[] = [
    { id: '1', address: '15 Admiralty Way, Lekki Phase 1, Lagos', type: 'Apartment Building', lga: 'Eti-Osa', titleType: 'C of O', dateUploaded: '14 Jan 2025', status: 'Verified' },
    { id: '2', address: 'Plot 44B, Osapa London Estate, Lekki', type: 'Landed Property', lga: 'Eti-Osa', titleType: 'Deed of Assignment', dateUploaded: '16 Jan 2025', status: 'Pending' },
    { id: '3', address: '7 Idowu Taylor Street, Victoria Island', type: 'Commercial Space', lga: 'Eti-Osa', titleType: 'C of O', dateUploaded: '17 Jan 2025', status: 'Verified' },
    { id: '4', address: '22 Allen Avenue, Ikeja GRA', type: 'Duplex', lga: 'Ikeja', titleType: "Governor's Consent", dateUploaded: '19 Jan 2025', status: 'Verified' },
    { id: '5', address: 'Block 3 Flat 5, Surulere Housing Estate', type: 'Apartment Building', lga: 'Surulere', titleType: 'C of O', dateUploaded: '20 Jan 2025', status: 'Flagged' },
    { id: '6', address: 'Plot 789, Ibeju-Lekki Free Trade Zone', type: 'Landed Property', lga: 'Ibeju-Lekki', titleType: 'Gazette', dateUploaded: '22 Jan 2025', status: 'Pending' },
    { id: '7', address: '10 Bourdillon Road, Ikoyi', type: 'Duplex', lga: 'Eti-Osa', titleType: 'C of O', dateUploaded: '23 Jan 2025', status: 'Verified' },
    { id: '8', address: '33 Akowonjo Road, Egbeda', type: 'Landed Property', lga: 'Alimosho', titleType: 'Deed of Assignment', dateUploaded: '24 Jan 2025', status: 'Pending' },
    { id: '9', address: 'Plot 12, Chevron Drive, Lekki', type: 'Commercial Space', lga: 'Eti-Osa', titleType: "Governor's Consent", dateUploaded: '25 Jan 2025', status: 'Verified' },
    { id: '10', address: 'Flat 2B, Maryland Estate, Ikeja', type: 'Apartment Building', lga: 'Ikeja', titleType: 'C of O', dateUploaded: '26 Jan 2025', status: 'Pending' },
];

const RecentProperties = () => {
    const router = useRouter();

    return (
        <div className="bg-white rounded-2xl border border-[#F3F4F6] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#F3F4F6]">
                <div>
                    <h3 className="text-base font-bold text-[#111827]">Recent Properties</h3>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">Last 10 uploaded properties</p>
                </div>
                <Link
                    href="/dashboard/properties"
                    className="flex items-center gap-1 text-sm font-semibold text-[#0D7A5F] hover:text-[#0A6450] transition-colors"
                >
                    View all
                    <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-[#F3F4F6]">
                            {['Property Address', 'Type', 'LGA', 'Title Type', 'Date Uploaded', 'Status'].map((col) => (
                                <th
                                    key={col}
                                    className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]"
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {recentProperties.map((property, idx) => (
                            <tr
                                key={property.id}
                                onClick={() => router.push(`/dashboard/properties/${property.id}`)}
                                className={`
                                    border-b border-[#F9FAFB] hover:bg-[#F0FDF9] transition-colors cursor-pointer
                                    ${idx % 2 === 1 ? 'bg-[#FAFAFA]' : 'bg-white'}
                                `}
                            >
                                <td className="px-6 py-4 text-sm font-medium text-[#111827] whitespace-nowrap">
                                    {property.address}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <PropertyTypeTag type={property.type} />
                                </td>
                                <td className="px-6 py-4 text-sm text-[#6B7280] whitespace-nowrap">
                                    {property.lga}
                                </td>
                                <td className="px-6 py-4 text-sm text-[#6B7280] whitespace-nowrap">
                                    {property.titleType}
                                </td>
                                <td className="px-6 py-4 text-sm text-[#6B7280] whitespace-nowrap">
                                    {property.dateUploaded}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <StatusBadge status={property.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentProperties;