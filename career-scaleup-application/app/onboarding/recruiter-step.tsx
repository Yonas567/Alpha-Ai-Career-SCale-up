import { Building2, FileText, Globe, Factory, Camera } from "lucide-react";
import { OnboardingData } from "./page";

interface RecruiterStepProps {
  data: OnboardingData;
  onChange: (field: keyof OnboardingData, value: string) => void;
}

export const RecruiterStep = ({ data, onChange }: RecruiterStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Company Information
        </h2>
        <p className="text-muted-foreground">
          Tell job seekers about your company and what makes it great
        </p>
      </div>

      <div className="grid gap-5">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Company Name
          </label>
          <div className="relative">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
            <input
              type="text"
              placeholder="Your company name"
              value={data.companyName}
              onChange={(e) => onChange("companyName", e.target.value)}
              className="input-field pl-12 focus:ring-blue-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Industry
          </label>
          <div className="relative">
            <Factory className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
            <select
              value={data.industry}
              onChange={(e) => onChange("industry", e.target.value)}
              className="input-field pl-12 appearance-none cursor-pointer focus:ring-blue-600"
            >
              <option value="">Select industry</option>
              <option value="technology">Technology</option>
              <option value="finance">Finance & Banking</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="retail">Retail & E-commerce</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="consulting">Consulting</option>
              <option value="media">Media & Entertainment</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Company Website
          </label>
          <div className="relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
            <input
              type="url"
              placeholder="https://yourcompany.com"
              value={data.website}
              onChange={(e) => onChange("website", e.target.value)}
              className="input-field pl-12 focus:ring-blue-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Company Description
          </label>
          <div className="relative">
            <FileText className="absolute left-4 top-4 w-5 h-5 text-blue-600" />
            <textarea
              placeholder="Describe your company culture, mission, and what makes it a great place to work..."
              value={data.companyDescription}
              onChange={(e) => onChange("companyDescription", e.target.value)}
              rows={5}
              className="input-field pl-12 resize-none focus:ring-blue-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
