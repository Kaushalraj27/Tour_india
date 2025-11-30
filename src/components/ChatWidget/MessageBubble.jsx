import { cn } from '@/lib/utils';
import { User, Bot } from 'lucide-react';

export default function MessageBubble({ message }) {
    const isUser = message.role === 'user';

    return (
        <div className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}>
            {!isUser && (
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-teal-600" />
                </div>
            )}

            <div className={cn(
                "max-w-[80%] p-3 rounded-2xl text-sm shadow-sm",
                isUser
                    ? "bg-teal-600 text-white rounded-tr-none"
                    : "bg-white text-gray-800 border border-sand-100 rounded-tl-none"
            )}>
                {message.content}
            </div>

            {isUser && (
                <div className="w-8 h-8 rounded-full bg-sand-200 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-gray-600" />
                </div>
            )}
        </div>
    );
}
