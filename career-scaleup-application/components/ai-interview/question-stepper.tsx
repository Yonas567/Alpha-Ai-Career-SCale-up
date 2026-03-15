"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface QuestionStepperProps {
  jobTitle: string;
  totalQuestions: number;
  currentQuestion: number;
  onQuestionClick: (questionIndex: number) => void;
  onReviewClick: () => void;
  answeredQuestions?: number[];
}

export function QuestionStepper({
  jobTitle,
  totalQuestions,
  currentQuestion,
  onQuestionClick,
  onReviewClick,
  answeredQuestions = [],
}: QuestionStepperProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Job Title Badge */}
      <div className="px-4 py-2 bg-muted rounded-md text-sm font-medium text-foreground">
        {jobTitle.toUpperCase()} AI INTERVIEW
      </div>

      {/* Question Numbers */}
      {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((num) => {
        const isActive = currentQuestion === num;
        const isAnswered = answeredQuestions.includes(num);

        return (
          <button
            key={num}
            onClick={() => onQuestionClick(num)}
            className={cn(
              "w-10 h-10 rounded-md text-sm font-medium transition-all flex items-center justify-center",
              isActive
                ? "bg-primary text-primary-foreground"
                : isAnswered
                ? "bg-primary/20 text-primary hover:bg-primary/30"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            Q{num}
          </button>
        );
      })}

      {/* Review Button */}
      <button
        onClick={onReviewClick}
        className="px-4 py-2 rounded-md text-sm font-medium bg-muted text-muted-foreground hover:bg-muted/80 transition-all"
      >
        Review
      </button>
    </div>
  );
}
