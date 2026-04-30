'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { token } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.push('/login');
        }
    }, [token, router]);

    if (!token) return null;

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
