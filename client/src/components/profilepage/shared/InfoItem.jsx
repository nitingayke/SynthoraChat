import React from "react";
// eslint-disable-next-line no-unused-vars
export default function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-[#1a1a1a]">
      <Icon className="w-5 h-5 text-blue-500 dark:text-[#07C5B9]" />
      <div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
        <div className="font-medium text-gray-900 dark:text-white">{value}</div>
      </div>
    </div>
  ) 
}
