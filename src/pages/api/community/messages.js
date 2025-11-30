import { v4 as uuidv4 } from 'uuid';

// In-memory storage for messages (will be reset on server restart)
let messages = [
    {
        id: '1',
        user: 'Guide Bot',
        text: 'Welcome to the Travelers\' Lounge! Share your plans and meet fellow travelers.',
        timestamp: new Date().toISOString(),
    }
];

export default function handler(req, res) {
    if (req.method === 'GET') {
        // Return all messages
        return res.status(200).json(messages);
    } else if (req.method === 'POST') {
        const { user, text } = req.body;

        if (!user || !text) {
            return res.status(400).json({ message: 'User and text are required' });
        }

        const newMessage = {
            id: uuidv4(),
            user,
            text,
            timestamp: new Date().toISOString(),
        };

        // Keep only the last 100 messages to prevent memory overflow
        if (messages.length >= 100) {
            messages.shift();
        }

        messages.push(newMessage);

        return res.status(201).json(newMessage);
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
