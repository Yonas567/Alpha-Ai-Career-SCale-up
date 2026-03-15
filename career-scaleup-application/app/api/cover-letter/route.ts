import { BASE_URL } from "@/app/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  const response = await fetch(`${BASE_URL}/cover-letter`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return NextResponse.json(await response.json());
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { mode, payload } = await request.json();
  const response = await fetch(`${BASE_URL}/cover-letter/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ mode, payload }),
  });
  return NextResponse.json(await response.json());
}
