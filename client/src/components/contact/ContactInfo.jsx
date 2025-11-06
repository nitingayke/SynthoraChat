import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Mail, MapPin, Users, Brain, Linkedin, Twitter, Github, Instagram } from 'lucide-react';

export default function ContactInfo() {
    return (
        <div className="lg:w-1/3 p-7 md:p-10 lg:p-12 bg-gradient-to-br from-blue-600 to-purple-700 dark:from-purple-800 dark:to-blue-900 space-y-8">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Brain className="w-8 h-8 text-yellow-300" />
                AI-Driven Support
            </h2>
            <p className="text-blue-100 dark:text-purple-200">
                Our support channels are monitored by both human specialists and our internal AI system to ensure rapid, context-aware responses.
            </p>

            {/* General Contact Info */}
            <div className="space-y-6 pt-4">
                <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-lg font-semibold text-white">General Inquiries</h3>
                        <a 
                            href="mailto:support@aiqaplatform.com" 
                            className="text-blue-100 dark:text-purple-200 hover:text-white transition duration-200"
                        >
                            support@aiqaplatform.com
                        </a>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <Users className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-lg font-semibold text-white">Community Feedback</h3>
                        <p className="text-blue-100 dark:text-purple-200">
                            Join our Discord server for instant help and feature discussions.
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-lg font-semibold text-white">Office Location (HQ)</h3>
                        <p className="text-blue-100 dark:text-purple-200">
                            101 Generative Way, Silicon Valley, CA 94000
                        </p>
                    </div>
                </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-8 border-t border-blue-500/50 dark:border-purple-600/50">
                <h3 className="text-lg font-semibold text-white mb-4">Connect with Us</h3>
                <div className="flex space-x-6">
                    <a
                        href="https://www.linkedin.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="LinkedIn"
                        className="text-blue-100 dark:text-purple-200 hover:text-white hover:scale-110 transition duration-300"
                    >
                        <Linkedin className="w-7 h-7" />
                    </a>
                    <a
                        href="https://twitter.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Twitter"
                        className="text-blue-100 dark:text-purple-200 hover:text-white hover:scale-110 transition duration-300"
                    >
                        <Twitter className="w-7 h-7" />
                    </a>
                    <a
                        href="https://github.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub"
                        className="text-blue-100 dark:text-purple-200 hover:text-white hover:scale-110 transition duration-300"
                    >
                        <Github className="w-7 h-7" />
                    </a>
                    <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Instagram"
                        className="text-blue-100 dark:text-purple-200 hover:text-white hover:scale-110 transition duration-300"
                    >
                        <Instagram className="w-7 h-7" />
                    </a>
                </div>
            </div>
        </div>
    );
}