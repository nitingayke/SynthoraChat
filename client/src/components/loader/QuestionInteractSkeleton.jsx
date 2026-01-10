export default function QuestionInteractSkeleton() {
  return (
    <div className="flex-1 space-y-4 rounded-lg border p-4 bg-white dark:bg-[#161616] border-gray-300 dark:border-[#2a2a2a] animate-pulse">

      {/* Title */}
      <div className="h-5 w-3/4 bg-gray-300 dark:bg-[#2a2a2a] rounded" />

      {/* Content lines */}
      <div className="space-y-2">
        <div className="h-3 w-full bg-gray-300 dark:bg-[#2a2a2a] rounded" />
        <div className="h-3 w-11/12 bg-gray-300 dark:bg-[#2a2a2a] rounded" />
        <div className="h-3 w-10/12 bg-gray-300 dark:bg-[#2a2a2a] rounded" />
      </div>

      {/* Media placeholder */}
      <div className="h-40 w-full bg-gray-300 dark:bg-[#2a2a2a] rounded-lg" />

      {/* Action buttons */}
      <div className="flex gap-3 mt-4">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="h-8 w-16 bg-gray-300 dark:bg-[#2a2a2a] rounded-lg"
          />
        ))}
      </div>

      {/* Answers */}
      <div className="mt-6 space-y-3">
        {[1, 2].map(i => (
          <div
            key={i}
            className="h-20 w-full bg-gray-300 dark:bg-[#2a2a2a] rounded-lg"
          />
        ))}
      </div>
    </div>
  );
}
