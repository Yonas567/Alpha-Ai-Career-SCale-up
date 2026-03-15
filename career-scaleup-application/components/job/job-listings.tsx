"use client";

import { MapPin } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card } from "../ui/card";
import { useJobsManager } from "@/context/JobsManagerProvider";
import JobListSkeleton from "./skeleton/job-listing-skeleton";
import { Job, JobListingsProps } from "@/app/types";
import { useState } from "react";

export default function JobListings({
  selectedJob,
  onSelectJob,
}: JobListingsProps) {
  const { jobsData, loading, error } = useJobsManager();
  const [sourceFilter, setSourceFilter] = useState<
    "all" | "internal" | "external"
  >("all");

  if (loading) {
    return <JobListSkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center max-h-screen w-full md:w-96 border border-primary/10 rounded-lg overflow-hidden flex-col bg-card">
        {error}
      </div>
    );
  }

  if (jobsData?.jobs?.length === 0) {
    return (
      <div className="flex-1 flex w-full items-center justify-center h-full text-muted-foreground">
        No jobs found.
      </div>
    );
  }

  const filteredJobs = () => {
    if (!jobsData?.jobs) return [];
    if (sourceFilter === "all") return jobsData.jobs;

    return jobsData.jobs.filter((job: Job) => job.source === sourceFilter);
  };

  const normalizeTimestamp = (value?: number | string) => {
    if (!value) return null;

    const ts = Number(value);
    if (!Number.isFinite(ts)) return null;

    return ts > 1e12 ? Math.floor(ts / 1000) : ts;
  };

  const timeAgo = (postedAt?: number | string) => {
    const ts = normalizeTimestamp(postedAt);
    if (!ts) return "";

    const now = Math.floor(Date.now() / 1000);
    const seconds = now - ts;

    if (!Number.isFinite(seconds)) return "";

    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    if (seconds < 60) return rtf.format(-Math.floor(seconds), "seconds");

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return rtf.format(-minutes, "minutes");

    const hours = Math.floor(seconds / 3600);
    if (hours < 24) return rtf.format(-hours, "hours");

    const days = Math.floor(seconds / 86400);
    return rtf.format(-days, "days");
  };

  return (
    <div className="max-h-screen w-full md:w-96 border border-border rounded-lg overflow-hidden flex flex-col bg-card">
      <div className="p-4 flex justify-between items-center gap-2">
        <h2 className="font-semibold text-foreground text-sm">
          {"10,000"}+ Jobs
        </h2>
        <Select
          value={sourceFilter}
          onValueChange={(value: "all" | "internal" | "external") =>
            setSourceFilter(value)
          }
        >
          <SelectTrigger className="h-8 w-fit shadow-none">
            <SelectValue placeholder="All Jobs" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Jobs</SelectItem>
            <SelectItem value="internal">Posted Here</SelectItem>
            <SelectItem value="external">Other Sources</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-y-scroll flex-1 hide-scroll ">
        {filteredJobs()?.map((job: Job) => (
          <Card
            key={job.id}
            onClick={() => onSelectJob(job.id)}
            className={`w-full text-left p-4  hover:text-white  dark:hover:text-white transition-all rounded-none shadow-none cursor-pointer relative group bg-card! ${
              selectedJob?.id === job.id
                ? "border-l-4 border-l-[#4d32fb] text-white dark:border-l-[#4d32fb] dark:text-white"
                : ""
            }`}
          >
            <div className="space-y-2">
              <div>
                <h3 className="font-semibold text-foreground text-sm">
                  {job.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {job.companyName}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{job.location}</span>
              </div>

              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  {job.jobType}
                </Badge>

                {job.fixedBudget && (
                  <span className="text-xs font-medium text-foreground">
                    {job.fixedBudget}$
                  </span>
                )}

                {job.hourlyRate && (
                  <span className="text-xs font-medium text-foreground">
                    {job.hourlyRate}$/hr
                  </span>
                )}

                {job.salaryMax && job.salaryMin && (
                  <span className="text-xs font-medium text-foreground">
                    {job.salaryMin?.toLocaleString()} -{" "}
                    {job.salaryMax?.toLocaleString()}$
                  </span>
                )}
              </div>

              <p className="text-xs text-muted-foreground">
                {timeAgo(job.postedAt)}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
