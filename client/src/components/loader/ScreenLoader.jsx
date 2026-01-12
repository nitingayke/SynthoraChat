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
  "Build reputation through high-quality contributions and engagement"
];


export default function ScreenLoader() {
    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
   
            setVisible(false);

            setTimeout(() => {
                setIndex((prev) => (prev + 1) % FEATURES.length);
                setVisible(true); 
            }, 300);
        }, 1600);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-white dark:bg-black text-[#191919] dark:text-white p-4">

            <div className="animate-spin rounded-full h-10 w-10 border-4 border-x-0" />
            <p className={`mt-3 text-lg text-center max-w-xl transition-all duration-300 ease-in-out ${visible ? "opacity-80 translate-y-0" : "opacity-0 translate-y-2"}`}>
                {FEATURES[index]}
            </p>
        </div>
    );
}
