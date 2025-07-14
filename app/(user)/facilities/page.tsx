'use client'

import React, { useState, useMemo, useEffect, ReactNode } from 'react';
import {
    MapPin, Phone, Star, Navigation, Building2, Shield, Activity,
    Stethoscope, Heart, AlertTriangle, MessageCircle, Video,
    Search, Filter, ChevronDown, Plus, CheckCircle, Target,
    Clock, Users, Calendar, ArrowRight, Sparkles, Eye
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/custom/GlassCard';
import { StatusInterface } from '@/components/custom/StatusBadge';

// Facility Interface
interface FacilityInterface {
    id: number;
    name: string;
    type: string;
    address: string;
    phone: string;
    rating: number;
    reviewCount: number;
    distance: number;
    status: 'open' | 'closed';
    isClosest: boolean;
    services: string[];
    hours: string;
    nextAvailable: string;
}



// Status Color System (matching your theme)
const statusStyles: {
    [key: string]: StatusInterface
    open: StatusInterface
    closed: StatusInterface

} = {
    open: {
        bg: 'bg-emerald-500/20',
        border: 'border-emerald-400/30',
        text: 'text-emerald-400',
        icon: 'text-emerald-400'
    },
    closed: {
        bg: 'bg-red-500/20',
        border: 'border-red-400/30',
        text: 'text-red-400',
        icon: 'text-red-400'
    }
};



// Enhanced Status Badge Component
function StatusBadge({ status, children }:
    {
        status: string
        children: ReactNode
    }
) {
    const style = statusStyles[status] || statusStyles.closed;
    return (
        <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full 
            ${style.bg} ${style.border} ${style.text} border backdrop-blur-sm
            transition-all duration-300 shadow-lg`}>
            {children}
        </span>
    );
}

// Closest Facility Suggestion Component
function ClosestFacilitySuggestion({ facility }:
    { facility: FacilityInterface, onClick: (facility: string) => void }
) {
    return (
        <GlassCard variant="primary" className="p-6 mb-6 cursor-pointer relative overflow-hidden group" hover>
            {/* Background decorations */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-blue-500/10 to-cyan-500/5" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

            {/* Sparkles */}
            <Sparkles className="absolute top-4 right-6 w-3 h-3 text-emerald-400 opacity-30 animate-pulse" />

            <div className="relative z-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl 
                            flex items-center justify-center shadow-2xl shadow-emerald-500/30 border border-emerald-400/30">
                            <Navigation className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1 flex items-center space-x-2">
                                <span>Closest Facility</span>
                                <Target className="w-4 h-4 text-emerald-400" />
                            </h3>
                            <p className="text-emerald-400 font-semibold text-lg">{facility.name}</p>
                            <div className="flex items-center space-x-3 mt-1">
                                <p className="text-gray-300 text-sm">{facility.address}</p>
                                <span className="text-emerald-400 text-sm font-medium">• {facility.distance} miles</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-3" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(`tel:${facility.phone}`, '_self');
                            }}
                            className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-green-500 
                                hover:from-emerald-600 hover:to-green-600 text-white rounded-xl 
                                transition-all flex items-center space-x-2 shadow-lg shadow-emerald-500/25
                                hover:scale-105 backdrop-blur-md border border-emerald-400/30"
                        >
                            <Phone className="w-4 h-4" />
                            <span>Call Now</span>
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                // Could integrate with maps app
                            }}
                            className="px-5 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 
                                hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl 
                                transition-all flex items-center space-x-2 shadow-lg shadow-blue-500/25
                                hover:scale-105 backdrop-blur-md border border-blue-400/30"
                        >
                            <Navigation className="w-4 h-4" />
                            <span>Directions</span>
                        </button>
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}

// Enhanced Facility Card Component
function EnhancedFacilityCard({ facility, onContact, onClick }:
    { facility: FacilityInterface, onContact: () => void, onClick: (facility: FacilityInterface) => void }
) {
    const getStatusInfo = (status: string) => {
        switch (status) {
            case 'open':
                return { status: 'open', text: 'Open', dot: 'bg-emerald-400' };
            case 'closed':
                return { status: 'closed', text: 'Closed', dot: 'bg-red-400' };
            default:
                return { status: 'closed', text: 'Unknown', dot: 'bg-gray-400' };
        }
    };

    const statusInfo = getStatusInfo(facility.status);

    const getFacilityTypeColor = (type: string) => {
        switch (type.toLowerCase()) {
            case 'primary care': return 'from-blue-500 to-cyan-500';
            case 'emergency care': return 'from-red-500 to-orange-500';
            case 'specialized care': return 'from-purple-500 to-indigo-500';
            case 'community health': return 'from-green-500 to-emerald-500';
            default: return 'from-gray-500 to-gray-600';
        }
    };

    return (
        <GlassCard className="p-6 cursor-pointer relative overflow-hidden group" hover>
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${getFacilityTypeColor(facility.type)} 
                            rounded-xl flex items-center justify-center shadow-lg border border-white/20 backdrop-blur-sm`}>
                            <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">{facility.name}</h3>
                            <p className="text-blue-400 text-sm">{facility.type}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 ${statusInfo.dot} rounded-full`}></div>
                        <StatusBadge status={statusInfo.status}>{statusInfo.text}</StatusBadge>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-gray-300">
                            <MapPin className="w-4 h-4 text-emerald-400" />
                            <span className="text-sm">{facility.address}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-300">
                            <Clock className="w-4 h-4 text-blue-400" />
                            <span className="text-sm">{facility.hours}</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                            <span className="text-white text-sm font-medium">{facility.rating}</span>
                            <span className="text-gray-400 text-sm">({facility.reviewCount})</span>
                            <span className="text-emerald-400 text-sm">• {facility.distance} mi</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-300">
                            <Calendar className="w-4 h-4 text-purple-400" />
                            <span className="text-sm">{facility.nextAvailable}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {facility.services.map((service, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 
                            text-xs text-blue-400 rounded-full backdrop-blur-sm">
                            {service}
                        </span>
                    ))}
                </div>


            </div>
        </GlassCard>
    );
}

// Sample Facilities Data
const facilities: FacilityInterface[] = [
    {
        id: 1,
        name: 'MedConnect Downtown',
        type: 'Primary Care',
        address: '123 Health St, Downtown',
        phone: '+1 (555) 123-4567',
        rating: 4.8,
        reviewCount: 342,
        distance: 0.5,
        status: 'open',
        isClosest: true,
        services: ['PrEP', 'Testing', 'General Care'],
        hours: '8:00 AM - 8:00 PM',
        nextAvailable: 'Today 2:30 PM'
    },
    {
        id: 2,
        name: 'MedConnect Emergency',
        type: 'Emergency Care',
        address: '789 Urgent Rd, Medical District',
        phone: '+1 (555) 345-6789',
        rating: 4.9,
        reviewCount: 567,
        distance: 1.8,
        status: 'open',
        isClosest: false,
        services: ['Emergency PEP', 'Urgent Care', '24/7'],
        hours: '24/7',
        nextAvailable: 'Available now'
    },
    {
        id: 3,
        name: 'MedConnect North',
        type: 'Specialized Care',
        address: '456 Care Ave, North District',
        phone: '+1 (555) 234-5678',
        rating: 4.6,
        reviewCount: 189,
        distance: 2.1,
        status: 'open',
        isClosest: false,
        services: ['PrEP Program', 'PEP', 'Research'],
        hours: '7:00 AM - 9:00 PM',
        nextAvailable: 'Today 4:00 PM'
    },
    {
        id: 4,
        name: 'MedConnect Community',
        type: 'Community Health',
        address: '321 Community Dr, East Side',
        phone: '+1 (555) 456-7890',
        rating: 4.7,
        reviewCount: 234,
        distance: 3.2,
        status: 'open',
        isClosest: false,
        services: ['Education', 'Support Groups', 'Outreach'],
        hours: '9:00 AM - 6:00 PM',
        nextAvailable: 'Tomorrow 10:00 AM'
    }
];

function FacilitiesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState('rating');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [closestFacility, setClosestFacility] = useState<FacilityInterface | null>(null);

    const router = useRouter();

    // Set closest facility on load
    useEffect(() => {
        const closest = facilities.reduce((prev, current) =>
            prev.distance < current.distance ? prev : current
        );
        setClosestFacility(closest);
    }, []);

    const filteredAndSortedFacilities = useMemo(() => {
        let filtered = facilities.filter(facility => {
            const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                facility.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                facility.services.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesStatus = statusFilter === 'all' || facility.status === statusFilter;
            const matchesType = typeFilter === 'all' || facility.type === typeFilter;

            return matchesSearch && matchesStatus && matchesType;
        });

        // Sort facilities
        return filtered.sort((a, b) => {
            switch (sortBy) {
                case 'rating':
                    if (b.rating === a.rating) {
                        return b.reviewCount - a.reviewCount;
                    }
                    return b.rating - a.rating;
                case 'distance':
                    return a.distance - b.distance;
                case 'name':
                    return a.name.localeCompare(b.name);
                default:
                    return 0;
            }
        });
    }, [searchTerm, sortBy, statusFilter, typeFilter]);

    const handleContact = (facility: FacilityInterface) => {
        window.open(`tel:${facility.phone}`, '_self');
    };

    const handleCardClick = (facility: FacilityInterface) => {
        router.push(`/facilities/${facility.id}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <GlassCard variant="primary" className="p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/10 to-purple-600/5" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

                    <Sparkles className="absolute top-4 right-6 w-4 h-4 text-blue-400 opacity-30 animate-pulse" />

                    <div className="relative z-10">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2 flex items-center">
                                    <Building2 className="w-7 h-7 text-white mr-3" />
                                    Healthcare Facilities
                                </h1>
                                <p className="text-gray-300">Find nearby MedConnect facilities</p>
                            </div>
                            <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 
                                hover:from-emerald-600 hover:to-green-600 text-white rounded-xl 
                                transition-all flex items-center space-x-2 shadow-lg shadow-emerald-500/25
                                hover:scale-105 backdrop-blur-md border border-emerald-400/30">
                                <Target className="w-5 h-5" />
                                <span>Find Nearest</span>
                            </button>
                        </div>
                    </div>
                </GlassCard>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <GlassCard className="p-4 relative overflow-hidden group" hover>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="flex items-center space-x-3 relative z-10">
                            <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30">
                                <Building2 className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-white">{facilities.length}</p>
                                <p className="text-sm text-gray-300">Facilities</p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="p-4 relative overflow-hidden group" hover>
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="flex items-center space-x-3 relative z-10">
                            <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                                <CheckCircle className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-white">{facilities.filter(f => f.status === 'open').length}</p>
                                <p className="text-sm text-gray-300">Open Now</p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="p-4 relative overflow-hidden group" hover>
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="flex items-center space-x-3 relative z-10">
                            <div className="p-2 rounded-lg bg-yellow-500/20 border border-yellow-500/30">
                                <Star className="w-5 h-5 text-yellow-400" />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-white">4.8</p>
                                <p className="text-sm text-gray-300">Avg Rating</p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="p-4 relative overflow-hidden group" hover>
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="flex items-center space-x-3 relative z-10">
                            <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                                <Navigation className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-white">{closestFacility?.distance}</p>
                                <p className="text-sm text-gray-300">Miles Away</p>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* Closest Facility Suggestion */}
                {closestFacility && <ClosestFacilitySuggestion facility={closestFacility} onClick={() => handleCardClick(closestFacility)} />}

                {/* Search and Filters */}
                <GlassCard className="p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-black/30" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />

                    <div className="relative z-10">
                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search facilities or services..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/40 border border-white/20 
                                        text-white placeholder-gray-400 focus:outline-none focus:border-blue-400/60 
                                        focus:ring-2 focus:ring-blue-400/20 hover:bg-black/50 hover:border-white/30
                                        transition-all backdrop-blur-md"
                                />
                            </div>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white 
                                    focus:outline-none focus:border-blue-400/60 backdrop-blur-md"
                            >
                                <option value="rating" className="bg-gray-900">Best Rated</option>
                                <option value="distance" className="bg-gray-900">Closest</option>
                                <option value="name" className="bg-gray-900">Name</option>
                            </select>

                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`px-4 py-3 rounded-xl transition-all flex items-center space-x-2 backdrop-blur-md ${showFilters
                                    ? 'bg-blue-500/20 border border-blue-500/30 text-blue-400'
                                    : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                                    }`}
                            >
                                <Filter className="w-5 h-5" />
                                <span>Filter</span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                            </button>
                        </div>

                        {showFilters && (
                            <div className="pt-4 border-t border-white/10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-300 text-sm font-medium mb-2">Status</label>
                                        <select
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                            className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white 
                                                focus:outline-none focus:border-blue-400 transition-all backdrop-blur-md"
                                        >
                                            <option value="all">All Status</option>
                                            <option value="open">Open</option>
                                            <option value="closed">Closed</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-gray-300 text-sm font-medium mb-2">Facility Type</label>
                                        <select
                                            value={typeFilter}
                                            onChange={(e) => setTypeFilter(e.target.value)}
                                            className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white 
                                                focus:outline-none focus:border-blue-400 transition-all backdrop-blur-md"
                                        >
                                            <option value="all">All Types</option>
                                            <option value="Primary Care">Primary Care</option>
                                            <option value="Emergency Care">Emergency Care</option>
                                            <option value="Specialized Care">Specialized Care</option>
                                            <option value="Community Health">Community Health</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </GlassCard>

                {/* Results Summary */}
                <div className="flex items-center justify-between text-gray-300">
                    <p>
                        Showing {filteredAndSortedFacilities.length} facilities
                        {searchTerm && ` for "${searchTerm}"`}
                    </p>
                    <p className="text-sm">
                        Sorted by {sortBy === 'rating' ? 'rating & reviews' : sortBy}
                    </p>
                </div>

                {/* Facilities Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredAndSortedFacilities.length > 0 ? (
                        filteredAndSortedFacilities.map((facility) => (
                            <EnhancedFacilityCard
                                key={facility.id}
                                facility={facility}
                                onContact={() => handleContact(facility)}
                                onClick={handleCardClick}
                            />
                        ))
                    ) : (
                        <div className="col-span-full">
                            <GlassCard className="p-12 text-center">
                                <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">No facilities found</h3>
                                <p className="text-gray-400 mb-6">
                                    Try adjusting your search terms or filters.
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setStatusFilter('all');
                                        setTypeFilter('all');
                                    }}
                                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl 
                                        hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/25"
                                >
                                    Clear Filters
                                </button>
                            </GlassCard>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FacilitiesPage;