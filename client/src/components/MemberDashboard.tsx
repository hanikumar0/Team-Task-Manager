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
    AlertCircle, 
    Zap,
    Play,
    Calendar,
    ArrowRight
} from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function MemberDashboard() {
    const { data: stats, isLoading, isError } = useQuery({
        queryKey: ['member-stats'],
        queryFn: async () => {
            const { data } = await api.get('/dashboard/stats');
            return data;
        }
    });

    if (isLoading) return <DashboardSkeleton />;
    if (isError) return (
        <div className="p-12 text-center border rounded-2xl bg-card">
            <AlertCircle className="h-10 w-10 text-destructive mx-auto mb-4" />
            <h2 className="text-lg font-semibold">Connection Error</h2>
            <p className="text-muted-foreground mt-1 text-sm">Failed to load dashboard data.</p>
            <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                Retry
            </Button>
        </div>
    );

    const dashboardStats = [
        { label: 'My Tasks', value: stats?.summary?.totalTasks || 0, icon: CheckCircle2, color: 'text-primary' },
        { label: 'In Progress', value: stats?.statusDistribution?.['In Progress'] || 0, icon: Zap, color: 'text-amber-500' },
        { label: 'Overdue', value: stats?.summary?.overdueTasks || 0, icon: AlertCircle, color: 'text-red-500' },
        { label: 'Completion', value: `${stats?.summary?.completionRate || 0}%`, icon: Zap, color: 'text-emerald-500' },
    ];

    return (
        <div className="space-y-8 animate-in-fade">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Member Dashboard</h1>
                    <p className="text-sm text-muted-foreground">Welcome back! Focus on your high-priority tasks today.</p>
                </div>
                <div className="flex gap-2">
                    <Link 
                        href="/calendar" 
                        className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), "flex items-center")}
                    >
                        <Calendar className="mr-2 h-4 w-4" /> View My Calendar
                    </Link>
                    <Link 
                        href="/tasks" 
                        className={cn(buttonVariants({ variant: 'default', size: 'sm' }), "flex items-center")}
                    >
                        <CheckCircle2 className="mr-2 h-4 w-4" /> Update Task Status
                    </Link>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {dashboardStats.map((stat, i) => (
                    <Card key={i} className="shadow-sm">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-muted-foreground mb-1">{stat.label}</p>
                                <h3 className="text-2xl font-bold">{stat.value}</h3>
                            </div>
                            <div className="p-3 bg-muted rounded-xl">
                                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">My Weekly Velocity</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] pt-4">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <LineChart data={stats?.productivity || []}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis 
                                    dataKey="day" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                                <Line 
                                    type="monotone" 
                                    dataKey="count" 
                                    stroke="var(--primary)" 
                                    strokeWidth={3} 
                                    dot={{ r: 4, fill: 'var(--primary)', strokeWidth: 2, stroke: '#fff' }}
                                    activeDot={{ r: 6, strokeWidth: 0 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Priority Focus</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y">
                            {stats?.recentTasks?.length > 0 ? (
                                stats.recentTasks.map((task: any) => (
                                    <div key={task._id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${task.priority === 'Urgent' ? 'bg-red-500 animate-pulse' : 'bg-primary'}`} />
                                            <div>
                                                <p className="text-sm font-semibold">{task.title}</p>
                                                <p className="text-[10px] text-muted-foreground uppercase font-bold">{task.projectId?.name}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Badge variant="secondary" className="text-[10px] px-2 py-0 font-bold uppercase">
                                                {task.priority}
                                            </Badge>
                                            <Link 
                                                href={`/tasks`}
                                                className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), "h-8 w-8 text-primary")}
                                            >
                                                <ArrowRight size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-12 text-center text-sm text-muted-foreground italic">No priority tasks assigned.</div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function DashboardSkeleton() {
    return (
        <div className="space-y-8">
            <Skeleton className="h-8 w-48" />
            <div className="grid gap-4 md:grid-cols-4">
                {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                <Skeleton className="h-[300px] rounded-xl" />
                <Skeleton className="h-[300px] rounded-xl" />
            </div>
        </div>
    );
}
