import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "@/app/constants";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = request.cookies.get("access_token")?.value;
  const { id } = await params;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const response = await fetch(`${BASE_URL}/application/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return NextResponse.json(error, {
      status: response.status,
    });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
