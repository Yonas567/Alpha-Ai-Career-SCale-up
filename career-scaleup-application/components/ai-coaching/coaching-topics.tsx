"use client";

import { Card } from "@/components/ui/card";
import { FileText, Briefcase, MessageSquare, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

const topics = [
  {
    id: "resume-review",
    title: "Resume Review",
    description: "Get feedback on your resume structure and content",
    icon: FileText,
  },
  {
    id: "career-advice",
    title: "Career Advice",
    description: "Personalized guidance for your career path",
    icon: Briefcase,
  },
  {
    id: "interview-practice",
    title: "Job Interview Practice",
    description: "Practice common interview questions",
    icon: MessageSquare,
  },
  {
    id: "technical-skills",
    title: "Technical Skill Improvement",
    description: "Improve your technical skills and knowledge",
    icon: Code2,
  },
];

interface CoachingTopicsProps {
  selectedTopic: string | null;
  onTopicSelect: (topicId: string) => void;
}

export function CoachingTopics({
  selectedTopic,
  onTopicSelect,
}: CoachingTopicsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {topics.map((topic) => {
        const Icon = topic.icon;
        const isSelected = selectedTopic === topic.id;

        return (
          <Card
            key={topic.id}
            onClick={() => onTopicSelect(topic.id)}
            className={cn(
              "p-4 cursor-pointer transition-all hover:border-primary/50",
              isSelected
                ? "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/50 shadow-sm"
                : "bg-card border-primary/10 hover:bg-primary/5"
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "p-2 rounded-lg",
                  isSelected
                    ? "bg-primary text-white"
                    : "bg-primary/10 text-primary"
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">{topic.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {topic.description}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}


