'use client';

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
    MessageSquare,
    Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function MemberDashboard() {
    const weeklyProgress = [
        { day: 'Mon', completed: 3 },
        { day: 'Tue', completed: 5 },
        { day: 'Wed', completed: 2 },
        { day: 'Thu', completed: 8 },
        { day: 'Fri', completed: 6 },
    ];

    const stats = [
        { label: 'My Tasks', value: '18', icon: CheckCircle2, color: 'text-indigo-600', bg: 'bg-indigo-100' },
        { label: 'In Progress', value: '5', icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-100' },
        { label: 'Due Today', value: '3', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
        { label: 'Overdue', value: '1', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' },
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

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            My Weekly Progress
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={weeklyProgress}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Line type="monotone" dataKey="completed" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#6366f1' }} />
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
                            {[
                                { title: 'Fix CSS Grid Issues', priority: 'Urgent', project: 'Website Redesign' },
                                { title: 'Implement JWT Auth', priority: 'High', project: 'API Backend' },
                                { title: 'Review PR #45', priority: 'Medium', project: 'Mobile App' },
                            ].map((task, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-white border rounded-lg hover:shadow-sm transition-shadow">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">{task.title}</p>
                                        <p className="text-[10px] text-slate-500">{task.project}</p>
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

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Recent Comments</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[1, 2].map((_, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                                <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0" />
                                <div>
                                    <p className="text-sm">
                                        <span className="font-bold">Admin</span> mentioned you in <span className="text-indigo-600">Task #402</span>
                                    </p>
                                    <p className="text-xs text-slate-500 italic mt-1">"Please check the latest designs and update the status."</p>
                                    <p className="text-[10px] text-slate-400 mt-2">10 minutes ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
