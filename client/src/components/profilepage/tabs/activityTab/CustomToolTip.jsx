export default function CustomTooltip ({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg">
        <p className="font-semibold text-gray-900 dark:text-white">{label}</p>
        {payload.map((entry, index) => (
          <p key={0.5 * index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};