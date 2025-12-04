import React from "react";
import { activityData } from "../../../../data/activityData";
import { Star } from "lucide-react";

export default function EngagementMetrics() {
  return (

    <div className="bg-white dark:bg-[#161616] rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Star className="w-6 h-6 text-blue-500 dark:text-[#07C5B9]" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Engagement Metrics</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Avg. Response Time</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Time to answer questions</p>
          </div>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {activityData.engagementMetrics.avgResponseTime}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-500/10 rounded-lg">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Answer Accuracy</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Correct solutions rate</p>
          </div>
          <span className="text-2xl font-bold text-green-600 dark:text-green-400">
            {activityData.engagementMetrics.answerAccuracy}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-500/10 rounded-lg">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Helpful Rate</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Helpful answers ratio</p>
          </div>
          <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {activityData.engagementMetrics.helpfulRate}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-500/10 rounded-lg">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Community Rank</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Among all users</p>
          </div>
          <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {activityData.engagementMetrics.communityRank}
          </span>
        </div>
      </div>
    </div>
  );
}
