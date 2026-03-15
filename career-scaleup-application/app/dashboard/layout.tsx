import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import DashboardContextProvider from "../context/DashboardContext";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { cookies } from "next/headers";
import { Role } from "../types";
import jwt from "jsonwebtoken";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value as Role;
  const token = cookieStore.get("access_token")?.value as string;

  if (!role) {
    throw new Error("Role not found.");
  }

  if (!token) {
    throw new Error("Token not found.");
  }

  const decodedToken = jwt.verify(
    token,
    process.env.NEXT_PUBLIC_JWT_PUBLIC_KEY!,
    {
      algorithms: ["RS256"],
    }
  ) as { fullName: string; role: string; onboarding: boolean };

  return (
    <DashboardContextProvider
      fullName={decodedToken.fullName}
      role={role}
      onBoardingStatus={decodedToken.onboarding}
    >
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 14)",
          } as React.CSSProperties
        }
        defaultOpen={false}
      >
        <AppSidebar />
        <SidebarInset className="h-screen w-screen shadow-none! m-0! bg-white dark:bg-black rounded-none!">
          <AppHeader />
          <div className="@component/main overflow-hidden w-full  h-full">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </DashboardContextProvider>
  );
}
