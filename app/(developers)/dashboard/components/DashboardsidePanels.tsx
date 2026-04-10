'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// ─── Donut chart (pure SVG, no library needed) ───────────────────────────────
interface DonutSegment {
    value: number;
    color: string;
    label: string;
}

const DonutChart = ({ segments }: { segments: DonutSegment[] }) => {
    const total = segments.reduce((s, seg) => s + seg.value, 0);
    const size = 140;
    const cx = size / 2;
    const cy = size / 2;
    const radius = 52;
    const strokeWidth = 22;
    const circumference = 2 * Math.PI * radius;

    let cumulativePercent = 0;

    const arcs = segments.map((seg) => {
        const percent = seg.value / total;
        const dashArray = circumference * percent - 3; // 3px gap between segments
        const dashOffset = -circumference * cumulativePercent;
        cumulativePercent += percent;
        return { ...seg, dashArray, dashOffset };
    });

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative">
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    {/* Track */}
                    <circle
                        cx={cx} cy={cy} r={radius}
                        fill="none"
                        stroke="#F3F4F6"
                        strokeWidth={strokeWidth}
                    />
                    {/* Segments */}
                    {arcs.map((arc, i) => (
                        <circle
                            key={i}
                            cx={cx} cy={cy} r={radius}
                            fill="none"
                            stroke={arc.color}
                            strokeWidth={strokeWidth}
                            strokeDasharray={`${arc.dashArray} ${circumference}`}
                            strokeDashoffset={arc.dashOffset}
                            strokeLinecap="butt"
                            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                        />
                    ))}
                </svg>
                {/* Centre label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-[#111827]">{total}</span>
                    <span className="text-[10px] text-[#9CA3AF] font-medium">Total</span>
                </div>
            </div>

            {/* Legend */}
            <div className="w-full space-y-2">
                {segments.map((seg) => (
                    <div key={seg.label} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: seg.color }} />
                            <span className="text-sm text-[#374151]">{seg.label}</span>
                        </div>
                        <span className="text-sm font-bold text-[#111827]">{seg.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── Quick Actions ────────────────────────────────────────────────────────────
interface QuickAction {
    label: string;
    href: string;
    danger?: boolean;
}

const quickActions: QuickAction[] = [
    { label: 'Upload New Property', href: '/developer/upload' },
    { label: 'View Flagged Properties', href: '/developer/properties?status=flagged', danger: true },
    { label: 'Invite Team Member', href: '/developer/team' },
];

// ─── Main component ───────────────────────────────────────────────────────────
const DashboardSidePanels = () => {
    const segments: DonutSegment[] = [
        { value: 156, color: '#15803D', label: 'Verified' },
        { value: 71, color: '#D97706', label: 'Pending' },
        { value: 20, color: '#DC2626', label: 'Flagged' },
    ];

    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Verification Breakdown */}
            <div className="bg-white rounded-2xl border border-[#F3F4F6] p-6">
                <div className="mb-5">
                    <h3 className="text-base font-bold text-[#111827]">Verification Breakdown</h3>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">Portfolio status split</p>
                </div>
                <DonutChart segments={segments} />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-[#F3F4F6] p-6">
                <h3 className="text-base font-bold text-[#111827] mb-4">Quick Actions</h3>
                <div className="space-y-1">
                    {quickActions.map(({ label, href, danger }) => (
                        <Link
                            key={label}
                            href={href}
                            className={`
                flex items-center justify-between px-0 py-3 border-b border-[#F3F4F6] last:border-0
                group transition-colors
                ${danger ? 'hover:text-[#DC2626]' : 'hover:text-[#0D7A5F]'}
              `}
                        >
                            <span
                                className={`text-sm font-medium transition-colors
                  ${danger ? 'text-[#DC2626]' : 'text-[#374151] group-hover:text-[#0D7A5F]'}
                `}
                            >
                                {label}
                            </span>
                            <ArrowRight
                                className={`w-4 h-4 transition-transform group-hover:translate-x-0.5
                  ${danger ? 'text-[#DC2626]' : 'text-[#9CA3AF] group-hover:text-[#0D7A5F]'}
                `}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardSidePanels;