"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Play } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import Image from "next/image";
import Link from "next/link";
import { SplineScene } from "../ui/spline-scene";

export function NewLandingHero() {
  return (
    <section className="relative min-h-screen pt-24 flex items-center justify-center overflow-hidden bg-background dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="relative z-10 space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                AI-Powered{" "}
                <span className="bg-gradient-to-r from-[#4d32fb] to-[#6b4fff] bg-clip-text text-transparent">
                  Career Growth
                </span>{" "}
                Platform
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                Connect top talent with perfect opportunities. Our AI analyzes
                resumes, coaches candidates, and helps recruiters find the ideal
                match in seconds.
              </p>
            </div>

            {/* Key Features */}
            <div className="flex flex-wrap gap-6 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 shrink-0" />
                <span className="text-muted-foreground">
                  AI Resume Analysis
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 shrink-0" />
                <span className="text-muted-foreground">Smart Matching</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 shrink-0" />
                <span className="text-muted-foreground">
                  Interview Coaching
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth?tab=signup">
                <Button
                  size="lg"
                  className="bg-[#4d32fb] hover:bg-[#4d32fb]/90 text-white text-base px-8 h-12"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-muted text-base px-8 h-12"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-8 text-sm text-muted-foreground pt-4">
              <div>
                <div className="font-semibold text-foreground text-lg">
                  10K+
                </div>
                <div>Active Users</div>
              </div>
              <div>
                <div className="font-semibold text-foreground text-lg">
                  500+
                </div>
                <div>Companies</div>
              </div>
              <div>
                <div className="font-semibold text-foreground text-lg">95%</div>
                <div>Success Rate</div>
              </div>
            </div>
          </div>

          <div className="flex-1 relative  overflow-hidden flex items-center justify-center">
            <div className="w-[600px] h-[600px] md:w-[700px] md:h-[700px] lg:w-[900px] lg:h-[900px] xl:w-[700px] xl:h-[700px]">
              <SplineScene
                scene="https://prod.spline.design/UbM7F-HZcyTbZ4y3/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
