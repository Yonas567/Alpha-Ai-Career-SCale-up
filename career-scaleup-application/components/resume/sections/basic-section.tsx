"use client";

import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { BasicsSectionProps, ResumeData } from "@/app/types";
import { useResumeManager } from "@/context/ResumeManagerProvider";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function BasicsSection({ data }: BasicsSectionProps) {
  const { resumeData, setResumeData } = useResumeManager();

  const updateBasicsField = <K extends keyof ResumeData["basics"]>(
    key: K,
    value: ResumeData["basics"][K]
  ) => {
    setResumeData((prev) => ({
      ...prev,
      basics: {
        ...prev.basics,
        [key]: value,
      },
    }));
  };

  const updateBasics = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<ResumeData["basics"]>;
    }) => {
      const res = await axios.patch(`/api/resume`, {
        id,
        section: "basics",
        data,
      });
      return res.data;
    },
  });

  if (!data) return null;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Full Name
        </label>
        <Input
          className="shadow-none bg-muted-foreground/10"
          value={data.fullName}
          onChange={(e) => updateBasicsField("fullName", e.target.value)}
          onBlur={() =>
            updateBasics.mutate({
              id: resumeData.id,
              data: { fullName: resumeData.basics.fullName },
            })
          }
          placeholder="John Doe"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email
          </label>
          <Input
            className="shadow-none bg-muted-foreground/10"
            type="email"
            value={data.email}
            onChange={(e) => updateBasicsField("email", e.target.value)}
            onBlur={() =>
              updateBasics.mutate({
                id: resumeData.id,
                data: { email: resumeData.basics.email },
              })
            }
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Phone
          </label>
          <Input
            className="shadow-none bg-muted-foreground/10"
            value={data.phone}
            onChange={(e) => updateBasicsField("phone", e.target.value)}
            onBlur={() =>
              updateBasics.mutate({
                id: resumeData.id,
                data: { phone: resumeData.basics.phone },
              })
            }
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Location
          </label>
          <Input
            className="shadow-none bg-muted-foreground/10"
            // value={data. .location}
            // onChange={(e) => updatePersonalInfo("location", e.target.value)}
            placeholder="San Francisco, CA"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            LinkedIn
          </label>
          <Input
            className="shadow-none bg-muted-foreground/10"
            value={data.linkedin || ""}
            onChange={(e) => updateBasicsField("linkedin", e.target.value)}
            onBlur={() =>
              updateBasics.mutate({
                id: resumeData.id,
                data: { linkedin: resumeData.basics.linkedin },
              })
            }
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Website
        </label>
        <Input
          className="shadow-none bg-muted-foreground/10"
          value={data.website || ""}
          onChange={(e) => updateBasicsField("website", e.target.value)}
          onBlur={() =>
            updateBasics.mutate({
              id: resumeData.id,
              data: { website: resumeData.basics.website },
            })
          }
          placeholder="johndoe.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Professional Summary
        </label>
        <Textarea
          className="shadow-none bg-muted-foreground/10"
          value={data.summary}
          onChange={(e) => updateBasicsField("summary", e.target.value)}
          onBlur={() =>
            updateBasics.mutate({
              id: resumeData.id,
              data: { summary: resumeData.basics.summary },
            })
          }
          placeholder="Brief overview of your professional background..."
          rows={4}
        />
      </div>
    </div>
  );
}
