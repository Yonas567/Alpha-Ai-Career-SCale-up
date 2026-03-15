import { useState } from "react";
import { Plus, Trash2, FolderKanban, X, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { OnboardingData } from "./page";
import { Project } from "../types";

interface ProjectsStepProps {
  data: OnboardingData;
  onAddProject: (project: Omit<Project, "userId">) => void;
  onRemoveProject: (id: string) => void;
}

interface ProjectFormData {
  projectName: string;
  description: string;
  technologies: string[];
  techInput: string;
}

const initialFormData: ProjectFormData = {
  projectName: "",
  description: "",
  technologies: [],
  techInput: "",
};

export const ProjectsStep = ({
  data,
  onAddProject,
  onRemoveProject,
}: ProjectsStepProps) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData);

  const handleAddTech = () => {
    if (
      formData.techInput.trim() &&
      !formData.technologies.includes(formData.techInput.trim())
    ) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, formData.techInput.trim()],
        techInput: "",
      });
    }
  };

  const handleRemoveTech = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTech();
    }
  };

  const handleSubmit = () => {
    if (formData.projectName.trim()) {
      const project: Omit<Project, "userId"> = {
        id: crypto.randomUUID(),
        projectName: formData.projectName.trim(),
        description: formData.description.trim(),
        technologies: formData.technologies,
      };
      onAddProject(project);
      setFormData(initialFormData);
      setShowForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Projects & Portfolio
        </h2>
        <p className="text-muted-foreground">
          Showcase your best work and personal projects
        </p>
      </div>

      {/* Projects List */}
      {data.projects.length > 0 && (
        <div className="space-y-3">
          {data.projects.map((project) => (
            <div
              key={project.id}
              className="p-4 bg-muted/50 rounded-xl border border-border group hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FolderKanban className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-medium text-foreground">
                      {project.projectName}
                    </h4>
                    {project.description && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {project.description}
                      </p>
                    )}
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveProject(project.id)}
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
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Project Name *
            </label>
            <div className="relative">
              <FolderKanban className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" />
              <input
                type="text"
                placeholder="e.g., E-commerce Platform"
                value={formData.projectName}
                onChange={(e) =>
                  setFormData({ ...formData, projectName: e.target.value })
                }
                className="input-field pl-10 text-sm focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-4 h-4 text-blue-600" />
              <textarea
                placeholder="Describe what you built and your role..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="input-field pl-10 resize-none text-sm focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Technologies Used
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a technology..."
                value={formData.techInput}
                onChange={(e) =>
                  setFormData({ ...formData, techInput: e.target.value })
                }
                onKeyDown={handleKeyDown}
                className="input-field flex-1 text-sm focus:ring-blue-600"
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="px-4 py-3 bg-blue-600 text-primary-foreground rounded-lg hover:bg-blue-600/90 transition-colors"
              >
                <Plus className="w-5 h-5 " />
              </button>
            </div>
            {formData.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-lg"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(tech)}
                      className="hover:text-destructive transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
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
              disabled={!formData.projectName.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Add Project
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
          Add Project
        </button>
      )}

      {data.projects.length === 0 && !showForm && (
        <p className="text-center text-sm text-muted-foreground">
          No projects added yet. This step is optional.
        </p>
      )}
    </div>
  );
};
