import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary';
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'WomenOfScience',
        allowedFormats: ["jpg", "png", 'jpeg', 'gif']
    }
})
const upload = multer({ storage });
export {upload};