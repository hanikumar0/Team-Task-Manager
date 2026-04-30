'use client';

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
import { Button } from '@/components/ui/button';

const COLORS = ['#6366f1', '#fbbf24', '#f87171', '#10b981'];

export default function AdminDashboard() {
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
    ];

    const stats = [
        { label: 'Active Projects', value: '12', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Team Members', value: '24', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
        { label: 'Total Tasks', value: '128', icon: CheckCircle2, color: 'text-indigo-600', bg: 'bg-indigo-100' },
        { label: 'Completion Rate', value: '78%', icon: Activity, color: 'text-green-600', bg: 'bg-green-100' },
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
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                        <Plus className="mr-2 h-4 w-4" /> Create Project
                    </Button>
                </div>
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
                            Team Productivity Trend
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyData}>
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
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
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

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Team Leaderboard</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { name: 'Alex Johnson', tasks: 24, status: 'Top Performer' },
                                { name: 'Sarah Miller', tasks: 19, status: 'High Performance' },
                                { name: 'Michael Chen', tasks: 15, status: 'Consistent' },
                            ].map((member, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold">{member.name}</p>
                                            <p className="text-[10px] text-slate-500">{member.status}</p>
                                        </div>
                                    </div>
                                    <span className="text-sm font-bold text-indigo-600">{member.tasks} tasks</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Critical Overdue Tasks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex items-center justify-between p-3 border-l-4 border-red-500 bg-red-50 rounded-r-lg">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">Homepage Redesign - Bug #{i + 101}</p>
                                        <p className="text-xs text-red-600">Overdue by {i + 2} days</p>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-xs">Remind</Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
