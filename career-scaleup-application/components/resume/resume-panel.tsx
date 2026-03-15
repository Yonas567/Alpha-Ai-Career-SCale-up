"use client";

import { FilePlus2Icon, FileQuestionIcon, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useResumeManager } from "@/context/ResumeManagerProvider";
import { useJobsManager } from "@/context/JobsManagerProvider";
import { IconLoader } from "@tabler/icons-react";
import { AnalysisResponse } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { resumeApi } from "@/app/api/resume";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "../ui/scroll-area";

export default function ResumePanel() {
  const router = useRouter();
  const { activeResume, resumeData } = useResumeManager();
  const { selectedJob } = useJobsManager();
  const isMobile = useIsMobile();

  const { data, isPending, error } = useQuery({
    queryKey: ["analysis", activeResume?.id, selectedJob?.id],
    queryFn: () => {
      if (!activeResume || !selectedJob) {
        throw new Error("Resume or Job is missing");
      }
      return resumeApi.analyzeResume(activeResume, selectedJob);
    },
    enabled: !!activeResume && !!selectedJob,

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });

  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  const calculateAlignmentScore = (response: AnalysisResponse | null) => {
    if (!response?.sections) return 0;

    const scores = Object.values(response.sections)
      .map((section) => section.alignment_score)
      .filter((score) => typeof score === "number" && !isNaN(score));

    if (scores.length === 0) return 0;

    const average = scores.reduce((a, b) => a + b, 0) / scores.length;
    return Math.round(average * 10);
  };

  const scorePercent = data ? calculateAlignmentScore(data) : 0;

  const offset = circumference - (scorePercent / 100) * circumference;

  const optimizeResume = (id: string) => {
    if (id) {
      router.push(`/dashboard/seeker/create-resume/${id}?mode=optimize`);
    }
  };

  if (error) {
    return <>Failed to Analyze</>;
  }

  return (
    <div
      className={`w-full h-full ${
        isMobile ? "bg-none border-primary" : "bg-card"
      }`}
    >
      {activeResume ? (
        <div className="p-6 space-y-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-32 h-32">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 120 120"
              >
                <defs>
                  <linearGradient
                    id="gaugeGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>

                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />

                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="none"
                  stroke="#1D4ED8"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  style={{
                    transition: "stroke-dashoffset 0.6s ease",
                  }}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {!isPending || scorePercent > 0 ? (
                  <span className="text-lg font-semibold">{scorePercent}%</span>
                ) : (
                  <IconLoader className="flex items-center justify-center w-8 h-8 text-gray-400 animate-spin" />
                )}
                <span className="text-xs text-muted-foreground text-center">
                  Match Score
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Button
              className="w-full text-white gap-2 bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600"
              onClick={() => optimizeResume(activeResume?.id || "resume")}
              disabled={isPending}
            >
              <Sparkles className="w-4 h-4" />
              Increase Match score
            </Button>
          </div>

          {data ? (
            <ScrollArea className="flex max-h-84 overflow-y-scroll hide-scroll">
              <div className="flex flex-col h-full gap-6">
                {(data?.skill_coverage?.hard_skills?.missing_skills ?? [])
                  .length > 0 && (
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold">Hard Skills</h3>
                    <ul className="list-none flex flex-col gap-1">
                      {(
                        data?.skill_coverage?.hard_skills?.missing_skills ?? []
                      ).map((hardSkill, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-gray-800"
                        >
                          <span className="text-red-500 font-bold">×</span>
                          <span className="text-sm text-primary">
                            {hardSkill}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(data?.skill_coverage?.soft_skills?.missing_skills ?? [])
                  .length > 0 && (
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold">Soft Skills</h3>
                    <ul className="list-none flex flex-col gap-1">
                      {data?.skill_coverage.soft_skills.missing_skills.map(
                        (softSkill, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-gray-800"
                          >
                            <span className="text-red-500 font-bold">×</span>
                            <span className="text-sm">{softSkill}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-32 rounded" />
                <ul className="flex flex-col gap-1">
                  {Array(2)
                    .fill(0)
                    .map((_, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded-full bg-red-400" />{" "}
                        <Skeleton className="h-4 w-48 rounded" />
                      </li>
                    ))}
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-32 rounded" />
                <ul className="flex flex-col gap-1">
                  {Array(2)
                    .fill(0)
                    .map((_, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded-full bg-red-400" />
                        <Skeleton className="h-4 w-48 rounded" />
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-6 space-y-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-32 h-32">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 120 120"
              >
                <defs>
                  <linearGradient
                    id="gaugeGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>

                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />

                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="none"
                  stroke="#1D4ED8"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  style={{
                    transition: "stroke-dashoffset 0.6s ease",
                  }}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {!isPending || scorePercent > 0 ? (
                  <span className="text-lg font-semibold">{scorePercent}%</span>
                ) : (
                  <FileQuestionIcon className="flex items-center justify-center w-8 h-8 text-gray-400" />
                )}
                <span className="text-xs text-muted-foreground text-center">
                  Match Score
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Button
              className="w-full text-white gap-2 bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600"
              onClick={() => router.push("/dashboard/seeker/create-resume")}
            >
              <FilePlus2Icon className="w-4 h-4" />
              Add Resume
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
