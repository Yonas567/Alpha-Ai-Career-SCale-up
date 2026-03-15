"use client ";

import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../../ui/button";
import { ProjectsSectionProps } from "@/app/types";
import { Card } from "../../ui/card";

export default function ProjectsSection({
  data,
  setEntryData,
}: ProjectsSectionProps) {
  return (
    <div className="w-full space-y-4">
      {data.map((project) => (
        <Card
          key={project.id}
          className="p-4 hover:shadow-custom-md transition-smooth shadow-none"
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-foreground">{project.name}</h4>
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(project.startDate).toLocaleDateString()} -
                {new Date(project.endDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEntryData("projects", project)}
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
