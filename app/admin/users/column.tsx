import { UserInterface } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { Edit3, Eye, Trash2, User } from "lucide-react";

// Table Column Definitions
export const userColumns: ColumnDef<UserInterface>[] = [
    {
        accessorKey: 'id',
        header: 'User ID',
        cell: ({ row }: any) => (
            <div className="font-medium text-white">{row.original.id}</div>
        )
    },
    {
        accessorKey: 'name',
        header: 'Name & Role',
        cell: ({ row }: any) => {
            const user = row.original;
            const getRoleColor = (role: string) => {
                switch (role) {
                    case 'admin': return 'from-red-500 to-pink-500';
                    case 'doctor': return 'from-blue-500 to-cyan-500';
                    case 'nurse': return 'from-green-500 to-emerald-500';
                    case 'patient': return 'from-purple-500 to-indigo-500';
                    case 'staff': return 'from-orange-500 to-yellow-500';
                    default: return 'from-gray-500 to-gray-600';
                }
            };

            return (
                <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 bg-gradient-to-br ${getRoleColor(user.role)} rounded-lg flex items-center justify-center`}>
                        <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <div className="font-medium text-white">{user.name}</div>
                        <div className="text-sm text-blue-400 capitalize">{user.role}</div>
                    </div>
                </div>
            );
        }
    },
    {
        accessorKey: 'email',
        header: 'Contact',
        cell: ({ row }: any) => (
            <div>
                <div className="text-white text-sm">{row.original.email}</div>
                <div className="text-gray-400 text-xs">{row.original.phone}</div>
            </div>
        )
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }: any) => {
            const status = row.original.status;
            const getStatusStyle = (status: string) => {
                switch (status) {
                    case 'active':
                        return 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400';
                    case 'inactive':
                        return 'bg-gray-500/20 border-gray-500/30 text-gray-400';
                    case 'suspended':
                        return 'bg-red-500/20 border-red-500/30 text-red-400';
                    default:
                        return 'bg-gray-500/20 border-gray-500/30 text-gray-400';
                }
            };

            return (
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusStyle(status)} capitalize`}>
                    {status}
                </span>
            );
        }
    },
    {
        accessorKey: 'registrationDate',
        header: 'Registration',
        cell: ({ row }: any) => (
            <div className="text-gray-300 text-sm">
                {new Date(row.original.registrationDate).toLocaleDateString()}
            </div>
        )
    },
    {
        accessorKey: 'lastLogin',
        header: 'Last Login',
        cell: ({ row }: any) => (
            <div className="text-gray-300 text-sm">
                {new Date(row.original.lastLogin).toLocaleDateString()}
            </div>
        )
    }
];