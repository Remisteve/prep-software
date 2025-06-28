'use client'

import React, { useState } from 'react';
import { User, Calendar, Shield, Clock, Check, AlertCircle, Plus, TestTube, Hospital } from 'lucide-react';
import Facilities from '@/components/custom/Tabs/Facilities';
import Medication from '@/components/custom/Tabs/Medication';
import Lab from '@/components/custom/Tabs/Lab';
import { signOut } from 'next-auth/react';


// PrEP Medication Tracking Data
const medicationData = {
    currentRegimen: 'Injectable PrEP (Cabotegravir)',
    startDate: '2024-01-15',
    lastInjection: {
        date: '2024-05-15',
        location: 'Downtown Health Clinic',
        provider: 'Dr. Sarah Wilson',
        lot: 'CAB2024-156',
        sideEffects: 'None reported'
    },
    nextInjection: {
        date: '2024-07-15',
        daysUntil: 17,
        location: 'Downtown Health Clinic',
        provider: 'Dr. Sarah Wilson',
        status: 'scheduled'
    },
    injectionHistory: [
        { date: '2024-05-15', type: 'Maintenance', provider: 'Dr. Sarah Wilson', sideEffects: 'None', adherence: 100 },
        { date: '2024-03-15', type: 'Maintenance', provider: 'Dr. Sarah Wilson', sideEffects: 'Mild injection site pain', adherence: 100 },
        { date: '2024-02-01', type: 'Loading Dose 2', provider: 'Dr. Sarah Wilson', sideEffects: 'None', adherence: 100 },
        { date: '2024-01-15', type: 'Loading Dose 1', provider: 'Dr. Sarah Wilson', sideEffects: 'Mild injection site pain', adherence: 100 }
    ],
    labResults: [
        { date: '2024-05-10', type: 'HIV Test', result: 'Negative', status: 'normal' },
        { date: '2024-05-10', type: 'Kidney Function', result: 'Normal', status: 'normal' },
        { date: '2024-03-10', type: 'HIV Test', result: 'Negative', status: 'normal' },
        { date: '2024-01-10', type: 'Baseline Labs', result: 'Normal', status: 'normal' }
    ],
    adherenceRate: 100,
    protectionLevel: 'Maximum',
    missedDoses: 0
};

const HealthcareUserProfile = () => {
    const [activeTab, setActiveTab] = useState('medication');
    const [selectedService, setSelectedService] = useState(null);


    // Mock user data
    const userData = {
        name: "Alex Johnson",
        email: "alex.johnson@email.com",
        phone: "+1 (555) 123-4567",
        dateOfBirth: "1990-05-15",
        address: "123 Main St, City, State 12345",
        emergencyContact: "Jane Johnson - (555) 987-6543",
        lastVisit: "2024-06-15",
        memberSince: "2023-01-10",
        profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        currentMedication: "Injectable PrEP",
        nextAppointment: "July 15, 2024"
    };


    const appointments = [
        { date: '2024-07-05', time: '10:00 AM', service: 'PrEP Consultation', status: 'confirmed' },
        { date: '2024-07-12', time: '2:30 PM', service: 'Routine Check-up', status: 'pending' },
        { date: '2024-07-20', time: '11:15 AM', service: 'Lab Results', status: 'scheduled' }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed': case 'delivered': return 'text-green-600 bg-green-100';
            case 'pending': case 'in_transit': return 'text-yellow-600 bg-yellow-100';
            case 'scheduled': return 'text-blue-600 bg-blue-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const ServiceModal = ({ service, onClose }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                            <div className={`${service.color} p-3 rounded-lg`}>
                                <service.icon className="h-6 w-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">{service.title}</h2>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <p className="text-gray-600 mb-6">{service.description}</p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h3>
                            <ul className="space-y-2">
                                {service.benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start space-x-2">
                                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-gray-600">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
                            <ul className="space-y-2">
                                {service.requirements.map((requirement, index) => (
                                    <li key={index} className="flex items-start space-x-2">
                                        <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-gray-600">{requirement}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">Next Available</span>
                        </div>
                        <p className="text-sm text-gray-600">{service.nextAvailable}</p>
                    </div>

                    <div className="mt-6 flex space-x-3">
                        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                            {service.id === 'condoms' ? 'Order Now' : 'Book Consultation'}
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


                {/* Navigation Tabs */}
                <div className="bg-white rounded-lg shadow-sm mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8 px-6">
                            {[
                                { id: 'appointments', label: 'Appointments', icon: Calendar },
                                { id: 'facilities', label: 'Facilities', icon: Hospital },
                                { id: 'medication', label: 'PrEP Monitoring', icon: Shield },
                                { id: 'lab', label: 'Lab Services', icon: TestTube },
                            ].map(({ id, label, icon: Icon }) => (
                                <button
                                    key={id}
                                    onClick={() => setActiveTab(id)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${activeTab === id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{label}</span>
                                    {id === 'medication' && medicationData.nextInjection.daysUntil <= 7 && (
                                        <span className="ml-1 bg-red-500 text-white text-xs rounded-full h-2 w-2"></span>
                                    )}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    {activeTab === 'medication' && (
                        <Medication medicationData={medicationData} />
                    )}

                    {activeTab === 'facilities'
                        &&
                        <Facilities />
                    }

                    {activeTab === 'lab'
                        &&

                        <Lab />
                    }



                    {activeTab === 'appointments' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
                                    <Plus className="h-4 w-4" />
                                    <span>Schedule New</span>
                                </button>
                            </div>

                            {/* Next Injection */}
                            <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-blue-900">Next Injection Appointment</h3>
                                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${medicationData.nextInjection.daysUntil <= 7 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                                        }`}>
                                        {medicationData.nextInjection.status.charAt(0).toUpperCase() + medicationData.nextInjection.status.slice(1)}
                                    </span>
                                </div>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-blue-700">Date & Time</label>
                                        <p className="text-blue-900 font-semibold">
                                            {new Date(medicationData.nextInjection.date).toLocaleDateString()}
                                        </p>
                                        <p className="text-sm text-blue-600">2:00 PM - 2:30 PM</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-blue-700">Provider</label>
                                        <p className="text-blue-900">{medicationData.nextInjection.provider}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-blue-700">Location</label>
                                        <p className="text-blue-900">{medicationData.nextInjection.location}</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex space-x-3">
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                                        Reschedule
                                    </button>
                                    <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
                                        Add to Calendar
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {appointments.map((appointment, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="text-center">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {new Date(appointment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                    </p>
                                                    <p className="text-xs text-gray-500">{appointment.time}</p>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{appointment.service}</p>
                                                    <p className="text-sm text-gray-500">Dr. Sarah Wilson</p>
                                                </div>
                                            </div>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                                                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}


                </div>
            </div>

            {/* Service Detail Modal */}
            {selectedService && (
                <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
            )}
        </div>
    );
};

export default HealthcareUserProfile;