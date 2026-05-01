'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { 
    Activity, 
    User, 
    Calendar, 
    Briefcase, 
    CheckSquare,
    Filter,
    Clock
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

import { useAuthStore } from '@/store/useAuthStore';
import { Shield } from 'lucide-react';

export default function ActivityLogPage() {
    const { user } = useAuthStore();
    const isAdmin = user?.role === 'admin';

    const { data: activities, isLoading } = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            const { data } = await api.get('/activity');
            return data;
        },
        enabled: isAdmin
    });

    if (!isAdmin) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
                <Shield className="h-16 w-16 text-slate-300" />
                <h2 className="text-2xl font-bold text-slate-900">Access Denied</h2>
                <p className="text-slate-500">Only administrators can access the activity logs.</p>
            </div>
        );
    }

    if (isLoading) return <ActivitySkeleton />;


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Activity Logs</h1>
                    <p className="text-slate-500">Monitor system-wide actions and updates.</p>
                </div>
                <div className="flex gap-2">
                    <Badge variant="outline" className="bg-white px-4 py-2 text-slate-500 font-medium border-slate-200">
                        Total {activities?.length || 0} Actions
                    </Badge>
                </div>
            </div>

            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                <div className="divide-y">
                    {activities?.map((activity: any) => (
                        <div key={activity._id} className="p-4 hover:bg-slate-50 transition-colors flex items-start gap-4">
                            <div className={`p-2 rounded-xl flex-shrink-0 ${
                                activity.targetType === 'Project' ? 'bg-blue-100 text-blue-600' :
                                activity.targetType === 'Task' ? 'bg-indigo-100 text-indigo-600' :
                                activity.targetType === 'User' ? 'bg-purple-100 text-purple-600' :
                                'bg-slate-100 text-slate-600'
                            }`}>
                                {activity.targetType === 'Project' ? <Briefcase size={20} /> :
                                 activity.targetType === 'Task' ? <CheckSquare size={20} /> :
                                 activity.targetType === 'User' ? <User size={20} /> :
                                 <Activity size={20} />}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-slate-900">{activity.user?.name}</span>
                                        <span className="text-slate-500">{activity.action.toLowerCase()}</span>
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                                        <Clock size={12} /> {formatDistanceToNow(new Date(activity.createdAt))} ago
                                    </span>
                                </div>
                                <p className="text-sm text-slate-600 mt-1">{activity.details}</p>
                                <div className="mt-2 flex items-center gap-2">
                                    <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-500 uppercase tracking-wider">
                                        {activity.targetType}
                                    </Badge>
                                </div>
                            </div>

                            <Avatar className="h-8 w-8 ml-2">
                                <AvatarImage src={activity.user?.avatar} />
                                <AvatarFallback className="bg-slate-100 text-[10px] font-bold">
                                    {activity.user?.name?.split(' ').map((n: string) => n[0]).join('') || '?'}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    ))}
                    {activities?.length === 0 && (
                        <div className="p-12 text-center text-slate-400">
                            No activities logged yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function ActivitySkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-6 w-32" />
            </div>
            <div className="bg-white rounded-2xl border shadow-sm divide-y">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="p-4 flex gap-4">
                        <Skeleton className="h-10 w-10 rounded-xl" />
                        <div className="flex-1 space-y-2">
                            <div className="flex justify-between">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                            <Skeleton className="h-4 w-64" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
