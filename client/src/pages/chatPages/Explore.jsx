import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
    TrendingUp,
    Zap,
    Users,
    Star,
    Clock,
    Brain,
    Rocket,
    Sparkles,
    MessageSquare,
    ThumbsUp,
    Eye,
    ChevronRight,
    Bot,
    Target,
    BarChart3,
    Crown,
    Lightbulb,
    Shield,
    Globe,
    Smartphone,
    Palette,
    Flame,
    Compass,
    Wand2
} from 'lucide-react';
import AuthContext from '../../context/AuthContext';

export default function ExplorePage() {
    const { loginUser } = useContext(AuthContext);
    const [activeFilter, setActiveFilter] = useState('trending');
    const [activeCategory, setActiveCategory] = useState('all');

    // Enhanced explore sections from the first approach
    const exploreSections = [
        {
            id: 'recommended',
            title: "Recommended For You",
            description: "AI-powered personalized suggestions based on your interests",
            icon: Sparkles,
            color: "text-orange-500",
            bgColor: "from-orange-400 to-orange-600",
            count: "1.2K",
            path: "/main/recommended"
        },
        {
            id: 'trending',
            title: "Trending Questions",
            description: "Most active and rapidly growing discussions",
            icon: Flame,
            color: "text-red-500",
            bgColor: "from-red-400 to-red-600",
            count: "856",
            path: "/main/trending"
        },
        {
            id: 'ai-assisted',
            title: "AI-Assisted Posts",
            description: "Questions enhanced and refined using AI",
            icon: Brain,
            color: "text-blue-500",
            bgColor: "from-blue-400 to-blue-600",
            count: "432",
            path: "/main/ai-assisted"
        },
        {
            id: 'popular',
            title: "Popular This Week",
            description: "Top rated answers and heavily engaged posts",
            icon: Star,
            color: "text-yellow-500",
            bgColor: "from-yellow-400 to-yellow-600",
            count: "2.1K",
            path: "/main/popular"
        },
        {
            id: 'recent',
            title: "Recent Questions",
            description: "Freshly asked questions across all categories",
            icon: Clock,
            color: "text-green-500",
            bgColor: "from-green-400 to-green-600",
            count: "324",
            path: "/main/recent"
        },
        {
            id: 'ai-discover',
            title: "AI Discover",
            description: "Explore topics generated completely by AI",
            icon: Wand2,
            color: "text-purple-500",
            bgColor: "from-purple-400 to-purple-600",
            count: "189",
            path: "/main/ai-discover"
        },
        {
            id: 'topic-explorer',
            title: "Topic Explorer",
            description: "Find posts from categories you love",
            icon: Compass,
            color: "text-teal-500",
            bgColor: "from-teal-400 to-teal-600",
            count: "1.5K",
            path: "/main/topics"
        },
        {
            id: 'top-contributors',
            title: "Top Accuracy Contributors",
            description: "Creators with highest AI-verified accuracy score",
            icon: TrendingUp,
            color: "text-pink-500",
            bgColor: "from-pink-400 to-pink-600",
            count: "156",
            path: "/main/contributors"
        }
    ];

    // Mock data for demonstration
    const trendingQuestions = [
        {
            _id: "1",
            title: "How to implement React Server Components in Next.js 14?",
            content: "Looking for best practices and real-world examples of RSC implementation. I'm particularly interested in performance optimization...",
            topics: ["React", "Next.js", "Web Development", "Performance"],
            answers: 24,
            upvotes: 156,
            views: 1200,
            author: { username: "react_dev", profile: { firstName: "Sarah", lastName: "Chen" } },
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
            aiAccuracy: 92
        },
        {
            _id: "2",
            title: "AI vs Machine Learning vs Deep Learning - Key differences?",
            content: "Can someone explain the fundamental differences with practical examples? Looking for clear distinctions and use cases...",
            topics: ["AI", "Machine Learning", "Deep Learning", "Data Science"],
            answers: 18,
            upvotes: 89,
            views: 850,
            author: { username: "ai_enthusiast", profile: { firstName: "Mike", lastName: "Zhang" } },
            createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
            aiAccuracy: 88
        },
        {
            _id: "3",
            title: "Best practices for microservices communication in 2024?",
            content: "What are the current best practices for microservices communication patterns? Interested in both synchronous and async approaches...",
            topics: ["Microservices", "Architecture", "Backend", "DevOps"],
            answers: 32,
            upvotes: 203,
            views: 1500,
            author: { username: "cloud_architect", profile: { firstName: "Alex", lastName: "Kumar" } },
            createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
            aiAccuracy: 95
        }
    ];

    const recommendedTopics = [
        { name: "Artificial Intelligence", icon: Brain, questions: 1247, color: "bg-gradient-to-r from-purple-500 to-pink-500", path: "/main/topics/ai" },
        { name: "Web Development", icon: Globe, questions: 2890, color: "bg-gradient-to-r from-blue-500 to-cyan-500", path: "/main/topics/web-dev" },
        { name: "Data Science", icon: BarChart3, questions: 1567, color: "bg-gradient-to-r from-green-500 to-emerald-500", path: "/main/topics/data-science" },
        { name: "Mobile Development", icon: Smartphone, questions: 987, color: "bg-gradient-to-r from-orange-500 to-red-500", path: "/main/topics/mobile" },
        { name: "DevOps", icon: Rocket, questions: 756, color: "bg-gradient-to-r from-indigo-500 to-purple-500", path: "/main/topics/devops" },
        { name: "UI/UX Design", icon: Palette, questions: 634, color: "bg-gradient-to-r from-pink-500 to-rose-500", path: "/main/topics/design" }
    ];

    const aiFeatures = [
        {
            icon: Sparkles,
            title: "AI Answer Generation",
            description: "Get instant AI-powered answers with source references and confidence scores",
            color: "from-purple-500 to-pink-500",
            action: "Try Now",
            path: "/main/ai-chat"
        },
        {
            icon: Target,
            title: "Smart Summarization",
            description: "Automatic summary of long discussions with key insights extraction",
            color: "from-blue-500 to-cyan-500",
            action: "View Demo",
            path: "/main/ai-summary"
        },
        {
            icon: Shield,
            title: "Fact Checking",
            description: "AI-powered accuracy verification with confidence scoring",
            color: "from-green-500 to-emerald-500",
            action: "Learn More",
            path: "/main/ai-fact-check"
        },
        {
            icon: Zap,
            title: "Quick Assistance",
            description: "Instant help with question formatting and clarity improvement",
            color: "from-orange-500 to-red-500",
            action: "Get Help",
            path: "/main/ai-assist"
        }
    ];

    const filters = [
        { id: 'trending', label: 'Trending', icon: TrendingUp, path: "/main/trending" },
        { id: 'recent', label: 'Recent', icon: Clock, path: "/main/recent" },
        { id: 'popular', label: 'Popular', icon: Star, path: "/main/popular" },
        { id: 'ai', label: 'AI Answers', icon: Brain, path: "/main/ai-answers" },
        { id: 'unanswered', label: 'Unanswered', icon: MessageSquare, path: "/main/unanswered" }
    ];

    return (
        <div className="max-w-7xl mx-auto py-5 md:py-15">

            {/* Enhanced Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Explore Knowledge
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    Discover trending questions, AI-powered insights, and join our vibrant community of learners and experts.
                </p>
            </div>

            {/* Explore Categories Grid */}
            <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Explore Categories</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {exploreSections.map((section) => {
                        const IconComponent = section.icon;
                        return (
                            <Link
                                key={section.id}
                                to={section.path}
                                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${activeCategory === section.id
                                    ? 'border-blue-500 dark:border-[#07C5B9] shadow-lg scale-105'
                                    : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                                    } bg-white dark:bg-[#161616] hover:shadow-md group block`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-xl bg-gradient-to-r ${section.bgColor}`}>
                                        <IconComponent className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                                        {section.count}
                                    </span>
                                </div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 group-hover:text-blue-500 dark:group-hover:text-[#07C5B9] transition-colors">
                                    {section.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    {section.description}
                                </p>
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Main Content - Left 2/3 */}
                <div className="xl:col-span-2 space-y-8">

                    {/* Enhanced Filter Tabs */}
                    <div className="bg-white dark:bg-[#161616] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Browse Questions</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {filters.map((filter) => {
                                const IconComponent = filter.icon;
                                return (
                                    <Link
                                        key={filter.id}
                                        to={filter.path}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeFilter === filter.id
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                                            : 'bg-gray-100 dark:bg-[#202020] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#2a2a2a]'
                                            }`}
                                    >
                                        <IconComponent className="w-4 h-4" />
                                        <span>{filter.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Trending Questions with Enhanced Design */}
                    <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-white dark:from-[#1a1a1a] dark:to-[#161616]">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                                        <TrendingUp className="w-6 h-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                            Trending Questions
                                        </h2>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Most active discussions in the community
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    to="/main/trending"
                                    className="text-blue-500 dark:text-[#07C5B9] hover:underline font-medium text-sm flex items-center gap-1 group"
                                >
                                    View All
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-800">
                            {trendingQuestions.map((question) => (
                                <div key={question._id} className="p-6 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors group">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-1">
                                            <Link to={`/questions/${question._id}`}>
                                                <h3 className="font-semibold text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-[#07C5B9] transition-colors text-lg mb-2 group-hover:translate-x-1 transition-transform">
                                                    {question.title}
                                                </h3>
                                            </Link>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                                                {question.content}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {question.topics.map((topic, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 bg-blue-100 dark:bg-[#07C5B9]/20 text-blue-800 dark:text-[#07C5B9] text-xs rounded-full border border-blue-200 dark:border-[#07C5B9]/30 hover:bg-blue-200 dark:hover:bg-[#07C5B9]/30 transition-colors"
                                                    >
                                                        {topic}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <MessageSquare className="w-3 h-3" />
                                                    {question.answers} answers
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <ThumbsUp className="w-3 h-3" />
                                                    {question.upvotes} upvotes
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Eye className="w-3 h-3" />
                                                    {question.views} views
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Assistant Preview with Enhanced Design */}
                    <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-2xl p-8 text-white shadow-xl">
                        <div className="flex items-start gap-6">
                            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                                <Bot className="w-12 h-12" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold mb-3">AI Learning Assistant</h3>
                                <p className="mb-6 opacity-95 text-lg leading-relaxed">
                                    Get personalized explanations, code examples, and learning resources powered by our advanced AI.
                                    Perfect for quick answers and deep dives into complex topics.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <Link
                                        to="/main/ai-chat"
                                        className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        🚀 Try AI Assistant
                                    </Link>
                                    <Link
                                        to="/main/ai-examples"
                                        className="bg-transparent border-2 border-white/40 px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all backdrop-blur-sm"
                                    >
                                        📚 View Examples
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar - Right 1/3 */}
                <div className="space-y-8">

                    {/* Recommended Topics */}
                    <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
                                <Target className="w-5 h-5 text-blue-500 dark:text-[#07C5B9]" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Popular Topics</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Explore trending categories</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {recommendedTopics.map((topic, index) => {
                                const IconComponent = topic.icon;
                                return (
                                    <Link
                                        key={index}
                                        to={topic.path}
                                        className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-all group border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl ${topic.color} flex items-center justify-center shadow-md`}>
                                                <IconComponent className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-[#07C5B9] transition-colors">
                                                    {topic.name}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {topic.questions.toLocaleString()} questions
                                                </div>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-[#07C5B9] transition-colors group-hover:translate-x-1" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* AI Features Showcase */}
                    <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-purple-100 dark:bg-purple-500/20 rounded-lg">
                                <Sparkles className="w-5 h-5 text-purple-500" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">AI Features</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Powered by advanced AI</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {aiFeatures.map((feature, index) => {
                                const IconComponent = feature.icon;
                                return (
                                    <Link
                                        key={index}
                                        to={feature.path}
                                        className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-500 transition-all group cursor-pointer bg-gradient-to-r from-white to-gray-50 dark:from-[#1a1a1a] dark:to-[#161616] hover:shadow-md block"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                                                <IconComponent className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-semibold text-gray-900 dark:text-white mb-1">
                                                    {feature.title}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                                    {feature.description}
                                                </div>
                                                <div className="text-xs font-medium text-blue-500 dark:text-[#07C5B9] hover:underline">
                                                    {feature.action} →
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl p-6 text-white shadow-xl">
                        <h3 className="text-xl font-bold mb-4">Get Started</h3>
                        <div className="space-y-3">
                            <Link
                                to="/main/ask"
                                className="flex items-center gap-4 p-4 bg-white/20 rounded-xl hover:bg-white/30 transition-all group backdrop-blur-sm border border-white/20"
                            >
                                <MessageSquare className="w-5 h-5" />
                                <span className="font-semibold">Ask a Question</span>
                                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                            <Link
                                to="/main/ai-chat"
                                className="flex items-center gap-4 p-4 bg-white/20 rounded-xl hover:bg-white/30 transition-all group backdrop-blur-sm border border-white/20"
                            >
                                <Brain className="w-5 h-5" />
                                <span className="font-semibold">Chat with AI</span>
                                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                            {!loginUser && (
                                <Link
                                    to="/auth"
                                    className="flex items-center gap-4 p-4 bg-white/20 rounded-xl hover:bg-white/30 transition-all group backdrop-blur-sm border border-white/20"
                                >
                                    <Users className="w-5 h-5" />
                                    <span className="font-semibold">Join Community</span>
                                    <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Community Spotlight */}
            <div className="mt-12 bg-gradient-to-r from-gray-50 to-white dark:from-[#1a1a1a] dark:to-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-500/20 rounded-lg">
                        <Crown className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Community Spotlight</h2>
                        <p className="text-gray-600 dark:text-gray-400">Why our community loves us</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center p-6 bg-white dark:bg-[#1c1c1c] rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Lightbulb className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">Top Contributors</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            Experts from top companies sharing valuable insights and helping others learn through detailed explanations
                        </p>
                    </div>
                    <div className="text-center p-6 bg-white dark:bg-[#1c1c1c] rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Zap className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">AI Accuracy</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            95% of AI answers rated helpful by our community with continuous improvement through user feedback
                        </p>
                    </div>
                    <div className="text-center p-6 bg-white dark:bg-[#1c1c1c] rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                        <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Rocket className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">Fast Responses</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            Average answer time: 15 minutes with AI assistance. Get instant help when you need it most
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}