"use client";

import { useState } from "react";
import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InterviewStepper, InterviewSetupStep } from "./interview-stepper";
import { ResumeStep } from "./resume-step";
import { JobDescriptionStep } from "./job-description-step";
import { InterviewSetupFooter } from "./interview-setup-footer";
import { InterviewStep } from "./interview-step";

// Mock data - will come from API
const mockResumes = [
  { id: "1", name: "Resume_MinYoungYou" },
  { id: "2", name: "Resume_Software_Engineer" },
  { id: "3", name: "Resume_Frontend_Dev" },
];

interface InterviewSetupProps {
  onBack?: () => void;
  onCancel?: () => void;
}

export function InterviewSetup({ onBack, onCancel }: InterviewSetupProps) {
  const [currentStep, setCurrentStep] = useState<InterviewSetupStep>("resume");
  const [selectedResumeId, setSelectedResumeId] = useState<string>();
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [interviewAnswers, setInterviewAnswers] = useState<Record<number, string>>({});

  const handleStepClick = (step: InterviewSetupStep) => {
    setCurrentStep(step);
  };

  const handleResumeSelect = (resumeId: string) => {
    setSelectedResumeId(resumeId);
  };

  const handleGenerate = async () => {
    if (!jobTitle) return;
    setIsGenerating(true);
    // TODO: Call AI to generate job description
    setTimeout(() => {
      setJobDescription(`We are looking for a skilled ${jobTitle} to join our team...`);
      setIsGenerating(false);
    }, 1500);
  };

  const handleCancel = () => {
    onCancel?.();
  };

  const handleBack = () => {
    if (currentStep === "job-description") {
      setCurrentStep("resume");
    } else if (currentStep === "ai-interview") {
      setCurrentStep("job-description");
    } else {
      onBack?.();
    }
  };

  const handleContinue = () => {
    if (currentStep === "resume") {
      setCurrentStep("job-description");
    } else if (currentStep === "job-description") {
      setCurrentStep("ai-interview");
    } else {
      // Start the interview
      console.log("Starting interview...");
    }
  };

  const handleInterviewComplete = (answers: Record<number, string>) => {
    setInterviewAnswers(answers);
    console.log("Interview completed with answers:", answers);
    // TODO: Navigate to review/results page
  };

  const isContinueDisabled = () => {
    if (currentStep === "resume") return !selectedResumeId;
    if (currentStep === "job-description") return !jobTitle || !jobDescription;
    return false;
  };

  // If we're in the AI interview step, render the full interview UI
  if (currentStep === "ai-interview") {
    return (
      <InterviewStep
        jobTitle={jobTitle || "Sr. Account Manager"}
        onComplete={handleInterviewComplete}
      />
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case "resume":
        return (
          <ResumeStep
            resumes={mockResumes}
            selectedResumeId={selectedResumeId}
            onResumeSelect={handleResumeSelect}
          />
        );
      case "job-description":
        return (
          <JobDescriptionStep
            jobTitle={jobTitle}
            jobDescription={jobDescription}
            onJobTitleChange={setJobTitle}
            onJobDescriptionChange={setJobDescription}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header with stepper and audio icon */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <InterviewStepper
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />
        <Button variant="ghost" size="icon">
          <Volume2 className="w-5 h-5" />
        </Button>
      </div>

      {/* Step Content */}
      <div className="flex-1 p-6 overflow-auto">
        {renderStepContent()}
      </div>

      {/* Footer with navigation */}
      <InterviewSetupFooter
        onCancel={handleCancel}
        onBack={handleBack}
        onContinue={handleContinue}
        showBack={currentStep !== "resume"}
        continueDisabled={isContinueDisabled()}
        continueLabel={currentStep === "job-description" ? "START INTERVIEW" : "CONTINUE"}
      />
    </div>
  );
}
