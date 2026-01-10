export const mapMediaType = (file) => {
  if (!file?.mimetype) return "document";

  if (file.mimetype.startsWith("image/")) return "image";
  if (file.mimetype.startsWith("video/")) return "video";
  if (file.mimetype.startsWith("audio/")) return "audio";

  // pdf, docx, zip, etc
  return "document";
};