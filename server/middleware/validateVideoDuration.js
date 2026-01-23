import { cleanupCloudinaryFiles } from "../services/cleanupCloudinary.js";

export const validateVideoDuration = async (req, res, next) => {
  const files = req.files || [];

  try {
    for (const file of files) {
      if (file.resource_type === "video") {
        if (file.duration > 240) {
          await cleanupCloudinaryFiles(files);

          return res.status(400).json({
            success: false,
            message: "Video duration must be 4 minutes or less",
          });
        }
      }
    }

    next();
  } catch (error) {
    await cleanupCloudinaryFiles(files);

    return res.status(500).json({
      success: false,
      message: "Video validation failed",
    });
  }
};
