'use client';

import React from 'react';
import { Building2, ShieldCheck, Clock, TriangleAlert, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
    label: string;
    value: number;
    subtext: string;
    subtextHighlight?: 'positive' | 'negative' | 'neutral';
    icon: React.ElementType;
    iconBg: string;
    iconColor: string;
}

const StatCard = ({ label, value, subtext, subtextHighlight = 'neutral', icon: Icon, iconBg, iconColor }: StatCardProps) => {
    const subtextColor =
        subtextHighlight === 'positive' ? 'text-[#15803D]' :
            subtextHighlight === 'negative' ? 'text-[#DC2626]' :
                'text-[#6B7280]';

    return (
        <div className="bg-white rounded-2xl border border-[#F3F4F6] p-6 flex flex-col gap-4 hover:shadow-sm transition-shadow duration-200">
            <div className="flex items-start justify-between">
                <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <TrendingUp className="w-4 h-4 text-[#D1D5DB]" />
            </div>
            <div>
                <p className="text-[2rem] font-bold text-[#111827] leading-none tracking-tight">
                    {value.toLocaleString()}
                </p>
                <p className="text-sm text-[#6B7280] mt-1.5">{label}</p>
                <p className={`text-[13px] font-medium mt-1 ${subtextColor}`}>{subtext}</p>
            </div>
        </div>
    );
};

const StatCards = () => {
    const stats: StatCardProps[] = [
        {
            label: 'Total Properties',
            value: 247,
            subtext: '+12 this month',
            subtextHighlight: 'positive',
            icon: Building2,
            iconBg: 'bg-[#EBF2FA]',
            iconColor: 'text-[#2A5298]',
        },
        {
            label: 'Verified',
            value: 156,
            subtext: '+8 this month',
            subtextHighlight: 'positive',
            icon: ShieldCheck,
            iconBg: 'bg-[#DCFCE7]',
            iconColor: 'text-[#15803D]',
        },
        {
            label: 'Pending Review',
            value: 71,
            subtext: '4 awaiting docs',
            subtextHighlight: 'neutral',
            icon: Clock,
            iconBg: 'bg-[#FEF3C7]',
            iconColor: 'text-[#D97706]',
        },
        {
            label: 'Flagged',
            value: 20,
            subtext: '-3 from last month',
            subtextHighlight: 'negative',
            icon: TriangleAlert,
            iconBg: 'bg-[#FEE2E2]',
            iconColor: 'text-[#DC2626]',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
            ))}
        </div>
    );
};

export default StatCards;