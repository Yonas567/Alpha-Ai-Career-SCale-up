"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/spline-scene";
import Link from "next/link";

export function LandingHero() {
  return (
    <section className="relative min-h-screen pt-24 flex items-center justify-center overflow-hidden bg-background dark:bg-black">
      <div className="container mx-auto px-4">
        <Card className="w-full h-[500px] bg-card/96 dark:bg-black/96 relative overflow-hidden border-none">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" />

          <div className="flex h-full">
            {/* Left content */}
            <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text">
                AI-Powered Talent Matching
              </h1>
              <p className="mt-4 text-muted-foreground max-w-lg">
                Connect top talent with perfect opportunities. Our AI analyzes resumes, coaches candidates, and helps
                recruiters find the ideal match in seconds.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/auth">
                  <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 dark:bg-white dark:text-black dark:hover:bg-gray-100">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-muted-foreground hover:bg-muted"
                >
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-8 text-sm text-muted-foreground mt-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
                  <span>AI Resume Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
                  <span>Instant Matching</span>
                </div>
              </div>
            </div>

            {/* Right content */}
            <div className="flex-1 relative">
              <SplineScene
                scene="https://prod.spline.design/UbM7F-HZcyTbZ4y3/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

