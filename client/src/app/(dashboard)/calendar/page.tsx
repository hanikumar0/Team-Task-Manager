'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { 
    format, 
    addMonths, 
    subMonths, 
    startOfMonth, 
    endOfMonth, 
    startOfWeek, 
    endOfWeek, 
    isSameMonth, 
    isSameDay, 
    addDays, 
    eachDayOfInterval,
    isToday
} from 'date-fns';
import { 
    ChevronLeft, 
    ChevronRight, 
    Plus, 
    Calendar as CalendarIcon,
    MoreHorizontal,
    Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/useAuthStore';
import { Skeleton } from '@/components/ui/skeleton';
import TaskDetailsDialog from '@/components/TaskDetailsDialog';

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [detailOpen, setDetailOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
    const { user } = useAuthStore();
    const isAdmin = user?.role === 'admin';


    const { data: tasks, isLoading } = useQuery({
        queryKey: ['tasks-calendar'],
        queryFn: async () => {
            const { data } = await api.get('/tasks');
            return data;
        }
    });

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    const renderHeader = () => (
        <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Calendar</h1>
                <p className="text-slate-500">Track deadlines and project milestones.</p>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center bg-white border rounded-lg p-1 shadow-sm">
                    <Button variant="ghost" size="icon" onClick={prevMonth} className="h-8 w-8 text-slate-600">
                        <ChevronLeft size={20} />
                    </Button>
                    <div className="px-4 font-semibold text-slate-900 min-w-[140px] text-center">
                        {format(currentDate, 'MMMM yyyy')}
                    </div>
                    <Button variant="ghost" size="icon" onClick={nextMonth} className="h-8 w-8 text-slate-600">
                        <ChevronRight size={20} />
                    </Button>
                </div>
                {isAdmin && (
                    <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-sm">
                        <Plus className="mr-2 h-4 w-4" /> Add Task
                    </Button>
                )}
            </div>
        </div>
    );

    const renderDays = () => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return (
            <div className="grid grid-cols-7 mb-2">
                {days.map((day) => (
                    <div key={day} className="text-center text-sm font-bold text-slate-400 py-2">
                        {day}
                    </div>
                ))}
            </div>
        );
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const calendarDays = eachDayOfInterval({
            start: startDate,
            end: endDate
        });

        return (
            <div className="grid grid-cols-7 bg-slate-200 gap-px border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                {calendarDays.map((day, idx) => {
                    const dayTasks = tasks?.filter((task: any) => 
                        task.dueDate && isSameDay(new Date(task.dueDate), day)
                    ) || [];

                    return (
                        <div
                            key={idx}
                            className={`min-h-[140px] bg-white p-2 transition-colors hover:bg-slate-50 ${
                                !isSameMonth(day, monthStart) ? 'bg-slate-50/50 text-slate-400' : 'text-slate-900'
                            }`}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className={`text-sm font-semibold h-7 w-7 flex items-center justify-center rounded-full ${
                                    isToday(day) ? 'bg-indigo-600 text-white' : ''
                                }`}>
                                    {format(day, 'd')}
                                </span>
                                {dayTasks.length > 0 && (
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                                        {dayTasks.length} {dayTasks.length === 1 ? 'Task' : 'Tasks'}
                                    </span>
                                )}
                            </div>
                            <div className="space-y-1">
                                {dayTasks.slice(0, 3).map((task: any) => (
                                    <div 
                                        key={task._id} 
                                        className={`text-[10px] p-1.5 rounded border truncate cursor-pointer transition-all hover:scale-[1.02] ${
                                            task.priority === 'Urgent' ? 'bg-red-50 border-red-100 text-red-700' :
                                            task.priority === 'High' ? 'bg-orange-50 border-orange-100 text-orange-700' :
                                            'bg-indigo-50 border-indigo-100 text-indigo-700'
                                        }`}
                                        onClick={() => { setSelectedTaskId(task._id); setDetailOpen(true); }}
                                    >
                                        {task.title}
                                    </div>
                                ))}
                                {dayTasks.length > 3 && (
                                    <div className="text-[9px] text-slate-400 font-medium pl-1">
                                        + {dayTasks.length - 3} more
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    if (isLoading) return <CalendarSkeleton />;

    return (
        <div className="h-full flex flex-col">
            {renderHeader()}
            <div className="flex-1 bg-white p-6 rounded-2xl border shadow-sm overflow-auto">
                {renderDays()}
                {renderCells()}
            </div>
            <TaskDetailsDialog taskId={selectedTaskId} open={detailOpen} onOpenChange={setDetailOpen} />
        </div>
    );
}

function CalendarSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-10 w-64" />
            </div>
            <div className="bg-white p-6 rounded-2xl border shadow-sm">
                <div className="grid grid-cols-7 gap-4 mb-4">
                    {[1, 2, 3, 4, 5, 6, 7].map(i => <Skeleton key={i} className="h-6 w-full" />)}
                </div>
                <div className="grid grid-cols-7 gap-px bg-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                    {Array.from({ length: 35 }).map((_, i) => (
                        <Skeleton key={i} className="h-32 bg-white rounded-none" />
                    ))}
                </div>
            </div>
        </div>
    );
}
