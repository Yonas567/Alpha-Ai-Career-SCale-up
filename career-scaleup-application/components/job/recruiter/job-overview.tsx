import { Application, Job } from "@/app/types";
import { Dialog } from "@/components/ui/dialog";

type JobOverviewProps = {
  job: Job | undefined;
};

export default function JobOverview({ job }: JobOverviewProps) {
  if (!job) return null;
  return (
    <Dialog>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-8 w-full">
        <div className="bg-card rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <p className="text-xs text-foreground uppercase font-medium">
            New Applications
          </p>
          <p className="text-2xl font-bold text-foreground">
            {job.applications?.length}
          </p>
        </div>

        <div className="bg-card rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <p className="text-xs text-foreground uppercase font-medium">
            Shortlisted
          </p>
          <p className="text-2xl font-bold text-foreground">
            {
              job.applications?.filter(
                (application: Application) =>
                  application.status === "ShortListed"
              ).length
            }
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">
            Hired
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {
              job.applications?.filter(
                (application: Application) => application.status === "Hired"
              ).length
            }
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">
            Rejected
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {
              job.applications?.filter(
                (application: Application) => application.status === "Rejected"
              ).length
            }
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">
            Total Candidates
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {job.applications?.length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl p-6 transition-all duration-200 shadow-sm">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Job Description
            </h2>
          </div>
          <p className="text-foreground/75 leading-relaxed text-sm text-pretty">
            {job.description}
          </p>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Qualifications
            </h2>
          </div>
          <p className="text-foreground/75 leading-relaxed text-sm text-pretty">
            <ul className="list-disc list-inside text-foreground dark:text-gray-100 text-sm text-pretty">
              {job?.qualifications?.map((q, idx) => (
                <li
                  key={idx}
                  className="text-foreground/75 leading-relaxed text-sm text-pretty"
                >
                  {q}
                </li>
              ))}
            </ul>
          </p>
        </div>

        <div className="bg-card rounded-xl p-6 transition-all duration-200 shadow-sm">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Responsibilities
            </h2>
          </div>
          <ul className="list-disc list-inside text-gray-900 dark:text-gray-100 text-sm">
            {job?.responsibilities?.map((r, idx) => (
              <li
                key={idx}
                className="text-foreground/75 leading-relaxed text-sm text-pretty"
              >
                {r}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card rounded-xl p-6 transition-all duration-200 shadow-sm">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h2 className="text-lg font-semibold text-foreground">Benefits</h2>
          </div>
          <ul className="list-disc list-inside text-gray-900 dark:text-gray-100 text-sm">
            {job?.benefits?.map((b, idx) => (
              <li
                key={idx}
                className="text-foreground/75 leading-relaxed text-sm text-pretty"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Dialog>
  );
}
