// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="relative px-4 py-20 overflow-hidden">
      {/* Animated Background - Matching Hero */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto rounded-3xl py-20 px-6 bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 border border-white/20 shadow-2xl text-center transition-colors duration-500">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-white"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Ready to Shape the Future of Q&A?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Connect, learn, and grow with SynthoraChat — where ideas meet intelligence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to={"/signup"} 
              className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 flex items-center gap-3"
            >
              Join Now
            </Link>
            <Link 
              to={"/features"} 
              className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105 flex items-center gap-3"
            >
              Explore Features
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}