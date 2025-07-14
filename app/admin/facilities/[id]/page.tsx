'use client'

import React, { useState } from 'react';
import {
    MapPin, Phone, Star, Navigation, Building2, Shield, Activity,
    Stethoscope, Heart, AlertTriangle, MessageCircle, Video, Clock,
    Users, Calendar, ArrowLeft, Mail, Globe, ChevronDown, ChevronUp,
    CheckCircle, Award, Car, Wifi, CreditCard, Coffee, UserCheck,
    Plus, Edit3, Share2, Bookmark, ExternalLink, Target, Bell
} from 'lucide-react';

// Status Color System (matching your theme)
const statusStyles = {
    success: {
        bg: 'bg-black/30',
        border: 'border-emerald-400/40',
        text: 'text-emerald-400',
        icon: 'text-emerald-400'
    },
    warning: {
        bg: 'bg-black/30',
        border: 'border-amber-400/40',
        text: 'text-amber-400',
        icon: 'text-amber-400'
    },
    error: {
        bg: 'bg-black/30',
        border: 'border-red-400/40',
        text: 'text-red-400',
        icon: 'text-red-400'
    },
    info: {
        bg: 'bg-black/30',
        border: 'border-blue-400/40',
        text: 'text-blue-400',
        icon: 'text-blue-400'
    },
    neutral: {
        bg: 'bg-black/30',
        border: 'border-white/20',
        text: 'text-gray-300',
        icon: 'text-gray-300'
    }
};

// Glass Card Component
function GlassCard({ children, className = "", hover = false, variant = "default" }) {
    const variants = {
        default: "backdrop-blur-lg bg-black/40 border-white/20",
        primary: "backdrop-blur-lg bg-black/50 border-blue-500/30",
        success: "backdrop-blur-lg bg-black/50 border-emerald-500/30"
    };

    return (
        <div className={`
            rounded-2xl ${variants[variant]} border
            ${hover ? 'hover:bg-black/60 hover:border-white/30 hover:scale-[1.01] transition-all duration-300' : ''} 
            ${className}
        `}>
            {children}
        </div>
    );
}

