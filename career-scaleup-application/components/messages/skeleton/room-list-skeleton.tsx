import { Skeleton } from "@/components/ui/skeleton";

export default function RoomListSkeleton() {
  return (
    <div className="w-80 border-r bg-background flex-col md:flex hidden">
      <div className="border-b px-6 py-4">
        <Skeleton className="h-6 w-32" />
      </div>

      <div className="px-4 py-4">
        <div className="relative">
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3 border-b">
            <Skeleton className="h-12 w-12 rounded-full" />

            <div className="flex-1 min-w-0 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
