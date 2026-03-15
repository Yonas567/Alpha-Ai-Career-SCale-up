"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../../ui/button";
import { AwardSectionProps } from "@/app/types";
import { Card } from "../../ui/card";

export default function AwardsSection({
  data,
  setEntryData,
}: AwardSectionProps) {
  return (
    <div className="w-full space-y-4">
      {data.map((award, index) => (
        <Card
          key={award.id}
          className="p-4 hover:shadow-custom-md transition-smooth shadow-none"
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-foreground">
                {award.title || "Award Title"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {award.issuer || "Organization"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(award.year).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEntryData("awards", award)}
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
