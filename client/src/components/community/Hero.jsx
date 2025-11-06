import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Users, Heart, MessageCircle, Award } from 'lucide-react';

export default function Hero() {
    return (
        <section className="flex justify-center items-center min-h-[calc(100vh-50px)] relative bg-gradient-to-br from-sky-100 to-indigo-200 dark:from-sky-900 dark:via-indigo-900 dark:to-gray-900 text-gray-900 dark:text-white py-20 lg:py-28">

            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-sky-400/20 dark:bg-sky-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-2xl border border-gray-300 dark:border-white/20 mb-8"
                    >
                        <Users className="w-5 h-5 text-sky-600" />
                        <span className="text-sm font-semibold text-gray-800 dark:text-white">Welcome to Our Family</span>
                    </motion.div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        More Than Just a{" "}
                        <span className="bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">
                            Community
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed hidden sm:block">
                        A family of curious minds, passionate learners, and kind helpers.
                        Where every question matters and every answer comes from the heart.
                    </p>

                    <p className="text-base text-gray-600 dark:text-gray-300 max-w-xs mx-auto mb-8 leading-relaxed sm:hidden">
                        Curious minds. Kind hearts. One community.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
                        {[
                            { number: "50K+", label: "Friends & Members", icon: Users },
                            { number: "1M+", label: "Helpful Moments", icon: Heart },
                            { number: "200K+", label: "Conversations", icon: MessageCircle },
                            { number: "500+", label: "Community Stars", icon: Award }
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                                className="text-center"
                            >
                                <div className="flex justify-center mb-2">
                                    <stat.icon className="w-8 h-8 text-sky-600" />
                                </div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.number}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
