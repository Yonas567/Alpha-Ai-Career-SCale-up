import { Role } from "../types";

export * from "./resume";
export * from "./menu";
export * from "./jobs";
export * from "./admin"

export const roleMap: Record<string, string> = {
  [Role.Admin]: "/dashboard/admin",
  [Role.Recruiter]: "/dashboard/recruiter",
  [Role.Seeker]: "/dashboard/seeker",
};

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const BASE_AI_URL = process.env.NEXT_PUBLIC_BASE_AI_URL;
export const PUBLIC_POSTHOG_KEY=process.env.NEXT_PUBLIC_POSTHOG_KEY;
export const PUBLIC_POSTHOG_HOST=process.env.NEXT_PUBLIC_POSTHOG_HOST;
