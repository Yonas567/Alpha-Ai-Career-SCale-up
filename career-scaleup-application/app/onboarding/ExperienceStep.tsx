import { useState } from "react";
import { Plus, Trash2, Building2, Briefcase, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Experience } from "../types";
import { OnboardingData } from "./page";
import { Select } from "@/components/ui/select";

interface ExperienceStepProps {
  data: OnboardingData;
  onAddExperience: (experience: Omit<Experience, "userId">) => void;
  onRemoveExperience: (id: string) => void;
}

interface ExperienceFormData {
  position: string;
  companyName: string;
  startDate: string;
  endDate: string;
  description: string;
  isCurrent: boolean;
}

const initialFormData: ExperienceFormData = {
  position: "",
  companyName: "",
  startDate: "",
  endDate: "",
  description: "",
  isCurrent: false,
};

export const ExperienceStep = ({
  data,
  onAddExperience,
  onRemoveExperience,
}: ExperienceStepProps) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ExperienceFormData>(initialFormData);

  const handleSubmit = () => {
    if (
      formData.position.trim() &&
      formData.companyName.trim() &&
      formData.startDate
    ) {
      const experience: Omit<Experience, "userId"> = {
        id: crypto.randomUUID(),
        position: formData.position.trim(),
        companyName: formData.companyName.trim(),
        startDate: new Date(formData.startDate),
        endDate: formData.isCurrent
          ? null
          : formData.endDate
          ? new Date(formData.endDate)
          : null,
        description: formData.description.trim(),
      };
      onAddExperience(experience);
      setFormData(initialFormData);
      setShowForm(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Work Experience
        </h2>
        <p className="text-muted-foreground">
          Add your professional experience to stand out to employers
        </p>
      </div>

      {data.experiences.length > 0 && (
        <div className="space-y-3">
          {data.experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-4 bg-muted/50 rounded-xl border border-border group hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-medium text-foreground">
                      {exp.position}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {exp.companyName}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(exp.startDate)} -{" "}
                      {exp.endDate ? formatDate(exp.endDate) : "Present"}
                    </p>
                    {exp.description && (
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveExperience(exp.id)}
                  className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4 text-blue-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm ? (
        <div className="p-5 bg-muted/30 rounded-xl border border-border space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Position *
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" />
                <input
                  type="text"
                  placeholder="e.g., Senior Developer"
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  className="input-field pl-10 text-sm focus:ring-blue-600"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Company *
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" />
                <input
                  type="text"
                  placeholder="e.g., Tech Corp"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  className="input-field pl-10 text-sm focus:ring-blue-600"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Start Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" />
                <input
                  type="month"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  className="input-field pl-10 text-sm focus:ring-blue-600"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                End Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" />
                <input
                  type="month"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  disabled={formData.isCurrent}
                  className="input-field pl-10 text-sm disabled:opacity-50"
                />
              </div>
              <label className="flex items-center gap-2 mt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isCurrent}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isCurrent: e.target.checked,
                      endDate: "",
                    })
                  }
                  className="w-4 h-4 rounded border-border text-primary focus:ring-blue-600"
                />
                <span className="text-sm text-muted-foreground">
                  I currently work here
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              placeholder="Describe your responsibilities and achievements..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="input-field resize-none text-sm focus:ring-blue-600"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowForm(false);
                setFormData(initialFormData);
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={
                !formData.position.trim() ||
                !formData.companyName.trim() ||
                !formData.startDate
              }
              className="flex-1 bg-blue-600 hover:bg-blue-70"
            >
              Add Experience
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="w-full p-4 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:border-blue-600 hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Experience
        </button>
      )}

      {data.experiences.length === 0 && !showForm && (
        <p className="text-center text-sm text-muted-foreground">
          No experience added yet. This step is optional.
        </p>
      )}
    </div>
  );
};
