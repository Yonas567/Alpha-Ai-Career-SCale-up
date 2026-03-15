export default function JobSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-6 animate-pulse space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-gray-200" />
        <div className="h-4 w-32 bg-gray-200 rounded" />
      </div>
      <div className="h-5 w-48 bg-gray-200 rounded" />
      <div className="flex gap-2 mt-2">
        <div className="h-6 w-20 bg-gray-200 rounded" />
        <div className="h-6 w-20 bg-gray-200 rounded" />
        <div className="h-6 w-20 bg-gray-200 rounded" />
      </div>
      <div className="h-12 w-full bg-gray-200 rounded mt-3" />
      <div className="h-9 w-24 bg-gray-200 rounded mt-4" />
    </div>
  );
}
