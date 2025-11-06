import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Calendar, Users, Coffee, BookOpen, Video, Trophy } from 'lucide-react';

export default function Activities() {
  const activities = [
    {
      icon: Coffee,
      title: "Weekly Coffee Chat",
      description: "Virtual coffee meetings where members share what they're working on and get casual advice",
      schedule: "Every Friday, 9 AM PST",
      participants: "50-100 members weekly"
    },
    {
      icon: BookOpen,
      title: "Book Club",
      description: "We read and discuss books about technology, personal growth, and innovation together",
      schedule: "Monthly, 2nd Wednesday",
      participants: "200+ active readers"
    },
    {
      icon: Video,
      title: "Expert AMAs",
      description: "Ask Me Anything sessions with industry leaders and experienced professionals",
      schedule: "Bi-weekly, Various times",
      participants: "300+ attendees average"
    },
    {
      icon: Trophy,
      title: "Learning Challenges",
      description: "Group learning challenges with support and accountability from the community",
      schedule: "Quarterly events",
      participants: "500+ participants last challenge"
    },
    {
      icon: Users,
      title: "Study Groups",
      description: "Small groups focusing on specific topics, technologies, or career goals",
      schedule: "Ongoing, self-organized",
      participants: "50+ active study groups"
    },
    {
      icon: Calendar,
      title: "Community Events",
      description: "Hackathons, workshops, and social events organized by and for our members",
      schedule: "Monthly special events",
      participants: "Varies by event"
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
            Community Activities & Events
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Beyond Q&A - ways we connect, learn, and grow together
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div className="inline-flex p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-4">
                <activity.icon className="w-6 h-6 text-white" />
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {activity.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {activity.description}
              </p>

              {/* Schedule & Participants */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                  <Calendar className="w-4 h-4" />
                  {activity.schedule}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Users className="w-4 h-4" />
                  {activity.participants}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}