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
import { Plus, Mail, Shield, UserPlus, MoreHorizontal } from 'lucide-react';

export default function TeamPage() {
    // Mock data for members
    const members = [
        { id: 1, name: 'Alex Johnson', email: 'alex@example.com', role: 'Admin', status: 'Active', tasks: 12 },
        { id: 2, name: 'Sarah Miller', email: 'sarah@example.com', role: 'Member', status: 'Active', tasks: 8 },
        { id: 3, name: 'Michael Chen', email: 'michael@example.com', role: 'Member', status: 'Idle', tasks: 0 },
        { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'Member', status: 'Away', tasks: 5 },
    ];

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
                            <TableHead>Active Tasks</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {members.map((member) => (
                            <TableRow key={member.id} className="hover:bg-slate-50 transition-colors">
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarFallback className="bg-indigo-100 text-indigo-600 font-bold">
                                                {member.name.split(' ').map(n => n[0]).join('')}
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
                                    <Badge variant="outline" className={
                                        member.status === 'Active' ? 'text-green-600 border-green-100 bg-green-50' :
                                        member.status === 'Away' ? 'text-yellow-600 border-yellow-100 bg-yellow-50' :
                                        'text-slate-500 border-slate-100 bg-slate-50'
                                    }>
                                        {member.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-sm text-slate-700">
                                    {member.tasks} tasks
                                </TableCell>
                                <TableCell className="text-right">
                                    <button className="text-slate-400 hover:text-slate-600 p-1">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
