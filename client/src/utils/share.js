/**
 * Universal share helper
 * @param {Object} params
 * @param {string} params.title
 * @param {string} params.text
 * @param {string} params.url
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export const shareContent = async ({ title, text, url }) => {
  try {
    if (navigator.share) {
      await navigator.share({
        title,
        text,
        url,
      });

      return {
        success: true,
        message: "Shared successfully 🚀",
      };
    }

    await navigator.clipboard.writeText(url);

    return {
      success: true,
      message: "Link copied to clipboard",
    };
  } catch (error) {
    return {
      success: false,
      message: error?.message || "Unable to share",
    };
  }
};
