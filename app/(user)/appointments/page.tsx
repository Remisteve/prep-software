'use client'

import React, { useState, useMemo, ElementType, ReactNode } from 'react';
import {
    Calendar, Clock, MapPin, User, Phone, Video, Plus, Search, Filter,
    ChevronDown, ChevronUp, Edit3, Trash2, AlertTriangle, CheckCircle,
    XCircle, Bell, Heart, Shield, Stethoscope, FileText, MessageCircle,
    CalendarPlus, Building2, Navigation, Star, ArrowRight, RefreshCw,
    Users, Target, Activity, Pill, BookOpen
} from 'lucide-react';
import GlassCard from '@/components/custom/GlassCard';
import { statusStyles } from '@/components/custom/StatusBadge';

interface AppointmentTypeInterface {
    icon: ElementType
    id: string
    name: string
    duration: string
    description: string
    category: string
}

interface FacilityInterface{
    id:number
    rating:number
    name:string
    address:string
    distance:string
    specialties:string[]
}

interface AppointmentInterface     {
        id:number,
        date: string,
        time: string,
        type: string,
        provider: string,
        facility: string,
        address: string,
        status: string,
        duration: string,
        mode: string
        notes: string
    }


// Status Badge Component
function StatusBadge({ status, children }:{
    status:string
    children:ReactNode
}) {
    const style = statusStyles[status] || statusStyles.neutral;
    return (
        <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full 
            ${style.bg} ${style.border} ${style.text} border backdrop-blur-sm
            transition-all duration-300 shadow-lg`}>
            {children}
        </span>
    );
}



// Sample Data
const sampleAppointments:AppointmentInterface[] = [
    {
        id: 1,
        date: '2025-07-20',
        time: '10:00 AM',
        type: 'PrEP Consultation',
        provider: 'Dr. Sarah Johnson',
        facility: 'MedConnect Downtown',
        address: '123 Health St, Downtown',
        status: 'confirmed',
        duration: '30 min',
        mode: 'in-person',
        notes: 'Quarterly check-up and prescription renewal'
    },
    {
        id: 2,
        date: '2025-07-25',
        time: '2:30 PM',
        type: 'Lab Results Review',
        provider: 'Dr. Michael Chen',
        facility: 'MedConnect North',
        address: '456 Care Ave, North District',
        status: 'pending',
        duration: '15 min',
        mode: 'video',
        notes: 'Discuss recent test results'
    },
    {
        id: 3,
        date: '2025-07-15',
        time: '9:00 AM',
        type: 'Emergency Consultation',
        provider: 'Dr. Emily Davis',
        facility: 'MedConnect Emergency',
        address: '789 Urgent Rd, Medical District',
        status: 'completed',
        duration: '45 min',
        mode: 'in-person',
        notes: 'PEP treatment consultation - completed'
    },
    {
        id: 4,
        date: '2025-08-01',
        time: '11:30 AM',
        type: 'Mental Health Session',
        provider: 'Dr. Jessica Wilson',
        facility: 'MedConnect Community',
        address: '321 Community Dr, East Side',
        status: 'confirmed',
        duration: '50 min',
        mode: 'video',
        notes: 'Regular counseling session'
    },
    {
        id: 5,
        date: '2025-07-10',
        time: '3:00 PM',
        type: 'HIV Testing',
        provider: 'Nurse Amanda Rodriguez',
        facility: 'MedConnect Downtown',
        address: '123 Health St, Downtown',
        status: 'completed',
        duration: '20 min',
        mode: 'in-person',
        notes: 'Routine testing - results available'
    },
    {
        id: 6,
        date: '2025-08-05',
        time: '4:15 PM',
        type: 'General Health Check',
        provider: 'Dr. Robert Kim',
        facility: 'MedConnect North',
        address: '456 Care Ave, North District',
        status: 'pending',
        duration: '25 min',
        mode: 'in-person',
        notes: 'Annual wellness examination'
    }
];



const facilities: FacilityInterface[] = [
    {
        id: 1,
        name: 'MedConnect Downtown',
        address: '123 Health St, Downtown',
        distance: '0.5 miles',
        rating: 4.8,
        specialties: ['PrEP', 'General Health', 'Testing']
    },
    {
        id: 2,
        name: 'MedConnect North',
        address: '456 Care Ave, North District',
        distance: '2.1 miles',
        rating: 4.6,
        specialties: ['PrEP', 'PEP', 'Counseling']
    },
    {
        id: 3,
        name: 'MedConnect Emergency',
        address: '789 Urgent Rd, Medical District',
        distance: '1.8 miles',
        rating: 4.9,
        specialties: ['Emergency', 'PEP', '24/7 Care']
    }
];

const appointmentTypes:AppointmentTypeInterface[] = [
    {
        id: 'prep',
        name: 'PrEP Consultation',
        description: 'Regular PrEP monitoring and prescription',
        duration: '30 min',
        icon: Shield,
        category: 'Prevention'
    },
    {
        id: 'pep',
        name: 'PEP Treatment',
        description: 'Emergency post-exposure treatment',
        duration: '45 min',
        icon: AlertTriangle,
        category: 'Emergency'
    },
    {
        id: 'testing',
        name: 'HIV Testing',
        description: 'Comprehensive testing and screening',
        duration: '20 min',
        icon: Activity,
        category: 'Testing'
    },
    {
        id: 'counseling',
        name: 'Counseling Session',
        description: 'Mental health and support services',
        duration: '50 min',
        icon: MessageCircle,
        category: 'Support'
    },
    {
        id: 'general',
        name: 'General Health',
        description: 'Routine health check-up',
        duration: '25 min',
        icon: Stethoscope,
        category: 'General'
    }
];

// Enhanced Appointment Card Component
function AppointmentCard({ appointment }:{appointment:AppointmentInterface}) {
    const getStatusInfo = (status:string) => {
        switch (status) {
            case 'confirmed':
                return { status: 'success', text: 'Confirmed', icon: CheckCircle };
            case 'pending':
                return { status: 'warning', text: 'Pending', icon: Clock };
            case 'completed':
                return { status: 'info', text: 'Completed', icon: CheckCircle };
            case 'cancelled':
                return { status: 'error', text: 'Cancelled', icon: XCircle };
            default:
                return { status: 'neutral', text: 'Unknown', icon: Clock };
        }
    };

    const getAppointmentTypeColor = (type: string) => {
        switch (type.toLowerCase()) {
            case 'prep consultation': return 'from-blue-500 to-cyan-500';
            case 'emergency consultation': return 'from-red-500 to-orange-500';
            case 'mental health session': return 'from-purple-500 to-indigo-500';
            case 'hiv testing': return 'from-emerald-500 to-green-500';
            case 'lab results review': return 'from-amber-500 to-yellow-500';
            default: return 'from-gray-500 to-gray-600';
        }
    };

    const statusInfo = getStatusInfo(appointment.status);
    const appointmentDate = new Date(appointment.date);
    const isUpcoming = appointmentDate > new Date();
    const isPast = appointmentDate < new Date();

    return (
        <GlassCard className="p-6 cursor-pointer relative overflow-hidden group" hover>
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${getAppointmentTypeColor(appointment.type)} 
                            rounded-xl flex items-center justify-center shadow-lg border border-white/20 backdrop-blur-sm`}>
                            <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">{appointment.type}</h3>
                            <p className="text-blue-400 text-sm">{appointment.provider}</p>
                        </div>
                    </div>
                    <StatusBadge status={statusInfo.status}>{statusInfo.text}</StatusBadge>
                </div>

                <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-2 text-gray-300">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="text-sm">
                            {appointmentDate.toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })} at {appointment.time}
                        </span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                        <MapPin className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm">{appointment.facility}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                        {appointment.mode === 'video' ? (
                            <Video className="w-4 h-4 text-purple-400" />
                        ) : (
                            <Building2 className="w-4 h-4 text-orange-400" />
                        )}
                        <span className="text-sm capitalize">{appointment.mode} • {appointment.duration}</span>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-3">
                    <p className="text-xs text-gray-400 mb-1">Notes:</p>
                    <p className="text-sm text-gray-300">{appointment.notes}</p>
                </div>
            </div>
        </GlassCard>
    );
}

