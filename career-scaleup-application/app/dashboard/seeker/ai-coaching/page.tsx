"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageBubble } from "@/components/ai-interview/message-bubble";
import { ChatInput } from "@/components/ai-interview/chat-input";
import { ChatLayout } from "@/components/ai-interview/chat-layout";
import { CoachingTopics } from "@/components/ai-coaching/coaching-topics";
import { CoachingPlan } from "@/components/ai-coaching/coaching-plan";
import { ProgressTracker } from "@/components/ai-coaching/progress-tracker";
import { Sparkles, RotateCcw } from "lucide-react";

interface Message {
  id: string;
  text: string;
  variant: "user" | "ai";
  timestamp: string;
}

interface DayPlan {
  day: number;
  title: string;
  actions: string[];
  resources: string[];
  completed: boolean;
}

export default function AiCoachingPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [hasPlan, setHasPlan] = useState(false);
  const [coachingPlan, setCoachingPlan] = useState<DayPlan[]>([]);
  const [completedDays, setCompletedDays] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetCoachingPlan = () => {
    if (!selectedTopic) {
      alert("Please select a coaching topic first");
      return;
    }

    setIsLoading(true);

    // Simulate generating plan
    setTimeout(() => {
      const plan = generateCoachingPlan(selectedTopic);
      setCoachingPlan(plan);
      setHasPlan(true);
      setIsLoading(false);

      // Add AI message
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: `I've created a personalized 7-day improvement plan for "${getTopicName(
          selectedTopic
        )}". Review the plan below and let me know if you'd like to adjust anything!`,
        variant: "ai",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1500);
  };

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      variant: "user",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = getCoachingResponse(text, selectedTopic);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        variant: "ai",
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    setMessages([]);
    setSelectedTopic(null);
    setHasPlan(false);
    setCoachingPlan([]);
    setCompletedDays(0);
  };

  const handleDayComplete = (day: number) => {
    setCoachingPlan((prev) =>
      prev.map((d) => (d.day === day ? { ...d, completed: true } : d))
    );
    setCompletedDays((prev) => Math.max(prev, day));
  };

  const getTopicName = (topicId: string | null): string => {
    const topicMap: Record<string, string> = {
      "resume-review": "Resume Review",
      "career-advice": "Career Advice",
      "interview-practice": "Job Interview Practice",
      "technical-skills": "Technical Skill Improvement",
    };
    return topicId ? topicMap[topicId] || "Coaching" : "Coaching";
  };

  const generateCoachingPlan = (topicId: string): DayPlan[] => {
    const plans: Record<string, DayPlan[]> = {
      "resume-review": [
        {
          day: 1,
          title: "Resume Structure Analysis",
          actions: [
            "Review your current resume format",
            "Identify missing sections",
            "Check for consistency in formatting",
          ],
          resources: ["Resume Templates", "Formatting Guide"],
          completed: false,
        },
        {
          day: 2,
          title: "Content Optimization",
          actions: [
            "Rewrite job descriptions with action verbs",
            "Quantify achievements with numbers",
            "Remove outdated information",
          ],
          resources: ["Action Verbs List", "Achievement Examples"],
          completed: false,
        },
        {
          day: 3,
          title: "Keyword Optimization",
          actions: [
            "Research industry keywords",
            "Add relevant skills",
            "Match job descriptions",
          ],
          resources: ["Keyword Research Tool"],
          completed: false,
        },
        {
          day: 4,
          title: "Skills Section Enhancement",
          actions: [
            "List technical and soft skills",
            "Add proficiency levels",
            "Include certifications",
          ],
          resources: ["Skills Assessment"],
          completed: false,
        },
        {
          day: 5,
          title: "Professional Summary",
          actions: [
            "Write compelling summary",
            "Highlight key achievements",
            "Keep it concise (2-3 sentences)",
          ],
          resources: ["Summary Examples"],
          completed: false,
        },
        {
          day: 6,
          title: "Proofreading & Review",
          actions: [
            "Check for typos and grammar",
            "Get feedback from peers",
            "Ensure consistency",
          ],
          resources: ["Grammar Checker"],
          completed: false,
        },
        {
          day: 7,
          title: "Final Polish",
          actions: [
            "Create multiple versions",
            "Save as PDF",
            "Prepare for applications",
          ],
          resources: ["PDF Converter"],
          completed: false,
        },
      ],
      "career-advice": [
        {
          day: 1,
          title: "Self-Assessment",
          actions: [
            "Identify your strengths",
            "List your interests",
            "Assess your values",
          ],
          resources: ["Career Assessment Test"],
          completed: false,
        },
        {
          day: 2,
          title: "Goal Setting",
          actions: [
            "Define short-term goals",
            "Set long-term objectives",
            "Create action plan",
          ],
          resources: ["Goal Setting Template"],
          completed: false,
        },
        {
          day: 3,
          title: "Skill Gap Analysis",
          actions: [
            "Identify required skills",
            "Assess current skills",
            "Plan skill development",
          ],
          resources: ["Skill Assessment"],
          completed: false,
        },
        {
          day: 4,
          title: "Networking Strategy",
          actions: [
            "Build LinkedIn profile",
            "Join professional groups",
            "Attend industry events",
          ],
          resources: ["Networking Guide"],
          completed: false,
        },
        {
          day: 5,
          title: "Professional Development",
          actions: [
            "Enroll in courses",
            "Get certifications",
            "Attend workshops",
          ],
          resources: ["Online Courses"],
          completed: false,
        },
        {
          day: 6,
          title: "Mentorship",
          actions: [
            "Find a mentor",
            "Schedule regular meetings",
            "Set mentorship goals",
          ],
          resources: ["Mentorship Platform"],
          completed: false,
        },
        {
          day: 7,
          title: "Action Plan Review",
          actions: [
            "Review progress",
            "Adjust goals if needed",
            "Plan next steps",
          ],
          resources: ["Progress Tracker"],
          completed: false,
        },
      ],
      "interview-practice": [
        {
          day: 1,
          title: "Common Questions Research",
          actions: [
            "Research common questions",
            "Prepare STAR method examples",
            "Practice answers",
          ],
          resources: ["Interview Questions Database"],
          completed: false,
        },
        {
          day: 2,
          title: "Behavioral Questions",
          actions: [
            "Prepare 5-7 stories",
            "Practice STAR format",
            "Record yourself",
          ],
          resources: ["STAR Method Guide"],
          completed: false,
        },
        {
          day: 3,
          title: "Technical Questions",
          actions: [
            "Review technical concepts",
            "Practice coding problems",
            "Prepare explanations",
          ],
          resources: ["Technical Interview Prep"],
          completed: false,
        },
        {
          day: 4,
          title: "Mock Interviews",
          actions: [
            "Practice with friends",
            "Record mock interviews",
            "Get feedback",
          ],
          resources: ["Mock Interview Platform"],
          completed: false,
        },
        {
          day: 5,
          title: "Body Language & Presence",
          actions: [
            "Practice eye contact",
            "Work on posture",
            "Practice confident speaking",
          ],
          resources: ["Body Language Guide"],
          completed: false,
        },
        {
          day: 6,
          title: "Questions to Ask",
          actions: [
            "Prepare questions for interviewer",
            "Research the company",
            "Practice asking questions",
          ],
          resources: ["Company Research Guide"],
          completed: false,
        },
        {
          day: 7,
          title: "Final Preparation",
          actions: [
            "Review all materials",
            "Prepare outfit",
            "Plan route and timing",
          ],
          resources: ["Interview Checklist"],
          completed: false,
        },
      ],
      "technical-skills": [
        {
          day: 1,
          title: "Skill Assessment",
          actions: [
            "Identify target skills",
            "Assess current level",
            "Set learning goals",
          ],
          resources: ["Skill Assessment Test"],
          completed: false,
        },
        {
          day: 2,
          title: "Learning Resources",
          actions: [
            "Find online courses",
            "Select tutorials",
            "Create study schedule",
          ],
          resources: ["Learning Platforms"],
          completed: false,
        },
        {
          day: 3,
          title: "Hands-On Practice",
          actions: [
            "Start coding projects",
            "Practice daily",
            "Track progress",
          ],
          resources: ["Project Ideas"],
          completed: false,
        },
        {
          day: 4,
          title: "Build Portfolio",
          actions: [
            "Create GitHub profile",
            "Add projects",
            "Write documentation",
          ],
          resources: ["Portfolio Guide"],
          completed: false,
        },
        {
          day: 5,
          title: "Join Community",
          actions: [
            "Join forums",
            "Participate in discussions",
            "Ask questions",
          ],
          resources: ["Tech Communities"],
          completed: false,
        },
        {
          day: 6,
          title: "Get Feedback",
          actions: [
            "Share code for review",
            "Get peer feedback",
            "Implement improvements",
          ],
          resources: ["Code Review Platform"],
          completed: false,
        },
        {
          day: 7,
          title: "Certification",
          actions: [
            "Take certification exam",
            "Update resume",
            "Share achievement",
          ],
          resources: ["Certification Programs"],
          completed: false,
        },
      ],
    };

    return plans[topicId] || plans["career-advice"];
  };

  const getCoachingResponse = (
    userMessage: string,
    topicId: string | null
  ): string => {
    const responses = [
      "That's a great question! Let me help you with that.",
      "I understand your concern. Here's what I recommend...",
      "Based on your situation, I suggest the following approach...",
      "That's an important point. Consider these strategies...",
      "Great progress! Keep up the good work.",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="h-full w-full p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            AI Coaching Assistant
          </h1>
          <p className="text-muted-foreground mt-1">
            Get personalized guidance for your career growth
          </p>
        </div>
        {(hasPlan || messages.length > 0) && (
          <Button variant="outline" onClick={handleReset} size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Topics & Plan */}
        <div className="lg:col-span-1 space-y-6">
          {!hasPlan ? (
            <>
              <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Coaching Topics</h3>
                </div>
                <CoachingTopics
                  selectedTopic={selectedTopic}
                  onTopicSelect={setSelectedTopic}
                />
                <Button
                  onClick={handleGetCoachingPlan}
                  size="lg"
                  className="w-full mt-6"
                  disabled={!selectedTopic || isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Generating Plan...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Get Coaching Plan
                    </>
                  )}
                </Button>
              </Card>
            </>
          ) : (
            <>
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/10">
                <ProgressTracker completedDays={completedDays} />
              </Card>
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/10">
                <h3 className="text-lg font-semibold mb-4">
                  {getTopicName(selectedTopic)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Follow your personalized 7-day plan to achieve your goals.
                  Mark days as complete as you progress.
                </p>
              </Card>
            </>
          )}
        </div>

        {/* Right: Chat & Plan */}
        <div className="lg:col-span-2 space-y-6">
          {hasPlan ? (
            <Card className="h-[calc(100vh-300px)] flex flex-col ">
              <CoachingPlan plan={coachingPlan} />
            </Card>
          ) : (
            <ChatLayout className="h-[calc(100vh-300px)] flex flex-col">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-4 max-w-md">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Sparkles className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">
                      Select a Coaching Topic
                    </h3>
                    <p className="text-muted-foreground">
                      Choose a topic from the left panel to get started with
                      personalized coaching.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-1">
                    {messages.map((message) => (
                      <MessageBubble
                        key={message.id}
                        message={message.text}
                        variant={message.variant}
                        timestamp={message.timestamp}
                      />
                    ))}
                    {isLoading && (
                      <div className="flex justify-start mb-4">
                        <div className="bg-card border border-primary/10 rounded-2xl px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-75" />
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-150" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <ChatInput
                    onSend={handleSendMessage}
                    disabled={isLoading}
                    placeholder="Ask for coaching advice..."
                  />
                </>
              )}
            </ChatLayout>
          )}
        </div>
      </div>
    </div>
  );
}
