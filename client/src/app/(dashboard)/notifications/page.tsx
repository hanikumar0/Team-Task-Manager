'use client';

import { Bell, Check, Clock, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function NotificationsPage() {
    const notifications = [
        { id: 1, title: 'New Task Assigned', message: 'You have been assigned to the "Fix Dashboard Layout" task.', time: '2 hours ago', unread: true, type: 'assignment' },
        { id: 2, title: 'Project Update', message: 'The "Website Redesign" project status has been updated to "In Progress".', time: '5 hours ago', unread: true, type: 'update' },
        { id: 3, title: 'Comment on Task', message: 'Admin commented on "Fix JWT Auth": "Please review the latest changes."', time: '1 day ago', unread: false, type: 'comment' },
        { id: 4, title: 'Overdue Task', message: 'Task "Design System" is now overdue.', time: '2 days ago', unread: false, type: 'alert' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>
                    <p className="text-slate-500">Stay updated with your latest activities.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Check className="mr-2 h-4 w-4" /> Mark all as read
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="mr-2 h-4 w-4" /> Clear all
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                {notifications.map((notification) => (
                    <Card key={notification.id} className={notification.unread ? 'border-l-4 border-l-indigo-600' : ''}>
                        <CardContent className="p-4 flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className={`p-2 rounded-full flex-shrink-0 ${
                                    notification.type === 'assignment' ? 'bg-blue-100 text-blue-600' :
                                    notification.type === 'update' ? 'bg-green-100 text-green-600' :
                                    notification.type === 'comment' ? 'bg-purple-100 text-purple-600' :
                                    'bg-red-100 text-red-600'
                                }`}>
                                    <Bell size={20} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-slate-900">{notification.title}</h3>
                                        {notification.unread && <Badge className="bg-indigo-600">New</Badge>}
                                    </div>
                                    <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                                    <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-2">
                                        <Clock size={12} /> {notification.time}
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600">
                                <Trash2 size={16} />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
