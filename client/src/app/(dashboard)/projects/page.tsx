'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Users, Calendar, MoreVertical, ExternalLink } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';
import CreateProjectDialog from '@/components/CreateProjectDialog';

export default function ProjectsPage() {
    const [open, setOpen] = useState(false);
    const { user } = useAuthStore();
    const isAdmin = user?.role === 'Admin';
    
    const { data: projects, isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const { data } = await api.get('/projects');
            return data;
        }
    });

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-10 w-48" />
                    {isAdmin && <Skeleton className="h-10 w-32" />}
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Skeleton key={i} className="h-48 w-full rounded-xl" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">{isAdmin ? 'Projects' : 'My Projects'}</h1>
                    <p className="text-slate-500">{isAdmin ? 'Manage and track all your active projects.' : 'View projects you are currently assigned to.'}</p>
                </div>
                {isAdmin && (
                    <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={() => setOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" /> New Project
                    </Button>
                )}
            </div>

            {projects?.length === 0 ? (
                <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed">
                    <div className="p-4 bg-indigo-50 rounded-full mb-4">
                        <Plus className="h-8 w-8 text-indigo-600" />
                    </div>
                    <CardTitle className="text-xl">No projects found</CardTitle>
                    <CardDescription className="mt-2">
                        {isAdmin 
                            ? 'Get started by creating your first project and inviting your team.' 
                            : 'You are not assigned to any projects yet. Contact your administrator.'}
                    </CardDescription>
                    {isAdmin && (
                        <Button className="mt-6 bg-indigo-600 hover:bg-indigo-700" onClick={() => setOpen(true)}>
                            Create Project
                        </Button>
                    )}
                </Card>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects?.map((project: any) => (
                        <Card key={project._id} className="group hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-100 mb-2">
                                        {project.status}
                                    </Badge>
                                    {isAdmin && (
                                        <button className="text-slate-400 hover:text-slate-600">
                                            <MoreVertical size={18} />
                                        </button>
                                    )}
                                </div>
                                <CardTitle className="text-xl font-bold group-hover:text-indigo-600 transition-colors">
                                    {project.name}
                                </CardTitle>
                                <CardDescription className="line-clamp-2 mt-1">
                                    {project.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pb-4">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <Calendar size={16} />
                                        <span>Due: {new Date(project.endDate).toLocaleDateString() || 'No date'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <Users size={16} />
                                        <span>{project.members?.length || 0} Members</span>
                                    </div>
                                    <div className="w-full bg-slate-100 h-2 rounded-full mt-4">
                                        <div className="bg-indigo-600 h-full rounded-full" style={{ width: '65%' }}></div>
                                    </div>
                                    <div className="flex justify-between text-xs font-medium text-slate-500">
                                        <span>Progress</span>
                                        <span>65%</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-0">
                                <Link href={`/projects/${project._id}`} className="w-full">
                                    <Button variant="outline" className="w-full group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-200">
                                        View Details <ExternalLink className="ml-2 h-3 w-3" />
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
            <CreateProjectDialog open={open} onOpenChange={setOpen} />
        </div>
    );
}
