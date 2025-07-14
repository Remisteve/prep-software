import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Loader2, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { DataTable } from './DataTable';

interface TableContainerProps<TData, TValue> {
  title: string;
  total: number;
  rightLabel?: ReactNode;
  columns: Array<ColumnDef<TData, TValue>>;
  data: TData[];
  filter?: ReactNode;
  search: string;
  link?: string;
  setSearch: Dispatch<SetStateAction<string>> | undefined;
  isLoading?: boolean;
  description?: string;
  icon?: ReactNode;
  headerActions?: ReactNode;
  variant?: 'default' | 'minimal' | 'elevated';
}

function TableContainer<TData, TValue>({
  title,
  total,
  rightLabel,
  columns,
  data,
  filter,
  search,
  setSearch,
  isLoading = false,
  description,
  icon,
  headerActions,
  link,
  variant = 'default',
}: TableContainerProps<TData, TValue>) {

  // Enhanced variant-based styling with glassmorphism matching DataTable theme
  const getContainerClasses = () => {
    const baseClasses = `
      w-full rounded-2xl overflow-hidden transition-all duration-300 relative group
      backdrop-blur-xl border
    `;

    const glassEffects = `
      before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br 
      before:from-blue-500/10 before:via-cyan-500/5 before:to-purple-600/10 
      before:pointer-events-none before:opacity-0 before:transition-opacity before:duration-300
      group-hover:before:opacity-100
      after:absolute after:inset-[1px] after:rounded-[15px] after:bg-gradient-to-br 
      after:from-white/5 after:to-transparent after:pointer-events-none
    `;

    switch (variant) {
      case 'minimal':
        return `${baseClasses} 
          bg-black/20 border-white/10
          shadow-lg shadow-black/10
          hover:bg-black/30 hover:border-white/20`;

      case 'elevated':
        return `${baseClasses} ${glassEffects}
          bg-black/40 border-blue-500/30
          shadow-2xl shadow-blue-500/20
          hover:shadow-3xl hover:shadow-blue-500/30 hover:border-blue-400/40
          hover:scale-[1.01]`;

      default:
        return `${baseClasses} ${glassEffects}
          bg-black/30 border-white/20
          shadow-xl shadow-black/20
          hover:bg-black/40 hover:border-white/30 hover:shadow-blue-500/10`;
    }
  };

  // Enhanced loading skeleton with glassmorphism
  const renderLoadingSkeleton = () => (
    <div className="p-8 space-y-6 bg-black/20 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <Skeleton className="h-8 w-48 bg-white/10 rounded-xl backdrop-blur-sm" />
          <Skeleton className="h-4 w-32 bg-white/5 rounded-lg" />
        </div>
        <Skeleton className="h-10 w-24 bg-white/10 rounded-xl" />
      </div>

      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-6 animate-pulse">
            <Skeleton className="h-12 w-12 bg-white/10 rounded-xl backdrop-blur-sm" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full bg-white/10 rounded-lg max-w-md" />
              <Skeleton className="h-3 w-3/4 bg-white/5 rounded-lg max-w-xs" />
            </div>
            <Skeleton className="h-8 w-20 bg-white/10 rounded-lg" />
          </div>
        ))}
      </div>

      {/* Animated loading indicator */}
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center space-x-3 px-6 py-3 rounded-full 
          bg-blue-500/20 border border-blue-500/30 backdrop-blur-md">
          <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
          <span className="text-blue-400 font-medium">Loading data...</span>
        </div>
      </div>
    </div>
  );

  // Compact header with glassmorphism
  const renderHeader = () => (
    <div className="relative border-b border-white/10 px-6 py-4 
      bg-gradient-to-r from-black/50 via-black/30 to-black/50 
      backdrop-blur-md overflow-hidden">

      {/* Animated background patterns */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/10 to-purple-600/5" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r 
        from-transparent via-blue-400/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r 
        from-transparent via-cyan-400/30 to-transparent" />

      {/* Subtle animated sparkles */}
      <div className="absolute top-2 right-6 opacity-30">
        <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />
      </div>
      <div className="absolute bottom-2 left-8 opacity-20">
        <Sparkles className="w-2 h-2 text-cyan-400 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Title Section */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {icon && (
            <div className="flex-shrink-0 p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 
              rounded-xl border border-blue-400/30 backdrop-blur-md
              shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 
              hover:scale-105 transition-all duration-300">
              <div className="w-5 h-5 text-blue-400">
                {icon}
              </div>
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl font-bold text-white tracking-tight 
                bg-gradient-to-r from-white to-gray-300 bg-clip-text">
                {title}
              </h1>

              {/* Compact badge */}
              <Badge className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 
                rounded-full text-emerald-300 border border-emerald-400/30 
                hover:from-emerald-500/30 hover:to-cyan-500/30 hover:border-emerald-400/50
                font-medium px-3 py-1 text-xs backdrop-blur-md 
                transition-all duration-300 shadow-lg shadow-emerald-500/20">
                {isLoading ? (
                  <div className="flex items-center gap-1">
                    <Loader2 className="w-3 h-3 animate-spin text-emerald-400" />
                    <span className="bg-emerald-400/20 rounded h-3 w-8 animate-pulse" />
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <span className="text-emerald-300 font-semibold">
                      {total.toLocaleString()}
                    </span>
                    <span className="text-emerald-400/70">records</span>
                  </div>
                )}
              </Badge>
            </div>

            {description && (
              <p className="text-xs text-gray-300 leading-relaxed max-w-2xl mt-1
                opacity-90 hover:opacity-100 transition-opacity duration-300">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {rightLabel && (
            <div className="text-xs text-gray-300 px-2 py-1 rounded-lg 
              bg-white/5 border border-white/10 backdrop-blur-sm">
              {rightLabel}
            </div>
          )}

          {headerActions && (
            <div className="flex items-center gap-2">
              {React.Children.map(headerActions, (action, index) => (
                <div
                  key={index}
                  className="animate-in fade-in slide-in-from-right-2 duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {action}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Enhanced body shadow effect
  const renderBodyEffects = () => (
    <>
      {/* Top shadow */}
      <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b 
        from-black/20 via-black/10 to-transparent pointer-events-none z-20" />

      {/* Loading overlay */}
      {isLoading && data && data.length > 0 && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm 
          flex items-center justify-center z-30">
          <div className="flex items-center gap-3 px-6 py-4 rounded-2xl 
            bg-black/60 border border-blue-500/30 backdrop-blur-md shadow-2xl">
            <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
            <span className="text-blue-300 font-medium">Updating data...</span>
          </div>
        </div>
      )}
    </>
  );

  // Show loading skeleton for initial load
  if (isLoading && (!data || data.length === 0)) {
    return (
      <div className={getContainerClasses()}>
        {renderHeader()}
        {renderLoadingSkeleton()}
      </div>
    );
  }

  return (
    <div className={getContainerClasses()}>
      {renderHeader()}

      <div className="relative">
        {renderBodyEffects()}

        {/* Main content area with enhanced styling */}
        <DataTable
          columns={columns}
          link={link}
          data={data || []}
          total={total}
          isSearch
          search={search}
          setSearch={setSearch}
          filter={filter}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default TableContainer;