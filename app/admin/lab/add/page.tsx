'use client'

import React, { useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SelectInput from '@/components/custom/forms/SelectInput';
import UserSearch from '@/components/custom/search/UserSearch';
import {
    Calendar,
    Loader2,
    CheckCircle,
    AlertCircle,
    User,
    FileText,
    Clock,
    AlertTriangle,
    Save,
    X,
    Plus
} from 'lucide-react';

interface TestOption {
    id: string;
    label: string;
}

interface LabInterface {
    id?: string;
    patientID: string;
    testName: string;
    date: string;
    routine: string;
    userID: string;
    result: string;
    status: string;
    notes: string;
    resultDate: string;
    priority: string;
    flagged: boolean;
}

const urgencyOptions = [
    { id: 'routine', label: 'Routine', color: 'bg-slate-100 text-slate-800', icon: Clock },
    { id: 'urgent', label: 'Urgent', color: 'bg-orange-100 text-orange-800', icon: AlertCircle },
    { id: 'stat', label: 'STAT', color: 'bg-red-100 text-red-800', icon: AlertTriangle }
];

const statusOptions = [
    { id: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'processing', label: 'Processing', color: 'bg-blue-100 text-blue-800' },
    { id: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
    { id: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' }
];

const commonTests: TestOption[] = [
    { id: 'HIV Antibody Test', label: 'HIV Antibody Test' },
    { id: 'Complete Blood Count (CBC)', label: 'Complete Blood Count (CBC)' },
    { id: 'Basic Metabolic Panel', label: 'Basic Metabolic Panel' },
    { id: 'Lipid Panel', label: 'Lipid Panel' },
    { id: 'Thyroid Function Test', label: 'Thyroid Function Test' },
    { id: 'Glucose Test', label: 'Glucose Test' },
    { id: 'Hepatitis Panel', label: 'Hepatitis Panel' },
    { id: 'Urinalysis', label: 'Urinalysis' },
    { id: 'Vitamin D Test', label: 'Vitamin D Test' },
    { id: 'PSA Test', label: 'PSA Test' }
];

// Patient type for selection
export interface Patient {
    id: string;
    name: string;
    email?: string;
    image?: string;
    photoURL?: string;
}

const LabTestForm = () => {
    const { data: session } = useSession();



    // Form state
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [testName, setTestName] = useState('');
    const [date, setDate] = useState('');
    const [urgency, setUrgency] = useState('routine');
    const [status, setStatus] = useState('pending');
    const [notes, setNotes] = useState('');
    const [resultDate, setResultDate] = useState('');
    const [user, setUser] = useState<Patient | undefined>();

    // UI state
    interface Errors {
        patient?: string;
        testName?: string;
        date?: string;
        resultDate?: string;
    }
    const [errors, setErrors] = useState<Errors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [apiError, setApiError] = useState('');
    const [currentStep, setCurrentStep] = useState(1);

    const steps = [
        { id: 1, title: 'Patient Selection', icon: User },
        { id: 2, title: 'Test Details', icon: FileText },
    ];

    console.log(selectedPatient, 'selectedP')

    const inputValues: LabInterface = useMemo(() => ({
        patientID: user?.id || '',
        testName,
        date,
        routine: urgency,
        userID: session?.user?.id || '',
        result: '',
        status,
        notes,
        resultDate,
        priority: urgency,
        flagged: urgency === 'stat'
    }), [session, user, testName, date, urgency, status, notes, resultDate]);


    const handleSubmit = async () => {
        // if (!validateForm()) {
        //     return;
        // }

        try {
            setIsLoading(true);
            setApiError('');

            const res = await fetch('/api/lab', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputValues)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to create lab test');
            }

            setShowSuccess(true);

            // Reset form after successful submission
            setTimeout(() => {
                resetForm();
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

    const resetForm = () => {
        setSelectedPatient(null);
        setTestName('');
        setDate('');
        setUrgency('routine');
        setStatus('pending');
        setNotes('');
        setResultDate('');
        setErrors({});
        setCurrentStep(1);
    };

    const handlePatientSelect = (patient: Patient) => {
        setSelectedPatient(patient);
        setErrors(prev => ({ ...prev, patient: '' }));
        if (currentStep === 1) {
            setCurrentStep(2);
        }
    };


    const isStepComplete = (step: number) => {
        switch (step) {
            case 1: return !!selectedPatient;
            case 2: return testName && date;
            case 3: return true;
            default: return false;
        }
    };

    const canProceedToStep = (step: number) => {
        switch (step) {
            case 2: return !!selectedPatient;
            case 3: return selectedPatient && testName && date;
            default: return true;
        }
    };



    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Lab Test Entry</h1>
                    <p className="text-slate-600">Create a new laboratory test order with patient details</p>
                </div>

                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-center space-x-4">
                        {steps.map((step, index) => {
                            const IconComponent = step.icon;
                            const isComplete = isStepComplete(step.id);
                            const isCurrent = currentStep === step.id;
                            const canAccess = canProceedToStep(step.id);

                            return (
                                <div key={step.id} className="flex items-center">
                                    <button
                                        onClick={() => canAccess && setCurrentStep(step.id)}
                                        disabled={!canAccess}
                                        className={`
                                            flex items-center justify-center w-12 h-12 rounded-full font-semibold text-sm transition-all
                                            ${isComplete
                                                ? 'bg-green-500 text-white shadow-lg'
                                                : isCurrent
                                                    ? 'bg-blue-500 text-white shadow-lg ring-4 ring-blue-100'
                                                    : canAccess
                                                        ? 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                                                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                            }
                                        `}
                                    >
                                        {isComplete ? (
                                            <CheckCircle size={20} />
                                        ) : (
                                            <IconComponent size={20} />
                                        )}
                                    </button>
                                    <div className="ml-3 text-left">
                                        <div className={`text-sm font-medium ${isCurrent ? 'text-blue-600' : 'text-slate-700'}`}>
                                            Step {step.id}
                                        </div>
                                        <div className="text-xs text-slate-500">{step.title}</div>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className="w-8 h-px bg-slate-300 mx-4"></div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Success Message */}
                {showSuccess && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            <div>
                                <h3 className="text-green-800 font-medium">Lab test created successfully!</h3>
                                <p className="text-green-700 text-sm">Test ID: {inputValues.id}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {apiError && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center">
                            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                            <div>
                                <h3 className="text-red-800 font-medium">Error creating lab test</h3>
                                <p className="text-red-700 text-sm">{apiError}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Form Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                    <div className="p-8">
                        {/* Step 1: Patient Selection */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div className="flex items-center mb-6">
                                    <User className="h-6 w-6 text-blue-500 mr-3" />
                                    <h2 className="text-xl font-semibold text-slate-900">Select Patient</h2>
                                </div>

                                <UserSearch setUser={setUser} handleSelect={handlePatientSelect} />

                                {selectedPatient && (
                                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-12 w-12">
                                                {selectedPatient.image || selectedPatient.photoURL ? (
                                                    <img
                                                        className="h-12 w-12 rounded-full object-cover"
                                                        src={selectedPatient.image || selectedPatient.photoURL}
                                                        alt={selectedPatient.name}
                                                    />
                                                ) : (
                                                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <span className="text-blue-600 font-medium">
                                                            {selectedPatient.name?.charAt(0)?.toUpperCase() || '?'}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="font-medium text-slate-900">Selected Patient</h3>
                                                <p className="text-slate-600">{selectedPatient.name}</p>
                                                <p className="text-sm text-slate-500">{selectedPatient.email}</p>
                                            </div>
                                            <button
                                                onClick={() => setSelectedPatient(null)}
                                                className="ml-auto text-slate-400 hover:text-slate-600"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {errors.patient && (
                                    <p className="text-red-500 text-sm mt-1">{errors.patient}</p>
                                )}
                            </div>
                        )}

                        {/* Step 2: Test Details */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div className="flex items-center mb-6">
                                    <FileText className="h-6 w-6 text-blue-500 mr-3" />
                                    <h2 className="text-xl font-semibold text-slate-900">Test Details</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <SelectInput
                                            label='Test Name *'
                                            data={commonTests || []}
                                            onChange={setTestName}
                                            value={testName}
                                        />
                                        {errors.testName && (
                                            <p className="text-red-500 text-sm mt-1">{errors.testName}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            <Calendar className="inline w-4 h-4 mr-1" />
                                            Test Date *
                                        </label>
                                        <Input
                                            type="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            className={`${errors.date ? 'border-red-500' : ''}`}
                                        />
                                        {errors.date && (
                                            <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Expected Result Date
                                        </label>
                                        <Input
                                            type="date"
                                            value={resultDate}
                                            onChange={(e) => setResultDate(e.target.value)}
                                            className={`${errors.resultDate ? 'border-red-500' : ''}`}
                                        />
                                        {errors.resultDate && (
                                            <p className="text-red-500 text-sm mt-1">{errors.resultDate}</p>
                                        )}
                                    </div>

                                    <div>
                                        <SelectInput
                                            label='Urgency Level'
                                            data={urgencyOptions || []}
                                            onChange={setUrgency}
                                            value={urgency}
                                        />
                                    </div>

                                    <div>
                                        <SelectInput
                                            label='Initial Status'
                                            data={statusOptions || []}
                                            onChange={setStatus}
                                            value={status}
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Notes (Optional)
                                        </label>
                                        <textarea
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Add any special instructions or notes..."
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Form Actions */}
                    <div className="px-8 py-6 bg-slate-50 border-t border-slate-200">
                        <div className="flex items-center justify-between">
                            <div className="flex space-x-3">
                                {currentStep > 1 && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setCurrentStep(currentStep - 1)}
                                        className="px-6"
                                    >
                                        Previous
                                    </Button>
                                )}
                            </div>

                            <div className="flex space-x-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={resetForm}
                                    className="px-6"
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Cancel
                                </Button>

                                {currentStep < 2 ? (
                                    <Button
                                        type="button"
                                        onClick={() => setCurrentStep(currentStep + 1)}
                                        // disabled={!canProceedToStep(currentStep + 1)}
                                        className="px-6 bg-blue-600 hover:bg-blue-700"
                                    >
                                        Next
                                        <Plus className="w-4 h-4 ml-2" />
                                    </Button>
                                ) : (
                                    <Button
                                        type="button"
                                        onClick={() => handleSubmit()}
                                        disabled={isLoading}
                                        className="px-6 bg-teal-600 hover:bg-teal-700"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Creating...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4 mr-2" />
                                                Create Lab Test
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LabTestForm;