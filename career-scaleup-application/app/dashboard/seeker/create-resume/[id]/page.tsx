"use client";

import ResumeAnalysis from "@/components/resume/resume-analysis";
import { ResumeEditor } from "@/components/resume/resume-editor";
import ResumeSkeleton from "@/components/resume/skeleton/resume-skeleton";
import ResumeOptimizer from "@/components/resume/resume.optimizer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CoverLetter } from "@/components/cover-letter/cover-letter";
import dynamic from "next/dynamic";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resumeApi } from "@/app/api/resume";
import { TemplatePreview, templates } from "@/components/resume/templates";
import { TemplateType } from "@/components/resume/templates/types";
import { useResumeManager } from "@/context/ResumeManagerProvider";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = params.id as string;
  const isMobile = useIsMobile();

  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("resume");
  const { resumeData, getResumeById } = useResumeManager();

  const handleBack = () => {
    router.push("/dashboard/seeker/create-resume");
  };

  const handleTabChange = (tab: string) => {
    router.replace(`/dashboard/seeker/create-resume/${id}?mode=${tab}`);
  };

  const DownloadResumeButton = dynamic(
    () => import("@/components/resume/DownloadResume"),
    { ssr: false },
  );

  const changeTemplate = useMutation({
    mutationFn: ({ id, template }: { id: string; template: string }) =>
      resumeApi.changeTemplate(id, template),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      setActiveTab("resume");
      router.replace(`/dashboard/seeker/create-resume/${id}?mode=resume`);
    },
  });

  useEffect(() => {
    const tabFromQuery = searchParams.get("mode");
    setActiveTab(tabFromQuery || "resume");
    getResumeById(id);
  }, [id, searchParams]);

  if (!resumeData) {
    return <ResumeBuilderSkeleton />;
  }

  const SelectedTemplate =
    TemplatePreview[resumeData?.template as keyof typeof TemplatePreview] ??
    TemplatePreview[TemplateType.SIMPLE];

  return (
    <div className="h-full">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="flex flex-1 flex-col w-full h-full gap-0"
      >
        <header className="sticky top-0 z-40 border-border pt-0">
          <div className="py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={handleBack}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold text-foreground flex items-center">
                Resume Builder
              </h1>
              {!isMobile ? (
                <TabsList className="grid grid-cols-5 w-fit mx-6 my-2">
                  <TabsTrigger value="resume">Resume Editor</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                  <TabsTrigger value="analysis">Analysis</TabsTrigger>
                  <TabsTrigger value="optimize">Job Matcher</TabsTrigger>
                  <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
                </TabsList>
              ) : (
                <Select value={activeTab} onValueChange={handleTabChange}>
                  <SelectTrigger className="h-8 w-fit shadow-none">
                    <SelectValue placeholder="Editor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="resume">Editor</SelectItem>
                    <SelectItem value="templates">Templates</SelectItem>
                    <SelectItem value="analysis">Analysis</SelectItem>
                    <SelectItem value="optimize">Job Matcher</SelectItem>
                    <SelectItem value="cover-letter">Cover Letter</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
            {activeTab === "resume" && !isMobile && (
              <DownloadResumeButton
                size="default"
                buttonType="default"
                resumeData={resumeData}
              />
            )}
          </div>
        </header>

        <TabsContent
          value="resume"
          className={`overflow-hidden ${
            isMobile ? "bg-none" : "bg-muted px-6 py-6"
          }  rounded-md  h-full `}
        >
          <div className="h-full overflow-y-scroll hide-scroll">
            <div className="flex md:grid grid-cols-[2fr_3fr] gap-x-4 h-full">
              <div className="order-1 lg:order-1 h-full">
                <ResumeEditor resumeData={resumeData} />
              </div>

              {!isMobile && (
                <div className="order-2 lg:order-2 lg:sticky lg:top-24 lg:h-full overflow-y-scroll hide-scroll">
                  {resumeData ? (
                    <div className="w-full min-h-screen p-6 shadow-md bg-white rounded-md py-4">
                      <SelectedTemplate resumeData={resumeData} />
                    </div>
                  ) : (
                    <div className="w-full flex justify-center py-6">
                      <ResumeSkeleton />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="templates"
          className={`h-full rounded-md overflow-hidden ${
            isMobile ? "" : "px-6 py-4 bg-muted"
          } `}
        >
          <div className="h-full overflow-y-scroll hide-scroll">
            <div className="flex flex-col gap-8 h-full overflow-y-scroll hide-scroll">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => {
                  const isActive = resumeData.template === template.templateId;

                  return (
                    <div
                      key={template.templateId}
                      className={`group rounded-xl overflow-hidden bg-background transition-all  border border-border
              ${isActive ? "shadow-md" : "border-border hover:shadow-lg"}
            `}
                    >
                      <div className="relative h-[420px] bg-white overflow-hidden">
                        <div className="h-full absolute inset-x-0 top-0 w-full bg-white shadow-md">
                          <div className="h-full p-4 pointer-events-none">
                            {template.component}
                          </div>
                        </div>

                        {isActive && (
                          <div className="absolute inset-0 ring-1 ring-primary pointer-events-none" />
                        )}
                      </div>

                      <div className="p-4 bg-linear-to-br from-blue-600 to-blue-500 text-white">
                        <div className="flex flex-col gap-3">
                          <div>
                            <h3 className="text-sm font-semibold">
                              {template.name}
                            </h3>
                            <p className="text-xs text-blue-100">
                              {template.description}
                            </p>
                          </div>

                          <button
                            disabled={isActive}
                            onClick={() =>
                              changeTemplate.mutate({
                                id: resumeData.id,
                                template: template.templateId,
                              })
                            }
                            className={`h-9 rounded-md text-sm font-medium transition
                    ${
                      isActive
                        ? "bg-white/20 text-white cursor-default"
                        : "bg-white text-blue-600 hover:bg-blue-50"
                    }
                  `}
                          >
                            {isActive ? "Selected" : "Apply Template"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="analysis"
          className={`bg-muted rounded-md h-full overflow-hidden ${
            isMobile ? "px-0 py-0" : "px-6 py-6"
          }`}
        >
          <div className="h-full overflow-hidden">
            <div
              className={`grid gap-6 h-full ${
                isMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"
              }`}
            >
              {!isMobile && (
                <div className="pb-16 bg-muted h-full overflow-y-scroll hide-scroll">
                  {resumeData ? (
                    <div className="w-full bg-white rounded-md shadow-md p-6 py-4">
                      <SelectedTemplate resumeData={resumeData} />
                    </div>
                  ) : (
                    <div className="w-full flex justify-center py-6">
                      <ResumeSkeleton />
                    </div>
                  )}
                </div>
              )}

              <div className="h-full">
                <ResumeAnalysis />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="optimize"
          className={`space-y-6 bg-muted overflow-hidden rounded-md h-full ${
            isMobile ? "px-0 py-0" : "px-6 py-6"
          }`}
        >
          <div
            className={`grid gap-4 h-full ${
              isMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"
            }`}
          >
            {!isMobile && (
              <div className="w-full bg-muted h-full overflow-y-scroll hide-scroll">
                {resumeData ? (
                  <div className="w-full bg-white rounded-md shadow-md p-6">
                    <SelectedTemplate resumeData={resumeData} />
                  </div>
                ) : (
                  <div className="w-full flex justify-center py-6">
                    <ResumeSkeleton />
                  </div>
                )}
              </div>
            )}

            <div className="h-full">
              <ResumeOptimizer />
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="cover-letter"
          className="h-full bg-muted overflow-hidden rounded-md px-4"
        >
          <CoverLetter />
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { Skeleton } from "@/components/ui/skeleton";

type ResumeBuilderSkeletonProps = {
  isMobile?: boolean;
};

export function ResumeBuilderSkeleton({
  isMobile = false,
}: ResumeBuilderSkeletonProps) {
  return (
    <div className="h-full flex flex-col">
      {/* ================= Header ================= */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Back button */}
            <Skeleton className="h-9 w-9 rounded-full" />

            {/* Title */}
            <Skeleton className="h-6 w-40" />

            {/* Tabs (desktop) */}
            {!isMobile && (
              <div className="flex gap-2 ml-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-28 rounded-md" />
                ))}
              </div>
            )}

            {/* Select (mobile) */}
            {isMobile && <Skeleton className="h-8 w-32 rounded-md" />}
          </div>

          {/* Download button */}
          {!isMobile && <Skeleton className="h-9 w-36 rounded-md" />}
        </div>
      </header>

      {/* ================= Content ================= */}
      <div
        className={`flex-1 overflow-hidden ${
          isMobile ? "" : "bg-muted px-6 py-6"
        }`}
      >
        <div className="h-full overflow-y-auto hide-scroll">
          {/* Main layout */}
          <div className="flex md:grid grid-cols-[2fr_3fr] gap-4 h-full">
            {/* ================= Editor ================= */}
            <div className="h-full space-y-4">
              {/* Section title */}
              <Skeleton className="h-8 w-1/3" />

              {/* Form fields */}
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-md" />
              ))}
            </div>

            {/* ================= Preview (desktop only) ================= */}
            {!isMobile && (
              <div className="sticky top-24 h-full overflow-y-auto hide-scroll">
                <Skeleton className="w-full min-h-screen rounded-md" />
              </div>
            )}
          </div>

          {/* ================= Templates Grid ================= */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border border-border bg-background"
              >
                <Skeleton className="h-[420px] w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-9 w-full rounded-md" />
                </div>
              </div>
            ))}
          </div>

          {/* ================= Analysis / Optimizer ================= */}
          <div
            className={`mt-8 grid gap-6 ${
              isMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"
            }`}
          >
            {!isMobile && <Skeleton className="min-h-[500px] rounded-md" />}

            <div className="space-y-4">
              <Skeleton className="h-6 w-1/3" />
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-md" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
