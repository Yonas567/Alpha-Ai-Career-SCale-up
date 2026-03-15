interface ApplicationReviewProps {
  formData: {
    phone: string;
    email: string;
    resume: {
      id: string;
      title: string;
    };
    coverLetter: {
      id: string;
      title: string;
    };
    includeCoverLetter: boolean;
  };
}

export default function ApplicationReview({
  formData,
}: ApplicationReviewProps) {

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">
          Review Your Application
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Please review your application details before submitting. You won’t be
          able to edit them after submission.
        </p>
      </div>

      <div className="space-y-6">
        <ReviewSection title="Contact Information">
          <ReviewItem label="Email" value={formData.email} />
          <ReviewItem label="Phone" value={formData.phone} />
        </ReviewSection>

        <ReviewSection title="Resume">
          <ReviewItem
            label="Resume"
            value={formData.resume.title || "Selected from profile"}
          />
        </ReviewSection>

        {formData.includeCoverLetter && (
          <ReviewSection title="Cover Letter">
            <ReviewItem
              label="Cover Letter"
              value={formData.coverLetter.title || "Selected from profile"}
            />
          </ReviewSection>
        )}
      </div>
    </div>
  );
}

function ReviewSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h3 className="font-medium text-sm text-foreground">{title}</h3>
      <div className="space-y-3 bg-muted/40 border border-border rounded-xl p-4">
        {children}
      </div>
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground">{label}</span>

      <span className="text-sm font-medium text-foreground break-words leading-relaxed">
        {value || "—"}
      </span>
    </div>
  );
}
