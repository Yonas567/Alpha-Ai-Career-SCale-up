import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobListSkeleton() {
  return (
    <div className="max-h-screen w-full md:w-96 border border-border rounded-lg overflow-hidden flex flex-col bg-card">
      <div className="p-4 border-b border-border bg-card flex justify-between items-center gap-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-8 w-32 rounded-md" />
      </div>

      <div className="divide-y divide-border overflow-y-scroll hide-scroll flex-1">
        {[...Array(6)].map((_, i) => (
          <Card
            key={i}
            className="w-full text-left p-4 rounded-none shadow-none border-0 border-b cursor-pointer"
          >
            <div className="space-y-3">
              <div>
                <Skeleton className="h-4 w-3/4 mb-1" />
                <Skeleton className="h-3 w-1/2" />
              </div>

              <div className="flex items-center gap-2 text-xs">
                <Skeleton className="w-3 h-3 rounded-full" />
                <Skeleton className="h-3 w-24" />
              </div>

              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-16 rounded-md" />
                <Skeleton className="h-3 w-12" />
              </div>

              <Skeleton className="h-3 w-20" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
