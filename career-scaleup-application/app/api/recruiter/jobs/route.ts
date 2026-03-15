import { BASE_URL } from "@/app/constants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await axios
      .get(`${BASE_URL}/jobs/postedJobs`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);

    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch Jobs" });
  }
}

export async function PATCH(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { jobId, applications, ...rest } = body;

    const response = await axios
      .patch(
        `${BASE_URL}/jobs/${jobId}/update`,
        { ...rest },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.data);

    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch Jobs" });
  }
}
