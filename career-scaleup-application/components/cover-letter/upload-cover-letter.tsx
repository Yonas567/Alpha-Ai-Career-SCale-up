"use client";

import { useRef, useState, useEffect } from "react";
import { IconUpload, IconFileText, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { CoverLetterDTO } from "./cover-letter-preview";
import CoverLetterApi from "@/app/api/cover-letter";

type UploadedFile = {
  file: File;
};

type Props = {
  onUploaded: (data: Partial<CoverLetterDTO>) => void;
};

export default function UploadCoverLetter({ onUploaded }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploaded, setUploaded] = useState<UploadedFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileSelect = (file?: File) => {
    if (!file) return;

    if (
      ![
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type)
    ) {
      alert("Only PDF or DOCX files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    setUploaded({ file });
  };

  useEffect(() => {
    if (uploaded) {
      uploadFile(uploaded.file);
    }
  }, [uploaded]);

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setProgress(0);

    try {
      const response = await CoverLetterApi.uploadCoverLetter(file, (percent) =>
        setProgress(percent)
      );
      onUploaded(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(0)} KB`;
    }
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Upload Cover Letter</h3>
        <p className="text-sm text-muted-foreground">
          Upload an existing PDF or DOCX cover letter.
        </p>
      </div>

      {!uploaded && (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFileSelect(e.dataTransfer.files[0]);
          }}
          className={`cursor-pointer border-2 border-dashed rounded-lg p-10 text-center transition
            ${
              isDragging
                ? "border-indigo-600 bg-indigo-50/40"
                : "border-border hover:border-indigo-600"
            }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx"
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files?.[0])}
          />

          <div className="flex flex-col items-center gap-3">
            <IconUpload className="w-8 h-8 text-muted-foreground" />
            <p className="text-sm font-medium">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">
              PDF or DOCX · Max 5MB
            </p>
          </div>
        </div>
      )}

      {uploaded && (
        <div className="border rounded-lg p-4 bg-card space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IconFileText className="w-6 h-6 text-indigo-600" />
              <div>
                <p className="text-sm font-medium">{uploaded.file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(uploaded.file.size)} ·{" "}
                  {uploaded.file.type.includes("pdf") ? "PDF" : "DOCX"}
                </p>
              </div>
            </div>

            {!isUploading && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setUploaded(null)}
              >
                <IconX className="w-4 h-4" />
              </Button>
            )}
          </div>

          {isUploading && (
            <div className="space-y-1">
              <div className="h-2 w-full bg-muted rounded overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground text-right">
                Uploading… {progress}%
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
