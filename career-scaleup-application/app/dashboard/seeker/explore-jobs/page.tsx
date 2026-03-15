"use client";

import FilterSection from "@/components/job/filter-section";
import { JobDetail } from "@/components/job/job-detail";
import JobListings from "@/components/job/job-listings";
import ResumePanel from "@/components/resume/resume-panel";
import { useJobsManager } from "@/context/JobsManagerProvider";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ExploreJobs() {
  const { selectedJob, selectJob } = useJobsManager();
  const isMobile = useIsMobile();
  const isMobileJobDetailVisible = isMobile && selectedJob !== null;

  return (
    <div className="flex-1 flex flex-col overflow-hidden pt-3 ">
      {!isMobileJobDetailVisible && <FilterSection />}

      <div className="flex flex-1 overflow-hidden gap-4 pt-2">
        <div className="md:hidden w-full">
          {selectedJob ? (
            <JobDetail job={selectedJob} />
          ) : (
            <JobListings selectedJob={selectedJob} onSelectJob={selectJob} />
          )}
        </div>

        <div className="hidden md:flex h-[80vh] w-full gap-4 flex-col md:flex-row pb-4">
          <JobListings selectedJob={selectedJob} onSelectJob={selectJob} />
          <JobDetail job={selectedJob} />
          <div className="hidden h-full lg:flex flex-col w-80 bg-card rounded-lg border border-border">
            <ResumePanel />
          </div>
        </div>
      </div>
    </div>
  );
}
