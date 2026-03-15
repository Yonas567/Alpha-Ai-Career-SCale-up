"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { roleMap } from "@/app/constants";
import { Role } from "@/app/types";
import { NewLandingNav } from "@/components/landing/new-landing-nav";
import { NewLandingHero } from "@/components/landing/new-landing-hero";
import { TrustIndicators } from "@/components/landing/trust-indicators";
import { PlatformOverview } from "@/components/landing/platform-overview";
import { EnhancedFeatures } from "@/components/landing/enhanced-features";
import { PlatformScreenshots } from "@/components/landing/platform-screenshots";
import { HowItWorks } from "@/components/landing/how-it-works";
import { BenefitsSection } from "@/components/landing/benefits-section";
import { FAQSection } from "@/components/landing/faq-section";
import { NewLandingCTA } from "@/components/landing/new-landing-cta";
import { NewLandingFooter } from "@/components/landing/new-landing-footer";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const token = getCookie("access_token");
    const role = getCookie("role") as Role | null;

    // If authenticated, redirect to dashboard
    if (token && role && role in roleMap) {
      router.push(roleMap[role]);
    }
  }, [router]);

  // Show landing page for unauthenticated users
  return (
    <main className="w-full bg-background dark:bg-black overflow-hidden">
      <NewLandingNav />
      <NewLandingHero />
      <TrustIndicators />
      <PlatformOverview />
      <EnhancedFeatures />
      <PlatformScreenshots />
      <HowItWorks />
      <BenefitsSection />
      <FAQSection />
      <NewLandingCTA />
      <NewLandingFooter />
    </main>
  );
}
