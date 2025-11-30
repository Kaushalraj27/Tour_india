import { useState } from 'react';
import Layout from '@/components/Layout';
import { CheckCircle, Clock, Download, Train, Plane, Car, Utensils, MoreHorizontal, Plus } from 'lucide-react';
import { formatDate, formatCurrency } from '@/lib/utils';

const MOCK_BOOKINGS = [
    { id: 'BK-1023', item: 'Taj Exotica Resort & Spa', type: 'Hotel', date: '2023-12-15', status: 'Confirmed', amount: 1050, image: 'https://images.unsplash.com/photo-1571896349842-6e53ce41e858?q=80&w=200&auto=format&fit=crop' },
    { id: 'BK-1024', item: 'Rahul Verma (Guide)', type: 'Guide', date: '2023-12-16', status: 'Pending', amount: 50, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop' },
];

const SERVICES = [
    { id: 'train', label: 'Train', icon: Train, color: 'text-blue-600', bg: 'bg-blue-100' },
    { id: 'flight', label: 'Flight', icon: Plane, color: 'text-sky-600', bg: 'bg-sky-100' },
    { id: 'cab', label: 'Cab', icon: Car, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { id: 'table', label: 'Table', icon: Utensils, color: 'text-red-600', bg: 'bg-red-100' },
    { id: 'other', label: 'Other', icon: MoreHorizontal, color: 'text-purple-600', bg: 'bg-purple-100' },
];

export default function Bookings() {
    const [bookings, setBookings] = useState(MOCK_BOOKINGS);

    const handleBookService = (service) => {
        const newBooking = {
            id: `BK-${Math.floor(Math.random() * 10000)}`,
            item: `${service.label} Booking`,
            type: service.label,
            date: new Date().toISOString().split('T')[0],
            status: 'Pending',
            amount: 0, // Mock amount
            image: 'https://images.unsplash.com/photo-1517400508447-f8dd518b86db?q=80&w=200&auto=format&fit=crop' // Generic placeholder
        };
        setBookings([newBooking, ...bookings]);
        alert(`Request for ${service.label} booking initiated!`);
    };

    return (
        <Layout>
            <div className="p-8 max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">My Bookings</h1>

                {/* Book a Service Section */}
                <div className="mb-12">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <Plus className="w-5 h-5" /> Book a Service
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {SERVICES.map((service) => {
                            const Icon = service.icon;
                            return (
                                <button
                                    key={service.id}
                                    onClick={() => handleBookService(service)}
                                    className="card p-6 flex flex-col items-center justify-center gap-3 hover:-translate-y-1 transition-transform hover:shadow-md"
                                >
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${service.bg} ${service.color}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <span className="font-medium text-gray-700">{service.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
                    {bookings.map(booking => (
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
