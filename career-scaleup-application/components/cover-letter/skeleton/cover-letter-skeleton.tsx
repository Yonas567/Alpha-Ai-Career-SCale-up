export default function CoverLetterSkeleton() {
  return (
    <div className="relative rounded-lg shadow p-10 text-gray-900 border animate-pulse h-full">
      <div className="space-y-2 mb-6">
        <div className="h-6 bg-gray-300 rounded w-1/3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>

      <div className="space-y-1 text-sm mb-6">
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      </div>

      <div className="h-4 bg-gray-300 rounded w-1/4 mb-6"></div>

      <div className="space-y-1 mb-6">
        <div className="h-5 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        <div className="h-4 bg-gray-300 rounded w-2/5"></div>
      </div>

      <div className="space-y-2">
        <div className="h-3 bg-gray-300 rounded w-full"></div>
        <div className="h-3 bg-gray-300 rounded w-full"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6"></div>
        <div className="h-3 bg-gray-300 rounded w-3/4"></div>
      </div>

      <div className="mt-10 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/6"></div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white/70">
        <span className="text-indigo-600 font-bold text-lg animate-pulse">
          Generating your cover letter...
        </span>
      </div>
    </div>
  );
}
