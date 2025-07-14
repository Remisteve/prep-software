import { RequestInterface } from "@/types/requests";
import { ColumnDef } from "@tanstack/react-table";
import { Activity, ArrowRight, Building2, Calendar, CheckCircle, Clock, FileText, User, X } from "lucide-react";
import Link from "next/link";

const statusStyles = {
    pending: {
        bg: 'bg-amber-500/20',
        border: 'border-amber-400/30',
        text: 'text-amber-400',
        icon: 'text-amber-400'
    },
    approved: {
        bg: 'bg-emerald-500/20',
        border: 'border-emerald-400/30',
        text: 'text-emerald-400',
        icon: 'text-emerald-400'
    },
    rejected: {
        bg: 'bg-red-500/20',
        border: 'border-red-400/30',
        text: 'text-red-400',
        icon: 'text-red-400'
    },
    under_review: {
        bg: 'bg-blue-500/20',
        border: 'border-blue-400/30',
        text: 'text-blue-400',
        icon: 'text-blue-400'
    }
};
// User Avatar Component
const UserAvatar = ({ name, department }: { name: string; department?: string }) => {
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const getDepartmentColor = (dept?: string) => {
        if (!dept) return 'from-gray-500 to-gray-600';
        switch (dept.toLowerCase()) {
            case 'emergency medicine': return 'from-red-500 to-rose-500';
            case 'pediatrics': return 'from-pink-500 to-purple-500';
            case 'pharmacy': return 'from-green-500 to-emerald-500';
            case 'medical education': return 'from-blue-500 to-indigo-500';
            case 'laboratory': return 'from-yellow-500 to-orange-500';
            default: return 'from-gray-500 to-slate-500';
        }
    };

    return (
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getDepartmentColor(department)} 
            flex items-center justify-center text-white font-bold text-sm 
            shadow-lg border border-white/20 backdrop-blur-sm`}>
            {getInitials(name)}
        </div>
    );
};

// Status Icon Component
const StatusIcon = ({ status }: { status: string }) => {
    const style = statusStyles[status as keyof typeof statusStyles] || statusStyles.pending;

    switch (status) {
        case 'approved':
            return <CheckCircle className={`w-4 h-4 ${style.icon}`} />;
        case 'pending':
            return <Clock className={`w-4 h-4 ${style.icon}`} />;
        case 'rejected':
            return <X className={`w-4 h-4 ${style.icon}`} />;
        case 'under_review':
            return <Activity className={`w-4 h-4 ${style.icon}`} />;
        default:
            return <Clock className={`w-4 h-4 ${style.icon}`} />;
    }
};

// Enhanced Status Badge Component
function StatusBadge({ status, children, pulse = false }) {
    const style = statusStyles[status] || statusStyles.pending;
    return (
        <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full 
            ${style.bg} ${style.border} ${style.text} border backdrop-blur-sm
            ${pulse ? 'animate-pulse' : ''} transition-all duration-300 shadow-lg`}>
            {children}
        </span>
    );
}


// Request Columns Definition
const requestColumns: ColumnDef<RequestInterface>[] = [
    {
        accessorKey: 'user.name',
        header: () => (
            <div className="flex items-center gap-2 text-gray-300 font-semibold">
                <User className="w-4 h-4 text-blue-400" />
                <span>User Information</span>
            </div>
        ),
        cell: ({ row }) => {
            const { user } = row.original;
            return (
                <div className="flex items-center gap-3 group max-w-[280px]">
                    <UserAvatar name={user.name} department={user.department} />
                    <div className="flex flex-col min-w-0">
                        <Link
                            href={`/requests/${row.original.id}`}
                            className="text-sm font-semibold text-white hover:text-transparent 
                                hover:bg-gradient-to-r hover:from-blue-400 hover:to-cyan-600 
                                hover:bg-clip-text transition-all duration-300 flex items-center gap-1 group truncate"
                        >
                            <span className="truncate">{user.name}</span>
                            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 
                                group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                        </Link>
                        <p className="text-xs text-blue-400 truncate">{user.department}</p>
                        <p className="text-xs text-gray-400 font-mono">{user.employeeId}</p>
                    </div>
                </div>
            );
        },
        size: 280,
    },
    {
        accessorKey: 'status',
        header: () => (
            <div className="flex items-center gap-1 text-gray-300 font-semibold">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">Status</span>
            </div>
        ),
        cell: ({ row }) => (
            <StatusBadge status={row.original.status}>
                <StatusIcon status={row.original.status} />
                <span className="ml-2 capitalize hidden sm:inline">
                    {row.original.status.replace('_', ' ')}
                </span>
            </StatusBadge>
        ),
        size: 120,
    },
    {
        accessorKey: 'hospitalId',
        header: () => (
            <div className="flex items-center gap-1 text-gray-300 font-semibold">
                <Building2 className="w-4 h-4 text-purple-400" />
                <span className="hidden md:inline">Hospital</span>
            </div>
        ),
        cell: ({ row }) => (
            <div className="text-sm text-white font-medium max-w-[140px]">
                <div className="truncate">{row.original.hospitalId}</div>
            </div>
        ),
        size: 140,
    },
    {
        accessorKey: 'description',
        header: () => (
            <div className="flex items-center gap-1 text-gray-300 font-semibold">
                <FileText className="w-4 h-4 text-yellow-400" />
                <span className="hidden lg:inline">Description</span>
            </div>
        ),
        cell: ({ row }) => (
            <div className="text-sm text-gray-300 max-w-[200px]">
                <p className="truncate" title={row.original.description}>
                    {row.original.description}
                </p>
            </div>
        ),
        size: 200,
    },
    {
        accessorKey: 'dateRequested',
        header: () => (
            <div className="flex items-center gap-1 text-gray-300 font-semibold">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span className="hidden lg:inline">Requested</span>
            </div>
        ),
        cell: ({ row }) => {
            const date = new Date(row.original.dateRequested);
            const formatDate = (date: Date) => {
                return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: '2-digit'
                });
            };

            return (
                <div className="text-xs text-gray-300">
                    {formatDate(date)}
                </div>
            );
        },
        size: 100,
    },
    {
        accessorKey: 'dateApproved',
        header: () => (
            <div className="flex items-center gap-1 text-gray-300 font-semibold">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="hidden xl:inline">Approved</span>
            </div>
        ),
        cell: ({ row }) => {
            const { dateApproved } = row.original;
            if (!dateApproved) {
                return <span className="text-xs text-gray-500">Pending</span>;
            }
            const date = new Date(dateApproved);
            const formatDate = (date: Date) => {
                return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: '2-digit'
                });
            };

            return (
                <div className="text-xs text-green-400">
                    {formatDate(date)}
                </div>
            );
        },
        size: 100,
    },
    // {
    //     id: 'actions',
    //     header: () => (
    //         <div className="text-gray-300 font-semibold text-center">
    //             <span>Actions</span>
    //         </div>
    //     ),
    //     cell: ({ row }) => (
    //         <ActionsDropdown
    //             request={row.original}
    //             onView={(request) => {
    //                 // This will be handled by the parent component
    //             }}
    //         />
    //     ),
    //     size: 80,
    // },
];

export { requestColumns }
