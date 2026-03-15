"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface JobDescriptionStepProps {
  jobTitle?: string;
  jobDescription?: string;
  onJobTitleChange: (title: string) => void;
  onJobDescriptionChange: (description: string) => void;
  onGenerate?: () => void;
  isGenerating?: boolean;
}

export function JobDescriptionStep({
  jobTitle = "",
  jobDescription = "",
  onJobTitleChange,
  onJobDescriptionChange,
  onGenerate,
  isGenerating = false,
}: JobDescriptionStepProps) {
  return (
    <div className="max-w-4xl">
      {/* Title */}
      <h1 className="text-3xl font-bold text-foreground mb-8">
        Add a job description
      </h1>

      {/* Job Title Field */}
      <div className="mb-6">
        <Label htmlFor="job-title" className="text-sm text-muted-foreground mb-2 block">
          WHAT <span className="font-semibold text-foreground">JOB TITLE</span> WILL YOU INTERVIEW FOR?*
        </Label>
        <Input
          id="job-title"
          value={jobTitle}
          onChange={(e) => onJobTitleChange(e.target.value)}
          placeholder="Software Engineer"
          className="w-full"
        />
      </div>

      {/* Job Description Field */}
      <div className="mb-4">
        <Label htmlFor="job-description" className="text-sm text-muted-foreground mb-2 block">
          WHAT IS THE <span className="font-semibold text-foreground">JOB DESCRIPTION</span> FOR THIS JOB?*
        </Label>
        <div className="relative">
          <Textarea
            id="job-description"
            value={jobDescription}
            onChange={(e) => onJobDescriptionChange(e.target.value)}
            placeholder="Add a job description or use AI to generate it"
            className="w-full min-h-[200px] resize-none pr-28"
          />
          {/* Generate Button - positioned inside textarea */}
          <Button
            onClick={onGenerate}
            disabled={isGenerating || !jobTitle}
            size="sm"
            className="absolute bottom-3 right-3"
          >
            <Zap className="w-4 h-4 mr-1" />
            {isGenerating ? "GENERATING..." : "GENERATE"}
          </Button>
        </div>
      </div>
    </div>
  );
}
