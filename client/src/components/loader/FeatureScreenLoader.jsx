import { useEffect, useState } from "react";

const FEATURES = [
    "Ask questions and get answers from a knowledge-driven community",
    "Improve questions using AI-powered clarity and relevance suggestions",
    "Receive AI-rated answers based on accuracy and usefulness",
    "Summarize long discussions into clear, actionable insights",
    "Generate instant AI answers when expert help is needed",
    "Discover trending topics and top contributors in real time",
    "Get personalized recommendations based on your interests",
    "Highlight key insights and consensus from multiple answers",
    "Filter answers by relevance, popularity, or AI confidence",
    "Build reputation through high-quality contributions and engagement",
];

export default function FeatureScreenLoader() {
    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(false);

            setTimeout(() => {
                setIndex(prev => (prev + 1) % FEATURES.length);
                setVisible(true);
            }, 300);
        }, 1800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-fit h-fit flex flex-col items-center justify-center p-6 space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-3 border-x-0" />
            
            <p
                className={`text-center text-lg font-light max-w-2xl text-gray-800 dark:text-gray-200 transition-all duration-300 ease-in-out ${visible ? "opacity-90 translate-y-0" : "opacity-0 translate-y-2"}`}
            >
                {FEATURES[index]}
            </p>
        </div>
    );
}
