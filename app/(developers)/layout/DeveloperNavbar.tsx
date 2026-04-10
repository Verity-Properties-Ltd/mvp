'use client';

import React, { useState } from 'react';
import { Bell, ChevronDown } from 'lucide-react';

const DeveloperNavbar = () => {
    const [profileOpen, setProfileOpen] = useState(false);

    return (
        <nav className="h-14 bg-white border-b border-[#F3F4F6] px-6 flex items-center justify-end shrink-0">

            {/* Right Section */}
            <div className="flex items-center gap-1">

                {/* Notification Bell */}
                <button
                    className="relative p-2.5 rounded-xl hover:bg-[#F3F4F6] transition-colors group"
                    title="Notifications"
                >
                    <Bell className="w-5 h-5 text-[#6B7280] group-hover:text-[#374151] transition-colors" />
                    {/* Unread badge */}
                    <span className="absolute top-2 right-2 w-2 h-2 bg-[#DC2626] rounded-full ring-2 ring-white" />
                </button>

                {/* Divider */}
                <div className="h-6 w-px bg-[#E5E7EB] mx-2" />

                {/* User Profile */}
                <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="relative flex items-center gap-2.5 pl-1 pr-3 py-1.5 rounded-xl hover:bg-[#F3F4F6] transition-colors"
                >
                    {/* Teal avatar */}
                    <div className="w-8 h-8 rounded-full bg-[#0D7A5F] flex items-center justify-center shrink-0">
                        <span className="text-white text-xs font-bold tracking-wide">AO</span>
                    </div>

                    {/* Name + role */}
                    <div className="text-left hidden sm:block">
                        <p className="text-sm font-semibold text-[#111827] leading-tight">
                            Adebayo Okonkwo
                        </p>
                        <p className="text-[11px] text-[#9CA3AF] leading-tight">Admin</p>
                    </div>

                    <ChevronDown
                        className={`w-3.5 h-3.5 text-[#9CA3AF] hidden sm:block transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`}
                    />

                    {/* Dropdown */}
                    {profileOpen && (
                        <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-[#E5E7EB] py-1.5 z-50">
                            {/* User meta */}
                            <div className="px-4 py-2.5 border-b border-[#F3F4F6]">
                                <p className="text-sm font-semibold text-[#111827]">Adebayo Okonkwo</p>
                                <p className="text-[11px] text-[#9CA3AF] mt-0.5">adebayo@okonkwoproperties.ng</p>
                            </div>

                            <div className="py-1">
                                {[
                                    { label: 'Account Settings' },
                                    { label: 'Billing' },
                                    { label: 'Help & Support' },
                                ].map(({ label }) => (
                                    <button
                                        key={label}
                                        className="w-full text-left px-4 py-2 text-sm text-[#374151] hover:bg-[#F3F4F6] transition-colors"
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>

                            <div className="border-t border-[#F3F4F6] pt-1">
                                <button className="w-full text-left px-4 py-2 text-sm text-[#DC2626] hover:bg-[#FEE2E2] transition-colors">
                                    Sign out
                                </button>
                            </div>
                        </div>
                    )}
                </button>
            </div>
        </nav>
    );
};

export default DeveloperNavbar;