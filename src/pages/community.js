import { useState, useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import { Send, User, Plus, X, MessageCircle, Users } from 'lucide-react';

// Mock Stories Data
const MOCK_STORIES = [
    { id: 1, user: 'Alice', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=200&auto=format&fit=crop', viewed: false },
    { id: 2, user: 'Bob', image: 'https://images.unsplash.com/photo-1593693396865-6084d94906e0?q=80&w=200&auto=format&fit=crop', viewed: false },
    { id: 3, user: 'Charlie', image: 'https://images.unsplash.com/photo-1589136776975-d76222483013?q=80&w=200&auto=format&fit=crop', viewed: true },
];

export default function Community() {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [username, setUsername] = useState('');
    const [isJoined, setIsJoined] = useState(false);
    const [activeTab, setActiveTab] = useState('group'); // 'group' or 'dm'
    const [selectedUser, setSelectedUser] = useState(null); // For DM
    const [viewingStory, setViewingStory] = useState(null); // Story object or null
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, activeTab, selectedUser]);

    // Poll for new messages every 2 seconds
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch('/api/community/messages');
                if (res.ok) {
                    const data = await res.json();
                    setMessages(data);
                }
            } catch (error) {
                console.error("Failed to fetch messages", error);
            }
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleJoin = (e) => {
        e.preventDefault();
        if (username.trim()) {
            setIsJoined(true);
            localStorage.setItem('chat_username', username);
        }
    };

    useEffect(() => {
        const savedUsername = localStorage.getItem('chat_username');
        if (savedUsername) {
            setUsername(savedUsername);
            setIsJoined(true);
        }
    }, []);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        try {
            const payload = {
                user: username,
                text: inputText,
                recipient: activeTab === 'dm' && selectedUser ? selectedUser : null
            };

            const res = await fetch('/api/community/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setInputText('');
                const data = await res.json();
                setMessages(prev => [...prev, data]);
            }
        } catch (error) {
            console.error("Failed to send message", error);
        }
    };

    // Filter messages based on active tab
    const displayedMessages = messages.filter(msg => {
        if (activeTab === 'group') {
            return !msg.recipient; // Show only public messages
        } else {
            // Show DM if it's between me and selected user
            if (!selectedUser) return false;
            return (msg.user === username && msg.recipient === selectedUser) ||
                (msg.user === selectedUser && msg.recipient === username);
        }
    });

    // Get list of unique users for DM list (excluding self)
    const uniqueUsers = [...new Set(messages.map(m => m.user))].filter(u => u !== username && u !== 'Guide Bot');

    return (
        <Layout>
            <div className="p-4 md:p-6 max-w-4xl mx-auto h-[calc(100vh-2rem)] flex flex-col">

                {/* Stories Bar */}
                {isJoined && (
                    <div className="mb-6 overflow-x-auto pb-2 scrollbar-hide">
                        <div className="flex gap-4">
                            {/* Add Story Button */}
                            <div className="flex flex-col items-center gap-1 cursor-pointer group">
                                <div className="w-16 h-16 rounded-full border-2 border-dashed border-teal-300 flex items-center justify-center bg-white group-hover:border-teal-500 transition-colors">
                                    <Plus className="w-6 h-6 text-teal-500" />
                                </div>
                                <span className="text-xs font-medium text-gray-600">Add Story</span>
                            </div>

                            {/* Mock Stories */}
                            {MOCK_STORIES.map(story => (
                                <div
                                    key={story.id}
                                    className="flex flex-col items-center gap-1 cursor-pointer"
                                    onClick={() => setViewingStory(story)}
                                >
                                    <div className={`w-16 h-16 rounded-full p-[2px] ${story.viewed ? 'bg-gray-300' : 'bg-gradient-to-tr from-yellow-400 to-fuchsia-600'}`}>
                                        <div className="w-full h-full rounded-full border-2 border-white overflow-hidden">
                                            <img src={story.image} alt={story.user} className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                    <span className="text-xs font-medium text-gray-600">{story.user}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Main Chat Area */}
                {!isJoined ? (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600">
                                <User className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Join the Community</h2>
                            <p className="text-gray-500 mb-6">Enter your name to start chatting.</p>
                            <form onSubmit={handleJoin} className="space-y-4">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Your Name"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full btn-primary py-3 rounded-lg font-bold"
                                >
                                    Join Lounge
                                </button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex gap-4 overflow-hidden">
                        {/* Sidebar (DMs) - Hidden on mobile unless toggled (simplified for now) */}
                        <div className="w-1/4 bg-white rounded-2xl shadow-lg border border-sand-200 hidden md:flex flex-col overflow-hidden">
                            <div className="p-4 border-b border-gray-100 bg-gray-50">
                                <h3 className="font-bold text-gray-700">Messages</h3>
                            </div>
                            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                                <button
                                    onClick={() => { setActiveTab('group'); setSelectedUser(null); }}
                                    className={`w-full p-3 rounded-xl flex items-center gap-3 transition-colors ${activeTab === 'group' ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-50'}`}
                                >
                                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-sm">Travelers' Lounge</p>
                                        <p className="text-xs opacity-70">Public Group</p>
                                    </div>
                                </button>

                                <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mt-2">Direct Messages</div>
                                {uniqueUsers.length === 0 && <p className="px-3 text-xs text-gray-400 italic">No other users yet.</p>}
                                {uniqueUsers.map(u => (
                                    <button
                                        key={u}
                                        onClick={() => { setActiveTab('dm'); setSelectedUser(u); }}
                                        className={`w-full p-3 rounded-xl flex items-center gap-3 transition-colors ${activeTab === 'dm' && selectedUser === u ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-50'}`}
                                    >
                                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-bold text-sm">{u}</p>
                                            <p className="text-xs opacity-70">Click to chat</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Chat Window */}
                        <div className="flex-1 bg-white rounded-2xl shadow-lg border border-sand-200 flex flex-col overflow-hidden">
                            {/* Header */}
                            <div className="p-4 border-b border-gray-100 bg-white flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    {activeTab === 'group' ? (
                                        <>
                                            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                                                <Users className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-800">Travelers' Lounge</h3>
                                                <p className="text-xs text-green-600 flex items-center gap-1">
                                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Online
                                                </p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-800">{selectedUser}</h3>
                                                <p className="text-xs text-gray-500">Private Chat</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-sand-50/50">
                                {displayedMessages.length === 0 && (
                                    <div className="text-center py-10 text-gray-400">
                                        <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-20" />
                                        <p>No messages yet. Say hello!</p>
                                    </div>
                                )}
                                {displayedMessages.map((msg) => {
                                    const isMe = msg.user === username;
                                    return (
                                        <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[70%] ${isMe ? 'order-2' : 'order-1'}`}>
                                                <div className={`flex items-baseline gap-2 mb-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                                                    <span className="text-xs font-bold text-gray-600">{msg.user}</span>
                                                    <span className="text-[10px] text-gray-400">
                                                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                                <div
                                                    className={`px-4 py-2 rounded-2xl shadow-sm ${isMe
                                                            ? 'bg-teal-600 text-white rounded-tr-none'
                                                            : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                                                        }`}
                                                >
                                                    <p>{msg.text}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="p-4 bg-white border-t border-gray-100">
                                <form onSubmit={handleSendMessage} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        placeholder={activeTab === 'dm' ? `Message ${selectedUser}...` : "Message the group..."}
                                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!inputText.trim()}
                                        className="p-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Story Viewer Overlay */}
                {viewingStory && (
                    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
                        <button
                            onClick={() => setViewingStory(null)}
                            className="absolute top-4 right-4 text-white hover:opacity-70"
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <div className="relative w-full max-w-md aspect-[9/16] bg-gray-900 rounded-lg overflow-hidden">
                            <img src={viewingStory.image} alt="Story" className="w-full h-full object-cover" />
                            <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/50 to-transparent flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full border border-white overflow-hidden">
                                    <img src={viewingStory.image} className="w-full h-full object-cover" />
                                </div>
                                <span className="text-white font-bold">{viewingStory.user}</span>
                            </div>
                            {/* Progress Bar (Mock) */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gray-600">
                                <div className="h-full bg-white w-1/2" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
