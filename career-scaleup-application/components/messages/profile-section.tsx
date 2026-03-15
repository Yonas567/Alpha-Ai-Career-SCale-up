import { Room } from "@/app/api/chat";
import { Role, User } from "@/app/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CoverLetterApi from "@/app/api/cover-letter";
import { resumeApi } from "@/app/api/resume";
import { Download, FileText } from "lucide-react";
import { Button } from "../ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { CoverLetterPDF } from "../cover-letter/template-pdfs/cover-letter-pdf";
import DownloadResumeButton from "../resume/DownloadResume";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ProfileSection({
  room,
  profile,
}: {
  room: Room;
  profile: User;
}) {
  const reciever = room.participants.find(
    (p) => p.user?.id !== profile.id
  )?.user;
  if (!reciever) return null;

  const { data: application } = useQuery({
    queryKey: ["application", room.applicationId],
    queryFn: async () =>
      axios
        .get(`/api/applications/${room.applicationId}`)
        .then((res) => res.data),
  });

  const { data: coverLetter } = useQuery({
    queryKey: ["coverLetter", application?.coverLetter],
    queryFn: async () =>
      CoverLetterApi.getCoverLetterById(application?.coverLetter),
    enabled: !!application?.coverLetter,
  });

  const { data: resume } = useQuery({
    queryKey: ["resume", application?.resumeUrl],
    queryFn: () => resumeApi.getResumeById(application?.resumeUrl),
    enabled: !!application?.resumeUrl,
  });

  const isMobile = useIsMobile();

  return (
    <div
      className={`flex w-full h-full flex-col bg-card overflow-y-scroll hide-scroll ${
        !isMobile ? "rounded-xl" : "rounded-none"
      } border`}
    >
      <div className="border-b px-6 py-6 flex flex-col items-center gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage
            src={reciever.profilePicture || "/placeholder-avatar.png"}
            alt="Profile"
            className="object-cover"
          />
          <AvatarFallback>{reciever.fullName?.[0]}</AvatarFallback>
        </Avatar>

        <div className="text-center space-y-1">
          <p className="text-base font-semibold leading-tight">
            {reciever.fullName || reciever.companyName}
          </p>
          <p className="text-sm text-muted-foreground">
            {reciever.profession || reciever.industry}
          </p>
        </div>
      </div>

      <div className="flex-1 px-6 py-5">
        <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-2">
          About
        </h3>
        <p className="text-sm leading-relaxed text-foreground/90">
          {reciever.summary ||
            reciever.bio ||
            reciever.companyDescription ||
            "No bio available"}
        </p>
      </div>

      {reciever.role === Role.Seeker && (
        <div className="border-t px-6 py-5 space-y-4">
          <h3 className="text-xs font-semibold uppercase text-muted-foreground">
            Documents
          </h3>

          <div className="flex items-center justify-between gap-3 rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-blue-50 p-2">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>

              <div>
                <p className="text-sm font-medium">Resume</p>
                <p className="text-xs text-muted-foreground">PDF / DOCX</p>
              </div>
            </div>

            {resume ? (
              <DownloadResumeButton
                size="compact"
                resumeData={resume}
                buttonType="outline"
              />
            ) : (
              <span className="text-xs text-muted-foreground">
                Not uploaded
              </span>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-green-50 p-2">
                <FileText className="h-4 w-4 text-green-600" />
              </div>

              <div>
                <p className="text-sm font-medium">Cover Letter</p>
                <p className="text-xs text-muted-foreground">PDF / DOCX</p>
              </div>
            </div>

            {coverLetter ? (
              <PDFDownloadLink
                document={<CoverLetterPDF data={coverLetter} />}
                fileName="cover-letter.pdf"
              >
                {({ loading }) => (
                  <Button size="icon" variant="outline" disabled={loading}>
                    <Download className="h-4 w-4" />
                  </Button>
                )}
              </PDFDownloadLink>
            ) : (
              <span className="text-xs text-muted-foreground">
                Not uploaded
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
