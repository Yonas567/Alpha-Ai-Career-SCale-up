"use client";

import { cn } from "@/lib/utils";

export type InterviewSetupStep = "resume" | "job-description" | "ai-interview";

interface StepInfo {
  id: InterviewSetupStep;
  label: string;
}

const steps: StepInfo[] = [
  { id: "resume", label: "RESUME" },
  { id: "job-description", label: "JOB DESCRIPTION" },
  { id: "ai-interview", label: "AI INTERVIEW" },
];

interface InterviewStepperProps {
  currentStep: InterviewSetupStep;
  onStepClick?: (step: InterviewSetupStep) => void;
}

export function InterviewStepper({
  currentStep,
  onStepClick,
}: InterviewStepperProps) {
  const currentIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="flex items-center gap-2">
      {steps.map((step, index) => {
        const isActive = step.id === currentStep;
        const isCompleted = index < currentIndex;
        const isClickable = isCompleted || isActive;

        return (
          <button
            key={step.id}
            onClick={() => isClickable && onStepClick?.(step.id)}
            disabled={!isClickable}
            className={cn(
              "px-4 py-2 rounded-md text-xs font-medium transition-all",
              isActive
                ? "bg-primary text-primary-foreground"
                : isCompleted
                ? "bg-muted text-muted-foreground hover:bg-muted/80"
                : "bg-muted/50 text-muted-foreground/50 cursor-not-allowed"
            )}
          >
            {step.label}
          </button>
        );
      })}
    </div>
  );
}
