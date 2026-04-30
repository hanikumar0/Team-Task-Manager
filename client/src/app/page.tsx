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
    <div className="flex flex-col min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      {/* Navigation */}
      <header className="px-6 lg:px-12 h-20 flex items-center backdrop-blur-md bg-slate-950/50 border-b border-slate-800 sticky top-0 z-50">
        <Link className="flex items-center justify-center group" href="/">
          <div className="p-2 bg-emerald-600 rounded-lg group-hover:rotate-12 transition-transform shadow-lg shadow-emerald-600/20">
            <Layout className="h-6 w-6 text-white" />
          </div>
          <span className="ml-3 text-xl font-black tracking-tight text-white italic">Synergy</span>
        </Link>
        <nav className="ml-auto flex gap-8 items-center">
          <Link className="hidden md:block text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors" href="#features">
            Features
          </Link>
          <Link className="hidden md:block text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors" href="#testimonials">
            Testimonials
          </Link>
          <Link className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors" href="/login">
            Sign In
          </Link>
          <Link className="inline-flex h-10 items-center justify-center rounded-full bg-emerald-500 px-6 text-[10px] font-bold uppercase tracking-widest text-slate-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95" href="/signup">
            Get Started
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 lg:py-40 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-emerald-600/10 blur-[150px] rounded-full -z-10 opacity-40"></div>
          <div className="container px-6 mx-auto relative z-10">
            <div className="flex flex-col items-center space-y-12 text-center">
              <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/5 px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-4">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-3 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                The new Synergy is here
              </div>
              <div className="space-y-8 max-w-5xl">
                <h1 className="text-6xl font-black tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-emerald-500/20 leading-[0.9]">
                  Organize your <br /> <span className="text-emerald-500">team's work.</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-slate-400 text-lg md:text-2xl leading-relaxed font-medium">
                  A simple, powerful way to track tasks, collaborate with your team, 
                  and stay on top of your goals.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 pt-6">
                <Link href="/signup" className="group inline-flex h-16 items-center justify-center rounded-full bg-emerald-500 px-12 text-xs font-bold uppercase tracking-widest text-slate-950 shadow-2xl shadow-emerald-500/30 hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95">
                  Get Started for Free <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/login" className="inline-flex h-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/5 px-12 text-xs font-bold uppercase tracking-widest text-emerald-400 backdrop-blur-sm hover:bg-emerald-500/10 transition-all hover:border-emerald-500/50">
                  See how it works
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-32 bg-slate-950 relative">
          <div className="container px-6 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
              <div className="space-y-4 max-w-2xl text-left">
                <h2 className="text-emerald-500 font-bold uppercase tracking-[0.3em] text-xs">Features</h2>
                <h3 className="text-5xl md:text-7xl font-black tracking-tighter">Everything you need <br /> to stay organized.</h3>
              </div>
              <p className="text-slate-500 font-medium text-lg max-w-sm">
                Simple tools to help your team work better together.
              </p>
            </div>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard 
                icon={<Layout className="h-6 w-6 text-emerald-500" />}
                title="Simple Boards"
                description="Easily visualize your work with our drag-and-drop task boards."
              />
              <FeatureCard 
                icon={<Users className="h-6 w-6 text-emerald-500" />}
                title="Team Collaboration"
                description="Keep everyone in sync with real-time updates and shared projects."
              />
              <FeatureCard 
                icon={<BarChart3 className="h-6 w-6 text-emerald-500" />}
                title="Smart Reports"
                description="Track progress and identify bottlenecks with easy-to-read analytics."
              />
              <FeatureCard 
                icon={<ShieldCheck className="h-6 w-6 text-emerald-500" />}
                title="Secure Data"
                description="Your information is protected with enterprise-grade security."
              />
              <FeatureCard 
                icon={<Zap className="h-6 w-6 text-emerald-500" />}
                title="Fast & Reliable"
                description="Built for speed so you can focus on what matters most."
              />
              <FeatureCard 
                icon={<Globe className="h-6 w-6 text-emerald-500" />}
                title="Work Anywhere"
                description="Access your tasks from any device, anywhere in the world."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-32 bg-emerald-600 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_oklch(0.9_0.1_160)_0%,_transparent_100%)] opacity-30"></div>
          <div className="container px-6 mx-auto relative z-10 text-center space-y-12">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-950">Ready to <br /> get started?</h2>
            <p className="text-emerald-950 text-xl md:text-2xl max-w-2xl mx-auto font-bold uppercase tracking-widest opacity-80">
              Join thousands of teams already using Synergy.
            </p>
            <Link href="/signup" className="inline-flex h-20 items-center justify-center rounded-full bg-slate-950 px-16 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-2xl hover:bg-slate-900 transition-all hover:scale-105 active:scale-95">
              Create your account
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 bg-slate-950">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center group">
              <div className="p-2 bg-emerald-600/10 rounded-lg">
                <Layout className="h-5 w-5 text-emerald-500" />
              </div>
              <span className="ml-3 text-xl font-black tracking-tighter italic text-white">Synergy</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600 italic">"Making project management simple."</p>
            <nav className="flex gap-10">
              <Link href="/terms" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Terms</Link>
              <Link href="/privacy" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Privacy</Link>
            </nav>
          </div>
          <div className="mt-20 pt-8 border-t border-white/5 text-center text-[10px] font-bold uppercase tracking-[0.5em] text-slate-700">
            © 2026 SYNERGY. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>

  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="group p-10 rounded-[32px] bg-slate-900 border border-white/5 hover:border-emerald-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2">
      <div className="p-5 bg-emerald-500/5 rounded-2xl inline-block mb-8 group-hover:scale-110 group-hover:bg-emerald-500/10 transition-all duration-500 shadow-inner">
        {icon}
      </div>
      <h4 className="text-2xl font-black mb-4 tracking-tight">{title}</h4>
      <p className="text-slate-400 leading-relaxed font-medium opacity-80 group-hover:opacity-100 transition-opacity">{description}</p>
    </div>
  );
}

