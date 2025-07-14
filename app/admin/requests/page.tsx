'use client'

import React, { ReactNode, useState } from 'react';
import {
    Users, Building2, Check, X,
    Clock, CheckCircle, RefreshCw, User, Activity,
    MessageSquare, FileText, Sparkles,
    Mail, UserCheck
} from 'lucide-react';
import TableContainer from '@/components/custom/table/TableContainer';
import { RequestInterface } from '@/types/requests';
import { requestColumns, requestStatusStyles } from './column';
import GlassCard from '@/components/custom/GlassCard';
// Assuming this is the enhanced DataTable




// Enhanced Status Badge Component
function StatusBadge({ status, children, pulse = false }:
    {
        status: string
        children: ReactNode
        pulse?: boolean
    }
) {
    const style = requestStatusStyles[status] || requestStatusStyles.pending;
    return (
        <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full 
            ${style.bg} ${style.border} ${style.text} border backdrop-blur-sm
            ${pulse ? 'animate-pulse' : ''} transition-all duration-300 shadow-lg`}>
            {children}
        </span>
    );
}

// User Avatar Component
const UserAvatar = ({ name, department }: { name: string; department?: string }) => {
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const getDepartmentColor = (dept?: string) => {
        if (!dept) return 'from-gray-500 to-gray-600';
        switch (dept.toLowerCase()) {
            case 'emergency medicine': return 'from-red-500 to-rose-500';
            case 'pediatrics': return 'from-pink-500 to-purple-500';
            case 'pharmacy': return 'from-green-500 to-emerald-500';
            case 'medical education': return 'from-blue-500 to-indigo-500';
            case 'laboratory': return 'from-yellow-500 to-orange-500';
            default: return 'from-gray-500 to-slate-500';
        }
    };

    return (
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getDepartmentColor(department)} 
            flex items-center justify-center text-white font-bold text-sm 
            shadow-lg border border-white/20 backdrop-blur-sm`}>
            {getInitials(name)}
        </div>
    );
};

// Status Icon Component
const StatusIcon = ({ status }: { status: string }) => {
    const style = requestStatusStyles[status as keyof typeof requestStatusStyles] || requestStatusStyles.pending;

    switch (status) {
        case 'approved':
            return <CheckCircle className={`w-4 h-4 ${style.icon}`} />;
        case 'pending':
            return <Clock className={`w-4 h-4 ${style.icon}`} />;
        case 'rejected':
            return <X className={`w-4 h-4 ${style.icon}`} />;
        case 'under_review':
            return <Activity className={`w-4 h-4 ${style.icon}`} />;
        default:
            return <Clock className={`w-4 h-4 ${style.icon}`} />;
    }
};

// Actions Dropdown Component

