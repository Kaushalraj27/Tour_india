import Link from 'next/link';
import { Home, Map, Hotel, Calendar, Settings, User } from 'lucide-react';
import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';

const menuItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Map, label: 'Plan Trip', href: '/planner' },
    { icon: Hotel, label: 'Hotels', href: '/hotels' },
    { icon: User, label: 'Guides', href: '/guides' },
    { icon: Calendar, label: 'Bookings', href: '/bookings' },
];

export default function Sidebar() {
    const router = useRouter();

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-sand-200 z-50 hidden md:flex flex-col">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-teal-600 tracking-tight">
                    Incredible<span className="text-amber-500">India</span>
                </h1>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Beach Paradise</p>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = router.pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-teal-50 text-teal-600 shadow-sm"
                                    : "text-gray-600 hover:bg-sand-50 hover:text-teal-600"
                            )}
                        >
                            <Icon className={cn("w-5 h-5", isActive ? "text-teal-600" : "text-gray-400 group-hover:text-teal-500")} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-sand-200">
                <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-800 transition-colors">
                    <Settings className="w-5 h-5" />
                    <span className="text-sm font-medium">Admin</span>
                </Link>
            </div>
        </aside>
    );
}
