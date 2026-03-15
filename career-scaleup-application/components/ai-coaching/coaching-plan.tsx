"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, Circle, Calendar, BookOpen, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface DayPlan {
  day: number;
  title: string;
  actions: string[];
  resources: string[];
  completed: boolean;
}

interface CoachingPlanProps {
  plan: DayPlan[];
}

export function CoachingPlan({ plan }: CoachingPlanProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="text-center p-6 pb-4 flex-shrink-0">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Target className="h-6 w-6 text-primary" />
          <h3 className="text-2xl font-bold">7-Day Improvement Plan</h3>
        </div>
        <p className="text-muted-foreground">
          Follow this structured plan to improve your skills
        </p>
      </div>

      <Card className="flex-1 px-6 pb-6 h-[610px]">
        <div className="grid gap-4  overflow-y-auto ">
          {plan.map((day, index) => (
            <Card
              key={day.day}
              className={cn(
                "p-5 border transition-all",
                day.completed
                  ? "bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20"
                  : "bg-card border-primary/10 hover:border-primary/20"
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg",
                    day.completed
                      ? "bg-green-500 text-white"
                      : "bg-primary/10 text-primary"
                  )}
                >
                  {day.completed ? (
                    <CheckCircle2 className="h-6 w-6" />
                  ) : (
                    <span>{day.day}</span>
                  )}
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{day.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Day {day.day}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold">
                        Action Steps:
                      </span>
                    </div>
                    <ul className="space-y-1.5 ml-6">
                      {day.actions.map((action, idx) => (
                        <li
                          key={idx}
                          className="text-sm flex items-start gap-2"
                        >
                          <span className="text-primary mt-1">•</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {day.resources.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span className="text-sm font-semibold">
                          Resources:
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 ml-6">
                        {day.resources.map((resource, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs cursor-pointer hover:bg-primary/10"
                          >
                            {resource}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
