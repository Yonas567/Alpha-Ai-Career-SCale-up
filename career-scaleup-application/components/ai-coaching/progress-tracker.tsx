"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressTrackerProps {
  completedDays: number;
  totalDays?: number;
}

export function ProgressTracker({
  completedDays,
  totalDays = 7,
}: ProgressTrackerProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold">Progress</h4>
        <span className="text-sm text-muted-foreground">
          {completedDays}/{totalDays} days
        </span>
      </div>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => (
          <div
            key={day}
            className={cn(
              "flex-1 h-2 rounded-full transition-all",
              day <= completedDays
                ? "bg-gradient-to-r from-primary to-primary/80"
                : "bg-primary/10"
            )}
          />
        ))}
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => (
          <div
            key={day}
            className={cn(
              "flex items-center gap-1",
              day <= completedDays ? "text-primary" : ""
            )}
          >
            {day <= completedDays ? (
              <CheckCircle2 className="h-3 w-3" />
            ) : (
              <Circle className="h-3 w-3" />
            )}
            <span>Day {day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


