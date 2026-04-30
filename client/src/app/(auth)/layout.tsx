import { Layout } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            <div className="hidden lg:flex flex-col justify-between p-12 bg-indigo-600 text-white">
                <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
                    <Layout className="h-8 w-8" />
                    TeamTask Pro
                </Link>
                <div>
                    <h2 className="text-4xl font-bold mb-4">The most powerful way to manage your team's workflow.</h2>
                    <p className="text-indigo-100 text-lg">Join thousands of teams who use TeamTask Pro to stay organized and achieve more together.</p>
                </div>
                <div className="text-sm text-indigo-200 italic">
                    "This platform changed how we work. Highly recommended!" - Sarah J., CEO at TechFlow
                </div>
            </div>
            <div className="flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
