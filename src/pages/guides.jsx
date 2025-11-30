import { useState } from 'react';
import Layout from '@/components/Layout';
import GuideCard from '@/components/GuideCard';
import { Search, Filter } from 'lucide-react';

const MOCK_GUIDES = [
    { id: 1, name: 'Rahul Verma', languages: ['English', 'Hindi', 'French'], price: 50, rating: 4.9, reviews: 120, bio: 'Expert in Goan history and Portuguese architecture. 10+ years of experience.', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop' },
    { id: 2, name: 'Priya Nair', languages: ['English', 'Malayalam', 'German'], price: 45, rating: 4.8, reviews: 85, bio: 'Specializes in Kerala backwater tours and culinary experiences.', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop' },
    { id: 3, name: 'Arjun Singh', languages: ['English', 'Hindi'], price: 40, rating: 4.7, reviews: 60, bio: 'Adventure guide for water sports and trekking in Andaman.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop' },
];

export default function Guides() {
    const [search, setSearch] = useState('');

    const filteredGuides = MOCK_GUIDES.filter(g =>
        g.name.toLowerCase().includes(search.toLowerCase()) ||
        g.languages.some(l => l.toLowerCase().includes(search.toLowerCase()))
    );

    const handleHire = async (guide) => {
        // Trigger Razorpay Order
        try {
            const res = await fetch('/api/razorpay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: guide.price, currency: 'INR' }),
            });
            const data = await res.json();
            alert(`Order Created: ${data.id}. Proceeding to payment... (Mock)`);
        } catch (err) {
            alert('Hiring failed. Please try again.');
        }
    };

    return (
        <Layout>
            <div className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Meet Local Experts</h1>
                        <p className="text-gray-500">Verified guides for authentic experiences</p>
                    </div>
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by name or language..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-sand-200 focus:ring-2 focus:ring-teal-500 outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredGuides.map(guide => (
                        <GuideCard key={guide.id} guide={guide} onHire={handleHire} />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
