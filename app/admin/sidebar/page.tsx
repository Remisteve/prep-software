'use client'

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    Shield,
    Users,
    UserCheck,
    Heart,
    Building2,
    BarChart3,
    Bot,
    Smartphone,
    Ban,
    MapPin,
    Download,
    Calendar,
    UserPlus,
    Globe,
    Video,
    Volume2,
    Home,
    Activity,
    Wifi,
    ChevronRight,
    Zap,
    Cpu,
    TrendingUp,
    Settings,
    HelpCircle
} from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();
    const [activeItem, setActiveItem] = useState('');

    // Set active item based on current path
    useEffect(() => {
        const path = pathname.split('/').pop() || 'dashboard';
        setActiveItem(path === 'superadmin' ? 'dashboard' : path);
    }, [pathname]);

    // Enhanced sidebar items with exact modules and realistic data
    const sidebarItems = [
        {
            id: 'dashboard',
            name: 'Dashboard',
            icon: Home,
            href: '/superadmin',
            badge: null,
            isActive: true
        },
        {
            id: 'module',
            name: 'Superadmin Module',
            icon: Shield,
            href: '/superadmin/module',
            badge: 'OWNER',
            isActive: true
        },
        {
            id: 'admins',
            name: 'Admin Management',
            icon: UserCheck,
            href: '/superadmin/admins',
            badge: '12',
            isActive: false
        },
        {
            id: 'doctors',
            name: 'Doctors',
            icon: UserCheck,
            href: '/superadmin/doctors',
            badge: '48',
            isActive: true
        },
        {
            id: 'prep-champions',
            name: 'PrEP Champions',
            icon: Heart,
            href: '/superadmin/prep-champions',
            badge: '24',
            isActive: false
        },
        {
            id: 'patients',
            name: 'Patients',
            icon: Users,
            href: '/superadmin/patients',
            badge: '1.2K',
            isActive: true
        },
        {
            id: 'app-users',
            name: 'App Users',
            icon: Smartphone,
            href: '/superadmin/app-users',
            badge: '567',
            isActive: true
        },
        {
            id: 'appointments',
            name: 'Appointments',
            icon: Calendar,
            href: '/superadmin/appointments',
            badge: '89',
            isActive: true
        },
        {
            id: 'enrollments',
            name: 'Enrollments',
            icon: UserPlus,
            href: '/superadmin/enrollments',
            badge: '156',
            isActive: true
        },
        {
            id: 'facilities',
            name: 'Facilities',
            icon: Building2,
            href: '/superadmin/facilities',
            badge: '85',
            isActive: false
        },
        {
            id: 'joined-online',
            name: 'Joined Online',
            icon: Globe,
            href: '/superadmin/joined-online',
            badge: '342',
            isActive: true
        },
        {
            id: 'test-videos',
            name: 'HIV Test Videos',
            icon: Video,
            href: '/superadmin/test-videos',
            badge: '78',
            isActive: true
        },
        {
            id: 'condoms',
            name: 'Condoms',
            icon: Heart,
            href: '/superadmin/condoms',
            badge: '2.4K',
            isActive: false
        },
        {
            id: 'prep-pep',
            name: 'PrEP/PEP',
            icon: Shield,
            href: '/superadmin/prep-pep',
            badge: '892',
            isActive: true
        },
        {
            id: 'locations',
            name: 'Locations',
            icon: MapPin,
            href: '/superadmin/locations',
            badge: '89',
            isActive: false
        },
        {
            id: 'live-downloads',
            name: 'Live Downloads',
            icon: Download,
            href: '/superadmin/live-downloads',
            badge: 'LIVE',
            isActive: true,
            isLive: true
        },
        {
            id: 'blocked',
            name: 'Blocked Users',
            icon: Ban,
            href: '/superadmin/blocked',
            badge: '5',
            isActive: false
        },
        {
            id: 'notifications',
            name: 'Notifications',
            icon: Volume2,
            href: '/superadmin/notifications',
            badge: '34',
            isActive: false
        },
        {
            id: 'reports',
            name: 'Reports & Analytics',
            icon: BarChart3,
            href: '/superadmin/reports',
            badge: '45',
            isActive: false
        },
        {
            id: 'ai',
            name: 'AI Assistant',
            icon: Bot,
            href: '/superadmin/ai',
            badge: 'AI',
            isActive: true,
            isAI: true
        },
    ];

    // Group items for better organization
    const groupedItems = [
        {
            title: 'Core Management',
            items: sidebarItems.slice(0, 6)
        },
        {
            title: 'Operations',
            items: sidebarItems.slice(6, 12)
        },
        {
            title: 'Services & Resources',
            items: sidebarItems.slice(12, 18)
        },
        {
            title: 'System & Analytics',
            items: sidebarItems.slice(18)
        }
    ];

    const getBadgeClasses = (item: any) => {
        if (item.badge === 'LIVE') return 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse';
        if (item.badge === 'AI') return 'bg-green-500/20 text-green-400 border border-green-500/30 animate-pulse';
        if (item.badge === 'OWNER') return 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30';
        if (activeItem === item.id) return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
        return 'bg-gray-600/30 text-gray-400 border border-gray-600/30';
    };

    return (
        <aside className="w-80 h-screen border-r border-gray-700 flex flex-col" style={{ backgroundColor: '#1e2a4a' }}>

            {/* Sidebar Content with Custom Scrollbar */}
            <div className="flex-1 overflow-y-auto" style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#4b5563 transparent'
            }}>
                <style >{`
          div::-webkit-scrollbar {
            width: 6px;
          }
          div::-webkit-scrollbar-thumb {
            background-color: #4b5563;
            border-radius: 3px;
          }
          div::-webkit-scrollbar-thumb:hover {
            background-color: #6b7280;
          }
          div::-webkit-scrollbar-track {
            background-color: transparent;
          }
        `}</style>

                {/* Quick Stats Header */}
                <div className="p-4 border-b border-gray-700">
                    <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-xl p-4 border border-blue-800/30">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-bold text-white">System Overview</h3>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                                <span className="text-xs text-green-400 font-semibold">Online</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="text-center">
                                <p className="text-gray-300">Total Users</p>
                                <p className="font-bold text-white">1,885</p>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-300">Active Now</p>
                                <p className="font-bold text-green-400">234</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Groups */}
                <nav className="p-4">
                    {groupedItems.map((group, groupIndex) => (
                        <div key={groupIndex} className="mb-8">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">
                                {group.title}
                            </h4>
                            <div className="space-y-1">
                                {group.items.map((item) => {
                                    const isCurrentActive = activeItem === item.id;

                                    return (
                                        <Link
                                            key={item.id}
                                            href={item.href}
                                            onClick={() => setActiveItem(item.id)}
                                            className={`group flex items-center justify-between px-3 py-3 rounded-xl font-medium transition-all duration-200 relative overflow-hidden ${isCurrentActive
                                                    ? 'text-white shadow-lg'
                                                    : 'text-gray-300 hover:text-white'
                                                }`}
                                            style={isCurrentActive ? {
                                                background: 'linear-gradient(to left, rgba(59, 130, 246, 0.8), rgba(147, 197, 253, 0.3), rgba(255, 255, 255, 0.1))'
                                            } : {}}
                                        >
                                            {/* Background animation for hover */}
                                            {!isCurrentActive && (
                                                <div className="absolute inset-0 bg-gradient-to-l from-blue-600/20 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                                            )}

                                            <div className="flex items-center relative z-10">
                                                {/* Icon with special effects for AI and Live */}
                                                <div className={`relative ${item.isAI ? 'animate-pulse' : ''
                                                    }`}>
                                                    <item.icon className={`w-5 h-5 mr-3 transition-transform group-hover:scale-110 ${isCurrentActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'
                                                        }`} />

                                                    {/* AI Neural Effect */}
                                                    {item.isAI && (
                                                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                                                    )}

                                                    {/* Live Pulse Effect */}
                                                    {item.isLive && (
                                                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full animate-bounce"></div>
                                                    )}
                                                </div>

                                                <span className="relative z-10">{item.name}</span>

                                                {/* Active indicator */}
                                                {isCurrentActive && (
                                                    <ChevronRight className="w-4 h-4 ml-2 opacity-60 text-white" />
                                                )}
                                            </div>

                                            {/* Badges */}
                                            <div className="flex items-center space-x-2 relative z-10">
                                                {/* Status indicators */}
                                                {item.isActive && (
                                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                                )}

                                                {/* Badge */}
                                                {item.badge && (
                                                    <span className={`px-2 py-1 text-xs font-bold rounded-lg transition-all ${getBadgeClasses(item)} ${item.badge === 'LIVE' ? 'animate-pulse' :
                                                            item.badge === 'AI' ? 'animate-pulse' : ''
                                                        }`}>
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Quick Actions */}
                <div className="p-4 border-t border-gray-700">
                    <div className="space-y-2">
                        <button className="w-full flex items-center px-3 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors">
                            <Settings className="w-4 h-4 mr-3" />
                            <span className="text-sm">Settings</span>
                        </button>
                        <button className="w-full flex items-center px-3 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors">
                            <HelpCircle className="w-4 h-4 mr-3" />
                            <span className="text-sm">Help & Support</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Enhanced Sidebar Footer */}
            <div className="p-4 border-t border-gray-700" style={{ backgroundColor: '#1e2a4a' }}>
                <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl p-4 border border-green-800/30">
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="relative">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                <Activity className="w-4 h-4 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white flex items-center">
                                System Status
                                <Zap className="w-3 h-3 ml-2 text-green-400 animate-pulse" />
                            </p>
                            <p className="text-xs text-gray-300">All systems operational</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-1">
                                <Wifi className="w-3 h-3 text-green-400 mr-1" />
                            </div>
                            <p className="text-gray-300">Online</p>
                            <p className="font-bold text-green-400">99.9%</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-1">
                                <Cpu className="w-3 h-3 text-blue-400 mr-1" />
                            </div>
                            <p className="text-gray-300">CPU</p>
                            <p className="font-bold text-blue-400">67%</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-1">
                                <TrendingUp className="w-3 h-3 text-purple-400 mr-1" />
                            </div>
                            <p className="text-gray-300">Load</p>
                            <p className="font-bold text-purple-400">1.2</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}