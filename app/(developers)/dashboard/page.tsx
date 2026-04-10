'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import StatCards from './components/StatsCard';
import RecentProperties from './components/RecentProperties';
import DashboardSidePanels from './components/DashboardsidePanels';


const DashboardPage = () => {
    return (
        <div className="min-h-screen bg-[#F9FAFB] p-6 md:p-8">
            {/* ── Page Header ── */}
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Dashboard</h1>
                    <p className="text-sm text-[#6B7280] mt-1">
                        Your portfolio has{' '}
                        <span className="text-[#D97706] font-semibold">71 properties</span>{' '}
                        pending verification
                    </p>
                </div>

                {/* Add Property CTA */}
                <Link
                    href="/dashboard/upload"
                    className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#B8962E] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
                >
                    Add Property
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            {/* ── Stat Cards ── */}
            <div className="mb-10">
                <StatCards />
            </div>

            {/* ── Main content + side panels ── */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_268px] gap-5">
                <RecentProperties />
                <DashboardSidePanels />
            </div>
        </div>
    );
};

export default DashboardPage;