'use client'

import React, { useState } from 'react';
import {
    User, Mail, Phone, Shield, Plus, Download, Edit3, Trash2, 
    Calendar, X, TrendingUp, Users, UserCheck, UserX, Crown,
    MapPin, Activity, Clock, Star, Badge, Settings, Eye
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { UserInterface } from '@/types/user';
import GlassCard from '@/components/custom/GlassCard';
import TableContainer from '@/components/custom/table/TableContainer';
import { userColumns } from './column';




// Mock User Data
const mockUsers: UserInterface[] = [
    {
        id: 'USR-001',
        name: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@medconnect.com',
        phone: '+1 (555) 123-4567',
        role: 'doctor',
        status: 'active',
        registrationDate: '2024-01-15',
        lastLogin: '2024-07-14',
        address: {
            street: '123 Medical Dr',
            city: 'San Francisco',
            state: 'CA',
            zipCode: '94102'
        },
        profile: {
            dateOfBirth: '1985-03-20',
            gender: 'female',
            emergencyContact: '+1 (555) 987-6543'
        },
        permissions: ['view_patients', 'edit_patients', 'prescribe_medication', 'view_reports'],
        activity: {
            appointmentsCount: 156,
            loginCount: 342,
            lastActivity: '2024-07-14T09:30:00Z'
        },
        notes: 'Senior physician specializing in internal medicine.'
    },
    {
        id: 'USR-002',
        name: 'Michael Chen',
        email: 'michael.chen@medconnect.com',
        phone: '+1 (555) 234-5678',
        role: 'admin',
        status: 'active',
        registrationDate: '2024-01-10',
        lastLogin: '2024-07-14',
        address: {
            street: '456 Admin Ave',
            city: 'Oakland',
            state: 'CA',
            zipCode: '94606'
        },
        profile: {
            dateOfBirth: '1980-07-15',
            gender: 'male',
            emergencyContact: '+1 (555) 876-5432'
        },
        permissions: ['full_access', 'user_management', 'system_settings', 'reports_access'],
        activity: {
            appointmentsCount: 0,
            loginCount: 578,
            lastActivity: '2024-07-14T11:15:00Z'
        },
        notes: 'System administrator with full platform access.'
    },
    {
        id: 'USR-003',
        name: 'Emily Rodriguez',
        email: 'emily.rodriguez@medconnect.com',
        phone: '+1 (555) 345-6789',
        role: 'nurse',
        status: 'active',
        registrationDate: '2024-02-01',
        lastLogin: '2024-07-13',
        address: {
            street: '789 Care St',
            city: 'San Jose',
            state: 'CA',
            zipCode: '95110'
        },
        profile: {
            dateOfBirth: '1990-11-08',
            gender: 'female',
            emergencyContact: '+1 (555) 765-4321'
        },
        permissions: ['view_patients', 'update_vitals', 'schedule_appointments'],
        activity: {
            appointmentsCount: 89,
            loginCount: 267,
            lastActivity: '2024-07-13T17:45:00Z'
        },
        notes: 'Registered nurse in the cardiology department.'
    },
    {
        id: 'USR-004',
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1 (555) 456-7890',
        role: 'patient',
        status: 'active',
        registrationDate: '2024-03-15',
        lastLogin: '2024-07-12',
        address: {
            street: '321 Patient Blvd',
            city: 'Fresno',
            state: 'CA',
            zipCode: '93721'
        },
        profile: {
            dateOfBirth: '1975-05-22',
            gender: 'male',
            emergencyContact: '+1 (555) 654-3210'
        },
        permissions: ['view_own_records', 'schedule_appointments', 'message_providers'],
        activity: {
            appointmentsCount: 12,
            loginCount: 45,
            lastActivity: '2024-07-12T14:20:00Z'
        },
        notes: 'Regular patient enrolled in PrEP program.'
    },
    {
        id: 'USR-005',
        name: 'Lisa Wang',
        email: 'lisa.wang@medconnect.com',
        phone: '+1 (555) 567-8901',
        role: 'staff',
        status: 'inactive',
        registrationDate: '2024-04-01',
        lastLogin: '2024-07-01',
        address: {
            street: '654 Staff Rd',
            city: 'Santa Cruz',
            state: 'CA',
            zipCode: '95060'
        },
        profile: {
            dateOfBirth: '1988-09-12',
            gender: 'female',
            emergencyContact: '+1 (555) 543-2109'
        },
        permissions: ['view_schedules', 'manage_appointments', 'basic_reports'],
        activity: {
            appointmentsCount: 0,
            loginCount: 123,
            lastActivity: '2024-07-01T16:30:00Z'
        },
        notes: 'Administrative staff member currently on leave.'
    },
    {
        id: 'USR-006',
        name: 'Robert Thompson',
        email: 'robert.thompson@email.com',
        phone: '+1 (555) 678-9012',
        role: 'patient',
        status: 'suspended',
        registrationDate: '2024-05-10',
        lastLogin: '2024-06-15',
        address: {
            street: '987 Suspended Ave',
            city: 'Sacramento',
            state: 'CA',
            zipCode: '95814'
        },
        profile: {
            dateOfBirth: '1982-12-03',
            gender: 'male',
            emergencyContact: '+1 (555) 432-1098'
        },
        permissions: [],
        activity: {
            appointmentsCount: 3,
            loginCount: 12,
            lastActivity: '2024-06-15T10:15:00Z'
        },
        notes: 'Account suspended due to policy violation.'
    }
];


// Main Users Management Component
function UsersManagement() {
    const [users, setUsers] = useState(mockUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedUser, setSelectedUser] = useState<UserInterface | null>(null);
    const [showModal, setShowModal] = useState(false);

    // Filter users based on search and filters
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

        return matchesSearch && matchesRole && matchesStatus;
    });

    // Get statistics
    const stats = {
        total: users.length,
        active: users.filter(u => u.status === 'active').length,
        inactive: users.filter(u => u.status === 'inactive').length
    };

    const exportData = () => {
        const dataStr = JSON.stringify(filteredUsers, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = 'users-export.json';
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    const router = useRouter();

    const handleUserClick = (user: UserInterface) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <GlassCard variant="primary" className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-white">User Management</h1>
                        <p className="text-blue-400">Manage platform users and permissions</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={exportData}
                            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-purple-500/25 flex items-center space-x-2"
                        >
                            <Download className="w-4 h-4" />
                            <span>Export</span>
                        </button>
                        <button
                            onClick={() => router.push('/admin/users/add')}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/25 flex items-center space-x-2"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add User</span>
                        </button>
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {/* Total Users Card */}
                    <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-black/40 to-black/20 border border-white/20 backdrop-blur-xl hover:border-blue-400/40 hover:bg-black/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
                        <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-colors duration-300" />
                        
                        <div className="relative z-10">
                            <div className="flex items-center">
                                <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/30 backdrop-blur-sm group-hover:bg-blue-500/30 transition-colors duration-300">
                                    <Users className="w-6 h-6 text-blue-400" />
                                </div>
                                <div className="ml-4">
                                    <div className="text-3xl font-bold text-blue-400 mb-1 group-hover:text-blue-300 transition-colors duration-300">
                                        {stats.total}
                                    </div>
                                    <div className="text-gray-300 text-sm font-medium">Total Users</div>
                                </div>
                            </div>
                            <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                        </div>
                    </div>

                    {/* Active Users Card */}
                    <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-black/40 to-black/20 border border-white/20 backdrop-blur-xl hover:border-emerald-400/40 hover:bg-black/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/20 overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
                        <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-colors duration-300" />
                        
                        <div className="relative z-10">
                            <div className="flex items-center">
                                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-sm group-hover:bg-emerald-500/30 transition-colors duration-300">
                                    <UserCheck className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div className="ml-4">
                                    <div className="text-3xl font-bold text-emerald-400 mb-1 group-hover:text-emerald-300 transition-colors duration-300">
                                        {stats.active}
                                    </div>
                                    <div className="text-gray-300 text-sm font-medium">Active Users</div>
                                </div>
                            </div>
                            <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        </div>
                    </div>

                    {/* Inactive Users Card */}
                    <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-black/40 to-black/20 border border-white/20 backdrop-blur-xl hover:border-gray-400/40 hover:bg-black/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-gray-500/20 overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 via-slate-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-400/50 to-transparent" />
                        <div className="absolute -top-12 -right-12 w-24 h-24 bg-gray-500/10 rounded-full blur-xl group-hover:bg-gray-500/20 transition-colors duration-300" />
                        
                        <div className="relative z-10">
                            <div className="flex items-center">
                                <div className="p-3 rounded-xl bg-gray-500/20 border border-gray-500/30 backdrop-blur-sm group-hover:bg-gray-500/30 transition-colors duration-300">
                                    <UserX className="w-6 h-6 text-gray-400" />
                                </div>
                                <div className="ml-4">
                                    <div className="text-3xl font-bold text-gray-400 mb-1 group-hover:text-gray-300 transition-colors duration-300">
                                        {stats.inactive}
                                    </div>
                                    <div className="text-gray-300 text-sm font-medium">Inactive Users</div>
                                </div>
                            </div>
                            <div className="absolute top-4 right-4 w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                        </div>
                    </div>
                </div>
            </GlassCard>

            {/* Users Table */}
            {filteredUsers.length > 0 ? (
                <TableContainer
                    title="Users"
                    icon={<Users className="w-5 h-5 text-blue-400" />}
                    description="Manage platform users and permissions"
                    columns={userColumns}
                    data={filteredUsers} total={userColumns.length} search={''} setSearch={undefined}                />
            ) : (
                <GlassCard className="p-8 text-center">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">No users found</h3>
                    <p className="text-gray-400 mb-4">
                        Try adjusting your search terms or filters.
                    </p>
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setRoleFilter('all');
                            setStatusFilter('all');
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

export default UsersManagement;