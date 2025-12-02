import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { activityData } from "../../../../data/activityData";
import CustomTooltip from './CustomToolTip';



export default function WeeklyActivity() {
  return( 
    <AreaChart data={activityData.weeklyActivity}>
      <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
      <XAxis
        dataKey="day"
        stroke="#6B7280"
        fontSize={12}
      />
      <YAxis
        stroke="#6B7280"
        fontSize={12}
      />
      <Tooltip content={<CustomTooltip />} />
      <Area
        type="monotone"
        dataKey="questions"
        stackId="1"
        stroke="#3B82F6"
        fill="#3B82F6"
        fillOpacity={0.6}
        name="Questions"
      />
      <Area
        type="monotone"
        dataKey="answers"
        stackId="1"
        stroke="#10B981"
        fill="#10B981"
        fillOpacity={0.6}
        name="Answers"
      />
      <Area
        type="monotone"
        dataKey="upvotes"
        stackId="1"
        stroke="#F59E0B"
        fill="#F59E0B"
        fillOpacity={0.6}
        name="Upvotes"
      />
    </AreaChart>
  )
    
}
