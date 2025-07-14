'use client'

import React, { useState } from 'react';
import {
    Calendar, Clock, User, Phone, Plus, Download, Edit3, Trash2,
    X, Users, CheckCircle, XCircle, AlertTriangle, MapPin,
    Activity, Eye, Filter, Search, Building2, Video, Stethoscope,
    Shield, Heart, MessageCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AppointmentInterface } from '@/types/appointment';
import GlassCard from '@/components/custom/GlassCard';
import TableContainer from '@/components/custom/table/TableContainer';
import { appointmentColumns } from './column';


// Mock Appointment Data
const mockAppointments: AppointmentInterface[] = [
    {
        id: 'APT-001',
        patientName: 'John Smith',
        patientEmail: 'john.smith@email.com',
        appointmentType: 'PrEP Consultation',
        provider: 'Dr. Sarah Johnson',
        facility: 'MedConnect Downtown',
        date: '2024-07-20',
        time: '10:00 AM',
        status: 'upcoming',
        mode: 'in-person',
        duration: '30 min',
        phone: '+1 (555) 123-4567',
        notes: 'Regular quarterly consultation'
    },
    {
        id: 'APT-002',
        patientName: 'Emily Rodriguez',
        patientEmail: 'emily.rodriguez@email.com',
        appointmentType: 'Mental Health Session',
        provider: 'Dr. Michael Chen',
        facility: 'MedConnect North',
        date: '2024-07-19',
        time: '2:30 PM',
        status: 'completed',
        mode: 'video',
        duration: '50 min',
        phone: '+1 (555) 234-5678',
        notes: 'Follow-up counseling session'
    },
    {
        id: 'APT-003',
        patientName: 'David Wilson',
        patientEmail: 'david.wilson@email.com',
        appointmentType: 'General Checkup',
        provider: 'Dr. Lisa Wang',
        facility: 'MedConnect Community',
        date: '2024-07-22',
        time: '11:30 AM',
        status: 'pending',
        mode: 'in-person',
        duration: '25 min',
        phone: '+1 (555) 345-6789',
        notes: 'Annual health screening'
    },
    {
        id: 'APT-004',
        patientName: 'Maria Garcia',
        patientEmail: 'maria.garcia@email.com',
        appointmentType: 'Emergency Consultation',
        provider: 'Dr. Robert Kim',
        facility: 'MedConnect Emergency',
        date: '2024-07-15',
        time: '9:00 AM',
        status: 'completed',
        mode: 'in-person',
        duration: '45 min',
        phone: '+1 (555) 456-7890',
        notes: 'Emergency PEP consultation'
    },
    {
        id: 'APT-005',
        patientName: 'James Thompson',
        patientEmail: 'james.thompson@email.com',
        appointmentType: 'Lab Results Review',
        provider: 'Dr. Sarah Johnson',
        facility: 'MedConnect Downtown',
        date: '2024-07-18',
        time: '3:15 PM',
        status: 'cancelled',
        mode: 'video',
        duration: '15 min',
        phone: '+1 (555) 567-8901',
        notes: 'Patient cancelled due to schedule conflict'
    },
    {
        id: 'APT-006',
        patientName: 'Anna Martinez',
        patientEmail: 'anna.martinez@email.com',
        appointmentType: 'PrEP Consultation',
        provider: 'Dr. Michael Chen',
        facility: 'MedConnect North',
        date: '2024-07-25',
        time: '4:00 PM',
        status: 'upcoming',
        mode: 'in-person',
        duration: '30 min',
        phone: '+1 (555) 678-9012',
        notes: 'Initial PrEP evaluation'
    }
];

