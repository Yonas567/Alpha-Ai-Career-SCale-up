"use client";

import { jobsPostedData, topRecruiters } from "@/app/constants";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RecruiterActivitySection() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">
          Recruiter Activity
        </h2>
        <div className="flex items-center gap-6 text-xs">
          <div>
            <span className="text-muted-foreground">Total Jobs: </span>
            <span className="font-semibold text-foreground tabular-nums">
              5,482
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Candidate Views: </span>
            <span className="font-semibold text-foreground tabular-nums">
              127,340
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Card className="p-4 border-border bg-card lg:col-span-2">
          <div className="space-y-3">
            <h3 className="text-xs font-medium text-muted-foreground">
              Jobs Posted & Views per Week
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={jobsPostedData}
                margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  vertical={false}
                />
                <XAxis
                  dataKey="week"
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--popover)",
                    border: `1px solid var(--border)`,
                    borderRadius: "0.375rem",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="jobs"
                  stroke="var(--chart-3)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4 border-border bg-card">
          <div className="space-y-3">
            <h3 className="text-xs font-medium text-muted-foreground">
              Top Recruiters
            </h3>
            <div className="space-y-0.5">
              {topRecruiters.map((recruiter, index) => (
                <div
                  key={recruiter.name}
                  className="flex items-center justify-between py-2 text-xs border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-muted-foreground tabular-nums w-4">
                      {index + 1}
                    </span>
                    <span className="text-foreground truncate">
                      {recruiter.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs tabular-nums">
                    <span className="text-foreground font-medium">
                      {recruiter.jobsPosted}
                    </span>
                    <span className="text-muted-foreground">
                      {recruiter.views.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
