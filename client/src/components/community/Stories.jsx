import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

export default function Stories() {
  const stories = [
    {
      name: "Sarah Chen",
      role: "Research Scientist",
      story: "I've found not just answers here, but lifelong friends. The support I received when I was starting my research career was incredible.",
      achievement: "Helped 200+ students",
      avatar: "👩‍🔬"
    },
    {
      name: "Marcus Rodriguez",
      role: "Senior Developer",
      story: "This community helped me transition from junior to senior developer. The mentorship and real-world advice changed my career.",
      achievement: "Mentored 50+ developers",
      avatar: "👨‍💻"
    },
    {
      name: "Dr. Emily Watson",
      role: "University Professor",
      story: "I've been teaching for 15 years, but I learn something new from this community every single day. The curiosity here is inspiring.",
      achievement: "Shared 500+ insights",
      avatar: "👩‍🏫"
    },
    {
      name: "Alex Thompson",
      role: "Student",
      story: "As a student with limited resources, this community has been my university. People here are incredibly generous with their knowledge.",
      achievement: "Asked 100+ questions",
      avatar: "🎓"
    },
    {
      name: "Priya Patel",
      role: "UX Designer",
      story: "The diversity of perspectives here is amazing. I get feedback from engineers, artists, scientists - it makes my work so much richer.",
      achievement: "Collaborated on 75+ projects",
      avatar: "👩‍🎨"
    },
    {
      name: "James Wilson",
      role: "Career Changer",
      story: "At 40, I decided to switch careers. This community held my hand through the entire journey. I couldn't have done it alone.",
      achievement: "Successfully transitioned careers",
      avatar: "🔄"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Real Stories, Real Connections
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Hear from our members about their journey and the friendships they've built
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="flex justify-start mb-4">
                <Quote className="w-8 h-8 text-blue-600 rotate-180" />
              </div>

              {/* Story */}
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                "{story.story}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="text-3xl">{story.avatar}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-white">{story.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{story.role}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 text-orange-500" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">{story.achievement}</span>
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
