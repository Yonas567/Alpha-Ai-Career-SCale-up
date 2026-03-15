"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowUpRight,
  Briefcase,
  Calendar,
  MapPin,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Job } from "@/app/types";
import JobSkeleton from "@/components/job/skeleton/job-card-skeleton";
import NoJobs from "@/components/job/no-job";
import JobCard from "@/components/job/job-card";

export default function SavedJobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("All");

  const fetchSavedJobs = async (): Promise<Job[]> => {
    const response = await axios.get<Job[]>("/api/job/saved");
    return response.data;
  };

  const {
    data: savedJobs,
    isLoading,
    isError,
  } = useQuery<Job[]>({
    queryKey: ["savedJobs"],
    queryFn: fetchSavedJobs,
  });

  const jobTypes: string[] = [
    "All",
    ...Array.from(new Set((savedJobs ?? []).map((job) => job.jobType))),
  ];

  const filteredJobs = useMemo(() => {
    return (savedJobs ?? []).filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesJobType =
        selectedJobType === "All" || job.jobType === selectedJobType;

      return matchesSearch && matchesJobType;
    });
  }, [searchQuery, selectedJobType, savedJobs]);

  return (
    <main className="h-full ">
      <div className="container mx-auto px-3 sm:px-4 sm:py-4 flex flex-col h-full">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Saved Jobs
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">
            Browse and manage jobs you’ve saved. Use the filters or search to
            narrow down results.
          </p>
        </div>

        <div className="mb-6 sm:mb-8 sticky top-0 z-10 rounded-xl flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative flex-1 max-w-lg w-full">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search by job title, company, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="shadow-none w-full h-12 pl-12 pr-4 rounded-lg border text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-background"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {jobTypes.map((type) => (
              <Badge
                key={type}
                className={`cursor-pointer px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
                  ${
                    selectedJobType === type
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                onClick={() => setSelectedJobType(type)}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-scroll hide-scroll">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
              {[...Array(6)].map((_, i) => (
                <JobSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-lg font-medium text-red-500">
                Failed to load saved jobs.
              </p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <NoJobs />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
