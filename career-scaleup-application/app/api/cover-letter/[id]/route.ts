import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "@/app/constants";
import axios from "axios";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = request.cookies.get("access_token")?.value;
  const { id } = await params;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await axios.get(`${BASE_URL}/cover-letter/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return NextResponse.json(response.data);
  } catch {
    NextResponse.json(
      { message: "Failed to fetch cover letter" },
      { status: 500 }
    );
  }
}
