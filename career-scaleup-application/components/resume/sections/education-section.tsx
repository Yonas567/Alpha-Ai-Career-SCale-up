"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../../ui/button";
import { EducationSectionProps } from "@/app/types";
import { Card } from "../../ui/card";

export default function EducationForm({
  data,
  setEntryData,
}: EducationSectionProps) {
  return (
    <div className="w-full space-y-4">
      {data.map((edu) => (
        <Card
          key={edu.id}
          className="p-4 hover:shadow-custom-md transition-smooth shadow-none"
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-foreground">
                {edu.institution || "School/University"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {edu.degree || "Degree"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(edu.startDate).toLocaleDateString()} -
                {new Date(edu.endDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEntryData("educations", edu)}
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
