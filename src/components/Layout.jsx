import Sidebar from './Sidebar';
import ChatWidget from './ChatWidget/ChatWidget';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-sand-50">
            <Sidebar />
            <main className="md:ml-64 min-h-screen pb-24 md:pb-0">
                {children}
            </main>
            <ChatWidget />
        </div>
    );
}
