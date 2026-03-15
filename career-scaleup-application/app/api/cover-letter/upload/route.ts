import { BASE_URL } from "@/app/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const formData = await request.formData();
  const response = await fetch(`${BASE_URL}/cover-letter/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();
  return NextResponse.json(data);
}
