import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Image as ImageIcon, Mic, Paperclip, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import VoiceRecorder from './VoiceRecorder';
import MessageBubble from './MessageBubble';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Namaste! I am your Incredible India guide. How can I help you plan your beach vacation today?', type: 'text' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input, type: 'text' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/chatbot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, userMsg] }),
            });
            const data = await res.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.message, type: 'text' }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting. Please try again.", type: 'text' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVoiceInput = async (audioBlob) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', audioBlob, 'voice.webm');

        try {
            const sttRes = await fetch('/api/stt', { method: 'POST', body: formData });
            const sttData = await sttRes.json();

            if (sttData.text) {
                const userMsg = { role: 'user', content: sttData.text, type: 'text' };
                setMessages(prev => [...prev, userMsg]);

                // Get AI response
                const res = await fetch('/api/chatbot', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ messages: [...messages, userMsg] }),
                });
                const data = await res.json();
                setMessages(prev => [...prev, { role: 'assistant', content: data.message, type: 'text' }]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
            setIsRecording(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-sand-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
                    {/* Header */}
                    <div className="p-4 bg-teal-600 text-white flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <h3 className="font-semibold">India Guide AI</h3>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-teal-700 p-1 rounded">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-sand-50">
                        {messages.map((msg, idx) => (
                            <MessageBubble key={idx} message={msg} />
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-sand-100">
                                    <Loader2 className="w-5 h-5 animate-spin text-teal-600" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-white border-t border-sand-200">
                        <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-400 hover:text-teal-600 transition-colors">
                                <Paperclip className="w-5 h-5" />
                            </button>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about beaches, hotels..."
                                className="flex-1 bg-sand-50 border-none rounded-full px-4 py-2 text-sm focus:ring-1 focus:ring-teal-500 outline-none"
                            />
                            {input ? (
                                <button onClick={handleSend} className="p-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors">
                                    <Send className="w-4 h-4" />
                                </button>
                            ) : (
                                <VoiceRecorder onRecordingComplete={handleVoiceInput} isRecording={isRecording} setIsRecording={setIsRecording} />
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 transition-all duration-300 flex items-center justify-center hover:scale-105"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
            </button>
        </div>
    );
}
