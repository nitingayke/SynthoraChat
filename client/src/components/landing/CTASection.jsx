// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="relative px-4 py-16 lg:py-24 bg-gradient-to-b from-gray-100 to-gray-50 dark:from-[#0f0f0f] dark:to-[#161616] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-r from-orange-500/5 to-orange-600/5 dark:from-[#07C5B9]/10 dark:to-[#06b3a8]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-r from-orange-500/5 to-orange-600/5 dark:from-[#07C5B9]/10 dark:to-[#06b3a8]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-xl lg:rounded-2xl px-6 py-12 lg:px-12 lg:py-16 text-center bg-orange-500 dark:bg-[#07C5B9]/10 shadow-xl overflow-hidden"
        >
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 lg:mb-6">
              Ready to Transform Your Learning Experience?
            </h2>

            <p className="text-orange-50/90 mb-8 lg:mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
              Connect, learn, and grow with SynthoraChat — where AI intelligence meets
              human collaboration. Join thousands of developers already improving their skills.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center px-8 py-3 lg:py-4 rounded-lg lg:rounded-xl font-semibold text-orange-600 dark:text-[#07C5B9] bg-white hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
                >
                  Get Started Free
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/features"
                  className="inline-flex items-center justify-center px-8 py-3 lg:py-4 rounded-lg lg:rounded-xl font-semibold text-white bg-transparent border-2 border-white/30 hover:bg-white/10 transition-all duration-300 w-full sm:w-auto"
                >
                  Explore Features
                </Link>
              </motion.div>
            </div>

            <p className="text-orange-50/70 text-sm mt-8 lg:mt-10">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}