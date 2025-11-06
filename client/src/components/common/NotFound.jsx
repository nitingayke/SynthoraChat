export default function NotFound() {
  return (
    <div className="flex items-center justify-center text-center min-h-[80vh]">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-3">
        404
        <span className="w-[2px] h-6 sm:h-6 bg-gray-500 dark:bg-gray-400"></span>
        Not Found
      </h1>
    </div>
  );
}
