import { ElementType } from "react";

// Define types for nested objects
type Facility = {
    name: string;
    distance: string;
    rating: number;
};

type Benefit = {
    title: string;
    description: string;
    icon: ElementType; // Or a broader icon type if needed
};

// Main Program Type
export type ProgramInterface = {
    id: number;
    name: string;
    shortName: string;
    category: string;
    icon: ElementType;
    description: string;
    memberCount: number;
    isEnrolled: boolean;
    enrollmentDate?: string; // could be Date if parsed
    status: 'available' | 'inactive' | 'pending' | 'active'; // if other states exist, add them
    popularity: 'high' | 'medium' | 'low' | 'critical'; // same as above

    rating: number;
    duration: string;
    facilities: Facility[];
    benefits: Benefit[];
    requirements: string[];
    nextSteps: string[];
};
