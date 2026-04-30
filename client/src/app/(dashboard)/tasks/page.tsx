'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
    Plus, 
    Filter, 
    MoreHorizontal, 
    MessageSquare, 
    Paperclip,
    Clock
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

const columns = [
    { id: 'Todo', title: 'To Do', color: 'bg-slate-200' },
    { id: 'In Progress', title: 'In Progress', color: 'bg-blue-500' },
    { id: 'Review', title: 'In Review', color: 'bg-yellow-500' },
    { id: 'Completed', title: 'Completed', color: 'bg-green-500' },
];

export default function TasksPage() {
    const { user } = useAuthStore();
    const isAdmin = user?.role === 'Admin';

    const { data: tasks, isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const { data } = await api.get('/tasks');
            return data;
        }
    });

    const getTasksByStatus = (status: string) => {
        return tasks?.filter((task: any) => task.status === status) || [];
    };

    return (
        <div className="h-full flex flex-col space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">{isAdmin ? 'Tasks' : 'My Tasks'}</h1>
                    <p className="text-slate-500">{isAdmin ? 'Manage your work across different statuses.' : 'Track your assigned tasks and update progress.'}</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    {isAdmin && (
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                            <Plus className="mr-2 h-4 w-4" /> Add Task
                        </Button>
                    )}
                </div>
            </div>

            <div className="flex-1 flex gap-6 overflow-x-auto pb-4 min-h-[600px]">
                {columns.map((column) => (
                    <div key={column.id} className="flex-shrink-0 w-80 flex flex-col gap-4">
                        <div className="flex items-center justify-between px-2">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${column.color}`}></div>
                                <h3 className="font-semibold text-slate-700">{column.title}</h3>
                                <Badge variant="secondary" className="ml-2 bg-slate-100 text-slate-600">
                                    {getTasksByStatus(column.id).length}
                                </Badge>
                            </div>
                            {isAdmin && (
                                <button className="text-slate-400 hover:text-slate-600">
                                    <Plus size={18} />
                                </button>
                            )}
                        </div>

                        <div className="flex-1 flex flex-col gap-3 bg-slate-100/50 p-2 rounded-xl">
                            {getTasksByStatus(column.id).map((task: any) => (
                                <Card key={task._id} className="shadow-sm border-none cursor-pointer hover:ring-2 hover:ring-indigo-200 transition-all">
                                    <CardContent className="p-4 space-y-3">
                                        <div className="flex justify-between items-start">
                                            <Badge variant="outline" className={
                                                task.priority === 'Urgent' ? 'text-red-600 border-red-100 bg-red-50' : 
                                                task.priority === 'High' ? 'text-orange-600 border-orange-100 bg-orange-50' : 
                                                'text-blue-600 border-blue-100 bg-blue-50'
                                            }>
                                                {task.priority}
                                            </Badge>
                                            {isAdmin && (
                                                <button className="text-slate-400">
                                                    <MoreHorizontal size={16} />
                                                </button>
                                            )}
                                        </div>
                                        <h4 className="font-semibold text-slate-900 leading-tight">
                                            {task.title}
                                        </h4>
                                        <p className="text-xs text-slate-500 line-clamp-2">
                                            {task.description}
                                        </p>
                                        <div className="flex justify-between items-center pt-2">
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                                                    <MessageSquare size={12} />
                                                    {task.comments?.length || 0}
                                                </div>
                                                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                                                    <Paperclip size={12} />
                                                    {task.attachments?.length || 0}
                                                </div>
                                            </div>
                                            <Avatar className="h-6 w-6">
                                                <AvatarImage src={task.assignedTo?.avatar} />
                                                <AvatarFallback className="text-[10px] bg-indigo-100 text-indigo-600 font-bold">
                                                    {task.assignedTo?.name?.split(' ').map((n: string) => n[0]).join('') || '?'}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            {getTasksByStatus(column.id).length === 0 && (
                                <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl py-8">
                                    <p className="text-xs text-slate-400">No tasks</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
