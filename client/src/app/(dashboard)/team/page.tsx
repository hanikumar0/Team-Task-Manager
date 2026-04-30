'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Mail, Shield, UserPlus, MoreHorizontal, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { Skeleton } from '@/components/ui/skeleton';

export default function TeamPage() {
    const { user } = useAuthStore();
    const isAdmin = user?.role === 'Admin';

    const { data: members, isLoading } = useQuery({
        queryKey: ['team-members'],
        queryFn: async () => {
            const { data } = await api.get('/auth/users');
            return data;
        },
        enabled: isAdmin
    });

    if (!isAdmin) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
                <Shield className="h-16 w-16 text-slate-300" />
                <h2 className="text-2xl font-bold text-slate-900">Access Denied</h2>
                <p className="text-slate-500">Only administrators can access the team management page.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Team Members</h1>
                    <p className="text-slate-500">Manage your team and their roles.</p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <UserPlus className="mr-2 h-4 w-4" /> Invite Member
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead>Member</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Joined Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            [1, 2, 3].map(i => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-10 w-40" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                                </TableRow>
                            ))
                        ) : (
                            members?.map((member: any) => (
                                <TableRow key={member._id} className="hover:bg-slate-50 transition-colors">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={member.avatar} />
                                                <AvatarFallback className="bg-indigo-100 text-indigo-600 font-bold">
                                                    {member.name?.split(' ').map((n: string) => n[0]).join('') || '?'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="text-sm font-semibold text-slate-900">{member.name}</div>
                                                <div className="text-xs text-slate-500 flex items-center gap-1">
                                                    <Mail size={12} /> {member.email}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1.5 text-sm text-slate-700">
                                            {member.role === 'Admin' ? <Shield size={14} className="text-indigo-600" /> : null}
                                            {member.role}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="text-green-600 border-green-100 bg-green-50">
                                            Active
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-sm text-slate-700">
                                        {new Date(member.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <button className="text-slate-400 hover:text-slate-600 p-1">
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
