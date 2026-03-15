import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { BASE_URL } from "@/app/constants";

export async function POST(request: NextRequest) {
  const { accessToken } = await request.json();

  const user = await fetch(`${BASE_URL}/auth/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accessToken }),
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
  });

  response.cookies.set("role", decodedToken.role, {
    httpOnly: false,
  });

  response.cookies.set(
    "onboarding",
    decodedToken.onboarding as unknown as string,
    {
      httpOnly: false,
    }
  );

  return response;
}
