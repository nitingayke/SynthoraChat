export default function LoaderComponent() {
    return (
        <div className="w-fit flex items-center justify-center gap-2">
            <button className="w-7 h-7 border-y-3 rounded-full animate-spin"></button>
            <span>Loading...</span>
        </div>
    )
}