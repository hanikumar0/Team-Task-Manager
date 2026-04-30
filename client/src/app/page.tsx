import Link from 'next/link';
import Image from 'next/image';
import { 
  Layout, 
  Users, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  BarChart3, 
  ShieldCheck, 
  Globe 
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
      {/* Navigation */}
      <header className="px-6 lg:px-12 h-20 flex items-center backdrop-blur-md bg-slate-950/50 border-b border-slate-800 sticky top-0 z-50">
        <Link className="flex items-center justify-center group" href="/">
          <div className="p-2 bg-indigo-600 rounded-lg group-hover:rotate-12 transition-transform">
            <Layout className="h-6 w-6 text-white" />
          </div>
          <span className="ml-3 text-xl font-black tracking-tight text-white">TeamTask<span className="text-indigo-500">Pro</span></span>
        </Link>
        <nav className="ml-auto flex gap-8 items-center">
          <Link className="hidden md:block text-sm font-medium text-slate-400 hover:text-white transition-colors" href="#features">
            Features
          </Link>
          <Link className="hidden md:block text-sm font-medium text-slate-400 hover:text-white transition-colors" href="#testimonials">
            Testimonials
          </Link>
          <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" href="/login">
            Login
          </Link>
          <Link className="inline-flex h-10 items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-slate-950 shadow-lg shadow-white/10 hover:bg-slate-200 transition-all hover:scale-105 active:scale-95" href="/signup">
            Join Now
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 lg:py-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/20 blur-[120px] rounded-full -z-10 opacity-50"></div>
          <div className="container px-6 mx-auto relative z-10">
            <div className="flex flex-col items-center space-y-10 text-center">
              <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-400 mb-4 animate-fade-in">
                <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
                v2.0 is now live!
              </div>
              <div className="space-y-6 max-w-4xl">
                <h1 className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
                  Manage Projects with <span className="text-indigo-500">Pure Precision</span>
                </h1>
                <p className="mx-auto max-w-[800px] text-slate-400 text-lg md:text-xl leading-relaxed">
                  The ultimate collaboration platform designed for high-performance teams. 
                  Streamline your workflow, crush your goals, and scale faster with TeamTask Pro.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup" className="group inline-flex h-14 items-center justify-center rounded-full bg-indigo-600 px-10 text-base font-bold text-white shadow-xl shadow-indigo-600/20 hover:bg-indigo-500 transition-all hover:scale-105">
                  Get Started Free <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/login" className="inline-flex h-14 items-center justify-center rounded-full border border-slate-700 bg-slate-900/50 px-10 text-base font-bold text-white backdrop-blur-sm hover:bg-slate-800 transition-all">
                  Book a Demo
                </Link>
              </div>

              {/* Mockup Image */}
              <div className="relative w-full max-w-5xl mt-20 group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
                   <img 
                    src="/team_task_pro_hero_mockup_1777533207259.png" 
                    alt="Dashboard Mockup" 
                    className="w-full h-auto transform transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-24 bg-slate-950 relative">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-indigo-500 font-bold tracking-widest uppercase text-sm">Features</h2>
              <h3 className="text-4xl md:text-5xl font-bold">Built for the modern team</h3>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard 
                icon={<Layout className="h-6 w-6 text-indigo-500" />}
                title="Kanban Perfection"
                description="Visualize your work with our lightning-fast drag-and-drop boards."
              />
              <FeatureCard 
                icon={<Users className="h-6 w-6 text-indigo-500" />}
                title="Team Synergy"
                description="Real-time collaboration tools that keep everyone on the same page."
              />
              <FeatureCard 
                icon={<BarChart3 className="h-6 w-6 text-indigo-500" />}
                title="Deep Insights"
                description="Powerful analytics to track productivity and identify bottlenecks."
              />
              <FeatureCard 
                icon={<ShieldCheck className="h-6 w-6 text-indigo-500" />}
                title="Enterprise Security"
                description="Your data is protected with military-grade encryption and RBAC."
              />
              <FeatureCard 
                icon={<Zap className="h-6 w-6 text-indigo-500" />}
                title="Instant Performance"
                description="Optimized for speed. No lag, no friction, just pure productivity."
              />
              <FeatureCard 
                icon={<Globe className="h-6 w-6 text-indigo-500" />}
                title="Global Sync"
                description="Access your projects from anywhere in the world on any device."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-24 bg-indigo-600 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-50"></div>
          <div className="container px-6 mx-auto relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-8">Ready to transform your workflow?</h2>
            <p className="text-indigo-100 text-xl mb-12 max-w-2xl mx-auto font-medium">
              Join 10,000+ teams already using TeamTask Pro to build the future.
            </p>
            <Link href="/signup" className="inline-flex h-16 items-center justify-center rounded-full bg-white px-12 text-lg font-black text-indigo-600 shadow-2xl hover:bg-slate-100 transition-all hover:scale-105 active:scale-95">
              Start Your Free Trial
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-slate-900 bg-slate-950">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center group">
              <Layout className="h-6 w-6 text-indigo-500" />
              <span className="ml-3 text-xl font-black tracking-tight">TeamTask<span className="text-indigo-500">Pro</span></span>
            </div>
            <p className="text-sm text-slate-500 italic">"The only task manager you'll ever need."</p>
            <nav className="flex gap-8">
              <Link className="text-xs text-slate-500 hover:text-white transition-colors" href="#">Terms</Link>
              <Link className="text-xs text-slate-500 hover:text-white transition-colors" href="#">Privacy</Link>
              <Link className="text-xs text-slate-500 hover:text-white transition-colors" href="#">Twitter</Link>
              <Link className="text-xs text-slate-500 hover:text-white transition-colors" href="#">GitHub</Link>
            </nav>
          </div>
          <div className="mt-12 text-center text-xs text-slate-600">
            © 2026 TeamTask Pro. Designed for performance.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="group p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all hover:shadow-2xl hover:shadow-indigo-500/5">
      <div className="p-4 bg-indigo-500/10 rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h4 className="text-xl font-bold mb-3">{title}</h4>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}
