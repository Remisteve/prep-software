'use client'

import React, { useState, useMemo, ReactNode, ElementType } from 'react';
import {
    User, Shield, Heart, AlertTriangle, Users, CheckCircle, Clock,
    Star, MapPin, Calendar, Phone, MessageCircle, Building2, Target,
    Plus, ArrowRight, Activity, BookOpen, Stethoscope, Pill, FileText,
    Award, Gift, TrendingUp, Search, Filter, ChevronDown, X, Bell,
    Globe, Wifi, Car, Coffee, Navigation, Video
} from 'lucide-react';
import GlassCard from '@/components/custom/GlassCard';


interface ProgramDetailModalProps {
    program: {
        icon: ElementType
        category: string
        name: string
        memberCount: string
        duration: string
        description: string
        rating: string
    },
    isOpen: boolean
    onClose: ()=>void
    onEnroll: (program:{name:string})=>void
}

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


// Status Badge Component
function StatusBadge({ status, children }) {
    const style = statusStyles[status] || statusStyles.neutral;
    return (
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${style.bg} ${style.border} ${style.text} border`}>
            {children}
        </span>
    );
}

// Sample Enrollment Programs Data
const enrollmentPrograms = [
    {
        id: 1,
        name: 'PrEP Prevention Program',
        shortName: 'PrEP Program',
        category: 'Prevention',
        icon: Shield,
        description: 'Comprehensive HIV prevention program with daily medication and regular monitoring',
        memberCount: 2847,
        isEnrolled: true,
        enrollmentDate: '2024-01-15',
        status: 'active',
        popularity: 'high',
        rating: 4.9,
        duration: 'Ongoing',
        facilities: [
            { name: 'MedConnect Downtown', distance: '0.5 mi', rating: 4.8 },
            { name: 'MedConnect North', distance: '2.1 mi', rating: 4.6 },
            { name: 'MedConnect Emergency', distance: '1.8 mi', rating: 4.9 }
        ],
        benefits: [
            { title: '99% Effective', description: 'When taken daily, PrEP reduces HIV risk by up to 99%', icon: Shield },
            { title: 'Regular Monitoring', description: 'Quarterly health check-ups and lab work included', icon: Activity },
            { title: 'Expert Support', description: '24/7 access to PrEP specialists and counselors', icon: Users },
            { title: 'Medication Access', description: 'Access to necessary PrEP medications', icon: Pill },
            { title: 'Confidential Care', description: 'Private, judgment-free healthcare environment', icon: Heart },
            { title: 'Education Resources', description: 'Access to comprehensive sexual health education', icon: BookOpen }
        ],
        requirements: [
            'Age 18 or older',
            'At increased risk for HIV',
            'Negative HIV test result',
            'Normal kidney function',
            'Commitment to daily medication'
        ],
        nextSteps: [
            'Complete health assessment',
            'HIV and STI testing',
            'Kidney function test',
            'Consultation with PrEP specialist',
            'Prescription and education'
        ]
    },
    {
        id: 2,
        name: 'Mental Health Support Program',
        shortName: 'Mental Health',
        category: 'Mental Health',
        icon: Heart,
        description: 'Comprehensive mental health services including counseling and support groups',
        memberCount: 1523,
        isEnrolled: false,
        status: 'available',
        popularity: 'medium',
        rating: 4.7,
        duration: 'Flexible',
        facilities: [
            { name: 'MedConnect Downtown', distance: '0.5 mi', rating: 4.8 },
            { name: 'MedConnect Community', distance: '3.2 mi', rating: 4.7 },
            { name: 'MedConnect North', distance: '2.1 mi', rating: 4.6 }
        ],
        benefits: [
            { title: 'Individual Therapy', description: 'One-on-one sessions with licensed therapists', icon: User },
            { title: 'Group Support', description: 'Peer support groups for shared experiences', icon: Users },
            { title: 'Crisis Support', description: '24/7 crisis intervention and emergency support', icon: AlertTriangle },
            { title: 'Telehealth Options', description: 'Virtual sessions available for convenience', icon: Video },
            { title: 'Holistic Approach', description: 'Integration with medical and social services', icon: Heart },
            { title: 'Accessible Care', description: 'Multiple support options available', icon: CheckCircle }
        ],
        requirements: [
            'Age 16 or older (with guardian consent if under 18)',
            'Mental health assessment',
            'Commitment to treatment plan'
        ],
        nextSteps: [
            'Initial mental health screening',
            'Therapist matching process',
            'First appointment scheduling',
            'Treatment plan development'
        ]
    },
    {
        id: 3,
        name: 'Emergency PEP Program',
        shortName: 'PEP Emergency',
        category: 'Emergency',
        icon: AlertTriangle,
        description: 'Post-exposure prophylaxis for emergency HIV prevention within 72 hours',
        memberCount: 456,
        isEnrolled: false,
        status: 'available',
        popularity: 'critical',
        rating: 4.9,
        duration: '28 days',
        facilities: [
            { name: 'MedConnect Emergency', distance: '1.8 mi', rating: 4.9 },
            { name: 'MedConnect Downtown', distance: '0.5 mi', rating: 4.8 }
        ],
        benefits: [
            { title: 'Rapid Access', description: 'Available 24/7 for emergency situations', icon: Clock },
            { title: 'Time-Critical Care', description: 'Most effective when started within 2 hours', icon: AlertTriangle },
            { title: 'Complete Treatment', description: '28-day medication regimen with monitoring', icon: Pill },
            { title: 'Follow-up Care', description: 'Comprehensive testing and health monitoring', icon: Activity },
            { title: 'Counseling Support', description: 'Emotional and educational support throughout', icon: Heart },
            { title: 'Emergency Access', description: 'Immediate care when you need it most', icon: CheckCircle }
        ],
        requirements: [
            'Potential HIV exposure within 72 hours',
            'Negative baseline HIV test',
            'Emergency consultation required',
            'Commitment to 28-day treatment'
        ],
        nextSteps: [
            'Immediate emergency consultation',
            'Risk assessment and testing',
            'Begin medication within 72 hours',
            'Follow-up appointments scheduled',
            'Completion of 28-day regimen'
        ]
    },
    {
        id: 4,
        name: 'Community Health Education',
        shortName: 'Health Education',
        category: 'Education',
        icon: BookOpen,
        description: 'Educational programs and resources for community health awareness',
        memberCount: 3421,
        isEnrolled: true,
        enrollmentDate: '2024-03-01',
        status: 'active',
        popularity: 'high',
        rating: 4.6,
        duration: 'Ongoing',
        facilities: [
            { name: 'MedConnect Community', distance: '3.2 mi', rating: 4.7 },
            { name: 'MedConnect Downtown', distance: '0.5 mi', rating: 4.8 },
            { name: 'MedConnect North', distance: '2.1 mi', rating: 4.6 }
        ],
        benefits: [
            { title: 'Free Programs', description: 'All educational sessions and materials at no cost', icon: Gift },
            { title: 'Expert Educators', description: 'Learn from certified health educators and peers', icon: Award },
            { title: 'Flexible Schedule', description: 'Evening and weekend sessions available', icon: Calendar },
            { title: 'Certificate Programs', description: 'Earn certificates for completed courses', icon: Award },
            { title: 'Community Network', description: 'Connect with others in your health journey', icon: Users },
            { title: 'Resource Library', description: 'Access to books, videos, and online materials', icon: BookOpen }
        ],
        requirements: [
            'Age 16 or older',
            'Interest in health education',
            'Attendance commitment',
            'Community participation'
        ],
        nextSteps: [
            'Review available programs',
            'Register for sessions',
            'Attend orientation',
            'Begin educational courses',
            'Track progress and certificates'
        ]
    }
];

interface CurrentEnrollmentsProps{
        id: string
        shortName: string
        icon: ElementType
        enrollmentDate: string
}

// Current Enrollments Component
function CurrentEnrollments({ enrollments }:{enrollments: CurrentEnrollmentsProps[]}) {
    return (
        <GlassCard variant="success" className="p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 text-emerald-400 mr-3" />
                Your Active Enrollments
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {enrollments.map((program) => (
                    <div key={program.id} className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                        <div className="flex items-center space-x-3 mb-2">
                            <program.icon className="w-5 h-5 text-emerald-400" />
                            <h3 className="font-medium text-white">{program.shortName}</h3>
                            <StatusBadge status="success">Active</StatusBadge>
                        </div>
                        <p className="text-sm text-gray-300 mb-2">
                            Enrolled: {new Date(program.enrollmentDate).toLocaleDateString()}
                        </p>
                        <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-lg text-sm hover:bg-emerald-500/30 transition-all">
                                View Details
                            </button>
                            <button className="px-3 py-1 bg-white/10 border border-white/20 text-gray-300 rounded-lg text-sm hover:bg-white/20 transition-all">
                                Manage
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </GlassCard>
    );
}



// Program Detail Modal Component
function ProgramDetailModal({ program, isOpen, onClose, onEnroll }: ProgramDetailModalProps) {
    const [activeTab, setActiveTab] = useState('overview');

    if (!isOpen || !program) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <GlassCard className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                                <program.icon className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">{program.name}</h2>
                                <p className="text-blue-400">{program.category} Program</p>
                                <div className="flex items-center space-x-4 mt-2">
                                    <div className="flex items-center space-x-1">
                                        <Users className="w-4 h-4 text-emerald-400" />
                                        <span className="text-emerald-400 text-sm font-medium">{program.memberCount.toLocaleString()} members</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                                        <span className="text-white text-sm font-medium">{program.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-xl bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20 transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex space-x-1 mb-6 bg-white/5 rounded-xl p-1">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`flex-1 px-4 py-2 rounded-lg transition-all text-sm ${activeTab === 'overview'
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-300 hover:bg-white/10'
                                }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('benefits')}
                            className={`flex-1 px-4 py-2 rounded-lg transition-all text-sm ${activeTab === 'benefits'
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-300 hover:bg-white/10'
                                }`}
                        >
                            Benefits
                        </button>
                        <button
                            onClick={() => setActiveTab('facilities')}
                            className={`flex-1 px-4 py-2 rounded-lg transition-all text-sm ${activeTab === 'facilities'
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-300 hover:bg-white/10'
                                }`}
                        >
                            Facilities
                        </button>
                        <button
                            onClick={() => setActiveTab('enrollment')}
                            className={`flex-1 px-4 py-2 rounded-lg transition-all text-sm ${activeTab === 'enrollment'
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-300 hover:bg-white/10'
                                }`}
                        >
                            Enrollment
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="space-y-6">
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                {/* Program Stats */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="text-center p-4 rounded-xl bg-white/5">
                                        <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                                        <p className="text-white font-bold text-lg">{program.memberCount.toLocaleString()}</p>
                                        <p className="text-gray-400 text-sm">Active Members</p>
                                    </div>
                                    <div className="text-center p-4 rounded-xl bg-white/5">
                                        <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                                        <p className="text-white font-bold text-lg">{program.rating}</p>
                                        <p className="text-gray-400 text-sm">Member Rating</p>
                                    </div>
                                    <div className="text-center p-4 rounded-xl bg-white/5">
                                        <Clock className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                                        <p className="text-white font-bold text-lg">{program.duration}</p>
                                        <p className="text-gray-400 text-sm">Duration</p>
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-3">About This Program</h3>
                                    <p className="text-gray-300 leading-relaxed">{program.description}</p>
                                </div>

                                {/* Requirements */}
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-3">Requirements</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {program.requirements.map((requirement, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                                <span className="text-gray-300 text-sm">{requirement}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'benefits' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {program.benefits.map((benefit, index) => (
                                    <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <div className="flex items-start space-x-3">
                                            <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30">
                                                <benefit.icon className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-white mb-2">{benefit.title}</h4>
                                                <p className="text-gray-300 text-sm">{benefit.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'facilities' && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-white">Available at {program.facilities.length} Facilities</h3>
                                {program.facilities.map((facility, index) => (
                                    <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <Building2 className="w-6 h-6 text-blue-400" />
                                                <div>
                                                    <h4 className="font-medium text-white">{facility.name}</h4>
                                                    <div className="flex items-center space-x-4 mt-1">
                                                        <div className="flex items-center space-x-1">
                                                            <Navigation className="w-4 h-4 text-emerald-400" />
                                                            <span className="text-emerald-400 text-sm">{facility.distance}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                                                            <span className="text-white text-sm">{facility.rating}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-all">
                                                    Contact
                                                </button>
                                                <button className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-lg text-sm hover:bg-emerald-500/30 transition-all">
                                                    Directions
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'enrollment' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-3">Enrollment Process</h3>
                                    <div className="space-y-3">
                                        {program.nextSteps.map((step, index) => (
                                            <div key={index} className="flex items-center space-x-3">
                                                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                    {index + 1}
                                                </div>
                                                <span className="text-gray-300">{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                                    <h4 className="text-white font-medium mb-3">Ready to Enroll?</h4>
                                    <p className="text-gray-300 text-sm mb-4">
                                        Start your enrollment process today. Our team will guide you through each step.
                                    </p>
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => onEnroll(program)}
                                            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all flex items-center space-x-2"
                                        >
                                            <Plus className="w-4 h-4" />
                                            <span>Start Enrollment</span>
                                        </button>
                                        <button className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all">
                                            Schedule Consultation
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}

// Program Card Component
function ProgramCard({ program, onClick }) {
    const getPopularityInfo = (popularity) => {
        switch (popularity) {
            case 'high':
                return { text: 'Popular', status: 'success' };
            case 'critical':
                return { text: 'Emergency', status: 'error' };
            case 'medium':
                return { text: 'Available', status: 'info' };
            default:
                return { text: 'Available', status: 'neutral' };
        }
    };

    const popularityInfo = getPopularityInfo(program.popularity);

    return (
        <GlassCard className="p-6 cursor-pointer" hover onClick={() => onClick(program)}>
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <program.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">{program.name}</h3>
                        <p className="text-blue-400 text-sm">{program.category}</p>
                    </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                    {program.isEnrolled ? (
                        <StatusBadge status="success">Enrolled</StatusBadge>
                    ) : (
                        <StatusBadge status={popularityInfo.status}>{popularityInfo.text}</StatusBadge>
                    )}
                </div>
            </div>

            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{program.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 text-sm font-medium">{program.memberCount.toLocaleString()}</span>
                    <span className="text-gray-400 text-sm">members</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                    <span className="text-white text-sm font-medium">{program.rating}</span>
                    <span className="text-gray-400 text-sm">rating</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 text-sm font-medium">{program.facilities.length}</span>
                    <span className="text-gray-400 text-sm">facilities</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-400 text-sm font-medium">{program.duration}</span>
                </div>
            </div>
        </GlassCard>
    );
}

// Main Enrollments Component
function EnrollmentsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedProgram, setSelectedProgram] = useState<ProgramDetailModalProps | null>(null);
    const [showModal, setShowModal] = useState(false);

    const currentEnrollments = enrollmentPrograms.filter(p => p.isEnrolled);
    const availablePrograms = enrollmentPrograms.filter(p => !p.isEnrolled);

    const categories = ['all', 'Prevention', 'Mental Health', 'Emergency', 'Education'];

    const filteredPrograms = useMemo(() => {
        return enrollmentPrograms.filter(program => {
            const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                program.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || program.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    const handleProgramClick = (program: string) => {
        setSelectedProgram(program);
        setShowModal(true);
    };

    const handleEnroll = (program: { name: string }) => {
        console.log('Enrolling in:', program.name);
        setShowModal(false);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <GlassCard variant="primary" className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2 flex items-center">
                            <User className="w-7 h-7 text-white mr-3" />
                            Program Enrollments
                        </h1>
                        <p className="text-gray-300">Discover and enroll in healthcare programs tailored to your needs</p>
                    </div>
                    <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all flex items-center space-x-2 hover:scale-105">
                        <Plus className="w-5 h-5" />
                        <span>Browse Programs</span>
                    </button>
                </div>
            </GlassCard>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <GlassCard className="p-4" hover>
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white">{currentEnrollments.length}</p>
                            <p className="text-sm text-gray-300">Active Enrollments</p>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-4" hover>
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30">
                            <Target className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white">{availablePrograms.length}</p>
                            <p className="text-sm text-gray-300">Available Programs</p>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-4" hover>
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/30">
                            <Users className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white">{enrollmentPrograms.reduce((sum, p) => sum + p.memberCount, 0).toLocaleString()}</p>
                            <p className="text-sm text-gray-300">Total Members</p>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-4" hover>
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/30">
                            <TrendingUp className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white">98%</p>
                            <p className="text-sm text-gray-300">Satisfaction Rate</p>
                        </div>
                    </div>
                </GlassCard>
            </div>

            {/* Current Enrollments */}
            {currentEnrollments.length > 0 && (
                <CurrentEnrollments enrollments={currentEnrollments} />
            )}

            {/* Search and Filters */}
            <GlassCard className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search programs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                        />
                    </div>

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500/50"
                    >
                        {categories.map(category => (
                            <option key={category} value={category} className="bg-gray-900">
                                {category === 'all' ? 'All Categories' : category}
                            </option>
                        ))}
                    </select>
                </div>
            </GlassCard>

            {/* Results Summary */}
            <div className="flex items-center justify-between text-gray-300">
                <p>
                    Showing {filteredPrograms.length} programs
                    {searchTerm && ` for "${searchTerm}"`}
                </p>
            </div>

            {/* Programs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredPrograms.map((program) => (
                    <ProgramCard
                        key={program.id}
                        program={program}
                        onClick={handleProgramClick}
                    />
                ))}
            </div>

            {/* Empty State */}
            {filteredPrograms.length === 0 && (
                <GlassCard className="p-8 text-center">
                    <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">No programs found</h3>
                    <p className="text-gray-400 mb-4">
                        Try adjusting your search terms or category filters.
                    </p>
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setSelectedCategory('all');
                        }}
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all"
                    >
                        Clear Filters
                    </button>
                </GlassCard>
            )}

            {/* Program Detail Modal */}
            <ProgramDetailModal
                program={selectedProgram}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onEnroll={handleEnroll}
            />
        </div>
    );
}

export default EnrollmentsPage;