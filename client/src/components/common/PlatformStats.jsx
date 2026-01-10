// eslint-disable-next-line no-unused-vars
import {
  Users,
  Brain,
  TrendingUp,
  Clock,
  Rocket,
  Sparkles,
  Target,
  Award
} from "lucide-react";
import { useContext, useMemo } from "react";
import AnalyticsContext from "../../context/AnalyticsContext";

export default function PlatformStats() {
  const { analytics, loading } = useContext(AnalyticsContext);

  /* ----------------------------------
     DERIVED REAL STATS (SAFE)
  ---------------------------------- */
  const stats = useMemo(() => {
    if (!analytics) return null;

    return {
      totalUsers: analytics.users?.total || 0,
      activeUsers: analytics.users?.activeLastNDays || 0,
      totalQuestions: analytics.content?.questions?.total || 0,
      totalAnswers: analytics.content?.answers?.total || 0,
      aiSessions: analytics.ai?.totalSessions || 0,
    };
  }, [analytics]);

  if (loading || !stats) {
    return (
      <section className="py-16 text-center text-gray-500">
        Loading platform statistics...
      </section>
    );
  }

  /* ----------------------------------
     REAL METRICS
  ---------------------------------- */
  const metrics = [
    {
      icon: Users,
      value: stats.activeUsers.toLocaleString(),
      label: "Active Users",
      suffix: "last 30 days",
      color: "text-green-500",
      bg: "bg-green-500/10"
    },
    {
      icon: Target,
      value: stats.totalUsers.toLocaleString(),
      label: "Total Users",
      suffix: "registered",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      icon: Award,
      value: stats.totalAnswers.toLocaleString(),
      label: "Answers Shared",
      suffix: "solutions",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10"
    },
    {
      icon: Sparkles,
      value: stats.aiSessions.toLocaleString(),
      label: "AI Sessions",
      suffix: "interactions",
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    }
  ];

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
      description: "Knowledge ecosystem expanding every day"
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Ask questions anytime, anywhere"
    }
  ];

  return (
    <section className="py-10 sm:py-20 bg-gray-200 dark:bg-[#0B0F19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/70 dark:bg-white/5 backdrop-blur rounded-xl border border-gray-200 dark:border-white/10 mb-6">
            <Sparkles className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Platform Insights
            </span>
          </div>

          <h2 className="text-2xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            Our Growing{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Knowledge Ecosystem
            </span>
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Real people and AI working together to build a trusted Q&A platform.
          </p>
        </div>

        {/* Metrics Card */}
        <div className="rounded-xl p-4 sm:p-8 mb-10 bg-white/80 dark:bg-white/5 backdrop-blur border border-gray-200 dark:border-white/10 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-10">
            Platform Statistics
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((m) => (
              <div key={m.label} className="text-center">
                <div className={`inline-flex p-4 ${m.bg} rounded-xl mb-4`}>
                  <m.icon className={`w-6 h-6 ${m.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {m.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {m.label}
                </div>
                <div className="text-xs text-gray-500">
                  {m.suffix}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Section */}
        <div className="rounded-xl p-10 bg-gradient-to-br from-white/70 to-white/40 dark:from-white/5 dark:to-white/0 backdrop-blur border border-gray-200 dark:border-white/10">
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose SynthoraChat?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((f) => (
              <div key={f.title} className="text-center">
                <div className="inline-flex p-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg mb-5">
                  <f.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {f.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Live Status */}
        <div className="text-center mt-14">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-500/10 text-green-600 dark:text-green-400 rounded-xl border border-green-500/20">
            <span className="flex items-center gap-2 text-sm font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Live activity coming soon
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
