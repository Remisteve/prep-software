// Status Color System

import { ReactNode } from "react";


interface StatusInterface {
    bg: string
    border: string
    text: string
    icon: string
}

export const statusStyles: {
    [key: string]: StatusInterface
    success: StatusInterface
    warning: StatusInterface
    error: StatusInterface
    info: StatusInterface
    neutral: StatusInterface
} = {
    success: {
        bg: 'bg-black/30',
        border: 'border-emerald-400/40',
        text: 'text-emerald-400',
        icon: 'text-emerald-400'
    },
    warning: {
        bg: 'bg-black/30',
        border: 'border-amber-400/40',
        text: 'text-amber-400',
        icon: 'text-amber-400'
    },
    error: {
        bg: 'bg-black/30',
        border: 'border-red-400/40',
        text: 'text-red-400',
        icon: 'text-red-400'
    },
    info: {
        bg: 'bg-black/30',
        border: 'border-blue-400/40',
        text: 'text-blue-400',
        icon: 'text-blue-400'
    },
    neutral: {
        bg: 'bg-black/30',
        border: 'border-white/20',
        text: 'text-gray-300',
        icon: 'text-gray-300'
    }
};
// Status Badge Component
export default function StatusBadge({ status, children }: {
    status: string
    children: ReactNode
}) {
    const style = statusStyles[status] || statusStyles.neutral;
    return (
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${style.bg} ${style.border} ${style.text} border`}>
            {children}
        </span>
    );
}