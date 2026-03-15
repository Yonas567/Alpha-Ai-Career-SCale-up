"use client";

import {
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Job } from "@/app/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jobApi } from "@/app/api/job";
import { Button } from "@/components/ui/button";
import { IconLoader2 } from "@tabler/icons-react";

export default function EditJobDialogContent({
  job,
  onClose,
}: {
  job: any;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();

  const [form, setForm] = useState(job);

  const updateField = (key: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };

  const updateArray = (key: string, value: string) => {
    const arr = value.split("\n").filter(Boolean);
    updateField(key, arr);
  };

  const updateJob = useMutation({
    mutationFn: async ({ form }: { form: Job }) =>
      jobApi.editJob(form.id, form),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruiterJobs"] });
      onClose();
    },
  });

  return (
    <DialogContent className="max-w-3xl p-6 rounded-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateJob.mutate({ form });
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-left">
            Edit Job — {job.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto max-h-[70vh] pr-2">
          <section className="space-y-4">
            <div className="grid grid-cols-1  gap-4">
              <div className="space-y-2">
                <Label>Job Title</Label>
                <Input
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="Frontend Developer"
                />
              </div>

              <div className="space-y-2">
                <Label>Job Type</Label>
                <Select
                  value={form.jobType}
                  onValueChange={(v) => updateField("jobType", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Work Type</Label>
                <Select
                  value={form.workType}
                  onValueChange={(v) => updateField("workType", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select work type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                    <SelectItem value="Onsite">Onsite</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={form.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder="Pasadena"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Compensation</h3>
            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Min Salary</Label>
                <Input
                  type="number"
                  value={form.salaryMin ?? ""}
                  onChange={(e) =>
                    updateField("salaryMin", Number(e.target.value))
                  }
                  placeholder="500"
                />
              </div>

              <div className="space-y-2">
                <Label>Max Salary</Label>
                <Input
                  type="number"
                  value={form.salaryMax ?? ""}
                  onChange={(e) =>
                    updateField("salaryMax", Number(e.target.value))
                  }
                  placeholder="1000"
                />
              </div>

              <div className="space-y-2">
                <Label>Hourly Rate</Label>
                <Input
                  type="number"
                  value={form.hourlyRate ?? ""}
                  onChange={(e) =>
                    updateField("hourlyRate", Number(e.target.value))
                  }
                  placeholder="25"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Description</h3>
            <Separator />

            <div className="space-y-2">
              <Label>Job Description</Label>
              <Textarea
                rows={5}
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Write the job description..."
                className="resize-none"
              />
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Requirements</h3>
            <Separator />

            <div className="space-y-2">
              <Label>Qualifications (one per line)</Label>
              <Textarea
                rows={4}
                value={form.qualifications?.join("\n")}
                onChange={(e) => updateArray("qualifications", e.target.value)}
                placeholder="Bachelor's degree in CS&#10;3+ years experience"
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label>Responsibilities (one per line)</Label>
              <Textarea
                rows={4}
                value={form.responsibilities?.join("\n")}
                onChange={(e) =>
                  updateArray("responsibilities", e.target.value)
                }
                placeholder="Develop web apps&#10;Collaborate with backend team"
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label>Benefits (one per line)</Label>
              <Textarea
                rows={4}
                value={form.benefits?.join("\n")}
                onChange={(e) => updateArray("benefits", e.target.value)}
                placeholder="Health insurance&#10;Remote work"
                className="resize-none"
              />
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">
              Application Link
            </h3>
            <Separator />

            <div className="space-y-2">
              <Label>Apply URL</Label>
              <Input
                value={form.applicationLink ?? ""}
                onChange={(e) => updateField("applicationLink", e.target.value)}
                placeholder="https://company.com/apply"
              />
            </div>
          </section>
        </div>

        <DialogFooter className="mt-4">
          <Button
            type="submit"
            className="bg-blue-600 text-white hover:bg-blue-700"
            disabled={updateJob.isPending}
          >
            {updateJob.isPending ? (
              <>
                <IconLoader2 className="animate-spin flex items-center justify-center" />{" "}
                "Saving"
              </>
            ) : (
              <>Save Changes</>
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
