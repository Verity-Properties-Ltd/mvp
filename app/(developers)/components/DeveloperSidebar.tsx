'use client';

import React, { useState } from 'react';
import {
    LayoutDashboard,
    Activity,
    ShieldAlert,
    FileText,
    ClipboardList,
    Settings,
    PanelLeft,
    PanelRight,
    Stethoscope,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Medical Coding', icon: Activity, path: '/coding' },
    { name: 'Denial Risk', icon: ShieldAlert, path: '/denial-risk' },
    { name: 'Claims Management', icon: FileText, path: '/claims-management' },
    { name: 'Encounters', icon: Stethoscope, path: '/encounters' },
];

const DeveloperSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) =>
        pathname === path || pathname.startsWith(path + '/');

    return (
        <aside
            className={`${isCollapsed ? 'w-[72px]' : 'w-64'
                } h-screen bg-[#0C1A2E] flex flex-col transition-all duration-300 ease-in-out shrink-0`}
        >
            {/* Logo row */}
            <div className="h-16 flex items-center px-4 border-b border-white/5 gap-3 shrink-0">
                {!isCollapsed && (
                    <span className="text-[15px] font-semibold tracking-tight text-white">
                        Claim<span className="text-[#4DA8FF]">Swift</span>
                    </span>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`${isCollapsed ? 'mx-auto' : 'ml-auto'
                        } p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors`}
                    title={isCollapsed ? 'Expand' : 'Collapse'}
                >
                    {isCollapsed ? (
                        <PanelRight className="w-4 h-4" />
                    ) : (
                        <PanelLeft className="w-4 h-4" />
                    )}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
                {menuItems.map(({ name, icon: Icon, path }) => {
                    const active = isActive(path);
                    return (
                        <Link
                            key={path}
                            href={path}
                            title={isCollapsed ? name : undefined}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-sm group
                ${active
                                    ? 'bg-[#4DA8FF]/15 text-white'
                                    : 'text-white/50 hover:bg-white/5 hover:text-white/80'
                                }
                ${isCollapsed ? 'justify-center' : ''}
              `}
                        >
                            <Icon
                                className={`w-[18px] h-[18px] shrink-0 transition-colors ${active ? 'text-[#4DA8FF]' : 'text-white/40 group-hover:text-white/70'
                                    }`}
                            />
                            {!isCollapsed && (
                                <span className={`font-medium ${active ? 'text-white' : ''}`}>
                                    {name}
                                </span>
                            )}
                            {/* Active indicator bar */}
                            {active && !isCollapsed && (
                                <span className="ml-auto w-1 h-4 rounded-full bg-[#4DA8FF] shrink-0" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom user profile */}
            <div className="px-3 py-4 border-t border-white/5 shrink-0">
                <div
                    className={`flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors ${isCollapsed ? 'justify-center px-0' : ''
                        }`}
                >
                    <Avatar className="w-8 h-8 shrink-0">
                        <AvatarFallback className="bg-[#4DA8FF]/20 text-[#4DA8FF] text-xs font-semibold border border-[#4DA8FF]/20">
                            JD
                        </AvatarFallback>
                    </Avatar>
                    {!isCollapsed && (
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-white truncate">John Doe</p>
                            <p className="text-[11px] text-white/40 truncate">Administrator</p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default DeveloperSidebar;