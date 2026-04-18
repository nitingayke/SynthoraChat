import React from "react";
import { Mail, MapPin, Users, Linkedin, Github, Twitter } from "lucide-react";

export default function ContactInfo() {
    return (
        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-[#222] p-4 sm:p-8 space-y-6 h-fit">
            <h2 className="text-2xl font-bold dark:text-white">
                Contact Information
            </h2>

            <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <div className="flex gap-3">
                    <Mail className="text-orange-500 dark:text-[#07C5B9]" />
                    <span>support@synthorachat.com</span>
                </div>

                <div className="flex gap-3">
                    <Users className="text-orange-500 dark:text-[#07C5B9]" />
                    <span>Community & Feedback</span>
                </div>

                <div className="flex gap-3">
                    <MapPin className="text-orange-500 dark:text-[#07C5B9]" />
                    <span>Remote · India</span>
                </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-[#222]">
                <p className="font-semibold dark:text-white mb-3">
                    Follow Us
                </p>

                <div className="flex gap-5">
                    <a
                        href="https://www.linkedin.com/in/nitin-gayke92/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Linkedin className="cursor-pointer hover:scale-110 transition text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-[#07C5B9]" />
                    </a>

                    <a
                        href="https://github.com/nitingayke"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Github className="cursor-pointer hover:scale-110 transition text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-[#07C5B9]" />
                    </a>

                    <a
                        href="https://twitter.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Twitter className="cursor-pointer hover:scale-110 transition text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-[#07C5B9]" />
                    </a>
                </div>
            </div>
        </div>
    );
}