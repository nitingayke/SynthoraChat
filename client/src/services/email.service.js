import emailjs from "@emailjs/browser";

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

emailjs.init(publicKey);

/**
 * Universal Email sender using EmailJS
 * @param {string} templateId - EmailJS template ID
 * @param {Object} templateParams - Dynamic params for template
 * in templateParams this field should contain: to_email, to_name, user_name, otp, expiry
 */
export const sendEmailService = async (templateId, templateParams) => {

  if (!serviceId || !publicKey || !templateId) {
    throw new Error("Missing EmailJS configuration");
  }

  if (!templateParams.email) {
    throw new Error("Recipient email is required");
  }

  const response = await emailjs.send(
    serviceId,
    templateId,
    templateParams,
    publicKey
  );

  return {
    success: true,
    data: response,
  };
};
