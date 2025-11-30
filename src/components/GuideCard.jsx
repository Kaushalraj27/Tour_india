import Image from 'next/image';
import { Star, Languages, MapPin } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function GuideCard({ guide, onHire }) {
    return (
        <div className="card flex flex-col md:flex-row p-4 gap-4 items-center md:items-start">
            <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-full overflow-hidden border-4 border-sand-100 shadow-inner">
                <Image
                    src={guide.image}
                    alt={guide.name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
                    <div>
                        <h3 className="font-bold text-lg text-gray-800">{guide.name}</h3>
                        <div className="flex items-center justify-center md:justify-start gap-1 text-amber-500 text-sm font-medium">
                            <Star className="w-4 h-4 fill-current" />
                            {guide.rating} ({guide.reviews} reviews)
                        </div>
                    </div>
                    <div className="mt-2 md:mt-0 text-right">
                        <span className="text-lg font-bold text-teal-600">{formatCurrency(guide.price)}</span>
                        <span className="text-xs text-gray-400 block">/day</span>
                    </div>
                </div>

                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{guide.bio}</p>

                <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
                    {guide.languages.map(lang => (
                        <span key={lang} className="text-xs bg-sand-100 text-gray-600 px-2 py-1 rounded-md flex items-center gap-1">
                            <Languages className="w-3 h-3" /> {lang}
                        </span>
                    ))}
                </div>
            </div>
            <div className="mt-2 md:mt-0 flex items-center">
                <button
                    onClick={() => onHire(guide)}
                    className="btn-secondary text-sm"
                >
                    Hire Guide
                </button>
            </div>
        </div>
    );
}
