import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Calendar, Users, Coffee, BookOpen, Video, Trophy } from "lucide-react";

export default function Activities() {
  const activities = [
    {
      icon: Coffee,
      title: "Weekly Coffee Chat",
      description:
        "Virtual coffee meetings where members share what they're working on and get casual advice",
      schedule: "Every Friday, 9 AM PST",
      participants: "50-100 members weekly",
    },
    {
      icon: BookOpen,
      title: "Book Club",
      description:
        "We read and discuss books about technology, personal growth, and innovation together",
      schedule: "Monthly, 2nd Wednesday",
      participants: "200+ active readers",
    },
    {
      icon: Video,
      title: "Expert AMAs",
      description:
        "Ask Me Anything sessions with industry leaders and experienced professionals",
      schedule: "Bi-weekly, Various times",
      participants: "300+ attendees average",
    },
    {
      icon: Trophy,
      title: "Learning Challenges",
      description:
        "Group learning challenges with support and accountability from the community",
      schedule: "Quarterly events",
      participants: "500+ participants last challenge",
    },
    {
      icon: Users,
      title: "Study Groups",
      description:
        "Small groups focusing on specific topics, technologies, or career goals",
      schedule: "Ongoing, self-organized",
      participants: "50+ active study groups",
    },
    {
      icon: Calendar,
      title: "Community Events",
      description:
        "Hackathons, workshops, and social events organized by and for our members",
      schedule: "Monthly special events",
      participants: "Varies by event",
    },
  ];

  return (
    <section className="py-16 sm:py-20">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Community Activities & Events
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Beyond Q&A – ways we connect, learn, and grow together
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {activities.map((activity, index) => {
            const Icon = activity.icon;

            return (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="bg-white dark:bg-[#161616] rounded-2xl p-6
                           border border-gray-200 dark:border-gray-700
                           hover:border-orange-500/40 dark:hover:border-[#07C5B9]/40
                           hover:shadow-lg transition-all duration-300
                           flex flex-col h-full"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4
                                bg-orange-100 dark:bg-[#07C5B9]/10">
                  <Icon className="w-6 h-6 text-orange-500 dark:text-[#07C5B9]" />
                </div>

                {/* Title & Description */}
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {activity.title}
                </h3>

                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed flex-grow">
                  {activity.description}
                </p>

                {/* Meta */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-orange-600 dark:text-[#07C5B9]">
                    <Calendar className="w-4 h-4" />
                    <span>{activity.schedule}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{activity.participants}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
