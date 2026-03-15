"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export function LandingPlatformSplit() {
  return (
    <section id="services" className="py-24 bg-background dark:bg-black border-b border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* For Applicants */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">For Job Applicants</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 shrink-0" />
                <span>AI-powered resume building & optimization</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 shrink-0" />
                <span>Free interview preparation with AI coaching</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 shrink-0" />
                <span>Smart job matching based on your profile</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 shrink-0" />
                <span>Direct messaging with recruiters</span>
              </li>
            </ul>
            <Link href="/auth?tab=signup">
              <Button className="bg-[#4d32fb] hover:bg-[#4d32fb]/90 text-white">
                Apply Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* For Recruiters */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">For Recruiters</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 shrink-0" />
                <span>AI resume analysis and skill verification</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 shrink-0" />
                <span>Smart candidate matching algorithm</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 shrink-0" />
                <span>Manage pipelines and communications</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 shrink-0" />
                <span>Advanced analytics and hiring insights</span>
              </li>
            </ul>
            <Link href="/auth?tab=signup">
              <Button className="bg-[#4d32fb] hover:bg-[#4d32fb]/90 text-white">
                Hire Top Talent
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

