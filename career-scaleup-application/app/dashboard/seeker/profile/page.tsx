"use client";

import { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Globe, MapPin, Edit2, ChevronDown, Share2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import ProfileSkeleton from "@/components/profile/skeleton/profile-skeleton";
import { User } from "@/app/types";
import { EditProfileModal } from "@/components/profile/edit-profile-modal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AvatarUpload from "@/components/upload-image";
import { OnboardingData } from "@/app/onboarding/page";
import { useRouter } from "next/navigation";

const SKILLS_DISPLAY_LIMIT = 6;

export default function Me() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const fetchProfile = async () => {
    const response = await axios.get("/api/profile");
    return response.data as User;
  };

  const {
    data: user,
    isPending,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [expandedSkills, setExpandedSkills] = useState(false);

  const uploadProfilePicture = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/api/profile/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setUploading(false);
    },
    onError: () => {
      setUploading(false);
    },
  });
  const handleSharePortfolio = () => {
    const email = "ahadugirma12@gmail.com";
    router.push(`/portfolio/${encodeURIComponent(email)}`);
  };

  const handleChange = (
    field: keyof OnboardingData,
    value: string | string[]
  ) => {
    // setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (isPending) {
    return (
      <main className="h-full bg-muted">
        <div className="h-full overflow-y-scroll hide-scroll">
          <ProfileSkeleton />;
        </div>
      </main>
    );
  }
  if (error) {
    return <>{error.message}</>;
  }

  const visibleSkills = expandedSkills
    ? user.skills
    : user.skills.slice(0, SKILLS_DISPLAY_LIMIT);
  const hiddenSkillsCount = Math.max(
    0,
    user.skills.length - SKILLS_DISPLAY_LIMIT
  );

  return (
    <main className="h-full bg-white dark:bg-black">
      <div className="h-full overflow-y-scroll hide-scroll">
        <Dialog>
          <div className="w-full h-full space-y-4">
            <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-black">
              <div className="absolute inset-0 bg-white dark:bg-black" />
              <div className="relative px-5 py-4 sm:px-6 sm:py-5">
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
                  <div className="shadow-lg">
                    <AvatarUpload userId={user.id} onChange={handleChange} />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
                      <div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                          {user.fullName}
                        </h1>
                        {user.profession && (
                          <p className="text-lg sm:text-xl text-primary font-semibold mt-2">
                            {user.profession}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            onClick={() => setEditProfileOpen(true)}
                            className="gap-2 rounded-lg bg-[#4d32fb] hover:bg-[#4d32fb]/90 text-white transition-all whitespace-nowrap border-0"
                          >
                            <Edit2 className="w-4 h-4" />
                            Edit Profile
                          </Button>
                        </DialogTrigger>
                        <Button
                          size="sm"
                          onClick={handleSharePortfolio}
                          className="gap-2 rounded-lg bg-[#4d32fb] hover:bg-[#4d32fb]/90 text-white transition-all whitespace-nowrap border-0"
                        >
                          <Share2 className="w-4 h-4" />
                          Share Portfolio
                        </Button>
                      </div>
                    </div>

                    {user.location && (
                      <div className="flex items-center gap-2 text-foreground/70">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm font-medium">
                          {user.location}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-0 pt-8 border-t-0">
                  <a className="group p-4 rounded-lg bg-white dark:bg-black hover:bg-[#4d32fb] hover:text-white dark:hover:bg-[#4d32fb] dark:hover:text-white transition-all duration-300 cursor-pointer">
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Email
                        </p>
                        <p className="text-sm font-medium truncate text-foreground mt-1">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </a>

                  {user.phoneNumber && (
                    <a className="group p-4 rounded-lg bg-white dark:bg-black hover:bg-[#4d32fb] hover:text-white dark:hover:bg-[#4d32fb] dark:hover:text-white transition-all duration-300 cursor-pointer">
                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Phone
                          </p>
                          <p className="text-sm font-medium truncate mt-1">
                            {user.phoneNumber}
                          </p>
                        </div>
                      </div>
                    </a>
                  )}

                  {user.website && (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-4 rounded-lg bg-white dark:bg-black hover:bg-[#4d32fb] hover:text-white dark:hover:bg-[#4d32fb] dark:hover:text-white transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <Globe className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Portfolio
                          </p>
                          <p className="text-sm font-medium truncate mt-1">
                            {user.website}
                          </p>
                        </div>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="lg:col-span-2 space-y-6">
                {user.summary && (
                  <div className="group rounded-2xl transition-all duration-300 bg-white dark:bg-black relative overflow-hidden">
                    <div className="relative p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-6 rounded-full bg-[#4d32fb]" />
                        <h2 className="text-xl font-bold text-foreground">
                          Summary
                        </h2>
                      </div>
                      <p className="text-foreground/80 leading-relaxed text-base sm:text-[15px] text-pretty pl-4">
                        {user.summary}
                      </p>
                    </div>
                  </div>
                )}

                {user.experience && (
                  <div className="group rounded-2xl transition-all duration-300 bg-white dark:bg-black relative overflow-hidden">
                    <div className="relative p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-6 rounded-full bg-[#4d32fb]" />
                        <h2 className="text-xl font-bold text-foreground">
                          Experience
                        </h2>
                      </div>
                      <div className="flex items-baseline gap-3 pl-4">
                        <span className="text-5xl sm:text-6xl font-bold text-[#4d32fb]">
                          {user.experience}
                        </span>
                        <span className="text-foreground/70 font-medium text-base sm:text-lg">
                          years of experience
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {user.education && (
                  <div className="group rounded-2xl transition-all duration-300 bg-white dark:bg-black relative overflow-hidden">
                    <div className="relative p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-6 rounded-full bg-[#4d32fb]" />
                        <h2 className="text-xl font-bold text-foreground">
                          Education
                        </h2>
                      </div>
                      <div className="space-y-3 pl-4">
                        {user.education.split("\n").map(
                          (line: any, idx: any) =>
                            line.trim() && (
                              <div
                                key={idx}
                                className="flex items-start gap-4 py-3 first:pt-0 last:pb-0"
                              >
                                <div className="w-2.5 h-2.5 rounded-full bg-[#4d32fb] mt-1.5 flex-shrink-0" />
                                <p className="text-foreground/80 text-sm sm:text-base leading-relaxed flex-1">
                                  {line.trim()}
                                </p>
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                {user.skills && user.skills.length > 0 && (
                  <div className="rounded-xl p-6 bg-white dark:bg-black sticky top-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white dark:bg-black" />
                    <div className="relative">
                      <div className="flex items-start justify-between gap-4 mb-5">
                        <h2 className="text-lg font-semibold text-foreground">
                          Skills
                        </h2>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {visibleSkills.map((skill: any, index: any) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-black text-[#4d32fb] hover:bg-[#4d32fb] hover:text-white dark:hover:bg-[#4d32fb] dark:hover:text-white transition-all rounded-full"
                          >
                            {skill}
                          </Badge>
                        ))}

                        {hiddenSkillsCount > 0 && !expandedSkills && (
                          <button
                            onClick={() => setExpandedSkills(true)}
                            className="px-3 py-1.5 text-xs font-medium rounded-full border-0 hover:bg-primary/5 transition-colors flex items-center gap-1 text-primary"
                          >
                            <span>+{hiddenSkillsCount} more</span>
                            <ChevronDown className="w-3 h-3" />
                          </button>
                        )}

                        {expandedSkills && hiddenSkillsCount > 0 && (
                          <button
                            onClick={() => setExpandedSkills(false)}
                            className="px-3 py-1.5 text-xs font-medium rounded-full border-0 hover:bg-primary/5 transition-colors flex items-center gap-1 text-primary"
                          >
                            <span>Show less</span>
                            <ChevronDown className="w-3 h-3 rotate-180" />
                          </button>
                        )}
                      </div>

                      <p className="text-xs text-muted-foreground mt-4 pt-4 border-t-0">
                        {user.skills.length} skill
                        {user.skills.length !== 1 ? "s" : ""} total
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <EditProfileModal isOpen={editProfileOpen} user={user} />
        </Dialog>
      </div>
    </main>
  );
}
