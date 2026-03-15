"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  BookOpen,
} from "lucide-react";
import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { useResumeManager } from "@/context/ResumeManagerProvider";
import ResumeAnalysisSkeleton from "./skeleton/resume-analysis-skeleton";
import { useQuery } from "@tanstack/react-query";
import { resumeApi } from "@/app/api/resume";

export default function ResumeAnalysis() {
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "skills"
  );
  const { activeResume } = useResumeManager();

  const { data, isPending, error } = useQuery({
    queryKey: ["analysis", activeResume?.id],
    queryFn: () => {
      if (!activeResume) {
        throw new Error("Resume is missing");
      }
      return resumeApi.analyzeResume(activeResume);
    },
    enabled: !!activeResume,

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });

  if (isPending) {
    return <ResumeAnalysisSkeleton />;
  }

  if (error) return null;

  const sections = data.sections;

  const overallScore =
    Object.values(sections).length > 0
      ? Math.round(
          Object.values(sections).reduce(
            (sum: number, s: any) => sum + (s.alignment_score || 0),
            0
          ) / Object.values(sections).length
        )
      : 0;

  const sortedSections = Object.entries(sections).sort(
    ([, a]: any, [, b]: any) => b.alignment_score - a.alignment_score
  );

  return (
    <Card className="flex flex-col bg-muted border-0 shadow-none h-[80vh] rounded-none gap-3 p-0!">
      <div className="px-4 py-4 sm:px-6 sm:py-5 bg-card rounded-md text-primary-foreground shadow-md">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              Resume Analysis
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Detailed alignment against job requirements
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-bold text-foreground">
              {overallScore}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Overall Score</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs sm:text-sm">
          <div className="px-2 py-1.5 rounded border border-blue-600 bg-primary-foreground text-foreground">
            <div className="font-bold">
              {
                Object.values(sections).filter(
                  (s: any) => s.alignment_score >= 6
                ).length
              }
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-500 font-bold">
              Good
            </p>
          </div>
          <div className="px-2 py-1.5 rounded border border-blue-600 bg-primary-foreground text-foreground">
            <div className="font-bold">
              {
                Object.values(sections).filter(
                  (s: any) => s.alignment_score >= 3 && s.alignment_score < 6
                ).length
              }
            </div>
            <p className="text-xs text-amber-600 dark:text-amber-500 font-bold">
              Medium
            </p>
          </div>
          <div className="px-2 py-1.5 rounded border border-blue-600 bg-primary-foreground text-foreground">
            <div className="font-bold">
              {
                Object.values(sections).filter(
                  (s: any) => s.alignment_score < 3
                ).length
              }
            </div>
            <p className="text-xs text-red-600 dark:text-red-500 font-bold">
              Low
            </p>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-1 overflow-y-scroll hide-scroll pt-0 pb-12">
        <div className="space-y-3 sm:py-2">
          {sortedSections.map(([key, section]: any) => (
            <div
              key={key}
              className={` bg-card overflow-hidden rounded-lg border border-border bg-gradient-to-br from-slate-50 to-slate-50/50 dark:from-slate-950/20 dark:to-slate-950/10 transition-all duration-200`}
            >
              <button
                onClick={() =>
                  setExpandedSection(expandedSection === key ? null : key)
                }
                className=" bg-card flex w-full items-center justify-between gap-2 px-3 py-3 sm:px-4 sm:py-4 text-left transition-colors"
              >
                <div className="flex flex-1 items-center gap-2 sm:gap-3 min-w-0">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground capitalize text-sm sm:text-base truncate">
                      {section.section_name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {section.strengths && (
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                          {section.strengths.length} strengths
                        </span>
                      )}
                      {" • "}
                      {section.gaps && (
                        <span className="text-amber-600 dark:text-amber-400 font-medium">
                          {section.gaps.length} gaps
                        </span>
                      )}
                      {" • "}
                      {section.specific_improvements && (
                        <span className="text-blue-600 dark:text-blue-400 font-medium">
                          {section.specific_improvements.length} improvements
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  {section.alignment_score && (
                    <Badge
                      variant="outline"
                      className="shrink-0 border font-semibold text-xs sm:text-sm px-2 sm:px-3 bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-800"
                    >
                      {section.alignment_score}%
                    </Badge>
                  )}
                  <ChevronDown
                    className="h-4 w-4 shrink-0 transition-transform text-muted-foreground"
                    style={{
                      transform:
                        expandedSection === key
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                    }}
                  />
                </div>
              </button>

              {expandedSection === key && (
                <div className="border-t border-border/50 space-y-4 px-3 py-4 sm:px-4 sm:py-5">
                  {section.strengths?.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <h4 className="font-semibold text-sm text-emerald-700 dark:text-emerald-400">
                          Strengths
                        </h4>
                      </div>
                      <ul className="space-y-2 ml-6">
                        {section.strengths.map((s: string, i: number) => (
                          <li
                            key={i}
                            className="text-xs sm:text-sm text-foreground leading-relaxed flex gap-2"
                          >
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
                              •
                            </span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {section.gaps?.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                        <h4 className="font-semibold text-sm text-amber-700 dark:text-amber-400">
                          Gaps
                        </h4>
                      </div>
                      <ul className="space-y-2 ml-6">
                        {section.gaps.map((gap: string, i: number) => (
                          <li
                            key={i}
                            className="text-xs sm:text-sm text-foreground leading-relaxed flex gap-2"
                          >
                            <span className="text-amber-600 dark:text-amber-400 font-bold shrink-0">
                              •
                            </span>
                            <span>{gap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {section.specific_improvements?.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                        <h4 className="font-semibold text-sm text-blue-700 dark:text-blue-400">
                          Recommended Actions
                        </h4>
                      </div>
                      <ul className="space-y-2 ml-6">
                        {section.specific_improvements.map(
                          (imp: string, i: number) => (
                            <li
                              key={i}
                              className="text-xs sm:text-sm text-foreground leading-relaxed flex gap-2"
                            >
                              <span className="text-blue-600 dark:text-blue-400 font-bold shrink-0">
                                •
                              </span>
                              <span>{imp}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {section.optimization_report && (
                    <div className="rounded-lg bg-blue-500/5 border border-blue-200/50 dark:border-blue-900/30 p-3 sm:p-4 space-y-2">
                      <div className="flex gap-2 items-start">
                        <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <p className="font-semibold text-xs sm:text-sm text-blue-700 dark:text-blue-400">
                          Optimization Report
                        </p>
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed text-foreground ml-6 text-justify">
                        {section.optimization_report}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
