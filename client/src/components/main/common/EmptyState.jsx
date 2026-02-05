export default function EmptyState({ title, description }) {
    return (
        <div className="flex flex-col items-center justify-center text-center py-12">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {title}
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                {description}
            </p>
        </div>
    );
}
