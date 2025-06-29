import { AppointmentInterface, MedicationInterface } from '@/app/profile/page';
import { Plus } from 'lucide-react'
import React from 'react'


const getStatusColor = (status: string) => {
    switch (status) {
        case 'confirmed': case 'delivered': return 'text-green-600 bg-green-100';
        case 'pending': case 'in_transit': return 'text-yellow-600 bg-yellow-100';
        case 'scheduled': return 'text-blue-600 bg-blue-100';
        default: return 'text-gray-600 bg-gray-100';
    }
};


const Appointments = ({ medicationData, appointments }: {
    medicationData: MedicationInterface,
    appointments: AppointmentInterface[]

}) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Schedule New</span>
                </button>
            </div>

            {/* Next Injection */}
            <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-blue-900">Next Injection Appointment</h3>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${medicationData.nextInjection.daysUntil <= 7 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                        {medicationData.nextInjection.status.charAt(0).toUpperCase() + medicationData.nextInjection.status.slice(1)}
                    </span>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-blue-700">Date & Time</label>
                        <p className="text-blue-900 font-semibold">
                            {new Date(medicationData.nextInjection.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-blue-600">2:00 PM - 2:30 PM</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-blue-700">Provider</label>
                        <p className="text-blue-900">{medicationData.nextInjection.provider}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-blue-700">Location</label>
                        <p className="text-blue-900">{medicationData.nextInjection.location}</p>
                    </div>
                </div>
                <div className="mt-4 flex space-x-3">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                        Reschedule
                    </button>
                    <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
                        Add to Calendar
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {appointments.map((appointment, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="text-center">
                                    <p className="text-sm font-medium text-gray-900">
                                        {new Date(appointment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </p>
                                    <p className="text-xs text-gray-500">{appointment.time}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{appointment.service}</p>
                                    <p className="text-sm text-gray-500">Dr. Sarah Wilson</p>
                                </div>
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Appointments