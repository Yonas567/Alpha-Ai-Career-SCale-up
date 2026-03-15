import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="w-full py-4 overflow-x-auto mb-2 hide-scroll">
      <div className="flex items-center gap-2 px-2 sm:justify-center">
        {steps.map((step, index) => {
          const isComplete = currentStep > step.id;
          const isActive = currentStep === step.id;
          const isPending = currentStep < step.id;

          return (
            <div key={step.id} className="flex items-center flex-shrink-0">
              <div className="flex flex-col items-center w-10 sm:w-14">
                <div
                  className={cn(
                    "step-indicator",
                    "h-8 w-8 sm:h-10 sm:w-10 text-sm",
                    isComplete && "step-complete",
                    isActive && "step-active",
                    isPending && "step-pending"
                  )}
                >
                  {isComplete ? <Check className="w-4 h-4" /> : step.id}
                </div>

                <span
                  className={cn(
                    "mt-2 text-xs font-medium hidden sm:block",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 mx-1 sm:mx-2",
                    "w-6 sm:w-16",
                    isComplete ? "step-complete" : "step-pending"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
