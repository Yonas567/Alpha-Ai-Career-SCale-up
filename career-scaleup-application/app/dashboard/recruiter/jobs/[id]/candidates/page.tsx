"use client";

import { jobApi } from "@/app/api/job";
import { columns } from "@/app/constants";
import { CandidatesPageHeader } from "@/components/job/recruiter/candidate-page-header";
import JobOverview from "@/components/job/recruiter/job-overview";
import KanbanColumn from "@/components/job/recruiter/kanban-column";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";



export default function Candidates() {
  const [activeTab, setActiveTab] = useState<"overview" | "candidate-pipeline">(
    "overview"
  );

  const param = useParams();

  const { data, isPending, error } = useQuery({
    queryKey: ["recruiterJobs"],
    queryFn: jobApi.getRecruiterJobs,
    select: (data) => data.find((job) => job.id === param.id),
  });

  if (isPending || !data) return;
  if (error) return;

  const stats = data?.applications?.reduce((acc: any, app) => {
    const status = app.status;

    if (!acc[status]) {
      acc[status] = [];
    }

    acc[status].push({
      applicationId: app.id,
      status: app.status,
      seeker: app.seeker,
      recruiter: data.recruiterId,
    });

    return acc;
  }, {});

  return (
    <div className="w-full h-full rounded-md pt-2">
      <Tabs
        value={activeTab}
        onValueChange={(v: any) => setActiveTab(v)}
        className="flex flex-col w-full h-full gap-0 overflow-hidden"
      >
        <CandidatesPageHeader />

        <TabsContent
          value="overview"
          className="h-full overflow-y-scroll hide-scroll py-6 px-2 rounded-md"
        >
          <JobOverview job={data} />
        </TabsContent>

        <TabsContent
          value="candidate-pipeline"
          className="w-full h-full overflow-x-hidden"
        >
          <div className="flex h-full w-full">
            {columns.map((column) => (
              <KanbanColumn
                key={column.id}
                title={column.title}
                color={column.color}
                candidates={stats[column.id]}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
