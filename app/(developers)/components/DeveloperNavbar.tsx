import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

const DeveloperNavbar = () => {
    return (
        <nav className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
            {/* Left Section - Search */}
            <div className="flex items-center flex-1 max-w-xl">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search claims, patients, or codes..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                </div>
            </div>

            {/* Right Section - Actions & Profile */}
            <div className="flex items-center gap-4 ml-6">
                {/* Notifications */}
                <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Divider */}
                <div className="h-8 w-px bg-gray-200"></div>

                {/* User Profile */}
                <button className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors">
                    <div className="w-9 h-9 bg-linear-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">JD</span>
                    </div>
                    <div className="text-left hidden sm:block">
                        <p className="text-sm font-medium text-gray-800">John Doe</p>
                        <p className="text-xs text-gray-500">Administrator</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
                </button>
            </div>
        </nav>
    );
};

export default DeveloperNavbar;