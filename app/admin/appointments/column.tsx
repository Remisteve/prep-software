import { AppointmentInterface } from "@/types/appointment";
import { ColumnDef } from "@tanstack/react-table";
import { AlertTriangle, Building2, Calendar, Heart, Shield, Stethoscope, User, Video } from "lucide-react";

// Table Column Definitions
export const appointmentColumns: ColumnDef<AppointmentInterface>[] = [
    {
        accessorKey: 'patient',
        header: 'Patient Info',
        cell: ({ row }: any) => {
            const appointment = row.original;
            return (
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <div className="font-medium text-white">{appointment.patientName}</div>
                        <div className="text-sm text-gray-400">{appointment.patientEmail}</div>
                    </div>
                </div>
            );
        }
    },
    {
        accessorKey: 'appointment',
        header: 'Appointment Details',
        cell: ({ row }: any) => {
            const appointment = row.original;
            const getTypeIcon = (type: string) => {
                switch (type.toLowerCase()) {
                    case 'prep consultation': return <Shield className="w-4 h-4 text-blue-400" />;
                    case 'mental health session': return <Heart className="w-4 h-4 text-pink-400" />;
                    case 'general checkup': return <Stethoscope className="w-4 h-4 text-green-400" />;
                    case 'emergency consultation': return <AlertTriangle className="w-4 h-4 text-red-400" />;
                    default: return <Calendar className="w-4 h-4 text-blue-400" />;
                }
            };

            return (
                <div className="flex items-center space-x-2">
                    {getTypeIcon(appointment.appointmentType)}
                    <div>
                        <div className="font-medium text-white text-sm">{appointment.appointmentType}</div>
                        <div className="text-xs text-gray-400">{appointment.duration}</div>
                    </div>
                </div>
            );
        }
    },
    {
        accessorKey: 'provider',
        header: 'Provider & Facility',
        cell: ({ row }: any) => (
            <div>
                <div className="text-white text-sm font-medium">{row.original.provider}</div>
                <div className="text-gray-400 text-xs">{row.original.facility}</div>
            </div>
        )
    },
    {
        accessorKey: 'datetime',
        header: 'Date & Time',
        cell: ({ row }: any) => {
            const appointment = row.original;
            const appointmentDate = new Date(appointment.date);
            return (
                <div>
                    <div className="text-white text-sm">
                        {appointmentDate.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </div>
                    <div className="text-gray-400 text-xs">{appointment.time}</div>
                </div>
            );
        }
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }: any) => {
            const status = row.original.status;
            const getStatusStyle = (status: string) => {
                switch (status) {
                    case 'upcoming':
                        return 'bg-blue-500/20 border-blue-500/30 text-blue-400';
                    case 'completed':
                        return 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400';
                    case 'cancelled':
                        return 'bg-red-500/20 border-red-500/30 text-red-400';
                    case 'pending':
                        return 'bg-amber-500/20 border-amber-500/30 text-amber-400';
                    default:
                        return 'bg-gray-500/20 border-gray-500/30 text-gray-400';
                }
            };

            return (
                <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusStyle(status)} capitalize`}>
                    {status}
                </span>
            );
        }
    },
    {
        accessorKey: 'mode',
        header: 'Mode',
        cell: ({ row }: any) => {
            const mode = row.original.mode;
            return (
                <div className="flex items-center space-x-2">
                    {mode === 'video' ? (
                        <>
                            <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/30">
                                <Video className="w-4 h-4 text-purple-400" />
                            </div>
                            <span className="text-sm text-purple-400 font-medium">Virtual</span>
                        </>
                    ) : (
                        <>
                            <div className="p-2 rounded-lg bg-orange-500/20 border border-orange-500/30">
                                <Building2 className="w-4 h-4 text-orange-400" />
                            </div>
                            <span className="text-sm text-orange-400 font-medium">Onsite</span>
                        </>
                    )}
                </div>
            );
        }
    }

];