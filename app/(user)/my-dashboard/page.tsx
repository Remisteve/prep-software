'use client'

import React, { useState } from 'react';
import {
    Calendar, BookOpen, Pill, MessageCircle, AlertTriangle,
    Activity, Video, FileText,
    Heart, Shield, Stethoscope,

    CalendarPlus,
    Target,
    TrendingUp
} from 'lucide-react';
import GlassCard from '@/components/custom/GlassCard';
import StatusBadge, { statusStyles } from '@/components/custom/StatusBadge';



// Dashboard Content
function Dashboard() {
    const [healthScore] = useState(92);

    return (
        <div className="space-y-6">
            {/* Welcome Section - Simplified */}
            <GlassCard variant="primary" className="p-6" hover>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                            Welcome back, Marina
                        </h1>
                        <p className="text-gray-300 mb-4">Your health journey is progressing well</p>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                                <span className="text-emerald-400 text-sm font-medium">All Systems Active</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <TrendingUp className="w-4 h-4 text-blue-400" />
                                <span className="text-blue-400 text-sm font-medium">Health Score: {healthScore}%</span>
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                            <Heart className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </div>
            </GlassCard>

            {/* Status Cards - Clean Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <GlassCard className="p-4" hover>
                    <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-lg ${statusStyles.success.bg} ${statusStyles.success.border} border`}>
                            <Shield className={`w-5 h-5 ${statusStyles.success.icon}`} />
                        </div>
                        <StatusBadge status="success">Active</StatusBadge>
                    </div>
                    <h3 className="font-semibold text-white mb-1">PrEP Program</h3>
                    <p className="text-emerald-400 font-bold">8 months active</p>
                </GlassCard>

                <GlassCard className="p-4" hover>
                    <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-lg ${statusStyles.info.bg} ${statusStyles.info.border} border`}>
                            <Calendar className={`w-5 h-5 ${statusStyles.info.icon}`} />
                        </div>
                        <StatusBadge status="info">Upcoming</StatusBadge>
                    </div>
                    <h3 className="font-semibold text-white mb-1">Next Appointment</h3>
                    <p className="text-blue-400 font-bold">July 20, 2024</p>
                </GlassCard>

                <GlassCard className="p-4" hover>
                    <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-lg ${statusStyles.warning.bg} ${statusStyles.warning.border} border`}>
                            <BookOpen className={`w-5 h-5 ${statusStyles.warning.icon}`} />
                        </div>
                        <StatusBadge status="warning">In Progress</StatusBadge>
                    </div>
                    <h3 className="font-semibold text-white mb-1">Education</h3>
                    <p className="text-amber-400 font-bold">87% Complete</p>
                </GlassCard>

                <GlassCard className="p-4" hover>
                    <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-lg ${statusStyles.success.bg} ${statusStyles.success.border} border`}>
                            <Activity className={`w-5 h-5 ${statusStyles.success.icon}`} />
                        </div>
                        <StatusBadge status="success">Excellent</StatusBadge>
                    </div>
                    <h3 className="font-semibold text-white mb-1">Health Status</h3>
                    <p className="text-emerald-400 font-bold">Optimal</p>
                </GlassCard>
            </div>

            {/* Main Content - Simplified Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity - Clean List */}
                <div className="lg:col-span-2">
                    <GlassCard className="p-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                            <Activity className="w-5 h-5 text-cyan-400 mr-2" />
                            Recent Activity
                        </h3>
                        <div className="space-y-3">
                            {[
                                { action: 'Completed PrEP education video', time: '2 hours ago', status: 'success', icon: Video },
                                { action: 'Appointment confirmed', time: '1 day ago', status: 'info', icon: Calendar },
                                { action: 'Medication reminder updated', time: '3 days ago', status: 'warning', icon: Pill },
                                { action: 'Lab results reviewed', time: '5 days ago', status: 'neutral', icon: FileText }
                            ].map((activity, index) => {
                                const style = statusStyles[activity.status];
                                return (
                                    <div key={index} className="flex items-center space-x-3 p-3 rounded-xl backdrop-blur-sm bg-black/30 border border-white/10 hover:bg-black/50 hover:border-white/20 transition-all">
                                        <div className={`p-2 rounded-lg ${style.bg} ${style.border} border`}>
                                            <activity.icon className={`w-4 h-4 ${style.icon}`} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-white">{activity.action}</p>
                                            <p className="text-xs text-gray-400">{activity.time}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </GlassCard>
                </div>

                {/* Quick Actions - Clean Grid */}
                <GlassCard className="p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                        <Target className="w-5 h-5 text-blue-400 mr-2" />
                        Quick Actions
                    </h3>
                    <div className="space-y-3">
                        {[
                            { icon: CalendarPlus, label: 'Book Appointment', status: 'info' },
                            { icon: MessageCircle, label: 'Contact Provider', status: 'success' },
                            { icon: BookOpen, label: 'Learning Center', status: 'warning' },
                            { icon: AlertTriangle, label: 'Emergency Help', status: 'error' }
                        ].map((action, index) => {
                            const style = statusStyles[action.status];
                            return (
                                <button
                                    key={index}
                                    className={`w-full flex items-center p-3 rounded-xl transition-all text-left hover:scale-[1.02] ${style.bg} ${style.border} border hover:bg-opacity-20`}
                                >
                                    <action.icon className={`w-5 h-5 mr-3 ${style.icon}`} />
                                    <span className={`font-medium ${style.text}`}>{action.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </GlassCard>
            </div>

            {/* Health Insights - Simplified */}
            <GlassCard variant="primary" className="p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Stethoscope className="w-5 h-5 text-white mr-2" />
                    Health Insights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            icon: Heart,
                            title: 'Excellent Adherence',
                            desc: '98% medication compliance rate',
                            status: 'success'
                        },
                        {
                            icon: Shield,
                            title: 'Protected Status',
                            desc: 'Full HIV prevention coverage',
                            status: 'success'
                        },
                        {
                            icon: BookOpen,
                            title: 'Knowledge Growth',
                            desc: '87% education completion',
                            status: 'warning'
                        }
                    ].map((insight, index) => {
                        const style = statusStyles[insight.status];
                        return (
                            <div key={index} className="text-center">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${style.bg} ${style.border} border`}>
                                    <insight.icon className={`w-6 h-6 ${style.icon}`} />
                                </div>
                                <h4 className="font-semibold text-white mb-2">{insight.title}</h4>
                                <p className="text-sm text-gray-300">{insight.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </GlassCard>
        </div>
    );
}



// Main Application
function MedConnectPortal() {

    return (<Dashboard />);
}

export default MedConnectPortal;