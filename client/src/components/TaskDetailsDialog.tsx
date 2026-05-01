'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle 
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
    Calendar, 
    Clock, 
    MessageSquare, 
    Send, 
    Paperclip,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

interface TaskDetailsDialogProps {
    taskId: string | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function TaskDetailsDialog({ taskId, open, onOpenChange }: TaskDetailsDialogProps) {
    const [commentText, setCommentText] = useState('');
    const queryClient = useQueryClient();

    const { data: task, isLoading } = useQuery({
        queryKey: ['task', taskId],
        queryFn: async () => {
            if (!taskId) return null;
            const { data } = await api.get(`/tasks/${taskId}`);
            return data;
        },
        enabled: !!taskId
    });

    const addCommentMutation = useMutation({
        mutationFn: (text: string) => api.post(`/tasks/${taskId}/comments`, { text }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['task', taskId] });
            setCommentText('');
            toast.success('Comment added');
        }
    });

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        addCommentMutation.mutate(commentText);
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'Urgent': return 'bg-red-100 text-red-700 border-red-200';
            case 'High': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'Medium': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Completed': return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
            case 'In Progress': return <Clock className="h-4 w-4 text-blue-500" />;
            default: return <AlertCircle className="h-4 w-4 text-slate-400" />;
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                {isLoading ? (
                    <div className="space-y-4 py-4">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-20 w-full" />
                        <div className="grid grid-cols-2 gap-4">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                        </div>
                    </div>
                ) : task ? (
                    <>
                        <DialogHeader>
                            <div className="flex items-center gap-2 mb-2">
                                <Badge className={getPriorityColor(task.priority)}>
                                    {task.priority} Priority
                                </Badge>
                                <Badge variant="outline" className="flex items-center gap-1.5 font-semibold">
                                    {getStatusIcon(task.status)}
                                    {task.status}
                                </Badge>
                            </div>
                            <DialogTitle className="text-2xl font-bold text-slate-900 leading-tight">
                                {task.title}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-6 py-4">
                            <div className="space-y-2">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Description</h4>
                                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    {task.description || 'No description provided.'}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Project</h4>
                                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                                            <Paperclip size={16} className="text-indigo-600" />
                                        </div>
                                        {task.projectId?.name}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Due Date</h4>
                                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                                            <Calendar size={16} className="text-orange-600" />
                                        </div>
                                        {task.dueDate ? format(new Date(task.dueDate), 'PPP') : 'No deadline'}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Assignee</h4>
                                <div className="flex items-center gap-3 p-3 bg-white border rounded-xl shadow-sm">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={task.assignedTo?.avatar} />
                                        <AvatarFallback className="bg-indigo-100 text-indigo-600 font-bold">
                                            {task.assignedTo?.name?.charAt(0) || '?'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">{task.assignedTo?.name || 'Unassigned'}</p>
                                        <p className="text-[10px] text-slate-500 font-medium">{task.assignedTo?.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t">
                                <div className="flex items-center gap-2">
                                    <MessageSquare size={18} className="text-slate-400" />
                                    <h4 className="text-sm font-bold text-slate-800">Comments</h4>
                                </div>

                                <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2">
                                    {task.comments?.length > 0 ? (
                                        task.comments.map((comment: any, idx: number) => (
                                            <div key={idx} className="flex gap-3">
                                                <Avatar className="h-8 w-8 shrink-0">
                                                    <AvatarImage src={comment.user?.avatar} />
                                                    <AvatarFallback className="text-[10px] font-bold">
                                                        {comment.user?.name?.charAt(0) || '?'}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 bg-slate-50 p-3 rounded-2xl rounded-tl-none border border-slate-100">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-[11px] font-bold text-slate-900">{comment.user?.name}</span>
                                                        <span className="text-[9px] text-slate-400">{format(new Date(comment.createdAt), 'MMM d, p')}</span>
                                                    </div>
                                                    <p className="text-xs text-slate-600 leading-relaxed">{comment.text}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-6 bg-slate-50 rounded-xl border border-dashed">
                                            <p className="text-xs text-slate-400">No comments yet. Start the conversation!</p>
                                        </div>
                                    )}
                                </div>

                                <form onSubmit={handleCommentSubmit} className="relative mt-2">
                                    <textarea 
                                        className="w-full bg-white border border-slate-200 rounded-xl p-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all min-h-[80px]"
                                        placeholder="Write a comment..."
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                    />
                                    <Button 
                                        type="submit" 
                                        size="icon" 
                                        className="absolute bottom-3 right-3 h-8 w-8 bg-indigo-600 hover:bg-indigo-700"
                                        disabled={!commentText.trim() || addCommentMutation.isPending}
                                    >
                                        <Send size={14} />
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="p-8 text-center">
                        <p className="text-slate-500">Failed to load task details.</p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
