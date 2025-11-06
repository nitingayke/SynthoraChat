// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Users, Brain, Zap, Star, Target } from "lucide-react";
import MediaDisplay from "../common/MediaDisplay";

export default function ShowCase() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Answers",
      description:
        "Get instant, accurate answers powered by advanced AI that learns from community discussions.",
      media: "https://res.cloudinary.com/videoapi-demo/video/upload/e_preview:duration_10.0/c_scale,w_600,f_auto,q_auto/v1/samples/mountain_adventure_preview_wa1vsg.webm?_a=DATAdtAAZAA0",
      mediaType: "video",
      reverse: false,
    },
    {
      icon: Users,
      title: "Community Wisdom",
      description:
        "Connect with experts and enthusiasts. Share knowledge and learn from real human experiences.",
      media: "https://st5.depositphotos.com/9335968/80464/i/450/depositphotos_804644562-stock-photo-concept-recommendation-business-technology-internet.jpg",
      mediaType: "image",
      reverse: true,
    },
    {
      icon: Zap,
      title: "Real-time Collaboration",
      description:
        "Instant messaging and live discussions. Get answers while you chat with the community.",
      media: "https://cloudinary-marketing-res.cloudinary.com/video/upload/f_auto,q_auto/v1701983730/videoAPI_prebuilt-video-player.mp4",
      mediaType: "video",
      reverse: false,
    },
    {
      icon: Target,
      title: "Personalized Recommendations",
      description:
        "Smart suggestions based on your interests and past interactions. Never miss relevant content.",
      media: "https://st5.depositphotos.com/9335968/80464/i/450/depositphotos_804644562-stock-photo-concept-recommendation-business-technology-internet.jpg",
      mediaType: "image",
      reverse: true,
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 dark:text-white">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SynthoraChat
            </span>
            ?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the perfect blend of artificial intelligence and human
            expertise in one powerful Q&A platform.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="space-y-32">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${feature.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
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
                />
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-3 p-3 bg-white rounded-2xl shadow-lg mb-6">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{feature.title}</span>
                </div>

                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
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
                      <Star className="w-4 h-4 text-green-500 fill-current" />
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
