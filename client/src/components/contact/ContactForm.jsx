import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle, XCircle } from 'lucide-react';

const simulateSubmission = (data) => new Promise(resolve => {
    setTimeout(() => {
        console.log("Form data submitted:", data);
        if (Math.random() < 0.9) {
            resolve({ success: true, message: 'Your message has been received by our AI Support team. We will get back to you soon!' });
        } else {
            resolve({ success: false, message: 'Oops! Something went wrong on our server. Please try again later.' });
        }
    }, 2000);
});

export default function ContactForm() {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submissionStatus, setSubmissionStatus] = React.useState({
        status: 'idle', // 'idle', 'loading', 'success', 'error'
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submissionStatus.status === 'loading') return;

        setSubmissionStatus({ status: 'loading', message: 'Sending message...' });

        try {
            const result = await simulateSubmission(formData);
            if (result.success) {
                setSubmissionStatus({ status: 'success', message: result.message });
                setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
            } else {
                setSubmissionStatus({ status: 'error', message: result.message });
            }
        } catch {
            setSubmissionStatus({ status: 'error', message: 'Network error occurred. Please check your connection.' });
        }
    };

    const renderStatusMessage = () => {
        if (submissionStatus.status === 'success') {
            return (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-100 dark:bg-green-900/50 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-300 rounded-lg flex items-center gap-3"
                >
                    <CheckCircle className="w-5 h-5" />
                    {submissionStatus.message}
                </motion.div>
            );
        }

        if (submissionStatus.status === 'error') {
            return (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-300 rounded-lg flex items-center gap-3"
                >
                    <XCircle className="w-5 h-5" />
                    {submissionStatus.message}
                </motion.div>
            );
        }
        return null;
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-2/3 p-4 md:p-10 lg:p-12"
        >
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                Send us a Message
            </h2>

            {renderStatusMessage()}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-150 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            placeholder="Jane Doe"
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-150 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            placeholder="you@platform.com"
                        />
                    </div>
                </div>

                {/* Subject */}
                <div className="relative">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Subject
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-150 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="Inquiry about new feature or bug report"
                    />
                </div>

                {/* Message */}
                <div className="relative">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Your Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-150 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                        placeholder="Describe your request in detail..."
                    ></textarea>
                </div>

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={submissionStatus.status === 'loading'}
                    className={`w-full py-3 px-6 rounded-xl text-lg font-semibold transition duration-300 flex items-center justify-center gap-3 ${
                        submissionStatus.status === 'loading'
                            ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-gray-700 dark:text-gray-300'
                            : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/30 text-white'
                    }`}
                >
                    {submissionStatus.status === 'loading' ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            Send Message
                        </>
                    )}
                </motion.button>
            </form>
        </motion.div>
    );
}