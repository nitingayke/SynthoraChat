import { useEffect, useState } from "react";

const FEATURES = [
    "Ask smarter and more meaningful questions with AI-powered suggestions, intent detection, and automatic smart tagging for better reach",
    "Receive high-quality, community-driven answers that are intelligently rated by AI based on accuracy, relevance, and completeness",
    "Get instant AI-powered summaries of discussions — choose between short overviews, detailed explanations, or key bullet-point highlights",
    "Discover trending questions, emerging topics, and valuable insights through personalized AI-driven recommendations tailored to your interests",
    "Experience the power of combined human intelligence and Generative AI to gain deeper understanding, clarity, and reliable knowledge",
    "Build your reputation as a contributor by earning badges, recognition, and credibility through consistent high-quality participation"
];


export default function ExploreHeader() {
    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(false);

            setTimeout(() => {
                setIndex((prev) => (prev + 1) % FEATURES.length);
                setVisible(true);
            }, 300);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-center py-10 px-4 overflow-hidden">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 text-orange-500 dark:text-[#07C6B5]">
                Explore Knowledge
            </h1>

            <p
                className={`sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-300 ease-in-out ${visible ? "opacity-90 translate-y-0" : "opacity-0 translate-y-2"}`}
            >
                {FEATURES[index]}
            </p>
        </div>
    );
}
