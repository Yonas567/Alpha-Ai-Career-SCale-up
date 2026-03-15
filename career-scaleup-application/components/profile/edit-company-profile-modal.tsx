"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { User } from "@/app/types";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import axios from "axios";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

interface EditProfileModalProps {
  isOpen: boolean;
  user: User;
}

export default function EditCompanyProfileModal({
  isOpen,
  user,
}: EditProfileModalProps) {
  const { recruiterJobs, seekerApplications, ...rest } = user;
  const [formData, setFormData] = useState({ ...rest });

  const queryClient = useQueryClient();

  const handleChange = (field: keyof User, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateProfile = useMutation({
    mutationFn: async (formData: any) => {
      return await axios.patch("/api/profile", {
        ...formData,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">Edit Profile</DialogTitle>
      </DialogHeader>

      <div className="space-y-6 max-h-[60vh] overflow-y-auto">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wider">
            Personal Information
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-sm font-medium">
                Company Name
              </Label>
              <Input
                id="fullName"
                value={formData.companyName || ""}
                onChange={(e) => handleChange("companyName", e.target.value)}
                placeholder="Your company name"
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profession" className="text-sm font-medium">
                Professional Title
              </Label>
              <Input
                id="profession"
                value={formData.profession || ""}
                onChange={(e) => handleChange("profession", e.target.value)}
                placeholder="e.g., Senior Developer"
                className="rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="your@email.com"
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-sm font-medium">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber || ""}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="website" className="text-sm font-medium">
                Website / Portfolio
              </Label>
              <Input
                id="website"
                value={formData.website || ""}
                onChange={(e) => handleChange("website", e.target.value)}
                placeholder="https://yourportfolio.com"
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry" className="text-sm font-medium">
                Location
              </Label>
              <Input
                id="location"
                value={formData.location || ""}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="e.g., Maryland"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-border/50" />

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wider">
            Company Description
          </h3>

          <div className="space-y-2">
            <Label htmlFor="summary" className="text-sm font-medium">
              Company Description
            </Label>
            <Textarea
              id="summary"
              value={formData.companyDescription || ""}
              onChange={(e) =>
                handleChange("companyDescription", e.target.value)
              }
              placeholder="Tell potential clients about your expertise and experience..."
              className="min-h-24 rounded-lg resize-none"
            />
          </div>
        </div>
      </div>

      <DialogFooter className="gap-2 pt-4 border-t border-border/50">
        <DialogClose asChild>
          <Button
            type="submit"
            className="rounded-lg"
            onClick={() => updateProfile.mutate(formData)}
          >
            Save Changes
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
