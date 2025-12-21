import React from "react";
import PropTypes from "prop-types";
import { Users, Calendar, TrendingUp, Activity } from "lucide-react";

export function UserFollowStats({ stats }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <Stat 
                label="Total Followers" 
                value={stats?.total} 
                icon={<Users className="w-5 h-5 text-blue-500" />} 
            />
            <Stat 
                label="This Month" 
                value={stats?.monthly} 
                icon={<Calendar className="w-5 h-5 text-green-500" />} 
            />
            <Stat 
                label="Growth" 
                value={`+${stats?.growth}`} 
                icon={<TrendingUp className="w-5 h-5 text-orange-500" />} 
            />
            <Stat 
                label="Active Rate" 
                value={`${stats?.activeRate}%`} 
                icon={<Activity className="w-5 h-5 text-purple-500" />} 
            />
        </div>
    );
}

function Stat({ label, value, icon }) {
    return (
        <div className="p-4 rounded-lg bg-white dark:bg-[#191919] border border-gray-200 dark:border-[#2a2a2a] flex items-start gap-3">
            <div className="p-2 rounded-lg bg-gray-100 dark:bg-[#2a2a2a]">
                {icon}
            </div>
            <div className="flex-1">
                <p className="text-xs text-gray-500">{label}</p>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {value}
                </h3>
            </div>
        </div>
    );
}

UserFollowStats.propTypes = {
    stats: PropTypes.shape({
        total: PropTypes.number.isRequired,
        monthly: PropTypes.number.isRequired,
        growth: PropTypes.number.isRequired,
        activeRate: PropTypes.number.isRequired,
    }).isRequired,
};

Stat.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    icon: PropTypes.node.isRequired,
};