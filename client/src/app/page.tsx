import Link from 'next/link';
import { CheckCircle, Layout, Users, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-white border-b sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="/">
          <Layout className="h-6 w-6 text-indigo-600" />
          <span className="ml-2 text-xl font-bold text-slate-900">TeamTask Pro</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-indigo-600 transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-indigo-600 transition-colors" href="/login">
            Login
          </Link>
          <Link className="inline-flex h-9 items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-indigo-700" href="/signup">
            Get Started
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-slate-900">
                  Manage Projects with <span className="text-indigo-600">Precision</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-slate-500 md:text-xl dark:text-slate-400">
                  The ultimate SaaS platform for teams to collaborate, track tasks, and achieve goals faster than ever.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/signup" className="inline-flex h-11 items-center justify-center rounded-md bg-indigo-600 px-8 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-indigo-700">
                  Get Started
                </Link>
                <Link href="/login" className="inline-flex h-11 items-center justify-center rounded-md border border-slate-200 bg-white px-8 py-2 text-sm font-medium text-slate-900 shadow-sm transition-colors hover:bg-slate-100">
                  Live Demo
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="p-3 bg-indigo-100 rounded-full">
                  <Layout className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold">Kanban Boards</h3>
                <p className="text-slate-500">Visualize your workflow and move tasks through stages with ease.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="p-3 bg-indigo-100 rounded-full">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold">Team Collaboration</h3>
                <p className="text-slate-500">Invite members, assign tasks, and communicate in real-time.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="p-3 bg-indigo-100 rounded-full">
                  <Zap className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold">Real-time Analytics</h3>
                <p className="text-slate-500">Monitor progress with beautiful charts and data-driven insights.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
        <p className="text-xs text-slate-500">© 2026 TeamTask Pro. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-slate-500" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-slate-500" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
