'use client'

import SelectInput from '@/components/custom/forms/SelectInput'
import UserSearch from '@/components/custom/search/UserSearch'
import { Patient } from '@/components/custom/Tabs/AdminMedication'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useSession } from 'next-auth/react'
import React, { useMemo, useState } from 'react'
import { Errors } from '../../lab/add/page'

const AddAppointmentsPage = () => {
    const { data: session } = useSession()
    const [user, setUser] = useState<Patient>()
    const [date, setDate] = useState('')
    const [agenda, setAgenda] = useState('')

    const [errors, setErrors] = useState<Errors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [apiError, setApiError] = useState('');
    const [currentStep, setCurrentStep] = useState(1);

    const inputValues = useMemo(() => ({
        date,
        agenda,
        patientID: user?.id,
        status: 'upcoming',
        priority: 'medium',
        Doctor: {
            id: session?.user.id,
            email: session?.user.email,
            name: session?.user.name,
            image: session?.user.image

        }
    }), [date,])

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
        <div className='h-screen flex items-center justify-center bg-slate-50' >
            <div
                className='  rounded-xl w-1/2 bg-white shadow-xl '
            >
                <div className='p-6 border-b bg-gradient-to-r from-blue-600 rounded-t-xl to-indigo-600 '>
                    <h4 className='text-2xl font-bold text-white'>Create Patient Appointment</h4>
                    <p className='text-white'>Search Patient to create appointment</p>
                </div>
                <div className='space-y-6 p-6'>
                    <UserSearch setUser={setUser} />
                    <div>
                        <label htmlFor="" className='mb-1 text-[14px] font-semibold text-slate-900'>Date</label>
                        <Input type='date' value={date} onChange={e => setDate(e.target.value)} />
                    </div>
                    <SelectInput
                        label='Agenda'
                        value={agenda}
                        onChange={setAgenda}
                        data={[
                            {
                                id: 'consultation',
                                label: 'Consultation',
                            },
                            {
                                id: 'follow-up',
                                label: 'follow-up',
                            },
                            {
                                id: 'emergency',
                                label: 'Emergency',
                            }
                        ]} placeholder='Select agenda' />
                    <Textarea placeholder='Notes' />
                    <Button
                        className=' text-white w-full py-6 bg-gradient-to-r from-blue-600 rounded-xl to-indigo-600'
                        size={'lg'}
                        onClick={handleSubmit}
                    >Create Appointment</Button>
                </div>
            </div>
        </div>
    )
}

export default AddAppointmentsPage