/* eslint-disable @typescript-eslint/no-unused-vars */
import { Patient } from '@/app/admin/lab/add/page';
import { Download, Edit, Eye, Search, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'


const getRiskLevelColor = (risk: string) => {
    switch (risk) {
        case 'low': return 'bg-green-100 text-green-800';
        case 'medium': return 'bg-yellow-100 text-yellow-800';
        case 'high': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const UsersList = () => {
    const [users, setUsers] = useState<Patient[]>()
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [gender, setGender] = useState('male')


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true); // Set loading to true before fetching
                const res = await fetch(`/api/users/get?search=${encodeURIComponent(search)}&gender=${encodeURIComponent(gender)}`, {
                    method: 'GET',
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch users');
                }

                const data = await res.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setIsLoading(false); // Ensure loading is set to false after fetch
            }
        };

        fetchUsers();
    }, [gender, search]);
    return (
        <>
            {/* Search and Filter */}
            <div className="flex space-x-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="all">All Users</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="high_risk">High Risk</option>
                </select>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users?.map((user) => (
                            <tr key={user?.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                                        <div className="text-sm text-gray-500">{user?.email}</div>
                                        {/* <div className="text-sm text-gray-500">{user?.phone}</div> */}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {/* <div className="text-sm text-gray-900">{user?.prepProgram}</div>
                                    <div className="text-sm text-gray-500">{user?.provider}</div> */}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {/* <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskLevelColor(user?.riskLevel)}`}>
                                        {user?.riskLevel?.toUpperCase()}
                                    </span> */}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {/* <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user?.status)}`}> */}
                                    {/* {user?.status?.toUpperCase()} */}
                                    {/* </span> */}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {/* {new Date(user?.lastActive).toLocaleDateString()} */}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                    <button className="text-blue-600 hover:text-blue-900">
                                        <Eye className="h-4 w-4" />
                                    </button>
                                    <button className="text-indigo-600 hover:text-indigo-900">
                                        <Edit className="h-4 w-4" />
                                    </button>
                                    <button className="text-red-600 hover:text-red-900">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default UsersList