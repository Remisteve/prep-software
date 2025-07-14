'use client'

import React, { useState } from 'react';
import {
    Building2, MapPin, Phone, Mail, Plus, Download,
    Edit3, Trash2, Calendar, X,
    FileText, TrendingUp,
    Globe,

    Hospital
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import TableContainer from '@/components/custom/table/TableContainer';
import { hospitalColumns } from './column';
import GlassCard from '@/components/custom/GlassCard';



// Hospital Details Modal
function HospitalModal({ hospital, isOpen, onClose }) {
    if (!isOpen || !hospital) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <GlassCard variant="primary" className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                                <Building2 className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">{hospital.name}</h2>
                                <p className="text-blue-400 text-lg">{hospital.type}</p>
                                <p className="text-gray-400">ID: {hospital.id} • CCC: {hospital.cccNumber}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Contact Information */}
                        <GlassCard className="p-4">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                                <Phone className="w-5 h-5 text-blue-400 mr-2" />
                                Contact Information
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <Phone className="w-4 h-4 text-gray-400" />
                                    <div>
                                        <p className="text-white text-sm">Main Phone</p>
                                        <p className="text-gray-300 text-xs">{hospital.contact.mainPhone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Phone className="w-4 h-4 text-red-400" />
                                    <div>
                                        <p className="text-white text-sm">Emergency</p>
                                        <p className="text-gray-300 text-xs">{hospital.contact.emergencyPhone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Mail className="w-4 h-4 text-blue-400" />
                                    <div>
                                        <p className="text-white text-sm">Email</p>
                                        <p className="text-gray-300 text-xs">{hospital.contact.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Globe className="w-4 h-4 text-green-400" />
                                    <div>
                                        <p className="text-white text-sm">Website</p>
                                        <p className="text-gray-300 text-xs">{hospital.contact.website}</p>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Address Information */}
                        <GlassCard className="p-4">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                                <MapPin className="w-5 h-5 text-emerald-400 mr-2" />
                                Address
                            </h3>
                            <div className="space-y-2">
                                <p className="text-white">{hospital.address.street}</p>
                                <p className="text-gray-300">
                                    {hospital.address.city}, {hospital.address.state} {hospital.address.zipCode}
                                </p>
                            </div>
                        </GlassCard>

                        {/* Performance KPIs */}
                        <GlassCard className="p-4">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                                <TrendingUp className="w-5 h-5 text-purple-400 mr-2" />
                                Performance KPIs
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                                    <div className="text-xl font-bold text-purple-400">{hospital.kpis.performanceScore}%</div>
                                    <div className="text-gray-300 text-xs">Performance Score</div>
                                </div>
                                <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                                    <div className="text-xl font-bold text-cyan-400">{hospital.kpis.registeredPatients.toLocaleString()}</div>
                                    <div className="text-gray-300 text-xs">Registered Patients</div>
                                </div>
                                <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                                    <div className="text-xl font-bold text-yellow-400">{hospital.kpis.drugsDispensed.toLocaleString()}</div>
                                    <div className="text-gray-300 text-xs">Drugs Dispensed</div>
                                </div>
                                <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                                    <div className={`text-xl font-bold ${hospital.kpis.monthlyGrowth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {hospital.kpis.monthlyGrowth >= 0 ? '+' : ''}{hospital.kpis.monthlyGrowth}%
                                    </div>
                                    <div className="text-gray-300 text-xs">Monthly Growth</div>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Registration Details */}
                        <GlassCard className="p-4">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                                <Calendar className="w-5 h-5 text-purple-400 mr-2" />
                                Registration Details
                            </h3>
                            <div className="space-y-2">
                                <div>
                                    <p className="text-gray-400 text-xs">Registration Date</p>
                                    <p className="text-white text-sm">{new Date(hospital.registrationDate).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs">Last Updated</p>
                                    <p className="text-white text-sm">{new Date(hospital.lastUpdated).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs">Photos Uploaded</p>
                                    <p className="text-white text-sm">{hospital.photos} Photos</p>
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Admin Notes - Full Width */}
                    <div className="mt-6">
                        <GlassCard className="p-4">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                                <FileText className="w-5 h-5 text-yellow-400 mr-2" />
                                Admin Notes
                            </h3>
                            <p className="text-gray-300 text-sm">
                                {hospital.adminNotes || 'No admin notes available.'}
                            </p>
                        </GlassCard>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-center space-x-4 mt-6 pt-6 border-t border-white/10">
                        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/25 flex items-center space-x-2">
                            <Edit3 className="w-5 h-5" />
                            <span>Edit Hospital</span>
                        </button>
                        <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/25 flex items-center space-x-2">
                            <Trash2 className="w-5 h-5" />
                            <span>Delete Hospital</span>
                        </button>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}

// Mock Hospital Data
const mockHospitals = [
    {
        id: 'HOSP-001',
        name: 'MedConnect Downtown Medical Center',
        type: 'General Hospital',
        cccNumber: 'CCC-12345',
        active: true,
        registrationDate: '2024-01-15',
        lastUpdated: '2024-07-10',
        address: {
            street: '123 Health Street',
            city: 'San Francisco',
            state: 'CA',
            zipCode: '94102'
        },
        contact: {
            mainPhone: '+1 (555) 123-4567',
            emergencyPhone: '+1 (555) 911-0000',
            email: 'info@medconnect.com',
            website: 'https://medconnect.com'
        },
        photos: 3,
        adminNotes: 'Excellent facility with modern equipment.',
        kpis: {
            performanceScore: 92,
            registeredPatients: 1245,
            drugsDispensed: 3420,
            monthlyGrowth: 8.5
        }
    },
    {
        id: 'HOSP-002',
        name: 'Riverside Children\'s Hospital',
        type: 'Pediatric Hospital',
        cccNumber: 'CCC-67890',
        active: true,
        registrationDate: '2024-07-08',
        lastUpdated: '2024-07-08',
        address: {
            street: '456 Children Ave',
            city: 'Oakland',
            state: 'CA',
            zipCode: '94606'
        },
        contact: {
            mainPhone: '+1 (555) 234-5678',
            emergencyPhone: '+1 (555) 911-1111',
            email: 'admin@riverside-childrens.org',
            website: 'https://riverside-childrens.org'
        },
        photos: 5,
        adminNotes: 'Specialized pediatric care facility.',
        kpis: {
            performanceScore: 88,
            registeredPatients: 856,
            drugsDispensed: 2130,
            monthlyGrowth: 12.3
        }
    },
    {
        id: 'HOSP-003',
        name: 'Bay Area Rehabilitation Center',
        type: 'Rehabilitation Center',
        cccNumber: 'CCC-11111',
        active: false,
        registrationDate: '2024-03-20',
        lastUpdated: '2024-06-15',
        address: {
            street: '789 Recovery Blvd',
            city: 'San Jose',
            state: 'CA',
            zipCode: '95110'
        },
        contact: {
            mainPhone: '+1 (555) 345-6789',
            emergencyPhone: '+1 (555) 911-2222',
            email: 'contact@bayrehab.com',
            website: 'https://bayrehab.com'
        },
        photos: 2,
        adminNotes: 'Specialized in physical therapy.',
        kpis: {
            performanceScore: 76,
            registeredPatients: 432,
            drugsDispensed: 890,
            monthlyGrowth: -2.1
        }
    },
    {
        id: 'HOSP-004',
        name: 'Central Valley Medical Campus',
        type: 'Teaching Hospital',
        cccNumber: 'CCC-22222',
        active: false,
        registrationDate: '2024-06-30',
        lastUpdated: '2024-07-05',
        address: {
            street: '321 Education Dr',
            city: 'Fresno',
            state: 'CA',
            zipCode: '93721'
        },
        contact: {
            mainPhone: '+1 (555) 456-7890',
            emergencyPhone: '+1 (555) 911-3333',
            email: 'admin@centralvalleymed.edu',
            website: 'https://centralvalleymed.edu'
        },
        photos: 1,
        adminNotes: 'Teaching hospital with medical students.',
        kpis: {
            performanceScore: 84,
            registeredPatients: 967,
            drugsDispensed: 2340,
            monthlyGrowth: 5.7
        }
    },
    {
        id: 'HOSP-005',
        name: 'Coastal Emergency Medical Center',
        type: 'Specialty Hospital',
        cccNumber: 'CCC-33333',
        active: true,
        registrationDate: '2024-02-10',
        lastUpdated: '2024-07-01',
        address: {
            street: '654 Ocean View Rd',
            city: 'Santa Cruz',
            state: 'CA',
            zipCode: '95060'
        },
        contact: {
            mainPhone: '+1 (555) 567-8901',
            emergencyPhone: '+1 (555) 911-4444',
            email: 'info@coastalemergency.com',
            website: 'https://coastalemergency.com'
        },
        photos: 4,
        adminNotes: 'Emergency and urgent care specialist.',
        kpis: {
            performanceScore: 95,
            registeredPatients: 678,
            drugsDispensed: 1890,
            monthlyGrowth: 15.2
        }
    }
];

// Main Hospital Management Component
function HospitalManagement() {
    const [hospitals, setHospitals] = useState(mockHospitals);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [activeFilter, setActiveFilter] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

    // Sorting logic

    // Filter hospitals based on search and filters
    const filteredHospitals = hospitals.filter(hospital => {
        const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hospital.cccNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hospital.address.city.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = typeFilter === 'all' || hospital.type === typeFilter;
        const matchesActive = activeFilter === 'all' ||
            (activeFilter === 'active' && hospital.active) ||
            (activeFilter === 'inactive' && !hospital.active);

        return matchesSearch && matchesType && matchesActive;
    });

    // Sort hospitals
    const sortedHospitals = [...filteredHospitals].sort((a, b) => {
        const aValue = sortConfig.key.includes('.')
            ? sortConfig.key.split('.').reduce((obj, key) => obj[key], a)
            : a[sortConfig.key];
        const bValue = sortConfig.key.includes('.')
            ? sortConfig.key.split('.').reduce((obj, key) => obj[key], b)
            : b[sortConfig.key];

        if (typeof aValue === 'string') {
            return sortConfig.direction === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }

        if (sortConfig.direction === 'asc') {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
    });

    // Get statistics
    const stats = {
        total: hospitals.length,
        active: hospitals.filter(h => h.active).length,
        inactive: hospitals.filter(h => !h.active).length,
        thisMonth: hospitals.filter(h => {
            const regDate = new Date(h.registrationDate);
            const thisMonth = new Date();
            return regDate.getMonth() === thisMonth.getMonth() && regDate.getFullYear() === thisMonth.getFullYear();
        }).length,
        // KPI calculations
        avgPerformance: Math.round(hospitals.reduce((sum, h) => sum + h.kpis.performanceScore, 0) / hospitals.length),
        totalPatients: hospitals.reduce((sum, h) => sum + h.kpis.registeredPatients, 0),
        totalDrugsDispensed: hospitals.reduce((sum, h) => sum + h.kpis.drugsDispensed, 0),
        avgGrowth: (hospitals.reduce((sum, h) => sum + h.kpis.monthlyGrowth, 0) / hospitals.length).toFixed(1)
    };

    // Action handlers





    const exportData = () => {
        const dataStr = JSON.stringify(sortedHospitals, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = 'hospitals-export.json';
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    const router = useRouter();

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <GlassCard variant="primary" className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-white">Hospital Management</h1>
                        <p className="text-blue-400">Manage registered medical facilities</p>
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
                            onClick={() => router.push('/admin/facilities/add')}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/25 flex items-center space-x-2"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add Hospital</span>
                        </button>
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-6">
                    <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-2xl font-bold text-blue-400">{stats.total}</div>
                        <div className="text-gray-300 text-sm">Total Hospitals</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-2xl font-bold text-emerald-400">{stats.active}</div>
                        <div className="text-gray-300 text-sm">Active</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-2xl font-bold text-red-400">{stats.inactive}</div>
                        <div className="text-gray-300 text-sm">Inactive</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-2xl font-bold text-purple-400">{stats.avgPerformance}%</div>
                        <div className="text-gray-300 text-sm">Avg Performance</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-2xl font-bold text-cyan-400">{stats.totalPatients.toLocaleString()}</div>
                        <div className="text-gray-300 text-sm">Total Patients</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-2xl font-bold text-yellow-400">{stats.totalDrugsDispensed.toLocaleString()}</div>
                        <div className="text-gray-300 text-sm">Drugs Dispensed</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-2xl font-bold text-green-400">+{stats.avgGrowth}%</div>
                        <div className="text-gray-300 text-sm">Avg Growth</div>
                    </div>
                </div>
            </GlassCard>



            {/* Results Count */}
            <div className="flex items-center justify-between">
                <p className="text-gray-300">
                    Showing {sortedHospitals.length} of {hospitals.length} hospitals
                </p>
            </div>

            {/* Data Table */}
            <TableContainer
                title='Hospitals'
                icon={<Hospital />}
                description='Registered hospitals'
                columns={hospitalColumns}
                data={hospitals}
                total={hospitals?.length}
            />

            {/* Hospital Details Modal */}
            <HospitalModal
                hospital={selectedHospital}
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                    setSelectedHospital(null);
                }}
            />
        </div>
    );
}

export default HospitalManagement;