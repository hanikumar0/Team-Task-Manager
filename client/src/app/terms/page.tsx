import Link from 'next/link';
import { Layout, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-emerald-500/30">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 px-8 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center group">
                    <div className="p-2 bg-emerald-600 rounded-lg group-hover:rotate-12 transition-transform shadow-lg shadow-emerald-600/20">
                        <Layout className="h-6 w-6 text-white" />
                    </div>
                    <span className="ml-3 text-xl font-black tracking-tight text-white italic">Synergy</span>
                </Link>
                <Link href="/" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back to Home
                </Link>
            </nav>

            <main className="pt-40 pb-24 px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-8">
                        <ShieldCheck className="h-4 w-4" /> Legal Framework
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-tight">
                        Terms of <span className="text-emerald-500">Service</span>
                    </h1>
                    <p className="text-slate-400 text-lg mb-16 font-medium italic">
                        Last updated: April 30, 2026
                    </p>

                    <div className="space-y-16 prose prose-invert max-w-none">
                        <section className="space-y-6">
                            <h2 className="text-2xl font-black text-white flex items-center gap-4">
                                <span className="text-emerald-500 opacity-50">01</span>
                                Acceptance of Terms
                            </h2>
                            <p className="text-slate-400 leading-relaxed text-lg">
                                By accessing or using the Synergy platform, you agree to be bound by these Terms of Service. If you do not agree to all of the terms and conditions, you may not access or use the service. Our mission is to provide a seamless collaborative experience, and these rules ensure a fair environment for all teams.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-black text-white flex items-center gap-4">
                                <span className="text-emerald-500 opacity-50">02</span>
                                User Accounts
                            </h2>
                            <p className="text-slate-400 leading-relaxed text-lg">
                                To access certain features of Synergy, you must register for an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-black text-white flex items-center gap-4">
                                <span className="text-emerald-500 opacity-50">03</span>
                                Usage Restrictions
                            </h2>
                            <p className="text-slate-400 leading-relaxed text-lg">
                                You may not use Synergy for any illegal or unauthorized purpose. You agree to comply with all local, state, national, and international laws, rules, and regulations applicable to your use of the service. Prohibited actions include:
                            </p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                                {['Reverse engineering', 'Data mining', 'Automated scraping', 'Bypassing security'].map((item) => (
                                    <li key={item} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="space-y-6 p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/10">
                            <h2 className="text-2xl font-black text-white">Contact Us</h2>
                            <p className="text-slate-400 font-medium">
                                If you have any questions about these Terms, please reach out to our legal team at:
                            </p>
                            <Link href="mailto:legal@synergy.pro" className="text-emerald-500 font-black hover:underline underline-offset-8">
                                legal@synergy.pro
                            </Link>
                        </section>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/5 py-12 px-8 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">
                    &copy; 2026 Synergy Pro. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
