import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";

export default function Contact() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f]">
            <div className="max-w-6xl mx-auto px-4 py-14">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-orange-500 dark:text-[#07C5B9]">
                        Contact Us
                    </h1>
                    <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Have a question, feedback, or partnership idea?
                        Drop us a message — we usually reply faster than your coffee cools ☕
                    </p>
                </motion.div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <ContactInfo />
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
