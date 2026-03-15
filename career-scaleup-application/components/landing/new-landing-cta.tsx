"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { SparklesCore } from "@/components/ui/sparkles";
import Link from "next/link";

export function NewLandingCTA() {
  return (
    <section className="relative py-24 overflow-hidden bg-background dark:bg-black">
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

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of job seekers and recruiters who are already using Career ScaleUp to find success.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth?tab=signup">
              <Button size="lg" className="bg-[#4d32fb] hover:bg-[#4d32fb]/90 text-white px-8 h-12">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-muted px-8 h-12">
              Schedule Demo
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            No credit card required • Free forever plan available • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}

