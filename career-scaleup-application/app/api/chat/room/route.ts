import { BASE_URL } from "@/app/constants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const response = await axios
    .get(`${BASE_URL}/messaging/conversation`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error);
    });

  return NextResponse.json(response);
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const body = await request.json();

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const response = await axios
    .post(`${BASE_URL}/messaging/conversation`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error);
    });

  return NextResponse.json(response);
}
