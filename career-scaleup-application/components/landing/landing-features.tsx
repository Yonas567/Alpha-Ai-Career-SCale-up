"use client";

import { Zap, MessageSquare, Brain, FileText, Award } from "lucide-react";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";

export function LandingFeatures() {
  return (
    <section id="features" className="py-24 bg-background dark:bg-black border-b border-border">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why Career ScaleUp?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything powered by AI to streamline recruitment and career growth
          </p>
        </div>

        <BentoGrid className="lg:grid-rows-3">
          <BentoCard
            name="Smart Resume Analysis"
            className="lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3"
            background={
              <div className="absolute inset-0 bg-gradient-to-br from-[#4d32fb]/20 to-background/80 dark:to-black/80 backdrop-blur-sm border border-[#4d32fb]/30" />
            }
            Icon={FileText}
            description="AI automatically analyzes resumes, extracts key skills, and matches candidates with job requirements in real-time."
            href="#"
            cta="Learn more"
          />
          <BentoCard
            name="AI Interview Coach"
            className="lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3"
            background={
              <div className="absolute inset-0 bg-gradient-to-br from-[#4d32fb]/20 to-background/80 dark:to-black/80 backdrop-blur-sm border border-[#4d32fb]/30" />
            }
            Icon={Award}
            description="Practice interviews with AI feedback, get personalized coaching tips, and boost your confidence before the real thing."
            href="#"
            cta="Learn more"
          />
          <BentoCard
            name="Instant Candidate Matching"
            className="lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4"
            background={
              <div className="absolute inset-0 bg-gradient-to-br from-[#4d32fb]/20 to-background/80 dark:to-black/80 backdrop-blur-sm border border-[#4d32fb]/30" />
            }
            Icon={Zap}
            description="Recruiters see perfectly matched candidates with AI-verified skills and compatibility scores for faster hiring."
            href="#"
            cta="Learn more"
          />
          <BentoCard
            name="Resume Optimization"
            className="lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2"
            background={
              <div className="absolute inset-0 bg-gradient-to-br from-[#4d32fb]/20 to-background/80 dark:to-black/80 backdrop-blur-sm border border-[#4d32fb]/30" />
            }
            Icon={Brain}
            description="AI suggests resume improvements, highlights critical skills, and ensures your profile stands out to recruiters."
            href="#"
            cta="Learn more"
          />
          <BentoCard
            name="Real-time Messaging"
            className="lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4"
            background={
              <div className="absolute inset-0 bg-gradient-to-br from-[#4d32fb]/20 to-background/80 dark:to-black/80 backdrop-blur-sm border border-[#4d32fb]/30" />
            }
            Icon={MessageSquare}
            description="Direct communication between recruiters and candidates with AI-powered response suggestions and scheduling."
            href="#"
            cta="Learn more"
          />
        </BentoGrid>
      </div>
    </section>
  );
}

