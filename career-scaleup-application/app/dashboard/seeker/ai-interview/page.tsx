"use client";

import { useState } from "react";
import { InterviewEmptyState, InterviewSetup } from "@/components/ai-interview";

type PageView = "empty" | "setup";

export default function AIInterviewPage() {
  const [currentView, setCurrentView] = useState<PageView>("empty");

  const handleStartInterview = () => {
    setCurrentView("setup");
  };

  const handleLearnMore = () => {
    // TODO: Open learn more modal or navigate
    console.log("Learn more clicked");
  };

  const handleBack = () => {
    setCurrentView("empty");
  };

  // Render based on current view
  if (currentView === "empty") {
    return (
      <InterviewEmptyState
        onStartInterview={handleStartInterview}
        onLearnMore={handleLearnMore}
      />
    );
  }

  if (currentView === "setup") {
    return <InterviewSetup onBack={handleBack} onCancel={handleBack} />;
  }

  return null;
}
