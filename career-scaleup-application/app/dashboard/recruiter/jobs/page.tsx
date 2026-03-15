"use client";

import { useState } from "react";
import {
  Search,
  MoreHorizontal,
  MapPin,
  Clock,
  FileText,
  ChevronDown,
  Plus,
  XCircle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Job } from "@/app/types";
import { jobApi } from "@/app/api/job";
import CreateJobModal from "@/components/job/recruiter/create-job-modal";
import JobBoardSkeleton from "@/components/job/recruiter/skeleton/job-board-skeleton";
import RecruiterJobEmptyState from "@/components/job/recruiter/recruiter-job-empty-state";

export default function JobsBoard() {
  const route = useRouter();
  const queryClient = useQueryClient();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const handleDialogState = () => setIsDialogOpen((prev) => !prev);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const {
    data = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["recruiterJobs"],
    queryFn: jobApi.getRecruiterJobs,
  });

  const deleteJob = useMutation({
    mutationFn: (jobId: string) => jobApi.deleteJob(jobId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["recruiterJobs"] }),
  });

  const updateJobStatus = useMutation({
    mutationFn: ({
      jobId,
      status,
    }: {
      jobId: string;
      status: "Open" | "Closed";
    }) => jobApi.updateJobStatus(jobId, status),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["recruiterJobs"] }),
  });

  if (isPending || !data) return <JobBoardSkeleton />;
  if (error) return null;

  const filteredJobs = data
    ?.filter((job: Job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((job: Job) =>
      statusFilter === "All Status" ? true : job.status === statusFilter
    );

  const handleNavigation = (id: string, path: string) => {
    if (id && path) {
      route.push(`jobs/${id}/${path}`);
    }
  };

  return (
    <div className="w-full h-full rounded-md">
      <Dialog open={isDialogOpen} onOpenChange={handleDialogState}>
        <div className="flex flex-col w-full h-full rounded-md py-4">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4 w-full">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search Job"
                  className="pl-10 bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        statusFilter === "Open"
                          ? "bg-green-400"
                          : statusFilter === "Closed"
                          ? "bg-red-400"
                          : "bg-gray-400"
                      }`}
                    ></div>
                    {statusFilter}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {["All Status", "Open", "Closed"].map((status) => (
                    <DropdownMenuItem
                      key={status}
                      onClick={() => setStatusFilter(status)}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          status === "Open"
                            ? "bg-green-400"
                            : status === "Closed"
                            ? "bg-red-400"
                            : "bg-gray-400"
                        }`}
                      ></div>
                      {status}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-3">
              <DialogTrigger>
                <Button
                  size="sm"
                  className="gap-2 bg-primary hover:bg-primary/90 transition-colors"
                >
                  <Plus className="w-4 h-4 transition-colors" />
                  Create Job
                </Button>
              </DialogTrigger>
            </div>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-scroll hide-scroll h-full pb-4">
              {filteredJobs.map((job: Job) => (
                <Card
                  key={job.id}
                  className="p-5 bg-card shadow-sm transition-shadow h-fit"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <Badge
                        variant="secondary"
                        className={`${
                          job.status === "Open" ? "bg-green-400" : "bg-red-500"
                        } text-white text-xs px-2`}
                      >
                        {job.status}
                      </Badge>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            <MoreHorizontal className="w-3.5 h-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              updateJobStatus.mutate({
                                jobId: job.id,
                                status:
                                  job.status === "Open" ? "Closed" : "Open",
                              })
                            }
                          >
                            {job.status === "Open" ? (
                              <>
                                <XCircle className="text-red-400" /> Close Job
                              </>
                            ) : (
                              <>
                                <CheckCircle className="text-green-500" />
                                Reopen Job
                              </>
                            )}
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => deleteJob.mutate(job.id)}
                          >
                            <IconTrash className="text-red-500" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div>
                      <h3 className="font-semibold text-base mb-2">
                        {job.title}{" "}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {job.jobType}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" />
                          {job.workType}
                        </span>
                      </div>
                    </div>

                    {job.applications?.length ? (
                      <div className="bg-accent rounded-lg p-3 grid grid-cols-2 gap-3 h-32">
                        <div>
                          <div className="text-2xl font-semibold">
                            {job.applications.length}
                          </div>
                          <div className="text-xs text-gray-600">
                            Applications
                          </div>
                        </div>
                        <div className="h-32">
                          <div className="text-2xl font-semibold flex items-center gap-1">
                            {
                              job.applications.filter(
                                (app) => app.status === "ShortListed"
                              ).length
                            }
                          </div>
                          <div className="text-xs text-gray-600">
                            Shortlisted
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-accent rounded-lg p-8 flex flex-col items-center justify-center text-center h-32"></div>
                    )}

                    <div className="pt-3 border-t flex items-center justify-between">
                      <div className="text-xs text-gray-600">
                        Created on{" "}
                        {new Date(job.postedAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0 text-xs"
                        onClick={() => handleNavigation(job.id, "candidates")}
                      >
                        {"View details"}
                        <ChevronDown className="w-3 h-3 ml-1 rotate-[-90deg]" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="h-full shadow-md rounded-md">
              <RecruiterJobEmptyState />
            </div>
          )}
          <CreateJobModal onClose={handleDialogState} />
        </div>
      </Dialog>
    </div>
  );
}
