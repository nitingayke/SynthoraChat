import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

export default function Stories() {
  const stories = [
    {
      name: "Sarah Chen",
      role: "Research Scientist",
      story:
        "I've found not just answers here, but lifelong friends. The support I received when I was starting my research career was incredible.",
      achievement: "Helped 200+ students",
      avatar: "👩‍🔬",
    },
    {
      name: "Marcus Rodriguez",
      role: "Senior Developer",
      story:
        "This community helped me transition from junior to senior developer. The mentorship and real-world advice changed my career.",
      achievement: "Mentored 50+ developers",
      avatar: "👨‍💻",
    },
    {
      name: "Dr. Emily Watson",
      role: "University Professor",
      story:
        "I've been teaching for 15 years, but I learn something new from this community every single day.",
      achievement: "Shared 500+ insights",
      avatar: "👩‍🏫",
    },
    {
      name: "Alex Thompson",
      role: "Student",
      story:
        "As a student with limited resources, this community has been my university.",
      achievement: "Asked 100+ questions",
      avatar: "🎓",
    },
    {
      name: "Priya Patel",
      role: "UX Designer",
      story:
        "The diversity of perspectives here is amazing. It makes my work so much richer.",
      achievement: "Collaborated on 75+ projects",
      avatar: "👩‍🎨",
    },
    {
      name: "James Wilson",
      role: "Career Changer",
      story:
        "At 40, I decided to switch careers. This community held my hand through the journey.",
      achievement: "Successfully transitioned careers",
      avatar: "🔄",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-gray-100 dark:bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Real Stories, Real Connections
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Hear how our community is shaping careers and friendships.
          </p>
        </motion.div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="bg-white dark:bg-[#161616] rounded-xl p-6
                         border border-gray-200 dark:border-gray-800
                         shadow-sm hover:shadow-md transition-all"
            >
              {/* Quote */}
              <Quote className="w-6 h-6 text-orange-500 dark:text-[#07C5B9] mb-3 rotate-180" />

              {/* Story */}
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">
                “{story.story}”
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="text-2xl">{story.avatar}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {story.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {story.role}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <Star className="w-3.5 h-3.5 text-orange-500 dark:text-[#07C5B9]" />
                    {story.achievement}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
