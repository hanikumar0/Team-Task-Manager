'use client';

import { Bell, Check, Clock, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

export default function NotificationsPage() {
    const queryClient = useQueryClient();

    const { data: notifications, isLoading } = useQuery({
        queryKey: ['notifications'],
        queryFn: async () => {
            const { data } = await api.get('/notifications');
            return data;
        }
    });

    const markReadMutation = useMutation({
        mutationFn: () => api.put('/notifications/mark-read'),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            queryClient.invalidateQueries({ queryKey: ['notifications-nav'] });
        }
    });

    const clearMutation = useMutation({
        mutationFn: () => api.delete('/notifications/clear'),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            queryClient.invalidateQueries({ queryKey: ['notifications-nav'] });
        }
    });

    if (isLoading) return <NotificationsSkeleton />;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>
                    <p className="text-slate-500">Stay updated with your latest activities.</p>
                </div>
                <div className="flex gap-2">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => markReadMutation.mutate()}
                        disabled={markReadMutation.isPending}
                    >
                        <Check className="mr-2 h-4 w-4" /> Mark all as read
                    </Button>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700"
                        onClick={() => clearMutation.mutate()}
                        disabled={clearMutation.isPending}
                    >
                        <Trash2 className="mr-2 h-4 w-4" /> Clear all
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                {notifications?.length > 0 ? (
                    notifications.map((notification: any) => (
                        <Card key={notification._id} className={!notification.read ? 'border-l-4 border-l-indigo-600' : ''}>
                            <CardContent className="p-4 flex items-start justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className={`p-2 rounded-full flex-shrink-0 ${
                                        notification.type === 'assignment' ? 'bg-blue-100 text-blue-600' :
                                        notification.type === 'update' ? 'bg-green-100 text-green-600' :
                                        notification.type === 'comment' ? 'bg-purple-100 text-purple-600' :
                                        'bg-red-100 text-red-600'
                                    }`}>
                                        <Bell size={20} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-slate-900">{notification.title}</h3>
                                            {!notification.read && <Badge className="bg-indigo-600">New</Badge>}
                                        </div>
                                        <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                                        <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-2">
                                            <Clock size={12} /> {formatDistanceToNow(new Date(notification.createdAt))} ago
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center h-[40vh] text-slate-400">
                        <Bell size={48} className="mb-4 opacity-20" />
                        <p>No notifications yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function NotificationsSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between">
                <Skeleton className="h-10 w-48" />
                <div className="flex gap-2">
                    <Skeleton className="h-9 w-32" />
                    <Skeleton className="h-9 w-24" />
                </div>
            </div>
            <div className="space-y-4">
                {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-24 w-full" />)}
            </div>
        </div>
    );
}
