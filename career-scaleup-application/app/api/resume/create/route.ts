import { BASE_URL } from "@/app/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const {data} = await request.json();

  const resume = await fetch(`${BASE_URL}/resumes/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  });

  return NextResponse.json(await resume.json());
}
