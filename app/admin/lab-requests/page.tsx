'use client'

import React, { useState } from 'react';
import {
    Play, Eye, CheckCircle, XCircle, Clock, AlertTriangle, 
    User, Calendar, Download, Search, Filter, Plus, RefreshCw,
    Users, Activity, TestTube, Video, FileText, Star, 
    Shield, Heart, MapPin, Phone, Mail, Edit3, Trash2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/custom/GlassCard';


// Lab Test Interface
interface LabTestInterface {
    id: string;
    patientName: string;
    patientEmail: string;
    testType: string;
    submissionDate: string;
    status: 'pending' | 'approved' | 'rejected' | 'needs_retake';
    videoThumbnail: string;
    videoDuration: string;
    testKit: string;
    reviewedBy?: string;
    reviewDate?: string;
    notes?: string;
    priority: 'low' | 'medium' | 'high';
}

// Video Thumbnail Component
function VideoThumbnail({ test, onClick }: { test: LabTestInterface, onClick: () => void }) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'border-amber-400 bg-amber-500/20';
            case 'approved': return 'border-emerald-400 bg-emerald-500/20';
            case 'rejected': return 'border-red-400 bg-red-500/20';
            case 'needs_retake': return 'border-orange-400 bg-orange-500/20';
            default: return 'border-gray-400 bg-gray-500/20';
        }
    };

    const getPriorityIndicator = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-500';
            case 'medium': return 'bg-amber-500';
            case 'low': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="relative group cursor-pointer" onClick={onClick}>
            {/* Video Thumbnail */}
            <div className={`relative w-full aspect-video rounded-xl overflow-hidden border-2 ${getStatusColor(test.status)} transition-all duration-300 group-hover:scale-105`}>
                {/* Simulated video thumbnail background */}
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-center">
                        <Video className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">{test.testType} Test</p>
                    </div>
                </div>
                
                {/* Play button overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                        <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                    {test.videoDuration}
                </div>

                {/* Priority indicator */}
                <div className={`absolute top-2 left-2 w-3 h-3 ${getPriorityIndicator(test.priority)} rounded-full`}></div>
            </div>
        </div>
    );
}

