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
    TrendingUp,
    PillBottle,
    Syringe
} from 'lucide-react';
import Navbar from '@/components/custom/nav/Navbar';
import UsersList from '@/components/custom/Users';
import Lab2 from '@/components/custom/Tabs/Lab2';
import { Patient } from './lab/add/page';
import AdminMedication, { MedicationInterface } from '@/components/custom/Tabs/AdminMedication';
import AdminAppointments from '@/components/custom/Tabs/AdminAppointments';
import { medicationData } from '@/data';

export interface InventoryInterface {
    id: string,
    name: string,
    activeIngredient: string,
    currentStock: number,
    minStock: number,
    maxStock: number,
    unitCost: number,
    expirationDate: string,
    supplier: string,
    lastRestocked: string,
    status: string
}

export interface LabInterface {
    id: string
    patientID: string,
    date: string,
    testName: string,
    Patient?: Patient
    resultDate: string,
    status: string,
    result: string,
    notes: string,
    priority: string,
    flagged: boolean
}




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
                                { id: 'appointments', label: 'Appointments', icon: Calendar },
                                { id: 'users', label: 'Users', icon: Users },
                                { id: 'labs', label: 'Lab Results', icon: FileText },
                                { id: 'medication', label: 'Medication', icon: Syringe }
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
                        <AdminAppointments />
                    )}

                    {activeTab === 'medication' && (
                        <AdminMedication medicationData={medicationData} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;