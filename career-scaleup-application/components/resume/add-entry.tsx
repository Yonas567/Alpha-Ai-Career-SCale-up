import { AddEntryProps, ResumeData } from "@/app/types";
import { useResumeManager } from "@/context/ResumeManagerProvider";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { sectionFields } from "@/app/constants";

export default function AddEntry({
  sectionId,
  entry,
  setIsAddingEntry,
}: AddEntryProps) {
  const [form, setForm] = useState<any>(entry || {});
  const mode = entry ? "edit" : "add";
  const { setResumeData, editEntity, addEntity } = useResumeManager();

  const formatDateForInput = (dateStr?: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleChange = (key: string, value: any, type?: string) => {
    setForm((prev: any) => {
      let newValue = value;

      if (type === "date") {
        newValue = value ? new Date(value).toISOString() : "";
      } else if (type === "textarea" || type === "multiline") {
        const existingValue = prev[key];
        if (Array.isArray(existingValue)) {
          newValue = value.split("\n").filter(Boolean);
        }
      }

      return { ...prev, [key]: newValue };
    });
  };

  const handleDone = async () => {
    const id = form.id || crypto.randomUUID();

    const arrayKeys = [
      "achievements",
      "technologies",
      "details",
      "highlights",
      "languages",
      "frameworks",
      "databases",
      "tools",
      "other",
    ];

    const normalizedForm = Object.fromEntries(
      Object.entries(form).map(([key, value]) => {
        if (arrayKeys.includes(key)) {
          if (Array.isArray(value)) return [key, value];
          if (typeof value === "string" && value.trim() !== "")
            return [key, [value.trim()]];
        }
        return [key, value];
      })
    );

    setResumeData((prev) => {
      if (!prev) return prev;
      const currentSection = prev[sectionId];

      if (Array.isArray(currentSection)) {
        const index = currentSection.findIndex((item: any) => item.id === id);
        const updated =
          index !== -1
            ? currentSection.map((item, i) =>
                i === index ? { ...normalizedForm, id } : item
              )
            : [...currentSection, { ...normalizedForm, id }];
        return { ...prev, [sectionId]: updated };
      }

      if (typeof currentSection === "object" && currentSection !== null) {
        return {
          ...prev,
          [sectionId]: { ...currentSection, ...normalizedForm },
        };
      }

      return prev;
    });

    setIsAddingEntry(false);

    if (mode === "edit") {
      editEntity(id, sectionId, normalizedForm);
    } else {
      addEntity.mutate({ id, section: sectionId, data: normalizedForm });
    }
  };

  const handleDelete = () => {
    setResumeData((prev) => {
      if (!prev) return prev;
      const currentSection = prev[sectionId as keyof ResumeData];

      if (Array.isArray(currentSection)) {
        return {
          ...prev,
          [sectionId]: currentSection.filter(
            (item: any) => item.id !== form.id
          ),
        };
      }

      if (typeof currentSection === "object" && currentSection !== null) {
        const cleared = Object.fromEntries(
          Object.keys(currentSection).map((key) => [key, ""])
        );
        return { ...prev, [sectionId]: cleared };
      }

      return prev;
    });

    setIsAddingEntry(false);
  };

  return (
    <div className="w-full bg-background rounded-2xl p-6 md:p-8 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          {entry ? "Edit Entry" : "Add Entry"}
        </h2>
        {entry?.id && (
          <Button variant="ghost" onClick={handleDelete}>
            <Trash2 className="w-5 h-5 text-destructive" />
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {sectionFields[sectionId].map((field) => {
          const value = form[field.key];
          const displayValue =
            field.type === "date"
              ? formatDateForInput(value)
              : Array.isArray(value)
              ? value.join("\n")
              : typeof value === "string"
              ? value
              : "";

          return field.type === "textarea" || field.multiline ? (
            <div key={field.key}>
              <label className="block text-sm font-semibold mb-1">
                {field.label}
              </label>
              <Textarea
                value={displayValue}
                onChange={(e) =>
                  handleChange(field.key, e.target.value, "multiline")
                }
                rows={field.multiline ? 4 : 2}
                className="w-full border border-border rounded-lg shadow-none bg-muted-foreground/10 resize-none"
              />
            </div>
          ) : (
            <div key={field.key}>
              <label className="block text-sm font-semibold mb-1">
                {field.label}
              </label>
              <Input
                type={field.type || "text"}
                value={displayValue}
                onChange={(e) =>
                  handleChange(field.key, e.target.value, field.type)
                }
                placeholder={field.placeholder || ""}
                className="w-full shadow-none bg-muted-foreground/10 border-0 h-10"
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-6">
        <Button
          onClick={handleDone}
          className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white px-12 h-12 text-base font-semibold rounded-full"
        >
          Done
        </Button>
      </div>
    </div>
  );
}
