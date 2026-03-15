import { BASE_URL } from "@/app/constants";
import { resumeModelMap } from "@/app/types";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  const { id, section, data } = await request.json();

  const model = resumeModelMap[section];

  const resume = await fetch(`${BASE_URL}/resumes/${model}/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return resume;
}