// Main Appointments Management Component
function AppointmentsManagement() {
    const [appointments, setAppointments] = useState(mockAppointments);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');

    // Filter appointments based on search and filters
    const filteredAppointments = appointments.filter(appointment => {
        const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.appointmentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
        const matchesType = typeFilter === 'all' || appointment.appointmentType === typeFilter;

        return matchesSearch && matchesStatus && matchesType;
    });

    // Get statistics
    const stats = {
        total: appointments.length,
        upcoming: appointments.filter(a => a.status === 'upcoming').length,
        completed: appointments.filter(a => a.status === 'completed').length,
        pending: appointments.filter(a => a.status === 'pending').length
    };

    const exportData = () => {
        const dataStr = JSON.stringify(filteredAppointments, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = 'appointments-export.json';
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    const router = useRouter();

    const handleAppointmentClick = (appointment: AppointmentInterface) => {
        console.log('Clicked appointment:', appointment);
        // Handle appointment details modal or navigation
    };

    const appointmentTypes = [
        'PrEP Consultation',
        'Mental Health Session', 
        'General Checkup',
        'Emergency Consultation',
        'Lab Results Review'
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <GlassCard variant="primary" className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-white">Appointments Management</h1>
                        <p className="text-blue-400">Track and manage patient appointments</p>
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
                            onClick={() => router.push('/admin/appointments/add')}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/25 flex items-center space-x-2"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Book Appointment</span>
                        </button>
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
                    {/* Total Appointments Card */}
                    <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-black/40 to-black/20 border border-white/20 backdrop-blur-xl hover:border-blue-400/40 hover:bg-black/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
                        <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-colors duration-300" />
                        
                        <div className="relative z-10">
                            <div className="flex items-center">
                                <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/30 backdrop-blur-sm group-hover:bg-blue-500/30 transition-colors duration-300">
                                    <Calendar className="w-6 h-6 text-blue-400" />
                                </div>
                                <div className="ml-4">
                                    <div className="text-3xl font-bold text-blue-400 mb-1 group-hover:text-blue-300 transition-colors duration-300">
                                        {stats.total}
                                    </div>
                                    <div className="text-gray-300 text-sm font-medium">Total Appointments</div>
                                </div>
                            </div>
                            <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                        </div>
                    </div>

                    {/* Upcoming Appointments Card */}
                    <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-black/40 to-black/20 border border-white/20 backdrop-blur-xl hover:border-emerald-400/40 hover:bg-black/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/20 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
                        <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-colors duration-300" />
                        
                        <div className="relative z-10">
                            <div className="flex items-center">
                                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-sm group-hover:bg-emerald-500/30 transition-colors duration-300">
                                    <Clock className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div className="ml-4">
                                    <div className="text-3xl font-bold text-emerald-400 mb-1 group-hover:text-emerald-300 transition-colors duration-300">
                                        {stats.upcoming}
                                    </div>
                                    <div className="text-gray-300 text-sm font-medium">Upcoming</div>
                                </div>
                            </div>
                            <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        </div>
                    </div>

                    {/* Completed Appointments Card */}
                    <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-black/40 to-black/20 border border-white/20 backdrop-blur-xl hover:border-green-400/40 hover:bg-black/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/20 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent" />
                        <div className="absolute -top-12 -right-12 w-24 h-24 bg-green-500/10 rounded-full blur-xl group-hover:bg-green-500/20 transition-colors duration-300" />
                        
                        <div className="relative z-10">
                            <div className="flex items-center">
                                <div className="p-3 rounded-xl bg-green-500/20 border border-green-500/30 backdrop-blur-sm group-hover:bg-green-500/30 transition-colors duration-300">
                                    <CheckCircle className="w-6 h-6 text-green-400" />
                                </div>
                                <div className="ml-4">
                                    <div className="text-3xl font-bold text-green-400 mb-1 group-hover:text-green-300 transition-colors duration-300">
                                        {stats.completed}
                                    </div>
                                    <div className="text-gray-300 text-sm font-medium">Completed</div>
                                </div>
                            </div>
                            <div className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        </div>
                    </div>

                    {/* Pending Appointments Card */}
                    <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-black/40 to-black/20 border border-white/20 backdrop-blur-xl hover:border-amber-400/40 hover:bg-black/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/20 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
                        <div className="absolute -top-12 -right-12 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-colors duration-300" />
                        
                        <div className="relative z-10">
                            <div className="flex items-center">
                                <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/30 backdrop-blur-sm group-hover:bg-amber-500/30 transition-colors duration-300">
                                    <AlertTriangle className="w-6 h-6 text-amber-400" />
                                </div>
                                <div className="ml-4">
                                    <div className="text-3xl font-bold text-amber-400 mb-1 group-hover:text-amber-300 transition-colors duration-300">
                                        {stats.pending}
                                    </div>
                                    <div className="text-gray-300 text-sm font-medium">Pending</div>
                                </div>
                            </div>
                            <div className="absolute top-4 right-4 w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                        </div>
                    </div>
                </div>
            </GlassCard>


            {/* Appointments Table */}
            {filteredAppointments.length > 0 ? (
                <TableContainer
                    title="Appointments"
                    icon={<Calendar className="w-5 h-5 text-blue-400" />}
                    description="Manage patient appointments and bookings"
                    columns={appointmentColumns}
                    data={filteredAppointments} total={filteredAppointments.length} search={''} setSearch={undefined}                />
            ) : (
                <GlassCard className="p-8 text-center">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">No appointments found</h3>
                    <p className="text-gray-400 mb-4">
                        Try adjusting your search terms or filters.
                    </p>
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setStatusFilter('all');
                            setTypeFilter('all');
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

export default AppointmentsManagement;