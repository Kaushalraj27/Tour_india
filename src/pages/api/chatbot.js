import { generateChatResponse, generateVisionResponse } from '@/lib/models';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

    try {
        const { messages } = req.body;
        const lastMessage = messages[messages.length - 1];

        let responseText = '';

        // Check for image content
        if (lastMessage.content && Array.isArray(lastMessage.content)) {
            const imagePart = lastMessage.content.find(c => c.type === 'image_url');
            if (imagePart) {
                responseText = await generateVisionResponse(imagePart.image_url.url, lastMessage.content.find(c => c.type === 'text')?.text);
            }
        } else {
            responseText = await generateChatResponse(messages);
        }

        res.status(200).json({ message: responseText });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
