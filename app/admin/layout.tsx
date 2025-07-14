'use client'

import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import { AlertTriangle, Bell, BookOpen, Calendar, Home, MapPin, MessageCircle, Shield, User } from 'lucide-react'
import Sidebar from '@/components/custom/nav/Sidebar';

const Layout = ({ children }: { children: ReactNode }) => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const sections = useMemo(() => [
        { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
        { id: 'enrollment', label: 'Enrollment', icon: User, path: '/enrollments' },
        { id: 'facilities', label: 'Facilities', icon: MapPin, path: '/admin/facilities' },
        { id: 'appointments', label: 'Appointments', icon: Calendar, path: '/appointments' },
        { id: 'resources', label: 'Educational Resources', icon: BookOpen, path: '/resources' },
        { id: 'requests', label: 'Requests', icon: Shield, path: '/admin/requests' },
        { id: 'reminders', label: 'Reminders', icon: Bell, path: '/bell' },
        { id: 'lab', label: 'Lab', icon: Bell, path: '/lab' },
        { id: 'consultation', label: 'Provider Chat', icon: MessageCircle, path: '/consultation' },
        { id: 'emergency', label: 'Emergency Support', icon: AlertTriangle, path: '/emergency' }
    ], []);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
            {/* Simplified background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
            </div>

            {/* <Header
                isMobile={isMobile}
                toggleSidebar={toggleSidebar}
                sidebarOpen={sidebarOpen}
            /> */}

            <div className="flex min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-4.5rem)]">
                <Sidebar
                    isOpen={sidebarOpen}
                    isMobile={isMobile}
                    navigationItems={sections}
                />

                <main className={`flex-1 p-4 lg:p-6 transition-all duration-300 ${isMobile ? '' : 'ml-72'
                    }`}>
                    <div className="max-w-6xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Layout