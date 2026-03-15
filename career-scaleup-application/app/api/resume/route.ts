import { BASE_URL } from "@/app/constants";
import { resumeModelMap } from "@/app/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  const resumes = await fetch(`${BASE_URL}/resumes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!resumes.ok) {
    return NextResponse.json(
      { message: "Failed to fetch resumes" },
      { status: 500 },
    );
  }
  const data = await resumes.json();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const { id } = await request.json();
  const token = request.cookies.get("access_token")?.value;

  const resume = await fetch(`${BASE_URL}/resumes/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return NextResponse.json(await resume.json());
}

export async function PATCH(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  const { id, section, data } = await request.json();

  const model = resumeModelMap[section];

  const resume = await fetch(`${BASE_URL}/resumes/${model}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return NextResponse.json(resume);
}

export async function DELETE(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  const { id } = await request.json();

  const resume = await fetch(`${BASE_URL}/resumes/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return NextResponse.json(resume);
}
