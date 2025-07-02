import { Button } from '@/components/ui/button'
import { Activity, Bell, ChevronDown, Settings } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const Navbar = () => {
    const { data: session } = useSession()
    return (
        <header className="bg-white  border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center space-x-4">
                        <Activity className="h-8 w-8 text-blue-600" />
                        <h1 className="text-2xl font-bold text-gray-900">HealthCare+ Admin</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="relative p-2 text-gray-600 hover:text-gray-900">
                            <Bell className="h-6 w-6" />
                            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                5
                            </span>
                        </button>
                        <button className="p-2 text-gray-600 hover:text-gray-900">
                            <Settings className="h-6 w-6" />
                        </button>
                        <Button
                            onClick={() => signOut()}
                        >Sign Out</Button>
                        <div className="flex items-center space-x-3">
                            <img
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                                alt="Admin"
                                className="h-8 w-8 rounded-full"
                            />
                            <span className="text-sm font-medium text-gray-700">{session?.user?.name}</span>
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar