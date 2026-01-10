// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Sparkles, Users, MessageCircle, Brain } from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "Real-Time Q&A",
    desc: "Ask questions and get instant, intelligent responses from both humans and AI.",
  },
  {
    icon: Brain,
    title: "AI-Powered Insights",
    desc: "Let AI summarize, explain, and guide your discussions instantly.",
  },
  {
    icon: Users,
    title: "Community Driven",
    desc: "Collaborate, learn, and share ideas with like-minded people.",
  },
  {
    icon: Sparkles,
    title: "Smart Recommendations",
    desc: "AI curates content tailored to your interests and expertise.",
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-gray-100 dark:bg-[#0f0f0f]">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Explore Our Features
        </h2>

        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-14">
          SynthoraChat brings together AI intelligence and human collaboration
          to help you learn faster and share knowledge better.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group bg-white dark:bg-[#161616] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="p-3 rounded-xl bg-orange-100 dark:bg-[#07C5B9]/10 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-orange-500 dark:text-[#07C5B9]" />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {f.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
