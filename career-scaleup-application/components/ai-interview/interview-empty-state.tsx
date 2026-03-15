"use client";

import { Button } from "@/components/ui/button";
import { AudioLines } from "lucide-react";

interface InterviewEmptyStateProps {
  onStartInterview: () => void;
  onLearnMore?: () => void;
}

export function InterviewEmptyState({
  onStartInterview,
  onLearnMore,
}: InterviewEmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h1 className="text-xl font-semibold text-foreground">AI Interview</h1>
        <Button onClick={onStartInterview}>START AI INTERVIEW</Button>
      </div>

      {/* Content - Centered */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center text-center max-w-lg px-6">
          {/* Icon */}
          <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mb-6">
            <AudioLines className="w-12 h-12 text-muted-foreground/50" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Get started with AI interview
          </h2>

          {/* Description */}
          <p className="text-muted-foreground mb-8">
            AI Interview is a tool for practicing job interview questions using AI technology. It helps you refine your answers and gain confidence for real interviews.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onLearnMore}>
              LEARN MORE
            </Button>
            <Button onClick={onStartInterview}>START AI INTERVIEW</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
