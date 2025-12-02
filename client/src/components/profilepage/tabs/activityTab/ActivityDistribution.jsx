import React from "react";
import {
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { activityData } from "../../../../data/activityData";
import CustomTooltip from "./CustomToolTip";

export default function ActivityDistribution() {
  return (

    <PieChart>
      <Pie
        data={activityData.activityDistribution}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {activityData.activityDistribution.map((entry, index) => (
          <Cell key={0.5 * index} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
      <Legend />
    </PieChart>
  );
}
