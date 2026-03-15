"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export function BenefitsSection() {
  return (
    <section className="py-24 bg-background dark:bg-black border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* For Job Seekers */}
          <Card className="p-8 border-border bg-card">
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-2">
                  For Job Seekers
                </h3>
                <p className="text-muted-foreground">
                  Everything you need to land your dream job
                </p>
              </div>

              <ul className="space-y-4">
                {[
                  "AI-powered resume building & optimization",
                  "Free interview preparation with AI coaching",
                  "Smart job matching based on your profile",
                  "Direct messaging with recruiters",
                  "Real-time application tracking",
                  "Career growth insights and analytics",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>

              <Link href="/auth?tab=signup">
                <Button className="w-full bg-[#4d32fb] hover:bg-[#4d32fb]/90 text-white">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>

          {/* For Recruiters */}
          <Card className="p-8 border-border bg-card">
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-2">
                  For Recruiters
                </h3>
                <p className="text-muted-foreground">
                  Streamline your hiring process with AI
                </p>
              </div>

              <ul className="space-y-4">
                {[
                  "AI resume analysis and skill verification",
                  "Smart candidate matching algorithm",
                  "Manage pipelines and communications",
                  "Advanced analytics and hiring insights",
                  "Time-saving automation tools",
                  "Quality candidate pool with verified skills",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>

              <Link href="/auth?tab=signup">
                <Button className="w-full bg-[#4d32fb] hover:bg-[#4d32fb]/90 text-white">
                  Hire Top Talent
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

