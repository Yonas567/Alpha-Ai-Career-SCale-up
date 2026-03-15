"use client";

import type React from "react";

import { Eye, FileText, MoreVertical, Trash2 } from "lucide-react";
import { ResumeData } from "@/app/types";
import { useResumeManager } from "@/context/ResumeManagerProvider";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { IconCheck } from "@tabler/icons-react";
import { Badge } from "../ui/badge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resumeApi } from "@/app/api/resume";

export default function ResumeCard({
  resume,
  onResumeClick,
}: {
  resume: ResumeData;
  onResumeClick: (resume: ResumeData) => void;
}) {
  const queryClient = useQueryClient();

  const activateResume = useMutation({
    mutationFn: async () => resumeApi.setResumeActive(resume.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["resumes"] }),
  });

  const deleteResume = useMutation({
    mutationFn: async (id: string) => resumeApi.deleteResume(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["resumes"] }),
  });

  return (
    <Card
      className="overflow-hidden hover:border-indigo-700 transition-all duration-300 flex flex-col p-0 h-60 group relative"
      onClick={() => onResumeClick(resume)}
    >
      <div className="absolute inset-0 bg-white dark:bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="bg-white dark:bg-black overflow-hidden p-0 relative">
        {resume ? (
          <div className="scale-[0.25] origin-top-left w-[400%] h-full pointer-events-none">
            {/* <ResumePreview resumeData={resumeData} /> */}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FileText className="w-12 h-12 text-muted-foreground/30" />
          </div>
        )}
      </div>

      <div className="h-[fit] p-2 flex flex-col relative">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground line-clamp-2">
              {resume?.basics?.fullName || "Untitled Resume"}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(resume.generatedAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

          {resume.isActive && (
            <Badge variant="outline" className="bg-green-400 text-foreground">
              Active
            </Badge>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  activateResume.mutate();
                }}
                disabled={resume.isActive}
              >
                <IconCheck className="w-4 h-4" />
                {resume.isActive ? "Active" : "Set active"}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2 text-destructive focus:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteResume.mutate(resume.id);
                }}
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
}
