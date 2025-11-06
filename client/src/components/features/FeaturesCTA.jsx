// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Rocket, Sparkles, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function FeaturesCTA() {
    const benefits = [
        {
            icon: Sparkles,
            title: "AI-Powered Insights",
            description: "Get accurate answers with intelligent summarization"
        },
        {
            icon: Users,
            title: "Expert Community",
            description: "Connect with verified experts across domains"
        },
        {
            icon: Rocket,
            title: "Real-time Collaboration",
            description: "Instant answers and live discussions"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br 
            from-sky-400 via-cyan-300 to-indigo-200 
            dark:from-sky-700 dark:via-cyan-500 dark:to-indigo-400"
        >

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center text-white">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Ready to Transform Your Learning Experience?
                        </h2>
                        <p className="text-xl text-orange-100 max-w-2xl mx-auto">
                            Join thousands of users who are already getting smarter answers with AI-powered assistance and community collaboration.
                        </p>
                    </motion.div>

                    {/* Benefits */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="inline-flex p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                                    <benefit.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                                <p className="text-orange-100">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link
                            to="/signup"
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-orange-600 font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                        >
                            <span>Start Free Trial</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            to="/contact"
                            className="px-8 py-4 border-2 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-orange-600 transition-all duration-300"
                        >
                            Contact Sales
                        </Link>
                    </motion.div>

                    {/* Additional Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-8 text-gray-900 text-sm"
                    >
                        <p>No credit card required • 14-day free trial • Cancel anytime</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}