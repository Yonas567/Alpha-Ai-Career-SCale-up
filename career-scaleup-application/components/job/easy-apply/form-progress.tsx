import { CheckCircle2 } from "lucide-react";
import { EasyApplyStep } from "./easy-apply-modal";

interface FormProgressProps {
  currentStep: number;
  steps: EasyApplyStep[];
}

export default function FormProgress({
  currentStep,
  steps,
}: FormProgressProps) {
  return (
    <div className="flex justify-evenly items-center w-full">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className="flex-1 flex justify-center items-center min-w-0"
        >
          <div className="flex items-center min-w-0">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold text-sm shrink-0 transition-colors ${
                index < currentStep
                  ? "bg-blue-500 text-primary-foreground"
                  : index === currentStep
                  ? "bg-primary/20 text-primary border-2 border-blue-500"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {index < currentStep ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                index + 1
              )}
            </div>
            <p
              className={`ml-3 text-sm font-medium truncate ${
                index <= currentStep
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {step.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
