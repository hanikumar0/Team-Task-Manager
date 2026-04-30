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
        <aside className="hidden lg:flex flex-col w-72 glass border-r h-screen sticky top-0 z-50">
            <div className="p-8 flex items-center gap-3 px-2">
                <div className="p-2 bg-primary rounded-xl shadow-lg shadow-primary/20">
                    <Layout className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-black tracking-tight text-foreground italic">
                    Synergy
                </span>
            </div>
            
            <nav className="flex-1 px-6 space-y-2 overflow-y-auto py-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 px-4 mb-4">Main Menu</p>
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 group",
                            pathname === item.href
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/10"
                                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        )}
                    >
                        <item.icon className={cn(
                            "h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                            pathname === item.href ? "text-primary-foreground" : "text-muted-foreground/70"
                        )} />
                        {item.label}
                        {pathname === item.href && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                        )}
                    </Link>
                ))}
            </nav>

            <div className="p-6 mt-auto">
                <div className="bg-muted/30 rounded-3xl p-5 border border-border/50 mb-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-bold truncate text-foreground">{user?.name}</p>
                            <p className="text-[10px] font-medium text-muted-foreground uppercase">{user?.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => logout()}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 w-full rounded-xl text-xs font-black text-destructive hover:bg-destructive/10 transition-all border border-destructive/20"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </button>
                </div>
            </div>
        </aside>
    );
}

