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
    Cell,
    LineChart,
    Line
} from 'recharts';
import { 
    CheckCircle2, 
    Clock, 
    AlertCircle, 
    Briefcase, 
    TrendingUp 
} from 'lucide-react';

const COLORS = ['#6366f1', '#fbbf24', '#f87171', '#10b981'];

export default function DashboardPage() {
    // In a real app, we'd fetch actual data. For now, using mock data for the charts.
    const statusData = [
        { name: 'Completed', value: 45 },
        { name: 'In Progress', value: 30 },
        { name: 'Todo', value: 15 },
        { name: 'Review', value: 10 },
    ];

    const weeklyData = [
        { day: 'Mon', count: 12 },
        { day: 'Tue', count: 18 },
        { day: 'Wed', count: 15 },
        { day: 'Thu', count: 22 },
        { day: 'Fri', count: 30 },
        { day: 'Sat', count: 10 },
        { day: 'Sun', count: 5 },
    ];

    const stats = [
        { label: 'Total Projects', value: '12', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Total Tasks', value: '128', icon: CheckCircle2, color: 'text-indigo-600', bg: 'bg-indigo-100' },
        { label: 'Pending Tasks', value: '34', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
        { label: 'Overdue', value: '5', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-slate-500">Welcome back! Here's what's happening with your projects today.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => (
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
                            Weekly Productivity
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Task Status</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((_, i) => (
                                <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                                        <User size={16} className="text-slate-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">
                                            {i % 2 === 0 ? 'Alex' : 'Jordan'} updated status of <span className="text-indigo-600 font-semibold">Design Revamp</span> to <span className="text-green-600 font-semibold">Completed</span>
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Upcoming Deadlines</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((_, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-red-500' : 'bg-indigo-500'}`}></div>
                                        <span className="text-sm font-medium text-slate-700">Project Alpha - Phase {i + 1}</span>
                                    </div>
                                    <span className="text-xs font-semibold text-slate-500">Oct {12 + i}, 2026</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function User({ size, className }: { size: number, className: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}
