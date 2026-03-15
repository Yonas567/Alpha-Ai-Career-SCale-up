import { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { FileText } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useResumeManager } from "@/context/ResumeManagerProvider";
import UploadResume from "./upload-resume";
import { ResumeData } from "@/app/types";

interface CreateResumeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateResumeModal({
  open,
  onOpenChange,
}: CreateResumeModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { uploadProgress, isUploading, uploadResume, createResume } =
    useResumeManager();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (validTypes.includes(file.type)) {
        const formData = new FormData();
        formData.append("file", file);

        const id = await uploadResume(formData);
        if (id) {
          router.push(`/dashboard/seeker/create-resume/${id}`);
        }
      }
    }
  };
  const handleResumeUploaded = (data: Partial<ResumeData>) => {
    if (data.id) {
      router.push(`/dashboard/seeker/create-resume/${data.id}`);
    }
  };

  const handleCreateFromScratch = async () => {
    const createdResume = await createResume();
    if (createdResume?.id) {
      router.push(`/dashboard/seeker/create-resume/${createdResume.id}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Resume</DialogTitle>
          <DialogDescription>
            Choose how you'd like to create your resume
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <UploadResume onUploaded={handleResumeUploaded} />
          <Button
            variant="ghost"
            className="flex flex-col h-full p-6 border border-border hover:border-indigo-700"
            onClick={handleCreateFromScratch}
          >
            <div className="p-3 bg-primary/10 rounded-lg  transition-colors mb-3">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">
              Create from Scratch
            </h3>
            <p className="text-xs text-muted-foreground text-center">
              Build step by step
            </p>
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileSelect}
          className="hidden"
        />
      </DialogContent>
    </Dialog>
  );
}
