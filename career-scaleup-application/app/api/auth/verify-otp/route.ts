import { BASE_URL } from "@/app/constants";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const { fullName, email, password, role, otp } = await request.json();

  const user = await fetch(`${BASE_URL}/auth/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fullName, email, password, role, otp }),
  });

  const userData = await user.json();

  const response = NextResponse.json(userData);

  const decodedToken = jwt.verify(
    userData.accesToken,
    process.env.NEXT_PUBLIC_JWT_PUBLIC_KEY!,
    {
      algorithms: ["RS256"],
    }
  ) as { role: string; onboarding: boolean };

  response.cookies.set("access_token", userData.accesToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  response.cookies.set("role", decodedToken.role, {
    httpOnly: false,
    maxAge: 60 * 60 * 24,
  });

  response.cookies.set(
    "onboarding",
    decodedToken.onboarding as unknown as string,
    {
      httpOnly: false,
      maxAge: 60 * 60 * 24,
    }
  );

  return response;
}
