import Layout from '@/components/Layout';
import { CheckCircle, Clock, Download } from 'lucide-react';
import { formatDate, formatCurrency } from '@/lib/utils';

const MOCK_BOOKINGS = [
    { id: 'BK-1023', item: 'Taj Exotica Resort & Spa', type: 'Hotel', date: '2023-12-15', status: 'Confirmed', amount: 1050, image: 'https://images.unsplash.com/photo-1571896349842-6e53ce41e858?q=80&w=200&auto=format&fit=crop' },
    { id: 'BK-1024', item: 'Rahul Verma (Guide)', type: 'Guide', date: '2023-12-16', status: 'Pending', amount: 50, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop' },
];

export default function Bookings() {
    return (
        <Layout>
            <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">My Bookings</h1>

                <div className="space-y-4">
                    {MOCK_BOOKINGS.map(booking => (
                        <div key={booking.id} className="card p-4 flex flex-col md:flex-row items-center gap-6">
                            <div className="w-full md:w-24 h-24 relative rounded-lg overflow-hidden flex-shrink-0">
                                <img src={booking.image} alt={booking.item} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-1 w-full text-center md:text-left">
                                <div className="flex flex-col md:flex-row justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800">{booking.item}</h3>
                                        <p className="text-sm text-gray-500">{booking.type} • {formatDate(booking.date)}</p>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold mt-2 md:mt-0 ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                        {booking.status}
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-between items-center">
                                    <span className="font-bold text-gray-700">{formatCurrency(booking.amount)}</span>
                                    <button className="text-teal-600 text-sm flex items-center gap-1 hover:underline">
                                        <Download className="w-4 h-4" /> Receipt
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
