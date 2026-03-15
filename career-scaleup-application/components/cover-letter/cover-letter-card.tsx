import { FileText, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../ui/card";
import { CoverLetterDTO } from "./cover-letter-preview";

export default function CoverLetterCard({
  coverLetter,
}: {
  coverLetter: CoverLetterDTO;
}) {
  const router = useRouter();
  const handleCoverLetterClick = () => {
    if (!coverLetter?.id) return;
    router.push(
      `/dashboard/seeker/cover-letter?coverLetterId=${coverLetter.id}`
    );
  };

  return (
    <Card
      onClick={handleCoverLetterClick}
      className="cursor-pointer rounded-2xl border shadow-sm hover:border-primary/50 transition-all p-5 flex flex-col gap-4 bg-card h-60"
    >
      <div className="flex items-center gap-3">
        <FileText className="w-6 h-6 text-muted-foreground" />
        <h3 className="text-base font-semibold text-foreground">
          {coverLetter.title || "Untitled Cover Letter"}
        </h3>
      </div>

      <CardContent className="p-0 space-y-2">
        {coverLetter.employer.companyName && (
          <p className="text-sm text-muted-foreground">
            Company:{" "}
            <span className="font-medium text-foreground">
              {coverLetter.employer.companyName}
            </span>
          </p>
        )}

        {coverLetter.employer.positionTitle && (
          <p className="text-sm text-muted-foreground">
            Position:{" "}
            <span className="font-medium text-foreground">
              {coverLetter.employer.positionTitle}
            </span>
          </p>
        )}

        {coverLetter.createdAt && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
            <Calendar className="w-4 h-4" />
            {new Date(coverLetter.createdAt).toLocaleDateString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
