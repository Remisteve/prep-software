/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState, useRef } from 'react';
import {
    Building2, MapPin, Phone, Camera, Upload, X,
    CheckCircle,
    Save, ArrowLeft,
    Loader2
} from 'lucide-react';
import GlassCard from '@/components/custom/GlassCard';
import { Errors } from '../../lab/add/page';
import useUploadImage from '@/hooks/useUploadImage';


interface PhotoProps {
    id: string
    name: string
    preview: string
    size: number
}


// Photo Upload Component
function PhotoUploadSection({ photos, onPhotoRemove }: {
    photos: PhotoProps[],
    onPhotoRemove: (id: string) => void,
}) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);


    const { uploadImage } = useUploadImage()


    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            if (file) {
                uploadImage(file)
            }
        }


    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">Facility Photos</h3>
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/25 flex items-center space-x-2"
                >
                    <Upload className="w-4 h-4" />
                    <span>Upload Photos</span>
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {photos.map((photo) => (
                    <div key={photo.id} className="relative group">
                        <div className="aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10">
                            <img
                                src={photo.preview}
                                alt={photo.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button
                            onClick={() => onPhotoRemove(photo.id)}
                            className="absolute top-2 right-2 p-1 bg-red-500/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-2 left-2 right-2">
                            <div className="bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
                                <p className="text-white text-xs truncate">{photo.name}</p>
                                <p className="text-gray-300 text-xs">{(photo.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        </div>
                    </div>
                ))}

                {photos.length === 0 && (
                    <div className="col-span-2 md:col-span-4">
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400/50 hover:bg-white/5 transition-all"
                        >
                            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-400 mb-2">Upload facility photos</p>
                            <p className="text-gray-500 text-sm">Drag & drop or click to select images</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


// Main Hospital Registration Component
function HospitalRegistration() {
    const [currentStep, setCurrentStep] = useState(1);
    const [photos, setPhotos] = useState<PhotoProps[]>([]);

    // Form Data State
    const [formData, setFormData] = useState({
        // Basic Information
        hospitalName: '',
        hospitalType: '',
        cccNumber: '',

        // Contact & Location
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'United States'
        },
        contact: {
            mainPhone: '',
            emergencyPhone: '',
            fax: '',
            email: '',
            website: ''
        }
    });

    const handleInputChange = (section: string, field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };


    const handlePhotoAdd = (photo: PhotoProps) => {
        setPhotos(prev => [...prev, photo]);
    };

    const handlePhotoRemove = (photoId: string) => {
        setPhotos(prev => prev.filter(photo => photo.id !== photoId));
    };


    const hospitalData = {
        ...formData,
        photos: photos,
        registrationDate: new Date().toISOString(),
        status: 'pending-review'
    };



    const steps = [
        { id: 1, title: 'Basic Information', icon: Building2 },
        { id: 2, title: 'Location & Contact', icon: MapPin },
        { id: 3, title: 'Photos & Final Review', icon: Camera }
    ];

    const [errors, setErrors] = useState<Errors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [apiError, setApiError] = useState('');



    const handleSubmit = async () => {
        // if (!validateForm()) {
        //     return;
        // }

        try {
            setIsLoading(true);
            setApiError('');

            const res = await fetch('/api/facilities', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(hospitalData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to create lab test');
            }

            setShowSuccess(true);

            // Reset form after successful submission
            setTimeout(() => {
                // resetForm();
                setShowSuccess(false);
            }, 3000);

        } catch (error) {
            if (error instanceof Error) {
                setApiError(error.message);
            } else {
                setApiError('An unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div>
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <GlassCard variant="primary" className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="text-2xl lg:text-3xl font-bold text-white">Hospital Registration</h1>
                                <p className="text-blue-400">Register your medical facility with our network</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-white font-medium">Step {currentStep} of {steps.length}</p>
                            <p className="text-gray-300 text-sm">{steps[currentStep - 1]?.title}</p>
                        </div>
                    </div>
                </GlassCard>

                {/* Step Navigation */}
                <GlassCard className="p-4">
                    <div className="flex space-x-2 overflow-x-auto">
                        {steps.map((step) => (
                            <button
                                key={step.id}
                                onClick={() => setCurrentStep(step.id)}
                                className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 whitespace-nowrap ${currentStep === step.id
                                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                                    : currentStep > step.id
                                        ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400'
                                        : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                                    }`}
                            >
                                <step.icon className="w-4 h-4" />
                                <span className="font-medium text-sm">{step.title}</span>
                                {currentStep > step.id && <CheckCircle className="w-4 h-4" />}
                            </button>
                        ))}
                    </div>
                </GlassCard>

                {/* Step Content */}
                {currentStep === 1 && (
                    <GlassCard className="p-6">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                            <Building2 className="w-6 h-6 text-blue-400 mr-2" />
                            Basic Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Hospital Name *</label>
                                <input
                                    type="text"
                                    value={formData.hospitalName}
                                    onChange={(e) => setFormData(prev => ({ ...prev, hospitalName: e.target.value }))}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
                                    placeholder="Enter hospital name"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">Hospital Type *</label>
                                <select
                                    value={formData.hospitalType}
                                    onChange={(e) => setFormData(prev => ({ ...prev, hospitalType: e.target.value }))}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-all"
                                >
                                    <option value="">Select type</option>
                                    <option value="general">General Hospital</option>
                                    <option value="specialty">Specialty Hospital</option>
                                    <option value="teaching">Teaching Hospital</option>
                                    <option value="research">Research Hospital</option>
                                    <option value="rehabilitation">Rehabilitation Center</option>
                                    <option value="psychiatric">Psychiatric Hospital</option>
                                    <option value="pediatric">Children's Hospital</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">CCC No *</label>
                                <input
                                    type="text"
                                    value={formData.cccNumber}
                                    onChange={(e) => setFormData(prev => ({ ...prev, cccNumber: e.target.value }))}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
                                    placeholder="Enter CCC number"
                                />
                            </div>
                        </div>
                    </GlassCard>
                )}

                {currentStep === 2 && (
                    <div className="space-y-6">
                        <GlassCard className="p-6">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                                <MapPin className="w-6 h-6 text-emerald-400 mr-2" />
                                Address Information
                            </h2>

                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Street Address *</label>
                                    <input
                                        type="text"
                                        value={formData.address.street}
                                        onChange={(e) => handleInputChange('address', 'street', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
                                        placeholder="Enter street address"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-gray-300 text-sm font-medium mb-2">City *</label>
                                        <input
                                            type="text"
                                            value={formData.address.city}
                                            onChange={(e) => handleInputChange('address', 'city', e.target.value)}
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
                                            placeholder="City"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-300 text-sm font-medium mb-2">State *</label>
                                        <input
                                            type="text"
                                            value={formData.address.state}
                                            onChange={(e) => handleInputChange('address', 'state', e.target.value)}
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
                                            placeholder="State"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-300 text-sm font-medium mb-2">ZIP Code *</label>
                                        <input
                                            type="text"
                                            value={formData.address.zipCode}
                                            onChange={(e) => handleInputChange('address', 'zipCode', e.target.value)}
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
                                            placeholder="ZIP Code"
                                        />
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard className="p-6">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                                <Phone className="w-6 h-6 text-blue-400 mr-2" />
                                Contact Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Main Phone *</label>
                                    <input
                                        type="tel"
                                        value={formData.contact.mainPhone}
                                        onChange={(e) => handleInputChange('contact', 'mainPhone', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Emergency Phone *</label>
                                    <input
                                        type="tel"
                                        value={formData.contact.emergencyPhone}
                                        onChange={(e) => handleInputChange('contact', 'emergencyPhone', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
                                        placeholder="+1 (555) 911-0000"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Email Address *</label>
                                    <input
                                        type="email"
                                        value={formData.contact.email}
                                        onChange={(e) => handleInputChange('contact', 'email', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
                                        placeholder="info@hospital.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Website</label>
                                    <input
                                        type="url"
                                        value={formData.contact.website}
                                        onChange={(e) => handleInputChange('contact', 'website', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
                                        placeholder="https://www.hospital.com"
                                    />
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="space-y-6">
                        <GlassCard className="p-6">
                            <PhotoUploadSection
                                photos={photos}
                                onPhotoAdd={handlePhotoAdd}
                                onPhotoRemove={handlePhotoRemove}
                            />
                        </GlassCard>


                    </div>
                )}

                {/* Navigation Buttons */}
                <GlassCard className="p-4">
                    <div className="flex justify-between">
                        <button
                            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                            disabled={currentStep === 1}
                            className={`px-6 py-3 rounded-xl transition-all flex items-center space-x-2 ${currentStep === 1
                                ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800'
                                }`}
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Previous</span>
                        </button>

                        {currentStep < steps.length ? (
                            <button
                                onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/25 flex items-center space-x-2"
                            >
                                <span>Next Step</span>
                                <ArrowLeft className="w-5 h-5 rotate-180" />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:from-emerald-600 hover:to-green-600 transition-all shadow-lg shadow-emerald-500/25 flex items-center space-x-2"
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}

                                <span>Submit Registration</span>
                            </button>
                        )}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}

export default HospitalRegistration;