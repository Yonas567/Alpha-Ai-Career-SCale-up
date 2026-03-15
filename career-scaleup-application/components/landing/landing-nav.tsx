"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export function LandingNav() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 dark:bg-black/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-foreground">Career ScaleUp</div>
        <div className="hidden md:flex gap-8 text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">
            Features
          </a>
          <a href="#services" className="hover:text-foreground transition">
            For Recruiters
          </a>
          <a href="#cta" className="hover:text-foreground transition">
            For Applicants
          </a>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/auth">
            <Button
              size="sm"
              className="bg-[#4d32fb] hover:bg-[#4d32fb]/90 text-white"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
