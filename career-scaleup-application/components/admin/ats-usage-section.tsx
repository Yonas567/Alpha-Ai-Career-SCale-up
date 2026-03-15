"use client";

import { atsScoreData, mostUsedFeatures } from "@/app/constants";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AtsUsageSection() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">
          ATS & AI Features
        </h2>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-muted-foreground">Avg Score: </span>
              <span className="font-semibold text-foreground tabular-nums">
                72.4
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Weekly Attempts: </span>
              <span className="font-semibold text-foreground tabular-nums">
                2,570
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">AI Reviews: </span>
              <span className="font-semibold text-foreground tabular-nums">
                1,700
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Card className="p-4 border-border bg-card lg:col-span-2">
          <div className="space-y-3">
            <h3 className="text-xs font-medium text-muted-foreground">
              Daily Activity
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={atsScoreData}
                margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
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
                <Bar
                  dataKey="attempts"
                  fill="var(--chart-1)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="reviews"
                  fill="var(--chart-2)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4 border-border bg-card">
          <div className="space-y-3">
            <h3 className="text-xs font-medium text-muted-foreground">
              Top Features
            </h3>
            <div className="space-y-2">
              {mostUsedFeatures.map((item, index) => (
                <div key={item.feature} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground">{item.feature}</span>
                    <span className="font-medium tabular-nums text-foreground">
                      {item.usage.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-chart-1 rounded-full"
                      style={{
                        width: `${
                          (item.usage / mostUsedFeatures[0].usage) * 100
                        }%`,
                      }}
                    />
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