// Test Card Component
function TestCard({ test, onVideoClick }: { 
    test: LabTestInterface, 
    onVideoClick: (test: LabTestInterface) => void
}) {
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-amber-500/20 border-amber-500/30 text-amber-400';
            case 'approved':
                return 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400';
            case 'rejected':
                return 'bg-red-500/20 border-red-500/30 text-red-400';
            case 'needs_retake':
                return 'bg-orange-500/20 border-orange-500/30 text-orange-400';
            default:
                return 'bg-gray-500/20 border-gray-500/30 text-gray-400';
        }
    };

    const getTestTypeIcon = (testType: string) => {
        switch (testType.toLowerCase()) {
            case 'hiv rapid test': return <Shield className="w-4 h-4 text-red-400" />;
            case 'covid-19': return <Activity className="w-4 h-4 text-blue-400" />;
            case 'pregnancy test': return <Heart className="w-4 h-4 text-pink-400" />;
            default: return <TestTube className="w-4 h-4 text-purple-400" />;
        }
    };

    return (
        <GlassCard className="p-6 relative overflow-hidden group" hover>
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
            
            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-medium text-white">{test.patientName}</h3>
                            <p className="text-sm text-gray-400">{test.patientEmail}</p>
                        </div>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusStyle(test.status)} capitalize`}>
                        {test.status.replace('_', ' ')}
                    </span>
                </div>

                {/* Test Info */}
                <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-2">
                        {getTestTypeIcon(test.testType)}
                        <span className="text-sm text-white font-medium">{test.testType}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">
                            {new Date(test.submissionDate).toLocaleDateString()}
                        </span>
                    </div>
                </div>

                {/* Video Thumbnail */}
                <div className="mb-4">
                    <VideoThumbnail test={test} onClick={() => onVideoClick(test)} />
                </div>

                {/* Test Details */}
                <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Test Kit:</span>
                        <span className="text-white">{test.testKit}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Test ID:</span>
                        <span className="text-blue-400">{test.id}</span>
                    </div>
                    {test.reviewedBy && (
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Reviewed by:</span>
                            <span className="text-emerald-400">{test.reviewedBy}</span>
                        </div>
                    )}
                </div>

                {/* Notes */}
                {test.notes && (
                    <div className="mt-3 p-2 bg-white/5 rounded-lg">
                        <p className="text-xs text-gray-300">{test.notes}</p>
                    </div>
                )}
            </div>
        </GlassCard>
    );
}

// Mock Lab Test Data
const mockLabTests: LabTestInterface[] = [
    {
        id: 'LT-001',
        patientName: 'Sarah Johnson',
        patientEmail: 'sarah.j@email.com',
        testType: 'HIV Rapid Test',
        submissionDate: '2024-07-14',
        status: 'pending',
        videoThumbnail: '/thumbnails/test1.jpg',
        videoDuration: '2:34',
        testKit: 'OraQuick ADVANCE',
        priority: 'high',
        notes: 'Patient reported possible exposure 3 days ago'
    },
    {
        id: 'LT-002',
        patientName: 'Michael Chen',
        patientEmail: 'michael.chen@email.com',
        testType: 'COVID-19',
        submissionDate: '2024-07-13',
        status: 'approved',
        videoThumbnail: '/thumbnails/test2.jpg',
        videoDuration: '1:45',
        testKit: 'BinaxNOW COVID-19',
        reviewedBy: 'Dr. Emily Rodriguez',
        reviewDate: '2024-07-13',
        priority: 'medium',
        notes: 'Clear negative result, proper technique demonstrated'
    },
    {
        id: 'LT-003',
        patientName: 'Emily Davis',
        patientEmail: 'emily.davis@email.com',
        testType: 'Pregnancy Test',
        submissionDate: '2024-07-12',
        status: 'needs_retake',
        videoThumbnail: '/thumbnails/test3.jpg',
        videoDuration: '1:12',
        testKit: 'First Response',
        reviewedBy: 'Dr. Sarah Johnson',
        reviewDate: '2024-07-12',
        priority: 'low',
        notes: 'Test result unclear, please retake with fresh sample'
    },
    {
        id: 'LT-004',
        patientName: 'David Wilson',
        patientEmail: 'david.wilson@email.com',
        testType: 'HIV Rapid Test',
        submissionDate: '2024-07-11',
        status: 'rejected',
        videoThumbnail: '/thumbnails/test4.jpg',
        videoDuration: '0:58',
        testKit: 'OraQuick ADVANCE',
        reviewedBy: 'Dr. Michael Chen',
        reviewDate: '2024-07-11',
        priority: 'high',
        notes: 'Invalid test - insufficient sample collection shown'
    },
    {
        id: 'LT-005',
        patientName: 'Lisa Garcia',
        patientEmail: 'lisa.garcia@email.com',
        testType: 'COVID-19',
        submissionDate: '2024-07-10',
        status: 'approved',
        videoThumbnail: '/thumbnails/test5.jpg',
        videoDuration: '2:15',
        testKit: 'Abbott BinaxNOW',
        reviewedBy: 'Dr. Emily Rodriguez',
        reviewDate: '2024-07-10',
        priority: 'medium',
        notes: 'Positive result confirmed, patient contacted for follow-up'
    },
    {
        id: 'LT-006',
        patientName: 'James Martinez',
        patientEmail: 'james.martinez@email.com',
        testType: 'HIV Rapid Test',
        submissionDate: '2024-07-14',
        status: 'pending',
        videoThumbnail: '/thumbnails/test6.jpg',
        videoDuration: '3:02',
        testKit: 'INSTI HIV Self Test',
        priority: 'medium',
        notes: 'Routine quarterly screening'
    }
];

// Main Lab Tests Management Component
function LabTestsManagement() {
    const [labTests, setLabTests] = useState(mockLabTests);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [testTypeFilter, setTestTypeFilter] = useState('all');

    // Filter lab tests based on search and filters
    const filteredLabTests = labTests.filter(test => {
        const matchesSearch = test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            test.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            test.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || test.status === statusFilter;
        const matchesType = testTypeFilter === 'all' || test.testType === testTypeFilter;

        return matchesSearch && matchesStatus && matchesType;
    });

    // Get statistics
    const stats = {
        total: labTests.length,
        pending: labTests.filter(t => t.status === 'pending').length,
        approved: labTests.filter(t => t.status === 'approved').length,
        needsRetake: labTests.filter(t => t.status === 'needs_retake').length
    };

    const handleVideoClick = (test: LabTestInterface) => {
        // Open video modal or navigate to video review page
        console.log('Opening video for test:', test.id);
    };

    const exportData = () => {
        const dataStr = JSON.stringify(filteredLabTests, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = 'lab-tests-export.json';
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    const testTypes = ['HIV Rapid Test', 'COVID-19', 'Pregnancy Test'];

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <GlassCard variant="primary" className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-white">Lab Tests Management</h1>
                        <p className="text-blue-400">Review and manage self-administered home test submissions</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={exportData}
                            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-purple-500/25 flex items-center space-x-2"
                        >
                            <Download className="w-4 h-4" />
                            <span>Export</span>
                        </button>
                        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/25 flex items-center space-x-2">
                            <Video className="w-4 h-4" />
                            <span>Review Queue</span>
                        </button>
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
                    {/* Total Tests Card */}
                    <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-black/40 to-black/20 border border-white/20 backdrop-blur-xl hover:border-blue-400/40 hover:bg-black/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
                        
                        <div className="relative z-10">
                            <div className="flex items-center">
                                <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/30 backdrop-blur-sm group-hover:bg-blue-500/30 transition-colors duration-300">
                                    <TestTube className="w-6 h-6 text-blue-400" />
                                </div>
                                <div className="ml-4">
                                    <div className="text-3xl font-bold text-blue-400 mb-1 group-hover:text-blue-300 transition-colors duration-300">
                                        {stats.total}
                                    </div>
                                    <div className="text-gray-300 text-sm font-medium">Total Tests</div>
                                </div>
                            </div>
                            <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                        </div>
                    </div>

                    {/* Pending Review Card */}
                    <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-black/40 to-black/20 border border-white/20 backdrop-blur-xl hover:border-amber-400/40 hover:bg-black/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/20 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
                        
                        <div className="relative z-10">
                            <div className="flex items-center">
                                <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/30 backdrop-blur-sm group-hover:bg-amber-500/30 transition-colors duration-300">
                                    <Clock className="w-6 h-6 text-amber-400" />
                                </div>
                                <div className="ml-4">
                                    <div className="text-3xl font-bold text-amber-400 mb-1 group-hover:text-amber-300 transition-colors duration-300">
                                        {stats.pending}
                                    </div>
                                    <div className="text-gray-300 text-sm font-medium">Pending Review</div>
                                </div>
                            </div>
                            <div className="absolute top-4 right-4 w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                        </div>
                    </div>

                    {/* Approved Card */}
                    <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-black/40 to-black/20 border border-white/20 backdrop-blur-xl hover:border-emerald-400/40 hover:bg-black/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/20 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
                        
                        <div className="relative z-10">
                            <div className="flex items-center">
                                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-sm group-hover:bg-emerald-500/30 transition-colors duration-300">
                                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div className="ml-4">
                                    <div className="text-3xl font-bold text-emerald-400 mb-1 group-hover:text-emerald-300 transition-colors duration-300">
                                        {stats.approved}
                                    </div>
                                    <div className="text-gray-300 text-sm font-medium">Approved</div>
                                </div>
                            </div>
                            <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        </div>
                    </div>

                    {/* Needs Retake Card */}
                    <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-black/40 to-black/20 border border-white/20 backdrop-blur-xl hover:border-orange-400/40 hover:bg-black/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/20 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-400/50 to-transparent" />
                        
                        <div className="relative z-10">
                            <div className="flex items-center">
                                <div className="p-3 rounded-xl bg-orange-500/20 border border-orange-500/30 backdrop-blur-sm group-hover:bg-orange-500/30 transition-colors duration-300">
                                    <RefreshCw className="w-6 h-6 text-orange-400" />
                                </div>
                                <div className="ml-4">
                                    <div className="text-3xl font-bold text-orange-400 mb-1 group-hover:text-orange-300 transition-colors duration-300">
                                        {stats.needsRetake}
                                    </div>
                                    <div className="text-gray-300 text-sm font-medium">Needs Retake</div>
                                </div>
                            </div>
                            <div className="absolute top-4 right-4 w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                        </div>
                    </div>
                </div>
            </GlassCard>

            {/* Search and Filters */}
            <GlassCard className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by patient name, test type, or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500/50"
                    >
                        <option value="all" className="bg-gray-900">All Status</option>
                        <option value="pending" className="bg-gray-900">Pending</option>
                        <option value="approved" className="bg-gray-900">Approved</option>
                        <option value="rejected" className="bg-gray-900">Rejected</option>
                        <option value="needs_retake" className="bg-gray-900">Needs Retake</option>
                    </select>

                    <select
                        value={testTypeFilter}
                        onChange={(e) => setTestTypeFilter(e.target.value)}
                        className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500/50"
                    >
                        <option value="all" className="bg-gray-900">All Test Types</option>
                        {testTypes.map(type => (
                            <option key={type} value={type} className="bg-gray-900">{type}</option>
                        ))}
                    </select>
                </div>
            </GlassCard>

            {/* Results Count */}
            <div className="flex items-center justify-between">
                <p className="text-gray-300">
                    Showing {filteredLabTests.length} of {labTests.length} test submissions
                </p>
            </div>

            {/* Lab Tests Grid */}
            {filteredLabTests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLabTests.map((test) => (
                        <TestCard
                            key={test.id}
                            test={test}
                            onVideoClick={handleVideoClick}
                        />
                    ))}
                </div>
            ) : (
                <GlassCard className="p-8 text-center">
                    <TestTube className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">No test submissions found</h3>
                    <p className="text-gray-400 mb-4">
                        Try adjusting your search terms or filters.
                    </p>
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setStatusFilter('all');
                            setTestTypeFilter('all');
                        }}
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all"
                    >
                        Clear Filters
                    </button>
                </GlassCard>
            )}
        </div>
    );
}

export default LabTestsManagement;