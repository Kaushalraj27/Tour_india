import Layout from '@/components/Layout';
import ChatWidget from '@/components/ChatWidget/ChatWidget';

export default function Planner() {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-[80vh] p-8 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">AI Trip Planner</h1>
                <p className="text-xl text-gray-600 max-w-2xl mb-8">
                    Tell us your dream destination, budget, and interests. Our AI guide will craft the perfect itinerary for you.
                </p>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-sand-200 max-w-md w-full">
                    <p className="text-gray-500 mb-4">Try asking:</p>
                    <div className="space-y-2">
                        <button className="w-full text-left p-3 rounded-lg bg-sand-50 hover:bg-teal-50 hover:text-teal-700 transition-colors text-sm">
                            "Plan a 5-day trip to Goa for a couple under $1000"
                        </button>
                        <button className="w-full text-left p-3 rounded-lg bg-sand-50 hover:bg-teal-50 hover:text-teal-700 transition-colors text-sm">
                            "Best beaches in Kerala for families?"
                        </button>
                        <button className="w-full text-left p-3 rounded-lg bg-sand-50 hover:bg-teal-50 hover:text-teal-700 transition-colors text-sm">
                            "Show me luxury houseboats in Alleppey"
                        </button>
                    </div>
                </div>

                <p className="mt-8 text-sm text-gray-400">
                    Click the chat icon in the bottom right to start planning!
                </p>
            </div>
        </Layout>
    );
}
