"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import ResumeCard from "@/components/resume/resume-card";
import CreateResumeModal from "@/components/resume/create-resume-modal";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { resumeApi } from "@/app/api/resume";
import { useIsMobile } from "@/hooks/use-mobile";

export default function CreateResumePage() {
  const router = useRouter();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const isMobile = useIsMobile();

  const handleCreateNew = () => setShowCreateModal(true);

  const handleOpenResume = (id: string) => {
    if (id) {
      router.push(`/dashboard/seeker/create-resume/${id}`);
    }
  };

  const { data: resumes, isLoading } = useQuery({
    queryKey: ["resumes"],
    queryFn: async () => resumeApi.getResumes(),
  });

  return (
    <div
      className={`flex flex-col h-full space-y-4 ${
        isMobile ? "px-0 pt-0" : "px-4 pt-4"
      } `}
    >
      <div className="pb-4">
        <h2 className="text-2xl font-semibold text-foreground tracking-tight">
          My Resumes
        </h2>

        <p className="text-sm text-muted-foreground">
          Manage your resumes or Cover Letters. You can edit, delete, or preview
          them anytime.
        </p>
      </div>

      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-6 justify-start">
        <div className="h-60">
          <Button
            variant="ghost"
            className="border-2 border-dashed border-border rounded-2xl p-6 hover:border-indigo-700 hover:bg-muted transition-all flex flex-col items-start justify-start gap-3 h-full w-full shadow-sm hover:shadow-md"
            onClick={handleCreateNew}
          >
            <Plus className="h-8 w-8 text-muted-foreground" />
            <div className="text-left">
              <p className="font-semibold text-foreground text-base">
                Create Resume
              </p>
              <p className="text-xs text-muted-foreground mt-1 leading-snug">
                Start a brand new resume with one click.
              </p>
            </div>
          </Button>
        </div>

        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="border border-border rounded-2xl bg-card shadow-sm p-4 h-60 flex flex-col gap-3 animate-pulse"
            >
              <Skeleton className="w-3/4 h-6 rounded-md bg-muted" />
              <Skeleton className="w-full h-32 rounded-md bg-muted" />
              <Skeleton className="w-1/2 h-4 rounded-md bg-muted" />
            </div>
          ))}

        {!isLoading &&
          resumes?.map((resume, index) => (
            <ResumeCard
              key={index}
              resume={resume}
              onResumeClick={() => handleOpenResume(resume.id)}
            />
          ))}
      </div>

      <CreateResumeModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
      />
    </div>
  );
}
