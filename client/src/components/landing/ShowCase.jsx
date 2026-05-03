// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Users, Brain, Zap, Star, Target } from "lucide-react";
import MediaDisplay from "../common/MediaDisplay";

import AIAnswer from "../../assets/SynthoraChatAIAns.png";
import synthoraCommunity from "../../assets/SynthoraChatCommunity.png";
import collaboration from "../../assets/SynthoraChatCollab.png";
import recommendation from "../../assets/SynthoraChatRecommend.png"

export default function ShowCase() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Answers",
      description:
        "Get instant, accurate answers powered by advanced AI that learns from community discussions.",
      media: AIAnswer,
      mediaType: "image",
      reverse: false,
    },
    {
      icon: Users,
      title: "Community Wisdom",
      description:
        "Connect with experts and enthusiasts. Share knowledge and learn from real human experiences.",
      media: synthoraCommunity,
      mediaType: "image",
      reverse: true,
    },
    {
      icon: Zap,
      title: "Real-time Collaboration",
      description:
        "Instant messaging and live discussions. Get answers while you chat with the community.",
      media: collaboration,
      mediaType: "image",
      reverse: false,
    },
    {
      icon: Target,
      title: "Personalized Recommendations",
      description:
        "Smart suggestions based on your interests and past interactions. Never miss relevant content.",
      media: recommendation,
      mediaType: "image",
      reverse: true,
    },
  ];

  return (
    <section className="py-24 bg-gray-100 dark:bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose{" "}
            <span className="text-orange-500 dark:text-[#07C5B9]">
              SynthoraChat
            </span>
            ?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience the perfect blend of artificial intelligence and human
            expertise in one powerful Q&A platform.
          </p>
        </motion.div>

        {/* Feature Rows */}
        <div className="space-y-28">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${
                feature.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
              } items-center gap-12 lg:gap-16`}
            >
              {/* Media */}
              <div className="flex-1 w-full">
                <MediaDisplay
                  src={feature.media}
                  type={feature.mediaType}
                  alt={feature.title}
                  autoPlay={feature.mediaType === "video"}
                  showControls={feature.mediaType === "video"}
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-3 p-3 bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm mb-6">
                  <div className="p-2 bg-orange-500 rounded-xl">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </span>
                </div>

                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                <ul className="space-y-3">
                  {[
                    "Instant response generation",
                    "Context-aware understanding",
                    "Multi-source verification",
                    "Continuous learning",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-gray-700 dark:text-gray-200"
                    >
                      <Star className="w-4 h-4 text-orange-500 fill-current" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
