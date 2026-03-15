"use client";

import { jobApi } from "@/app/api/job";
import { CreateJobModalProps, CreateJobDto } from "@/app/types";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { IconLoader2, IconTrash } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function CreateJobModal({ onClose }: CreateJobModalProps) {
  const queryClient = useQueryClient();

  const [jobData, setJobData] = useState<CreateJobDto>({
    title: "",
    jobType: "",
    workType: "Onsite",
    description: "",
    hourlyRate: 0,
    fixedBudget: 0,
    salaryMin: 0,
    salaryMax: 0,
    location: "",
    country: "",
    qualifications: [""],
    benefits: [""],
    responsibilities: [""],
  });

  const createJob = useMutation({
    mutationFn: () => jobApi.createJob(jobData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruiterJobs"] });
      onClose();
    },
  });

  const handleChange = (field: keyof CreateJobDto, value: any) => {
    setJobData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (
    field: keyof Pick<
      CreateJobDto,
      "qualifications" | "benefits" | "responsibilities"
    >,
    index: number,
    value: string
  ) => {
    const newArr = [...jobData[field]];
    newArr[index] = value;
    setJobData((prev) => ({ ...prev, [field]: newArr }));
  };

  const addArrayItem = (
    field: keyof Pick<
      CreateJobDto,
      "qualifications" | "benefits" | "responsibilities"
    >
  ) => {
    setJobData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (
    field: keyof Pick<
      CreateJobDto,
      "qualifications" | "benefits" | "responsibilities"
    >,
    index: number
  ) => {
    setJobData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  return (
    <DialogContent className="rounded-2xl h-[90%] overflow-y-scroll hide-scroll p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createJob.mutate();
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold tracking-tight">
            Create New Job
          </DialogTitle>
        </DialogHeader>

        <FieldGroup className="space-y-4 mt-4">
          <Field>
            <FieldLabel>Job Title</FieldLabel>
            <Input
              placeholder="Ex: Senior Frontend Developer"
              value={jobData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel>Job Type</FieldLabel>
              <Input
                placeholder="Full-time / Contract / Internship"
                value={jobData.jobType}
                onChange={(e) => handleChange("jobType", e.target.value)}
                required
              />
            </Field>

            <Field>
              <FieldLabel>Work Type</FieldLabel>
              <Select
                value={jobData.workType}
                onValueChange={(val) => handleChange("workType", val)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Work Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Onsite">Onsite</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
        </FieldGroup>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <Field>
            <FieldLabel>Hourly Rate (Optional)</FieldLabel>
            <Input
              type="number"
              placeholder="Ex: 500"
              value={jobData.hourlyRate}
              onChange={(e) =>
                handleChange("hourlyRate", Number(e.target.value))
              }
            />
          </Field>

          <Field>
            <FieldLabel>Fixed Budget (Optional)</FieldLabel>
            <Input
              type="number"
              placeholder="Ex: 1200"
              value={jobData.fixedBudget}
              onChange={(e) =>
                handleChange("fixedBudget", Number(e.target.value))
              }
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <Field>
            <FieldLabel>Salary Min (Optional)</FieldLabel>
            <Input
              type="number"
              placeholder="Ex: 5000"
              value={jobData.salaryMin}
              onChange={(e) =>
                handleChange("salaryMin", Number(e.target.value))
              }
            />
          </Field>

          <Field>
            <FieldLabel>Salary Max (Optional)</FieldLabel>
            <Input
              type="number"
              placeholder="Ex: 8000"
              value={jobData.salaryMax}
              onChange={(e) =>
                handleChange("salaryMax", Number(e.target.value))
              }
            />
          </Field>
        </div>

        <FieldGroup className="space-y-4 mt-4">
          <Field>
            <FieldLabel>City / Location</FieldLabel>
            <Input
              placeholder="Ex: Washington"
              value={jobData.location}
              onChange={(e) => handleChange("location", e.target.value)}
            />
          </Field>

          <Field>
            <FieldLabel>Country</FieldLabel>
            <Input
              placeholder="Ex: United States"
              value={jobData.country}
              onChange={(e) => handleChange("country", e.target.value)}
            />
          </Field>
        </FieldGroup>

        {(["qualifications", "benefits", "responsibilities"] as const).map(
          (field) => (
            <Field key={field} className="mt-4">
              <FieldLabel>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </FieldLabel>
              {jobData[field].map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <Input
                    placeholder={`${field} #${idx + 1}`}
                    value={item}
                    onChange={(e) =>
                      handleArrayChange(field, idx, e.target.value)
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeArrayItem(field, idx)}
                  >
                    <IconTrash />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                onClick={() => addArrayItem(field)}
              >
                Add {field.slice(0, -1)}
              </Button>
            </Field>
          )
        )}

        <Field className="mt-4">
          <FieldLabel>Description</FieldLabel>
          <Textarea
            rows={4}
            placeholder="Describe the job role..."
            value={jobData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            required
          />
        </Field>

        <DialogFooter className="mt-6">
          <Button
            type="submit"
            className="rounded-xl px-4 bg-blue-500 hover:bg-blue-600"
            disabled={createJob.isPending}
          >
            {createJob.isPending ? (
              <div className="flex items-center gap-2">
                <IconLoader2 className="animate-spin" />
                <div>Creating Job</div>
              </div>
            ) : (
              "Create Job"
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
