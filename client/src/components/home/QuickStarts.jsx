// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Users, MessageCircle, Brain, Zap, TrendingUp } from "lucide-react";
import { useContext, useMemo } from "react";
import AnalyticsContext from "../../context/AnalyticsContext";

export default function QuickStats() {
  const { loading, analytics } = useContext(AnalyticsContext);

  const stats = useMemo(() => {
    if (!analytics) return [];

    return [
      {
        icon: Users,
        value: analytics.users?.total ?? 0,
        label: "Total Users",
      },
      {
        icon: MessageCircle,
        value: analytics.content?.questions?.total ?? 0,
        label: "Questions Asked",
      },
      {
        icon: Brain,
        value: analytics.ai?.totalSessions ?? 0,
        label: "AI Sessions",
      },
      {
        icon: Zap,
        value:
          analytics.ai?.dailyUsage?.length > 0
            ? Math.round(
                analytics.ai.dailyUsage.reduce(
                  (acc, d) => acc + d.messages,
                  0
                ) / analytics.ai.dailyUsage.length
              )
            : 0,
        label: "Avg AI Messages / Day",
      },
    ];
  }, [analytics]);

  if (loading) {
    return (
      <section className="w-full max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-24 rounded-xl bg-gray-200 dark:bg-[#1a1a1a] animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-gray-100 dark:bg-[#0f0f0f] border-b border-gray-200 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl bg-white dark:bg-[#161616] border border-gray-200 dark:border-white/10 p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="p-2 rounded-lg bg-orange-100 text-orange-500 dark:bg-[#07C5B9]/10 dark:text-[#07C5B9]"
                >
                  <stat.icon className="w-5 h-5" />
                </div>

                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {stat.value.toLocaleString()}
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
