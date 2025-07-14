'use client';

import {
    ChevronDownIcon, UserCircle, LogOut, User,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Patient } from '@/app/admin/lab-requests/add/page';

interface UserAccountProps {
    user?: Patient;
    isLoading: boolean;
}

export default function UserProfileDropdown({ user, isLoading }: UserAccountProps) {
    const router = useRouter();
    const [isSigningOut, setIsSigningOut] = useState(false);

    const handleLogout = async () => {
        try {
            setIsSigningOut(true);
            await signOut({ redirect: false });
            router.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            // Handle error (show toast, etc.)
        } finally {
            setIsSigningOut(false);
        }
    };

    const handleProfileClick = () => {
        router.push('/profile');
    };

    const getUserInitials = (fullName: string) => fullName
        ?.split(' ')
        .map((name) => name.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2) || 'U';

    if (isLoading) {
        return (
            <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="hidden sm:block space-y-1">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-2 w-16" />
                </div>
                <Skeleton className="h-4 w-4" />
            </div>
        );
    }

    if (!user) {
        return (
            <Button
                variant="ghost"
                onClick={() => router.push('/login')}
                className="flex items-center space-x-2"
            >
                <UserCircle className="h-5 w-5" />
                <span className="hidden sm:inline">Sign In</span>
            </Button>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex items-center space-x-2 h-auto p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label={`User menu for ${user.name}`}
                >
                    <Avatar className="h-7 w-7">
                        <AvatarImage
                            src={user.image || ''}
                            alt={user.name || 'img'}
                        />
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                            {getUserInitials(user?.email || 'u')}
                        </AvatarFallback>
                    </Avatar>

                    <div className="hidden sm:block text-left">
                        {user.name && (
                            <div className="text-xs text-muted-foreground mt-1">
                                {user.name}
                            </div>
                        )}
                    </div>

                    <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-56 bg-white"
                sideOffset={5}
            >
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {user.name || user.email}
                        </p>
                        {user.email && (
                            <p className="text-xs leading-none text-muted-foreground">
                                {user.email}
                            </p>
                        )}
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={handleProfileClick}
                    className="cursor-pointer bg-white"
                >
                    <User className="mr-2 h-4 w-4" />
                    <span>Your Profile</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={handleLogout}
                    disabled={isSigningOut}
                    className="cursor-pointer text-destructive focus:text-destructive"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{isSigningOut ? 'Signing out...' : 'Log out'}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
