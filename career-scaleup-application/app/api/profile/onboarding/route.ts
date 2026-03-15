import { BASE_URL } from "@/app/constants";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await fetch(`${BASE_URL}/onboarding`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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
