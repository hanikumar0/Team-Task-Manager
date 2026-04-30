'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle,
    DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Loader2 } from 'lucide-react';

interface CreateProjectDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CreateProjectDialog({ open, onOpenChange }: CreateProjectDialogProps) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        endDate: '',
        priority: 'Medium'
    });
    const [selectedMembers, setSelectedMembers] = useState<any[]>([]);
    const queryClient = useQueryClient();

    const { data: users } = useQuery({
        queryKey: ['users-list'],
        queryFn: async () => {
            const { data } = await api.get('/auth/users');
            return data;
        }
    });

    const createMutation = useMutation({
        mutationFn: (newProject: any) => api.post('/projects', newProject),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            onOpenChange(false);
            setFormData({ name: '', description: '', endDate: '', priority: 'Medium' });
            setSelectedMembers([]);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createMutation.mutate({
            ...formData,
            members: selectedMembers.map(m => m._id)
        });
    };

    const toggleMember = (user: any) => {
        if (selectedMembers.find(m => m._id === user._id)) {
            setSelectedMembers(selectedMembers.filter(m => m._id !== user._id));
        } else {
            setSelectedMembers([...selectedMembers, user]);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Create New Project</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Project Name</Label>
                        <Input 
                            id="name" 
                            placeholder="e.g. Website Redesign" 
                            required 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <textarea 
                            id="description"
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Briefly describe the project goals..."
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="endDate">End Date</Label>
                            <Input 
                                id="endDate" 
                                type="date" 
                                required 
                                value={formData.endDate}
                                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="priority">Priority</Label>
                            <select 
                                id="priority"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                value={formData.priority}
                                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Urgent">Urgent</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Assign Members</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {selectedMembers.map(member => (
                                <Badge key={member._id} className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                                    {member.name}
                                    <X size={12} className="ml-1 cursor-pointer" onClick={() => toggleMember(member)} />
                                </Badge>
                            ))}
                        </div>
                        <div className="max-h-[120px] overflow-y-auto border rounded-md p-2 space-y-1">
                            {users?.map((user: any) => (
                                <div 
                                    key={user._id}
                                    className={`text-sm p-2 rounded cursor-pointer transition-colors ${
                                        selectedMembers.find(m => m._id === user._id) 
                                            ? 'bg-indigo-50 text-indigo-700' 
                                            : 'hover:bg-slate-50'
                                    }`}
                                    onClick={() => toggleMember(user)}
                                >
                                    {user.name} ({user.role})
                                </div>
                            ))}
                        </div>
                    </div>
                    <DialogFooter className="pt-4">
                        <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={createMutation.isPending}>
                            {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Project
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
