'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import AdminDashboard from '@/components/AdminDashboard';

/**
 * PHASE 6: Admin-only Protected Route
 */
export default function AdminDashboardPage() {
    const { user, _hasHydrated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (_hasHydrated && user && user.role !== 'admin') {
            router.push('/member/dashboard');
        }
    }, [user, _hasHydrated, router]);

    if (!_hasHydrated || !user || user.role !== 'admin') return null;

    return <AdminDashboard />;
}
