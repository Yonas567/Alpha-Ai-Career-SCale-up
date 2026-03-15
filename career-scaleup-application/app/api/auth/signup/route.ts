import { BASE_URL } from "@/app/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { fullName, email, password, role } = await request.json();

  const user = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fullName, email, password, role }),
  });

  const userData = await user.json();
  const response = NextResponse.json(userData);

  response.cookies.set("otp_token", userData.otpToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 5 * 60 * 1000,
  });

  return response;
}
