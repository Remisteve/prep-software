'use client'

import React, { useState } from 'react';
import {
    Users, Calendar, Clock, Plus, Eye, TrendingUp, TrendingDown,
    UserCheck, UserX, CheckCircle, XCircle, AlertTriangle,
    Pill, Package, Activity, Bell, Settings, BarChart3,
    FileText, Shield, Heart, Stethoscope, Building2, Phone,
    Mail, MapPin, Star, Download
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import GlassCard from '@/components/custom/GlassCard';


// Statistics Card Component
function StatCard({ title, value, icon: Icon, color, trend, trendValue, bgGradient, hoverColor, pulse = true }: {
    title: string;
    value: string | number;
    icon: any;
    color: string;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
    bgGradient: string;
    hoverColor: string;
    pulse?: boolean;
}) {
    const getTrendIcon = () => {
        switch (trend) {
            case 'up': return <TrendingUp className="w-3 h-3 text-emerald-400" />;
            case 'down': return <TrendingDown className="w-3 h-3 text-red-400" />;
            default: return null;
        }
    };

    return (
        <div className={`group relative p-6 rounded-2xl bg-gradient-to-br from-black/40 to-black/20 border border-white/20 backdrop-blur-xl hover:border-${hoverColor} hover:bg-black/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-${hoverColor}/20 overflow-hidden`}>
            {/* Background decoration */}
            <div className={`absolute inset-0 ${bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-${hoverColor}/50 to-transparent`} />
            <div className={`absolute -top-12 -right-12 w-24 h-24 bg-${hoverColor}/10 rounded-full blur-xl group-hover:bg-${hoverColor}/20 transition-colors duration-300`} />
            
            <div className="relative z-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className={`p-3 rounded-xl bg-${hoverColor}/20 border border-${hoverColor}/30 backdrop-blur-sm group-hover:bg-${hoverColor}/30 transition-colors duration-300`}>
                            <Icon className={`w-6 h-6 ${color}`} />
                        </div>
                        <div className="ml-4">
                            <div className={`text-3xl font-bold ${color} mb-1 group-hover:opacity-90 transition-colors duration-300`}>
                                {value}
                            </div>
                            <div className="text-gray-300 text-sm font-medium">{title}</div>
                            {trend && trendValue && (
                                <div className="flex items-center space-x-1 mt-1">
                                    {getTrendIcon()}
                                    <span className={`text-xs ${trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}>
                                        {trendValue}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    {pulse && <div className={`w-2 h-2 ${color.replace('text-', 'bg-')} rounded-full animate-pulse`} />}
                </div>
            </div>
        </div>
    );
}

// Patient Registration Trend Component
function PatientRegistrationTrend() {
    // Mock data for the last 12 months
    const registrationData = [
        { month: 'Jan', patients: 85, newPatients: 12 },
        { month: 'Feb', patients: 98, newPatients: 15 },
        { month: 'Mar', patients: 112, newPatients: 18 },
        { month: 'Apr', patients: 128, newPatients: 22 },
        { month: 'May', patients: 145, newPatients: 25 },
        { month: 'Jun', patients: 162, newPatients: 28 },
        { month: 'Jul', patients: 178, newPatients: 32 },
        { month: 'Aug', patients: 195, newPatients: 29 },
        { month: 'Sep', patients: 218, newPatients: 35 },
        { month: 'Oct', patients: 242, newPatients: 38 },
        { month: 'Nov', patients: 268, newPatients: 42 },
        { month: 'Dec', patients: 295, newPatients: 45 }
    ];

    // Custom tooltip for the chart
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-lg p-3 shadow-lg">
                    <p className="text-white font-medium">{`${label} 2024`}</p>
                    <p className="text-blue-400">
                        {`Total: ${payload[0].value} patients`}
                    </p>
                    <p className="text-emerald-400">
                        {`New: +${payload[1].value} patients`}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white flex items-center">
                        <TrendingUp className="w-5 h-5 text-emerald-400 mr-2" />
                        Patient Registration Trend
                    </h3>
                    <p className="text-gray-400 text-sm">Monthly patient registrations over the past year</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        <span className="text-gray-300 text-sm">Total Patients</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                        <span className="text-gray-300 text-sm">New Registrations</span>
                    </div>
                </div>
            </div>
            
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={registrationData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid 
                            strokeDasharray="3 3" 
                            stroke="rgba(255,255,255,0.1)" 
                            horizontal={true} 
                            vertical={false}
                        />
                        <XAxis 
                            dataKey="month" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        />
                        <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line 
                            type="monotone" 
                            dataKey="patients" 
                            stroke="#60A5FA" 
                            strokeWidth={3}
                            dot={{ fill: '#60A5FA', strokeWidth: 2, r: 5 }}
                            activeDot={{ r: 7, fill: '#3B82F6' }}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="newPatients" 
                            stroke="#34D399" 
                            strokeWidth={3}
                            dot={{ fill: '#34D399', strokeWidth: 2, r: 5 }}
                            activeDot={{ r: 7, fill: '#10B981' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </GlassCard>
    );
}
function RecentActivity() {
    const activities = [
        {
            id: 1,
            type: 'user_registration',
            message: 'New user registered: John Smith',
            time: '2 minutes ago',
            icon: UserCheck,
            color: 'text-emerald-400'
        },
        {
            id: 2,
            type: 'appointment_booked',
            message: 'Appointment booked with Dr. Sarah Johnson',
            time: '5 minutes ago',
            icon: Calendar,
            color: 'text-blue-400'
        },
        {
            id: 3,
            type: 'request_approved',
            message: 'PrEP request approved for Emily Rodriguez',
            time: '12 minutes ago',
            icon: CheckCircle,
            color: 'text-green-400'
        },
        {
            id: 4,
            type: 'drug_low_stock',
            message: 'Low stock alert: Truvada (15 units remaining)',
            time: '25 minutes ago',
            icon: AlertTriangle,
            color: 'text-amber-400'
        },
        {
            id: 5,
            type: 'appointment_completed',
            message: 'Appointment completed: Mental Health Session',
            time: '1 hour ago',
            icon: CheckCircle,
            color: 'text-purple-400'
        }
    ];

    return (
        <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white flex items-center">
                    <Activity className="w-5 h-5 text-blue-400 mr-2" />
                    Recent Activity
                </h3>
                <button className="text-blue-400 hover:text-blue-300 text-sm">View All</button>
            </div>
            <div className="space-y-4">
                {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                        <div className={`p-2 rounded-lg bg-white/10 ${activity.color}`}>
                            <activity.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                            <p className="text-white text-sm">{activity.message}</p>
                            <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </GlassCard>
    );
}

// Quick Actions Component
function QuickActions() {
    const router = useRouter();

    const actions = [
        {
            title: 'Add User',
            description: 'Register new user',
            icon: Plus,
            color: 'from-blue-500 to-cyan-500',
            onClick: () => router.push('/admin/users/add')
        },
        {
            title: 'Book Appointment',
            description: 'Schedule appointment',
            icon: Calendar,
            color: 'from-emerald-500 to-green-500',
            onClick: () => router.push('/admin/appointments/add')
        },
        {
            title: 'Manage Drugs',
            description: 'Update inventory',
            icon: Pill,
            color: 'from-purple-500 to-indigo-500',
            onClick: () => router.push('/admin/drugs')
        },
        {
            title: 'View Reports',
            description: 'Generate reports',
            icon: FileText,
            color: 'from-amber-500 to-orange-500',
            onClick: () => router.push('/admin/reports')
        }
    ];

    return (
        <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                <Settings className="w-5 h-5 text-blue-400 mr-2" />
                Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-4">
                {actions.map((action, index) => (
                    <button
                        key={index}
                        onClick={action.onClick}
                        className={`p-4 rounded-xl bg-gradient-to-r ${action.color} hover:opacity-90 transition-all hover:scale-105 text-white group relative overflow-hidden`}
                    >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10">
                            <action.icon className="w-6 h-6 mb-2 mx-auto" />
                            <div className="text-sm font-semibold">{action.title}</div>
                            <div className="text-xs opacity-90">{action.description}</div>
                        </div>
                    </button>
                ))}
            </div>
        </GlassCard>
    );
}

// Main Admin Dashboard Component
function AdminDashboard() {
    const router = useRouter();

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <GlassCard variant="primary" className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-white">Admin Dashboard</h1>
                        <p className="text-blue-400">Overview of platform operations and statistics</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-purple-500/25 flex items-center space-x-2">
                            <Download className="w-4 h-4" />
                            <span>Export Data</span>
                        </button>
                        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/25 flex items-center space-x-2">
                            <BarChart3 className="w-4 h-4" />
                            <span>View Analytics</span>
                        </button>
                    </div>
                </div>
            </GlassCard>

            {/* Main Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Upcoming Appointments"
                    value={89}
                    icon={Calendar}
                    color="text-blue-400"
                    bgGradient="bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-transparent"
                    hoverColor="blue-400/40"
                    trend="up"
                    trendValue="Next 7 days"
                />
                <StatCard
                    title="Total Users"
                    value={1247}
                    icon={Users}
                    color="text-emerald-400"
                    bgGradient="bg-gradient-to-br from-emerald-500/5 via-green-500/5 to-transparent"
                    hoverColor="emerald-400/40"
                    trend="up"
                    trendValue="+12% this month"
                />
                <StatCard
                    title="Drugs Dispensed"
                    value={3420}
                    icon={Pill}
                    color="text-purple-400"
                    bgGradient="bg-gradient-to-br from-purple-500/5 via-indigo-500/5 to-transparent"
                    hoverColor="purple-400/40"
                    trend="up"
                    trendValue="+8% this week"
                />
            </div>

            {/* Patient Registration Trend Chart */}
            <PatientRegistrationTrend />

            {/* Bottom Section with Recent Activity and Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentActivity />
                <QuickActions />
            </div>
        </div>
    );
}

export default AdminDashboard;