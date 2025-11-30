// src/lib/models.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateChatResponse = async (messages) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        // Convert messages to Gemini history format
        // Gemini expects roles 'user' and 'model'
        let history = messages.slice(0, -1).map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }],
        }));

        // Ensure history starts with a user message
        const firstUserIndex = history.findIndex(m => m.role === 'user');
        if (firstUserIndex !== -1) {
            history = history.slice(firstUserIndex);
        } else if (history.length > 0 && history[0].role === 'model') {
            // If there are no user messages in history but there is history (e.g. just a greeting), clear it
            history = [];
        }

        const chat = model.startChat({
            history: history,
        });

        const lastMessage = messages[messages.length - 1].content;
        const result = await chat.sendMessage(lastMessage);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini Chat Error:", error);
        const keyStatus = process.env.GEMINI_API_KEY ? "Key Present" : "Key Missing";
        return `I'm having trouble connecting to my brain right now. (${keyStatus}) Error: ${error.message}`;
    }
};

export const generateVisionResponse = async (imageUrl, prompt) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        // Fetch the image
        const imageResp = await fetch(imageUrl);
        const arrayBuffer = await imageResp.arrayBuffer();
        const base64Image = Buffer.from(arrayBuffer).toString('base64');

        const imagePart = {
            inlineData: {
                data: base64Image,
                mimeType: "image/jpeg", // Assuming JPEG for simplicity, could be dynamic
            },
        };

        const result = await model.generateContent([prompt || "Describe this image", imagePart]);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini Vision Error:", error);
        return "I'm having trouble seeing this image right now.";
    }
};
