// src/lib/models.js
// Free-tier implementation for LLM chat and vision

import OpenAI from 'openai';

// Perplexity client (free tier)
const perplexity = new OpenAI({
    apiKey: process.env.PERPLEXITY_API_KEY || 'mock-key',
    baseURL: 'https://api.perplexity.ai',
});

// Together client (optional, mocked if key missing)
const together = new OpenAI({
    apiKey: process.env.TOGETHER_API_KEY || 'mock-key',
    baseURL: 'https://api.together.xyz/v1',
});

/**
 * Generate a chat response using either Perplexity (default) or Together.
 * Returns a mock string when no real API key is available.
 */
export const generateChatResponse = async (messages, modelProvider = 'perplexity') => {
    try {
        if (modelProvider === 'together') {
            const completion = await together.chat.completions.create({
                messages,
                model: 'Qwen/Qwen1.5-72B-Chat',
            });
            return completion.choices[0].message.content;
        }
        // Default to Perplexity
        const completion = await perplexity.chat.completions.create({
            messages,
            model: 'llama-3.1-sonar-small-128k-online',
        });
        return completion.choices[0].message.content;
    } catch (error) {
        console.error('LLM Error:', error);
        return "I'm having trouble connecting to my brain right now. Please try again later! (Mock response)";
    }
};

/**
 * Mock vision response – no external API call.
 * Returns a placeholder string containing the image URL and optional prompt.
 */
export const generateVisionResponse = async (imageUrl, prompt) => {
    console.log('Mock vision processing for', imageUrl);
    return `Mock vision response: ${prompt || "Image description"} (image URL: ${imageUrl})`;
};
