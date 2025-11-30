import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function HotelCard({ hotel, onBook }) {
    return (
        <div className="card group">
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={hotel.image}
                    alt={hotel.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold text-teal-700 shadow-sm">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {hotel.rating}
                </div>
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-bold text-lg text-gray-800 leading-tight">{hotel.name}</h3>
                        <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                            <MapPin className="w-3 h-3" />
                            {hotel.location}
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <div>
                        <span className="text-xl font-bold text-teal-600">{formatCurrency(hotel.price)}</span>
                        <span className="text-xs text-gray-400">/night</span>
                    </div>
                    <button
                        onClick={() => onBook(hotel)}
                        className="btn-primary text-sm px-4 py-1.5"
                    >
                        Book
                    </button>
                </div>
            </div>
        </div>
    );
}
