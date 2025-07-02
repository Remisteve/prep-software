'use client'

import { Button } from '@/components/ui/button';
import {
    AlertTriangle,
    CheckCircle,
    Clock,
    Plus,
    Calendar,
    User,
    UserCheck,
    Pill,
    RefreshCw
} from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

export interface User {
    id: string;
    name: string;
    email: string;
    role?: string;
    image?: string;
}

export interface Patient {
    id: string;
    name: string;
    email: string;
    age?: number;
    phone?: string;
    image?: string;
}

export interface MedicationInterface {
    id?: string;
    frequency?: string;
    date?: string;
    Doctor: User;
    Patient: Patient;
    medicineName?: string;
    dosage?: string;
    status?: string;
    createdAt?: string;
    nextFollowUp?: string;
}

export const getStatusColor = (status: string) => {
    switch (status) {
        case 'active':
        case 'completed':
        case 'confirmed':
            return 'bg-green-100 text-green-800 border-green-200';
        case 'pending':
        case 'processing':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'expired':
        case 'cancelled':
        case 'urgent':
            return 'bg-red-100 text-red-800 border-red-200';
        case 'pending_review':
            return 'bg-blue-100 text-blue-800 border-blue-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

const AdminMedication = ({ medicationData }: { medicationData: MedicationInterface[] }) => {
    const router = useRouter();

    // Calculate statistics
    const stats = {
        total: medicationData.length,
        active: medicationData.filter(med => med.status === 'active').length,
        pending: medicationData.filter(med => med.status === 'pending').length,
        expiringSoon: medicationData.filter(med => {
            if (!med.nextFollowUp) return false;
            const followUpDate = new Date(med.nextFollowUp);
            const today = new Date();
            const diffDays = Math.ceil((followUpDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
            return diffDays <= 7 && diffDays >= 0;
        }).length
    };

    const frequencyOptions = ['1 month', '6 months', 'weekly', 'daily'] as const;
    type FrequencyType = typeof frequencyOptions[number];

    const getFrequencyBadge = (frequency?: string) => {
        if (!frequency) return null;

        const colors: Record<FrequencyType, string> = {
            '1 month': 'bg-blue-100 text-blue-800',
            '6 months': 'bg-green-100 text-green-800',
            'weekly': 'bg-purple-100 text-purple-800',
            'daily': 'bg-orange-100 text-orange-800'
        };

        const colorClass = (frequencyOptions.includes(frequency as FrequencyType) ? colors[frequency as FrequencyType] : 'bg-gray-100 text-gray-800');

        return (
            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${colorClass}`}>
                {frequency}
            </span>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Medication Prescriptions</h2>
                    <p className="text-gray-600 mt-1">Manage patient prescriptions and follow-ups</p>
                </div>
                <div className="flex space-x-3">
                    <Button
                        variant="outline"
                        onClick={() => window.location.reload()}
                        className="flex items-center space-x-2"
                    >
                        <RefreshCw className="h-4 w-4" />
                        <span>Refresh</span>
                    </Button>
                    <Button
                        onClick={() => router.push('/admin/medication/add')}
                        className="bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2"
                    >
                        <Plus className="h-4 w-4" />
                        <span>New Prescription</span>
                    </Button>
                </div>
            </div>

            {/* Prescription Statistics */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                        <Pill className="h-6 w-6 text-blue-600" />
                        <div>
                            <p className="text-sm font-medium text-blue-900">Total Prescriptions</p>
                            <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                        <div>
                            <p className="text-sm font-medium text-green-900">Active Prescriptions</p>
                            <p className="text-2xl font-bold text-green-700">{stats.active}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                        <Clock className="h-6 w-6 text-yellow-600" />
                        <div>
                            <p className="text-sm font-medium text-yellow-900">Pending Review</p>
                            <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                        <div>
                            <p className="text-sm font-medium text-red-900">Follow-ups This Week</p>
                            <p className="text-2xl font-bold text-red-700">{stats.expiringSoon}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Prescriptions Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Patient
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Doctor
                                </th>

                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Frequency
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>

                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {medicationData.map((med) => (
                                <tr
                                    key={med.id}
                                    className={`hover:bg-gray-50 transition-colors ${med.status === 'urgent' ? 'bg-red-50' :
                                        med.status === 'pending' ? 'bg-yellow-50' : ''
                                        }`}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                {med.Patient.image ? (
                                                    <img
                                                        className="h-10 w-10 rounded-full object-cover"
                                                        src={med.Patient.image}
                                                        alt={med.Patient.name}
                                                    />
                                                ) : (
                                                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                        <User className="h-5 w-5 text-gray-500" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{med.Patient.name}</div>
                                                <div className="text-sm text-gray-500">{med.Patient.email}</div>
                                                {med.Patient.age && (
                                                    <div className="text-xs text-gray-400">Age: {med.Patient.age}</div>
                                                )}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-8 w-8">
                                                {med.Doctor.image ? (
                                                    <img
                                                        className="h-8 w-8 rounded-full object-cover"
                                                        src={med.Doctor.image}
                                                        alt={med.Doctor.name}
                                                    />
                                                ) : (
                                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <UserCheck className="h-4 w-4 text-blue-600" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-3">
                                                <div className="text-sm font-medium text-gray-900">{med.Doctor.name}</div>
                                                <div className="text-xs text-gray-500">{med.Doctor.role || 'Doctor'}</div>
                                            </div>
                                        </div>
                                    </td>



                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getFrequencyBadge(med.frequency)}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-900">
                                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                            {med.date ? new Date(med.date).toLocaleDateString() : 'Not set'}
                                        </div>
                                        {med.nextFollowUp && (
                                            <div className="text-xs text-gray-500 mt-1">
                                                Next: {new Date(med.nextFollowUp).toLocaleDateString()}
                                            </div>
                                        )}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(med.status || 'active')}`}>
                                            {med.status === 'active' && <CheckCircle className="w-3 h-3 mr-1" />}
                                            {med.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                                            {med.status === 'urgent' && <AlertTriangle className="w-3 h-3 mr-1" />}
                                            {(med.status || 'active').replace('_', ' ').toUpperCase()}
                                        </span>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {medicationData.length === 0 && (
                    <div className="text-center py-12">
                        <Pill className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No prescriptions</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new prescription.</p>
                        <div className="mt-6">
                            <Button
                                onClick={() => router.push('/admin/medication/add')}
                                className="bg-teal-600 hover:bg-teal-700"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                New Prescription
                            </Button>
                        </div>
                    </div>
                )}
            </div>


        </div>
    );
};

export default AdminMedication;