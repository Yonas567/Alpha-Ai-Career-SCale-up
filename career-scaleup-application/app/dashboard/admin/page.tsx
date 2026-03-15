"use client";

import AtsUsageSection from "@/components/admin/ats-usage-section";
import GrowthCharts from "@/components/admin/growth-chart";
import StatsCards from "@/components/admin/status-cards";
import RecruiterActivitySection from "@/components/admin/recruiter-analytic-section";

export default function AdminDashboardPage() {
  return (
    <div className="flex-1 space-y-6 h-full overflow-y-scroll hide-scroll">
      <header className="flex items-center justify-between pt-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Dashboard Analytics
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Overview of platform growth, user activity, and ATS performance.
          </p>
        </div>
      </header>

      <StatsCards />
      <GrowthCharts />
      <RecruiterActivitySection />
      <AtsUsageSection />
    </div>
  );
}
