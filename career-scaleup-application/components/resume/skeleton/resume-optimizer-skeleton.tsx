import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function ResumeOptimizationSkeleton() {
  return (
    <Card className="flex flex-col bg-muted border-0 shadow-none h-[80vh]  rounded-none py-0!">
      <div className="bg-card border-b px-4 py-4 sm:px-6 sm:py-5 rounded-md flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600/10">
          <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">
            Optimizing Your Resume
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            Our AI is enhancing your resume to align with the job requirements.
          </p>
        </div>
      </div>

      <ScrollArea className="flex-1 overflow-y-scroll hide-scroll">
        <div className="space-y-6  animate-in fade-in">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-card border border-border/50 rounded-xl py-4 sm:p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <Skeleton className="h-5 w-32 bg-muted-foreground/20" />
                <Skeleton className="h-5 w-16 rounded-full bg-green-400/20" />
              </div>

              <Skeleton className="h-3 w-3/4 bg-muted-foreground/20 mb-4" />

              <div className="rounded-lg bg-blue-500/5 border border-blue-500/10 p-3 sm:p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Skeleton className="h-4 w-28 bg-blue-500/20" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-5/6 bg-muted-foreground/10" />
                  <Skeleton className="h-3 w-4/6 bg-muted-foreground/10" />
                </div>
              </div>

              <div className="rounded-lg bg-purple-500/5 border border-purple-500/10 p-3 sm:p-4 mb-4">
                <Skeleton className="h-4 w-32 bg-purple-500/20 mb-3" />
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((k) => (
                    <Skeleton
                      key={k}
                      className="h-5 w-14 rounded-md bg-purple-500/10"
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-green-500/5 border border-green-500/10 p-3 sm:p-4">
                <Skeleton className="h-4 w-28 bg-green-500/20 mb-3" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-5/6 bg-muted-foreground/10" />
                  <Skeleton className="h-3 w-4/6 bg-muted-foreground/10" />
                  <Skeleton className="h-3 w-3/6 bg-muted-foreground/10" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
