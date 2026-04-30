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
    UserPlus
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import CreateProjectDialog from '@/components/CreateProjectDialog';

const COLORS = ['#6366f1', '#fbbf24', '#f87171', '#10b981'];

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
    if (isError) return <div className="p-8 text-center bg-red-50 text-red-600 rounded-xl border border-red-100">Failed to load dashboard data. Please check your database connection.</div>;

    const statusData = Object.entries(stats?.statusDistribution || {}).map(([name, value]) => ({ name, value }));

    const dashboardStats = [
        { label: 'Active Projects', value: stats?.summary?.activeProjects || 0, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Team Members', value: stats?.summary?.totalMembers || 0, icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
        { label: 'Total Tasks', value: stats?.summary?.totalTasks || 0, icon: CheckCircle2, color: 'text-indigo-600', bg: 'bg-indigo-100' },
        { label: 'Completion Rate', value: `${stats?.summary?.completionRate || 0}%`, icon: Activity, color: 'text-green-600', bg: 'bg-green-100' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Admin Console</h1>
                    <p className="text-slate-500">Business overview and team performance metrics.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <UserPlus className="mr-2 h-4 w-4" /> Add Member
                    </Button>
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700" onClick={() => setOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Create Project
                    </Button>
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

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-indigo-600" />
                            Team Productivity Trend
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] min-h-[300px] w-full overflow-hidden">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <BarChart data={stats?.productivity || []}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Task Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] min-h-[300px] w-full overflow-hidden">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <PieChart>
                                <Pie data={statusData} innerRadius={60} outerRadius={80} dataKey="value">
                                    {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Recent Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {stats?.recentTasks?.map((task: any) => (
                            <div key={task._id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs uppercase">
                                        {task.assignedTo?.name?.charAt(0) || '?'}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">{task.title}</p>
                                        <p className="text-[10px] text-slate-500">{task.projectId?.name}</p>
                                    </div>
                                </div>
                                <Badge variant="outline" className="text-xs">{task.status}</Badge>
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
