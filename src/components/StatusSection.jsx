import Image from 'next/image';
import { Plus } from 'lucide-react';

const statuses = [
  {
    id: 'user',
    name: 'Your Story',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
    isUser: true,
  },
  {
    id: 1,
    name: 'Traveler_A',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'GoaExplorer',
    image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'BeachVibes',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Foodie_J',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Wanderlust',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'AdventureX',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
  },
];

export default function StatusSection() {
  return (
    <div className="w-full bg-white border-b border-gray-200 pt-4 pb-4 px-4 overflow-x-auto no-scrollbar">
      <div className="flex space-x-4 min-w-max">
        {statuses.map((status) => (
          <div key={status.id} className="flex flex-col items-center space-y-1 cursor-pointer group">
            <div className="relative">
              <div className={`w-16 h-16 rounded-full p-[2px] ${status.isUser ? 'bg-transparent' : 'bg-gradient-to-tr from-yellow-400 to-fuchsia-600'}`}>
                <div className="w-full h-full rounded-full border-2 border-white overflow-hidden relative bg-gray-100">
                  <Image
                    src={status.image}
                    alt={status.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              {status.isUser && (
                <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-0.5 border-2 border-white text-white">
                  <Plus size={14} strokeWidth={4} />
                </div>
              )}
            </div>
            <span className="text-xs text-gray-600 w-16 text-center truncate">
              {status.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
