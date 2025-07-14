// 4. src/components/ui/GlassCard.jsx - Reusable Glass Card Component
'use client'

import React, { ReactNode } from 'react';

interface GlassCardInterface{
    children: ReactNode
    className: string
    hover?: boolean
    variant?: string
}

function GlassCard({ children, className = "", hover = false, variant = "default" }:GlassCardInterface) {
    const variants: {
        [key: string]: string
    } = {
        default: "backdrop-blur-xl bg-black/30 border-white/20",
        primary: "backdrop-blur-xl bg-black/40 border-blue-500/30",
        success: "backdrop-blur-xl bg-black/40 border-emerald-500/30"
    };

    return (
        <div className={`
            rounded-2xl ${variants[variant]} border transition-all duration-300 relative overflow-hidden
            ${hover ? 'hover:bg-black/50 hover:border-white/30 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20' : ''} 
            ${className}
        `}>
            {/* Glass effect overlay */}
            <div className="absolute inset-[1px] rounded-[15px] bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            {children}
        </div>
    );
}


export default GlassCard