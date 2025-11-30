import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'demo',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (file, resourceType = 'auto') => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: resourceType, folder: 'incredible_india' },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        // Handle buffer or stream
        if (file.buffer) {
            uploadStream.end(file.buffer);
        } else {
            // If it's a path or other stream
            file.pipe(uploadStream);
        }
    });
};

export default cloudinary;
