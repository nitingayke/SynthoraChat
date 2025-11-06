import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Target, Zap, TrendingUp, Users } from 'lucide-react';
import TopThreePodium from './TopThreePodium';

export default function Hero() {

    return (
        <section className="min-h-[80vh] relative bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 text-white overflow-hidden">

            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >

                    <motion.h1
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-4"
                    >
                        Celebrating <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 bg-clip-text text-transparent">Top Achievers</span>
                    </motion.h1>

                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                        Celebrating the brilliant minds who shape our community with their expertise,
                        generosity, and commitment to helping others learn and grow.
                    </p>
                </motion.div>

                <TopThreePodium />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12"
                >
                    {[
                        { icon: Users, value: "50K+", label: "Active Contributors" },
                        { icon: Zap, value: "2.1M", label: "Answers Given" },
                        { icon: Target, value: "94.8%", label: "Avg Accuracy" },
                        { icon: TrendingUp, value: "45%", label: "Growth Rate" }
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.4 + index * 0.1 }}
                            className="text-center p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm"
                        >
                            <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-300">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}