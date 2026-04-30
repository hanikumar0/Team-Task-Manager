'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from '@/components/ui/card';
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer
} from 'recharts';
import { 
    CheckCircle2, 
    Clock, 
    AlertCircle, 
    Zap,
    Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export default function MemberDashboard() {
    const { data: stats, isLoading, isError } = useQuery({
        queryKey: ['member-stats'],
        queryFn: async () => {
            const { data } = await api.get('/dashboard/stats');
            return data;
        }
    });

    if (isLoading) return <DashboardSkeleton />;
    if (isError) return <div className="p-8 text-center bg-red-50 text-red-600 rounded-xl border border-red-100">Failed to load dashboard data. Please check your database connection.</div>;

    const dashboardStats = [
        { label: 'My Tasks', value: stats?.summary?.totalTasks || 0, icon: CheckCircle2, color: 'text-indigo-600', bg: 'bg-indigo-100' },
        { label: 'In Progress', value: stats?.statusDistribution?.['In Progress'] || 0, icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-100' },
        { label: 'Review', value: stats?.statusDistribution?.['Review'] || 0, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
        { label: 'Completion', value: `${stats?.summary?.completionRate || 0}%`, icon: AlertCircle, color: 'text-green-600', bg: 'bg-green-100' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Welcome Back!</h1>
                    <p className="text-slate-500">Focus on your tasks and crush your goals today.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">View Calendar</Button>
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">Update Status</Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {dashboardStats.map((stat, i) => (
                    <Card key={i}>
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                            </div>
                            <div className={`p-3 rounded-xl ${stat.bg}`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            My Weekly Progress
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[250px] min-h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={stats?.trend || []}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Line type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#6366f1' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Priority Tasks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {stats?.recentTasks?.map((task: any) => (
                                <div key={task._id} className="flex items-center justify-between p-3 bg-white border rounded-lg hover:shadow-sm transition-shadow">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">{task.title}</p>
                                        <p className="text-[10px] text-slate-500">{task.projectId?.name}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className={task.priority === 'Urgent' ? 'text-red-600 bg-red-50' : 'text-blue-600 bg-blue-50'}>
                                            {task.priority}
                                        </Badge>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-indigo-600">
                                            <Play size={16} />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function DashboardSkeleton() {
    return (
        <div className="space-y-6">
            <Skeleton className="h-10 w-48" />
            <div className="grid gap-4 md:grid-cols-4">
                {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-24 w-full" />)}
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                <Skeleton className="h-[250px]" />
                <Skeleton className="h-[250px]" />
            </div>
        </div>
    );
}
