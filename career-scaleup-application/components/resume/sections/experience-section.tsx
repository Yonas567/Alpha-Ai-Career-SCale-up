"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../../ui/button";
import { ExperienceSectionProps } from "@/app/types";
import { useResumeManager } from "@/context/ResumeManagerProvider";
import { Card } from "../../ui/card";

export default function ExperienceSection({
  data,
  setEntryData,
}: ExperienceSectionProps) {
  return (
    <div className="w-full space-y-4">
      {data.map((exp) => (
        <Card
          key={exp.id}
          className="p-4 hover:shadow-custom-md transition-smooth shadow-none"
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-foreground">{exp.position}</h4>
              <p className="text-sm text-muted-foreground">
                {exp.company} • {exp.location}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(exp.startDate).toLocaleDateString()} -
                {new Date(exp.endDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEntryData("experiences", exp)}
                className="h-8 w-8"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                // onClick={() => handleDelete(exp.id)}
                className="h-8 w-8 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
