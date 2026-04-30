'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    LayoutDashboard, 
    FolderKanban, 
    CheckSquare, 
    Users, 
    Calendar, 
    BarChart3, 
    Settings, 
    LogOut,
    Layout,
    Bell,
    UserCircle,
    History
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuthStore';

export default function Sidebar() {
    const pathname = usePathname();
    const { logout, user } = useAuthStore();
    const isAdmin = user?.role === 'Admin';

    const adminItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
        { icon: FolderKanban, label: 'Projects', href: '/projects' },
        { icon: CheckSquare, label: 'Tasks', href: '/tasks' },
        { icon: Users, label: 'Team Members', href: '/team' },
        { icon: BarChart3, label: 'Reports', href: '/reports' },
        { icon: Calendar, label: 'Calendar', href: '/calendar' },
        { icon: History, label: 'Activity Logs', href: '/activity' },
        { icon: Settings, label: 'Settings', href: '/settings' },
    ];

    const memberItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
        { icon: FolderKanban, label: 'My Projects', href: '/projects' },
        { icon: CheckSquare, label: 'My Tasks', href: '/tasks' },
        { icon: Calendar, label: 'Calendar', href: '/calendar' },
        { icon: UserCircle, label: 'Profile', href: '/settings' },
    ];

    const menuItems = isAdmin ? adminItems : memberItems;

    return (
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r h-screen sticky top-0">
            <div className="p-6 flex items-center gap-2 font-bold text-xl text-indigo-600">
                <Layout className="h-6 w-6" />
                TeamTask Pro
            </div>
            <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                            pathname === item.href
                                ? "bg-indigo-50 text-indigo-600"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                    </Link>
                ))}
            </nav>
            <div className="p-4 border-t">
                <button
                    onClick={() => logout()}
                    className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                    <LogOut className="h-5 w-5" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
