import Layout from '@/components/Layout';
import StatusSection from '@/components/StatusSection';
import Image from 'next/image';
import Link from 'next/link';
import { Map, Hotel, User, ArrowRight } from 'lucide-react';

export default function Home() {
    return (
        <Layout>
            {/* Status Section */}
            <StatusSection />
            
            {/* Hero Section */}
            <div className="relative h-[600px] w-full">
                <Image
                    src="/images/hero-beach.png"
                    alt="Goa Beach Paradise"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
                    <div className="px-8 md:px-12 max-w-3xl text-white">
                        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
                            Goa: The Ultimate <br />
                            <span className="text-amber-300">Summer Chill</span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-10 text-gray-100 drop-shadow-md max-w-xl">
                            Sun, sand, and endless vibes. Escape to the golden beaches and azure waters of India's party capital.
                        </p>
                        <Link href="/planner" className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-3 shadow-lg hover:scale-105 transition-transform">
                            Plan Your Goa Trip <ArrowRight className="w-6 h-6" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* CTA Tiles */}
            <div className="px-6 py-12 -mt-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link href="/hotels" className="card p-6 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4 text-teal-600">
                            <Hotel className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Luxury Stays</h3>
                        <p className="text-sm text-gray-500">Find the best beachside resorts and villas.</p>
                    </Link>
                    <Link href="/guides" className="card p-6 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4 text-amber-600">
                            <User className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Local Guides</h3>
                        <p className="text-sm text-gray-500">Explore culture with verified local experts.</p>
                    </Link>
                    <Link href="/planner" className="card p-6 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                        <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mb-4 text-sky-600">
                            <Map className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">AI Itinerary</h3>
                        <p className="text-sm text-gray-500">Get a personalized day-by-day travel plan.</p>
                    </Link>
                </div>
            </div>

            {/* Featured Destinations */}
            <div className="px-6 pb-20">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Trending Destinations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {['Goa', 'Kerala', 'Andaman', 'Pondicherry'].map((place, i) => (
                        <div key={place} className="card group cursor-pointer">
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={`https://images.unsplash.com/photo-${i === 0 ? '1512343879784-a960bf40e7f2' : i === 1 ? '1593693396865-6084d94906e0' : '1589136776975-d76222483013'}?q=80&w=800&auto=format&fit=crop`}
                                    alt={place}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h3 className="font-bold text-xl">{place}</h3>
                                    <p className="text-xs opacity-90">Explore Now</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
