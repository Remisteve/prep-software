'use client'

import React, { useState } from 'react';
import {
    ChevronDown,
    ChevronRight,
    PillBottle,
    Calendar,
    User,
    MapPin,
    Activity,
    CheckCircle,
    Pill,
    Syringe,
    Heart,
    Download,
    MoreVertical
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const Medication = ({ medicationData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMedication, setSelectedMedication] = useState('injectable');

    // Calculate days until next injection

    const medications = [
        {
            id: 'injectable',
            name: 'Injectable PrEP',
            type: 'Cabotegravir',
            frequency: 'Every 8 weeks',
            effectiveness: '99%',
            icon: Syringe,
            color: 'blue',
            description: 'Long-acting injectable medication'
        },
        {
            id: 'daily',
            name: 'Daily PrEP',
            type: 'Truvada/Descovy',
            frequency: 'Once daily',
            effectiveness: '99%',
            icon: Pill,
            color: 'green',
            description: 'Daily oral medication'
        }
    ];


    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">PrEP Medication Monitoring</h2>
                    <p className="text-slate-600 mt-1">Track your medication schedule and injection history</p>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                        <Download className="h-4 w-4" />
                        <span className="text-sm font-medium">Export Report</span>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600">
                        <MoreVertical className="h-5 w-5" />
                    </button>
                </div>
            </div>



            {/* Current Regimen */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div
                    className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-slate-50 to-slate-100 cursor-pointer hover:from-slate-100 hover:to-slate-150 transition-colors"
                    onClick={() => setIsOpen(prev => !prev)}
                >
                    <div
                        className='flex space-x-4 items-center'
                    >
                        <PillBottle className="h-8 w-8 rounded-full text-orange-600 bg-orange-200 p-2" />

                        <div>
                            <h3 className=" font-semibold text-slate-900 flex items-center space-x-2">
                                <span>Current Regimen</span>
                            </h3>
                            <p className="text-sm text-slate-600 mt-1">
                                {`${medicationData.currentRegimen} • Every 8 weeks`}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                            Active
                        </span>
                        <button className="p-2 hover:bg-white rounded-lg transition-colors">
                            {isOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {isOpen && (
                    <div className="p-6 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-green-500 p-2 rounded-lg">
                                        <Calendar className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-green-700">Last Injection</label>
                                        <p className="text-green-900 font-semibold">{new Date(medicationData.lastInjection.date).toLocaleDateString()}</p>
                                        <p className="text-xs text-green-600">8 weeks ago</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-purple-500 p-2 rounded-lg">
                                        <User className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-purple-700">Provider</label>
                                        <p className="text-purple-900 font-semibold">{medicationData.lastInjection.provider}</p>
                                        <p className="text-xs text-purple-600">Primary care physician</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-orange-500 p-2 rounded-lg">
                                        <MapPin className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-orange-700">Location</label>
                                        <p className="text-orange-900 font-semibold">{medicationData.lastInjection.location}</p>
                                        <p className="text-xs text-orange-600">Primary clinic</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Progress Timeline */}
                        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                            <h4 className="text-sm font-semibold text-slate-700 mb-3">Treatment Progress</h4>
                            <div className="flex items-center space-x-2">
                                <div className="flex-1 bg-slate-200 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                                </div>
                                <span className="text-sm font-medium text-slate-700">75% through cycle</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">6 weeks completed • 2 weeks remaining</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Injection History */}
                <div className="lg:col-span-2">
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
                        <div className="p-4 border-b border-slate-200 flex space-x-4">
                            <Activity className="h-8 w-8 rounded-full text-cyan-600 bg-cyan-200 p-2" />
                            <div>

                                <h3 className="font-semibold text-slate-900 flex items-center space-x-2">
                                    <span>Injection History</span>
                                </h3>
                                <p className="text-sm text-slate-500 mt-1">Complete record of your injections</p>
                            </div>
                        </div>
                        <div className="p-6">
                            <ScrollArea className="h-[350px] bg-slate-50 rounded-lg p-4">
                                {medicationData.injectionHistory.map((injection, index) => (
                                    <div key={index} className="relative pl-8 my-4 ">
                                        {/* Timeline line */}
                                        {index !== medicationData.injectionHistory.length - 1 && (
                                            <div className="absolute left-2 top-8 bottom-0 w-0.5 bg-slate-200"></div>
                                        )}

                                        {/* Timeline dot */}
                                        <div className="absolute left-0 top-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>

                                        <div className=" border bg-white border-slate-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3 mb-2 justify-between">
                                                        <h4 className="font-semibold text-slate-900">
                                                            {new Date(injection.date).toLocaleDateString('en-US', {
                                                                weekday: 'short',
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric'
                                                            })}
                                                        </h4>
                                                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full flex items-center space-x-1">
                                                            <CheckCircle className="h-3 w-3" />
                                                            <span>Completed</span>
                                                        </span>
                                                    </div>

                                                    <div className="flex justify-between text-[14px]">

                                                        <div>
                                                            <span className=" text-slate-600">Provider:</span>
                                                            <p className="text-slate-700 font-medium">{injection.provider}</p>
                                                        </div>
                                                        <div className='border-slate-200 h-8 border-l' />
                                                        <div>
                                                            <span className=" text-slate-600">Side Effects:</span>
                                                            <p className="text-slate-700 font-medium">{injection.sideEffects}</p>
                                                        </div>
                                                        <div className='border-slate-200 h-8 border-l' />

                                                        <div className=" flex items-center space-x-4">
                                                            <div className="flex items-center space-x-2">
                                                                <Heart className="h-4 w-4 text-red-500" />
                                                                <span className="text-sm text-slate-600">Adherence: {injection.adherence}%</span>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </ScrollArea>
                        </div>
                    </div>
                </div>

                {/* Medication Options */}
                <div className="lg:col-span-1">
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
                        <div className="p-4 border-b border-slate-200">
                            <h3 className="font-semibold text-slate-900">Medication Options</h3>
                            <p className="text-sm text-slate-500 mt-1">Available PrEP medications</p>
                        </div>
                        <div className="p-6 space-y-4">
                            {medications.map((med) => {
                                const isSelected = selectedMedication === med.id;
                                const IconComponent = med.icon;
                                return (
                                    <div
                                        key={med.id}
                                        onClick={() => setSelectedMedication(med.id)}
                                        className={`p-4 rounded-lg border cursor-pointer transition-all ${isSelected
                                            ? `border-${med.color}-300 bg-${med.color}-50 ring-2 ring-${med.color}-200`
                                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                            }`}
                                    >
                                        <div className="flex items-start space-x-3">
                                            <div className={`p-2 rounded-lg ${isSelected ? `bg-${med.color}-500` : 'bg-slate-200'
                                                }`}>
                                                <IconComponent className={`h-5 w-5 ${isSelected ? 'text-white' : 'text-slate-600'
                                                    }`} />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-slate-900">{med.name}</h4>
                                                <p className="text-sm text-slate-600">{med.type}</p>
                                                <p className="text-xs text-slate-500 mt-1">{med.description}</p>
                                                <div className="mt-2 space-y-1">
                                                    <div className="flex justify-between text-xs">
                                                        <span className="text-slate-500">Frequency:</span>
                                                        <span className="font-medium">{med.frequency}</span>
                                                    </div>
                                                    <div className="flex justify-between text-xs">
                                                        <span className="text-slate-500">Effectiveness:</span>
                                                        <span className="font-medium text-green-600">{med.effectiveness}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                Schedule Consultation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};




export default Medication;