// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Ananya Sharma",
    feedback: "SynthoraChat changed how I learn! AI + human responses make every topic easy to understand.",
    role: "Student",
  },
  {
    name: "Rahul Mehta",
    feedback: "It's like having Stack Overflow and ChatGPT in one platform — simply brilliant!",
    role: "Software Engineer",
  },
  {
    name: "Sara Malik",
    feedback: "The AI-generated summaries are incredibly helpful. Saves so much time.",
    role: "Researcher",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-white">What Our Users Say</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900/90 transition-colors duration-300 rounded-2xl p-6 shadow-md backdrop-blur-md"
            >
              <p className="italic mb-4 text-gray-100">“{t.feedback}”</p>
              <h4 className="font-semibold text-white">{t.name}</h4>
              <p className="text-sm text-gray-200">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
