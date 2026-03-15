"use client";

import { Button } from "@/components/ui/button";

interface InterviewSetupFooterProps {
  onCancel: () => void;
  onBack?: () => void;
  onContinue: () => void;
  showBack?: boolean;
  continueDisabled?: boolean;
  continueLabel?: string;
}

export function InterviewSetupFooter({
  onCancel,
  onBack,
  onContinue,
  showBack = true,
  continueDisabled = false,
  continueLabel = "CONTINUE",
}: InterviewSetupFooterProps) {
  return (
    <div className="flex items-center justify-between p-6 border-t border-border">
      {/* Left side - Cancel */}
      <Button variant="ghost" onClick={onCancel} className="text-muted-foreground">
        CANCEL
      </Button>

      {/* Right side - Back & Continue */}
      <div className="flex items-center gap-3">
        {showBack && (
          <Button variant="ghost" onClick={onBack}>
            BACK
          </Button>
        )}
        <Button onClick={onContinue} disabled={continueDisabled}>
          {continueLabel}
        </Button>
      </div>
    </div>
  );
}
