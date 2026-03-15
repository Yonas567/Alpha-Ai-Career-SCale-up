"use client";

import { Card } from "@/components/ui/card";
import { StatusCardData } from "@/app/constants";
import { useQuery } from "@tanstack/react-query";
import { ProfileApi } from "@/app/api/profile";

export default function StatsCards() {
  const {
    data: users,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: ProfileApi.getAllUsers,
  });

  if (!users || isUsersLoading || isUsersError) return <></>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      <StatusCard label="Total Requests" value={289} unit="K" />
      <StatusCard label="Active Users" value={users.length} />
      <StatusCard label="New Signups" value={users.length} />
      <StatusCard label="Response Time" value={245} unit="ms" />
    </div>
  );
}

type StatusCardProps = {
  label: string;
  value: number;
  unit?: string;
};

export function StatusCard({ label, value, unit }: StatusCardProps) {
  return (
    <Card
      key={label}
      className="p-4 border-border bg-card hover:bg-card/80 transition-colors"
    >
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <div className="flex items-baseline gap-1">
          <p className="text-2xl font-semibold text-foreground tabular-nums">
            {value}
          </p>
          {unit && (
            <span className="text-sm text-muted-foreground">{unit}</span>
          )}
        </div>
      </div>
    </Card>
  );
}
