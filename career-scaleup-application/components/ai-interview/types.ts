export type ResumeSource = "upload" | "dashboard" | "linkedin";

export interface ResumeOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  isSelected?: boolean;
}

export interface AddResumeStepProps {
  onContinue: (source: ResumeSource, file?: File) => void;
}
