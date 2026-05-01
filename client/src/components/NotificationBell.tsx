'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuGroup,
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Bell, Check, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

export default function NotificationBell() {
    const router = useRouter();
    const queryClient = useQueryClient();
    
    // Fetch notifications with polling
    const { data: notifications = [], isLoading } = useQuery({
        queryKey: ['notifications'],
        queryFn: async () => {
            const { data } = await api.get('/notifications');
            return data;
        },
        refetchInterval: 15000, // Poll every 15 seconds
        staleTime: 10000,
    });

    const unreadCount = notifications.filter((n: any) => !n.read).length;

    const handleNotificationClick = (link: string) => {
        if (link) router.push(link);
    };

    const markReadMutation = useMutation({
        mutationFn: async () => {
            await api.put('/notifications/mark-read');
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
        }
    });

    const clearMutation = useMutation({
        mutationFn: async () => {
            await api.delete('/notifications/clear');
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
        }
    });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="relative p-2 rounded-full hover:bg-slate-100 transition-colors outline-none cursor-pointer">
                <Bell className="h-5 w-5 text-slate-600" />
                {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 border-2 border-white text-[10px]">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </Badge>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-0 shadow-xl border-slate-200">
                <div className="flex items-center justify-between p-4 border-bottom bg-slate-50/50">
                    <DropdownMenuGroup>
                        <DropdownMenuLabel className="p-0 font-bold text-slate-800">Notifications</DropdownMenuLabel>
                    </DropdownMenuGroup>
                    <div className="flex gap-2">
                        {unreadCount > 0 && (
                            <button 
                                onClick={() => markReadMutation.mutate()}
                                className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-wider"
                            >
                                Mark all read
                            </button>
                        )}
                        {notifications.length > 0 && (
                            <button 
                                onClick={() => clearMutation.mutate()}
                                className="text-[10px] font-bold text-slate-400 hover:text-red-500 uppercase tracking-wider"
                            >
                                Clear all
                            </button>
                        )}
                    </div>
                </div>
                <DropdownMenuSeparator className="m-0" />
                <div className="max-h-[400px] overflow-y-auto">
                    {notifications.length === 0 ? (
                        <div className="p-8 text-center">
                            <Bell className="h-8 w-8 text-slate-200 mx-auto mb-2" />
                            <p className="text-sm text-slate-400">All caught up!</p>
                        </div>
                    ) : (
                        notifications.map((notification: any) => (
                            <DropdownMenuItem 
                                key={notification._id} 
                                className={cn(
                                    "p-4 flex flex-col items-start gap-1 cursor-pointer border-b border-slate-50 last:border-0",
                                    !notification.read && "bg-indigo-50/30"
                                )}
                                onClick={() => handleNotificationClick(notification.link)}
                            >
                                <div className="flex justify-between items-start w-full gap-2">
                                    <p className={cn("text-xs font-bold leading-tight", !notification.read ? "text-slate-900" : "text-slate-600")}>
                                        {notification.title}
                                    </p>
                                    {!notification.read && <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 mt-1" />}
                                </div>
                                <p className="text-[11px] text-slate-500 leading-normal line-clamp-2">
                                    {notification.message}
                                </p>
                                <div className="flex items-center gap-1 text-[9px] text-slate-400 mt-1">
                                    <Clock className="h-2.5 w-2.5" />
                                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                                </div>
                            </DropdownMenuItem>
                        ))
                    )}
                </div>
                <DropdownMenuSeparator className="m-0" />
                <div className="p-3 text-center bg-slate-50/50">
                    <Link href="/notifications" className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors">
                        View all activity
                    </Link>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
