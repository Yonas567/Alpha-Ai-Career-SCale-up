import { Skeleton } from "@/components/ui/skeleton"; 

export default function ProfileSkeleton() {
  return (
    <div className="w-full h-full space-y-4">
      <div className="relative overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-900">
        <div className="px-5 py-4 sm:px-6 sm:py-5">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
            <Skeleton className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl" />

            <div className="flex-1 space-y-3">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-28 mt-3" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8 pt-8 border-t border-white/20 dark:border-slate-700">
            {Array(3)
              .fill(0)
              .map((_, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-white dark:bg-slate-800/50 border border-blue-100 dark:border-slate-700"
                >
                  <div className="flex items-start gap-3">
                    <Skeleton className="w-5 h-5 rounded" />
                    <div className="space-y-2 w-full">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6 overflow-y-scroll hide-scroll">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-border/40 p-6 bg-card/40 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
        </div>

        <div className="rounded-xl border border-border/40 p-6 bg-card/40 backdrop-blur-sm sticky top-24">
          <div className="flex items-center justify-between mb-5">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-16" />
          </div>
          <div className="flex flex-wrap gap-2">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-6 w-20 rounded-full" />
              ))}
          </div>
          <Skeleton className="h-3 w-32 mt-4" />
        </div>
      </div>
    </div>
  );
}
