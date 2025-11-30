import formidable from 'formidable';
import fs from 'fs';
import OpenAI from 'openai';

export const config = {
    api: {
        bodyParser: false,
    },
};

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'mock-key' });

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

    try {
        const form = formidable({});
        const [fields, files] = await form.parse(req);
        const file = files.file?.[0];

        if (!file) return res.status(400).json({ message: 'No file uploaded' });

        // Mock response if no key
        if (!process.env.OPENAI_API_KEY) {
            return res.status(200).json({ text: "This is a mock transcription of your voice. (Set OPENAI_API_KEY to use real Whisper)" });
        }

        const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream(file.filepath),
            model: 'whisper-1',
        });

        res.status(200).json({ text: transcription.text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'STT Error' });
    }
}
