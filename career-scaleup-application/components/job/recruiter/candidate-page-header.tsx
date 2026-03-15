"use client";

import { jobApi } from "@/app/api/job";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconUsers } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, MapPin } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import EditJobDialogContent from "./edit-job-dialog";
import { useState } from "react";

export function CandidatesPageHeader() {
  const route = useRouter();
  const handleBack = () => route.push("/dashboard/recruiter/jobs");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const handleDialogState = () => setIsDialogOpen((prev) => !prev);

  const param = useParams();

  const { data, isPending, error } = useQuery({
    queryKey: ["recruiterJobs"],
    queryFn: jobApi.getRecruiterJobs,
    select: (data) => data.find((job) => job.id === param.id),
  });

  if (isPending) return;
  if (error) return;
  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogState}>
      <div className="flex flex-row justify-between items-end">
        <div className="flex flex-row md:flex-row items-start md:items-center gap-4 mb-4">
          <Button
            variant="outline"
            onClick={handleBack}
            className="hidden md:flex rounded-full h-10 w-10 "
          >
            <ArrowLeft className="h-6 w-6 transition-colors" />
          </Button>
          <div className="flex space-x-4">
            <div className="">
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {data?.title}
                  </h1>
                  <p className="text-foreground/70 text-sm">
                    {data?.companyName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                <div className="flex items-center text-foreground/70 space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{data?.location}</span>
                </div>
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-700 text-blue-800 rounded-full">
                  {data?.jobType}
                </span>
              </div>
            </div>
            <div className="flex ">
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Edit Job
                </Button>
              </DialogTrigger>
            </div>
          </div>
        </div>

        <div className="flex py-4 items-end">
          <TabsList className="flex gap-4 w-fit h-fit">
            <TabsTrigger value="overview" className="w-fit">
              📊 Overview
            </TabsTrigger>
            <TabsTrigger value="candidate-pipeline" className="w-fit">
              <IconUsers size={18} />
              Candidate Pipeline
            </TabsTrigger>
          </TabsList>
        </div>
      </div>
      <EditJobDialogContent job={data} onClose={handleDialogState} />
    </Dialog>
  );
}
