"use client";

import {
  SkillsSectionProps,
} from "@/app/types";

export default function SkillsSection({
  data,
  setEntryData,
}: SkillsSectionProps) {

  return (
    <div className="space-y-4">
      {/* {data.map((skill, index) => (
        <div
          key={skill.id}
          className="flex items-center justify-between p-4 bg-background border border-border rounded-lg transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <GripVertical className="text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">
                {skill.name || "Skill Name"}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {skill.issuer || "Issuer"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEntryData("certifications", certificate)}
              className="h-8 w-8 p-0"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))} */}
    </div>
  );
}
