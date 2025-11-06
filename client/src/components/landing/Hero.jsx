// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Brain, Sparkles, Users, Rocket } from "lucide-react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Hero() {

  const { loginUser } = useContext(AuthContext);

  const features = [
    { icon: Sparkles, text: "AI-Powered Answers" },
    { icon: Users, text: "Community Driven" },
    { icon: Rocket, text: "Real-time Chat" }
  ];

  return (
    <section className="relative min-h-[calc(100vh-50px)] flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-8 sm:py-0 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Logo/Brand */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="flex justify-center mb-8 md:hidden"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-lg opacity-75 animate-pulse"></div>
              <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-3xl border border-white/20 shadow-2xl">
                <Brain className="w-16 h-16 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight"
          >
            Ask Smarter.
            <br className="sm:hidden"/>
            <span className=" bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Answer Better.
            </span>
            <span className="text-white">With </span>
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              AI
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-6 text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Where intelligent questions meet AI-powered answers. 
            Join our community of curious minds and artificial intelligence working together.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to={loginUser ? "/chat/all" : "/login"} className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 flex items-center gap-3">
              <Rocket className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              Get Started Free
            </Link>
            
            <Link to={"/demo"} className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105 flex items-center gap-3">
              <Sparkles className="w-5 h-5" />
              Live Demo
            </Link>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-12 hidden sm:grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <feature.icon className="w-6 h-6 text-blue-400" />
                <span className="text-gray-200 font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}