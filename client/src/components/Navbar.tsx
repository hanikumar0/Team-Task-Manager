'use client';

import { Bell, Search } from 'lucide-react';
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

export default function Navbar() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

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
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 sticky top-0 z-40">
            <div className="flex items-center flex-1 max-w-md">
                <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        type="search"
                        placeholder="Search projects, tasks..."
                        className="pl-9 bg-slate-50 border-none"
                    />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                        <div className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative cursor-pointer">
                            <Bell className="h-5 w-5" />
                            {unreadCount > 0 && (
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            )}
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80 p-0">
                        <div className="p-4 border-b flex justify-between items-center">
                            <h3 className="font-semibold text-sm">Notifications</h3>
                            {unreadCount > 0 && <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">{unreadCount} New</span>}
                        </div>
                        <div className="max-h-[300px] overflow-y-auto">
                            {notifications?.length > 0 ? (
                                notifications.slice(0, 5).map((notification: any) => (
                                    <DropdownMenuItem key={notification._id} className="p-4 flex flex-col items-start gap-1 border-b last:border-0 cursor-pointer hover:bg-slate-50 focus:bg-slate-50">
                                        <div className="flex justify-between w-full">
                                            <span className={`font-semibold text-xs ${notification.read ? 'text-slate-500' : 'text-indigo-600'}`}>
                                                {notification.title}
                                            </span>
                                            <span className="text-[10px] text-slate-400">
                                                {formatDistanceToNow(new Date(notification.createdAt))} ago
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-600 line-clamp-2">{notification.message}</p>
                                    </DropdownMenuItem>
                                ))
                            ) : (
                                <div className="p-8 text-center text-slate-400 text-xs">
                                    No notifications yet.
                                </div>
                            )}
                        </div>
                        <div className="p-2 border-t text-center">
                            <Link href="/notifications" className="text-xs font-semibold text-indigo-600 hover:underline py-1 block w-full">
                                View All Notifications
                            </Link>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                        <div className="flex items-center gap-2 hover:bg-slate-100 p-1 rounded-full pr-3 transition-colors">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user?.avatar} />
                                <AvatarFallback className="bg-indigo-100 text-indigo-600 font-bold text-xs">
                                    {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                                </AvatarFallback>
                            </Avatar>
                            <div className="text-left hidden sm:block">
                                <p className="text-xs font-semibold text-slate-900">{user?.name}</p>
                                <p className="text-[10px] text-slate-500 capitalize">{user?.role}</p>
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => logout()}>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
