'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const ThemeContext = createContext({});

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }:{
    children: ReactNode
}) => {
    const [isMobile, setIsMobile] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isDarkMode, setIsDarkMode] = useState(true);

    // Mobile detection
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    // Cursor tracking
    useEffect(() => {
        const handleMouseMove = (e:any) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        if (!isMobile) {
            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);
        }
    }, [isMobile]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const value = {
        isMobile,
        mousePosition,
        isDarkMode,
        toggleDarkMode,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};