"use client";

import { Mic } from "lucide-react";

interface TranscriptDisplayProps {
  transcript: string;
  isRecording?: boolean;
}

export function TranscriptDisplay({
  transcript,
  isRecording = false,
}: TranscriptDisplayProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border">
        {/* Recording indicator */}
        <div className="flex items-center gap-2 shrink-0">
          {isRecording ? (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="w-1 h-3 bg-primary/60 rounded-full animate-pulse" />
              <span className="w-1 h-4 bg-primary/80 rounded-full animate-pulse delay-75" />
              <span className="w-1 h-2 bg-primary/60 rounded-full animate-pulse delay-150" />
            </span>
          ) : (
            <span className="text-muted-foreground">
              ······
            </span>
          )}
        </div>

        {/* Transcript Text */}
        <p className="text-foreground font-medium flex-1">
          {transcript || (
            <span className="text-muted-foreground italic">
              {isRecording ? "Listening..." : "Your answer will appear here..."}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
