import { BriefcaseBusiness } from "lucide-react";

export default function NoJobs() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <BriefcaseBusiness className="h-16 w-16 text-gray-400 mb-4" />
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
        No saved jobs yet
      </h2>
      <p className="text-gray-500 text-sm mt-1">
        Start exploring and save jobs that catch your interest!
      </p>
    </div>
  );
}
