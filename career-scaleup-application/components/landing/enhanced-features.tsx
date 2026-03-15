"use client";

import {
  FileText,
  Award,
  Zap,
  Brain,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlights: string[];
}

const features: Feature[] = [
  {
    icon: <FileText className="h-8 w-8" />,
    title: "AI Resume Analysis",
    description:
      "Automatically analyze resumes, extract key skills, and match candidates with job requirements in real-time.",
    highlights: [
      "Instant skill extraction",
      "ATS-friendly formatting",
      "Real-time matching",
      "Optimization suggestions",
    ],
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "AI Interview Coach",
    description:
      "Practice interviews with AI feedback, get personalized coaching tips, and boost your confidence.",
    highlights: [
      "Real-time feedback",
      "Personalized coaching",
      "Response analysis",
      "Confidence building",
    ],
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Smart Job Matching",
    description:
      "AI-powered matching algorithm connects the right candidates with the right opportunities instantly.",
    highlights: [
      "Compatibility scoring",
      "Skill verification",
      "Instant matches",
      "Quality candidates",
    ],
  },
  {
    icon: <Brain className="h-8 w-8" />,
    title: "Resume Optimization",
    description:
      "AI suggests improvements, highlights critical skills, and ensures your profile stands out to recruiters.",
    highlights: [
      "Smart suggestions",
      "ATS optimization",
      "Skill highlighting",
      "Profile enhancement",
    ],
  },
  {
    icon: <MessageSquare className="h-8 w-8" />,
    title: "Real-time Messaging",
    description:
      "Direct communication between recruiters and candidates with AI-powered response suggestions.",
    highlights: [
      "Direct messaging",
      "AI suggestions",
      "Scheduling integration",
      "Quick responses",
    ],
  },
  {
    icon: <BarChart3 className="h-8 w-8" />,
    title: "Analytics & Insights",
    description:
      "Track your progress, interview success rates, and career growth with detailed analytics.",
    highlights: [
      "Progress tracking",
      "Success metrics",
      "Career insights",
      "Performance analytics",
    ],
  },
];

export function EnhancedFeatures() {
  return (
    <section
      id="features"
      className="py-24 bg-background dark:bg-black border-y border-border"
    >
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features powered by AI to streamline recruitment and career
            growth
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group p-6 border-border bg-card hover:border-[#4d32fb]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#4d32fb]/10 dark:hover:shadow-[#4d32fb]/20"
            >
              <div className="space-y-4">
                {/* Icon */}
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#4d32fb]/10 to-[#4d32fb]/5 text-[#4d32fb] group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[#4d32fb] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-[#4d32fb] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Highlights */}
                <div className="pt-4 border-t border-border">
                  <ul className="space-y-2">
                    {feature.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4d32fb] shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#4d32fb] hover:text-[#4d32fb] hover:bg-[#4d32fb]/10 p-0 h-auto font-normal"
                  >
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#4d32fb]/10 via-[#4d32fb]/5 to-transparent border border-[#4d32fb]/20">
            <div className="text-left sm:text-center">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Ready to experience all features?
              </h3>
              <p className="text-muted-foreground">
                Start your free trial and unlock the full power of AI-driven
                career growth
              </p>
            </div>
            <Button
              size="lg"
              className="bg-[#4d32fb] hover:bg-[#4d32fb]/90 text-white shrink-0"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
