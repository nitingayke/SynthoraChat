// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Sparkles, Users, MessageCircle, Brain } from "lucide-react";

const features = [
  {
    icon: <MessageCircle className="w-8 h-8 text-orange-500" />,
    title: "Real-Time Q&A",
    desc: "Ask questions and get instant, intelligent responses from both humans and AI.",
  },
  {
    icon: <Brain className="w-8 h-8 text-orange-500" />,
    title: "AI-Powered Insights",
    desc: "Let AI summarize, explain, and guide your discussions instantly.",
  },
  {
    icon: <Users className="w-8 h-8 text-orange-500" />,
    title: "Community Driven",
    desc: "Collaborate, learn, and share ideas with like-minded people.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-orange-500" />,
    title: "Smart Recommendations",
    desc: "AI curates content tailored to your interests and expertise.",
  },
];

export default function Features() {
  return (
    <section className="py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
          Explore Our Features
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-12">
          SynthoraChat brings you a perfect blend of AI intelligence and human collaboration.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i * 0.5689}
              whileHover={{ scale: 1.05, y: -4 }}
              className="bg-white dark:bg-[#161B22] rounded-2xl p-6 shadow-md hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition"
            >
              <div className="flex flex-col items-center gap-3 text-center">
                {f.icon}
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">{f.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
