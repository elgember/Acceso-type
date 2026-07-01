export const UserTableSkeleton = () => {
    return (
    <div className="w-full min-h-screen dark:bg-[#333] p-6">
        <div className="h-8 w-48 mb-6 animate-pulse"></div>
        <div className="max-w-5xl mx-auto">
            <div className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 rounded-lg">
                {Array(10).fill(0).map((_, index) => (
                    <div key={index} className="flex border-b border-gray-200 dark:border-gray-800 py-4 animate-pulse">
                        <div className="h-5 w-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    )
}