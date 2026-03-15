"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Loader2,
  Plus,
  X,
} from "lucide-react";
import { useDashboardContext } from "../context/DashboardContext";
import { Experience, Project, Role } from "../types";
import { CompleteStep } from "./CompleteStep";
import { BasicInfoStep } from "./BasicInfoStep";
import { JobSeekerStep } from "./job-seeker-step";
import { RecruiterStep } from "./recruiter-step";
import { StepIndicator } from "./StepIndicator";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { roleMap } from "../constants";
import { ExperienceStep } from "./ExperienceStep";
import { ProjectsStep } from "./ProjectStep";

export interface OnboardingData {
  phoneNumber: string;
  location: string;
  bio: string;
  profilePicture: string;
  logoUrl: string;

  profession: string;
  education: string;
  experience: string;
  summary: string;
  skills: string[];

  companyName: string;
  companyDescription: string;
  industry: string;
  website: string;

  experiences: FormExperience[];
  projects: FormProject[];
}
type FormExperience = Omit<Experience, "userId">;
type FormProject = Omit<Project, "userId">;

const getSteps = (role: Role) => {
  if (role === Role.Seeker) {
    return [
      { id: 1, title: "Basic Info" },
      { id: 2, title: "Professional" },
      { id: 3, title: "Experience" },
      { id: 4, title: "Projects" },
      { id: 5, title: "Complete" },
    ];
  }
  return [
    { id: 1, title: "Basic Info" },
    { id: 2, title: "Company" },
    { id: 3, title: "Complete" },
  ];
};

export default function OnboardingPage() {
  const { id, fullName, role } = useDashboardContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const route = useRouter();

  const [formData, setFormData] = useState<OnboardingData>({
    phoneNumber: "",
    location: "",
    bio: "",
    profession: "",
    education: "",
    experience: "",
    summary: "",
    skills: [],
    companyName: "",
    companyDescription: "",
    industry: "",
    website: "",
    experiences: [],
    projects: [],
    profilePicture: "",
    logoUrl: "",
  });

  const steps = getSteps(role);
  const totalSteps = steps.length;

  const handleChange = (
    field: keyof OnboardingData,
    value: string | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateProfile = useMutation({
    mutationFn: async (formData: any) => {
      return await axios.patch("/api/profile", {
        ...formData,
      });
    },
  });

  const completeOnboarding = useMutation({
    mutationFn: async () => {
      return await axios.post("/api/profile/onboarding");
    },
  });

  const handleAddExperience = (experience: Omit<Experience, "userId">) => {
    setFormData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, experience],
    }));
  };

  const handleRemoveExperience = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  };

  const handleAddProject = (project: Omit<Project, "userId">) => {
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, project],
    }));
  };

  const handleRemoveProject = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const handleNext = async () => {
    if (currentStep === totalSteps - 1) {
      setIsSubmitting(true);

      const payload = {
        ...formData,
        experiences: formData.experiences.map(({ id, ...exp }) => exp),
        projects: formData.projects.map(({ id, ...proj }) => proj),
      };

      await updateProfile.mutate(payload);
      await completeOnboarding.mutate();
      setIsSubmitting(false);
      setCurrentStep(currentStep + 1);
    } else if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    route.push(roleMap[role] || "/");
  };

  const isStepValid = () => {
    if (currentStep === 1) {
      return formData.location.trim() !== "";
    }
    if (currentStep === 2) {
      if (role === Role.Seeker) {
        return formData.profession.trim() !== "";
      }
      return formData.companyName.trim() !== "";
    }
    return true;
  };

  const renderStep = () => {
    if (currentStep === totalSteps) {
      return <CompleteStep role={role} fullName={fullName} />;
    }

    if (currentStep === 1) {
      return <BasicInfoStep data={formData} id={id} onChange={handleChange} />;
    }

    if (role === Role.Seeker) {
      if (currentStep === 2) {
        return <JobSeekerStep data={formData} onChange={handleChange} />;
      }
      if (currentStep === 3) {
        return (
          <ExperienceStep
            data={formData}
            onAddExperience={handleAddExperience}
            onRemoveExperience={handleRemoveExperience}
          />
        );
      }
      if (currentStep === 4) {
        return (
          <ProjectsStep
            data={formData}
            onAddProject={handleAddProject}
            onRemoveProject={handleRemoveProject}
          />
        );
      }
    }

    return <RecruiterStep data={formData} onChange={handleChange} />;
  };

  return (
    <div className="bg-muted min-h-screen flex flex-col">
      <header className="border-b border-border bg-card">
        <div className="container max-w-4xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-white" />
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-semibold">CareerScaleUp</span>
                <span className="text-xs text-muted-foreground hidden sm:block">
                  {role === Role.Seeker
                    ? "Find Your Dream Job"
                    : "Find Best Talents"}
                </span>
              </div>
            </div>

            <span className="block text-sm text-muted-foreground">
              Welcome, {fullName}
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-2xl mx-auto px-4 pt-2 pb-4 sm:py-12">
        <StepIndicator steps={steps} currentStep={currentStep} />

        <div className="onboarding-card">
          {renderStep()}

          <div className="flex items-center justify-between  pt-6 border-border">
            {currentStep > 1 && currentStep < totalSteps ? (
              <Button variant="ghost" onClick={handleBack} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            ) : (
              <div />
            )}

            {currentStep < totalSteps ? (
              <Button
                onClick={handleNext}
                disabled={!isStepValid() || isSubmitting}
                className="gap-2 ml-auto bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : currentStep === totalSteps - 1 ? (
                  "Complete Setup"
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={handleFinish}
                className="gap-2 ml-auto bg-blue-600 hover:bg-blue-700"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {currentStep < totalSteps && (
          <p className="text-center mt-6 text-sm text-muted-foreground">
            You can always update this later in your{" "}
            <button className="text-primary hover:underline">
              profile settings
            </button>
          </p>
        )}
      </main>
    </div>
  );
}
