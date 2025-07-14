export interface HospitalInterface {
  id: string;
  name: string;
  type: string;
  cccNumber: string;
  active: boolean;
  registrationDate: string; // Consider using Date if dates are parsed
  lastUpdated: string;      // Same here
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contact: {
    mainPhone: string;
    emergencyPhone: string;
    email: string;
    website: string;
  };
  photos: number;
  adminNotes: string;
  kpis: {
    performanceScore: number;
    registeredPatients: number;
    drugsDispensed: number;
    monthlyGrowth: number;
  };
}

export type SortKey = 'name' | 'address.city' | 'kpis.performanceScore' | 'registrationDate' | 'active';

