import CoverLetterApi from "@/app/api/cover-letter";
import { resumeApi } from "@/app/api/resume";
import { ResumeData } from "@/app/types";
import { CoverLetterDTO } from "@/components/cover-letter/cover-letter-preview";
import UploadCoverLetter from "@/components/cover-letter/upload-cover-letter";
import UploadResume from "@/components/resume/upload-resume";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useQuery } from "@tanstack/react-query";

export default function ResumeStep({
  formData,
  onChange,
  onCheckboxChange,
  onResumeSelect,
  onCoverLetterSelect,
}: {
  formData: any;
  onChange: (e: any) => void;
  onCheckboxChange: (checked: boolean) => void;
  onResumeSelect: (resume: { id: string; title: string }) => void;
  onCoverLetterSelect: (coverLetter: { id: string; title: string }) => void;
}) {
  const {
    data: resumes,
    isLoading: isLoadingResumes,
    isError: isErrorResumes,
  } = useQuery({
    queryKey: ["resumes"],
    queryFn: resumeApi.getResumes,
  });

  const {
    data: coverLetters,
    isLoading: isLoadingCoverLetters,
    isError: isErrorCoverLetters,
  } = useQuery({
    queryKey: ["coverLetters"],
    queryFn: CoverLetterApi.getCoverLetters,
  });

  const handleCoverLetterUploaded = (data: Partial<CoverLetterDTO>) => {
    alert(data.id);
    onCoverLetterSelect({ id: data.id!, title: data.title! });
  };

  const handleResumeUploaded = (data: Partial<ResumeData>) => {
    const resumeId = data.id || "";
    const resumeTitle = data.basics?.fullName || "";

    onResumeSelect({ id: resumeId, title: resumeTitle });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-6">Resume</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Upload your resume or select one from your profile.
        </p>
      </div>

      <div className="space-y-4">
        <UploadResume onUploaded={handleResumeUploaded} />

        {resumes && resumes?.length > 0 && (
          <div className="bg-muted/50 border border-border rounded-lg p-4">
            <h3 className="text-sm font-medium text-foreground mb-3">
              Or use a saved resume from your profile:
            </h3>

            {isLoadingResumes && <p className="text-xs">Loading resumes...</p>}
            {isErrorResumes && (
              <p className="text-xs text-red-500">Failed to load resumes</p>
            )}

            {resumes && resumes.length > 0 && (
              <RadioGroup
                value={formData.resumeSelected}
                onValueChange={(id) => {
                  const selectedResume = resumes.find((r) => r.id === id);
                  if (selectedResume) {
                    onResumeSelect({
                      id: selectedResume.id,
                      title: selectedResume.basics.fullName,
                    });
                  }
                }}
              >
                {resumes.map((r) => (
                  <div
                    key={r.id}
                    className={`flex items-center space-x-2 p-3 border rounded-lg transition-all cursor-pointer ${
                      formData.resumeSelected === r.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/75"
                    }`}
                  >
                    <RadioGroupItem value={r.id} id={r.id} />
                    <Label htmlFor={r.id} className="flex-1 cursor-pointer">
                      <div className="font-medium text-foreground">
                        {r?.basics?.fullName}
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="include-cover-letter"
            checked={formData.includeCoverLetter}
            onCheckedChange={onCheckboxChange}
          />
          <Label
            htmlFor="include-cover-letter"
            className="text-sm font-medium text-foreground cursor-pointer"
          >
            Include a cover letter (optional)
          </Label>
        </div>

        {formData.includeCoverLetter && (
          <div className="space-y-4">
            <UploadCoverLetter onUploaded={handleCoverLetterUploaded} />

            {coverLetters && coverLetters.length > 0 && (
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h3 className="text-sm font-medium text-foreground mb-3">
                  Or use a saved cover letter from your profile:
                </h3>

                {isLoadingCoverLetters && (
                  <p className="text-xs">Loading cover letters...</p>
                )}
                {isErrorCoverLetters && (
                  <p className="text-xs text-red-500">
                    Failed to load cover letters
                  </p>
                )}

                {coverLetters && coverLetters.length > 0 && (
                  <RadioGroup
                    value={formData.coverLetter.id}
                    onValueChange={(id) => {
                      const selectedCoverLetter = coverLetters.find(
                        (c: any) => c.id === id
                      );
                      if (selectedCoverLetter) {
                        onCoverLetterSelect({
                          id: selectedCoverLetter.id,
                          title: selectedCoverLetter.title,
                        });
                      }
                    }}
                  >
                    {coverLetters.map((c: any) => (
                      <div
                        key={c.id}
                        className={`flex items-center space-x-2 p-3 border rounded-lg transition-all cursor-pointer ${
                          formData.coverLetter === c.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:bg-muted/75"
                        }`}
                      >
                        <RadioGroupItem value={c.id} id={c.id} />
                        <Label htmlFor={c.id} className="flex-1 cursor-pointer">
                          <div className="font-medium text-foreground">
                            {c.title}
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
