"use client";

import { useJobsManager } from "@/context/JobsManagerProvider";
import { useResumeManager } from "@/context/ResumeManagerProvider";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { AlertCircle } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import ResumeOptimizationSkeleton from "./skeleton/resume-optimizer-skeleton";
import { RewriteResponse, User } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { resumeApi } from "@/app/api/resume";
import { Button } from "../ui/button";
import { useState } from "react";
import EasyApplyModal from "../job/easy-apply/easy-apply-modal";
import axios from "axios";
import DownloadResumeButton from "./DownloadResume";

export default function ResumeOptimizer() {
  const { selectedJob } = useJobsManager();
  const { activeResume, resumeData, setResumeData, getResumeById } =
    useResumeManager();

  const renderImprovement = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={idx}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const { data, isPending, error, refetch, isRefetching } = useQuery({
    queryKey: ["optimize", activeResume?.id, selectedJob?.id],
    queryFn: async () => {
      if (!activeResume || !selectedJob) {
        throw new Error("Resume or Job is missing");
      }

      const optimizedResume = await resumeApi.optimizeResume(
        activeResume,
        selectedJob
      );

      const resume = await getResumeById(optimizedResume.optimizedResumeId);

      if (resume) {
        setResumeData(resume);
      }

      return optimizedResume;
    },

    enabled: !!activeResume && !!selectedJob,

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });

  const fetchProfile = async () => {
    const res = await axios.get("/api/profile");
    return res.data as User;
  };

  const { data: user } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    staleTime: Infinity,
  });

  const jobIsApplied = (id: string) => {
    const appliedJob = user?.seekerApplications?.find(
      (job) => job.jobId === id
    );
    return appliedJob ? true : false;
  };

  const [open, setOpen] = useState<boolean>(false);
  const handleDialogState = () => setOpen((prev) => !prev);

  if (isPending || isRefetching) {
    return <ResumeOptimizationSkeleton />;
  }

  return (
    <Card className="flex flex-col bg-muted border-0 shadow-none h-[80vh] rounded-none p-0!">
      <div className="bg-card border-b px-6 py-4 rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              {selectedJob?.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {selectedJob?.companyName} • {selectedJob?.location}
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            {selectedJob?.source === "external" ? (
              selectedJob?.applicationLink ? (
                <a
                  target="_blank"
                  href={selectedJob.applicationLink}
                  rel="noopener noreferrer"
                >
                  <Button className="bg-blue-500 hover:bg-blue-700">
                    Apply now
                  </Button>
                </a>
              ) : (
                <Button className="bg-blue-500 hover:bg-blue-700" disabled>
                  Apply now
                </Button>
              )
            ) : (
              <Button
                className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600"
                onClick={() => setOpen(true)}
                disabled={jobIsApplied(selectedJob?.id ?? "")}
              >
                {jobIsApplied(selectedJob?.id ?? "") ? "Applied" : "Easy Apply"}
              </Button>
            )}

            <DownloadResumeButton
              size="default"
              buttonType="outline"
              resumeData={resumeData}
            />

            <Button
              variant="outline"
              className=" hover:bg-blue-700"
              onClick={() => {
                refetch();
              }}
            >
              Optimize Resume Again
            </Button>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 overflow-y-scroll hide-scroll">
        <div className="space-y-6 ">
          {Object.entries(
            data?.optimizedResumeResponse
              ?.sections as RewriteResponse["optimizedResumeResponse"]["sections"]
          ).map(([key, section]) => (
            <div
              key={key}
              className="bg-card border border-border/50 rounded-xl py-4 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base sm:text-lg font-semibold text-foreground capitalize truncate">
                  {section.section_name}
                </h3>
                <Badge
                  variant="outline"
                  className="bg-green-500/10 text-green-600 text-xs sm:text-sm"
                >
                  Optimized
                </Badge>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                Below are the AI-enhanced improvements, keyword additions, and
                content adjustments for this section.
              </p>

              {section.optimization_report.changes_made.length > 0 && (
                <div className="rounded-lg bg-blue-500/5 border border-blue-500/20 p-3 sm:p-4 mb-4">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-400 text-sm flex items-center gap-2 mb-2">
                    📝 Changes Made
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-foreground">
                    {section.optimization_report.changes_made.map(
                      (change: string, idx: number) => (
                        <li key={idx}>{change}</li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {section.optimization_report.keywords_added.length > 0 && (
                <div className="rounded-lg bg-purple-500/5 border border-purple-500/20 p-3 sm:p-4 mb-4">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-400 text-sm mb-2">
                    🏷️ Keywords Added
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {section.optimization_report.keywords_added.map(
                      (keyword: string, idx: number) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="bg-purple-500/10 text-purple-700 dark:text-purple-400 text-xs"
                        >
                          {keyword}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
              )}

              {section.optimization_report.improvements.length > 0 && (
                <div className="rounded-lg bg-green-500/5 border border-green-500/20 p-3 sm:p-4">
                  <h4 className="font-semibold text-green-700 dark:text-green-400 text-sm flex items-center gap-2 mb-2">
                    ✨ Improvements
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-foreground">
                    {section.optimization_report.improvements.map(
                      (improvement: string, idx: number) => (
                        <li key={idx}>{renderImprovement(improvement)}</li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {section.optimization_report.changes_made.length === 0 &&
                section.optimization_report.keywords_added.length === 0 &&
                section.optimization_report.improvements.length === 0 && (
                  <div className="rounded-lg bg-muted/50 border border-border/50 p-3 sm:p-4 flex items-start gap-2 mt-2">
                    <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      No optimization suggestions available for this section.
                    </p>
                  </div>
                )}
            </div>
          ))}
        </div>
      </ScrollArea>
      {selectedJob && (
        <EasyApplyModal
          open={open}
          setOpen={handleDialogState}
          job={selectedJob}
        />
      )}
    </Card>
  );
}
