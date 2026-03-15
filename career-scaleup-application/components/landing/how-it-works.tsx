"use client";

import { UserPlus, FileText, Search, MessageCircle, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const jobSeekerSteps: Step[] = [
  {
    icon: <UserPlus className="h-6 w-6" />,
    title: "Sign Up & Create Profile",
    description: "Quick registration process. Set up your profile in minutes and start your career journey.",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Upload/Build Resume",
    description: "AI analyzes your resume instantly. Get optimization suggestions to improve your chances.",
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: "Get Matched",
    description: "AI finds relevant jobs based on your skills and preferences. See compatibility scores for each match.",
  },
  {
    icon: <MessageCircle className="h-6 w-6" />,
    title: "Practice & Prepare",
    description: "Use AI interview coach to practice. Get personalized feedback and boost your confidence.",
  },
  {
    icon: <CheckCircle2 className="h-6 w-6" />,
    title: "Apply & Connect",
    description: "One-click applications. Direct messaging with recruiters. Track your application status.",
  },
];

const recruiterSteps: Step[] = [
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Post Job Opening",
    description: "Easy job posting interface with AI-powered job description suggestions to attract the right candidates.",
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: "AI Analyzes Candidates",
    description: "Automatic resume screening and skill verification. Get compatibility scores instantly.",
  },
  {
    icon: <CheckCircle2 className="h-6 w-6" />,
    title: "Review Matched Candidates",
    description: "See top matches first. Filter and sort options. Detailed candidate profiles with AI insights.",
  },
  {
    icon: <MessageCircle className="h-6 w-6" />,
    title: "Connect & Interview",
    description: "Direct messaging with candidates. Schedule interviews. Track your hiring pipeline.",
  },
  {
    icon: <UserPlus className="h-6 w-6" />,
    title: "Hire Top Talent",
    description: "Streamlined hiring process. Advanced analytics and insights. Build your dream team faster.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-muted/30 dark:bg-black/50">
      <div className="container mx-auto px-4 space-y-20">
        {/* For Job Seekers */}
        <div id="for-seekers" className="space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              How It Works for Job Seekers
            </h2>
            <p className="text-xl text-muted-foreground">
              Start your career journey in 5 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {jobSeekerSteps.map((step, index) => (
              <Card
                key={index}
                className="p-6 border-border bg-card hover:border-[#4d32fb]/50 transition-all relative"
              >
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-[#4d32fb] text-white flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <div className="space-y-4">
                  <div className="text-[#4d32fb]">{step.icon}</div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* For Recruiters */}
        <div id="for-recruiters" className="space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              How It Works for Recruiters
            </h2>
            <p className="text-xl text-muted-foreground">
              Find and hire top talent faster with AI-powered tools
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {recruiterSteps.map((step, index) => (
              <Card
                key={index}
                className="p-6 border-border bg-card hover:border-[#4d32fb]/50 transition-all relative"
              >
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-[#4d32fb] text-white flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <div className="space-y-4">
                  <div className="text-[#4d32fb]">{step.icon}</div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

