// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Rocket, Users, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomeCTA() {
  const benefits = [
    {
      icon: Rocket,
      title: "Instant Answers",
      description: "Get AI-powered responses in seconds"
    },
    {
      icon: Users,
      title: "Expert Community",
      description: "Learn from industry professionals"
    },
    {
      icon: Star,
      title: "Quality Content",
      description: "Curated answers with AI verification"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 dark:from-orange-600 dark:to-orange-800 py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Start asking questions, sharing knowledge, and growing with AI-powered insights today.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-orange-100">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-orange-600 font-bold rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
              >
                <Rocket className="w-5 h-5" />
                Join Now - It's Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                to="/features"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-orange-600 transition-all duration-300"
              >
                Explore Features
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="border-t border-orange-400/30 pt-8"
          >
            <div className="grid grid-cols-3 gap-8 text-orange-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10K+</div>
                <div className="text-sm">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-sm">Questions Answered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">99%</div>
                <div className="text-sm">Satisfaction Rate</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}