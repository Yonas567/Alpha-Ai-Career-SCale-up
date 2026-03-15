import { Skeleton } from "@/components/ui/skeleton";

export default function ChatHeaderSkeleton() {
  return (
    <div className="border-b px-4 py-4 flex items-center justify-between bg-card">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />

        <Skeleton className="h-4 w-32 rounded-md" />
      </div>

      <Skeleton className="h-5 w-5 rounded-full" />
    </div>
  );
}
