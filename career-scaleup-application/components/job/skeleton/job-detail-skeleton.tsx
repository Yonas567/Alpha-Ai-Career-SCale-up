import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobDetailsSkeleton() {
  return (
    <div className="flex-1">
      <Card className="h-full rounded-lg border border-border max-h-screen overflow-y-scroll hide-scroll shadow-none">
        <div className="p-6 space-y-6">
          <div className="md:hidden mb-2">
            <Skeleton className="w-20 h-8 rounded-md" />
          </div>

          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-5 w-32" />
              </div>
              <Skeleton className="w-8 h-8 rounded-md" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <Skeleton className="w-4 h-4 rounded-full" />
                  <Skeleton className="w-20 h-4" />
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <Skeleton className="h-10 w-32 rounded-md" />
            </div>
          </div>

          <div className="md:hidden space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <Skeleton className="w-32 h-32 rounded-full" />
                <div className="absolute text-center">
                  <Skeleton className="h-6 w-10 mx-auto mb-1" />
                  <Skeleton className="h-3 w-16 mx-auto" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-10" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-md" />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Skeleton className="w-full h-10 rounded-md" />
              <Skeleton className="w-full h-10 rounded-md" />
            </div>
          </div>

          <div className="border-t border-border" />

          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <div className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <Skeleton key={j} className="h-3 w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
