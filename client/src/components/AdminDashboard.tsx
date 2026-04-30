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
    AlertCircle, 
    Briefcase, 
    TrendingUp,
    Users,
    Plus,
    UserPlus,
    ArrowRight,
    Zap
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import CreateProjectDialog from '@/components/CreateProjectDialog';

const COLORS = ['var(--primary)', 'oklch(0.7 0.2 40)', 'oklch(0.6 0.2 200)', 'oklch(0.75 0.2 240)'];

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
            <p className="text-muted-foreground max-w-md mx-auto font-medium">
                We couldn't retrieve your dashboard metrics. Please ensure your database is active and try again.
            </p>
            <Button variant="outline" className="mt-6 rounded-2xl border-white/10 hover:bg-white/5" onClick={() => window.location.reload()}>
                Retry Connection
            </Button>
        </div>
    );

    const statusData = Object.entries(stats?.statusDistribution || {}).map(([name, value]) => ({ name, value }));

    const dashboardStats = [
        { label: 'Active Projects', value: stats?.summary?.activeProjects || 0, icon: Briefcase, color: 'text-primary' },
        { label: 'Team Members', value: stats?.summary?.totalMembers || 0, icon: Users, color: 'text-blue-400' },
        { label: 'Total Tasks', value: stats?.summary?.totalTasks || 0, icon: CheckCircle2, color: 'text-emerald-400' },
        { label: 'Overdue Tasks', value: stats?.summary?.overdueTasks || 0, icon: AlertCircle, color: 'text-destructive' },
    ];

    return (
        <div className="space-y-12 animate-in-fade">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                        <Zap className="h-3 w-3" /> System Live
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white">Admin <span className="text-primary italic">Console</span></h1>
                    <p className="text-muted-foreground text-lg font-medium opacity-80 italic">Orchestrate your team's workflow and performance.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="secondary" size="lg" className="rounded-2xl font-bold bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                        <UserPlus className="mr-2 h-5 w-5" /> Add Member
                    </Button>
                    <Button size="lg" className="bg-primary hover:brightness-110 text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-[10px] px-8 shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95" onClick={() => setOpen(true)}>
                        <Plus className="mr-2 h-5 w-5 stroke-[3]" /> Create Project
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {dashboardStats.map((stat, i) => (
                    <Card key={i} className="premium-card group border-none py-2">
                        <CardContent className="p-8 flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground italic">{stat.label}</p>
                                <h3 className="text-5xl font-black text-white tracking-tighter">{stat.value}</h3>
                            </div>
                            <div className={`p-5 rounded-[22px] bg-white/5 border border-white/5 group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-500`}>
                                <stat.icon className={`h-8 w-8 ${stat.color} stroke-[1.5]`} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                <Card className="lg:col-span-2 premium-card border-none overflow-hidden">
                    <CardHeader className="border-b border-white/5 bg-white/[0.02] pb-6">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl font-black tracking-tight flex items-center gap-4 text-white italic uppercase text-xs">
                                <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20">
                                    <TrendingUp className="h-5 w-5 text-primary" />
                                </div>
                                Team Productivity
                            </CardTitle>
                            <div className="flex h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-10 h-[400px]">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <BarChart data={stats?.productivity?.map((p: any) => ({ ...p, day: p.day.toUpperCase() })) || []}>
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="var(--primary)" stopOpacity={1} />
                                        <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.4} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis 
                                    dataKey="day" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 800 }}
                                    dy={10}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false}
                                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                                />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                                        borderRadius: '24px', 
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        backdropFilter: 'blur(10px)',
                                        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)'
                                    }}
                                    itemStyle={{ color: 'var(--primary)', fontWeight: 900 }}
                                />
                                <Bar dataKey="count" fill="url(#barGradient)" radius={[8, 8, 0, 0]} barSize={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="premium-card border-none flex flex-col">
                    <CardHeader className="border-b border-white/5 bg-white/[0.02]">
                        <CardTitle className="text-xs font-black tracking-widest text-white italic uppercase">Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="p-10 flex-1 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height={300} minWidth={0}>
                            <PieChart>
                                <Pie 
                                    data={statusData} 
                                    innerRadius={85} 
                                    outerRadius={115} 
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} className="hover:opacity-80 transition-opacity" />)}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                                        borderRadius: '20px', 
                                        border: '1px solid rgba(255,255,255,0.1)' 
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                    <div className="p-8 border-t border-white/5 grid grid-cols-2 gap-4">
                        {statusData.map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                <span className="text-[10px] font-black uppercase tracking-tight text-muted-foreground">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <Card className="premium-card border-none overflow-hidden">
                <CardHeader className="border-b border-white/5 bg-white/[0.02] p-8">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xs font-black tracking-widest text-white italic uppercase">Stream Activity</CardTitle>
                        <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors">View All</Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-white/5">
                        {stats?.recentTasks?.map((task: any) => (
                            <div key={task._id} className="flex items-center justify-between p-8 hover:bg-white/[0.02] transition-all duration-300 group">
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 rounded-3xl bg-white/5 flex items-center justify-center text-primary font-black text-lg border border-white/10 group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-500">
                                        {task.assignedTo?.name?.charAt(0) || '?'}
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-black text-xl text-white tracking-tight leading-none">{task.title}</p>
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold flex items-center gap-2">
                                            <span className="text-primary italic">{task.projectId?.name}</span>
                                            <span className="opacity-20">/</span>
                                            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <Badge className="rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-widest bg-white/5 text-slate-300 border-none group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                                        {task.status}
                                    </Badge>
                                    <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-white/5 transition-colors">
                                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
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
        <div className="space-y-12 p-8">
            <Skeleton className="h-16 w-64 rounded-3xl" />
            <div className="grid gap-6 md:grid-cols-4">
                {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-40 w-full rounded-[32px]" />)}
            </div>
            <div className="grid gap-10 md:grid-cols-3">
                <Skeleton className="md:col-span-2 h-[400px] rounded-[32px]" />
                <Skeleton className="h-[400px] rounded-[32px]" />
            </div>
        </div>
    );
}
