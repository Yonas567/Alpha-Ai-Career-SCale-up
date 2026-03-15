import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { IconLoader } from "@tabler/icons-react";

export default function ResumeAnalysisSkeleton() {
  return (
    <Card className="flex flex-col bg-muted border-0 shadow-none h-[80vh] rounded-none gap-3 animate-in fade-in px-0">
      <div className="px-4 py-4 sm:px-6 sm:py-5 bg-card rounded-md text-primary-foreground shadow-md flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600/10">
          <IconLoader className="w-5 h-5 text-blue-600 animate-spin" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">
            Analyzing Your Resume
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            Please wait a moment while we compare your resume with the job
            details.
          </p>
        </div>
      </div>

      <div className="mt-2 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 bg-muted-foreground/20" />
            <Skeleton className="h-3 w-40 bg-muted-foreground/20" />
          </div>
          <div className="text-right space-y-2">
            <Skeleton className="h-6 w-10 bg-muted-foreground/20" />
            <Skeleton className="h-3 w-16 bg-muted-foreground/20" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              className="h-12 rounded bg-muted-foreground/10 border border-border"
            />
          ))}
        </div>
      </div>

      <ScrollArea className="flex-1 overflow-y-scroll hide-scroll pt-2 space-y-3">
        {[...Array(5)].map((_, idx) => (
          <Card
            key={idx}
            className="bg-card overflow-hidden rounded-lg border border-border p-4"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-32 bg-muted-foreground/20" />
              <Skeleton className="h-4 w-10 bg-muted-foreground/20" />
            </div>
            <div className="mt-3 space-y-2">
              <Skeleton className="h-3 w-3/4 bg-muted-foreground/10" />
              <Skeleton className="h-3 w-2/3 bg-muted-foreground/10" />
              <Skeleton className="h-3 w-1/2 bg-muted-foreground/10" />
            </div>
          </Card>
        ))}
      </ScrollArea>
    </Card>
  );
}
