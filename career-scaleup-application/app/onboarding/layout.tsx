import DashboardContextProvider from "../context/DashboardContext";

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
  ) as { sub: string; fullName: string; role: string; onboarding: boolean };

  return (
    <DashboardContextProvider
      id={decodedToken.sub}
      fullName={decodedToken.fullName}
      role={role}
      onBoardingStatus={decodedToken.onboarding}
    >
      <div className="@component/main overflow-hidden w-full h-full">
        {children}
      </div>
    </DashboardContextProvider>
  );
}
