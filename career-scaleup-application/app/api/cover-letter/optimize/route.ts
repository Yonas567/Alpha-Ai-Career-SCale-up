import { BASE_URL } from "@/app/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { coverLetter, job, company } = await request.json();
  const response = await fetch(`${BASE_URL}/cover-letter/optimize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ coverLetter, job, company }),
  });
  return NextResponse.json(await response.json());
}
