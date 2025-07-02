import React from 'react';
import {
    Clock,
    Check,
    Plus
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';



interface LabResults {
    id: string;
    testName: string;
    date: string;
    resultDate: string;
    status: 'processing' | 'sample_received' | 'pending_collection' | 'completed';
    urgency: string;
    orderedBy: string;
    facility: string;
    description: string;
    instructions: string;
    result?: string;
    normalRange?: string;
    isNormal: boolean;
}





const labResults: LabResults[] = [
    {
        id: 'LAB001',
        testName: 'HIV Antibody Test',
        date: '2024-06-25',
        resultDate: '2024-06-28',
        status: 'processing',
        urgency: 'routine',
        orderedBy: 'Dr. Sarah Wilson',
        facility: 'Downtown Health Clinic',
        description: 'Routine HIV screening for PrEP monitoring',
        instructions: '',
        isNormal: false
    },
    {
        id: 'LAB002',
        testName: 'Comprehensive Metabolic Panel',
        date: '2024-06-25',
        resultDate: '2024-06-28',
        status: 'sample_received',
        urgency: 'routine',
        orderedBy: 'Dr. Sarah Wilson',
        facility: 'Downtown Health Clinic',
        description: 'Kidney function monitoring for Injectable PrEP',
        instructions: '',
        isNormal: false
    },
    {
        id: 'LAB003',
        testName: 'STI Panel (Chlamydia, Gonorrhea, Syphilis)',
        date: '2024-06-24',
        resultDate: '2024-06-29',
        status: 'pending_collection',
        urgency: 'routine',
        orderedBy: 'Dr. Sarah Wilson',
        facility: 'Downtown Health Clinic',
        description: 'Comprehensive STI screening',
        instructions: '',
        isNormal: false
    },
    {
        id: 'LAB004',
        testName: 'HIV Antibody Test',
        date: '2024-06-15',
        resultDate: '2024-06-10',
        status: 'completed',
        result: 'Negative',
        urgency: 'routine',
        orderedBy: 'Dr. Sarah Wilson',
        facility: 'Downtown Health Clinic',
        normalRange: 'Negative',
        isNormal: true,
        description: 'Routine HIV screening for PrEP monitoring',
        instructions: ''
    },
    {
        id: 'LAB005',
        testName: 'Creatinine',
        date: '2024-06-15',
        resultDate: '2024-06-10',
        status: 'completed',
        result: '0.9 mg/dL',
        urgency: 'routine',
        orderedBy: 'Dr. Sarah Wilson',
        facility: 'Downtown Health Clinic',
        normalRange: '0.7-1.3 mg/dL',
        isNormal: true,
        description: 'Kidney function monitoring',
        instructions: ''
    },
    {
        id: 'LAB006',
        testName: 'Hepatitis B Surface Antigen',
        date: '2024-05-20',
        resultDate: '2024-05-15',
        status: 'completed',
        result: 'Negative',
        urgency: 'routine',
        orderedBy: 'Dr. Sarah Wilson',
        facility: 'Downtown Health Clinic',
        normalRange: 'Negative',
        isNormal: true,
        description: 'Hepatitis B screening',
        instructions: ''
    }
]





const Lab = () => {
    const router = useRouter()

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Lab Results</h2>
                    <p className="text-gray-600">Track your test results and upcoming lab appointments</p>
                </div>
                <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    onClick={() => router.push('/admin/lab/add')}
                >
                    <Plus className="h-4 w-4" />
                    <span>Request Test</span>
                </Button>
            </div>



            {/* Pending Results Section */}
            <div>
                <div className="flex items-center space-x-3 mb-4">
                    <Clock className="h-6 w-6 text-yellow-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Waiting for Results</h3>
                    {labResults.length > 0 && (
                        <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2 py-1 rounded-full">
                            {labResults.length} pending
                        </span>
                    )}
                </div>

                {labResults.length > 0 ? (
                    <div className="space-y-4">
                        {labResults.map((test) => (
                            <div key={test.id} className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h4 className="text-lg font-semibold text-gray-900">{test.testName}</h4>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${test.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                                                test.status === 'sample_received' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                {test.status.replace('_', ' ').toUpperCase()}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-2">{test.description}</p>
                                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                                            <div>
                                                <span className="font-medium text-gray-700">Ordered:</span>
                                                <p className="text-gray-600">{new Date(test.date).toLocaleDateString()}</p>
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-700">Expected Results:</span>
                                                <p className="text-gray-600">{new Date(test.resultDate).toLocaleDateString()}</p>
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-700">Provider:</span>
                                                <p className="text-gray-600">{test.orderedBy}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500 mb-2">Test ID: {test.id}</div>
                                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                            Track Status
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <Clock className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <p>No pending test results</p>
                    </div>
                )}
            </div>

            {/* Recent Results Section */}
            <div>
                <div className="flex items-center space-x-3 mb-4">
                    <Check className="h-6 w-6 text-green-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Recent Results</h3>
                </div>

                {/* <div className="space-y-4">
                    {labResults.recent.map((test) => (
                        <div key={test.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h4 className="text-lg font-semibold text-gray-900">{test.testName}</h4>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${test.isNormal ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            {test.isNormal ? 'NORMAL' : 'ABNORMAL'}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-3">{test.description}</p>
                                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                                        <div>
                                            <span className="font-medium text-gray-700">Result:</span>
                                            <p className={`font-semibold ${test.isNormal ? 'text-green-700' : 'text-red-700'}`}>
                                                {test.result}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700">Normal Range:</span>
                                            <p className="text-gray-600">{test.normalRange}</p>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700">Result Date:</span>
                                            <p className="text-gray-600">{new Date(test.resultDate).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700">Provider:</span>
                                            <p className="text-gray-600">{test.orderedBy}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
                                        <Eye className="h-4 w-4" />
                                        <span>View Details</span>
                                    </button>
                                    <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 text-sm font-medium">
                                        <Download className="h-4 w-4" />
                                        <span>Download PDF</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> */}
            </div>

        </div>
    );
};

export default Lab;