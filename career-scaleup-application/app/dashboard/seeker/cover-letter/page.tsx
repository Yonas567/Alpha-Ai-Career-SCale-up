"use client";

import CoverLetterApi from "@/app/api/cover-letter";
import CoverLetterCard from "@/components/cover-letter/cover-letter-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CoverLetterPage() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { data: coverLetters, isLoading: loadingCoverLetters } = useQuery({
    queryKey: ["coverLetters"],
    queryFn: async () => CoverLetterApi.getCoverLetters(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const handleCreateNewCoverLetter = () => {
    router.push(`/dashboard/seeker/cover-letter/new`);
  };

  return (
    <div
      className={`flex flex-col h-full space-y-4 ${
        isMobile ? "px-0 pt-0" : "px-4 pt-4"
      } `}
    >
      <div className="pb-4">
        <h2 className="text-2xl font-semibold text-foreground tracking-tight">
          My Cover Letters
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage Cover Letters. You can edit, delete, or preview them anytime.
        </p>
      </div>
      <div className="flex-1 h-full overflow-y-scroll hide-scroll">
        <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-6 justify-start">
          <div className="h-60">
            <Button
              variant="ghost"
              className="border-2 border-dashed border-border rounded-2xl p-6 hover:border-indigo-700 hover:bg-muted transition-all flex flex-col items-start justify-start gap-3 h-full w-full shadow-sm hover:shadow-md"
              onClick={handleCreateNewCoverLetter}
            >
              <Plus className="h-8 w-8 text-muted-foreground" />
              <div className="text-left">
                <p className="font-semibold text-foreground text-base">
                  Create Cover Letter
                </p>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">
                  Start a brand new Cover Letter with one click.
                </p>
              </div>
            </Button>
          </div>

          {loadingCoverLetters &&
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="border border-border rounded-2xl bg-card shadow-sm p-4 h-60 flex flex-col gap-3 animate-pulse"
              >
                <Skeleton className="w-3/4 h-6 rounded-md bg-muted" />
                <Skeleton className="w-full h-32 rounded-md bg-muted" />
                <Skeleton className="w-1/2 h-4 rounded-md bg-muted" />
              </div>
            ))}

          {!loadingCoverLetters &&
            coverLetters?.map((coverLetter, index) => (
              <CoverLetterCard key={index} coverLetter={coverLetter} />
            ))}
        </div>
      </div>
    </div>
  );
}
