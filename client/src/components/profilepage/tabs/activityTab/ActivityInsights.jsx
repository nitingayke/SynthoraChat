import { Target, Zap } from "lucide-react";
import React from "react";

export default function ActivityInsights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6" />
          <h3 className="text-lg font-semibold">Activity Insights</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Most Active Day</span>
            <span className="font-semibold">Thursday</span>
          </div>
          <div className="flex justify-between">
            <span>Peak Hours</span>
            <span className="font-semibold">2 PM - 5 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Avg. Daily Activity</span>
            <span className="font-semibold">4.2 hours</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-6 h-6" />
          <h3 className="text-lg font-semibold">This Month's Goals</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Answer 50+ Questions</span>
            <span className="font-semibold">78%</span>
          </div>
          <div className="flex justify-between">
            <span>Gain 30 Followers</span>
            <span className="font-semibold">80%</span>
          </div>
          <div className="flex justify-between">
            <span>Maintain 15-day Streak</span>
            <span className="font-semibold">93%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
