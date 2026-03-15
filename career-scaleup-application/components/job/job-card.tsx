import { ArrowUpRight, Briefcase, Calendar, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { Job } from "@/app/types";
import { Badge } from "../ui/badge";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="group relative rounded-xl border border-border bg-card p-4 sm:p-6 transition-all ">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-10 w-10 rounded-lg border border-border object-cover bg-gray-100" />
        <p className="text-sm font-medium text-muted-foreground">
          {job.companyName}
        </p>
      </div>
      <h2 className="text-lg sm:text-xl font-semibold text-foreground line-clamp-2">
        {job.title}
      </h2>

      <div className="flex flex-wrap gap-2 mt-2">
        <Badge variant="outline">
          <Briefcase className="mr-1 h-3 w-3" />
          {job.jobType}
        </Badge>
        <Badge variant="outline">
          <MapPin className="mr-1 h-3 w-3" />
          {job.location}
        </Badge>
        <Badge variant="outline">
          <Calendar className="mr-1 h-3 w-3" />
          {new Date(job.postedAt).toLocaleDateString()}
        </Badge>
      </div>

      <p className="line-clamp-3 text-sm text-muted-foreground mt-2">
        {job.description}
      </p>

      <div className="pt-3 sm:pt-4">
        {job.applicationLink ? (
          <a href={job.applicationLink} target="_blank" rel="noopener noreferrer">
            <Button className="w-fit gap-2 bg-indigo-600 hover:bg-indigo-700 transition-colors">
              Apply Now
            </Button>
          </a>
        ) : (
          <Button className="w-fit gap-2 bg-indigo-600 hover:bg-indigo-700 transition-colors" disabled>
            Apply Now
          </Button>
        )}
      </div>
    </div>
  );
}
