"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IconFileText,
  IconSparkles,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { resumeApi } from "@/app/api/resume";
import CoverLetterApi from "@/app/api/cover-letter";
import { CoverLetterDTO, CoverLetterPreview } from "./cover-letter-preview";
import CoverLetterSkeleton from "./skeleton/cover-letter-skeleton";
import CoverLetterInfo from "./cover-letter-info";
import { useSearchParams } from "next/navigation";
import { Job, ResumeData } from "@/app/types";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { CoverLetterPDF } from "./template-pdfs/cover-letter-pdf";

export default function GenerateCoverLetter() {
  const searchParams = useSearchParams();
  const coverLetterId = searchParams.get("coverLetterId");
  const fetchSavedJobs = async () => {
    const response = await axios.get("/api/job/saved");
    return response.data as Job[];
  };
  const { data: savedJobs } = useQuery({
    queryKey: ["savedJobs"],
    queryFn: fetchSavedJobs,
  });
  const { data: resumes } = useQuery({
    queryKey: ["resumes"],
    queryFn: resumeApi.getResumes,
  });
  const { data: coverLetters } = useQuery({
    queryKey: ["coverLetter"],
    queryFn: CoverLetterApi.getCoverLetters,
  });
  const [mode, setMode] = useState<"mode-1" | "mode-2">("mode-1");
  const [selectedResume, setSelectedResume] = useState<ResumeData>();
  const [selectedJob, setSelectedJob] = useState<Job>();
  const [manualFields, setManualFields] = useState({
    jobTitle: "",
    company: "",
    jobDescription: "",
  });
  const [previewContent, setPreviewContent] = useState<CoverLetterDTO>();
  useEffect(() => {
    if (!coverLetterId || !coverLetters) return;
    const match = coverLetters.find((c) => c.id === coverLetterId);
    setPreviewContent(match ?? undefined);
  }, [coverLetterId, coverLetters]);
  const generateCoverLetter = useMutation({
    mutationFn: () => {
      if (!selectedResume) return Promise.reject("Resume not selected");
      if (mode === "mode-1") {
        return CoverLetterApi.generateCoverLetter("mode-1", {
          resume: selectedResume,
          job: selectedJob,
          company: manualFields.company,
        });
      }
      return CoverLetterApi.generateCoverLetter("mode-2", {
        resume: selectedResume,
        company: manualFields.company,
        jobTitle: manualFields.jobTitle,
        jobDescription: manualFields.jobDescription,
      });
    },
    onSuccess: (data) => setPreviewContent(data),
  });
  const SelectResume = (
    <div className="space-y-2">
      <Label>Select Resume</Label>
      <Select
        value={selectedResume?.id ?? ""}
        onValueChange={(id) =>
          setSelectedResume(resumes?.find((r) => r.id === id))
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Choose a resume" />
        </SelectTrigger>
        <SelectContent>
          {resumes?.map((r) => (
            <SelectItem key={r.id} value={r.id}>
              {r.basics.fullName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
  const SelectJob = (
    <div className="space-y-2">
      <Label>Select Job</Label>
      <Select
        value={selectedJob?.id ?? ""}
        onValueChange={(id) =>
          setSelectedJob(savedJobs?.find((j) => j.id === id))
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Choose a saved job" />
        </SelectTrigger>
        <SelectContent>
          {savedJobs?.map((job) => (
            <SelectItem key={job.id} value={job.id}>
              {job.title} — {job.companyName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full w-full text-foreground ">
      <div className="space-y-8">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <IconSparkles />
          <span>Generate Cover Letter using our AI</span>
        </div>
        <div className="flex gap-2">
          <Button
            variant={mode === "mode-1" ? "default" : "outline"}
            onClick={() => setMode("mode-1")}
          >
            Automatic
          </Button>
          <Button
            variant={mode === "mode-2" ? "default" : "outline"}
            onClick={() => setMode("mode-2")}
          >
            Manual Entry
          </Button>
        </div>
        {mode === "mode-1" && (
          <div className="flex flex-col space-y-4">
            <div className="space-y-6 border border-border bg-card rounded-lg p-6">
              {SelectResume}
              {SelectJob}
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 mt-4"
                onClick={() => generateCoverLetter.mutate()}
                disabled={generateCoverLetter.isPending}
              >
                Generate Cover Letter
              </Button>
            </div>
          </div>
        )}
        {mode === "mode-2" && (
          <div className="space-y-6 border border-border bg-card rounded-lg p-6">
            {SelectResume}
            <div className="space-y-2">
              <Label>Job Title</Label>
              <Input
                value={manualFields.jobTitle}
                onChange={(e) =>
                  setManualFields({ ...manualFields, jobTitle: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Company</Label>
              <Input
                value={manualFields.company}
                onChange={(e) =>
                  setManualFields({ ...manualFields, company: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Job Description</Label>
              <Textarea
                rows={5}
                value={manualFields.jobDescription}
                onChange={(e) =>
                  setManualFields({
                    ...manualFields,
                    jobDescription: e.target.value,
                  })
                }
              />
            </div>
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 mt-4"
              onClick={() => generateCoverLetter.mutate()}
              disabled={generateCoverLetter.isPending}
            >
              Generate Cover Letter
            </Button>
          </div>
        )}
      </div>
      <div className="flex flex-col h-full overflow-hidden">
        {previewContent && (
          <PDFDownloadLink
            document={<CoverLetterPDF data={previewContent} />}
            fileName="cover-letter.pdf"
          >
            {({ loading }) => (
              <Button className="mb-4 w-full gap-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white">
                <span className="hidden sm:inline">
                  {loading ? "Generating..." : "Download"}
                </span>
              </Button>
            )}
          </PDFDownloadLink>
        )}
        <div className="h-full overflow-y-scroll hide-scroll">
          {generateCoverLetter.isPending ? (
            <CoverLetterSkeleton />
          ) : previewContent ? (
            <CoverLetterPreview data={previewContent} />
          ) : (
            <CoverLetterInfo />
          )}
        </div>
      </div>
    </div>
  );
}
