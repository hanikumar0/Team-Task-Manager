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
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r h-screen sticky top-0 z-50">
            <div className="p-6 flex items-center gap-2 mb-4">
                <Layout className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold tracking-tight text-slate-900">
                    Synergy
                </span>
            </div>
            
            <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-4 mb-2 opacity-50">Menu</p>
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                            pathname === item.href
                                ? "bg-primary/10 text-primary"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        )}
                    >
                        <item.icon className={cn(
                            "h-4 w-4",
                            pathname === item.href ? "text-primary" : "text-slate-400"
                        )} />
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="p-4 mt-auto">
                <div className="bg-slate-50 rounded-xl p-4 border mb-2">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-xs">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-semibold truncate text-slate-900">{user?.name}</p>
                            <p className="text-[10px] text-muted-foreground uppercase">{user?.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => logout()}
                        className="flex items-center justify-center gap-2 px-3 py-2 w-full rounded-lg text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors border border-destructive/10"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </button>
                </div>
            </div>
        </aside>
    );
}
