import { MapPin, Search, Star } from 'lucide-react'
import React, { useState } from 'react'
import FacilityModal from './FacilityModalDemo';




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
}

const Facilities = () => {

    const [searchTerm, setSearchTerm] = useState('');
    // const [selectedFilter, setSelectedFilter] = useState('all');
    const [showMapView, setShowMapView] = useState(false);




    const facilities: FacilityInterface[] = [
        {
            id: 1,
            name: "Downtown Health Clinic",
            type: "Community Health Center",
            address: "123 Main Street, Downtown",
            distance: "0.8 miles",
            phone: "(555) 123-4567",
            rating: 4.8,
            reviewCount: 142,
            image: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=400&h=250&fit=crop",
            services: ["Injectable PrEP", "Daily PrEP", "PEP", "HIV Testing"],
            specialties: ["LGBTQ+ Friendly", "Same-Day Appointments"],
            nextAvailable: "July 2, 2024",
            priceRange: "$$",
            availableSlots: 8,
            isPrimary: true
        },
        {
            id: 2,
            name: "Rainbow Health Services",
            type: "LGBTQ+ Specialized Clinic",
            address: "456 Pride Avenue, Midtown",
            distance: "1.2 miles",
            phone: "(555) 234-5678",
            rating: 4.9,
            reviewCount: 89,
            image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=250&fit=crop",
            services: ["Injectable PrEP", "Daily PrEP", "Mental Health"],
            specialties: ["LGBTQ+ Specialized", "Transgender Care"],
            nextAvailable: "June 30, 2024",
            priceRange: "$$$",
            availableSlots: 12,
            isPrimary: false
        },
        {
            id: 3,
            name: "University Medical Center",
            type: "Hospital System",
            address: "789 University Drive, Medical District",
            distance: "2.1 miles",
            phone: "(555) 345-6789",
            rating: 4.6,
            reviewCount: 203,
            image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=250&fit=crop",
            services: ["Injectable PrEP", "Daily PrEP", "Research Studies"],
            specialties: ["Research Participation", "Specialist Care"],
            nextAvailable: "July 8, 2024",
            priceRange: "$$$",
            availableSlots: 5,
            isPrimary: false
        },
        {
            id: 4,
            name: "Planned Parenthood Central",
            type: "Reproductive Health Clinic",
            address: "321 Health Plaza, Central District",
            distance: "2.8 miles",
            phone: "(555) 456-7890",
            rating: 4.7,
            reviewCount: 156,
            image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop",
            services: ["Daily PrEP", "PEP", "HIV Testing", "STI Testing"],
            specialties: ["Reproductive Health", "Youth Services"],
            nextAvailable: "July 1, 2024",
            priceRange: "$$",
            availableSlots: 15,
            isPrimary: false
        },
        {
            id: 5,
            name: "Metro Public Health",
            type: "Public Health Clinic",
            address: "654 Government Way, City Center",
            distance: "3.5 miles",
            phone: "(555) 567-8901",
            rating: 4.3,
            reviewCount: 97,
            image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=250&fit=crop",
            services: ["Daily PrEP", "PEP", "HIV Testing"],
            specialties: ["Free Services", "Multi-language Support"],
            nextAvailable: "July 5, 2024",
            priceRange: "$",
            availableSlots: 20,
            isPrimary: false
        },
        {
            id: 6,
            name: "Pride Health Express",
            type: "Mobile Health Unit",
            address: "Various Locations",
            distance: "Mobile Service",
            phone: "(555) 678-9012",
            rating: 4.5,
            reviewCount: 67,
            image: "https://images.unsplash.com/photo-1563213126-a4273aed2016?w=400&h=250&fit=crop",
            services: ["Daily PrEP", "HIV Testing", "STI Testing"],
            specialties: ["Mobile Service", "Community Events"],
            nextAvailable: "June 29, 2024",
            priceRange: "$",
            availableSlots: 25,
            isPrimary: false
        }
    ];

    const filteredFacilities = facilities.filter(facility => {
        const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            facility.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            facility.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()));

        // const matchesFilter = selectedFilter === 'all' ||
        //     (selectedFilter === 'injectable' && facility.services.some(s => s.includes('Injectable'))) ||
        //     (selectedFilter === 'lgbtq' && facility.specialties.some(s => s.includes('LGBTQ+'))) ||
        //     (selectedFilter === 'sameday' && facility.specialties.some(s => s.includes('Same-Day'))) ||
        //     (selectedFilter === 'free' && facility.priceRange === '$');

        return matchesSearch
    });

    const FacilityCard = ({ facility }: { facility: FacilityInterface }) => (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
            onClick={() => setSelectedService(facility)}

        >
            <div className="relative">
                <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 shadow-md">
                    <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs font-medium">{facility.rating}</span>
                    </div>
                </div>
                <div className="absolute bottom-3 left-3 bg-white rounded-full px-3 py-1 shadow-md">
                    <span className="text-xs font-medium text-slate-700">{facility.distance}</span>
                </div>
            </div>

            <div className="p-4">
                <div className="mb-3">
                    <h3 className="font-semibold text-slate-900  mb-1 group-hover:text-blue-600 transition-colors">
                        {facility.name}
                    </h3>
                    <div className="flex items-center  space-x-2 text-[12px] text-slate-500">
                        <span>{facility.address.split(',')[0]}</span>
                        <p className="text-[12px] text-slate-600">{facility.type}</p>

                    </div>
                </div>

            </div>
        </div>
    );

    const [selectedService, setSelectedService] = useState<FacilityInterface | null>(null);


    return (
        <div className="space-y-8">
            {/* Hero Search Section */}
            <div className="text-center py-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Find PrEP Providers Near You</h1>
                <p className="text-slate-600 mb-6">Discover trusted healthcare facilities offering PrEP services in your area</p>

                <div className="max-w-2xl mx-auto bg-white rounded-full shadow-lg p-2">
                    <div className="flex items-center space-x-4">
                        <div className="flex-1 flex items-center space-x-3 px-4">
                            <Search className="h-5 w-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by location, service, or provider name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full py-3 text-slate-700 placeholder-slate-500 bg-transparent focus:outline-none"
                            />
                        </div>
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors font-medium">
                            Search
                        </button>
                    </div>
                </div>
            </div>


            {/* Results Header */}
            <div className="flex items-center justify-between">
                <p className="text-slate-700">
                    <span className="font-semibold">{filteredFacilities.length} providers</span> found in your area
                </p>
                <div className="flex items-center space-x-3">
                    <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500">
                        <option>Sort by distance</option>
                        <option>Sort by rating</option>
                        <option>Sort by availability</option>
                        <option>Sort by price</option>
                    </select>
                    <button
                        onClick={() => setShowMapView(!showMapView)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${showMapView
                            ? 'bg-slate-900 text-white'
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                            }`}
                    >
                        {showMapView ? 'Show list' : 'Show map'}
                    </button>
                </div>
            </div>

            {/* Map View */}
            {showMapView && (
                <div className="bg-slate-100 rounded-2xl h-96 flex items-center justify-center">
                    <div className="text-center">
                        <MapPin className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-700 mb-2">Interactive Map View</h3>
                        <p className="text-slate-500">Map showing {filteredFacilities.length} PrEP providers within 5 miles</p>
                    </div>
                </div>
            )}

            {/* Facilities Grid */}
            {!showMapView && (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredFacilities.map((facility) => (

                        <FacilityCard key={facility.id} facility={facility} />

                    ))}
                </div>
            )}


            {/* Service Detail Modal */}
            {selectedService && (
                <FacilityModal service={selectedService} onClose={() => setSelectedService(null)} />
            )}
        </div>
    )
}

export default Facilities