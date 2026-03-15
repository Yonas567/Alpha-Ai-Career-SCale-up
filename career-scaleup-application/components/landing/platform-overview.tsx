"use client";

import { Sparkles, Brain, Zap, Target } from "lucide-react";
import { Card } from "@/components/ui/card";

export function PlatformOverview() {
  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Matching",
      description: "Advanced algorithms analyze skills, experience, and cultural fit to connect the right candidates with the right opportunities.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Real-Time Analysis",
      description: "Instant resume analysis and skill verification help recruiters make faster, more informed hiring decisions.",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Personalized Coaching",
      description: "AI interview coach provides personalized feedback and practice sessions to help candidates succeed.",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Smart Optimization",
      description: "Automatically optimize resumes for ATS systems and improve chances of getting noticed by recruiters.",
    },
  ];

  return (
    <section className="py-24 bg-background dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              How AI Transforms Career Growth
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Career ScaleUp leverages cutting-edge artificial intelligence to revolutionize how job seekers find opportunities and how recruiters discover talent.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 border-border bg-card hover:border-[#4d32fb]/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-[#4d32fb]/10 text-[#4d32fb] shrink-0">
                    {feature.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

