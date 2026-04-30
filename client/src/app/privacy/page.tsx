import Link from 'next/link';
import { Layout, ArrowLeft, Lock } from 'lucide-react';

export default function PrivacyPage() {
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
                        <Lock className="h-4 w-4" /> Data Security
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-tight">
                        Privacy <span className="text-emerald-500">Policy</span>
                    </h1>
                    <p className="text-slate-400 text-lg mb-16 font-medium italic">
                        Your privacy is our priority. Last updated: April 30, 2026
                    </p>

                    <div className="space-y-16 prose prose-invert max-w-none">
                        <section className="space-y-6">
                            <h2 className="text-2xl font-black text-white flex items-center gap-4">
                                <span className="text-emerald-500 opacity-50">01</span>
                                Information We Collect
                            </h2>
                            <p className="text-slate-400 leading-relaxed text-lg">
                                When you use Synergy, we collect information that you provide directly to us, such as when you create an account, create projects, or communicate with other team members. This includes your name, email address, and any project-related data you upload to the platform.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-black text-white flex items-center gap-4">
                                <span className="text-emerald-500 opacity-50">02</span>
                                How We Use Your Data
                            </h2>
                            <p className="text-slate-400 leading-relaxed text-lg">
                                We use the information we collect to provide, maintain, and improve our services. Specifically, your data helps us:
                            </p>
                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    { title: 'Personalization', desc: 'Tailoring your dashboard and notifications.' },
                                    { title: 'Security', desc: 'Protecting against unauthorized access and fraud.' },
                                    { title: 'Communication', desc: 'Sending updates and technical notices.' }
                                ].map((item) => (
                                    <div key={item.title} className="p-6 rounded-3xl bg-white/5 border border-white/10">
                                        <h3 className="text-white font-bold mb-2">{item.title}</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-black text-white flex items-center gap-4">
                                <span className="text-emerald-500 opacity-50">03</span>
                                Data Protection
                            </h2>
                            <p className="text-slate-400 leading-relaxed text-lg">
                                Synergy employs industry-standard encryption and security protocols to ensure your data is safe. We utilize AES-256 encryption for data at rest and TLS for data in transit. We never sell your personal information to third parties.
                            </p>
                        </section>

                        <section className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 text-center">
                            <h2 className="text-2xl font-black text-white mb-4">Privacy Concerns?</h2>
                            <p className="text-slate-400 font-medium mb-6">
                                Reach out to our Data Protection Officer for any inquiries regarding your personal data.
                            </p>
                            <Link href="mailto:privacy@synergy.pro" className="inline-flex h-14 items-center justify-center rounded-2xl bg-emerald-500 px-8 text-xs font-black uppercase tracking-widest text-white hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20">
                                Contact Privacy Team
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
