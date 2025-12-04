import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { activityData } from "../../../../data/activityData";
import CustomTooltip from "./CustomToolTip";

export default function MonthlyTrend() {
  return (
    <LineChart data={activityData.monthlyTrend}>
      <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
      <XAxis
        dataKey="month"
        stroke="#6B7280"
        fontSize={12}
      />
      <YAxis
        stroke="#6B7280"
        fontSize={12}
      />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Line
        type="monotone"
        dataKey="questions"
        stroke="#3B82F6"
        strokeWidth={3}
        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
        name="Questions"
      />
      <Line
        type="monotone"
        dataKey="answers"
        stroke="#10B981"
        strokeWidth={3}
        dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
        name="Answers"
      />
      <Line
        type="monotone"
        dataKey="upvotes"
        stroke="#F59E0B"
        strokeWidth={3}
        dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
        name="Upvotes"
      />
    </LineChart>
  );
}
