import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { BASE_URL } from "@/app/constants";

export async function POST(request: NextRequest) {
  const { email, password, rememberMe } = await request.json();

  const user = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
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
    maxAge: rememberMe ? 60 * 60 * 24 : 60 * 60 * 24 * 14,
  });

  response.cookies.set("role", decodedToken.role, {
    httpOnly: false,
    maxAge: rememberMe ? 60 * 60 * 24 : 60 * 60 * 24 * 14,
  });

  response.cookies.set(
    "onboarding",
    decodedToken.onboarding as unknown as string,
    {
      httpOnly: false,
      maxAge: rememberMe ? 60 * 60 * 24 : 60 * 60 * 24 * 14,
    }
  );

  return response;
}
