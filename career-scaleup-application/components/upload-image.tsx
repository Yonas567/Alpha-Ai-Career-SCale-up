"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { OnboardingData } from "@/app/onboarding/page";
import { supabase } from "@/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  userId: string;
  size?: number;
  onChange: (field: keyof OnboardingData, value: string) => void;
};

export default function AvatarUpload({ userId, size = 120, onChange }: Props) {
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const fileName = `user_${userId}.jpg`;

  const updateProfile = useMutation({
    mutationFn: async (profilePicture: string) => {
      return axios.patch("/api/profile", { profilePicture });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
  });

  const loadImage = () => {
    const { data } = supabase.storage.from("profile").getPublicUrl(fileName);

    if (!data?.publicUrl) return;

    const url = `${data.publicUrl}?t=${Date.now()}`;
    setImageUrl(url);
    onChange("profilePicture", url);
  };

  useEffect(() => {
    loadImage();
  }, [fileName]);

  const uploadImage = async (file: File) => {
    setUploading(true);

    const { error } = await supabase.storage
      .from("profile")
      .upload(fileName, file, {
        upsert: true,
        cacheControl: "3600",
        contentType: file.type,
      });

    if (error) {
      console.error("Upload failed:", error.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("profile").getPublicUrl(fileName);

    if (data?.publicUrl) {
      const url = `${data.publicUrl}?t=${Date.now()}`;
      setImageUrl(url);
      onChange("profilePicture", url);
      updateProfile.mutate(url);
    }

    setUploading(false);
  };

  return (
    <div className="flex justify-center">
      <div
        className="relative group cursor-pointer"
        style={{ width: 120, height: 120 }}
        onClick={() => !uploading && inputRef.current?.click()}
      >
        <Avatar
          className="w-full h-full rounded-md overflow-hidden"
          style={{ opacity: uploading ? 0.6 : 1 }}
        >
          <AvatarImage
            src={imageUrl || "/placeholder-avatar.png"}
            alt="Profile"
            className="object-cover"
          />
        </Avatar>

        <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/40 opacity-0 group-hover:opacity-100 transition">
          {uploading ? (
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          ) : (
            <Camera className="w-8 h-8 text-white" />
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files && uploadImage(e.target.files[0])}
        />
      </div>
    </div>
  );
}
