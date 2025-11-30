import Layout from '@/components/Layout';
import { MapPin, Navigation } from 'lucide-react';

export default function LiveMap() {
    return (
        <Layout>
            <div className="h-[calc(100vh-2rem)] flex flex-col">
                <div className="p-6 bg-white border-b border-sand-200 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-teal-800 flex items-center gap-2">
                            <Navigation className="w-6 h-6" /> Live Map
                        </h1>
                        <p className="text-gray-600 text-sm">Explore Goa's beaches, hotels, and hotspots.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-teal-50 text-teal-700 rounded-lg text-sm font-medium hover:bg-teal-100 transition-colors">
                            Show Hotels
                        </button>
                        <button className="px-4 py-2 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-100 transition-colors">
                            Show Beaches
                        </button>
                    </div>
                </div>
                
                <div className="flex-1 relative bg-sand-100">
                    <iframe 
                        width="100%" 
                        height="100%" 
                        frameBorder="0" 
                        scrolling="no" 
                        marginHeight="0" 
                        marginWidth="0" 
                        src="https://www.openstreetmap.org/export/embed.html?bbox=73.6848%2C14.9000%2C74.3000%2C15.7000&amp;layer=mapnik" 
                        className="w-full h-full"
                    >
                    </iframe>
                    <div className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow-lg text-xs text-gray-500">
                        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap contributors</a>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
