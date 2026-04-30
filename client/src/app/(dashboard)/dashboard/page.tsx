'use client';

import { useAuthStore } from '@/store/useAuthStore';
import dynamic from 'next/dynamic';

const AdminDashboard = dynamic(() => import('@/components/AdminDashboard'), { ssr: false });
const MemberDashboard = dynamic(() => import('@/components/MemberDashboard'), { ssr: false });

export default function DashboardPage() {
    const { user } = useAuthStore();

    if (!user) return null;

    return (
        <>
            {user.role === 'Admin' ? <AdminDashboard /> : <MemberDashboard />}
        </>
    );
}
