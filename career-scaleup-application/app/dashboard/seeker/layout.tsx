"use client";

import JobsManagerProvider from "@/context/JobsManagerProvider";
import ResumeManagerProvider from "@/context/ResumeManagerProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ResumeManagerProvider>
      <JobsManagerProvider>
        <div className="@component/main px-6 h-full w-full pb-4">
          {children}
        </div>
      </JobsManagerProvider>
    </ResumeManagerProvider>
  );
}
