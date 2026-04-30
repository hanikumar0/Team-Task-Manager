import { Layout } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-background">
            <div className="hidden lg:flex flex-col justify-between p-16 relative overflow-hidden bg-primary">
                {/* Abstract Background Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/10 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2" />
                
                <Link href="/" className="flex items-center gap-3 text-2xl font-black tracking-tight text-primary-foreground relative z-10 group">
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm group-hover:rotate-12 transition-transform duration-300">
                        <Layout className="h-6 w-6" />
                    </div>
                    Synergy
                </Link>

                <div className="relative z-10 space-y-8">
                    <h2 className="text-6xl font-black leading-[1.1] text-primary-foreground tracking-tight animate-in-fade">
                        Organize your <br />
                        <span className="opacity-60 italic">team's world.</span>
                    </h2>
                    <p className="text-primary-foreground/80 text-xl max-w-lg font-medium leading-relaxed">
                        A beautiful, simple way for teams to work together. 
                        Stay in sync and achieve more every day.
                    </p>
                </div>

                <div className="relative z-10">
                    <div className="p-8 glass rounded-3xl border-white/10 shadow-2xl">
                        <p className="text-primary-foreground font-bold italic mb-4 leading-relaxed">
                            "Synergy has completely changed how we work. It's so simple to use, yet incredibly powerful."
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20" />
                            <div>
                                <p className="text-sm font-bold text-primary-foreground">Sarah Jenkins</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground/60">Founder, Creative Studio</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center p-8 lg:p-20 bg-background relative">
                <div className="w-full max-w-md animate-in-fade">
                    {children}
                </div>
            </div>
        </div>
    );
}

