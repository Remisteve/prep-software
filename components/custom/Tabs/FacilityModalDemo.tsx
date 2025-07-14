import React, { useState } from 'react';
import {
    Star,
    Phone,
    MapPin,
    Calendar,
    Navigation,
    Globe,
    MessageSquare,
} from 'lucide-react';

interface FacilityInterface {
    id: number;
    name: string;
    type: string;
    address: string;
    distance: string;
    phone: string;
    rating: number;
    reviewCount: number;
    image: string;
    services: string[];
    specialties: string[];
    nextAvailable: string;
    priceRange: string;
    availableSlots: number;
    isPrimary: boolean;
    website?: string;
    email?: string;
}

const FacilityModal = ({ service, onClose }: { service: FacilityInterface, onClose: () => void }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedImage, setSelectedImage] = useState(0);


    const facilityImages = [
        {
            url: service.image,
            caption: "Main entrance and reception area"
        },
        {
            url: "https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?w=600&h=300&fit=crop",
            caption: "Modern consultation rooms"
        },
        {
            url: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=300&fit=crop",
            caption: "Private treatment areas"
        },
        {
            url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=300&fit=crop",
            caption: "Laboratory and testing facilities"
        },
        {
            url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=300&fit=crop",
            caption: "Comfortable waiting area"
        }
    ];



    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-2xl max-w-4xl w-full h-[500px] overflow-hidden shadow-2xl flex p-4 ">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        {/* <div className={`${service.color} p-3 rounded-lg`}>
                            <service.icon className="h-6 w-6 text-white" />
                        </div> */}
                        <h2 className="text-2xl font-bold text-gray-900">{service.name}</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {/* Header Image Gallery and Close Button */}
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={facilityImages[selectedImage].url}
                        alt={facilityImages[selectedImage].caption}
                        className="w-[350px] h-full object-cover rounded-lg"
                    />


                </div>





                <div className="overflow-y-auto max-h-[calc(90vh-12rem)]">
                    {/* Main Content */}
                    <div className="p-6 pt-0">


                        {/* Tab Navigation */}
                        <div className="border-b border-gray-200 mb-6">
                            <nav className="-mb-px flex space-x-8">
                                {[
                                    { id: 'services', label: 'Services' },
                                    { id: 'contact', label: 'Contact' },
                                    { id: 'location', label: 'Location' },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </div>



                        {activeTab === 'services' && (
                            <div className=" flex justify-start text-left">
                                <div className=''>
                                    <h3 className="font-semibold text-gray-900 mb-2">Services Offered</h3>
                                    <ol className='text-[14px] list-disc ml-8 text-slate-500 space-y-1' >
                                        {service.services.map((srv, index) => (
                                            <li key={index} className="">
                                                {srv}
                                            </li>
                                        ))}
                                    </ol>
                                </div>



                            </div>
                        )}

                        {activeTab === 'contact' && (
                            <div className="space-y-6">
                                {/* Contact Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                            <Phone className="h-5 w-5 text-blue-600" />
                                            <div>
                                                <p className="font-medium text-gray-900">Phone</p>
                                                <p className="text-gray-600">{service.phone}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                            <MapPin className="h-5 w-5 text-green-600" />
                                            <div>
                                                <p className="font-medium text-gray-900">Address</p>
                                                <p className="text-gray-600">{service.address}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                            <Globe className="h-5 w-5 text-purple-600" />
                                            <div>
                                                <p className="font-medium text-gray-900">Website</p>
                                                <p className="text-blue-600 hover:underline cursor-pointer">{service.website || "www.example.com"}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                            <MessageSquare className="h-5 w-5 text-orange-600" />
                                            <div>
                                                <p className="font-medium text-gray-900">Online Chat</p>
                                                <p className="text-gray-600">Available 24/7</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Action Buttons */}
                                <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
                                    <div className="flex space-x-3">
                                        <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2">
                                            <Calendar className="h-4 w-4" />
                                            <span>Book Appointment</span>
                                        </button>
                                        <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                                            <Phone className="h-4 w-4" />
                                        </button>
                                        <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                                            <Navigation className="h-4 w-4" />
                                        </button>
                                        <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                                            <MessageSquare className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'location' && (
                            <div className="space-y-6">
                                {/* Facility Header Info */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex-1">
                                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{service.name}</h1>
                                        <p className="text-gray-600 mb-3">{service.type}</p>

                                        <div className="flex items-center space-x-4 mb-4">
                                            <div className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-4 w-4 ${i < Math.floor(service.rating)
                                                            ? 'text-yellow-400 fill-current'
                                                            : 'text-gray-300'
                                                            }`}
                                                    />
                                                ))}
                                                <span className="text-sm font-medium text-gray-900 ml-1">{service.rating}</span>
                                                <span className="text-sm text-gray-500">({service.reviewCount} reviews)</span>
                                            </div>
                                            <div className="w-px h-4 bg-gray-300"></div>
                                            <div className="flex items-center space-x-1 text-sm text-gray-600">
                                                <MapPin className="h-4 w-4" />
                                                <span>{service.distance}</span>
                                            </div>
                                            <div className="w-px h-4 bg-gray-300"></div>
                                            <span className="text-sm font-medium text-gray-700">{service.priceRange}</span>
                                        </div>

                                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                                            <MapPin className="h-4 w-4" />
                                            <span>{service.address}</span>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                                            <p className="text-sm font-medium text-green-800">Next Available</p>
                                            <p className="text-lg font-bold text-green-900">{service.nextAvailable}</p>
                                            <p className="text-xs text-green-600">{service.availableSlots} slots available</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )}


                    </div>


                </div>
            </div>
        </div>
    );
};


export default FacilityModal;