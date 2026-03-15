import { MapPin, Phone, FileText } from "lucide-react";
import { OnboardingData } from "./page";
import AvatarUpload from "@/components/upload-image";

interface BasicInfoStepProps {
  id?: string;
  data: OnboardingData;
  onChange: (field: keyof OnboardingData, value: string) => void;
}

export const BasicInfoStep = ({ id, data, onChange }: BasicInfoStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Let's start with the basics
        </h2>
        <p className="text-muted-foreground">
          Tell us a bit about yourself to help create your profile
        </p>
      </div>

      <AvatarUpload userId={id || ""} onChange={onChange} />

      <div className="grid gap-5">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={data.phoneNumber}
              onChange={(e) => onChange("phoneNumber", e.target.value)}
              className="input-field pl-12 focus:ring-blue-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
            <input
              type="text"
              placeholder="City, Country"
              value={data.location}
              onChange={(e) => onChange("location", e.target.value)}
              className="input-field pl-12 focus:ring-blue-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Short Bio
          </label>
          <div className="relative">
            <FileText className="absolute left-4 top-4 w-5 h-5 text-blue-600" />
            <textarea
              placeholder="Write a brief introduction about yourself..."
              value={data.bio}
              onChange={(e) => onChange("bio", e.target.value)}
              rows={4}
              className="input-field pl-12 resize-none focus:ring-blue-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
