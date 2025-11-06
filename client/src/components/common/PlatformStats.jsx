// eslint-disable-next-line no-unused-vars
import { Users, Brain, TrendingUp, Clock, Rocket, Sparkles, Target, Award } from "lucide-react";

export default function PlatformStats() {

    // Real-time stats data
    const stats = {
        activeUsers: 10234,
        questionsAnswered: 48723,
        aiAccuracy: 94.2,
        responseTime: 1.8,
        liveUsers: 324,
        communities: 156,
        satisfactionRate: 96.8,
        aiAnswers: 8921
    };

    // Additional metrics
    const additionalMetrics = [
        {
            icon: Users,
            value: stats.liveUsers,
            label: "Live Users Now",
            suffix: "online",
            color: "text-green-500",
            bgColor: "bg-green-100 dark:bg-green-900/20"
        },
        {
            icon: Target,
            value: stats.communities,
            label: "Active Communities",
            suffix: "groups",
            color: "text-blue-500",
            bgColor: "bg-blue-100 dark:bg-blue-900/20"
        },
        {
            icon: Award,
            value: `${stats.satisfactionRate}%`,
            label: "User Satisfaction",
            suffix: "rating",
            color: "text-yellow-500",
            bgColor: "bg-yellow-100 dark:bg-yellow-900/20"
        },
        {
            icon: Sparkles,
            value: stats.aiAnswers,
            label: "AI Generated Answers",
            suffix: "solutions",
            color: "text-purple-500",
            bgColor: "bg-purple-100 dark:bg-purple-900/20"
        }
    ];

    // Features highlights
    const features = [
        {
            icon: Rocket,
            title: "Real-time Collaboration",
            description: "Instant answers from both AI and community experts"
        },
        {
            icon: Brain,
            title: "Smart AI Integration",
            description: "Advanced language models for accurate responses"
        },
        {
            icon: TrendingUp,
            title: "Growing Community",
            description: "Thousands of experts joining every month"
        },
        {
            icon: Clock,
            title: "24/7 Availability",
            description: "Get answers anytime, anywhere"
        }
    ];

    return (
        <section id="platform-stats" className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
                        <Sparkles className="w-5 h-5 text-orange-500" />
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Platform Insights
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Our Growing{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Knowledge Ecosystem
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        Join thousands of curious minds and AI intelligence working together
                        to create the most comprehensive Q&A platform.
                    </p>
                </div>

                {/* Additional Metrics */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-16">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
                        Real-time Platform Metrics
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {additionalMetrics.map((metric) => (
                            <div key={metric.label} className="text-center group">
                                <div className={`inline-flex p-3 ${metric.bgColor} rounded-2xl mb-3`}>
                                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                                </div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                    {metric.value}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                    {metric.label}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-500">
                                    {metric.suffix}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Features Highlights */}
                <div className="text-center">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
                        Why Choose SynthoraChat?
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature) => (
                            <div key={feature.title} className="text-center group">
                                <div className="inline-flex p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-lg mb-4">
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>
                                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                    {feature.title}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Live Activity Indicator */}
                <div className="text-center mt-12">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-2xl">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-sm font-medium">
                                Live Activity: {stats.liveUsers} users active now
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
