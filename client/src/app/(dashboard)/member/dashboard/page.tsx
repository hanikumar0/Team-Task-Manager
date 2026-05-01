'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import MemberDashboard from '@/components/MemberDashboard';

/**
 * PHASE 6: Member-only Protected Route
 */
export default function MemberDashboardPage() {
    const { user, _hasHydrated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (_hasHydrated && user && user.role === 'admin') {
            router.push('/admin/dashboard');
        }
    }, [user, _hasHydrated, router]);

    if (!_hasHydrated || !user || user.role !== 'member') return null;

    return <MemberDashboard />;
}
