'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
    const user = useAuthStore((state) => state.user);

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500">Manage your account settings and preferences.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal details and avatar.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={user?.avatar} />
                            <AvatarFallback className="bg-indigo-100 text-indigo-600 font-bold text-xl">
                                {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                            <Button variant="outline" size="sm">Change Avatar</Button>
                            <p className="text-xs text-slate-500">JPG, GIF or PNG. Max size of 2MB.</p>
                        </div>
                    </div>

                    <Separator />

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue={user?.name} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" defaultValue={user?.email} disabled />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea 
                            id="bio" 
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Tell us a little about yourself"
                        ></textarea>
                    </div>

                    <Button className="bg-indigo-600 hover:bg-indigo-700">Save Changes</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>Update your password and security settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" />
                        </div>
                    </div>
                    <Button variant="outline">Update Password</Button>
                </CardContent>
            </Card>
        </div>
    );
}
