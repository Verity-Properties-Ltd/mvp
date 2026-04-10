'use client';

import React, { useState } from 'react';
import {
    LayoutDashboard,
    Building2,
    Upload,
    Users,
    CreditCard,
    Settings,
    ChevronsLeft,
    ChevronsRight,
    FileBarChart2,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ─── Nav structure matching the design ───────────────────────────────────────
const mainMenu = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', disabled: false },
    { name: 'Properties', icon: Building2, path: '/dashboard/properties', disabled: false },
    { name: 'reports', icon: FileBarChart2, path: '/dashboard/reports', disabled: true },
];

const accountMenu = [
    { name: 'Team', icon: Users, path: '/developer/team', disabled: true },
    { name: 'Billing', icon: CreditCard, path: '/developer/billing', disabled: true },
    { name: 'Settings', icon: Settings, path: '/developer/settings', disabled: true },
];

// ─── Verity Shield Logo SVG ───────────────────────────────────────────────────
const VerityShieldIcon = ({ size = 28 }: { size?: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M16 2L4 7V16C4 22.627 9.373 28 16 30C22.627 28 28 22.627 28 16V7L16 2Z"
            fill="#C9A84C"
        />
        <path
            d="M16 2L4 7V16C4 22.627 9.373 28 16 30C22.627 28 28 22.627 28 16V7L16 2Z"
            fill="url(#shield-gradient)"
        />
        <path
            d="M11 16L14.5 19.5L21 13"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <defs>
            <linearGradient id="shield-gradient" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F0D080" />
                <stop offset="1" stopColor="#C9A84C" />
            </linearGradient>
        </defs>
    </svg>
);

// ─── Single nav item ──────────────────────────────────────────────────────────
interface NavItemProps {
    name: string;
    icon: React.ElementType;
    path: string;
    isActive: boolean;
    isCollapsed: boolean;
    disabled?: boolean;
}

const NavItem = ({ name, icon: Icon, path, isActive, isCollapsed, disabled }: NavItemProps) => {
    const baseClass = `
        flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-sm group relative
        ${isCollapsed ? 'justify-center' : ''}
        ${disabled
            ? 'text-[#D1D5DB] cursor-not-allowed opacity-50'
            : isActive
                ? 'bg-[#FDF6E7] text-[#C9A84C]'
                : 'text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#374151]'
        }
    `;

    const content = (
        <>
            <Icon
                className={`shrink-0 transition-colors ${isCollapsed ? 'w-5 h-5' : 'w-[18px] h-[18px]'}
                    ${disabled ? 'text-[#D1D5DB]' : isActive ? 'text-[#C9A84C]' : 'text-[#9CA3AF] group-hover:text-[#6B7280]'}`}
            />
            {!isCollapsed && (
                <span className={`font-medium leading-none ${disabled ? '' : isActive ? 'text-[#C9A84C]' : ''}`}>
                    {name}
                </span>
            )}
        </>
    );

    if (disabled) {
        return (
            <span title={isCollapsed ? name : undefined} className={baseClass}>
                {content}
            </span>
        );
    }

    return (
        <Link href={path} title={isCollapsed ? name : undefined} className={baseClass}>
            {content}
        </Link>
    );
};

// ─── Section label ────────────────────────────────────────────────────────────
const SectionLabel = ({ label, isCollapsed }: { label: string; isCollapsed: boolean }) => {
    if (isCollapsed) {
        return <div className="my-2 mx-3 h-px bg-[#E5E7EB]" />;
    }
    return (
        <p className="px-3 pt-5 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF] select-none">
            {label}
        </p>
    );
};

// ─── Main Sidebar ─────────────────────────────────────────────────────────────
const DeveloperSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <aside
            className={`
                ${isCollapsed ? 'w-[72px]' : 'w-60'}
                h-screen bg-white border-r border-[#E5E7EB] flex flex-col
                transition-all duration-300 ease-in-out shrink-0
            `}
        >
            {/* ── Logo ── */}
            <div className="h-14 flex items-center px-4 border-b border-[#F3F4F6] shrink-0">
                {isCollapsed ? (
                    <div className="mx-auto">
                        <VerityShieldIcon size={26} />
                    </div>
                ) : (
                    <div className="flex items-center gap-2.5">
                        <VerityShieldIcon size={28} />
                        <span className="text-[17px] font-bold tracking-[0.12em] text-[#1B3F6B] uppercase">
                            Verity
                        </span>
                    </div>
                )}
            </div>

            {/* ── Navigation ── */}
            <nav className="flex-1 px-3 py-2 overflow-y-auto">
                {/* Main Menu */}
                <SectionLabel label="Main Menu" isCollapsed={isCollapsed} />
                <div className="space-y-0.5">
                    {mainMenu.map(({ name, icon, path, disabled }) => (
                        <NavItem
                            key={path}
                            name={name}
                            icon={icon}
                            path={path}
                            isActive={isActive(path)}
                            isCollapsed={isCollapsed}
                            disabled={disabled}
                        />
                    ))}
                </div>

                {/* Account */}
                <SectionLabel label="Account" isCollapsed={isCollapsed} />
                <div className="space-y-0.5">
                    {accountMenu.map(({ name, icon, path, disabled }) => (
                        <NavItem
                            key={path}
                            name={name}
                            icon={icon}
                            path={path}
                            isActive={isActive(path)}
                            isCollapsed={isCollapsed}
                            disabled={disabled}
                        />
                    ))}
                </div>
            </nav>

            {/* ── Collapse toggle ── */}
            <div className="px-3 py-3 border-t border-[#F3F4F6] shrink-0">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`
                        flex items-center gap-2 w-full px-3 py-2 rounded-xl
                        text-[#9CA3AF] hover:text-[#6B7280] hover:bg-[#F3F4F6]
                        transition-colors text-sm font-medium
                        ${isCollapsed ? 'justify-center' : ''}
                    `}
                    title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {isCollapsed ? (
                        <ChevronsRight className="w-4 h-4 shrink-0" />
                    ) : (
                        <>
                            <ChevronsLeft className="w-4 h-4 shrink-0" />
                            <span>Collapse</span>
                        </>
                    )}
                </button>
            </div>

            {/* ── User profile ── */}
            <div className="px-3 pb-4 shrink-0">
                <div
                    className={`
                        flex items-center gap-3 px-2 py-2.5 rounded-xl
                        hover:bg-[#F3F4F6] cursor-pointer transition-colors
                        ${isCollapsed ? 'justify-center px-0' : ''}
                    `}
                >
                    {/* Avatar — teal circle with initials, matching the design */}
                    <div className="w-9 h-9 rounded-full bg-[#0D7A5F] flex items-center justify-center shrink-0">
                        <span className="text-white text-xs font-bold tracking-wide">AO</span>
                    </div>

                    {!isCollapsed && (
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-[#111827] truncate leading-tight">
                                Adebayo Okonkwo
                            </p>
                            <p className="text-[11px] text-[#9CA3AF] truncate leading-tight mt-0.5">
                                Admin · Okonkwo Properties
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default DeveloperSidebar;