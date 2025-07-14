'use client'

import React, { useState, useRef } from 'react';
import {
    User, Mail, Phone, MapPin, Calendar, Shield, Activity, Settings,
    Edit3, Save, X, Upload, Camera, Bell, Lock, Eye, EyeOff,
    Stethoscope, Heart, AlertTriangle, CheckCircle, Clock, Award,
    FileText, Download, Trash2, Plus, Share2, Key, Smartphone,
    Globe, Languages, Palette, Moon, Sun, Volume2, VolumeX,
    CreditCard, History, UserCheck, Star, Target, Zap, ArrowLeft,
    Video, Users, Pill, Thermometer, Weight, Ruler, Building2,
    TrendingUp, BarChart3, Percent,
    Send,
    ChevronDown
} from 'lucide-react';
import { signOut } from 'next-auth/react';

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
        success: "backdrop-blur-lg bg-black/50 border-emerald-500/30",
        danger: "backdrop-blur-lg bg-black/50 border-red-500/30"
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
function StatusBadge({ status, children, pulse = false }) {
    const style = statusStyles[status] || statusStyles.neutral;
    return (
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${style.bg} ${style.border} ${style.text} border ${pulse ? 'animate-pulse' : ''}`}>
            {children}
        </span>
    );
}

// Role Change Request Modal
function RoleChangeRequestModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        currentRole: 'Patient',
        requestedRole: '',
        department: '',
        hospitalId: '',
        justification: '',
        priority: 'medium'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const roles = [
        { value: 'patient', label: 'Patient' },
        { value: 'nurse', label: 'Nurse' },
        { value: 'senior_nurse', label: 'Senior Nurse' },
        { value: 'nurse_manager', label: 'Nurse Manager' },
        { value: 'physician', label: 'Physician' },
        { value: 'senior_physician', label: 'Senior Physician' },
        { value: 'department_head', label: 'Department Head' },
        { value: 'administrator', label: 'Administrator' },
        { value: 'lab_technician', label: 'Lab Technician' },
        { value: 'pharmacist', label: 'Pharmacist' },
        { value: 'therapist', label: 'Therapist' }
    ];

    const priorities = [
        { value: 'low', label: 'Low Priority' },
        { value: 'medium', label: 'Medium Priority' },
        { value: 'high', label: 'High Priority' }
    ];

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            const requestData = {
                id: `REQ-${Date.now()}`,
                user: {
                    name: 'Sarah Chen',
                    email: 'sarah.chen@email.com',
                    employeeId: 'USR-2024-001',
                    department: formData.department
                },
                hospitalId: formData.hospitalId,
                dateRequested: new Date().toISOString().split('T')[0],
                dateApproved: null,
                status: 'pending',
                description: `Role change request from ${formData.currentRole} to ${formData.requestedRole}. ${formData.justification}`,
                priority: formData.priority
            };

            console.log('Submitted role change request:', requestData);
            setSubmitStatus('success');

            // Reset form and close modal after success
            setTimeout(() => {
                setFormData({
                    currentRole: 'Patient',
                    requestedRole: '',
                    department: '',
                    hospitalId: '',
                    justification: '',
                    priority: 'medium'
                });
                setSubmitStatus(null);
                onClose();
            }, 2000);

        } catch (error) {
            console.error('Submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <GlassCard variant="primary" className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                                <UserCheck className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">Role Change Request</h2>
                                <p className="text-blue-400">Submit a request for role change or promotion</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Success/Error Messages */}
                    {submitStatus === 'success' && (
                        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                            <div className="flex items-center space-x-3 text-emerald-400">
                                <CheckCircle className="w-6 h-6" />
                                <span className="font-medium">Request submitted successfully! You will receive updates via email.</span>
                            </div>
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                            <div className="flex items-center space-x-3 text-red-400">
                                <AlertTriangle className="w-6 h-6" />
                                <span className="font-medium">Failed to submit request. Please try again.</span>
                            </div>
                        </div>
                    )}

                    <div className="space-y-6">
                        {/* Current Role Info */}
                        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                            <h3 className="text-white font-medium mb-2">Current Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-400 text-xs mb-1">Current Role</p>
                                    <p className="text-blue-400 font-medium">{formData.currentRole}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs mb-1">Hospital</p>
                                    <p className="text-white">MedConnect Downtown Medical Center</p>
                                </div>
                            </div>
                        </div>

                        {/* Request Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Requested Role <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.requestedRole}
                                        onChange={(e) => handleChange('requestedRole', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-all appearance-none"
                                    >
                                        <option value="" className="bg-gray-800">Select requested role</option>
                                        {roles.map((role) => (
                                            <option key={role.value} value={role.label} className="bg-gray-800">
                                                {role.label}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Priority Level
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.priority}
                                        onChange={(e) => handleChange('priority', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-all appearance-none"
                                    >
                                        {priorities.map((priority) => (
                                            <option key={priority.value} value={priority.value} className="bg-gray-800">
                                                {priority.label}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Department
                                </label>
                                <input
                                    type="text"
                                    value={formData.department}
                                    onChange={(e) => handleChange('department', e.target.value)}
                                    placeholder="e.g., Emergency Medicine, ICU, Cardiology"
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Hospital ID
                                </label>
                                <input
                                    type="text"
                                    value={formData.hospitalId}
                                    onChange={(e) => handleChange('hospitalId', e.target.value)}
                                    placeholder="e.g., HOSP-SF-001"
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
                                />
                            </div>
                        </div>

                        {/* Justification */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                Justification <span className="text-red-400">*</span>
                            </label>
                            <textarea
                                value={formData.justification}
                                onChange={(e) => handleChange('justification', e.target.value)}
                                placeholder="Please explain why you are requesting this role change. Include any relevant experience, achievements, or circumstances that support your request."
                                rows={4}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all resize-vertical"
                            />
                        </div>

                        {/* Priority Badge Preview */}
                        {formData.priority && (
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-300 text-sm">Request Priority:</span>
                                <StatusBadge status={formData.priority === 'high' ? 'error' : formData.priority === 'medium' ? 'warning' : 'info'}>
                                    {formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1)} Priority
                                </StatusBadge>
                            </div>
                        )}

                        {/* Form Actions */}
                        <div className="flex space-x-4 pt-4 border-t border-white/10">
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting || !formData.requestedRole || !formData.justification}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Submitting...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        <span>Submit Request</span>
                                    </>
                                )}
                            </button>
                            <button
                                onClick={onClose}
                                className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all flex items-center justify-center space-x-2"
                            >
                                <X className="w-5 h-5" />
                                <span>Cancel</span>
                            </button>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}

// Mock User Data - Relevant for Medical App Users
const userData = {
    id: 'USR-2024-001',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    phone: '+1 (555) 123-4567',
    avatar: 'SC',
    userType: 'Patient', // Patient, Healthcare Provider, Admin
    memberSince: '2023-01-15',
    dateOfBirth: '1992-03-15',

    // Current Hospital & Enrollment
    currentHospital: {
        name: 'MedConnect Downtown Medical Center',
        id: 'HOSP-001',
        address: '123 Health Street, Downtown District',
        phone: '+1 (555) 123-4567',
        enrollmentDate: '2023-01-15',
        primaryPhysician: 'Dr. Emily Williams',
        status: 'Active'
    },

    // Drug Delivery & Pickup
    drugDelivery: {
        preferredPickupPoint: 'Main Pharmacy - Downtown',
        pickupPointId: 'PICKUP-001',
        availablePickupPoints: [
            { id: 'PICKUP-001', name: 'Main Pharmacy - Downtown', address: '123 Health Street', hours: '9AM-7PM' },
            { id: 'PICKUP-002', name: 'North Branch Pharmacy', address: '456 North Ave', hours: '8AM-6PM' },
            { id: 'PICKUP-003', name: 'South Medical Plaza', address: '789 South Blvd', hours: '10AM-8PM' },
            { id: 'PICKUP-004', name: 'Home Delivery Service', address: 'Delivered to your address', hours: '24/7' }
        ],
        deliveryPreference: 'pickup', // pickup, delivery
        deliveryInstructions: 'Call 30 minutes before pickup'
    },

    // Personal Information
    personal: {
        gender: 'Female',
        height: '5\'6"',
        weight: '135 lbs',
        bloodType: 'A+',
        address: {
            street: '456 Wellness Ave',
            city: 'San Francisco',
            state: 'CA',
            zipCode: '94102',
            country: 'United States'
        },
        emergencyContact: {
            name: 'David Chen',
            relationship: 'Spouse',
            phone: '+1 (555) 987-6543',
            email: 'david.chen@email.com'
        }
    },

    // Medical Information (crucial for healthcare providers)
    medical: {
        allergies: [
            { name: 'Penicillin', severity: 'Severe', reaction: 'Anaphylaxis' },
            { name: 'Latex', severity: 'Moderate', reaction: 'Skin rash' },
            { name: 'Shellfish', severity: 'Mild', reaction: 'Digestive upset' }
        ],

        // Active Drug Treatment
        activeDrugTreatment: {
            drugName: 'Truvada (PrEP)',
            activeIngredient: 'Emtricitabine/Tenofovir',
            dosage: 'One tablet daily',
            treatmentCycle: '3-month', // 3-month or 6-month
            startDate: '2024-04-15',
            nextRefillDate: '2024-07-15',
            prescribedBy: 'Dr. Emily Williams',
            purpose: 'HIV Prevention (Pre-Exposure Prophylaxis)',
            adherenceTarget: 95, // percentage
            currentAdherence: 92, // percentage
            pillsRemaining: 18,
            totalPills: 90, // for 3-month supply
            sideEffects: ['Mild nausea (first week)', 'None currently'],
            labTestsDue: '2024-07-10',

            // Progress tracking
            progress: {
                monthsCompleted: 3,
                totalMonths: 12, // 1 year treatment plan
                adherenceHistory: [
                    { month: 'April 2024', adherence: 89, status: 'good' },
                    { month: 'May 2024', adherence: 94, status: 'excellent' },
                    { month: 'June 2024', adherence: 92, status: 'good' }
                ],
                labResults: [
                    { date: '2024-04-01', test: 'HIV Test', result: 'Negative', status: 'normal' },
                    { date: '2024-04-01', test: 'Kidney Function', result: 'Normal', status: 'normal' },
                    { date: '2024-04-01', test: 'Bone Density', result: 'Normal', status: 'normal' }
                ],
                upcomingAppointments: [
                    { date: '2024-07-10', type: 'Lab Work', provider: 'Dr. Williams' },
                    { date: '2024-07-15', type: 'Follow-up Consultation', provider: 'Dr. Williams' }
                ]
            }
        },

        currentMedications: [
            { name: 'Lisinopril 10mg', dosage: 'Once daily', prescribedBy: 'Dr. Williams', startDate: '2023-06-01' },
            { name: 'Vitamin D3', dosage: '1000 IU daily', prescribedBy: 'Self-administered', startDate: '2023-01-01' }
        ],
        conditions: [
            { name: 'Hypertension', status: 'Controlled', diagnosedDate: '2023-05-15', treatingPhysician: 'Dr. Williams' },
            { name: 'Anxiety', status: 'Managed', diagnosedDate: '2022-08-20', treatingPhysician: 'Dr. Johnson' }
        ],
        surgeries: [
            { procedure: 'Appendectomy', date: '2018-03-22', hospital: 'General Hospital', complications: 'None' }
        ],
        familyHistory: [
            { condition: 'Diabetes Type 2', relation: 'Mother', ageOfOnset: 55 },
            { condition: 'Heart Disease', relation: 'Father', ageOfOnset: 62 },
            { condition: 'Breast Cancer', relation: 'Maternal Grandmother', ageOfOnset: 48 }
        ],
        immunizations: [
            { vaccine: 'COVID-19', date: '2024-01-15', manufacturer: 'Pfizer', booster: 'Yes' },
            { vaccine: 'Influenza', date: '2023-10-01', manufacturer: 'Moderna', booster: 'No' },
            { vaccine: 'Tetanus', date: '2021-04-10', manufacturer: 'GSK', booster: 'Due 2031' }
        ]
    },

    // Healthcare Preferences
    healthcarePreferences: {
        preferredLanguage: 'English',
        communicationMethod: 'email', // email, sms, phone, app-notification
        appointmentReminders: {
            enabled: true,
            timing: '24-hours', // 24-hours, 2-hours, both
            method: 'email-and-sms'
        },
        telemedicine: {
            enabled: true,
            videoCallPreference: 'mobile-app', // mobile-app, browser, phone-only
            deviceTesting: 'completed'
        },
        providerGenderPreference: 'no-preference', // male, female, no-preference
        treatmentApproach: 'collaborative', // traditional, holistic, collaborative
        dataSharing: {
            shareWithSpecialists: true,
            shareWithPharmacy: true,
            shareForResearch: false,
            emergencyAccess: true
        }
    },

    // App Preferences & Settings
    appPreferences: {
        theme: 'dark',
        language: 'English',
        timezone: 'Pacific Time (PT)',
        accessibility: {
            largeText: false,
            highContrast: false,
            screenReader: false,
            reduceMotion: false
        },
        notifications: {
            appointmentReminders: true,
            medicationReminders: true,
            testResults: true,
            healthTips: false,
            promotions: false,
            emergencyAlerts: true,
            providerMessages: true
        },
        privacy: {
            profileVisibility: 'healthcare-providers',
            shareHealthData: 'providers-only',
            allowHealthInsights: true,
            marketingOptOut: true
        }
    },

    // Health Goals & Tracking
    healthGoals: [
        { goal: 'Maintain 95% PrEP adherence', target: '95%', currentStatus: '92%', deadline: '2024-12-31' },
        { goal: 'Regular lab monitoring', target: 'Every 3 months', currentStatus: 'On schedule', deadline: '2024-07-15' },
        { goal: 'Weight management', target: '130 lbs', currentStatus: '135 lbs', deadline: '2024-10-31' }
    ],

    // Recent Activity (medical app specific)
    recentActivity: [
        {
            id: 1,
            type: 'prescription',
            title: 'PrEP medication pickup - Truvada',
            timestamp: '2024-07-10 09:00:00',
            status: 'completed',
            provider: 'Main Pharmacy',
            location: 'Downtown Pickup Point'
        },
        {
            id: 2,
            type: 'appointment',
            title: 'Quarterly follow-up with Dr. Williams',
            timestamp: '2024-07-08 14:30:00',
            status: 'completed',
            provider: 'Dr. Williams',
            location: 'MedConnect Downtown'
        },
        {
            id: 3,
            type: 'test-result',
            title: 'Lab results - HIV test and kidney function',
            timestamp: '2024-07-05 11:15:00',
            status: 'reviewed',
            result: 'All results normal',
            provider: 'Lab Services'
        },
        {
            id: 4,
            type: 'telemedicine',
            title: 'PrEP adherence counseling session',
            timestamp: '2024-06-28 16:00:00',
            status: 'completed',
            provider: 'Dr. Johnson',
            duration: '15 minutes'
        }
    ],

    // Healthcare Team
    healthcareTeam: [
        {
            name: 'Dr. Emily Williams',
            role: 'Primary Care Physician',
            specialty: 'Family Medicine',
            clinic: 'MedConnect Downtown Medical Center',
            phone: '+1 (555) 201-3001',
            email: 'e.williams@medconnect.health',
            nextAppointment: '2024-07-15 10:00:00'
        },
        {
            name: 'Dr. Michael Johnson',
            role: 'PrEP Specialist',
            specialty: 'HIV Prevention',
            clinic: 'MedConnect Downtown Medical Center',
            phone: '+1 (555) 201-3002',
            email: 'm.johnson@medconnect.health',
            nextAppointment: '2024-07-25 14:30:00'
        },
        {
            name: 'Jennifer Martinez, RN',
            role: 'Care Coordinator',
            specialty: 'Patient Care',
            clinic: 'MedConnect Downtown Medical Center',
            phone: '+1 (555) 201-3003',
            email: 'j.martinez@medconnect.health',
            nextAppointment: null
        }
    ],

    // Emergency Medical Information
    emergencyMedical: {
        conditions: ['Hypertension', 'Penicillin Allergy'],
        medications: ['Truvada (PrEP)', 'Lisinopril 10mg daily'],
        emergencyInstructions: 'Patient has severe penicillin allergy - use alternative antibiotics. Currently on PrEP medication.',
        dnrStatus: false,
        organDonor: true,
        medicalPowerOfAttorney: 'David Chen - Spouse',
        advancedDirectives: 'On file with primary physician'
    }
};

// User Profile Page Component
function UserProfilePage() {
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const fileInputRef = useRef(null);

    // Form states for editing
    const [editedUser, setEditedUser] = useState(userData);

    const handleBack = () => {
        console.log('Navigate back');
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        console.log('Saving user data:', editedUser);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedUser(userData);
        setIsEditing(false);
    };

    const handleAvatarUpload = () => {
        fileInputRef.current?.click();
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Uploading avatar:', file);
            // Handle file upload logic here
        }
    };
    const [showRoleChangeModal, setShowRoleChangeModal] = useState(false);



    return (
        <div className="space-y-6">
            {/* Header */}
            <GlassCard variant="primary" className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <button
                            onClick={handleBack}
                            className="p-2 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>

                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                                <span className="text-white font-bold text-2xl">{userData.avatar}</span>

                                {isEditing && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                        <button
                                            onClick={handleAvatarUpload}
                                            className="p-2 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-all"
                                        >
                                            <Camera className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                            <h1 className="text-2xl lg:text-3xl font-bold text-white">{userData.name}</h1>
                            <p className="text-blue-400 text-lg">{userData.userType}</p>
                            <p className="text-gray-300">Member since {new Date(userData.memberSince).toLocaleDateString()}</p>
                            <div className="flex items-center space-x-4 mt-2">
                                <StatusBadge status="success">Verified</StatusBadge>
                                <StatusBadge status="info">Insurance Active</StatusBadge>
                                <div className="flex items-center space-x-1">
                                    <Heart className="w-4 h-4 text-red-400" fill="currentColor" />
                                    <span className="text-white font-medium">{userData.medical.allergies.length}</span>
                                    <span className="text-gray-300">Allergies</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                        {!isEditing ? (
                            <>
                                <button
                                    onClick={handleEdit}
                                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/25 flex items-center space-x-2"
                                >
                                    <Edit3 className="w-5 h-5" />
                                    <span>Edit Profile</span>
                                </button>
                                <button className="p-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all">
                                    <Share2 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => signOut()}
                                    className="px-4 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all shadow-lg shadow-slate-600/20 flex items-center space-x-2"
                                >
                                    <ArrowLeft className="w-5 h-5 rotate-180" />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:from-emerald-600 hover:to-green-600 transition-all shadow-lg shadow-emerald-500/25 flex items-center space-x-2"
                                >
                                    <Save className="w-5 h-5" />
                                    <span>Save Changes</span>
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all flex items-center space-x-2"
                                >
                                    <X className="w-5 h-5" />
                                    <span>Cancel</span>
                                </button>
                                <button
                                    onClick={() => console.log('Logout clicked')}
                                    className="px-4 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all shadow-lg shadow-slate-600/20 flex items-center space-x-2"
                                >
                                    <ArrowLeft className="w-5 h-5 rotate-180" />
                                    <span>Logout</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                    <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-2xl font-bold text-emerald-400">{userData.recentActivity.length}</div>
                        <div className="text-gray-300 text-sm">Recent Activities</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-2xl font-bold text-blue-400">{userData.healthcareTeam.length}</div>
                        <div className="text-gray-300 text-sm">Healthcare Team</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-2xl font-bold text-purple-400">{userData.medical.activeDrugTreatment.currentAdherence}%</div>
                        <div className="text-gray-300 text-sm">Drug Adherence</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-2xl font-bold text-red-400">{userData.medical.allergies.length}</div>
                        <div className="text-gray-300 text-sm">Known Allergies</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-2xl font-bold text-cyan-400">{userData.medical.activeDrugTreatment.pillsRemaining}</div>
                        <div className="text-gray-300 text-sm">Pills Remaining</div>
                    </div>
                </div>
            </GlassCard>

            {/* Tab Navigation */}
            <GlassCard className="p-1">
                <div className="flex space-x-1 overflow-x-auto">
                    {[
                        { id: 'overview', label: 'Overview', icon: User },
                        { id: 'medical', label: 'Medical Info', icon: Heart },
                        { id: 'preferences', label: 'Preferences', icon: Settings },
                        { id: 'privacy', label: 'Privacy & Security', icon: Shield }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 whitespace-nowrap relative overflow-hidden group ${activeTab === tab.id
                                ? 'bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 border border-blue-400/30'
                                : 'bg-gradient-to-r from-white/5 to-white/10 text-gray-300 hover:from-blue-500/20 hover:to-cyan-500/20 hover:text-white hover:shadow-md hover:shadow-blue-500/10 border border-white/10 hover:border-blue-400/20'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            <span className="font-medium text-sm">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </GlassCard>

            {/* Tab Content */}
            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Current Hospital Enrollment */}
                        <GlassCard variant="primary" className="p-6">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                                <Building2 className="w-6 h-6 text-blue-400 mr-2" />
                                Current Hospital Enrollment
                            </h2>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                                        <Building2 className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-white">{userData.currentHospital.name}</h3>
                                        <p className="text-blue-400">{userData.currentHospital.address}</p>
                                        <p className="text-gray-300 text-sm">Primary Physician: {userData.currentHospital.primaryPhysician}</p>
                                        <div className="flex items-center space-x-4 mt-2">
                                            <StatusBadge status="success">Enrolled</StatusBadge>
                                            <span className="text-gray-400 text-sm">Since {new Date(userData.currentHospital.enrollmentDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Drug Delivery & Pickup */}
                        <GlassCard className="p-6">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                                <MapPin className="w-6 h-6 text-emerald-400 mr-2" />
                                Drug Pickup & Delivery
                            </h2>

                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-medium text-white">Current Pickup Point</h3>
                                        <button className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all text-sm">
                                            Change
                                        </button>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                                            <MapPin className="w-4 h-4 text-emerald-400" />
                                        </div>
                                        <div>
                                            <p className="text-emerald-400 font-medium">{userData.drugDelivery.preferredPickupPoint}</p>
                                            <p className="text-gray-300 text-sm">{userData.drugDelivery.availablePickupPoints[0].address}</p>
                                            <p className="text-gray-400 text-xs">Hours: {userData.drugDelivery.availablePickupPoints[0].hours}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <h4 className="text-white font-medium mb-2">Delivery Instructions</h4>
                                    <p className="text-gray-300 text-sm">{userData.drugDelivery.deliveryInstructions}</p>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard className="p-6">
                            <h2 className="text-xl font-bold text-white mb-6">Personal Information</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-gray-300 text-sm font-medium mb-2">Patient ID</label>
                                        <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                                            {userData.id}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 text-sm font-medium mb-2">Date of Birth</label>
                                        <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                                            {new Date(userData.dateOfBirth).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 text-sm font-medium mb-2">Blood Type</label>
                                        <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                                            {userData.personal.bloodType}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-gray-300 text-sm font-medium mb-2">Gender</label>
                                        <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                                            {userData.personal.gender}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 text-sm font-medium mb-2">Height & Weight</label>
                                        <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                                            {userData.personal.height}, {userData.personal.weight}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 text-sm font-medium mb-2">Member Since</label>
                                        <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                                            {new Date(userData.memberSince).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Contact Info */}
                        <GlassCard className="p-6">
                            <h3 className="text-lg font-bold text-white mb-4">Contact Information</h3>

                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <Mail className="w-5 h-5 text-blue-400" />
                                    <div>
                                        <p className="text-white font-medium">{userData.email}</p>
                                        <p className="text-gray-400 text-sm">Email</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Phone className="w-5 h-5 text-emerald-400" />
                                    <div>
                                        <p className="text-white font-medium">{userData.phone}</p>
                                        <p className="text-gray-400 text-sm">Phone</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <MapPin className="w-5 h-5 text-purple-400" />
                                    <div>
                                        <p className="text-white font-medium">{userData.personal.address.city}, {userData.personal.address.state}</p>
                                        <p className="text-gray-400 text-sm">Location</p>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            )}

            {activeTab === 'medical' && (
                <div className="space-y-6">
                    {/* Active Drug Treatment */}
                    <GlassCard variant="primary" className="p-6">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                            <Pill className="w-6 h-6 text-blue-400 mr-2" />
                            Active Drug Treatment
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Drug Information */}
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                                    <h3 className="text-lg font-bold text-white mb-2">{userData.medical.activeDrugTreatment.drugName}</h3>
                                    <p className="text-blue-400 text-sm">{userData.medical.activeDrugTreatment.activeIngredient}</p>
                                    <p className="text-gray-300 text-sm">{userData.medical.activeDrugTreatment.purpose}</p>
                                    <div className="flex items-center space-x-4 mt-3">
                                        <StatusBadge status="info">{userData.medical.activeDrugTreatment.treatmentCycle} cycle</StatusBadge>
                                        <span className="text-gray-400 text-sm">Started: {new Date(userData.medical.activeDrugTreatment.startDate).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-emerald-400">{userData.medical.activeDrugTreatment.pillsRemaining}</div>
                                            <div className="text-gray-300 text-sm">Pills Remaining</div>
                                            <div className="text-gray-400 text-xs">of {userData.medical.activeDrugTreatment.totalPills}</div>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-400">{userData.medical.activeDrugTreatment.currentAdherence}%</div>
                                            <div className="text-gray-300 text-sm">Adherence</div>
                                            <div className="text-gray-400 text-xs">Target: {userData.medical.activeDrugTreatment.adherenceTarget}%</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <h4 className="text-white font-medium mb-2">Dosage & Schedule</h4>
                                    <p className="text-gray-300 text-sm">{userData.medical.activeDrugTreatment.dosage}</p>
                                    <p className="text-blue-400 text-sm">Prescribed by: {userData.medical.activeDrugTreatment.prescribedBy}</p>
                                </div>

                                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                                    <h4 className="text-amber-400 font-medium mb-2">Next Refill Due</h4>
                                    <p className="text-white">{new Date(userData.medical.activeDrugTreatment.nextRefillDate).toLocaleDateString()}</p>
                                    <p className="text-gray-400 text-sm">Lab tests due: {new Date(userData.medical.activeDrugTreatment.labTestsDue).toLocaleDateString()}</p>
                                </div>
                            </div>

                            {/* Progress Tracking */}
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <h4 className="text-white font-medium mb-3 flex items-center">
                                        <TrendingUp className="w-5 h-5 text-emerald-400 mr-2" />
                                        Treatment Progress
                                    </h4>
                                    <div className="space-y-3">
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-300">Months Completed</span>
                                                <span className="text-white">{userData.medical.activeDrugTreatment.progress.monthsCompleted}/{userData.medical.activeDrugTreatment.progress.totalMonths}</span>
                                            </div>
                                            <div className="w-full bg-gray-700 rounded-full h-2">
                                                <div
                                                    className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full"
                                                    style={{ width: `${(userData.medical.activeDrugTreatment.progress.monthsCompleted / userData.medical.activeDrugTreatment.progress.totalMonths) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-300">Current Adherence</span>
                                                <span className="text-blue-400">{userData.medical.activeDrugTreatment.currentAdherence}%</span>
                                            </div>
                                            <div className="w-full bg-gray-700 rounded-full h-2">
                                                <div
                                                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                                                    style={{ width: `${userData.medical.activeDrugTreatment.currentAdherence}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <h4 className="text-white font-medium mb-3">Adherence History</h4>
                                    <div className="space-y-2">
                                        {userData.medical.activeDrugTreatment.progress.adherenceHistory.map((record, index) => (
                                            <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                                                <span className="text-gray-300 text-sm">{record.month}</span>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-white text-sm">{record.adherence}%</span>
                                                    <StatusBadge status={record.status === 'excellent' ? 'success' : 'info'}>
                                                        {record.status}
                                                    </StatusBadge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <h4 className="text-white font-medium mb-3">Side Effects</h4>
                                    <div className="space-y-1">
                                        {userData.medical.activeDrugTreatment.sideEffects.map((effect, index) => (
                                            <p key={index} className="text-gray-300 text-sm">• {effect}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Lab Results & Monitoring */}
                    <GlassCard className="p-6">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                            <Activity className="w-6 h-6 text-emerald-400 mr-2" />
                            Lab Results & Monitoring
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            {userData.medical.activeDrugTreatment.progress.labResults.map((result, index) => (
                                <div key={index} className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                                    <h3 className="font-medium text-white">{result.test}</h3>
                                    <p className="text-emerald-400 text-sm">{result.result}</p>
                                    <p className="text-gray-400 text-xs">{new Date(result.date).toLocaleDateString()}</p>
                                    <StatusBadge status="success" className="mt-2">{result.status}</StatusBadge>
                                </div>
                            ))}
                        </div>

                        <div>
                            <h3 className="text-lg font-medium text-white mb-4">Upcoming Appointments</h3>
                            <div className="space-y-3">
                                {userData.medical.activeDrugTreatment.progress.upcomingAppointments.map((appointment, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                                        <div className="flex items-center space-x-3">
                                            <Calendar className="w-5 h-5 text-blue-400" />
                                            <div>
                                                <p className="text-white font-medium">{appointment.type}</p>
                                                <p className="text-gray-400 text-sm">{appointment.provider}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-blue-400">{new Date(appointment.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </GlassCard>
                </div>
            )}
            {activeTab === 'preferences' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <GlassCard className="p-6 lg:col-span-2">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                            <UserCheck className="w-6 h-6 text-purple-400 mr-2" />
                            Role Management
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
                                    <h3 className="text-white font-medium mb-2">Current Role</h3>
                                    <p className="text-purple-400 text-lg font-bold">{userData.userType}</p>
                                    <p className="text-gray-300 text-sm mt-1">
                                        Member since {new Date(userData.memberSince).toLocaleDateString()}
                                    </p>
                                    <div className="flex items-center space-x-4 mt-3">
                                        <StatusBadge status="success">Active</StatusBadge>
                                        <span className="text-gray-400 text-sm">Hospital: {userData.currentHospital.name}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center">
                                <button
                                    // onClick={() => setShowRoleChangeModal(true)}
                                    className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center space-x-2"
                                >
                                    <UserCheck className="w-5 h-5" />
                                    <span className="font-medium">Request Role Change</span>
                                </button>
                                <p className="text-gray-400 text-xs text-center mt-2">
                                    Submit a request for role promotion or change
                                </p>
                            </div>
                        </div>
                    </GlassCard>
                    <GlassCard className="p-6">
                        <h2 className="text-xl font-bold text-white mb-6">Healthcare Preferences</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Preferred Language</label>
                                <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-all">
                                    <option value="en">English</option>
                                    <option value="es">Spanish</option>
                                    <option value="fr">French</option>
                                    <option value="zh">Chinese</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Communication Method</label>
                                <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-all">
                                    <option value="email">Email</option>
                                    <option value="sms">SMS</option>
                                    <option value="phone">Phone Call</option>
                                    <option value="app-notification">App Notification</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Provider Gender Preference</label>
                                <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-all">
                                    <option value="no-preference">No Preference</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Treatment Approach</label>
                                <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-all">
                                    <option value="collaborative">Collaborative</option>
                                    <option value="traditional">Traditional Medicine</option>
                                    <option value="holistic">Holistic/Alternative</option>
                                </select>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="p-6">
                        <h2 className="text-xl font-bold text-white mb-6">Appointment Preferences</h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                <div>
                                    <p className="text-white font-medium">Appointment Reminders</p>
                                    <p className="text-gray-400 text-sm">Get notified about upcoming appointments</p>
                                </div>
                                <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${userData.healthcarePreferences.appointmentReminders.enabled ? 'bg-emerald-600' : 'bg-gray-600'
                                    }`}>
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${userData.healthcarePreferences.appointmentReminders.enabled ? 'translate-x-6' : 'translate-x-1'
                                        }`} />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                <div>
                                    <p className="text-white font-medium">Telemedicine</p>
                                    <p className="text-gray-400 text-sm">Enable video consultations</p>
                                </div>
                                <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${userData.healthcarePreferences.telemedicine.enabled ? 'bg-emerald-600' : 'bg-gray-600'
                                    }`}>
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${userData.healthcarePreferences.telemedicine.enabled ? 'translate-x-6' : 'translate-x-1'
                                        }`} />
                                </button>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-3">Reminder Timing</label>
                                <div className="space-y-2">
                                    {[
                                        { value: '24-hours', label: '24 hours before' },
                                        { value: '2-hours', label: '2 hours before' },
                                        { value: 'both', label: 'Both 24h and 2h before' }
                                    ].map((option) => (
                                        <div key={option.value} className={`p-3 rounded-xl border cursor-pointer transition-all ${userData.healthcarePreferences.appointmentReminders.timing === option.value
                                            ? 'bg-blue-500/20 border-blue-500/30 text-white'
                                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                                            }`}>
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-4 h-4 rounded-full border-2 ${userData.healthcarePreferences.appointmentReminders.timing === option.value
                                                    ? 'border-blue-400 bg-blue-400'
                                                    : 'border-gray-400'
                                                    }`}></div>
                                                <span>{option.label}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="p-6">
                        <h2 className="text-xl font-bold text-white mb-6">App Settings</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Timezone</label>
                                <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-all">
                                    <option value="pt">Pacific Time (PT)</option>
                                    <option value="mt">Mountain Time (MT)</option>
                                    <option value="ct">Central Time (CT)</option>
                                    <option value="et">Eastern Time (ET)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-4">Theme</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-blue-500/50 text-white flex items-center space-x-2">
                                        <Moon className="w-5 h-5" />
                                        <span>Dark</span>
                                    </button>
                                    <button className="p-4 rounded-xl bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20 transition-all flex items-center space-x-2">
                                        <Sun className="w-5 h-5" />
                                        <span>Light</span>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-4">Accessibility</label>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                        <span className="text-white">Large Text</span>
                                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600">
                                            <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                        <span className="text-white">High Contrast</span>
                                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600">
                                            <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                        <span className="text-white">Reduce Motion</span>
                                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600">
                                            <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="p-6">
                        <h2 className="text-xl font-bold text-white mb-6">Notification Preferences</h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                <div className="flex items-center space-x-3">
                                    <Calendar className="w-5 h-5 text-blue-400" />
                                    <div>
                                        <p className="text-white font-medium">Appointment Reminders</p>
                                        <p className="text-gray-400 text-sm">Upcoming appointments</p>
                                    </div>
                                </div>
                                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-600">
                                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                <div className="flex items-center space-x-3">
                                    <Pill className="w-5 h-5 text-emerald-400" />
                                    <div>
                                        <p className="text-white font-medium">Medication Reminders</p>
                                        <p className="text-gray-400 text-sm">Time to take medications</p>
                                    </div>
                                </div>
                                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-600">
                                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                <div className="flex items-center space-x-3">
                                    <Activity className="w-5 h-5 text-purple-400" />
                                    <div>
                                        <p className="text-white font-medium">Test Results</p>
                                        <p className="text-gray-400 text-sm">Lab and test results available</p>
                                    </div>
                                </div>
                                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-600">
                                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                <div className="flex items-center space-x-3">
                                    <Mail className="w-5 h-5 text-blue-400" />
                                    <div>
                                        <p className="text-white font-medium">Provider Messages</p>
                                        <p className="text-gray-400 text-sm">Messages from healthcare team</p>
                                    </div>
                                </div>
                                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-600">
                                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                <div className="flex items-center space-x-3">
                                    <AlertTriangle className="w-5 h-5 text-red-400" />
                                    <div>
                                        <p className="text-white font-medium">Emergency Alerts</p>
                                        <p className="text-gray-400 text-sm">Critical health alerts</p>
                                    </div>
                                </div>
                                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-600">
                                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            )}

            {activeTab === 'privacy' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <GlassCard className="p-6">
                        <h2 className="text-xl font-bold text-white mb-6">Privacy Settings</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-4">Health Data Sharing</label>
                                <div className="space-y-3">
                                    {[
                                        { value: 'providers-only', label: 'Healthcare Providers Only', desc: 'Only your medical team can access your data' },
                                        { value: 'research-approved', label: 'Approved Research', desc: 'Share anonymized data for medical research' },
                                        { value: 'emergency-only', label: 'Emergency Access Only', desc: 'Restrict access except in emergencies' }
                                    ].map((option) => (
                                        <div key={option.value} className={`p-4 rounded-xl border cursor-pointer transition-all ${userData.appPreferences.privacy.shareHealthData === option.value
                                            ? 'bg-blue-500/20 border-blue-500/30 text-white'
                                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                                            }`}>
                                            <div className="flex items-start space-x-3">
                                                <div className={`w-4 h-4 rounded-full border-2 mt-1 ${userData.appPreferences.privacy.shareHealthData === option.value
                                                    ? 'border-blue-400 bg-blue-400'
                                                    : 'border-gray-400'
                                                    }`}></div>
                                                <div>
                                                    <h4 className="font-medium">{option.label}</h4>
                                                    <p className="text-sm opacity-70">{option.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                    <div>
                                        <p className="text-white font-medium">Allow Health Insights</p>
                                        <p className="text-gray-400 text-sm">Get personalized health recommendations</p>
                                    </div>
                                    <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${userData.appPreferences.privacy.allowHealthInsights ? 'bg-emerald-600' : 'bg-gray-600'
                                        }`}>
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${userData.appPreferences.privacy.allowHealthInsights ? 'translate-x-6' : 'translate-x-1'
                                            }`} />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                    <div>
                                        <p className="text-white font-medium">Marketing Opt-out</p>
                                        <p className="text-gray-400 text-sm">Don't receive promotional content</p>
                                    </div>
                                    <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${userData.appPreferences.privacy.marketingOptOut ? 'bg-emerald-600' : 'bg-gray-600'
                                        }`}>
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${userData.appPreferences.privacy.marketingOptOut ? 'translate-x-6' : 'translate-x-1'
                                            }`} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="p-6">
                        <h2 className="text-xl font-bold text-white mb-6">Security Settings</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Current Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all pr-12"
                                        placeholder="Enter current password"
                                    />
                                    <button
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">New Password</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
                                    placeholder="Enter new password"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Confirm New Password</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
                                    placeholder="Confirm new password"
                                />
                            </div>

                            <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/25">
                                Update Password
                            </button>
                        </div>
                    </GlassCard>

                    <GlassCard className="p-6 lg:col-span-2">
                        <h2 className="text-xl font-bold text-white mb-6">Data Management</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-6 rounded-xl bg-blue-500/10 border border-blue-500/30 text-center">
                                <Download className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                                <h3 className="font-medium text-white mb-2">Export Health Data</h3>
                                <p className="text-gray-400 text-sm mb-4">Download a copy of all your health information</p>
                                <button className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-all">
                                    Export Data
                                </button>
                            </div>

                            <div className="p-6 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center">
                                <Shield className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                                <h3 className="font-medium text-white mb-2">Privacy Report</h3>
                                <p className="text-gray-400 text-sm mb-4">See how your data has been accessed</p>
                                <button className="px-4 py-2 bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-xl hover:bg-amber-500/30 transition-all">
                                    View Report
                                </button>
                            </div>

                            <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/30 text-center">
                                <Trash2 className="w-12 h-12 text-red-400 mx-auto mb-4" />
                                <h3 className="font-medium text-white mb-2">Delete Account</h3>
                                <p className="text-gray-400 text-sm mb-4">Permanently remove your account and data</p>
                                <button className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/30 transition-all">
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            )}
        </div>
    );
}

export default UserProfilePage;