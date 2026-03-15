"use client";

import { applicationsApi, ApplicationStatus } from "@/app/api/application";
import { Job, User } from "@/app/types";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

import FormProgress from "./form-progress";
import ContactInfoStep from "./contact-info-step";
import ResumeStep from "./resume-step";
import ApplicationReview from "./application-review";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export interface EasyApplyStep {
  id: string;
  label: string;
}

export interface EasyApplyModalProps {
  job: Job;
  open: boolean;
  setOpen: () => void;
}

export default function EasyApplyModal({
  job,
  open,
  setOpen,
}: EasyApplyModalProps) {
  const fetchProfile = async () => {
    const res = await axios.get("/api/profile");
    return res.data as User;
  };

  const { data: user } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    staleTime: Infinity,
  });

  const steps: EasyApplyStep[] = [
    { id: "contact", label: "Contact Info" },
    { id: "resume", label: "Resume" },
    { id: "review", label: "Review" },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const initialFormState = {
    phone: "",
    email: "",
    resume: { id: "", title: "" },
    coverLetter: { id: "", title: "" },
    includeCoverLetter: false,
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (!open) return;

    setCurrentStep(0);
  }, [open, job.id, user]);

  const handleInputChange = useCallback((e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleCheckboxChange = useCallback((checked: boolean) => {
    setFormData((prev) => ({ ...prev, includeCoverLetter: checked }));
  }, []);

  const handleResumeSelect = useCallback(
    (resume: { id: string; title: string }) => {
      setFormData((prev) => ({ ...prev, resume }));
    },
    []
  );

  const handleCoverLetterSelect = useCallback(
    (coverLetter: { id: string; title: string }) => {
      setFormData((prev) => ({ ...prev, coverLetter }));
    },
    []
  );

  const handleNext = () =>
    currentStep < steps.length - 1 && setCurrentStep((s) => s + 1);
  const handleBack = () => currentStep > 0 && setCurrentStep((s) => s - 1);

  const createApplication = useMutation({
    mutationFn: ({
      jobId,
      seekerId,
      status,
      coverLetter,
      resumeUrl,
    }: {
      jobId: string;
      seekerId: string;
      status: ApplicationStatus;
      coverLetter?: string;
      resumeUrl?: string;
    }) =>
      applicationsApi.createApplication({
        jobId,
        seekerId,
        status,
        coverLetter,
        resumeUrl,
      }),

    onSuccess: () => setOpen(),
  });

  const handleSubmit = () => {
    createApplication.mutate({
      jobId: job.id,
      seekerId: user?.id ?? "",
      status: "Applied",
      coverLetter: formData.coverLetter.id,
      resumeUrl: formData.resume.id,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="px-6 py-3">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-semibold">{job.title}</h3>
            <p className="text-xs text-muted-foreground">
              {job.companyName} • {job.location}
            </p>
          </div>
        </DialogHeader>

        <div className="sticky top-0 py-0 flex justify-center z-40">
          <FormProgress currentStep={currentStep} steps={steps} />
        </div>

        <div className="overflow-y-scroll max-h-[55vh] hide-scroll px-6">
          <div className="max-w-lg mx-auto">
            {currentStep === 0 && (
              <ContactInfoStep
                formData={formData}
                onChange={handleInputChange}
              />
            )}

            {currentStep === 1 && (
              <ResumeStep
                formData={formData}
                onChange={handleInputChange}
                onCheckboxChange={handleCheckboxChange}
                onResumeSelect={handleResumeSelect}
                onCoverLetterSelect={handleCoverLetterSelect}
              />
            )}

            {currentStep === 2 && <ApplicationReview formData={formData} />}
          </div>
        </div>

        <div className="flex justify-between p-6 border-t bg-background">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="px-6 bg-transparent"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button
              onClick={handleSubmit}
              className="px-8 bg-blue-500 hover:bg-blue-600"
              disabled={createApplication.isPending}
            >
              {createApplication.isPending
                ? "Submitting..."
                : "Submit Application"}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="px-8 bg-blue-500 hover:bg-blue-600"
            >
              Next
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
