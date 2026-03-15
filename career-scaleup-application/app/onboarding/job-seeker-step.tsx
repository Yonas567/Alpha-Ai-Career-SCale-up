import { useState } from "react";
import { Briefcase, GraduationCap, Clock, X, Plus } from "lucide-react";
import { OnboardingData } from "./page";

interface JobSeekerStepProps {
  data: OnboardingData;
  onChange: (field: keyof OnboardingData, value: string | string[]) => void;
}

export const JobSeekerStep = ({ data, onChange }: JobSeekerStepProps) => {
  const [skillInput, setSkillInput] = useState("");

  const handleAddSkill = () => {
    if (skillInput.trim() && !data.skills.includes(skillInput.trim())) {
      onChange("skills", [...data.skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    onChange(
      "skills",
      data.skills.filter((s) => s !== skill)
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Your Professional Profile
        </h2>
        <p className="text-muted-foreground">
          Help employers understand your experience and expertise
        </p>
      </div>

      <div className="grid gap-5">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Current Profession / Title
          </label>
          <div className="relative">
            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
            <input
              type="text"
              placeholder="e.g., Software Engineer, Product Designer"
              value={data.profession}
              onChange={(e) => onChange("profession", e.target.value)}
              className="input-field pl-12 focus:ring-blue-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Highest Education
          </label>
          <div className="relative">
            <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
            <input
              type="text"
              placeholder="e.g., Bachelor's in Computer Science"
              value={data.education}
              onChange={(e) => onChange("education", e.target.value)}
              className="input-field pl-12 focus:ring-blue-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Years of Experience
          </label>
          <div className="relative">
            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />

            <input
              type="text"
              placeholder="Add a number of years of experience..."
              value={data.experience}
              onChange={(e) => onChange("experience", e.target.value)}
              className="input-field flex-1 ring-blue-600 pl-12"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Skills
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add a skill..."
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="input-field flex-1 focus:ring-blue-600"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-3 bg-blue-600 text-primary-foreground rounded-lg hover:bg-blue-600/90 transition-colors"
            >
              <Plus className="w-5 h-5 " />
            </button>
          </div>
          {data.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {data.skills.map((skill) => (
                <span key={skill} className="skill-tag">
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-destructive transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Professional Summary
          </label>
          <textarea
            placeholder="Briefly describe your professional background and career goals..."
            value={data.summary}
            onChange={(e) => onChange("summary", e.target.value)}
            rows={4}
            className="input-field resize-none focus:ring-blue-600"
          />
        </div>
      </div>
    </div>
  );
};