// Status Badge Component
function StatusBadge({ status, children }) {
    const style = statusStyles[status] || statusStyles.neutral;
    return (
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${style.bg} ${style.border} ${style.text} border`}>
            {children}
        </span>
    );
}

// Sample Detailed Hospital Data
const hospitalData = {
    id: 1,
    name: 'MedConnect Downtown Medical Center',
    type: 'Primary Care & Specialty Hospital',
    address: '123 Health Street, Downtown District',
    city: 'Metropolitan City',
    zipCode: '10001',
    phone: '+1 (555) 123-4567',
    emergencyPhone: '+1 (555) 123-4568',
    email: 'info@medconnect-downtown.health',
    website: 'www.medconnect.health/downtown',
    rating: 4.8,
    reviewCount: 342,
    distance: 0.5,
    status: 'open',
    establishedYear: 2018,
    description: 'MedConnect Downtown Medical Center is a state-of-the-art healthcare facility specializing in HIV prevention, primary care, and comprehensive health services. We provide compassionate, evidence-based care to our community with a focus on dignity, respect, and clinical excellence.',

    hours: {
        monday: '8:00 AM - 8:00 PM',
        tuesday: '8:00 AM - 8:00 PM',
        wednesday: '8:00 AM - 8:00 PM',
        thursday: '8:00 AM - 8:00 PM',
        friday: '8:00 AM - 8:00 PM',
        saturday: '9:00 AM - 6:00 PM',
        sunday: '10:00 AM - 4:00 PM'
    },

    services: [
        { name: 'PrEP Consultation & Management', icon: Shield, category: 'Prevention', description: 'Comprehensive pre-exposure prophylaxis services' },
        { name: 'HIV Testing & Counseling', icon: Activity, category: 'Testing', description: 'Rapid and laboratory HIV testing with counseling' },
        { name: 'General Primary Care', icon: Stethoscope, category: 'Primary Care', description: 'Complete primary healthcare services' },
        { name: 'Laboratory Services', icon: Activity, category: 'Laboratory', description: 'On-site lab testing and diagnostics' },
        { name: 'Mental Health Counseling', icon: Heart, category: 'Mental Health', description: 'Individual and group counseling services' },
        { name: 'Prescription Services', icon: UserCheck, category: 'Pharmacy', description: 'Medication management and prescription services' },
        { name: 'Health Education', icon: Users, category: 'Education', description: 'Community health education programs' },
        { name: 'Telehealth Services', icon: Video, category: 'Remote Care', description: 'Virtual consultations and follow-ups' }
    ],

    specialties: [
        'HIV Prevention & Treatment',
        'Sexual Health',
        'Primary Care',
        'Preventive Medicine',
        'Mental Health',
        'Infectious Diseases',
        'Community Health'
    ],

    amenities: [
        { name: 'Free Parking', icon: Car, available: true },
        { name: 'WiFi Access', icon: Wifi, available: true },
        { name: 'Wheelchair Accessible', icon: UserCheck, available: true },
        { name: 'Credit Card Payments', icon: CreditCard, available: true },
        { name: 'Cafeteria', icon: Coffee, available: true },
        { name: 'Pharmacy On-Site', icon: Plus, available: true },
        { name: 'Lab Services', icon: Activity, available: true },
        { name: '24/7 Emergency', icon: AlertTriangle, available: false }
    ],

    staff: [
        {
            name: 'Dr. Sarah Johnson',
            role: 'Chief Medical Officer & PrEP Specialist',
            credentials: 'MD, MPH',
            experience: '8 years',
            specialties: ['HIV Prevention', 'Infectious Diseases'],
            availability: 'Mon-Fri 9AM-5PM',
            image: 'SJ'
        },
        {
            name: 'Dr. Michael Rodriguez',
            role: 'Primary Care Physician',
            credentials: 'MD',
            experience: '12 years',
            specialties: ['Family Medicine', 'Preventive Care'],
            availability: 'Mon-Thu 8AM-6PM',
            image: 'MR'
        },
        {
            name: 'Lisa Chen, RN',
            role: 'Nurse Coordinator',
            credentials: 'RN, BSN',
            experience: '6 years',
            specialties: ['Patient Care', 'Health Education'],
            availability: 'Mon-Fri 8AM-4PM',
            image: 'LC'
        },
        {
            name: 'Dr. James Wilson',
            role: 'Mental Health Counselor',
            credentials: 'LCSW, PhD',
            experience: '10 years',
            specialties: ['Mental Health', 'Trauma Counseling'],
            availability: 'Tue-Sat 10AM-6PM',
            image: 'JW'
        }
    ],

    certifications: [
        'Joint Commission Accredited',
        'CLIA Certified Laboratory',
        'HIPAA Compliant',
        'CDC Guidelines Certified',
        'State Health Department Licensed'
    ],

    insurance: [
        'Medicare', 'Medicaid', 'Blue Cross Blue Shield', 'Aetna', 'Cigna', 'UnitedHealth',
        'Kaiser Permanente', 'Humana', 'Most private insurance plans'
    ],

    languages: ['English', 'Spanish', 'Mandarin', 'Portuguese', 'French'],

    coordinates: { lat: 40.7589, lng: -73.9851 },

    reviews: [
        {
            id: 1,
            rating: 5,
            author: 'Maria S.',
            date: '2024-06-15',
            title: 'Excellent PrEP Care',
            content: 'Dr. Johnson and her team provided exceptional care. The facility is clean, modern, and the staff is incredibly knowledgeable about PrEP.',
            verified: true
        },
        {
            id: 2,
            rating: 5,
            author: 'David L.',
            date: '2024-06-10',
            title: 'Professional and Caring',
            content: 'Outstanding service from start to finish. The appointment booking was easy and the wait time was minimal. Highly recommend!',
            verified: true
        },
        {
            id: 3,
            rating: 4,
            author: 'Jennifer M.',
            date: '2024-06-05',
            title: 'Great Experience',
            content: 'Very satisfied with the care I received. The mental health counseling services were particularly helpful.',
            verified: true
        }
    ]
};

// Hospital Details Page Component
function HospitalDetailsPage() {
    const [activeTab, setActiveTab] = useState('overview');
    const [showAllServices, setShowAllServices] = useState(false);
    const [showAllStaff, setShowAllStaff] = useState(false);
    const [showAllReviews, setShowAllReviews] = useState(false);

    const handleBack = () => {
        console.log('Navigate back to facilities list');
        // In a real app: router.back() or router.push('/facilities')
    };

    const handleCall = () => {
        window.open(`tel:${hospitalData.phone}`, '_self');
    };

    const handleEmergencyCall = () => {
        window.open(`tel:${hospitalData.emergencyPhone}`, '_self');
    };

    const displayedServices = showAllServices ? hospitalData.services : hospitalData.services.slice(0, 6);
    const displayedStaff = showAllStaff ? hospitalData.staff : hospitalData.staff.slice(0, 2);
    const displayedReviews = showAllReviews ? hospitalData.reviews : hospitalData.reviews.slice(0, 2);

    return (
        <div className="space-y-6">
            {/* Header with Back Button */}
            <GlassCard variant="primary" className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                    <button
                        onClick={handleBack}
                        className="p-2 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-2xl lg:text-3xl font-bold text-white">{hospitalData.name}</h1>
                        <p className="text-blue-400 text-lg">{hospitalData.type}</p>
                        <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-1">
                                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                                <span className="text-white text-lg font-medium">{hospitalData.rating}</span>
                                <span className="text-gray-300">({hospitalData.reviewCount} reviews)</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Navigation className="w-5 h-5 text-emerald-400" />
                                <span className="text-emerald-400">{hospitalData.distance} miles away</span>
                            </div>
                            <StatusBadge status="success">Open Now</StatusBadge>
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <button className="p-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all">
                            <Share2 className="w-5 h-5" />
                        </button>
                        <button className="p-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all">
                            <Bookmark className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <button
                        onClick={handleCall}
                        className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 via-green-500/15 to-emerald-600/20 border border-emerald-500/30 text-left hover:from-emerald-500/30 hover:via-green-500/25 hover:to-emerald-600/30 hover:border-emerald-400/40 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 group relative overflow-hidden"
                        style={{
                            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-300/0 to-emerald-400/0 group-hover:via-emerald-300/5 transition-all duration-300 rounded-xl"></div>
                        <Phone className="w-6 h-6 text-emerald-400 mb-2 relative z-10 group-hover:text-emerald-300 transition-colors duration-300" />
                        <h3 className="font-medium text-white relative z-10">Call Hospital</h3>
                        <p className="text-emerald-400 text-sm relative z-10 group-hover:text-emerald-300 transition-colors duration-300">{hospitalData.phone}</p>
                    </button>

                    <button className="p-4 rounded-xl bg-gradient-to-br from-blue-500/20 via-cyan-500/15 to-blue-600/20 border border-blue-500/30 text-left hover:from-blue-500/30 hover:via-cyan-500/25 hover:to-blue-600/30 hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group relative overflow-hidden"
                        style={{
                            boxShadow: '0 4px 15px rgba(59, 130, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-cyan-300/0 to-blue-400/0 group-hover:via-cyan-300/5 transition-all duration-300 rounded-xl"></div>
                        <Calendar className="w-6 h-6 text-blue-400 mb-2 relative z-10 group-hover:text-cyan-300 transition-colors duration-300" />
                        <h3 className="font-medium text-white relative z-10">Book Appointment</h3>
                        <p className="text-blue-400 text-sm relative z-10 group-hover:text-cyan-300 transition-colors duration-300">Schedule your visit</p>
                    </button>

                    <button className="p-4 rounded-xl bg-gradient-to-br from-purple-500/20 via-violet-500/15 to-purple-600/20 border border-purple-500/30 text-left hover:from-purple-500/30 hover:via-violet-500/25 hover:to-purple-600/30 hover:border-purple-400/40 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 group relative overflow-hidden"
                        style={{
                            boxShadow: '0 4px 15px rgba(147, 51, 234, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-violet-300/0 to-purple-400/0 group-hover:via-violet-300/5 transition-all duration-300 rounded-xl"></div>
                        <Navigation className="w-6 h-6 text-purple-400 mb-2 relative z-10 group-hover:text-violet-300 transition-colors duration-300" />
                        <h3 className="font-medium text-white relative z-10">Get Directions</h3>
                        <p className="text-purple-400 text-sm relative z-10 group-hover:text-violet-300 transition-colors duration-300">Navigate to facility</p>
                    </button>

                    <button
                        onClick={handleEmergencyCall}
                        className="p-4 rounded-xl bg-gradient-to-br from-red-500/20 via-rose-500/15 to-red-600/20 border border-red-500/30 text-left hover:from-red-500/30 hover:via-rose-500/25 hover:to-red-600/30 hover:border-red-400/40 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 group relative overflow-hidden"
                        style={{
                            boxShadow: '0 4px 15px rgba(239, 68, 68, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-red-400/0 via-rose-300/0 to-red-400/0 group-hover:via-rose-300/5 transition-all duration-300 rounded-xl"></div>
                        <AlertTriangle className="w-6 h-6 text-red-400 mb-2 relative z-10 group-hover:text-rose-300 transition-colors duration-300" />
                        <h3 className="font-medium text-white relative z-10">Emergency</h3>
                        <p className="text-red-400 text-sm relative z-10 group-hover:text-rose-300 transition-colors duration-300">{hospitalData.emergencyPhone}</p>
                    </button>
                </div>
            </GlassCard>

            {/* Tab Navigation */}
            <GlassCard className="p-1">
                <div className="flex space-x-1">
                    {[
                        { id: 'overview', label: 'Overview' },
                        { id: 'services', label: 'Services' },
                        { id: 'gallery', label: 'Gallery' },
                        { id: 'contact', label: 'Contact' },
                        { id: 'reviews', label: 'Reviews' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 px-4 py-3 rounded-xl transition-all duration-300 text-center relative overflow-hidden group ${activeTab === tab.id
                                    ? 'bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 border border-blue-400/30'
                                    : 'bg-gradient-to-r from-white/5 to-white/10 text-gray-300 hover:from-blue-500/20 hover:to-cyan-500/20 hover:text-white hover:shadow-md hover:shadow-blue-500/10 border border-white/10 hover:border-blue-400/20'
                                }`}
                            style={{
                                boxShadow: activeTab === tab.id
                                    ? '0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(6, 182, 212, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                                    : 'inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                            }}
                        >
                            {/* Animated glow effect for active tab */}
                            {activeTab === tab.id && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                            )}

                            {/* Hover glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-cyan-400/0 to-blue-400/0 group-hover:via-cyan-400/10 transition-all duration-300 rounded-xl"></div>

                            <span className="relative z-10 font-medium">{tab.label}</span>

                            {/* Bottom neon line for active tab */}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"></div>
                            )}
                        </button>
                    ))}
                </div>
            </GlassCard>

            {/* Tab Content */}
            {activeTab === 'overview' && (
                <div className="space-y-6">
                    {/* About */}
                    <GlassCard className="p-6">
                        <h2 className="text-xl font-bold text-white mb-4">About {hospitalData.name}</h2>
                        <p className="text-gray-300 leading-relaxed mb-6">{hospitalData.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <h3 className="font-semibold text-white mb-3">Established</h3>
                                <p className="text-gray-300">{hospitalData.establishedYear}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-white mb-3">Specialties</h3>
                                <div className="flex flex-wrap gap-1">
                                    {hospitalData.specialties.slice(0, 3).map((specialty, index) => (
                                        <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                                            {specialty}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-white mb-3">Languages</h3>
                                <p className="text-gray-300">{hospitalData.languages.slice(0, 3).join(', ')}</p>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Hours */}
                    <GlassCard className="p-6">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                            <Clock className="w-6 h-6 text-blue-400 mr-2" />
                            Hours of Operation
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(hospitalData.hours).map(([day, hours]) => (
                                <div key={day} className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                                    <span className="text-gray-300 capitalize font-medium">{day}</span>
                                    <span className="text-white">{hours}</span>
                                </div>
                            ))}
                        </div>
                    </GlassCard>

                    {/* Amenities */}
                    <GlassCard className="p-6">
                        <h2 className="text-xl font-bold text-white mb-4">Amenities & Features</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {hospitalData.amenities.map((amenity, index) => (
                                <div key={index} className={`p-3 rounded-xl border ${amenity.available
                                        ? 'bg-emerald-500/10 border-emerald-500/30'
                                        : 'bg-gray-500/10 border-gray-500/30'
                                    }`}>
                                    <amenity.icon className={`w-5 h-5 mb-2 ${amenity.available ? 'text-emerald-400' : 'text-gray-400'
                                        }`} />
                                    <p className={`text-sm font-medium ${amenity.available ? 'text-white' : 'text-gray-400'
                                        }`}>
                                        {amenity.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            )}

            {activeTab === 'services' && (
                <div className="space-y-6">
                    <GlassCard className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">Medical Services</h2>
                            <span className="text-blue-400">{hospitalData.services.length} services available</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {displayedServices.map((service, index) => (
                                <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30">
                                            <service.icon className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-white mb-1">{service.name}</h3>
                                            <p className="text-gray-300 text-sm mb-2">{service.description}</p>
                                            <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                                                {service.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {hospitalData.services.length > 6 && (
                            <div className="text-center mt-6">
                                <button
                                    onClick={() => setShowAllServices(!showAllServices)}
                                    className="px-6 py-3 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-all flex items-center space-x-2 mx-auto"
                                >
                                    <span>{showAllServices ? 'Show Less' : `Show All ${hospitalData.services.length} Services`}</span>
                                    {showAllServices ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>
                            </div>
                        )}
                    </GlassCard>

                    {/* Insurance */}
                    <GlassCard className="p-6">
                        <h2 className="text-xl font-bold text-white mb-4">Insurance Accepted</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {hospitalData.insurance.map((plan, index) => (
                                <div key={index} className="p-3 rounded-xl bg-white/5 border border-white/10">
                                    <p className="text-white text-sm">{plan}</p>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            )}

            {activeTab === 'gallery' && (
                <div className="space-y-6">
                    {/* Gallery Header */}
                    <GlassCard className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">Facility Gallery</h2>
                            <div className="flex space-x-2">
                                <button className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-all">
                                    All Photos
                                </button>
                                <button className="px-4 py-2 bg-white/10 border border-white/20 text-gray-300 rounded-lg text-sm hover:bg-white/20 transition-all">
                                    Virtual Tour
                                </button>
                            </div>
                        </div>

                        {/* Image Categories */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                            {[
                                { name: 'Exterior', count: 8, active: true },
                                { name: 'Reception', count: 12, active: false },
                                { name: 'Treatment Rooms', count: 15, active: false },
                                { name: 'Equipment', count: 10, active: false }
                            ].map((category, index) => (
                                <button
                                    key={index}
                                    className={`p-3 rounded-xl border transition-all text-left ${category.active
                                            ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-white'
                                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                                        }`}
                                >
                                    <p className="font-medium text-sm">{category.name}</p>
                                    <p className="text-xs opacity-70">{category.count} photos</p>
                                </button>
                            ))}
                        </div>
                    </GlassCard>

                    {/* Main Featured Image */}
                    <GlassCard className="p-6">
                        <div className="aspect-video bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-cyan-500/20 rounded-2xl overflow-hidden relative border border-white/10">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <Building2 className="w-16 h-16 text-blue-400 mx-auto mb-4 opacity-60" />
                                    <h3 className="text-xl font-bold text-white mb-2">MedConnect Downtown - Main Entrance</h3>
                                    <p className="text-gray-300 text-sm">Modern healthcare facility in the heart of downtown</p>
                                </div>
                            </div>

                            {/* Image overlay with gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                            {/* Image controls */}
                            <div className="absolute bottom-4 right-4 flex space-x-2">
                                <button className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all">
                                    <Users className="w-4 h-4" />
                                </button>
                                <button className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all">
                                    <ExternalLink className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Image Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Reception Area */}
                        <GlassCard className="aspect-square bg-gradient-to-br from-emerald-500/20 via-green-500/10 to-emerald-600/20 rounded-xl overflow-hidden relative border border-white/10 hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <Heart className="w-12 h-12 text-emerald-400 mx-auto mb-3 opacity-60" />
                                    <h4 className="text-lg font-bold text-white mb-1">Reception Area</h4>
                                    <p className="text-gray-300 text-sm">Welcoming front desk</p>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-black/60 transition-all"></div>
                            <div className="absolute top-3 right-3">
                                <span className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs rounded-full">
                                    Interior
                                </span>
                            </div>
                        </GlassCard>

                        {/* Treatment Room */}
                        <GlassCard className="aspect-square bg-gradient-to-br from-purple-500/20 via-violet-500/10 to-purple-600/20 rounded-xl overflow-hidden relative border border-white/10 hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <Stethoscope className="w-12 h-12 text-purple-400 mx-auto mb-3 opacity-60" />
                                    <h4 className="text-lg font-bold text-white mb-1">Treatment Room</h4>
                                    <p className="text-gray-300 text-sm">Private consultation space</p>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-black/60 transition-all"></div>
                            <div className="absolute top-3 right-3">
                                <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs rounded-full">
                                    Medical
                                </span>
                            </div>
                        </GlassCard>

                        {/* Laboratory */}
                        <GlassCard className="aspect-square bg-gradient-to-br from-amber-500/20 via-yellow-500/10 to-amber-600/20 rounded-xl overflow-hidden relative border border-white/10 hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <Activity className="w-12 h-12 text-amber-400 mx-auto mb-3 opacity-60" />
                                    <h4 className="text-lg font-bold text-white mb-1">Laboratory</h4>
                                    <p className="text-gray-300 text-sm">On-site testing facility</p>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-black/60 transition-all"></div>
                            <div className="absolute top-3 right-3">
                                <span className="px-2 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs rounded-full">
                                    Lab
                                </span>
                            </div>
                        </GlassCard>

                        {/* Waiting Area */}
                        <GlassCard className="aspect-square bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-cyan-600/20 rounded-xl overflow-hidden relative border border-white/10 hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <Users className="w-12 h-12 text-cyan-400 mx-auto mb-3 opacity-60" />
                                    <h4 className="text-lg font-bold text-white mb-1">Waiting Area</h4>
                                    <p className="text-gray-300 text-sm">Comfortable seating</p>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-black/60 transition-all"></div>
                            <div className="absolute top-3 right-3">
                                <span className="px-2 py-1 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs rounded-full">
                                    Comfort
                                </span>
                            </div>
                        </GlassCard>

                        {/* Pharmacy */}
                        <GlassCard className="aspect-square bg-gradient-to-br from-rose-500/20 via-pink-500/10 to-rose-600/20 rounded-xl overflow-hidden relative border border-white/10 hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <Plus className="w-12 h-12 text-rose-400 mx-auto mb-3 opacity-60" />
                                    <h4 className="text-lg font-bold text-white mb-1">Pharmacy</h4>
                                    <p className="text-gray-300 text-sm">On-site medication</p>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-black/60 transition-all"></div>
                            <div className="absolute top-3 right-3">
                                <span className="px-2 py-1 bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs rounded-full">
                                    Pharmacy
                                </span>
                            </div>
                        </GlassCard>

                        {/* Counseling Room */}
                        <GlassCard className="aspect-square bg-gradient-to-br from-indigo-500/20 via-blue-500/10 to-indigo-600/20 rounded-xl overflow-hidden relative border border-white/10 hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <MessageCircle className="w-12 h-12 text-indigo-400 mx-auto mb-3 opacity-60" />
                                    <h4 className="text-lg font-bold text-white mb-1">Counseling Room</h4>
                                    <p className="text-gray-300 text-sm">Private therapy space</p>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-black/60 transition-all"></div>
                            <div className="absolute top-3 right-3">
                                <span className="px-2 py-1 bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-xs rounded-full">
                                    Mental Health
                                </span>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Virtual Tour CTA */}
                    <GlassCard variant="primary" className="p-6">
                        <div className="text-center">
                            <Video className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Take a Virtual Tour</h3>
                            <p className="text-gray-300 mb-6">
                                Experience our facility from the comfort of your home with our interactive 360° virtual tour.
                            </p>
                            <div className="flex justify-center space-x-4">
                                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all flex items-center space-x-2 shadow-lg shadow-blue-500/25">
                                    <Video className="w-5 h-5" />
                                    <span>Start Virtual Tour</span>
                                </button>
                                <button className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all flex items-center space-x-2">
                                    <ExternalLink className="w-5 h-5" />
                                    <span>View All Photos</span>
                                </button>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            )}

            {activeTab === 'staff' && (
                <div className="space-y-6">
                    <GlassCard className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">Medical Staff</h2>
                            <span className="text-blue-400">{hospitalData.staff.length} healthcare providers</span>
                        </div>

                        <div className="space-y-4">
                            {displayedStaff.map((member, index) => (
                                <div key={index} className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                                            <span className="text-white font-bold text-lg">{member.image}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-white">{member.name}</h3>
                                            <p className="text-blue-400 font-medium">{member.role}</p>
                                            <p className="text-gray-300 text-sm mb-3">{member.credentials} • {member.experience} experience</p>

                                            <div className="mb-3">
                                                <p className="text-gray-400 text-sm mb-1">Specialties:</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {member.specialties.map((specialty, i) => (
                                                        <span key={i} className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                                                            {specialty}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center space-x-1">
                                                    <Clock className="w-4 h-4 text-blue-400" />
                                                    <span className="text-gray-300 text-sm">{member.availability}</span>
                                                </div>
                                                <button className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-all">
                                                    Book Appointment
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {hospitalData.staff.length > 2 && (
                            <div className="text-center mt-6">
                                <button
                                    onClick={() => setShowAllStaff(!showAllStaff)}
                                    className="px-6 py-3 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-all flex items-center space-x-2 mx-auto"
                                >
                                    <span>{showAllStaff ? 'Show Less' : `Show All ${hospitalData.staff.length} Staff Members`}</span>
                                    {showAllStaff ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>
                            </div>
                        )}
                    </GlassCard>

                    {/* Certifications */}
                    <GlassCard className="p-6">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                            <Award className="w-6 h-6 text-yellow-400 mr-2" />
                            Certifications & Accreditations
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {hospitalData.certifications.map((cert, index) => (
                                <div key={index} className="flex items-center space-x-3 p-3 rounded-xl bg-white/5">
                                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                                    <span className="text-white">{cert}</span>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            )}

            {activeTab === 'contact' && (
                <div className="space-y-6">
                    {/* Contact Information */}
                    <GlassCard className="p-6">
                        <h2 className="text-xl font-bold text-white mb-6">Contact Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-white/5">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <MapPin className="w-5 h-5 text-emerald-400" />
                                        <h3 className="font-medium text-white">Address</h3>
                                    </div>
                                    <p className="text-gray-300">{hospitalData.address}</p>
                                    <p className="text-gray-300">{hospitalData.city}, {hospitalData.zipCode}</p>
                                </div>

                                <div className="p-4 rounded-xl bg-white/5">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <Phone className="w-5 h-5 text-blue-400" />
                                        <h3 className="font-medium text-white">Phone Numbers</h3>
                                    </div>
                                    <p className="text-gray-300">Main: {hospitalData.phone}</p>
                                    <p className="text-red-400">Emergency: {hospitalData.emergencyPhone}</p>
                                </div>

                                <div className="p-4 rounded-xl bg-white/5">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <Mail className="w-5 h-5 text-purple-400" />
                                        <h3 className="font-medium text-white">Email</h3>
                                    </div>
                                    <p className="text-gray-300">{hospitalData.email}</p>
                                </div>

                                <div className="p-4 rounded-xl bg-white/5">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <Globe className="w-5 h-5 text-amber-400" />
                                        <h3 className="font-medium text-white">Website</h3>
                                    </div>
                                    <a href={`https://${hospitalData.website}`} className="text-blue-400 hover:text-blue-300 flex items-center space-x-1">
                                        <span>{hospitalData.website}</span>
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {/* Contact Methods */}
                                <h3 className="font-semibold text-white">Contact Methods</h3>

                                <button
                                    onClick={handleCall}
                                    className="w-full p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-left hover:bg-emerald-500/30 transition-all"
                                >
                                    <div className="flex items-center space-x-3">
                                        <Phone className="w-6 h-6 text-emerald-400" />
                                        <div>
                                            <p className="text-white font-medium">Call Directly</p>
                                            <p className="text-emerald-400 text-sm">Tap to call now</p>
                                        </div>
                                    </div>
                                </button>

                                <button className="w-full p-4 rounded-xl bg-blue-500/20 border border-blue-500/30 text-left hover:bg-blue-500/30 transition-all">
                                    <div className="flex items-center space-x-3">
                                        <MessageCircle className="w-6 h-6 text-blue-400" />
                                        <div>
                                            <p className="text-white font-medium">Live Chat</p>
                                            <p className="text-blue-400 text-sm">Chat with our staff</p>
                                        </div>
                                    </div>
                                </button>

                                <button className="w-full p-4 rounded-xl bg-purple-500/20 border border-purple-500/30 text-left hover:bg-purple-500/30 transition-all">
                                    <div className="flex items-center space-x-3">
                                        <Video className="w-6 h-6 text-purple-400" />
                                        <div>
                                            <p className="text-white font-medium">Video Consultation</p>
                                            <p className="text-purple-400 text-sm">Schedule virtual visit</p>
                                        </div>
                                    </div>
                                </button>

                                <button className="w-full p-4 rounded-xl bg-amber-500/20 border border-amber-500/30 text-left hover:bg-amber-500/30 transition-all">
                                    <div className="flex items-center space-x-3">
                                        <Calendar className="w-6 h-6 text-amber-400" />
                                        <div>
                                            <p className="text-white font-medium">Book Appointment</p>
                                            <p className="text-amber-400 text-sm">Schedule in-person visit</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Map Placeholder */}
                    <GlassCard className="p-6">
                        <h2 className="text-xl font-bold text-white mb-4">Location & Directions</h2>
                        <div className="h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-white/10">
                            <div className="text-center">
                                <MapPin className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                                <p className="text-white font-medium">Interactive Map</p>
                                <p className="text-gray-400 text-sm">Click to open in maps app</p>
                            </div>
                        </div>
                        <div className="mt-4 flex space-x-3">
                            <button className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all">
                                Get Directions
                            </button>
                            <button className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all">
                                Share Location
                            </button>
                        </div>
                    </GlassCard>
                </div>
            )}

            {activeTab === 'reviews' && (
                <div className="space-y-6">
                    {/* Reviews Summary */}
                    <GlassCard className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">Patient Reviews</h2>
                            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all">
                                Write Review
                            </button>
                        </div>

                        <div className="flex items-center space-x-8 mb-6">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-white mb-2">{hospitalData.rating}</div>
                                <div className="flex items-center space-x-1 mb-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-5 h-5 ${i < Math.floor(hospitalData.rating) ? 'text-yellow-400' : 'text-gray-400'}`} fill="currentColor" />
                                    ))}
                                </div>
                                <p className="text-gray-400 text-sm">{hospitalData.reviewCount} reviews</p>
                            </div>

                            <div className="flex-1">
                                {[5, 4, 3, 2, 1].map((stars) => (
                                    <div key={stars} className="flex items-center space-x-3 mb-2">
                                        <span className="text-white text-sm w-6">{stars}</span>
                                        <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-yellow-400 h-2 rounded-full"
                                                style={{ width: `${stars === 5 ? 70 : stars === 4 ? 25 : 5}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-gray-400 text-sm w-8">{stars === 5 ? '70%' : stars === 4 ? '25%' : '5%'}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </GlassCard>

                    {/* Individual Reviews */}
                    <div className="space-y-4">
                        {displayedReviews.map((review) => (
                            <GlassCard key={review.id} className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold text-sm">{review.author[0]}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-white">{review.author}</h4>
                                            <p className="text-gray-400 text-sm">{review.date}</p>
                                        </div>
                                        {review.verified && (
                                            <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                                                Verified
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-400'}`} fill="currentColor" />
                                        ))}
                                    </div>
                                </div>

                                <h5 className="font-medium text-white mb-2">{review.title}</h5>
                                <p className="text-gray-300">{review.content}</p>
                            </GlassCard>
                        ))}
                    </div>

                    {hospitalData.reviews.length > 2 && (
                        <div className="text-center">
                            <button
                                onClick={() => setShowAllReviews(!showAllReviews)}
                                className="px-6 py-3 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-all flex items-center space-x-2 mx-auto"
                            >
                                <span>{showAllReviews ? 'Show Less' : `Show All ${hospitalData.reviews.length} Reviews`}</span>
                                {showAllReviews ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default HospitalDetailsPage;