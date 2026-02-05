// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Users, Zap, Target, TrendingUp } from "lucide-react";
import TopThreePodium from "./TopThreePodium";

export default function Hero({ users }) {
    return (
        <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 py-16">

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-extrabold text-center mb-6"
                >
                    Celebrating{" "}
                    <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                        Top Contributors
                    </span>
                </motion.h1>

                <p className="text-center text-gray-300 max-w-3xl mx-auto mb-12">
                    The people who consistently help, answer, and uplift the community.
                </p>

                <TopThreePodium users={users} />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-14">
                    {[
                        { icon: Users, label: "Active Users", value: "50K+" },
                        { icon: Zap, label: "Answers", value: "2.1M" },
                        { icon: Target, label: "Avg Accuracy", value: "94%" },
                        { icon: TrendingUp, label: "Growth", value: "45%" },
                    ].map((s) => (
                        <div
                            key={s.label}
                            className="bg-white/10 border border-white/10 rounded-2xl p-4 text-center"
                        >
                            <s.icon className="mx-auto text-cyan-400 mb-2" />
                            <div className="text-2xl font-bold">{s.value}</div>
                            <div className="text-sm text-gray-300">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
