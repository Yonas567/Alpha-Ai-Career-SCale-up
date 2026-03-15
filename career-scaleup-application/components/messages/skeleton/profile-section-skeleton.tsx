import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSectionSkeleton() {
  return (
    <div className="hidden lg:flex w-72 flex-col border-l border-border bg-card">
      <div className="border-b px-6 py-6 flex flex-col items-center gap-4">
        <Skeleton className="h-24 w-24 rounded-full" />

        <div className="text-center space-y-2">
          <Skeleton className="h-4 w-32 mx-auto" />
          <Skeleton className="h-3 w-20 mx-auto" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <Skeleton className="h-3 w-16 mb-3" />

        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-4/6" />
        </div>
      </div>
    </div>
  );
}
