import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle, XCircle } from "lucide-react";
import { sendEmailService } from "../../services/email.service"
import { useSnackbar } from "notistack";

export default function ContactForm() {

    const { enqueueSnackbar } = useSnackbar();

    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [status, setStatus] = useState("idle");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.subject || !form.message) {
            enqueueSnackbar("Please fill all fields", { variant: "warning" });
            return;
        }

        setStatus("loading");

        try {
            const templateParams = {
                name: form.name,
                user_email: form.email,
                subject: form.subject,
                message: form.message,
            };

            const res = await sendEmailService(
                import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
                templateParams
            );

            if (res.success) {
                enqueueSnackbar("Message sent successfully", {
                    variant: "success",
                });

                setForm({
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                });
                setStatus("success");

            } else {
                enqueueSnackbar("Failed to send message", {
                    variant: "error",
                });
                setStatus("idle");
            }
        } catch {
            enqueueSnackbar("Something went wrong. Try again.", {
                variant: "error",
            });
            setStatus("idle");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-2 bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-[#222] p-4 sm:p-8"
        >
            <h2 className="text-2xl font-bold mb-6 dark:text-white">
                Send a Message
            </h2>


            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                    <label className="font-semibold dark:text-white">Full Name</label>
                    <input
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="mt-1 w-full p-3 rounded-lg bg-white dark:bg-neutral-900 border-2 border-gray-200 dark:border-[#222] focus:border-orange-500 dark:focus:border-[#07C5B9] outline-none dark:text-white"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="font-semibold dark:text-white">Email</label>
                    <input
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@email.com"
                        className="mt-1 w-full p-3 rounded-lg bg-white dark:bg-neutral-900 border-2 border-gray-200 dark:border-[#222] focus:border-orange-500 dark:focus:border-[#07C5B9] outline-none dark:text-white"
                    />
                </div>

                {/* Subject */}
                <div>
                    <label className="font-semibold dark:text-white">Subject</label>
                    <input
                        name="subject"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="Feature request / Bug / Partnership"
                        className="mt-1 w-full p-3 rounded-lg bg-white dark:bg-neutral-900 border-2 border-gray-200 dark:border-[#222] focus:border-orange-500 dark:focus:border-[#07C5B9] outline-none dark:text-white"
                    />
                </div>

                {/* Message */}
                <div>
                    <label className="font-semibold dark:text-white">Message</label>
                    <textarea
                        name="message"
                        rows="5"
                        required
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Explain your query in detail..."
                        className="mt-1 w-full p-3 rounded-lg bg-white dark:bg-neutral-900 border-2 border-gray-200 dark:border-[#222] focus:border-orange-500 dark:focus:border-[#07C5B9] outline-none resize-none dark:text-white"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-orange-500 dark:bg-[#07C5B9] text-white font-semibold hover:opacity-90 disabled:opacity-60"
                >
                    {status === "loading" ? (
                        <Loader2 className="animate-spin" size={18} />
                    ) : (
                        <Send size={18} />
                    )}
                    Send Message
                </button>
            </form>
        </motion.div>
    );
}
