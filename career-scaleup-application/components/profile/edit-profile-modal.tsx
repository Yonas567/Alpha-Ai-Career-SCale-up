"use client";

import { User } from "@/app/types";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface EditProfileModalProps {
  isOpen: boolean;
  user: User;
}

export function EditProfileModal({ isOpen, user }: EditProfileModalProps) {
  const [formData, setFormData] = useState(user);

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
    <DialogContent className="sm:max-w-2xl bg-card/95 dark:bg-card/80 backdrop-blur-xl border-primary/10 shadow-glow">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Edit Profile</DialogTitle>
      </DialogHeader>

      <div className="space-y-6 max-h-[60vh] overflow-y-auto">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wider">
            Personal Information
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                placeholder="Your full name"
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
              <Label htmlFor="location" className="text-sm font-medium">
                Location
              </Label>
              <Input
                id="location"
                value={formData.location || ""}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="e.g.: Pasadena"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-primary/10" />

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wider">
            Professional Details
          </h3>

          <div className="space-y-2">
            <Label htmlFor="summary" className="text-sm font-medium">
              Professional Summary
            </Label>
            <Textarea
              id="summary"
              value={formData.summary || ""}
              onChange={(e) => handleChange("summary", e.target.value)}
              placeholder="Tell potential clients about your expertise and experience..."
              className="min-h-24 rounded-lg resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience" className="text-sm font-medium">
              Experience
            </Label>
            <Textarea
              id="experience"
              value={formData.experience || ""}
              onChange={(e) => handleChange("experience", e.target.value)}
              placeholder="Describe your professional experience..."
              className="min-h-24 rounded-lg resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="education" className="text-sm font-medium">
              Education
            </Label>
            <Textarea
              id="education"
              value={formData.education || ""}
              onChange={(e) => handleChange("education", e.target.value)}
              placeholder="Add your educational background..."
              className="min-h-24 rounded-lg resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills" className="text-sm font-medium">
              Skills (comma separated)
            </Label>
            <Textarea
              id="skills"
              value={formData.skills.join(", ")}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  skills: e.target.value.split(",").map((s) => s.trim()),
                }))
              }
              placeholder="e.g., React, TypeScript, Web Design, UI/UX"
              className="min-h-20 rounded-lg resize-none"
            />
          </div>
        </div>
      </div>

      <DialogFooter className="gap-2 pt-4 border-t border-primary/10">
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
