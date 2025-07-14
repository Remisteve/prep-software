// User Interface
export interface UserInterface {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: 'admin' | 'doctor' | 'nurse' | 'patient' | 'staff';
    status: 'active' | 'inactive' | 'suspended';
    registrationDate: string;
    lastLogin: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
    };
    profile: {
        avatar?: string;
        dateOfBirth: string;
        gender: 'male' | 'female' | 'other';
        emergencyContact: string;
    };
    permissions: string[];
    activity: {
        appointmentsCount: number;
        loginCount: number;
        lastActivity: string;
    };
    notes?: string;
}