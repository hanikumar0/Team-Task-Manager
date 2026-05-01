'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
    Plus, 
    Filter, 
    MoreHorizontal, 
    MessageSquare, 
    Paperclip,
    ArrowRightLeft,
    CheckCircle2
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import CreateTaskDialog from '@/components/CreateTaskDialog';
import { toast } from 'sonner';

const columns = [
    { id: 'Todo', title: 'To Do', color: 'bg-slate-300' },
    { id: 'In Progress', title: 'In Progress', color: 'bg-blue-500' },
    { id: 'Review', title: 'In Review', color: 'bg-amber-500' },
    { id: 'Completed', title: 'Completed', color: 'bg-emerald-500' },
];

export default function TasksPage() {
    const [open, setOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('Todo');
    const { user } = useAuthStore();
    const queryClient = useQueryClient();
    const isAdmin = user?.role === 'Admin';

    const { data: tasks, isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const { data } = await api.get('/tasks');
            return data;
        }
    });

    const updateStatusMutation = useMutation({
        mutationFn: async ({ taskId, status }: { taskId: string, status: string }) => {
            const { data } = await api.put(`/tasks/${taskId}`, { status });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast.success('Task status updated');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to update status');
        }
    });

    const getTasksByStatus = (status: string) => {
        return tasks?.filter((task: any) => task.status === status) || [];
    };

    return (
        <div className="h-full flex flex-col space-y-6 animate-in-fade">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">{isAdmin ? 'Team Tasks' : 'My Assigned Tasks'}</h1>
                    <p className="text-sm text-muted-foreground">
                        {isAdmin 
                            ? 'Monitor and manage progress across the entire team.' 
                            : 'Track your assigned tasks and update your progress status.'}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    {isAdmin && (
                        <Button size="sm" className="bg-primary hover:brightness-110" onClick={() => { setSelectedStatus('Todo'); setOpen(true); }}>
                            <Plus className="mr-2 h-4 w-4" /> Add Task
                        </Button>
                    )}
                </div>
            </div>

            <div className="flex-1 flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
                {columns.map((column) => (
                    <div key={column.id} className="flex-shrink-0 w-80 flex flex-col gap-4">
                        <div className="flex items-center justify-between px-1">
                            <div className="flex items-center gap-2">
                                <div className={`w-2.5 h-2.5 rounded-full ${column.color}`}></div>
                                <h3 className="font-bold text-slate-800">{column.title}</h3>
                                <Badge variant="secondary" className="bg-slate-100 text-slate-500 font-bold px-2 py-0">
                                    {getTasksByStatus(column.id).length}
                                </Badge>
                            </div>
                            {isAdmin && (
                                <button 
                                    className="p-1 rounded-md text-slate-400 hover:bg-slate-100 transition-colors"
                                    onClick={() => { setSelectedStatus(column.id); setOpen(true); }}
                                >
                                    <Plus size={18} />
                                </button>
                            )}
                        </div>

                        <div className="flex-1 flex flex-col gap-3 bg-slate-50/50 p-2 rounded-2xl border border-slate-100">
                            {getTasksByStatus(column.id).map((task: any) => (
                                <Card key={task._id} className="shadow-sm border-none hover:shadow-md hover:ring-1 hover:ring-slate-200 transition-all duration-200">
                                    <CardContent className="p-4 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <Badge variant="secondary" className={
                                                task.priority === 'Urgent' ? 'text-red-700 bg-red-50 border-red-100' : 
                                                task.priority === 'High' ? 'text-orange-700 bg-orange-50 border-orange-100' : 
                                                'text-blue-700 bg-blue-50 border-blue-100'
                                            }>
                                                {task.priority}
                                            </Badge>
                                            
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className="p-1 rounded-md text-slate-400 hover:bg-slate-100 outline-none cursor-pointer">
                                                    <MoreHorizontal size={18} />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48">
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuLabel className="text-xs">Quick Actions</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuLabel className="text-[10px] text-muted-foreground uppercase font-bold mt-1">Move To Status</DropdownMenuLabel>
                                                        {columns.filter(c => c.id !== task.status).map(c => (
                                                            <DropdownMenuItem 
                                                                key={c.id} 
                                                                className="text-xs cursor-pointer"
                                                                onClick={() => updateStatusMutation.mutate({ taskId: task._id, status: c.id })}
                                                            >
                                                                <ArrowRightLeft className="mr-2 h-3.5 w-3.5 text-slate-400" />
                                                                {c.title}
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuGroup>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-xs text-red-600 cursor-pointer">
                                                        View Details
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-900 leading-tight mb-1">
                                                {task.title}
                                            </h4>
                                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                                {task.description}
                                            </p>
                                        </div>

                                        <div className="flex justify-between items-center pt-1">
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                                                    <MessageSquare size={13} />
                                                    {task.comments?.length || 0}
                                                </div>
                                                <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                                                    <Paperclip size={13} />
                                                    {task.attachments?.length || 0}
                                                </div>
                                            </div>
                                            <Avatar className="h-6 w-6 ring-2 ring-white">
                                                <AvatarImage src={task.assignedTo?.avatar} />
                                                <AvatarFallback className="text-[10px] bg-slate-100 text-slate-600 font-bold">
                                                    {task.assignedTo?.name?.split(' ').map((n: string) => n[0]).join('') || '?'}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            {getTasksByStatus(column.id).length === 0 && (
                                <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl py-12 opacity-50">
                                    <p className="text-[11px] text-slate-400 font-medium">No tasks in this stage</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <CreateTaskDialog open={open} onOpenChange={setOpen} initialStatus={selectedStatus} />
        </div>
    );
}
