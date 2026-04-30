'use client';

import { useAuthStore } from '@/store/useAuthStore';
import AdminDashboard from '@/components/AdminDashboard';
import MemberDashboard from '@/components/MemberDashboard';

export default function DashboardPage() {
    const { user } = useAuthStore();

    if (!user) return null;

    return (
        <>
            {user.role === 'Admin' ? <AdminDashboard /> : <MemberDashboard />}
        </>
    );
}
