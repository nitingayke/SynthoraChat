import { cloudinary } from "../config/cloudinary.js";

const CLOUDINARY_TYPE_MAP = {
  image: "image",
  video: "video",
  audio: "raw",
  document: "raw",
};

export const cleanupCloudinaryFiles = async (files = []) => {
  if (!files.length) return;

  await Promise.all(
    files.map((file) =>
      cloudinary.uploader.destroy(file.filename, {
        resource_type: CLOUDINARY_TYPE_MAP[file.type],
      })
    )
  );
};
