import {
  Download,
  FileText,
  Mail,
  MoreHorizontal,
  UserIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { applicationsApi } from "@/app/api/application";
import { Candidate, User } from "@/app/types";
import { ChatApi } from "@/app/api/chat";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { resumeApi } from "@/app/api/resume";
import CoverLetterApi from "@/app/api/cover-letter";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { CoverLetterPDF } from "@/components/cover-letter/template-pdfs/cover-letter-pdf";
import DownloadResumeButton from "@/components/resume/DownloadResume";

const nextStatuses = {
  Applied: ["ShortListed", "Rejected"],
  ShortListed: ["Hired", "Rejected"],
  Rejected: ["Hired", "Applied"],
  Hired: ["ShortListed", "Rejected"],
} as const;

const statusColors = {
  Applied: "bg-blue-500",
  ShortListed: "bg-orange-500",
  Rejected: "bg-red-500",
  Hired: "bg-green-500",
};

export default function CandidateCard({ candidate }: { candidate: Candidate }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const updateApplicationStatus = useMutation({
    mutationFn: ({
      applicationId,
      status,
    }: {
      applicationId: string;
      status: "Applied" | "ShortListed" | "Hired" | "Rejected";
    }) => applicationsApi.updateApplicationStatus(applicationId, status),

    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["recruiterJobs"] }),
  });

  const { data: application } = useQuery({
    queryKey: ["application"],
    queryFn: async () =>
      (await axios.get(`/api/applications/${candidate.applicationId}`)).data,
  });

  const { data: resumeData } = useQuery({
    queryKey: ["resume"],
    queryFn: () => resumeApi.getResumeById(application.resumeUrl),
  });

  const { data: coverLetterData } = useQuery({
    queryKey: ["cover-letter"],
    queryFn: () => CoverLetterApi.getCoverLetterById(application.coverLetter),
  });

  const handleSendMessage = async () => {
    if (!candidate.applicationId || !candidate.seeker?.id) return;
    await ChatApi.createRoom({
      applicationId: candidate.applicationId,
      recruiterId: candidate.recruiter,
      seekerId: candidate.seeker.id,
    });
    router.push(
      `/dashboard/recruiter/messages?roomId=${candidate.applicationId}`
    );
  };

  return (
    <Sheet>
      <Card className="p-4 bg-card rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 rounded-full">
              <AvatarImage src={candidate.seeker.profilePicture || ""} />
              <AvatarFallback className="bg-gray-200  font-semibold">
                {candidate.seeker.profilePicture}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {candidate.seeker.fullName}
              </p>
              <p className="text-gray-500 text-sm">
                {candidate.seeker.profession}
              </p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreHorizontal className="w-3.5 h-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <SheetTrigger asChild>
                <DropdownMenuItem>View profile</DropdownMenuItem>
              </SheetTrigger>
              {nextStatuses[candidate.status].map((s) => (
                <DropdownMenuItem
                  key={s}
                  onClick={() =>
                    updateApplicationStatus.mutate({
                      applicationId: candidate.applicationId,
                      status: s,
                    })
                  }
                >
                  Move to: <span className="font-medium ml-1">{s}</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem onClick={handleSendMessage}>
                Send message
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center justify-end gap-2  text-sm">
          {candidate.status && (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                statusColors[candidate.status]
              }`}
            >
              {candidate.status}
            </span>
          )}
        </div>
      </Card>

      <SheetContent
        side="right"
        className="w-full sm:max-w-md overflow-y-auto px-6"
      >
        <SheetHeader className="pb-4 border-b">
          <SheetTitle className="text-lg font-semibold">
            Candidate Profile
          </SheetTitle>
          <SheetDescription className="text-sm">
            Review candidate details and submitted documents
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={candidate.seeker.profilePicture || ""} />
              <AvatarFallback className="bg-muted">
                <UserIcon className="h-7 w-7 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 space-y-1">
              <p className="text-base font-semibold truncate">
                {candidate.seeker.fullName}
              </p>

              {candidate.seeker.profession && (
                <p className="text-sm text-muted-foreground truncate">
                  {candidate.seeker.profession}
                </p>
              )}

              <div className="flex items-center gap-1 text-sm text-muted-foreground truncate">
                <Mail className="h-4 w-4 shrink-0" />
                <span className="truncate">{candidate.seeker.email}</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="font-medium truncate">{candidate.seeker.email}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="font-medium truncate">
                {candidate.seeker.phoneNumber || "—"}
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Documents</h4>

            <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-blue-50 p-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>

                <div>
                  <p className="text-sm font-medium">Resume</p>
                  <p className="text-xs text-muted-foreground">PDF / DOCX</p>
                </div>
              </div>

              {resumeData ? (
                <DownloadResumeButton
                  size="default"
                  buttonType="default"
                  resumeData={resumeData}
                />
              ) : (
                <span className="text-xs text-muted-foreground">
                  Not uploaded
                </span>
              )}
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-green-50 p-2">
                  <FileText className="h-4 w-4 text-green-600" />
                </div>

                <div>
                  <p className="text-sm font-medium">Cover Letter</p>
                  <p className="text-xs text-muted-foreground">PDF / DOCX</p>
                </div>
              </div>

              {coverLetterData ? (
                <PDFDownloadLink
                  document={<CoverLetterPDF data={coverLetterData} />}
                  fileName="cover-letter.pdf"
                >
                  {({ loading }) => (
                    <Button className="mb-4 w-full gap-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white">
                      <Download className="mr-1 h-4 w-4" />
                      <span className="hidden sm:inline">
                        {loading ? "Generating..." : "Download"}
                      </span>
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

          <Separator />

          <p className="text-xs text-muted-foreground">Joined on {"—"}</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
