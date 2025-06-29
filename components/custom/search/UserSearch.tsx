'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { File, Loader2, Search, X } from 'lucide-react';
import React, { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';

const UserSearch = ({ setUser, handleSelect }: {
    setUser: Dispatch<SetStateAction<any>>
    handleSelect: (user: any) => void
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showResults, setShowResults] = useState(false);

    // Debounce function to avoid too many API calls
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(null, args), delay);
        };
    };

    // Search function
    const searchUsers = async (query) => {
        if (!query || query.trim().length < 2) {
            setUsers([]);
            setShowResults(false);
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch(`/api/users/search?search=${encodeURIComponent(query.trim())}`);

            if (!response.ok) {
                throw new Error('Failed to search users');
            }

            const data = await response.json();
            setUsers(data);
            setShowResults(true);
        } catch (err) {
            setError(err.message);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce((query) => searchUsers(query), 300),
        []
    );

    // Handle input change
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedSearch(value);
    };

    // Handle clicking on a user
    const handleUserClick = (user) => {
        setSearchTerm(user.name || user.email);
        setUser(user)
        setShowResults(false);
    };

    // Clear search
    const clearSearch = () => {
        setSearchTerm('');
        setUsers([]);
        setShowResults(false);
        setError('');
    };

    // Handle clicking outside to close results
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.search-container')) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="w-full mb-4">
            <div className="relative search-container">
                {/* Search Input */}
                <div>
                    <label htmlFor="user-search" className='font-semibold text-[14px] text-slate-900'>
                        Search user
                    </label>

                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                            <Search size={16} className='text-slate-500' />
                        </div>

                        <Input
                            id="user-search"
                            type="text"
                            value={searchTerm}
                            onChange={handleInputChange}
                            placeholder="Search users by name or email..."
                            className="block w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400"
                        />

                        {/* Loading Spinner */}
                        {loading && (
                            <div className="absolute inset-y-0 right-10 flex items-center pointer-events-none">
                                <Loader2 size={16} className='animate-spin text-slate-500' />
                            </div>
                        )}

                        {/* Clear Button */}
                        {searchTerm && !loading && (
                            <button
                                onClick={clearSearch}
                                className="absolute inset-y-0 right-2 flex items-center px-2 text-slate-400 hover:text-slate-600 transition-colors"
                                type="button"
                                aria-label="Clear search"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Search Results Dropdown */}
                {showResults && (
                    <div className="absolute z-50 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
                        {error && (
                            <div className="px-4 py-2 text-red-600 text-sm">
                                <div className="flex items-center">
                                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    {error}
                                </div>
                            </div>
                        )}

                        {!error && users.length === 0 && searchTerm.length >= 2 && (
                            <div className="px-4 py-2 text-slate-500 text-sm">
                                <div className="flex items-center">
                                    <File size={16} className='text-slate-500 mr-2' />
                                    No users found for "{searchTerm}"
                                </div>
                            </div>
                        )}

                        {!error && users.length > 0 && (
                            <>
                                <div className="px-4 py-2 text-xs text-slate-500 bg-slate-50 border-b">
                                    {users.length} user{users.length !== 1 ? 's' : ''} found
                                </div>
                                {users.map((user) => (
                                    <button
                                        key={user.id}
                                        type="button"
                                        onClick={() => handleUserClick(user)}
                                        className="w-full px-4 py-3 hover:bg-slate-50 focus:bg-slate-50 focus:outline-none transition-colors duration-150"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center flex-1">
                                                {/* Avatar */}
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    {user.image || user.photoURL ? (
                                                        <img
                                                            className="h-10 w-10 rounded-full object-cover"
                                                            src={user.image || user.photoURL}
                                                            alt={user.name || user.email}
                                                        />
                                                    ) : (
                                                        <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                                                            <span className="text-teal-600 font-medium text-sm">
                                                                {(user.name || user.email)?.charAt(0)?.toUpperCase() || '?'}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* User Info */}
                                                <div className="ml-4 flex-1 text-left">
                                                    <div className="text-sm font-medium text-slate-900">
                                                        {user.name || 'No name'}
                                                    </div>
                                                    <div className="text-sm text-slate-500">
                                                        {user.email}
                                                    </div>
                                                    {user.role && (
                                                        <div className="mt-1">
                                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'admin'
                                                                ? 'bg-purple-100 text-purple-800'
                                                                : 'bg-green-100 text-green-800'
                                                                }`}>
                                                                {user.role}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Arrow */}
                                            <div className="ml-2 flex-shrink-0">
                                                <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Search Tips */}
            <div className="mt-2 text-xs text-slate-500">
                <div className="flex items-center">
                    <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Type at least 2 characters to search
                </div>
            </div>
        </div>
    );
};

export default UserSearch;