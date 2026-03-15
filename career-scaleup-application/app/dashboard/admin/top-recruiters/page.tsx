"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileApi } from "@/app/api/profile";
import { Role, User } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusCard } from "@/components/admin/status-cards";

export default function TopRecruiters() {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: ProfileApi.getAllUsers,
  });

  const {
    data: jobs,
    isLoading: isJobsLoading,
    isError: isJobsError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: ProfileApi.getAllUsers,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-64 w-full rounded-md" />
      </div>
    );
  }

  if (isError || !users) {
    return (
      <p className="text-sm text-muted-foreground">
        Failed to load recruiters.
      </p>
    );
  }

  const recruiters = users.filter((user: User) => user.role === Role.Recruiter);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Top Recruiters</h2>
        <p className="text-sm text-muted-foreground">
          Companies actively hiring and posting jobs
        </p>
      </div>

      <div className="flex w-full">
        <StatusCard label="Total Recruiters" value={recruiters.length} />
        <StatusCard label="Total Jobs Posted" value={recruiters.length} />
      </div>

      <div className="rounded-lg border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Recruiter</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Jobs Posted</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {recruiters.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-sm text-muted-foreground py-10"
                >
                  No recruiters found
                </TableCell>
              </TableRow>
            ) : (
              recruiters.map((recruiter) => (
                <TableRow key={recruiter.id} className="hover:bg-muted/50">
                  <TableCell className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={recruiter.logoUrl as string} />
                      <AvatarFallback>
                        {recruiter.fullName?.charAt(0) ||
                          recruiter.companyName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="font-medium leading-none">
                        {recruiter.fullName || recruiter.companyName}
                      </p>
                      <p className="text-xs text-muted-foreground">Recruiter</p>
                    </div>
                  </TableCell>

                  <TableCell>
                    {recruiter.companyName || recruiter.fullName || "-"}
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {recruiter.email}
                  </TableCell>

                  <TableCell>{recruiter.recruiterJobs?.length}</TableCell>

                  <TableCell className="text-muted-foreground">
                    {new Date(recruiter.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
