export const getVideoDuration = (file) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      resolve(video.duration); // seconds
    };

    video.onerror = () => {
      reject("Invalid video file");
    };

    video.src = URL.createObjectURL(file);
  });
};
