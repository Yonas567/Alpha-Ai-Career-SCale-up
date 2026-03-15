"use client";

import { Job } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import UploadCoverLetter from "./upload-cover-letter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { CoverLetterDTO, CoverLetterPreview } from "./cover-letter-preview";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { CoverLetterPDF } from "./template-pdfs/cover-letter-pdf";
import CoverLetterApi from "@/app/api/cover-letter";

export default function OptimizeCoverLetter() {
  const [selectedJob, setSelectedJob] = useState<Job>();
  const [company, setCompany] = useState<string>("");
  const [coverLetter, setCoverLetter] = useState<Partial<CoverLetterDTO>>({});

  const fetchSavedJobs = async () => {
    const response = await axios.get("/api/job/saved");
    return response.data as Job[];
  };
  const { data: savedJobs } = useQuery({
    queryKey: ["savedJobs"],
    queryFn: fetchSavedJobs,
  });

  const handleCoverLetterUploaded = (data: Partial<CoverLetterDTO>) => {
    setCoverLetter(data);
  };

  const handleOptimizeCoverLetter = async (
    coverLetter: Partial<CoverLetterDTO>,
    job: Job,
    company: string
  ) => {
    const optimizedCoverLetter = await CoverLetterApi.optimizeCoverLetter(
      coverLetter,
      job,
      company
    );

    setCoverLetter(optimizedCoverLetter);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full h-full overflow-y-scroll hide-scroll">
      <div className="flex-1 flex flex-col gap-4 bg-card p-4 rounded-2xl shadow-md h-full">
        <h2 className="text-xl md:text-2xl font-bold">
          Optimize Your Cover Letter
        </h2>
        <p className="text-sm text-muted-foreground mb-2">
          Select a saved job to tailor your cover letter. Upload your existing
          cover letter.
        </p>
        <UploadCoverLetter onUploaded={handleCoverLetterUploaded} />
        <div className="flex justify-between gap-4">
          <div className="space-y-2 w-full">
            <Label>Select a Job</Label>
            <Select
              value={selectedJob?.id ?? ""}
              onValueChange={(id) =>
                setSelectedJob(savedJobs?.find((j) => j.id === id))
              }
            >
              <SelectTrigger className="w-full">
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
          <div className="space-y-2 w-full">
            <Label>Company</Label>
            <Input
              placeholder="Enter your company here"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
              }}
            />
          </div>
        </div>
        <Button
          className="w-full bg-indigo-600 hover:bg-indigo-700 mt-2"
          disabled={!coverLetter || !selectedJob || !company}
          onClick={() =>
            handleOptimizeCoverLetter(
              coverLetter,
              selectedJob!,
              "Example Company"
            )
          }
        >
          Optimize
        </Button>
      </div>

      <div className="flex-1 flex flex-col gap-2 bg-card p-4 rounded-2xl shadow-md mt-4 md:mt-0 h-full">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">Preview</h3>
          <PDFDownloadLink
            document={<CoverLetterPDF data={coverLetter} />}
            fileName="cover-letter.pdf"
          >
            {({ loading }) => (
              <Button className="mb-4 w-full gap-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white">
                <span className="hidden sm:inline">
                  {loading ? "Generating..." : "Download Cover Letter"}
                </span>
              </Button>
            )}
          </PDFDownloadLink>
        </div>
        <div className="flex-1 border border-border rounded-lg p-2 bg-card overflow-y-auto whitespace-pre-wrap text-sm h-full">
          {coverLetter ? (
            <CoverLetterPreview data={coverLetter} />
          ) : (
            <p className="text-muted-foreground">
              No cover letter uploaded yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
