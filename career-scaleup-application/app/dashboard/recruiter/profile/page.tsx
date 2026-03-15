"use client";

import { Mail, Phone, MapPin, Briefcase, Calendar, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@/app/types";
import ProfileSkeleton from "@/components/profile/skeleton/profile-skeleton";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import EditCompanyProfileModal from "@/components/profile/edit-company-profile-modal";
import RecruiterJobEmptyState from "@/components/job/recruiter/recruiter-job-empty-state";
import AvatarUpload from "@/components/upload-image";
import { OnboardingData } from "@/app/onboarding/page";

export default function ProfilePage() {
  const fetchProfile = async () => {
    const response = await axios.get("/api/profile");
    return response.data as User;
  };

  const {
    data: user,
    isPending,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  const handleChange = (
    field: keyof OnboardingData,
    value: string | string[]
  ) => {};

  const [editProfileOpen, setEditProfileOpen] = useState(false);

  if (isPending || !user) {
    return (
      <main className="h-full bg-muted py-8 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto h-full overflow-y-scroll hide-scroll">
          <ProfileSkeleton />;
        </div>
      </main>
    );
  }
  if (error) {
    return <>{error.message}</>;
  }

  return (
    <div className="h-full">
      <main className="flex flex-col w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8 h-full overflow-y-scroll hide-scroll">
        <Dialog>
          <div className="">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <AvatarUpload userId={user.id} onChange={handleChange} />

              <div className="flex-1">
                <div className="mb-4">
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {user.companyName}
                  </h1>
                  <p className="text-lg text-muted-foreground">{user.role}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span>{user.email}</span>
                  </div>
                  {user.phoneNumber && (
                    <div className="flex items-center gap-2">
                      <Phone size={16} />
                      <span>{user.phoneNumber}</span>
                    </div>
                  )}
                </div>
              </div>

              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600">
                  <Edit2 size={16} className="mr-2" />
                  Edit Profile
                </Button>
              </DialogTrigger>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {user.recruiterJobs?.length}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Total Job Openings
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {user.recruiterJobs?.reduce((sum, job) => {
                      return sum + (job.applications?.length ?? 0);
                    }, 0)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Active Candidates
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {user.recruiterJobs?.reduce((sum, job) => {
                      const hiredCount =
                        job.applications?.filter(
                          (app) => app.status === "Hired"
                        ).length ?? 0;
                      return sum + hiredCount;
                    }, 0)}
                  </div>
                  <p className="text-sm text-muted-foreground">Hired</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase size={20} />
                Company Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground leading-relaxed">
                {user.companyDescription || "Add Company Description"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar size={20} />
                Recent Job Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              {user.recruiterJobs?.length && user.recruiterJobs?.length > 0 ? (
                <div className="space-y-4">
                  {user.recruiterJobs?.map((job, idx) => (
                    <div
                      key={idx}
                      className="flex items-start justify-between pb-4 border-b border-border last:border-0"
                    >
                      <div>
                        <p className="font-medium text-foreground">
                          {job.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {job.companyName} •{" "}
                          {new Date(job.postedAt).toDateString()}
                        </p>
                      </div>
                      <Badge
                        className={
                          job.status === "Open" ? `bg-green-500` : `bg-red-500`
                        }
                      >
                        {job.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <RecruiterJobEmptyState />
              )}
            </CardContent>
          </Card>

          <EditCompanyProfileModal isOpen={editProfileOpen} user={user} />
        </Dialog>
      </main>
    </div>
  );
}
