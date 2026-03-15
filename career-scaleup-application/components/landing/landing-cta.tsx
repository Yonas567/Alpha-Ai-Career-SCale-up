"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { SparklesCore } from "@/components/ui/sparkles";
import Link from "next/link";

export function LandingCTA() {
  return (
    <section id="cta" className="relative py-24 overflow-hidden bg-background dark:bg-black">
      <AnimatedGradientBackground
        Breathing={true}
        gradientColors={["#0A0A0A", "#4d32fb", "#6b4fff", "#8a6cff", "#4d32fb", "#6b4fff", "#4d32fb"]}
        gradientStops={[35, 50, 60, 70, 80, 90, 100]}
      />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="relative h-32 w-full flex flex-col items-center justify-center">
            <div className="w-full absolute inset-0">
              <SparklesCore
                id="ctasparticles"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={100}
                className="w-full h-full"
                particleColor="currentColor"
                speed={0.8}
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground relative z-20 text-balance">
              Ready to transform your hiring with AI?
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth?tab=signup">
              <Button size="lg" variant="secondary" className="bg-foreground text-background hover:bg-foreground/90 dark:bg-white dark:text-black dark:hover:bg-gray-100">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-muted">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

