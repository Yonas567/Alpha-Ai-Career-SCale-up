import { BASE_URL } from "@/app/constants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await axios.get(`${BASE_URL}/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({
      error: err.response?.data || "Something went wrong",
    });
  }
}

export async function PATCH(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const body = await request.json();

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await axios.patch(`${BASE_URL}/profile`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({
      error: err.response?.data || "Something went wrong",
    });
  }
}
