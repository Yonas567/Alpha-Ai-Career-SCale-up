"use client";

import { Trash2, Plus, Eye, GripVertical, Pencil } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Field,
  FieldContent,
  FieldTitle,
  FieldDescription,
} from "../../ui/field";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { AwardSectionProps, LanguagesSectionProps } from "@/app/types";
import { Card } from "../../ui/card";

export default function LanguagesSection({
  data,
  setEntryData,
}: LanguagesSectionProps) {
  return (
    <div className="w-full space-y-4">
      {data.map((language, index) => (
        <Card
          key={index}
          className="p-4 hover:shadow-custom-md transition-smooth shadow-none"
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-foreground">
                {language.name || "Language Name"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language.proficiency || "Proficiency Level"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEntryData("languages", language)}
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
