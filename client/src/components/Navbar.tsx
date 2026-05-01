'use client';

import { Bell, Search, Menu, X, Layout } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/store/useAuthStore';
import NotificationBell from './NotificationBell';

export default function Navbar() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 lg:px-6 sticky top-0 z-40">
            <div className="flex items-center gap-4 flex-1 max-w-md">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="lg:hidden"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <Menu className="h-5 w-5" />
                </Button>
                <div className="relative w-full hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search tasks..."
                        className="pl-9 bg-slate-50 border-none h-9 text-sm rounded-lg"
                    />
                </div>
            </div>
            
            <div className="flex items-center gap-4">
                <NotificationBell />

                <div className="h-6 w-px bg-slate-200" />

                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-2 pl-1 pr-2 rounded-full hover:bg-slate-50 transition-colors cursor-pointer outline-none">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user?.avatar} />
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                                {user?.name?.charAt(0) || 'U'}
                            </AvatarFallback>
                        </Avatar>
                        <div className="text-left hidden md:block">
                            <p className="text-xs font-semibold">{user?.name}</p>
                            <p className="text-[10px] text-muted-foreground leading-none">{user?.role}</p>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel className="font-semibold text-xs">Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-xs">Profile</DropdownMenuItem>
                        <DropdownMenuItem className="text-xs">Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-xs text-destructive font-semibold" onClick={() => logout()}>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Mobile Nav Overlay Placeholder */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black/20" onClick={() => setIsMobileMenuOpen(false)} />
                    <div className="absolute inset-y-0 left-0 w-64 bg-white shadow-xl animate-in slide-in-from-left">
                        <div className="p-6 flex items-center justify-between border-b">
                            <div className="flex items-center gap-2">
                                <Layout className="h-5 w-5 text-primary" />
                                <span className="font-bold">Synergy</span>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                        {/* Mobile links go here */}
                    </div>
                </div>
            )}
        </header>
    );
}
