import Layout from '@/components/Layout';
import { BarChart, Users, DollarSign, Calendar } from 'lucide-react';

export default function Admin() {
    return (
        <Layout>
            <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="card p-6 flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Revenue</p>
                            <h3 className="text-2xl font-bold">$12,450</h3>
                        </div>
                    </div>
                    <div className="card p-6 flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Bookings</p>
                            <h3 className="text-2xl font-bold">142</h3>
                        </div>
                    </div>
                    <div className="card p-6 flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Active Users</p>
                            <h3 className="text-2xl font-bold">1,205</h3>
                        </div>
                    </div>
                    <div className="card p-6 flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                            <BarChart className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Conversion</p>
                            <h3 className="text-2xl font-bold">3.2%</h3>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="card p-6">
                        <h3 className="font-bold text-lg mb-4">Recent Bookings</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0">
                                    <div>
                                        <p className="font-medium">Booking #{1000 + i}</p>
                                        <p className="text-xs text-gray-500">2 mins ago</p>
                                    </div>
                                    <span className="text-green-600 text-sm font-bold">+$350.00</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card p-6">
                        <h3 className="font-bold text-lg mb-4">Popular Destinations</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span>Goa</span>
                                <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-teal-500 w-[80%]" />
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Kerala</span>
                                <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-teal-500 w-[65%]" />
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Andaman</span>
                                <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-teal-500 w-[40%]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
