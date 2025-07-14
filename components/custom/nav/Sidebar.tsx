
import React, { ForwardRefExoticComponent } from 'react';
import {
    Heart, LucideProps, User
} from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';


export interface NavigationItem {
    id: string;
    label: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    path: string;
    badge?: string | number;
}

type SidebarProps = {
    isOpen: boolean;
    isMobile: boolean;
    navigationItems: NavigationItem[];
    onClose?: () => void;
};

function Sidebar({ isOpen, isMobile, navigationItems, onClose }: SidebarProps) {
    const pathname = usePathname();

    // Close sidebar when clicking outside (mobile)
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && onClose) {
            onClose();
        }
    };

    return (
        <>
            {/* Mobile backdrop */}
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={handleBackdropClick}
                />
            )}

            {/* Sidebar with MedConnect theme */}
            <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 backdrop-blur-xl bg-black/95 border-r border-white/20
        ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}
        transition-transform duration-300
      `}>
                <div className="p-6 h-full overflow-y-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mr-3 shadow-lg">
                                <Heart className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white">MedConnect</h2>
                                <p className="text-xs text-gray-400">Health Portal</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-2">
                        {navigationItems.map((item) => {
                            const isActive = pathname === item.path;
                            const IconComponent = item.icon;

                            return (
                                <Link
                                    key={item.id}
                                    href={item.path}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-left ${isActive
                                        ? 'bg-white/15 border border-white/20 text-white'
                                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                        }`}
                                    onClick={isMobile ? onClose : undefined}
                                >
                                    <div className="flex items-center">
                                        <IconComponent className="w-5 h-5 mr-3" />
                                        <span className="font-medium">{item.label}</span>
                                    </div>

                                    {/* Badge */}
                                    {item.badge && (
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${isActive
                                            ? 'bg-white/20 text-white'
                                            : 'bg-blue-600 text-white'
                                            }`}>
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer - User Profile */}
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-medium text-sm truncate">Marina Chen</p>
                                    <p className="text-gray-400 text-xs truncate">ID: MC001234</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar