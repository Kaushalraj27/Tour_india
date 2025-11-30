import { uploadToCloudinary } from '@/lib/cloudinary';
import formidable from 'formidable';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

    try {
        const form = formidable({});
        const [fields, files] = await form.parse(req);
        const file = files.file?.[0];

        if (!file) return res.status(400).json({ message: 'No file uploaded' });

        // Mock upload if no keys
        if (!process.env.CLOUDINARY_API_KEY) {
            return res.status(200).json({ url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop' });
        }

        const result = await uploadToCloudinary(file.filepath);
        res.status(200).json({ url: result.secure_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Upload Error' });
    }
}
