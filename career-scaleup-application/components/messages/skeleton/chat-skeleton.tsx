import { Skeleton } from "@/components/ui/skeleton";

export default function ChatSkeleton() {
  return (
    <>
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 hide-scroll">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className={`flex ${
              idx % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-xs rounded-2xl px-4 py-2 ${
                idx % 2 === 0 ? "bg-white border border-border" : "bg-blue-500"
              }`}
            >
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        ))}

        <div />
      </div>

      <div className="border-t px-4 py-4 bg-card">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 flex-1 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </>
  );
}
