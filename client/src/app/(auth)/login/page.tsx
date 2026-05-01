'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const router = useRouter();
    const { setUser, setToken } = useAuthStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const trimmedEmail = email.trim().toLowerCase();
            const trimmedPassword = password.trim();
            const { data } = await api.post('/auth/login', { 
                email: trimmedEmail, 
                password: trimmedPassword 
            });

            setUser(data.user);
            setToken(data.token);
            
            // Phase 5: Redirect by role (lowercase comparison)
            if (data.user.role === 'admin') {
                router.push('/admin/dashboard');
            } else {
                router.push('/member/dashboard');
            }

        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-10">
            <div className="flex lg:hidden items-center gap-3 text-2xl font-black text-primary mb-8">
                <div className="p-2 bg-primary rounded-xl shadow-lg shadow-primary/20">
                    <Layout className="h-6 w-6 text-primary-foreground" />
                </div>
                Synergy
            </div>
            
            <div className="space-y-3">
                <h1 className="text-4xl font-black tracking-tighter text-foreground">Welcome back</h1>
                <p className="text-muted-foreground font-medium">
                    Please sign in to access your dashboard.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="p-5 text-sm font-bold text-destructive bg-destructive/10 rounded-2xl border border-destructive/20 animate-in-fade flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                        {error}
                    </div>
                )}
                
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</Label>
                    <Input 
                        id="email" 
                        type="email" 
                        placeholder="you@example.com" 
                        className="h-14 rounded-2xl bg-muted/30 border-none focus-visible:ring-primary/20 font-medium px-6"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between ml-1">
                        <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Password</Label>
                        <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline transition-opacity">
                            Forgot Password?
                        </Link>
                    </div>
                    <Input 
                        id="password" 
                        type="password" 
                        className="h-14 rounded-2xl bg-muted/30 border-none focus-visible:ring-primary/20 font-medium px-6"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                </div>

                <Button type="submit" className="w-full h-14 rounded-2xl bg-primary hover:brightness-110 text-primary-foreground font-bold text-sm uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-95" disabled={loading}>
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Signing in...
                        </div>
                    ) : 'Sign In'}
                </Button>
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
                    <span className="bg-background px-4 text-muted-foreground/60">
                        Or continue with
                    </span>
                </div>
            </div>

            <Button variant="outline" type="button" className="w-full h-14 rounded-2xl border-border/50 hover:bg-muted/50 font-bold transition-all active:scale-95">
                <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                    <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                    />
                    <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                    />
                    <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                        fill="#FBBC05"
                    />
                    <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                    />
                </svg>
                Sign in with Google
            </Button>

            <div className="text-center pt-4">
                <p className="text-sm font-medium text-muted-foreground">
                    New to Synergy?{' '}
                    <Link href="/signup" className="text-primary font-bold uppercase tracking-widest text-[10px] hover:underline underline-offset-4 ml-1">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
}

