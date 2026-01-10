export default function Testimonials() {

  const testimonials = [
    {
      name: "Ananya Sharma",
      feedback:
        "SynthoraChat changed how I learn! AI + human responses make every topic easy to understand.",
      role: "Student",
    },
    {
      name: "Rahul Mehta",
      feedback:
        "It's like having Stack Overflow and ChatGPT in one platform — simply brilliant!",
      role: "Software Engineer",
    },
    {
      name: "Sara Malik",
      feedback:
        "The AI-generated summaries are incredibly helpful. Saves so much time.",
      role: "Researcher",
    },
  ];


  return (
    <section className="py-16 lg:py-20 px-4 bg-gray-100 dark:bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real feedback from developers and learners who transformed their workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i * 0.254}
              className="
                bg-white dark:bg-[#161616]
                rounded-xl lg:rounded-2xl
                p-6
                border border-gray-200 dark:border-[#2a2a2a]
                shadow-sm hover:shadow-md
                transition-all duration-300
              "
            >
              <div className="mb-6">
                <div className="flex text-orange-500 dark:text-[#07C5B9] mb-2">
                  {[...Array(5)].map((_, starIndex) => (
                    <svg
                      key={starIndex}
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-200 italic">"{t.feedback}"</p>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-[#2a2a2a]">
                <h4 className="font-semibold text-gray-900 dark:text-white">{t.name}</h4>
                <p className="text-sm text-orange-500 dark:text-[#07C5B9] font-medium">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}