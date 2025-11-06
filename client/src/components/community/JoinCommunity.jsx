import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Users, Heart, MessageCircle, Star } from 'lucide-react';

export default function JoinCommunity() {
  const benefits = [
    {
      icon: Users,
      title: "Make Real Friends",
      description: "Connect with like-minded people who share your passions and curiosity"
    },
    {
      icon: Heart,
      title: "Find Support",
      description: "Get emotional and professional support during your learning journey"
    },
    {
      icon: MessageCircle,
      title: "Meaningful Conversations",
      description: "Engage in deep discussions that go beyond surface-level answers"
    },
    {
      icon: Star,
      title: "Personal Growth",
      description: "Grow not just professionally, but personally through diverse perspectives"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl font-extrabold mb-6">
              Ready to Join Our Family?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Become part of something more than just a platform - join a community that cares about you as a person.
            </p>
          </motion.div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="flex justify-center mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-blue-100 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-4"
          >
            <p className="text-blue-100 text-lg mb-6">
              Your seat at the table is waiting. Come as you are.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-700 font-bold rounded-2xl shadow-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                Join Our Community
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-300">
                Learn More First
              </button>
            </div>
            <p className="text-blue-200 text-sm mt-4">
              No pressure, no commitment - just see if we're the right fit for you
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}