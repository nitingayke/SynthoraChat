import { useEffect, useState } from "react";

const FEATURES = [
    "Ask meaningful questions and get community-driven answers",
    "Answer questions and receive AI-based accuracy scores",
    "Summarize discussions using AI-powered insights",
    "Use AI tools to improve clarity, relevance, and quality",
    "Discover top contributors, trending topics, and insights"
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
