'use client'

import UserSearch from '@/components/custom/search/UserSearch'
import React, { useMemo, useState } from 'react'
import { Errors, Patient } from '../../lab-requests/add/page';
import SelectInput from '@/components/custom/forms/SelectInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';



const AddMedicationPage = () => {

    const [user, setUser] = useState<Patient | undefined>();
    const { data: session } = useSession()

    // UI state
    const [errors, setErrors] = useState<Errors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [apiError, setApiError] = useState('');

    const [frequency, setFrequency] = useState('1 month')
    const [date, setDate] = useState('')

    const inputValues = useMemo(() => ({
        frequency,
        date,
        Doctor: {
            id: session?.user.id,
            email: session?.user.email,
            name: session?.user.name,
            image: session?.user.image,

        },
        patientID: user?.id
    }), [frequency, date, user])



    const handleSubmit = async () => {
        // if (!validateForm()) {
        //     return;
        // }

        try {
            setIsLoading(true);
            setApiError('');

            const res = await fetch('/api/medication', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputValues)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to create lab test');
            }

            setShowSuccess(true);



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
        <div
            className='bg-slate-50 p-8 flex justify-center items-center h-screen'
        >
            <div className='w-1/2 bg-white p-6 border rounded-lg space-y-6'>
                <UserSearch setUser={setUser} />
                <SelectInput
                    label='Frequency'
                    placeholder='Select frequency'
                    value={frequency}
                    onChange={setFrequency}
                    data={[
                        {
                            id: '1 month',
                            label: '1 month'
                        },
                        {
                            id: '6 month',
                            label: '6 month'
                        }
                    ]}
                />

                <div>
                    <label htmlFor="">Date</label>
                    <Input type='date' value={date} onChange={e => setDate(e.target.value)} />
                </div>
                <Button
                    onClick={() => handleSubmit()}
                    disabled={isLoading}
                    className='bg-teal-600'
                >
                    {isLoading && <Loader2 className='animate-spin' />}
                    Save</Button>
            </div>
        </div>
    )
}

export default AddMedicationPage