'use client'

import React, { useState } from 'react';
import { Calendar, Shield, TestTube, Hospital } from 'lucide-react';
import Facilities from '@/components/custom/Tabs/Facilities';
import Medication from '@/components/custom/Tabs/Medication';
import Lab from '@/components/custom/Tabs/Lab';
import Appointments from '@/components/custom/Tabs/Appointments';
import TabNavigation, { ListItemsInterface } from '@/components/custom/nav/TabNavigation';


export interface AppointmentInterface {
    date: string;
    time: string;
    service: string;
    status: 'confirmed' | 'pending' | 'scheduled';
}


const appointments: AppointmentInterface[] = [
    { date: '2024-07-05', time: '10:00 AM', service: 'PrEP Consultation', status: 'confirmed' },
    { date: '2024-07-12', time: '2:30 PM', service: 'Routine Check-up', status: 'pending' },
    { date: '2024-07-20', time: '11:15 AM', service: 'Lab Results', status: 'scheduled' }
];


export interface MedicationInterface {
    currentRegimen: string;
    startDate: string;
    lastInjection: {
        date: string;
        location: string;
        provider: string;
        lot: string;
        sideEffects: string;
    };
    nextInjection: {
        date: string;
        daysUntil: number;
        location: string;
        provider: string;
        status: string;
    };
    injectionHistory: Array<{
        date: string;
        type: string;
        provider: string;
        sideEffects: string;
        adherence: number;
    }>;

    adherenceRate: number;
    protectionLevel: string;
    missedDoses: number;
}

const medicationData: MedicationInterface = {
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
        { date: '2024-05-15', type: 'Maintenance Injection', provider: 'Dr. Sarah Wilson', sideEffects: 'None', adherence: 100 },
        { date: '2024-03-15', type: 'Maintenance Injection', provider: 'Dr. Sarah Wilson', sideEffects: 'Mild injection site pain', adherence: 100 },
        { date: '2024-02-01', type: 'Loading Dose 2', provider: 'Dr. Sarah Wilson', sideEffects: 'None', adherence: 100 },
        { date: '2024-01-15', type: 'Loading Dose 1', provider: 'Dr. Sarah Wilson', sideEffects: 'Mild injection site pain', adherence: 100 }
    ],
    adherenceRate: 100,
    protectionLevel: 'Maximum',
    missedDoses: 0
};

const listItems: ListItemsInterface[] = [
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'facilities', label: 'Facilities', icon: Hospital },
    { id: 'medication', label: 'PrEP Monitoring', icon: Shield },
    { id: 'lab', label: 'Lab Services', icon: TestTube },
]

const HealthcareUserProfile = () => {
    const [activeTab, setActiveTab] = useState('medication');

    return (
        <div className="min-h-screen bg-gray-50">
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} listItems={listItems} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


                {/* Navigation Tabs */}

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
                        <Appointments medicationData={medicationData} appointments={appointments} />
                    )}


                </div>
            </div>


        </div>
    );
};

export default HealthcareUserProfile;