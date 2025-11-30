import { useState, useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import { Send, User } from 'lucide-react';

export default function Community() {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [username, setUsername] = useState('');
    const [isJoined, setIsJoined] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
            // Save username to local storage for persistence across reloads
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
            const res = await fetch('/api/community/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user: username, text: inputText }),
            });

            if (res.ok) {
                setInputText('');
                // Fetch immediately to show own message
                const data = await res.json();
                setMessages(prev => [...prev, data]);
            }
        } catch (error) {
            console.error("Failed to send message", error);
        }
    };

    return (
        <Layout>
            <div className="p-6 max-w-4xl mx-auto h-[calc(100vh-2rem)] flex flex-col">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-teal-800">Travelers' Lounge</h1>
                    <p className="text-gray-600">Connect with fellow travelers in Goa!</p>
                </div>

                {!isJoined ? (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600">
                                <User className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Join the Chat</h2>
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
                    <div className="flex-1 bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col border border-sand-200">
                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-sand-50/50">
                            {messages.map((msg) => {
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

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            <form onSubmit={handleSendMessage} className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Type a message..."
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
                )}
            </div>
        </Layout>
    );
}
