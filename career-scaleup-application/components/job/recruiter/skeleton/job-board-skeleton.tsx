import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Plus } from "lucide-react";

export default function JobBoardSkeleton() {
  return (
    <div className="w-full h-full rounded-md">
      <div className="flex flex-col w-full h-full rounded-md py-4">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4 w-full">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search Job" className="pl-10 bg-white" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              className="gap-2 bg-blue-500 hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4 transition-colors" />
              Create Job
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-scroll hide-scroll h-full pb-4">
          {[...Array(6)].map((_, i) => (
            <Card
              key={i}
              className="p-5 bg-card shadow-sm h-fit space-y-4 animate-pulse"
            >
              <div className="flex items-start justify-between">
                <Skeleton className="w-16 h-5 rounded-full" />
                <Skeleton className="w-6 h-6 rounded-md" />
              </div>

              <div>
                <Skeleton className="w-3/4 h-5 mb-2" />
                <div className="flex items-center gap-3">
                  <Skeleton className="w-14 h-4" />
                  <Skeleton className="w-14 h-4" />
                  <Skeleton className="w-14 h-4" />
                </div>
              </div>

              <div className="bg-accent rounded-lg p-3 grid grid-cols-2 gap-3 h-32">
                <div>
                  <Skeleton className="w-10 h-7 mb-1" />
                  <Skeleton className="w-16 h-4" />
                </div>
                <div>
                  <Skeleton className="w-10 h-7 mb-1" />
                  <Skeleton className="w-16 h-4" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
