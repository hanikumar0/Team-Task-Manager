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
        <aside className="hidden lg:flex flex-col w-72 glass border-r border-white/5 h-screen sticky top-0 z-50">
            <div className="p-10 flex items-center gap-4">
                <div className="p-2.5 bg-primary rounded-[18px] shadow-2xl shadow-primary/40 rotate-3">
                    <Layout className="h-6 w-6 text-primary-foreground stroke-[2.5]" />
                </div>
                <span className="text-2xl font-black tracking-tighter text-white italic">
                    Synergy
                </span>
            </div>
            
            <nav className="flex-1 px-8 space-y-3 overflow-y-auto py-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 px-4 mb-6">Network</p>
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-5 px-5 py-4 rounded-[20px] text-xs font-black uppercase tracking-widest transition-all duration-500 group",
                            pathname === item.href
                                ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/20 neon-glow"
                                : "text-muted-foreground hover:bg-white/5 hover:text-white"
                        )}
                    >
                        <item.icon className={cn(
                            "h-5 w-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6",
                            pathname === item.href ? "text-primary-foreground stroke-[2.5]" : "text-muted-foreground/50 stroke-[1.5]"
                        )} />
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="p-8 mt-auto">
                <div className="bg-white/5 rounded-[32px] p-6 border border-white/5 shadow-2xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary font-black border border-primary/20">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-black truncate text-white leading-tight">{user?.name}</p>
                            <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-1 italic">{user?.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => logout()}
                        className="flex items-center justify-center gap-3 px-6 py-4 w-full rounded-2xl text-[10px] font-black uppercase tracking-widest text-destructive hover:bg-destructive/10 transition-all border border-destructive/20 shadow-inner"
                    >
                        <LogOut className="h-4 w-4 stroke-[2.5]" />
                        Sign Out
                    </button>
                </div>
            </div>
        </aside>
    );
}
