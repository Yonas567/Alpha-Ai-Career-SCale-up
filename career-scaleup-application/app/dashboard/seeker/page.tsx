"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Clock, Bookmark, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Job, User } from "@/app/types";
import axios from "axios";
import JobCard from "@/components/job/job-card";
import JobSkeleton from "@/components/job/skeleton/job-card-skeleton";
import NoJobs from "@/components/job/no-job";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Home() {
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

  const fetchProfile = async () => {
    const response = await axios.get("/api/profile");
    return response.data as User;
  };

  const { data: user } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    staleTime: Infinity,
  });

  const shortListedApplication = () => {
    return (
      user?.seekerApplications?.filter(
        (application) => application.status === "ShortListed",
      ).length ?? 0
    );
  };

  const isMobile = useIsMobile();

  return (
    <main className="h-full flex-1 overflow-y-scroll hide-scroll">
      <div
        className={`${!isMobile ? "py-0 space-y-4 px-6" : "py-6 space-y-4"}`}
      >
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Your Career Dashboard
          </h1>

          <p className="text-foreground text-md">
            Build on your resume and target role.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card! gap-y-2!">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0!">
              <CardTitle className="text-sm font-medium">
                Active Applications
              </CardTitle>
              <div className="flex items-center justify-center h-6 w-6 bg-indigo-500 shadow-sm rounded-sm">
                <Briefcase className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {user?.seekerApplications?.length || 0}
              </div>
              <p className="text-xs">Roles you've applied to</p>
            </CardContent>
          </Card>

          <Card className="bg-card! gap-y-0!">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saved Jobs</CardTitle>
              <div className="flex items-center justify-center h-6 w-6 bg-indigo-500 shadow-sm rounded-sm">
                <Bookmark className="h-4 w-4  text-white " />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{savedJobs?.length || 0}</div>
              <p className="text-xs">Jobs saved to apply later</p>
            </CardContent>
          </Card>

          <Card className="bg-card! gap-y-0!">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Short Listed
              </CardTitle>
              <div className="flex items-center justify-center h-6 w-6 bg-indigo-500 shadow-sm rounded-sm">
                <Clock className="h-4 w-4  text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {shortListedApplication()}
              </div>
              <p className="text-xs">Roles you are shortlisted for interview</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card! w-1/2">
          <CardHeader>
            <h3 className="text-xl font-semibold text-foreground tracking-tight">
              Your Next Step
            </h3>
            <p className="text-sm text-muted-foreground">
              Manage Cover Letters. You can edit, delete, or preview them
              anytime.
            </p>
          </CardHeader>
          <CardContent>
            <Button>Optimize Resume for AI Job Matches</Button>
          </CardContent>
        </Card>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">
              Recently Saved Jobs
            </h2>
            <Link href="/dashboard/seeker/saved-jobs">
              <Button
                size="sm"
                className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                View All <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="flex-1 h-full overflow-y-scroll hide-scroll">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            ) : savedJobs?.length === 0 ? (
              <div className="flex w-full items-center justify-center">
                <NoJobs />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
                {savedJobs?.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
