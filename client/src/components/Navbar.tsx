'use client';

import { Bell, Search, Menu, X, Layout } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
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
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function Navbar() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { data: notifications } = useQuery({
        queryKey: ['notifications-nav'],
        queryFn: async () => {
            const { data } = await api.get('/notifications');
            return data;
        },
        refetchInterval: 30000 // Refetch every 30s
    });

    const unreadCount = notifications?.filter((n: any) => !n.read).length || 0;

    return (
        <>
        <header className="h-20 glass border-b flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40 transition-all duration-300">
            <div className="flex items-center gap-4 flex-1 max-w-lg">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="lg:hidden rounded-xl text-muted-foreground"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <Menu className="h-6 w-6" />
                </Button>
                <div className="relative w-full group hidden sm:block">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                        type="search"
                        placeholder="Quick search projects or tasks..."
                        className="pl-12 bg-muted/30 border-none rounded-2xl h-12 text-sm font-medium focus-visible:ring-primary/20 transition-all hover:bg-muted/50"
                    />
                </div>
            </div>
            <div className="flex items-center gap-6">
                <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                        <div className="p-3 text-muted-foreground hover:bg-muted/50 hover:text-primary rounded-2xl relative cursor-pointer transition-all active:scale-95 shadow-sm border border-transparent hover:border-border/50">
                            <Bell className="h-5 w-5" />
                            {unreadCount > 0 && (
                                <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background animate-in fade-in zoom-in duration-300"></span>
                            )}
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-96 p-0 premium-card border-none mt-4 animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="p-6 border-b border-border/50 flex justify-between items-center bg-muted/20">
                            <h3 className="font-black text-sm uppercase tracking-widest text-foreground">Notifications</h3>
                            {unreadCount > 0 && (
                                <Badge className="bg-primary text-primary-foreground font-black text-[10px] rounded-lg">
                                    {unreadCount} NEW
                                </Badge>
                            )}
                        </div>
                        <div className="max-h-[400px] overflow-y-auto divide-y divide-border/50">
                            {notifications?.length > 0 ? (
                                notifications.slice(0, 5).map((notification: any) => (
                                    <DropdownMenuItem key={notification._id} className="p-6 flex flex-col items-start gap-2 cursor-pointer hover:bg-muted/30 focus:bg-muted/30 transition-colors">
                                        <div className="flex justify-between w-full">
                                            <span className={cn(
                                                "font-black text-xs",
                                                notification.read ? 'text-muted-foreground' : 'text-primary'
                                            )}>
                                                {notification.title}
                                            </span>
                                            <span className="text-[10px] font-bold text-muted-foreground/60">
                                                {formatDistanceToNow(new Date(notification.createdAt))} ago
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground font-medium leading-relaxed line-clamp-2 italic">
                                            "{notification.message}"
                                        </p>
                                    </DropdownMenuItem>
                                ))
                            ) : (
                                <div className="p-12 text-center text-muted-foreground text-xs font-medium italic">
                                    Your inbox is clear for today.
                                </div>
                            )}
                        </div>
                        <div className="p-4 bg-muted/20 text-center">
                            <Link href="/notifications" className="text-[10px] font-black uppercase tracking-widest text-primary hover:opacity-70 transition-opacity">
                                View Intelligence Feed
                            </Link>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="h-8 w-px bg-border/50" />

                <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                        <div className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-2xl pr-4 transition-all cursor-pointer border border-transparent hover:border-border/50 group active:scale-95">
                            <Avatar className="h-10 w-10 border-2 border-primary/20 shadow-md group-hover:scale-105 transition-transform duration-300">
                                <AvatarImage src={user?.avatar} />
                                <AvatarFallback className="bg-primary/10 text-primary font-black text-sm">
                                    {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                                </AvatarFallback>
                            </Avatar>
                            <div className="text-left hidden md:block">
                                <p className="text-xs font-black text-foreground tracking-tight">{user?.name}</p>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm" />
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">
                                        {user?.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 premium-card border-none mt-4 animate-in fade-in slide-in-from-top-4 duration-300">
                        <DropdownMenuLabel className="p-6 pb-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                            My Account
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-border/50 mx-4" />
                        <DropdownMenuItem className="p-4 cursor-pointer font-bold rounded-xl mx-2">Profile Details</DropdownMenuItem>
                        <DropdownMenuItem className="p-4 cursor-pointer font-bold rounded-xl mx-2">System Settings</DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-border/50 mx-4" />
                        <DropdownMenuItem className="p-4 text-destructive font-black cursor-pointer rounded-xl mx-2 hover:bg-destructive/10" onClick={() => logout()}>
                            End Session
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
            <div className="fixed inset-0 z-[100] lg:hidden">
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
                <div className="absolute inset-y-0 left-0 w-72 bg-slate-950 shadow-2xl border-r border-white/5 animate-in slide-in-from-left duration-300">
                    <div className="p-8 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-600 rounded-xl shadow-lg shadow-emerald-600/20">
                                <Layout className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-black tracking-tight text-white italic">Synergy</span>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400">
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                    {/* Reuse Sidebar Content Logic */}
                    <div className="px-6 py-4">
                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-4 mb-4">Main Menu</p>
                         <nav className="space-y-2">
                            {/* Simplified for now, or import shared items */}
                            <Link href="/dashboard" className="flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/10">
                                <Layout className="h-5 w-5" /> Dashboard
                            </Link>
                            <Link href="/projects" className="flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-bold text-slate-400 hover:text-white transition-colors">
                                <Search className="h-5 w-5" /> Projects
                            </Link>
                            {/* ... more links ... */}
                         </nav>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}