// Request Details Modal (Enhanced)
function RequestModal({ request, isOpen, onClose, onUpdateStatus }: {
    request: RequestInterface, isOpen: boolean, onClose: () => void, onUpdateStatus: (id: string, status: string, adminNote: string) => void
}) {
    const [adminNote, setAdminNote] = useState('');
    const [activeTab, setActiveTab] = useState('approve');

    if (!isOpen || !request) return null;

    const handleApprove = () => {
        onUpdateStatus(request.id, 'approved', adminNote);
        setAdminNote('');
        onClose();
    };

    const handleReject = () => {
        onUpdateStatus(request.id, 'rejected', adminNote);
        setAdminNote('');
        onClose();
    };

    const handleRequestInfo = () => {
        onUpdateStatus(request.id, 'under_review', adminNote);
        setAdminNote('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <GlassCard variant="primary" className="p-8 relative overflow-hidden">
                    {/* Background decorations */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/10 to-purple-600/5" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

                    {/* Sparkles */}
                    <Sparkles className="absolute top-4 right-8 w-4 h-4 text-blue-400 opacity-30 animate-pulse" />
                    <Sparkles className="absolute bottom-6 left-6 w-3 h-3 text-cyan-400 opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl 
                                    flex items-center justify-center shadow-lg shadow-blue-500/30 border border-blue-400/30">
                                    <User className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-white via-blue-100 to-gray-300 bg-clip-text">
                                        Request Details
                                    </h2>
                                    <p className="text-blue-400 text-lg font-medium">Request ID: {request.id}</p>
                                    <div className="mt-2">
                                        <StatusBadge status={request.status}>
                                            <StatusIcon status={request.status} />
                                            <span className="ml-2 capitalize">{request.status.replace('_', ' ')}</span>
                                        </StatusBadge>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-3 rounded-xl bg-white/10 border border-white/20 text-white 
                                    hover:bg-white/20 transition-all backdrop-blur-sm group"
                            >
                                <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            {/* User Information */}
                            <GlassCard className="p-6 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center relative z-10">
                                    <Users className="w-5 h-5 text-blue-400 mr-3" />
                                    User Information
                                </h3>
                                <div className="space-y-4 relative z-10">
                                    <div className="flex items-center space-x-3">
                                        <UserAvatar name={request.user.name} department={request.user.department} />
                                        <div>
                                            <p className="text-white font-semibold">{request.user.name}</p>
                                            <p className="text-blue-400 text-sm">{request.user.department}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-3">
                                            <Mail className="w-4 h-4 text-gray-400" />
                                            <div>
                                                <p className="text-gray-400 text-xs">Email</p>
                                                <p className="text-gray-300 text-sm">{request.user.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <UserCheck className="w-4 h-4 text-gray-400" />
                                            <div>
                                                <p className="text-gray-400 text-xs">Employee ID</p>
                                                <p className="text-gray-300 text-sm font-mono">{request.user.employeeId}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>

                            {/* Request Information */}
                            <GlassCard className="p-6 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center relative z-10">
                                    <Building2 className="w-5 h-5 text-emerald-400 mr-3" />
                                    Request Information
                                </h3>
                                <div className="space-y-4 relative z-10">
                                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                        <p className="text-gray-400 text-xs mb-1">Hospital ID</p>
                                        <p className="text-white font-semibold">{request.hospitalId}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <p className="text-gray-400 text-xs mb-1">Date Requested</p>
                                            <p className="text-gray-300 text-sm">{new Date(request.dateRequested).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-xs mb-1">Date Approved</p>
                                            <p className="text-gray-300 text-sm">
                                                {request.dateApproved ? new Date(request.dateApproved).toLocaleDateString() : 'Pending'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>

                        {/* Description */}
                        <GlassCard className="p-6 mb-8 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center relative z-10">
                                <FileText className="w-5 h-5 text-blue-400 mr-3" />
                                Description
                            </h3>
                            <p className="text-gray-300 leading-relaxed relative z-10">
                                {request.description}
                            </p>
                        </GlassCard>

                        {/* Action Tabs */}
                        <div className="pt-6 border-t border-white/10">
                            {request.status === 'pending' || request.status === 'under_review' ? (
                                <div className="space-y-6">
                                    {/* Enhanced Tab Navigation */}
                                    <div className="flex space-x-2 bg-black/30 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
                                        <button
                                            onClick={() => setActiveTab('approve')}
                                            className={`flex-1 px-6 py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 ${activeTab === 'approve'
                                                ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-xl shadow-emerald-500/25 scale-105'
                                                : 'text-gray-300 hover:text-white hover:bg-white/10'
                                                }`}
                                        >
                                            <Check className="w-5 h-5" />
                                            <span className="font-semibold">Approve</span>
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('request_info')}
                                            className={`flex-1 px-6 py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 ${activeTab === 'request_info'
                                                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-xl shadow-blue-500/25 scale-105'
                                                : 'text-gray-300 hover:text-white hover:bg-white/10'
                                                }`}
                                        >
                                            <MessageSquare className="w-5 h-5" />
                                            <span className="font-semibold">Request Info</span>
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('reject')}
                                            className={`flex-1 px-6 py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 ${activeTab === 'reject'
                                                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-xl shadow-red-500/25 scale-105'
                                                : 'text-gray-300 hover:text-white hover:bg-white/10'
                                                }`}
                                        >
                                            <X className="w-5 h-5" />
                                            <span className="font-semibold">Reject</span>
                                        </button>
                                    </div>

                                    {/* Enhanced Tab Content */}
                                    <div className="min-h-[180px]">
                                        {activeTab === 'approve' && (
                                            <GlassCard className="p-8 bg-emerald-500/10 border-emerald-500/30">
                                                <div className="flex items-center space-x-4 mb-6">
                                                    <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                                                        <Check className="w-6 h-6 text-emerald-400" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-white font-semibold text-lg">Approve Request</h3>
                                                        <p className="text-emerald-300">Grant access for {request.user.name}</p>
                                                    </div>
                                                </div>
                                                <textarea
                                                    value={adminNote}
                                                    onChange={(e) => setAdminNote(e.target.value)}
                                                    placeholder="Add approval note (optional)..."
                                                    rows={4}
                                                    className="w-full px-4 py-3 bg-black/20 border border-emerald-500/30 rounded-xl 
                                                        text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 
                                                        transition-all resize-none backdrop-blur-sm"
                                                />
                                                <button
                                                    onClick={handleApprove}
                                                    className="w-full mt-4 px-6 py-4 bg-gradient-to-r from-emerald-500 to-green-500 
                                                        text-white rounded-xl hover:from-emerald-600 hover:to-green-600 
                                                        transition-all shadow-xl shadow-emerald-500/25 font-semibold
                                                        hover:scale-105 duration-300"
                                                >
                                                    Confirm Approval
                                                </button>
                                            </GlassCard>
                                        )}

                                        {activeTab === 'request_info' && (
                                            <GlassCard className="p-8 bg-blue-500/10 border-blue-500/30">
                                                <div className="flex items-center space-x-4 mb-6">
                                                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                                                        <MessageSquare className="w-6 h-6 text-blue-400" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-white font-semibold text-lg">Request Additional Information</h3>
                                                        <p className="text-blue-300">Ask {request.user.name} for more details</p>
                                                    </div>
                                                </div>
                                                <textarea
                                                    value={adminNote}
                                                    onChange={(e) => setAdminNote(e.target.value)}
                                                    placeholder="Specify what additional information is needed..."
                                                    rows={4}
                                                    className="w-full px-4 py-3 bg-black/20 border border-blue-500/30 rounded-xl 
                                                        text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 
                                                        transition-all resize-none backdrop-blur-sm"
                                                />
                                                <button
                                                    onClick={handleRequestInfo}
                                                    className="w-full mt-4 px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 
                                                        text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 
                                                        transition-all shadow-xl shadow-blue-500/25 font-semibold
                                                        hover:scale-105 duration-300"
                                                >
                                                    Send Information Request
                                                </button>
                                            </GlassCard>
                                        )}

                                        {activeTab === 'reject' && (
                                            <GlassCard className="p-8 bg-red-500/10 border-red-500/30">
                                                <div className="flex items-center space-x-4 mb-6">
                                                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                                                        <X className="w-6 h-6 text-red-400" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-white font-semibold text-lg">Reject Request</h3>
                                                        <p className="text-red-300">Decline access for {request.user.name}</p>
                                                    </div>
                                                </div>
                                                <textarea
                                                    value={adminNote}
                                                    onChange={(e) => setAdminNote(e.target.value)}
                                                    placeholder="Please provide a reason for rejection..."
                                                    rows={4}
                                                    className="w-full px-4 py-3 bg-black/20 border border-red-500/30 rounded-xl 
                                                        text-white placeholder-gray-400 focus:outline-none focus:border-red-400 
                                                        transition-all resize-none backdrop-blur-sm"
                                                />
                                                <button
                                                    onClick={handleReject}
                                                    className="w-full mt-4 px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 
                                                        text-white rounded-xl hover:from-red-600 hover:to-red-700 
                                                        transition-all shadow-xl shadow-red-500/25 font-semibold
                                                        hover:scale-105 duration-300"
                                                >
                                                    Confirm Rejection
                                                </button>
                                            </GlassCard>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <GlassCard className="text-center p-12 bg-white/5 border-white/10">
                                    <div className="w-20 h-20 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <h3 className="text-white font-semibold text-xl mb-3">Request Completed</h3>
                                    <p className="text-gray-400 mb-2">This request has been {request.status.replace('_', ' ')}</p>
                                    <p className="text-gray-500 text-sm">
                                        Date approved: {request.dateApproved ? new Date(request.dateApproved).toLocaleDateString() : 'N/A'}
                                    </p>
                                </GlassCard>
                            )}
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}


// Main Enhanced Requests Management Component
function RequestsManagement() {
    // Mock data
    const [requests, setRequests] = useState<RequestInterface[]>([
        {
            id: 'REQ-001',
            user: {
                name: 'Dr. Sarah Johnson',
                email: 'sarah.johnson@medconnect.com',
                employeeId: 'EMP-2024-001',
                department: 'Emergency Medicine'
            },
            hospitalId: 'HOSP-SF-001',
            dateRequested: '2024-07-10',
            dateApproved: null,
            status: 'pending',
            description: 'Request for role promotion from Nurse to Senior Nurse. I have completed additional certifications in critical care and have 3 years of experience.'
        },
        {
            id: 'REQ-002',
            user: {
                name: 'Michael Chen',
                email: 'michael.chen@riverside.org',
                employeeId: 'EMP-2024-002',
                department: 'Pediatrics'
            },
            hospitalId: 'HOSP-OAK-002',
            dateRequested: '2024-07-08',
            dateApproved: '2024-07-12',
            status: 'approved',
            description: 'Hospital transfer request from Riverside Children\'s Hospital to Bay Area Rehabilitation Center to specialize in rehabilitation medicine.'
        },
        {
            id: 'REQ-003',
            user: {
                name: 'Emily Rodriguez',
                email: 'emily.rodriguez@coastal.com',
                employeeId: 'EMP-2024-003',
                department: 'Pharmacy'
            },
            hospitalId: 'HOSP-SC-003',
            dateRequested: '2024-07-05',
            dateApproved: '2024-07-11',
            status: 'approved',
            description: 'Request for promotion to Chief Pharmacist position. I have been serving as interim chief for 6 months with excellent performance.'
        },
        {
            id: 'REQ-004',
            user: {
                name: 'David Kim',
                email: 'david.kim@central.edu',
                employeeId: 'EMP-2024-004',
                department: 'Medical Education'
            },
            hospitalId: 'HOSP-FR-004',
            dateRequested: '2024-07-01',
            dateApproved: null,
            status: 'rejected',
            description: 'Request for advancement from Medical Student to Resident Doctor. Completed medical degree and passed USMLE.'
        },
        {
            id: 'REQ-005',
            user: {
                name: 'Lisa Thompson',
                email: 'lisa.thompson@medconnect.com',
                employeeId: 'EMP-2024-005',
                department: 'Laboratory'
            },
            hospitalId: 'HOSP-SF-001',
            dateRequested: '2024-07-06',
            dateApproved: null,
            status: 'under_review',
            description: 'Transfer request from Lab Technician to Lab Supervisor role. Seeking position closer to home with supervisory responsibilities.'
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [hospitalFilter, setHospitalFilter] = useState('all');
    const [selectedRequest, setSelectedRequest] = useState<RequestInterface | null>(null);
    const [showModal, setShowModal] = useState(false);

    // Get unique hospital IDs for filter
    const hospitalIds = [...new Set(requests.map(r => r.hospitalId))];

    // Filter requests
    const filteredRequests = requests.filter(request => {
        const matchesSearch =
            request.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.hospitalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
        const matchesHospital = hospitalFilter === 'all' || request.hospitalId === hospitalFilter;

        return matchesSearch && matchesStatus && matchesHospital;
    });

    // Get statistics

    // Handlers

    const handleUpdateStatus = (requestId: string, newStatus: string) => {
        setRequests(prev => prev.map(r =>
            r.id === requestId ? {
                ...r,
                status: newStatus as RequestInterface['status'],
                dateApproved: newStatus === 'approved' ? new Date().toISOString().split('T')[0] : r.dateApproved
            } : r
        ));
    };

    const exportData = () => {
        const dataStr = JSON.stringify(filteredRequests, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = 'requests-export.json';
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    // Enhanced filter component
    const FilterComponent = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Status</label>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white 
                        focus:outline-none focus:border-blue-400 transition-all backdrop-blur-md"
                >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="under_review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Hospital ID</label>
                <select
                    value={hospitalFilter}
                    onChange={(e) => setHospitalFilter(e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white 
                        focus:outline-none focus:border-blue-400 transition-all backdrop-blur-md"
                >
                    <option value="all">All Hospitals</option>
                    {hospitalIds.map(hospitalId => (
                        <option key={hospitalId} value={hospitalId}>{hospitalId}</option>
                    ))}
                </select>
            </div>

        </div>
    );

    // Enhanced header actions
    const headerActions = (
        <>
            <button
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl 
                    hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/25 
                    flex items-center space-x-2 backdrop-blur-md border border-blue-400/30"
            >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
            </button>
        </>
    );


    return (
        <div className="">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Enhanced TableContainer with DataTable */}
                <TableContainer
                    title="Requests Management"
                    description="Manage user requests and approvals with advanced filtering and actions"
                    total={filteredRequests.length}
                    columns={requestColumns}
                    data={filteredRequests}
                    filter={<FilterComponent />}
                    search={searchTerm}
                    setSearch={setSearchTerm}
                    icon={<Users className="w-5 h-5" />}
                    headerActions={headerActions}
                    link="/requests"
                // variant="elevated"
                />

                {/* Enhanced Request Details Modal */}
                <RequestModal
                    request={selectedRequest!}
                    isOpen={showModal}
                    onClose={() => {
                        setShowModal(false);
                        setSelectedRequest(null);
                    }}
                    onUpdateStatus={handleUpdateStatus}
                />
            </div>
        </div>
    );
}

export default RequestsManagement;