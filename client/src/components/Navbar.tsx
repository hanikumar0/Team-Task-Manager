'use client';

import { Bell, Search, Menu, X, Layout, Zap } from 'lucide-react';
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
        <header className="h-24 glass border-b border-white/5 flex items-center justify-between px-6 lg:px-12 sticky top-0 z-40 transition-all duration-300">
            <div className="flex items-center gap-6 flex-1 max-w-xl">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="lg:hidden rounded-2xl bg-white/5 border border-white/10 text-white"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <Menu className="h-6 w-6" />
                </Button>
                <div className="relative w-full group hidden sm:block">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-all duration-300" />
                    <Input
                        type="search"
                        placeholder="Scan projects or identify mission tasks..."
                        className="pl-14 bg-white/[0.03] border border-white/5 rounded-2xl h-14 text-xs font-black uppercase tracking-widest text-white focus-visible:ring-primary/20 focus-visible:bg-white/[0.06] transition-all hover:bg-white/[0.05]"
                    />
                </div>
            </div>
            <div className="flex items-center gap-8">
                <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                        <div className="p-4 text-muted-foreground hover:bg-white/5 hover:text-primary rounded-2xl relative cursor-pointer transition-all active:scale-95 border border-white/5 hover:border-primary/20 group">
                            <Bell className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                            {unreadCount > 0 && (
                                <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                            )}
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[400px] p-0 glass border-white/10 mt-6 animate-in fade-in slide-in-from-top-6 duration-500 shadow-2xl">
                        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-white italic">Intelligence Feed</h3>
                            {unreadCount > 0 && (
                                <Badge className="bg-primary text-primary-foreground font-black text-[9px] rounded-lg px-3 py-1 tracking-widest">
                                    {unreadCount} SIGNAL
                                </Badge>
                            )}
                        </div>
                        <div className="max-h-[450px] overflow-y-auto divide-y divide-white/5">
                            {notifications?.length > 0 ? (
                                notifications.slice(0, 5).map((notification: any) => (
                                    <DropdownMenuItem key={notification._id} className="p-8 flex flex-col items-start gap-3 cursor-pointer hover:bg-white/5 focus:bg-white/5 transition-all">
                                        <div className="flex justify-between w-full">
                                            <span className={cn(
                                                "font-black text-xs uppercase tracking-tight",
                                                notification.read ? 'text-muted-foreground' : 'text-primary'
                                            )}>
                                                {notification.title}
                                            </span>
                                            <span className="text-[10px] font-black text-muted-foreground/40 italic">
                                                {formatDistanceToNow(new Date(notification.createdAt))} ago
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground font-medium leading-relaxed italic opacity-80">
                                            "{notification.message}"
                                        </p>
                                    </DropdownMenuItem>
                                ))
                            ) : (
                                <div className="p-16 text-center text-muted-foreground text-[10px] font-black uppercase tracking-[0.3em] italic opacity-30">
                                    Zero Activity Detected
                                </div>
                            )}
                        </div>
                        <div className="p-6 bg-white/[0.02] text-center border-t border-white/5">
                            <Link href="/notifications" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary hover:text-white transition-all">
                                Full History Trace
                            </Link>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="h-10 w-px bg-white/5" />

                <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                        <div className="flex items-center gap-4 hover:bg-white/5 p-2 rounded-[22px] pr-6 transition-all cursor-pointer border border-white/5 hover:border-primary/20 group active:scale-95">
                            <div className="relative">
                                <Avatar className="h-12 w-12 border-2 border-white/10 shadow-2xl group-hover:scale-105 group-hover:border-primary/40 transition-all duration-500">
                                    <AvatarImage src={user?.avatar} />
                                    <AvatarFallback className="bg-primary/10 text-primary font-black text-xs">
                                        {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary border-2 border-background flex items-center justify-center">
                                    <Zap className="h-2 w-2 text-primary-foreground stroke-[3]" />
                                </div>
                            </div>
                            <div className="text-left hidden md:block">
                                <p className="text-sm font-black text-white tracking-tighter italic">{user?.name}</p>
                                <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em] opacity-80 mt-0.5">
                                    {user?.role} Level
                                </p>
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-72 glass border-white/10 mt-6 animate-in fade-in slide-in-from-top-6 duration-500">
                        <DropdownMenuLabel className="p-8 pb-3 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 italic">
                            Authentication
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/5 mx-6" />
                        <DropdownMenuItem className="p-5 cursor-pointer font-black text-[10px] uppercase tracking-widest rounded-2xl mx-3 my-1 hover:bg-white/5">Profile Archive</DropdownMenuItem>
                        <DropdownMenuItem className="p-5 cursor-pointer font-black text-[10px] uppercase tracking-widest rounded-2xl mx-3 my-1 hover:bg-white/5">System Nodes</DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/5 mx-6" />
                        <DropdownMenuItem className="p-5 text-destructive font-black text-[10px] uppercase tracking-[0.2em] cursor-pointer rounded-2xl mx-3 my-1 hover:bg-destructive/10 italic" onClick={() => logout()}>
                            Terminate Session
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
            <div className="fixed inset-0 z-[100] lg:hidden">
                <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={() => setIsMobileMenuOpen(false)} />
                <div className="absolute inset-y-0 left-0 w-80 glass border-r border-white/10 animate-in slide-in-from-left duration-500 ease-out shadow-[50px_0_100px_-20px_rgba(0,0,0,0.8)]">
                    <div className="p-10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-primary rounded-[18px] shadow-2xl shadow-primary/40 rotate-3">
                                <Layout className="h-6 w-6 text-primary-foreground stroke-[2.5]" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-white italic">Synergy</span>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="rounded-xl hover:bg-white/5 text-muted-foreground">
                            <X className="h-6 w-6" />
                        </Button>
                    </div>
                    
                    <div className="px-10 py-8 space-y-6">
                         <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 px-4">Navigation</p>
                         <nav className="space-y-3">
                            <Link href="/dashboard" className="flex items-center gap-5 px-6 py-4 rounded-[24px] text-xs font-black uppercase tracking-widest bg-primary text-primary-foreground shadow-2xl shadow-primary/20 neon-glow">
                                <LayoutDashboard className="h-5 w-5 stroke-[2.5]" /> Dashboard
                            </Link>
                            <Link href="/projects" className="flex items-center gap-5 px-6 py-4 rounded-[24px] text-xs font-black uppercase tracking-widest text-muted-foreground hover:bg-white/5 hover:text-white transition-all">
                                <FolderKanban className="h-5 w-5 stroke-[1.5]" /> Projects
                            </Link>
                            <Link href="/tasks" className="flex items-center gap-5 px-6 py-4 rounded-[24px] text-xs font-black uppercase tracking-widest text-muted-foreground hover:bg-white/5 hover:text-white transition-all">
                                <CheckSquare className="h-5 w-5 stroke-[1.5]" /> Tasks
                            </Link>
                         </nav>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}

// Helper icons for mobile nav placeholder
function LayoutDashboard(props: any) { return <Layout {...props} /> }
function FolderKanban(props: any) { return <Briefcase {...props} /> }
function CheckSquare(props: any) { return <CheckCircle2 {...props} /> }
function Briefcase(props: any) { return <Layout {...props} /> }
function CheckCircle2(props: any) { return <Zap {...props} /> }
