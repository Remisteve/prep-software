import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Search,
    Plus,
    Calendar,
    User,
    FileText,
    Clock,
    AlertTriangle,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Eye,
    Download,
    Flag,
    X
} from 'lucide-react';
import { LabInterface } from '@/app/admin/page';

const Lab2 = ({ labResults }: { labResults: LabInterface[] }) => {
    const router = useRouter();
    const [selectedLab, setSelectedLab] = useState<LabInterface | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');

    console.log(labResults, 'labresuts')

    // Pagination logic
    // const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
    // const startIndex = (currentPage - 1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'pending_review':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-slate-100 text-slate-800 border-slate-200';
        }
    };

    const getPriorityIcon = (priority: string) => {
        switch (priority.toLowerCase()) {
            case 'urgent':
                return <AlertTriangle className="w-4 h-4 text-orange-500" />;
            case 'stat':
                return <AlertTriangle className="w-4 h-4 text-red-500" />;
            default:
                return <Clock className="w-4 h-4 text-slate-500" />;
        }
    };

    const handleRowClick = (lab: LabInterface) => {
        setSelectedLab(lab);
    };

    const clearSelection = () => {
        setSelectedLab(null);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setSelectedLab(null); // Clear selection when changing pages
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">Lab Results Management</h1>
                        <p className="text-slate-500 text-[14px] mt-1">Monitor and review laboratory test results</p>
                    </div>
                    <Button
                        onClick={() => router.push('/admin/lab/add')}
                        className="bg-teal-600 hover:bg-teal-700 text-white shadow-sm"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        New Test
                    </Button>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative flex-1 min-w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <Input
                            placeholder="Search patients, test names, or IDs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="pending_review">Pending Review</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Priority</option>
                        <option value="routine">Routine</option>
                        <option value="urgent">Urgent</option>
                        <option value="stat">STAT</option>
                    </select>
                </div>

                {/* Results Summary */}
                <div className="mt-4 text-sm text-slate-600">
                    {/* Showing {startIndex + 1}-{Math.min(endIndex, filteredResults.length)} of {filteredResults.length} results */}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex gap-4">
                {/* Table Section */}
                <div className={`transition-all duration-300 ${selectedLab ? 'w-2/3' : 'w-full'}`}>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                            Patient
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                            Test Details
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                            Result
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                            Order Date
                                        </th>

                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200">
                                    {labResults?.map((lab) => (
                                        <tr
                                            key={lab.id}
                                            onClick={() => handleRowClick(lab)}
                                            className={`
                          cursor-pointer transition-all duration-200 hover:bg-slate-50
                          ${lab.flagged ? 'bg-red-50 hover:bg-red-100' : ''}
                          ${selectedLab?.id === lab.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}
                        `}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center">
                                                            <User className="h-5 w-5 text-slate-500" />
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-slate-900 flex items-center">
                                                            {lab.Patient?.name}
                                                            {lab.flagged && <Flag className="w-4 h-4 text-red-500 ml-2" />}
                                                        </div>
                                                        <div className="text-sm text-slate-500">{lab?.Patient?.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {getPriorityIcon(lab.priority)}
                                                    <div className="ml-2">
                                                        <div className="text-sm font-medium text-slate-900">{lab.testName}</div>
                                                        <div className="text-xs text-slate-500">{lab.priority} Priority</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-slate-900 font-medium">{lab.result || 'Pending'}</div>
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center text-sm text-slate-500">
                                                    <Calendar className="w-4 h-4 mr-2" />
                                                    {new Date(lab.date).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center space-x-2">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleRowClick(lab);
                                                        }}
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            // Handle download
                                                        }}
                                                    >
                                                        <Download className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="bg-white px-6 py-4 border-t border-slate-200">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-slate-700">
                                    Page {currentPage} of {10}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        Previous
                                    </Button>

                                    {/* Page Numbers */}
                                    <div className="flex space-x-1">
                                        {/* {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                                let pageNum;
                                                if (totalPages <= 5) {
                                                    pageNum = i + 1;
                                                } else if (currentPage <= 3) {
                                                    pageNum = i + 1;
                                                } else if (currentPage >= totalPages - 2) {
                                                    pageNum = totalPages - 4 + i;
                                                } else {
                                                    pageNum = currentPage - 2 + i;
                                                }

                                                return (
                                                    <Button
                                                        key={pageNum}
                                                        variant={currentPage === pageNum ? "default" : "outline"}
                                                        size="sm"
                                                        onClick={() => handlePageChange(pageNum)}
                                                        className="w-8 h-8 p-0"
                                                    >
                                                        {pageNum}
                                                    </Button>
                                                );
                                            })} */}
                                    </div>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                    // disabled={currentPage === totalPages}
                                    >
                                        Next
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detail Panel */}
                <div className={`transition-all duration-300 ${selectedLab ? 'w-1/3' : 'w-0 overflow-hidden'}`}>
                    {selectedLab && (
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 h-fit animate-in slide-in-from-right duration-300">
                            <div className="p-4">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-slate-900">Test Details</h3>

                                    {/* Actions */}
                                    <div className="flex space-x-2">
                                        <Button size="icon" className="flex-1">
                                            <Download className="w-4 h-4 " />
                                        </Button>
                                        <Button size="icon" variant="ghost" className="flex-1">
                                            <FileText className="w-4 h-4 " />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={clearSelection}
                                            className="text-slate-400 hover:text-slate-600"
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>



                                {/* Test Info */}
                                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                                    <div className="flex items-center mb-3">
                                        <FileText className="w-5 h-5 text-blue-500 mr-2" />
                                        <span className="font-medium text-slate-900">Test Information</span>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div><span className="font-medium">Test:</span> {selectedLab.testName}</div>
                                        <div><span className="font-medium">Priority:</span> {selectedLab.priority}</div>
                                        <div className="flex items-center">
                                            <span className="font-medium mr-2">Status:</span>
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedLab.status)}`}>
                                                {selectedLab.status.replace('_', ' ').toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Results */}
                                <div className="mb-6 p-4 bg-green-50 rounded-lg">
                                    <div className="flex items-center mb-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                        <span className="font-medium text-slate-900">Results</span>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div><span className="font-medium">Result:</span> {selectedLab.result || 'Pending'}</div>
                                        <div><span className="font-medium">Order Date:</span> {new Date(selectedLab.date).toLocaleDateString()}</div>
                                        {selectedLab.resultDate && (
                                            <div><span className="font-medium">Result Date:</span> {new Date(selectedLab.resultDate).toLocaleDateString()}</div>
                                        )}
                                    </div>
                                </div>

                                {/* Notes */}
                                {selectedLab.notes && (
                                    <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
                                        <div className="flex items-center mb-3">
                                            <FileText className="w-5 h-5 text-yellow-500 mr-2" />
                                            <span className="font-medium text-slate-900">Notes</span>
                                        </div>
                                        <p className="text-sm text-slate-700">{selectedLab.notes}</p>
                                    </div>
                                )}


                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Lab2;