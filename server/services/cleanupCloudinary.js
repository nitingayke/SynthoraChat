import { cloudinary } from "../config/cloudinary.js";

export const cleanupCloudinaryFiles = async (files = []) => {
  if (!files.length) return;

  await Promise.all(
    files.map((file) =>
      cloudinary.uploader.destroy(file.filename, {
        resource_type: "auto",
      })
    )
  );
};
