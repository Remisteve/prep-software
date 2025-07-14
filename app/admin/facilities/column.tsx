import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import {
  Building2, TrendingUp, Calendar,
  Activity, Award, Users,
  Eye, MoreVertical
} from 'lucide-react';

// Hospital Interface
interface HospitalInterface {
  id: string;
  name: string;
  type: string;
  cccNumber: string;
  active: boolean;
  registrationDate: string;
  lastUpdated: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contact: {
    mainPhone: string;
    emergencyPhone: string;
    email: string;
    website: string;
  };
  photos: number;
  adminNotes: string;
  kpis: {
    performanceScore: number;
    registeredPatients: number;
    drugsDispensed: number;
    monthlyGrowth: number;
  };
}

// Status Badge Component
const StatusBadge = ({ active }: { active: boolean }) => (
  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${active
    ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
    : 'bg-red-500/20 border-red-500/30 text-red-400'
    }`}>
    <div className={`w-2 h-2 rounded-full mr-2 ${active ? 'bg-emerald-400' : 'bg-red-400'
      }`} />
    {active ? 'Active' : 'Inactive'}
  </div>
);

// Performance Score Component

// Growth Indicator Component

// Hospital Avatar Component
const HospitalAvatar = ({ name, type }: { name: string; type: string }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'General Hospital': return 'from-blue-500 to-cyan-500';
      case 'Pediatric Hospital': return 'from-pink-500 to-rose-500';
      case 'Rehabilitation Center': return 'from-green-500 to-emerald-500';
      case 'Teaching Hospital': return 'from-purple-500 to-indigo-500';
      case 'Specialty Hospital': return 'from-orange-500 to-amber-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getTypeColor(type)} 
      flex items-center justify-center text-white font-bold text-sm 
      shadow-lg border border-white/20 backdrop-blur-sm`}
    >
      {getInitials(name)}
    </div>
  );
};

// Actions Dropdown Component
const ActionsDropdown = ({ hospital }: { hospital: HospitalInterface }) => {
  return (
    <div className="flex items-center space-x-2">
      <Link
        href={`/hospitals/${hospital.id}`}
        className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 
          hover:bg-blue-500/30 transition-all backdrop-blur-sm group"
      >
        <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
      </Link>

      <button className="p-2 rounded-lg bg-white/10 border border-white/20 text-white 
        hover:bg-white/20 transition-all backdrop-blur-sm group">
        <MoreVertical className="w-4 h-4 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
};

// Main Hospital Columns Definition - Optimized for screen fit
export const hospitalColumns: ColumnDef<HospitalInterface>[] = [
  {
    accessorKey: 'name',
    header: () => (
      <div className="flex items-center gap-2 text-gray-300 font-semibold">
        <Building2 className="w-4 h-4 text-blue-400" />
        <span>Hospital</span>
      </div>
    ),
    cell: ({ row }) => {
      const { name, type, cccNumber, id } = row.original;

      return (
        <div className="flex items-center gap-3 group max-w-[250px]">
          <HospitalAvatar name={name} type={type} />
          <div className="flex flex-col min-w-0">
            <Link
              href={`/hospitals/${id}`}
              className="text-sm font-semibold text-white hover:text-transparent 
                hover:bg-gradient-to-r hover:from-blue-400 hover:to-cyan-600 
                hover:bg-clip-text transition-all duration-300 flex items-center gap-1 group truncate"
            >
              <span className="truncate">
                {name}
              </span>

            </Link>
            <p className="text-xs text-blue-400 truncate">
              {type}
            </p>
            <p className="text-xs text-gray-400 font-mono">
              {cccNumber}
            </p>
          </div>
        </div>
      );
    },
    size: 280,
  },
  {
    accessorKey: 'active',
    header: () => (
      <div className="flex items-center gap-1 text-gray-300 font-semibold">
        <Activity className="w-4 h-4 text-emerald-400" />
        <span className="hidden sm:inline">Status</span>
      </div>
    ),
    cell: ({ row }) => (
      <StatusBadge active={row.original.active} />
    ),
    size: 90,
  },
  {
    accessorKey: 'kpis.performanceScore',
    header: () => (
      <div className="flex items-center gap-1 text-gray-300 font-semibold">
        <Award className="w-4 h-4 text-yellow-400" />
        <span className="hidden lg:inline">Performance</span>
      </div>
    ),
    cell: ({ row }) => {
      const score = row.original.kpis.performanceScore;
      const getColor = (score: number) => {
        if (score >= 90) return 'text-green-400';
        if (score >= 80) return 'text-yellow-400';
        if (score >= 70) return 'text-orange-400';
        return 'text-red-400';
      };

      return (
        <div className="flex items-center space-x-2">
          <div className={`text-sm font-bold ${getColor(score)}`}>
            {score}%
          </div>
          <div className="w-8 bg-gray-700/50 rounded-full h-2 hidden sm:block">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${score >= 90 ? 'bg-green-400' :
                score >= 80 ? 'bg-yellow-400' :
                  score >= 70 ? 'bg-orange-400' : 'bg-red-400'
                }`}
              style={{ width: `${Math.min(score, 100)}%` }}
            />
          </div>
        </div>
      );
    },
    size: 110,
  },
  {
    accessorKey: 'kpis.registeredPatients',
    header: () => (
      <div className="flex items-center gap-1 text-gray-300 font-semibold">
        <Users className="w-4 h-4 text-cyan-400" />
        <span className="hidden lg:inline">Patients</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        <div className="text-sm font-semibold text-cyan-400">
          {(row.original.kpis.registeredPatients / 1000).toFixed(1)}k
        </div>
      </div>
    ),
    size: 80,
  },
  {
    accessorKey: 'kpis',
    header: () => (
      <div className="flex items-center gap-1 text-gray-300 font-semibold">
        <TrendingUp className="w-4 h-4 text-green-400" />
        <span className="hidden lg:inline">KPIs</span>
      </div>
    ),
    cell: ({ row }) => {
      const { drugsDispensed, monthlyGrowth } = row.original.kpis;
      return (
        <div className="space-y-1">
          <div className="text-xs text-pink-400 font-medium">
            {(drugsDispensed / 1000).toFixed(1)}k drugs
          </div>
          <div className={`flex items-center space-x-1 text-xs ${monthlyGrowth >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
            <TrendingUp className={`w-3 h-3 ${monthlyGrowth < 0 ? 'rotate-180' : ''}`} />
            <span className="font-semibold">
              {monthlyGrowth >= 0 ? '+' : ''}{monthlyGrowth}%
            </span>
          </div>
        </div>
      );
    },
    size: 100,
  },
  {
    accessorKey: 'registrationDate',
    header: () => (
      <div className="flex items-center gap-1 text-gray-300 font-semibold">
        <Calendar className="w-4 h-4 text-violet-400" />
        <span className="hidden xl:inline">Registered</span>
      </div>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.registrationDate);
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
    size: 90,
  },
  {
    id: 'actions',
    header: () => (
      <div className="text-gray-300 font-semibold text-center">
        <span>Actions</span>
      </div>
    ),
    cell: ({ row }) => (
      <ActionsDropdown hospital={row.original} />
    ),
    size: 90,
  },
];