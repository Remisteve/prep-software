import { MedicationInterface } from "@/components/custom/Tabs/AdminMedication";

// Sample medication data list
export const medicationData: MedicationInterface[] = [
    {
        id: "MED001",
        frequency: "Once daily",
        date: "2025-06-15",
        Doctor: {
            id: "DOC001",
            name: "Dr. Sarah Johnson",
            email: ''
        },
        Patient: {
            id: "PAT001",
            name: "John Smith",
            age: 45,
            email: ''
        },
        medicineName: "Lisinopril",
        dosage: "10mg",
        status: "Active",
        createdAt: "2025-06-15T08:30:00Z",
        nextFollowUp: "2025-07-15"
    },
    {
        id: "MED002",
        frequency: "Twice daily",
        date: "2025-06-20",
        Doctor: {
            id: "DOC002",
            name: "Dr. Michael Chen",
            email: ''
        },
        Patient: {
            id: "PAT002",
            name: "Maria Garcia",
            age: 52,
            email: ''
        },
        medicineName: "Metformin",
        dosage: "500mg",
        status: "Active",
        createdAt: "2025-06-20T10:15:00Z",
        nextFollowUp: "2025-09-20"
    },

    {
        id: "MED007",
        frequency: "Once daily at bedtime",
        date: "2025-06-22",
        Doctor: {
            id: "DOC007",
            name: "Dr. Rachel Green",
            email: ''
        },
        Patient: {
            id: "PAT007",
            name: "Christopher Lee",
            age: 35,
            email: ''
        },
        medicineName: "Gabapentin",
        dosage: "300mg",
        status: "Discontinued",
        createdAt: "2025-06-22T13:15:00Z",
        nextFollowUp: "2025-07-22"
    },



    {
        id: "MED012",
        frequency: "Once daily in morning",
        date: "2025-06-21",
        Doctor: {
            id: "DOC011",
            name: "Dr. Benjamin Harris",
            email: ''
        },
        Patient: {
            id: "PAT012",
            name: "Karen Rodriguez",
            age: 44,
            email: ''
        },
        medicineName: "Naproxen",
        dosage: "500mg",
        status: "Active",
        createdAt: "2025-06-21T11:45:00Z",
        nextFollowUp: "2025-07-21"
    }
];
