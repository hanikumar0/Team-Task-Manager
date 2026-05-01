'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
    Calendar, 
    Users, 
    CheckCircle2, 
    Clock, 
    ArrowLeft,
    Plus
} from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProjectDetailPage() {
    const { id } = useParams();

    const { data: project, isLoading: isProjectLoading, isError: isProjectError } = useQuery({
        queryKey: ['project', id],
        queryFn: async () => {
            const { data } = await api.get(`/projects/${id}`);
            return data;
        }
    });

    const { data: tasks, isLoading: isTasksLoading, isError: isTasksError } = useQuery({
        queryKey: ['project-tasks', id],
        queryFn: async () => {
            const { data } = await api.get(`/tasks?projectId=${id}`);
            return data;
        }
    });

    if (isProjectLoading) return <ProjectDetailSkeleton />;

    if (isProjectError) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="p-4 bg-red-50 rounded-full mb-4">
                    <Clock className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Project Not Found</h2>
                <p className="text-slate-500 mt-2 max-w-sm">
                    We couldn't retrieve the details for this project. It may have been deleted or you may not have permission to view it.
                </p>
                <Button className="mt-6" variant="outline" asChild>
                    <Link href="/projects">Back to Projects</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Link href="/projects" className="flex items-center text-sm text-slate-500 hover:text-indigo-600 transition-colors">
                <ArrowLeft size={16} className="mr-1" /> Back to Projects
            </Link>

            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold text-slate-900">{project?.name}</h1>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
                            {project?.status}
                        </Badge>
                    </div>
                    <p className="text-slate-500 max-w-2xl">{project?.description}</p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <Plus className="mr-2 h-4 w-4" /> New Task
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Timeline</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-3">
                        <Calendar className="text-indigo-600" size={20} />
                        <span className="text-sm font-semibold">
                            {project?.endDate ? `Ends ${new Date(project.endDate).toLocaleDateString()}` : 'No end date set'}
                        </span>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Team Size</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-3">
                        <Users className="text-purple-600" size={20} />
                        <span className="text-sm font-semibold">{project?.members?.length || 0} Members</span>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Task Completion</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-3">
                        <CheckCircle2 className="text-green-600" size={20} />
                        <span className="text-sm font-semibold">
                            {tasks?.filter((t: any) => t.status === 'Completed').length || 0} / {tasks?.length || 0} Tasks
                        </span>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Project Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-1">
                        {isTasksLoading ? (
                            [1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full mb-2" />)
                        ) : tasks?.length > 0 ? (
                            tasks.map((task: any) => (
                                <div key={task._id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors border-b last:border-0">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-2 h-2 rounded-full ${
                                            task.status === 'Todo' ? 'bg-slate-300' :
                                            task.status === 'In Progress' ? 'bg-blue-500' :
                                            task.status === 'Review' ? 'bg-yellow-500' :
                                            'bg-green-500'
                                        }`}></div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">{task.title}</p>
                                            <p className="text-[10px] text-slate-500">Assigned to {task.assignedTo?.name || 'Unassigned'}</p>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="text-[10px]">
                                        {task.status}
                                    </Badge>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-slate-400 text-sm">
                                No tasks assigned to this project yet.
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function ProjectDetailSkeleton() {
    return (
        <div className="space-y-6">
            <Skeleton className="h-4 w-32" />
            <div className="flex justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-4 w-96" />
                </div>
                <Skeleton className="h-10 w-32" />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-24 w-full" />)}
            </div>
            <Skeleton className="h-64 w-full" />
        </div>
    );
}
