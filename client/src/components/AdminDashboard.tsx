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
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { 
    CheckCircle2, 
    Clock, 
    AlertCircle, 
    Briefcase, 
    TrendingUp,
    Users,
    Activity,
    Plus,
    UserPlus,
    ArrowRight
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import CreateProjectDialog from '@/components/CreateProjectDialog';

const COLORS = ['var(--primary)', 'oklch(0.7 0.15 40)', 'oklch(0.6 0.15 150)', 'oklch(0.75 0.15 190)'];

export default function AdminDashboard() {
    const [open, setOpen] = useState(false);
    const { data: stats, isLoading, isError } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const { data } = await api.get('/dashboard/stats');
            return data;
        }
    });

    if (isLoading) return <DashboardSkeleton />;
    if (isError) return (
        <div className="p-12 text-center glass rounded-3xl border border-destructive/20 animate-in-fade">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">Connection Error</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
                We couldn't retrieve your dashboard metrics. Please ensure your database is active and try again.
            </p>
            <Button variant="outline" className="mt-6" onClick={() => window.location.reload()}>
                Retry Connection
            </Button>
        </div>
    );

    const statusData = Object.entries(stats?.statusDistribution || {}).map(([name, value]) => ({ name, value }));

    const dashboardStats = [
        { label: 'Active Projects', value: stats?.summary?.activeProjects || 0, icon: Briefcase, color: 'text-primary' },
        { label: 'Team Members', value: stats?.summary?.totalMembers || 0, icon: Users, color: 'text-orange-500' },
        { label: 'Total Tasks', value: stats?.summary?.totalTasks || 0, icon: CheckCircle2, color: 'text-emerald-500' },
        { label: 'Overdue Tasks', value: stats?.summary?.overdueTasks || 0, icon: AlertCircle, color: 'text-destructive' },
    ];

    return (
        <div className="space-y-8 animate-in-fade">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tight gradient-text">Admin Console</h1>
                    <p className="text-muted-foreground text-lg">Orchestrate your team's workflow and performance.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" size="lg" className="rounded-2xl font-semibold">
                        <UserPlus className="mr-2 h-5 w-5" /> Add Member
                    </Button>
                    <Button size="lg" className="bg-primary hover:brightness-110 text-primary-foreground rounded-2xl font-semibold shadow-lg shadow-primary/20" onClick={() => setOpen(true)}>
                        <Plus className="mr-2 h-5 w-5" /> Create Project
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

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card className="lg:col-span-2 premium-card border-none overflow-hidden">
                    <CardHeader className="border-b border-border/50 bg-muted/20 pb-6">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl font-bold flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <TrendingUp className="h-5 w-5 text-primary" />
                                </div>
                                Team Productivity Trend
                            </CardTitle>
                            <Badge variant="secondary" className="rounded-lg px-3 py-1 font-bold text-primary">Live</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 h-[350px]">
                        <ResponsiveContainer width="100%" height="100%" debounce={50}>
                            <BarChart data={stats?.productivity || []}>
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="var(--primary)" stopOpacity={1} />
                                        <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.6} />
                                    </linearGradient>
                                </defs>
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
                                <Bar dataKey="count" fill="url(#barGradient)" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="premium-card border-none">
                    <CardHeader className="border-b border-border/50 bg-muted/20">
                        <CardTitle className="text-xl font-bold">Task Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 h-[350px]">
                        <ResponsiveContainer width="100%" height="100%" debounce={50}>
                            <PieChart>
                                <Pie 
                                    data={statusData} 
                                    innerRadius={70} 
                                    outerRadius={100} 
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: 'var(--card)', 
                                        borderRadius: '16px', 
                                        border: '1px solid var(--border)' 
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Card className="premium-card border-none overflow-hidden">
                <CardHeader className="border-b border-border/50 bg-muted/20">
                    <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-border/50">
                        {stats?.recentTasks?.map((task: any) => (
                            <div key={task._id} className="flex items-center justify-between p-5 hover:bg-muted/30 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-sm border border-primary/20">
                                        {task.assignedTo?.name?.charAt(0) || '?'}
                                    </div>
                                    <div>
                                        <p className="font-bold text-foreground">{task.title}</p>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                                            <span className="font-semibold text-primary">{task.projectId?.name}</span>
                                            <span className="opacity-40">•</span>
                                            {new Date().toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge className="rounded-full px-4 py-1 font-bold capitalize bg-muted text-muted-foreground border-none">
                                        {task.status}
                                    </Badge>
                                    <Button variant="ghost" size="icon" className="rounded-xl">
                                        <ArrowRight className="h-4 w-4 opacity-40" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <CreateProjectDialog open={open} onOpenChange={setOpen} />
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
            <div className="grid gap-6 md:grid-cols-3">
                <Skeleton className="md:col-span-2 h-[300px]" />
                <Skeleton className="h-[300px]" />
            </div>
        </div>
    );
}
