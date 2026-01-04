export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const getMediaType = (file) => {
    if (file.type.startsWith("image")) return "image";
    if (file.type.startsWith("video")) return "video";
    if (file.type.startsWith("audio")) return "audio";
    return "document";
  };