"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock resume data - will be replaced with actual data from API
interface Resume {
  id: string;
  name: string;
}

interface ResumeStepProps {
  resumes?: Resume[];
  selectedResumeId?: string;
  onResumeSelect: (resumeId: string) => void;
}

export function ResumeStep({
  resumes = [],
  selectedResumeId,
  onResumeSelect,
}: ResumeStepProps) {
  return (
    <div className="max-w-4xl">
      {/* Title */}
      <h1 className="text-3xl font-bold text-foreground mb-4">
        Pick your resume
      </h1>

      {/* Description */}
      <p className="text-muted-foreground mb-8">
        AI interview questions will be based on your resume, focusing on your
        qualifications, skills, work history, and education. Be prepared to
        discuss these aspects to showcase your suitability for the position.
      </p>

      {/* Resume Select */}
      <Select value={selectedResumeId} onValueChange={onResumeSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select resume" />
        </SelectTrigger>
        <SelectContent>
          {resumes.length > 0 ? (
            resumes.map((resume) => (
              <SelectItem key={resume.id} value={resume.id}>
                {resume.name}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="no-resume" disabled>
              No resumes found
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
