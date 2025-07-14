
// Appointment Interface
export interface AppointmentInterface {
    id: string;
    patientName: string;
    patientEmail: string;
    appointmentType: string;
    provider: string;
    facility: string;
    date: string;
    time: string;
    status: 'upcoming' | 'completed' | 'cancelled' | 'pending';
    mode: 'in-person' | 'video';
    duration: string;
    notes?: string;
    phone: string;
}
