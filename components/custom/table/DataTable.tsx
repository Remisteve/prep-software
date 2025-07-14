'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, FileText, Loader2, AlertCircle,
  Search, Sparkles, Database,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';

export interface DataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>;
  data: TData[];
  filter?: React.ReactNode;
  total?: number;
  isSearch?: boolean;
  search?: string;
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
  pageSize?: number;
  link?: string;
  showPagination?: boolean;
  emptyStateMessage?: string;
  emptyStateIcon?: React.ReactNode;
  enableRowSelection?: boolean;
  enableSorting?: boolean;
  stickyHeader?: boolean;
}

interface TableSearchInputProps {
  handleSearch: () => void;
  search?: string;
  filter: React.ReactNode;
}

// Enhanced TableSearchInput with glassmorphism
function TableSearchInput({ handleSearch, search, filter }: TableSearchInputProps) {
  return (
    <div className="px-6 py-4">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/10 to-purple-600/5" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 z-10" />
          <input
            type="text"
            placeholder="Search records..."
            value={search || ''}
            onChange={handleSearch}
            className="pl-12 pr-4 py-3 w-full bg-black/40 backdrop-blur-xl border border-white/20 
              rounded-xl text-white placeholder-gray-400 
              focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/60 
              hover:bg-black/50 hover:border-white/30
              transition-all duration-300 shadow-lg shadow-black/20"
          />
          {/* Search input glow effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>

        {filter && (
          <div className="flex space-x-3">
            {filter}
          </div>
        )}
      </div>
    </div>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  disabled?: boolean;
  className?: string;
}

// Enhanced Button component with glassmorphism
function Button({
  children,
  variant = 'default',
  size = 'default',
  disabled = false,
  className = '',
  onClick,
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center rounded-xl font-medium 
    transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50
    backdrop-blur-md border relative overflow-hidden group
  `;

  const variantClasses = {
    default: `
      bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400/30 text-blue-300 
      hover:from-blue-500/30 hover:to-cyan-500/30 hover:border-blue-400/50 hover:text-blue-200
      shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-105
    `,
    outline: `
      bg-black/20 border-white/20 text-gray-300 
      hover:bg-black/40 hover:border-blue-400/40 hover:text-blue-300
      shadow-lg shadow-black/20 hover:shadow-blue-500/20
    `,
    ghost: `
      bg-transparent border-transparent text-gray-400 
      hover:bg-white/10 hover:text-white hover:border-white/20
    `,
  };

  const sizeClasses = {
    default: 'px-4 py-2 text-sm',
    sm: 'px-3 py-1.5 text-xs',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      type="button"
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} 
        ${disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {/* Button glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filter,
  total,
  isSearch = false,
  search,
  setSearch,
  isLoading = false,
  pageSize = 10,
  showPagination = true,
  emptyStateMessage = 'No data available',
  emptyStateIcon,
  enableRowSelection = false,
  enableSorting = true,
  stickyHeader = false,
  link,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [currentPageSize, setCurrentPageSize] = React.useState(pageSize);
  const [currentPage, setCurrentPage] = React.useState(1);

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    pageCount: total ? Math.ceil(total / currentPageSize) : 0,
    onSortingChange: enableSorting ? setSorting : undefined,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: enableRowSelection ? setRowSelection : undefined,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: currentPageSize,
      },
    },
  });

  const handleSearch = React.useCallback((e?: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e?.target || {};
    if (setSearch) {
      setSearch(value || '');
    }
  }, [setSearch]);

  const updatePage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Enhanced empty state with glassmorphism
  const renderEmptyState = () => (
    <TableRow className="hover:bg-white/5">
      <TableCell colSpan={columns.length} className="h-40 p-8">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="relative p-6 bg-gradient-to-br from-blue-500/20 to-purple-600/20 
            backdrop-blur-md rounded-2xl border border-blue-400/30 shadow-2xl shadow-blue-500/20">
            {emptyStateIcon || <Database className="w-10 h-10 text-blue-400" />}
            {/* Floating sparkles */}
            <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-cyan-400 animate-pulse" />
            <Sparkles className="absolute -bottom-1 -left-1 w-3 h-3 text-purple-400 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">
              {emptyStateMessage}
            </h3>
            <p className="text-sm text-gray-400 max-w-md">
              {isSearch && search
                ? 'Try adjusting your search criteria or clearing filters to see more results'
                : 'No records have been added yet. Start by adding your first entry.'}
            </p>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );

  // Enhanced loading state with glassmorphism
  const renderLoadingState = () => (
    <>
      {[...Array(5)].map((_, index: number) => (
        <TableRow key={index} className="animate-pulse">
          {columns.map((_, cellIndex) => (
            <TableCell key={cellIndex} className="py-4 px-6">
              <div className="flex items-center space-x-3">
                <div className="h-4 bg-gradient-to-r from-white/10 to-white/5 rounded-lg flex-1 backdrop-blur-sm" />
                {cellIndex === 0 && (
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg backdrop-blur-sm" />
                )}
              </div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );

  const totalPages = table.getPageCount();
  const canPreviousPage = currentPage > 1;
  const canNextPage = currentPage < totalPages;
  const selectedRowCount = table.getFilteredSelectedRowModel().rows.length;
  const totalRowCount = table.getFilteredRowModel().rows.length;

  return (
    <div className="space-y-0 overflow-hidden relative">
      {/* Search and Filters */}
      {isSearch && (
        <TableSearchInput
          handleSearch={handleSearch}
          search={search}
          filter={filter}
        />
      )}

      {/* Enhanced Table Container */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className={`${stickyHeader ? 'sticky top-0 z-10' : ''}`}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-white/10 bg-black/30 backdrop-blur-md hover:bg-black/40 transition-colors duration-300"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="font-semibold text-gray-200 py-4 px-6 hover:text-white transition-colors duration-200"
                    style={{ width: header.getSize() !== 150 ? header.getSize() : 'auto' }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {(() => {
              if (isLoading) {
                return renderLoadingState();
              }
              if (table.getRowModel().rows?.length) {
                return table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    onClick={() => link && router.push(`${link}/${row.original}`)}
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className={`
                      border-b border-white/5 hover:bg-white/5 transition-colors duration-300 
                      group cursor-pointer relative
                      ${index % 2 === 0 ? 'bg-white/2' : ''}
                      ${row.getIsSelected() ? 'bg-blue-500/10 border-blue-400/30' : ''}
                    `}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="py-4 px-6 text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-200"
                        style={{ width: cell.column.getSize() !== 150 ? cell.column.getSize() : 'auto' }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ));
              }
              return renderEmptyState();
            })()}
          </TableBody>
        </Table>
      </div>

      {/* Enhanced Pagination */}
      {showPagination && totalPages > 0 && (
        <div className="px-6 py-4 border-t border-white/10 bg-gradient-to-r from-black/20 via-black/10 to-black/20 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Enhanced Row info */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 border border-blue-400/30 rounded-lg backdrop-blur-md">
                <FileText className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 font-medium">
                  Page {currentPage} of {totalPages}
                </span>
              </div>

              {enableRowSelection && selectedRowCount > 0 && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/20 border border-orange-400/30 rounded-lg backdrop-blur-md">
                  <AlertCircle className="w-4 h-4 text-orange-400" />
                  <span className="text-orange-300 font-medium">
                    {selectedRowCount} of {totalRowCount} selected
                  </span>
                </div>
              )}
            </div>

            {/* Enhanced Pagination controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updatePage(1)}
                disabled={!canPreviousPage || isLoading}
                className="h-9 w-9 p-0"
              >
                <ChevronsLeft className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => updatePage(currentPage - 1)}
                disabled={!canPreviousPage || isLoading}
                className="h-9 px-3"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>

              {/* Enhanced Page numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                      variant={currentPage === pageNum ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updatePage(pageNum)}
                      className={`h-9 w-9 p-0 ${currentPage === pageNum
                        ? 'bg-gradient-to-r from-blue-500/30 to-cyan-500/30 border-blue-400/50 text-blue-200 shadow-lg shadow-blue-500/25'
                        : ''
                        }`}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => updatePage(currentPage + 1)}
                disabled={!canNextPage || isLoading}
                className="h-9 px-3"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => updatePage(totalPages)}
                disabled={!canNextPage || isLoading}
                className="h-9 w-9 p-0"
              >
                <ChevronsRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Loading overlay */}
      {isLoading && data?.length > 0 && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-30 rounded-2xl">
          <div className="flex items-center gap-4 text-sm text-blue-200 
            bg-gradient-to-r from-black/80 to-black/60 backdrop-blur-md 
            px-8 py-6 rounded-2xl border border-blue-400/30 
            shadow-2xl shadow-blue-500/20">
            <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
            <span className="font-medium">Updating data...</span>
          </div>
        </div>
      )}
    </div>
  );
}