// Book Appointment Modal
function BookAppointmentModal({ isOpen, onClose }:{
    isOpen:boolean
    onClose:()=>void
}) {



    const [step, setStep] = useState(1);
    const [selectedType, setSelectedType] = useState<AppointmentTypeInterface | null>(null);
    const [selectedFacility, setSelectedFacility] = useState<FacilityInterface | null>(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const timeSlots = [
        '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'
    ];

    if (!isOpen) return null;

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white mb-4">Select Appointment Type</h3>
                        <div className="space-y-3">
                            {appointmentTypes.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setSelectedType(type)}
                                    className={`w-full p-4 rounded-xl border transition-all text-left ${selectedType?.id === type.id
                                        ? 'bg-blue-500/20 border-blue-500/40'
                                        : 'bg-white/10 border-white/20 hover:bg-white/20'
                                        }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <type.icon className="w-5 h-5 text-blue-400" />
                                        <div>
                                            <h4 className="font-medium text-white">{type.name}</h4>
                                            <p className="text-sm text-gray-300">{type.description}</p>
                                            <p className="text-xs text-gray-400">{type.duration} • {type.category}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white mb-4">Choose Facility</h3>
                        <div className="space-y-3">
                            {facilities.map((facility) => (
                                <button
                                    key={facility.id}
                                    onClick={() => setSelectedFacility(facility)}
                                    className={`w-full p-4 rounded-xl border transition-all text-left ${selectedFacility?.id === facility.id
                                        ? 'bg-emerald-500/20 border-emerald-500/40'
                                        : 'bg-white/10 border-white/20 hover:bg-white/20'
                                        }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-3">
                                            <Building2 className="w-5 h-5 text-emerald-400 mt-1" />
                                            <div>
                                                <h4 className="font-medium text-white">{facility.name}</h4>
                                                <p className="text-sm text-gray-300 mb-2">{facility.address}</p>
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex items-center space-x-1">
                                                        <Star className="w-4 h-4 text-yellow-400" />
                                                        <span className="text-sm text-gray-300">{facility.rating}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <Navigation className="w-4 h-4 text-blue-400" />
                                                        <span className="text-sm text-gray-300">{facility.distance}</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {facility.specialties.map((specialty, index) => (
                                                        <span key={index} className="px-2 py-1 bg-white/10 text-xs text-gray-300 rounded-full">
                                                            {specialty}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white mb-4">Select Date & Time</h3>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Available Times</label>
                            <div className="grid grid-cols-3 gap-2">
                                {timeSlots.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={`p-3 rounded-xl border transition-all text-sm ${selectedTime === time
                                            ? 'bg-blue-500/20 border-blue-500/40 text-blue-400'
                                            : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20'
                                            }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                );



            case 4:
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-white mb-4">Confirm Appointment</h3>

                        <GlassCard className="p-4">
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    {selectedType && <selectedType.icon className="w-5 h-5 text-blue-400" />}
                                    <div>
                                        <h4 className="font-medium text-white">{selectedType?.name}</h4>
                                        <p className="text-sm text-gray-300">{selectedType?.duration}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Building2 className="w-5 h-5 text-emerald-400" />
                                    <div>
                                        <h4 className="font-medium text-white">{selectedFacility?.name}</h4>
                                        <p className="text-sm text-gray-300">{selectedFacility?.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Calendar className="w-5 h-5 text-purple-400" />
                                    <div>
                                        <h4 className="font-medium text-white">
                                            {new Date(selectedDate).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </h4>
                                        <p className="text-sm text-gray-300">{selectedTime}</p>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                            <div className="flex items-start space-x-3">
                                <Bell className="w-5 h-5 text-yellow-400 mt-0.5" />
                                <div>
                                    <h4 className="font-medium text-yellow-400 mb-1">Reminder</h4>
                                    <p className="text-sm text-gray-300">
                                        You'll receive confirmation via SMS and email. Please arrive 15 minutes early for your appointment.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <GlassCard className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Book New Appointment</h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-xl bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20 transition-all"
                        >
                            <XCircle className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center mb-6">
                        {[1, 2, 3, 4].map((stepNum) => (
                            <React.Fragment key={stepNum}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= stepNum ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-400'
                                    }`}>
                                    {stepNum}
                                </div>
                                {stepNum < 4 && (
                                    <div className={`flex-1 h-1 mx-2 ${step > stepNum ? 'bg-blue-500' : 'bg-white/10'
                                        }`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {renderStep()}

                    <div className="flex space-x-3 mt-6">
                        {step > 1 && (
                            <button
                                onClick={() => setStep(step - 1)}
                                className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                            >
                                Back
                            </button>
                        )}
                        <button
                            onClick={() => {
                                if (step < 4) {
                                    setStep(step + 1);
                                } else {
                                    // Book appointment logic here
                                    onClose();
                                }
                            }}
                            disabled={
                                (step === 1 && !selectedType) ||
                                (step === 2 && !selectedFacility) ||
                                (step === 3 && (!selectedDate || !selectedTime))
                            }
                            className="flex-1 px-6 py-3 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                            {step === 4 ? (
                                <>
                                    <CheckCircle className="w-5 h-5" />
                                    <span>Confirm Appointment</span>
                                </>
                            ) : (
                                <>
                                    <span>Continue</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}

// Main Appointments Component
function AppointmentsPage() {
    const [appointments] = useState(sampleAppointments);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showBookModal, setShowBookModal] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    const filteredAppointments = useMemo(() => {
        return appointments.filter(appointment => {
            const matchesSearch = appointment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                appointment.provider.toLowerCase().includes(searchTerm.toLowerCase());

            if (filter === 'all') return matchesSearch;
            if (filter === 'upcoming') {
                const appointmentDate = new Date(appointment.date);
                return appointmentDate >= new Date() && matchesSearch;
            }
            if (filter === 'past') {
                const appointmentDate = new Date(appointment.date);
                return appointmentDate < new Date() && matchesSearch;
            }
            return appointment.status === filter && matchesSearch;
        });
    }, [appointments, filter, searchTerm]);

    const upcomingCount = appointments.filter(apt => new Date(apt.date) >= new Date()).length;
    const pendingCount = appointments.filter(apt => apt.status === 'pending').length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <GlassCard variant="primary" className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2 flex items-center">
                            <Calendar className="w-7 h-7 text-white mr-3" />
                            My Appointments
                        </h1>
                        <p className="text-gray-300">Manage your healthcare appointments and bookings</p>
                    </div>
                    <button
                        onClick={() => setShowBookModal(true)}
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all flex items-center space-x-2 hover:scale-105"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Book Appointment</span>
                    </button>
                </div>
            </GlassCard>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <GlassCard className="p-4" hover>
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30">
                            <Calendar className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white">{upcomingCount}</p>
                            <p className="text-sm text-gray-300">Upcoming</p>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-4" hover>
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/30">
                            <Clock className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white">{pendingCount}</p>
                            <p className="text-sm text-gray-300">Pending</p>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-4" hover>
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                            <Shield className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white">8</p>
                            <p className="text-sm text-gray-300">Months Active</p>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-4" hover>
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/30">
                            <Target className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white">98%</p>
                            <p className="text-sm text-gray-300">Attendance</p>
                        </div>
                    </div>
                </GlassCard>
            </div>

            {/* Search and Filters */}
            <GlassCard className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search appointments..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                        />
                    </div>

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all flex items-center space-x-2"
                    >
                        <Filter className="w-5 h-5" />
                        <span>Filters</span>
                        {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                </div>

                {showFilters && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="flex flex-wrap gap-2">
                            {[
                                { key: 'all', label: 'All Appointments' },
                                { key: 'upcoming', label: 'Upcoming' },
                                { key: 'past', label: 'Past' },
                                { key: 'confirmed', label: 'Confirmed' },
                                { key: 'pending', label: 'Pending' }
                            ].map((filterOption) => (
                                <button
                                    key={filterOption.key}
                                    onClick={() => setFilter(filterOption.key)}
                                    className={`px-4 py-2 rounded-xl transition-all text-sm ${filter === filterOption.key
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20'
                                        }`}
                                >
                                    {filterOption.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </GlassCard>

            {/* Appointments Grid - 2 columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment) => (
                        <AppointmentCard
                            key={appointment.id}
                            appointment={appointment}
                        />
                    ))
                ) : (
                    <div className="col-span-full">
                        <GlassCard className="p-8 text-center">
                            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-white mb-2">No appointments found</h3>
                            <p className="text-gray-400 mb-4">
                                {searchTerm || filter !== 'all'
                                    ? 'Try adjusting your search or filters'
                                    : 'You don\'t have any appointments scheduled'
                                }
                            </p>
                            <button
                                onClick={() => setShowBookModal(true)}
                                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all flex items-center space-x-2 mx-auto"
                            >
                                <Plus className="w-5 h-5" />
                                <span>Book Your First Appointment</span>
                            </button>
                        </GlassCard>
                    </div>
                )}
            </div>

            {/* Book Appointment Modal */}
            <BookAppointmentModal
                isOpen={showBookModal}
                onClose={() => setShowBookModal(false)}
            />
        </div>
    );
}

export default AppointmentsPage;