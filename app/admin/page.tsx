/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useEffect, useState } from 'react';
import {
    Users,
    Calendar,
    FileText,
    Package,
    Activity,
    Plus,
    Edit,
    Trash2,
    AlertTriangle,
    CheckCircle,
    Clock,
    TrendingUp
} from 'lucide-react';
import Navbar from '@/components/custom/nav/Navbar';
import UsersList from '@/components/custom/Users';
import Lab2 from '@/components/custom/Tabs/Lab2';
import { Patient } from './lab/add/page';

export interface LabInterface {
    id: string
    patientID: string,
    date: string,
    testName: string,
    Patient?: Patient[]
    resultDate: string,
    status: string,
    result: string,
    notes: string,
    priority: string,
    flagged: boolean
}

export const getStatusColor = (status: string) => {
    switch (status) {
        case 'active':
        case 'completed':
        case 'confirmed':
        case 'in_stock':
            return 'bg-green-100 text-green-800';
        case 'pending':
        case 'processing':
        case 'low_stock':
            return 'bg-yellow-100 text-yellow-800';
        case 'inactive':
        case 'flagged':
        case 'urgent':
        case 'critical_low':
            return 'bg-red-100 text-red-800';
        case 'pending_review':
            return 'bg-teal-100 text-teal-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};




const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');


    // Mock data for dashboard
    const dashboardStats = {
        totalUsers: 1247,
        activeUsers: 892,
        pendingLabResults: 47,
        appointmentRequests: 23,
        medicationStock: {
            prepDaily: 450,
            prepInjectable: 67,
            pep: 234
        },
        recentActivity: 156
    };



    const appointmentRequests = [
        {
            id: 'APT001',
            patientId: 'USR001',
            patientName: 'Alex Johnson',
            requestType: 'PrEP Injection',
            preferredDate: '2024-07-15',
            preferredTime: 'Morning',
            status: 'pending',
            provider: 'Dr. Sarah Wilson',
            priority: 'routine',
            notes: 'Regular 8-week injection appointment'
        },
        {
            id: 'APT002',
            patientId: 'USR005',
            patientName: 'Jordan Taylor',
            requestType: 'Initial PrEP Consultation',
            preferredDate: '2024-06-30',
            preferredTime: 'Afternoon',
            status: 'urgent',
            provider: 'Any Available',
            priority: 'urgent',
            notes: 'New patient, high-risk exposure'
        },
        {
            id: 'APT003',
            patientId: 'USR002',
            patientName: 'Jamie Rodriguez',
            requestType: 'Lab Results Review',
            preferredDate: '2024-07-02',
            preferredTime: 'Flexible',
            status: 'confirmed',
            provider: 'Dr. Michael Chen',
            priority: 'routine',
            notes: 'Review recent blood work'
        }
    ];

    const medicationInventory = [
        {
            id: 'MED001',
            name: 'Truvada (Daily PrEP)',
            activeIngredient: 'Emtricitabine/Tenofovir',
            currentStock: 450,
            minStock: 100,
            maxStock: 1000,
            unitCost: 45.50,
            expirationDate: '2025-12-31',
            supplier: 'Gilead Sciences',
            lastRestocked: '2024-06-01',
            status: 'in_stock'
        },
        {
            id: 'MED002',
            name: 'Cabotegravir (Injectable PrEP)',
            activeIngredient: 'Cabotegravir',
            currentStock: 67,
            minStock: 50,
            maxStock: 200,
            unitCost: 285.75,
            expirationDate: '2025-08-15',
            supplier: 'ViiV Healthcare',
            lastRestocked: '2024-05-15',
            status: 'low_stock'
        },
        {
            id: 'MED003',
            name: 'PEP Starter Pack',
            activeIngredient: 'Emtricitabine/Tenofovir/Raltegravir',
            currentStock: 234,
            minStock: 75,
            maxStock: 500,
            unitCost: 67.25,
            expirationDate: '2025-10-20',
            supplier: 'Multiple',
            lastRestocked: '2024-06-10',
            status: 'in_stock'
        },
        {
            id: 'MED004',
            name: 'Descovy (Daily PrEP)',
            activeIngredient: 'Emtricitabine/Tenofovir alafenamide',
            currentStock: 23,
            minStock: 50,
            maxStock: 300,
            unitCost: 52.80,
            expirationDate: '2025-09-30',
            supplier: 'Gilead Sciences',
            lastRestocked: '2024-04-20',
            status: 'critical_low'
        }
    ];

    const [labResults, setLabResults] = useState<LabInterface[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setIsLoading(true); // Set loading to true before fetching
                const res = await fetch('/api/lab', {
                    method: 'GET',
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch users');
                }

                const data = await res.json();
                setLabResults(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setIsLoading(false); // Ensure loading is set to false after fetch
            }
        };

        fetchJobs();
    }, []);

    console.log(labResults, 'jobs')

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}

            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Navigation Tabs */}
                <div className="bg-white rounded-lg shadow-sm mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8 px-6">
                            {[
                                { id: 'overview', label: 'Overview', icon: Activity },
                                { id: 'users', label: 'Users', icon: Users },
                                { id: 'labs', label: 'Lab Results', icon: FileText },
                                { id: 'appointments', label: 'Appointments', icon: Calendar },
                                { id: 'inventory', label: 'Medication Stock', icon: Package }
                            ].map(({ id, label, icon: Icon }) => (
                                <button
                                    key={id}
                                    onClick={() => setActiveTab(id)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${activeTab === id
                                        ? 'border-teal-500 text-teal-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{label}</span>
                                    {id === 'labs' && labResults.filter(l => l.status === 'flagged').length > 0 && (
                                        <span className="ml-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {labResults.filter(l => l.status === 'flagged').length}
                                        </span>
                                    )}
                                    {id === 'appointments' && appointmentRequests.filter(a => a.status === 'urgent').length > 0 && (
                                        <span className="ml-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {appointmentRequests.filter(a => a.status === 'urgent').length}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-teal-600">Total Users</p>
                                                <p className="text-3xl font-bold text-teal-900">{dashboardStats.totalUsers}</p>
                                                <p className="text-sm text-teal-700">{dashboardStats.activeUsers} active</p>
                                            </div>
                                            <Users className="h-12 w-12 text-teal-600" />
                                        </div>
                                    </div>

                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-yellow-600">Pending Labs</p>
                                                <p className="text-3xl font-bold text-yellow-900">{dashboardStats.pendingLabResults}</p>
                                                <p className="text-sm text-yellow-700">Require review</p>
                                            </div>
                                            <FileText className="h-12 w-12 text-yellow-600" />
                                        </div>
                                    </div>

                                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-green-600">Appointments</p>
                                                <p className="text-3xl font-bold text-green-900">{dashboardStats.appointmentRequests}</p>
                                                <p className="text-sm text-green-700">New requests</p>
                                            </div>
                                            <Calendar className="h-12 w-12 text-green-600" />
                                        </div>
                                    </div>

                                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-purple-600">Med Stock</p>
                                                <p className="text-3xl font-bold text-purple-900">
                                                    {Object.values(dashboardStats.medicationStock).reduce((a, b) => a + b, 0)}
                                                </p>
                                                <p className="text-sm text-purple-700">Total units</p>
                                            </div>
                                            <Package className="h-12 w-12 text-purple-600" />
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="border border-gray-200 rounded-lg p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Critical Alerts</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                                                <AlertTriangle className="h-5 w-5 text-red-600" />
                                                <div>
                                                    <p className="text-sm font-medium text-red-900">Low Stock Alert</p>
                                                    <p className="text-sm text-red-700">Descovy critically low (23 units)</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                                                <Clock className="h-5 w-5 text-yellow-600" />
                                                <div>
                                                    <p className="text-sm font-medium text-yellow-900">Urgent Appointment</p>
                                                    <p className="text-sm text-yellow-700">Jordan Taylor - High risk exposure</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border border-gray-200 rounded-lg p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-3">
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                <div>
                                                    <p className="text-sm text-gray-900">Lab result processed</p>
                                                    <p className="text-xs text-gray-500">Alex Johnson - 5 mins ago</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <Plus className="h-4 w-4 text-teal-500" />
                                                <div>
                                                    <p className="text-sm text-gray-900">New user registered</p>
                                                    <p className="text-xs text-gray-500">Morgan Davis - 15 mins ago</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <Package className="h-4 w-4 text-purple-500" />
                                                <div>
                                                    <p className="text-sm text-gray-900">Medication dispensed</p>
                                                    <p className="text-xs text-gray-500">PEP Starter Pack - 1 hour ago</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border border-gray-200 rounded-lg p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                                        <div className="space-y-3">
                                            <button className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors">
                                                Add New User
                                            </button>
                                            <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                                                Process Lab Results
                                            </button>
                                            <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                                                Reorder Medication
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'users' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                                <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2">
                                    <Plus className="h-4 w-4" />
                                    <span>Add New User</span>
                                </button>
                            </div>
                            <UsersList />



                            {/* Users Table */}

                        </div>
                    )}

                    {activeTab === 'labs' && (
                        <Lab2 labResults={labResults || []} />
                    )}

                    {activeTab === 'appointments' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">Appointment Requests</h2>
                                <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2">
                                    <Plus className="h-4 w-4" />
                                    <span>Schedule Appointment</span>
                                </button>
                            </div>

                            {/* Appointments Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment Type</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preferred Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {appointmentRequests.map((appointment) => (
                                            <tr key={appointment.id} className={`hover:bg-gray-50 ${appointment.status === 'urgent' ? 'bg-red-50' : ''}`}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{appointment.patientName}</div>
                                                        <div className="text-sm text-gray-500">{appointment.patientId}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{appointment.requestType}</div>
                                                    <div className="text-sm text-gray-500">{appointment.priority}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{new Date(appointment.preferredDate).toLocaleDateString()}</div>
                                                    <div className="text-sm text-gray-500">{appointment.preferredTime}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                                                        {appointment.status.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {appointment.provider}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                    <button className="text-green-600 hover:text-green-900">
                                                        <CheckCircle className="h-4 w-4" />
                                                    </button>
                                                    <button className="text-teal-600 hover:text-teal-900">
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-900">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'inventory' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">Medication Inventory</h2>
                                <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2">
                                    <Plus className="h-4 w-4" />
                                    <span>Add Medication</span>
                                </button>
                            </div>

                            {/* Stock Alerts */}
                            <div className="grid md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <div className="flex items-center space-x-3">
                                        <AlertTriangle className="h-6 w-6 text-red-600" />
                                        <div>
                                            <p className="text-sm font-medium text-red-900">Critical Low Stock</p>
                                            <p className="text-sm text-red-700">1 medication needs immediate reorder</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <div className="flex items-center space-x-3">
                                        <Clock className="h-6 w-6 text-yellow-600" />
                                        <div>
                                            <p className="text-sm font-medium text-yellow-900">Low Stock</p>
                                            <p className="text-sm text-yellow-700">1 medication below minimum</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="h-6 w-6 text-green-600" />
                                        <div>
                                            <p className="text-sm font-medium text-green-900">In Stock</p>
                                            <p className="text-sm text-green-700">2 medications well stocked</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Inventory Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medication</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Cost</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {medicationInventory.map((med) => (
                                            <tr key={med.id} className={`hover:bg-gray-50 ${med.status === 'critical_low' ? 'bg-red-50' : med.status === 'low_stock' ? 'bg-yellow-50' : ''}`}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{med.name}</div>
                                                        <div className="text-sm text-gray-500">{med.activeIngredient}</div>
                                                        <div className="text-sm text-gray-500">{med.supplier}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{med.currentStock} units</div>
                                                    <div className="text-sm text-gray-500">Min: {med.minStock} | Max: {med.maxStock}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(med.status)}`}>
                                                        {med.status.replace('_', ' ').toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    ${med.unitCost}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(med.expirationDate).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                    <button className="text-teal-600 hover:text-teal-900">
                                                        <Plus className="h-4 w-4" />
                                                    </button>
                                                    <button className="text-green-600 hover:text-green-900">
                                                        <TrendingUp className="h-4 w-4" />
                                                    </button>
                                                    <button className="text-indigo-600 hover:text-indigo-900">
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;