"use client";

import { Users, Building2, Briefcase, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
  suffix?: string;
}

export function TrustIndicators() {
  const [counters, setCounters] = useState({
    users: 0,
    companies: 0,
    matches: 0,
    success: 0,
  });

  useEffect(() => {
    const targets = { users: 10000, companies: 500, matches: 5000, success: 95 };
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    const timers = Object.keys(targets).map((key) => {
      const target = targets[key as keyof typeof targets];
      let current = 0;
      const step = target / steps;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounters((prev) => ({ ...prev, [key]: Math.floor(current) }));
      }, increment);

      return timer;
    });

    return () => timers.forEach((timer) => clearInterval(timer));
  }, []);

  const stats: Stat[] = [
    {
      icon: <Users className="h-8 w-8" />,
      value: counters.users.toLocaleString(),
      label: "Active Job Seekers",
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      value: counters.companies.toLocaleString(),
      label: "Companies Using Platform",
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      value: counters.matches.toLocaleString(),
      label: "Successful Matches",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      value: `${counters.success}%`,
      label: "Interview Success Rate",
    },
  ];

  return (
    <section className="py-16 bg-muted/30 dark:bg-black/50 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-3">
              <div className="flex justify-center text-[#4d32fb]">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground">
                {stat.value}
                {stat.suffix}
              </div>
              <div className="text-sm md:text-base text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

