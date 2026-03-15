"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Job, JobManagerContextType } from "@/app/types";
import { jobApi } from "@/app/api/job";
import { useIsMobile } from "@/hooks/use-mobile";

export const JobsManagerContext = createContext<
  JobManagerContextType | undefined
>(undefined);

export const useJobsManager = () => {
  const context = useContext(JobsManagerContext);
  if (!context) {
    throw new Error("useJobsManager must be used within a JobsManagerProvider");
  }
  return context;
};

export default function JobsManagerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = useQueryClient();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const isMobile = useIsMobile();

  const {
    data: jobsData,
    isLoading: loading,
    error
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: () =>
      jobApi.fetchJobs({
        query: "all",
        location: "us",
        pages: "1",
        num_pages: "2",
        date_posted: "",
      }),
  });

  const searchJobsMutation = useMutation({
    mutationFn: ({
      searchTerm,
      location,
    }: {
      searchTerm: string;
      location: string;
    }) => jobApi.searchJob(searchTerm, location),

    onSuccess: (data) => {
      queryClient.setQueryData(["jobs"], data);
      setSelectedJob(jobsData?.jobs[0] || null);
    },

    onError: (err) => {
      console.error("Error searching jobs:", err);
    },
  });

  const searchJobs = async (searchTerm: string, location: string) => {
    return searchJobsMutation.mutateAsync({ searchTerm, location });
  };

  const selectJob = (id: string) => {
    const job = jobsData?.jobs.find((job) => job.id === id) || null;
    setSelectedJob(job);
  };

  const saveJob = useMutation({
    mutationFn: async ({
      job: newJob,
      source,
    }: {
      job: Job;
      source: "external" | "internal";
    }) => jobApi.saveJob(newJob, source),

    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["jobs"] }),
  });

  useEffect(() => {
    if (!isMobile) {
      setSelectedJob(jobsData?.jobs[0] || null);
    } else {
      setSelectedJob(null);
    }
  }, [jobsData]);

  return (
    <JobsManagerContext.Provider
      value={{
        jobsData,
        loading,
        error: error ? (error as Error).message : null,
        selectedJob,
        setSelectedJob,
        selectJob,
        saveJob,
        searchJobs,
        searchJobsMutation,
      }}
    >
      {children}
    </JobsManagerContext.Provider>
  );
}
