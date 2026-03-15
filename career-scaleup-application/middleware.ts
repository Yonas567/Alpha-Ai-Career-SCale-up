import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { roleMap } from "./app/constants";
import { Role } from "./app/types";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("access_token")?.value;
  const role = req.cookies.get("role")?.value as Role | undefined;
  const onboarding = req.cookies.get("onboarding")?.value; // "true" | "false"
  const otpToken = req.cookies.get("otp_token")?.value;

  const isAuthPage = pathname.startsWith("/auth");
  const isOnboardingPage = pathname.startsWith("/onboarding");
  const isHomePage = pathname === "/";

  if (
    token &&
    role &&
    onboarding === "true" &&
    !isOnboardingPage &&
    !isAuthPage &&
    !isHomePage
  ) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }
  if (isOnboardingPage) {
    if (!token || !role) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    if (onboarding === "false" && role in roleMap) {
      return NextResponse.redirect(new URL(roleMap[role], req.url));
    }

    return NextResponse.next();
  }

  if (pathname === "/dashboard") {
    if (!token || !role || !(role in roleMap)) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    return NextResponse.redirect(
      new URL(`/dashboard/${role.toLowerCase()}`, req.url)
    );
  }

  if (pathname.startsWith("/dashboard")) {
    if (!token || !role || !(role in roleMap)) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    if (pathname.startsWith("/dashboard/admin") && role !== Role.Admin) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    if (
      pathname.startsWith("/dashboard/recruiter") &&
      role !== Role.Recruiter
    ) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    if (pathname.startsWith("/dashboard/seeker") && role !== Role.Seeker) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    return NextResponse.next();
  }

  if (pathname.startsWith("/auth/verify-otp")) {
    if (!otpToken) {
      return NextResponse.redirect(new URL("/auth/signup", req.url));
    }
    return NextResponse.next();
  }

  // Allow landing page for unauthenticated users
  if (pathname === "/") {
    // If authenticated, redirect to dashboard (check onboarding first)
    if (token && role) {
      if (onboarding === "true") {
        return NextResponse.redirect(new URL("/onboarding", req.url));
      }
      if (role in roleMap) {
        return NextResponse.redirect(new URL(roleMap[role], req.url));
      }
    }
    // If not authenticated, show landing page
    return NextResponse.next();
  }

  // Redirect authenticated users from auth pages to dashboard
  if (
    (pathname === "/auth" || pathname === "/auth/verify-otp") &&
    token &&
    role &&
    role in roleMap
  ) {
    if (onboarding === "true") {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }
    return NextResponse.redirect(new URL(roleMap[role], req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/:path*", "/dashboard/:path*", "/onboarding"],
};
