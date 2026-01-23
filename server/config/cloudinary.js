import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const isDocument = file.mimetype === "application/pdf";

    return {
      folder: "SynthoraChat",
      resource_type: isDocument ? "raw" : "auto",
      allowed_formats: [
        "jpg",
        "jpeg",
        "png",
        "gif",
        "webp",
        "mp4",
        "mov",
        "avi",
        "webm",
        "mp3",
        "wav",
        "ogg",
        "pdf",
      ],
    };
  },
});

const upload = multer({ storage });
export { cloudinary, upload };
