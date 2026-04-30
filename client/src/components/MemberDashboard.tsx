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
    if (isError) return (
        <div className="p-12 text-center glass rounded-3xl border border-destructive/20 animate-in-fade">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">Sync Interrupted</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
                We're having trouble loading your latest task updates. Please check your connection.
            </p>
        </div>
    );

    const dashboardStats = [
        { label: 'My Tasks', value: stats?.summary?.totalTasks || 0, icon: CheckCircle2, color: 'text-primary' },
        { label: 'In Progress', value: stats?.statusDistribution?.['In Progress'] || 0, icon: Zap, color: 'text-amber-500' },
        { label: 'Overdue', value: stats?.summary?.overdueTasks || 0, icon: AlertCircle, color: 'text-destructive' },
        { label: 'Completion', value: `${stats?.summary?.completionRate || 0}%`, icon: Zap, color: 'text-emerald-500' },
    ];

    return (
        <div className="space-y-8 animate-in-fade">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tight gradient-text">Welcome Back!</h1>
                    <p className="text-muted-foreground text-lg italic">Your productivity mission for today starts here.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" size="lg" className="rounded-2xl font-semibold">
                        View My Calendar
                    </Button>
                    <Button size="lg" className="bg-primary hover:brightness-110 text-primary-foreground rounded-2xl font-semibold shadow-lg shadow-primary/20">
                        Update Task Status
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {dashboardStats.map((stat, i) => (
                    <Card key={i} className="premium-card group border-none">
                        <CardContent className="p-8 flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/70">{stat.label}</p>
                                <h3 className="text-4xl font-black text-foreground">{stat.value}</h3>
                            </div>
                            <div className={`p-4 rounded-2xl bg-muted/50 group-hover:scale-110 transition-transform duration-300`}>
                                <stat.icon className={`h-7 w-7 ${stat.color}`} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <Card className="premium-card border-none overflow-hidden">
                    <CardHeader className="border-b border-border/50 bg-muted/20">
                        <CardTitle className="text-xl font-bold">My Weekly Velocity</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 h-[300px]">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <LineChart data={stats?.productivity || []}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                                <XAxis 
                                    dataKey="day" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: 'var(--muted-foreground)', fontSize: 12, fontWeight: 600 }}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false}
                                    tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                                />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: 'var(--card)', 
                                        borderRadius: '16px', 
                                        border: '1px solid var(--border)',
                                        boxShadow: 'var(--shadow-premium)'
                                    }}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="count" 
                                    stroke="var(--primary)" 
                                    strokeWidth={4} 
                                    dot={{ r: 6, fill: 'var(--primary)', strokeWidth: 2, stroke: 'var(--card)' }}
                                    activeDot={{ r: 8, strokeWidth: 0 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="premium-card border-none overflow-hidden">
                    <CardHeader className="border-b border-border/50 bg-muted/20">
                        <CardTitle className="text-xl font-bold">Priority Focus</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-border/50">
                            {stats?.recentTasks?.map((task: any) => (
                                <div key={task._id} className="flex items-center justify-between p-5 hover:bg-muted/30 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-3 h-3 rounded-full ${task.priority === 'Urgent' ? 'bg-destructive animate-pulse' : 'bg-primary'}`} />
                                        <div>
                                            <p className="font-bold text-foreground">{task.title}</p>
                                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-tight">{task.projectId?.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Badge variant="secondary" className="rounded-lg px-3 py-1 font-bold text-[10px] uppercase">
                                            {task.priority}
                                        </Badge>
                                        <Button variant="ghost" size="icon" className="rounded-xl text-primary hover:bg-primary/10">
                                            <Play size={18} fill="currentColor" />
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
        <div className="space-y-8 animate-in-fade">
            <div className="flex justify-between items-end">
                <div className="space-y-2">
                    <Skeleton className="h-10 w-64 rounded-xl" />
                    <Skeleton className="h-6 w-48 rounded-lg" />
                </div>
                <div className="flex gap-3">
                    <Skeleton className="h-12 w-40 rounded-2xl" />
                    <Skeleton className="h-12 w-40 rounded-2xl" />
                </div>
            </div>
            <div className="grid gap-6 md:grid-cols-4">
                {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 w-full rounded-3xl" />)}
            </div>
            <div className="grid gap-8 md:grid-cols-2">
                <Skeleton className="h-[380px] rounded-3xl" />
                <Skeleton className="h-[380px] rounded-3xl" />
            </div>
        </div>
    );
}

