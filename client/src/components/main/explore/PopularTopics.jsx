import React from 'react';
import { Link } from 'react-router-dom';
import { Target, ChevronRight, Brain, Globe, BarChart3, Smartphone, Rocket, Palette } from 'lucide-react';

const recommendedTopics = [
    { name: "Artificial Intelligence", icon: Brain, questions: 1247, color: "bg-gradient-to-r from-purple-500 to-pink-500", path: "/main?topic=ai" },
    { name: "Web Development", icon: Globe, questions: 2890, color: "bg-gradient-to-r from-blue-500 to-cyan-500", path: "/main?topic=web-dev" },
    { name: "Data Science", icon: BarChart3, questions: 1567, color: "bg-gradient-to-r from-green-500 to-emerald-500", path: "/main?topic=data-science" },
    { name: "Mobile Development", icon: Smartphone, questions: 987, color: "bg-gradient-to-r from-orange-500 to-red-500", path: "/main?topic=mobile" },
    { name: "DevOps", icon: Rocket, questions: 756, color: "bg-gradient-to-r from-indigo-500 to-purple-500", path: "/main?topic=devops" },
    { name: "UI/UX Design", icon: Palette, questions: 634, color: "bg-gradient-to-r from-pink-500 to-rose-500", path: "/main?topic=design" }
];

export default function PopularTopics() {
    return (
        <div className="bg-white dark:bg-[#161616] rounded-lg border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-100 dark:bg-[#07C5B9]/20 rounded-lg">
                    <Target className="w-5 h-5 text-orange-500 dark:text-[#07C5B9]" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Popular Topics</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Explore trending categories</p>
                </div>
            </div>
            <div className="space-y-2">
                {recommendedTopics.map((topic, index) => {
                    const IconComponent = topic.icon;
                    return (
                        <Link
                            key={index * 0.2145}
                            to={topic.path}
                            className="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-[#202020] transition-all group hover:shadow-md"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-lg ${topic.color} flex items-center justify-center shadow-md`}>
                                    <IconComponent className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-[#07C5B9] transition-colors">
                                        {topic.name}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {topic.questions.toLocaleString()} questions
                                    </div>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 dark:group-hover:text-[#07C5B9] transition-colors group-hover:translate-x-1" />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}