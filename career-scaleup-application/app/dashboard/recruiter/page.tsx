"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Route } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { jobApi } from "@/app/api/job";
import { useRouter } from "next/navigation";
import RecruiterDashboardSkeleton from "@/components/job/recruiter/skeleton/recruiter-home-skeleton";
import axios from "axios";
import { User } from "@/app/types";
import RecruiterJobEmptyState from "@/components/job/recruiter/recruiter-job-empty-state";

export default function RecruiterDashboardPage() {
  const {
    data = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["recruiterJobs"],
    queryFn: jobApi.getRecruiterJobs,
  });

  const fetchProfile = async () => {
    const response = await axios.get("/api/profile");
    return response.data as User;
  };

  const { data: user } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  const router = useRouter();

  const jobs = Array.isArray(data) ? data : [];

  if (isPending || !data) return <RecruiterDashboardSkeleton />;

  return (
    <main className="flex-1 h-full overflow-y-scroll hide-scroll">
      <div className="py-4 space-y-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            {user?.companyName || user?.fullName}
          </h1>
          <p className="text-muted-foreground">
            Here’s an overview of your hiring activity.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Job Posted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jobs.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {jobs?.reduce(
                  (sum, job) => sum + (job.applications?.length ?? 0),
                  0
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hired</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {jobs?.reduce(
                  (sum, job) => sum + (job.applications?.length ?? 0),
                  0
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg text-card-foreground">
                My job postings
              </CardTitle>
              <CardDescription>
                Keep track of your latest job openings and applicants.
              </CardDescription>
            </div>

            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => router.push("/dashboard/recruiter/jobs")}
            >
              Manage my jobs
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>

          {jobs.length > 0 ? (
            <CardContent>
              <div className="overflow-x-auto ">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground border-b border-border">
                      <th className="text-left py-3 font-medium">Position</th>
                      <th className="text-left py-3 font-medium">Applicants</th>
                      <th className="text-left py-3 font-medium">Posted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.slice(0, 6).map((job, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-border hover:bg-muted/40 transition-colors"
                      >
                        <td className="py-3 font-medium text-card-foreground">
                          {job.title}
                        </td>

                        <td className="py-3 text-card-foreground">
                          {job.applications?.length}
                        </td>

                        <td className="py-3 text-muted-foreground">
                          {new Date(job.postedAt).toDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          ) : (
            <RecruiterJobEmptyState />
          )}
        </Card>
      </div>
    </main>
  );
}
