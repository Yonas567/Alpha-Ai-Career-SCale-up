"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";

interface Screenshot {
  title: string;
  description: string;
  placeholder: string;
  alt: string;
}

const screenshots: Screenshot[] = [
  {
    title: "Dashboard Overview",
    description:
      "Comprehensive dashboard showing job matches, application status, and career insights",
    placeholder: "/landingImags/dashboard.png",
    alt: "Career ScaleUp Dashboard",
  },
  {
    title: "Resume Builder",
    description:
      "Easy-to-use resume builder with AI-powered suggestions and templates",
    placeholder: "/landingImags/resumebuilder.png",
    alt: "Resume Builder Interface",
  },
  {
    title: "AI Interview Coach",
    description:
      "Practice interviews with real-time AI feedback and personalized coaching",
    placeholder: "/landingImags/aiinterviewcoach.png",
    alt: "AI Interview Coach",
  },
  {
    title: "Job Matching Results",
    description:
      "Smart job matching with compatibility scores and detailed job information",
    placeholder: "/landingImags/jobmatchingresult.png",
    alt: "Job Matching Results",
  },
  {
    title: "Messaging Interface",
    description:
      "Direct communication with recruiters and AI-powered response suggestions",
    placeholder: "/landingImags/messageinterface.png",
    alt: "Messaging Interface",
  },
  {
    title: "Saved Jobs",
    description:
      "Save jobs for later application and manage your favorite opportunities in one place",
    placeholder: "/landingImags/savedjob.png",
    alt: "Saved Jobs Dashboard",
  },
];

export function PlatformScreenshots() {
  return (
    <section className="py-24 bg-muted/30 dark:bg-black/50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            See Career ScaleUp in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our platform through real screenshots and see how we
            transform career growth
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {screenshots.map((screenshot, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-border bg-card hover:border-[#4d32fb]/50 transition-all duration-300"
            >
              <div className="relative aspect-video bg-muted dark:bg-black/50 flex items-center justify-center overflow-hidden">
                <Image
                  src={screenshot.placeholder}
                  alt={screenshot.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-semibold text-foreground">
                  {screenshot.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {screenshot.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
