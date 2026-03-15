import { Candidate } from "@/app/types";
import CandidateCard from "./candidate-card";

interface KanbanColumnProps {
  title: string;
  color: string;
  candidates: Candidate[];
}

export default function KanbanColumn({
  title,
  color,
  candidates,
}: KanbanColumnProps) {
  return (
    <div className="flex flex-col h-full w-1/4 rounded-xl">
      <div className="p-3 flex items-center gap-2 sticky top-0  z-10 rounded-xl">
        <div className={`h-3 w-3 rounded-full ${color}`} />
        <h3 className="font-semibold text-foreground">
          {title}
          <span className="ml-2 text-sm text-gray-500"></span>
        </h3>
      </div>

      <div className="space-y-3 px-2 overflow-y-scroll hide-scroll">
        {candidates?.map((candidate, index) => (
          <CandidateCard key={index} candidate={candidate} />
        ))}
      </div>
    </div>
  );
}
