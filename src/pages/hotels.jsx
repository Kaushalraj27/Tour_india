import { useState } from 'react';
import Layout from '@/components/Layout';
import HotelCard from '@/components/HotelCard';
import { Search } from 'lucide-react';

const MOCK_HOTELS = [
    { id: 1, name: 'Taj Exotica Resort & Spa', location: 'Goa', price: 350, rating: 4.9, image: 'https://images.unsplash.com/photo-1571896349842-6e53ce41e858?q=80&w=800&auto=format&fit=crop' },
    { id: 2, name: 'The Leela Kovalam', location: 'Kerala', price: 280, rating: 4.8, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop' },
    { id: 3, name: 'Havelock Island Beach Resort', location: 'Andaman', price: 200, rating: 4.7, image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800&auto=format&fit=crop' },
    { id: 4, name: 'Palais de Mahe', location: 'Pondicherry', price: 180, rating: 4.6, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop' },
];

export default function Hotels() {
    const [search, setSearch] = useState('');

    const filteredHotels = MOCK_HOTELS.filter(h =>
        h.name.toLowerCase().includes(search.toLowerCase()) ||
        h.location.toLowerCase().includes(search.toLowerCase())
    );

    const handleBook = async (hotel) => {
        // Trigger Stripe Checkout
        try {
            const res = await fetch('/api/stripe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: hotel.price, currency: 'usd' }),
            });
            const data = await res.json();
            if (data.url) window.location.href = data.url;
        } catch (err) {
            alert('Booking failed. Please try again.');
        }
    };

    return (
        <Layout>
            <div className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Find Your Stay</h1>
                        <p className="text-gray-500">Luxury resorts and cozy beach huts</p>
                    </div>
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search hotels or destinations..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-sand-200 focus:ring-2 focus:ring-teal-500 outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredHotels.map(hotel => (
                        <HotelCard key={hotel.id} hotel={hotel} onBook={handleBook} />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
