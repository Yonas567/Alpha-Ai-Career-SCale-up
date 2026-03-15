interface StatusCard {
  label: string;
  value: string;
  change?: number;
  unit?: string;
}

export const StatusCardData: StatusCard[] = [
  { label: "Total Requests", value: "289", unit: "K" },
  { label: "Active Users", value: "12,483" },
  { label: "New Signups", value: "2,847" },
  { label: "Response Time", value: "245", unit: "ms" },
];

export const requestsData = [
  { time: "00:00", value: 2840, prev: 2650 },
  { time: "02:00", value: 2320, prev: 2180 },
  { time: "04:00", value: 1950, prev: 1820 },
  { time: "06:00", value: 2650, prev: 2380 },
  { time: "08:00", value: 3840, prev: 3520 },
  { time: "10:00", value: 4320, prev: 3980 },
  { time: "12:00", value: 4820, prev: 4450 },
];

export const conversionData = [
  { date: "Jan 1", visits: 12400, signups: 2840, conversions: 842 },
  { date: "Jan 8", visits: 14200, signups: 3120, conversions: 921 },
  { date: "Jan 15", visits: 13800, signups: 2980, conversions: 894 },
  { date: "Jan 22", visits: 16400, signups: 3540, conversions: 1048 },
  { date: "Jan 29", visits: 18200, signups: 4120, conversions: 1236 },
  { date: "Feb 5", visits: 19100, signups: 4380, conversions: 1314 },
  { date: "Feb 12", visits: 20483, signups: 4720, conversions: 1416 },
];

export const atsScoreData = [
  { date: "Mon", attempts: 240, reviews: 120 },
  { date: "Tue", attempts: 320, reviews: 210 },
  { date: "Wed", attempts: 280, reviews: 180 },
  { date: "Thu", attempts: 410, reviews: 290 },
  { date: "Fri", attempts: 490, reviews: 340 },
  { date: "Sat", attempts: 380, reviews: 250 },
  { date: "Sun", attempts: 450, reviews: 310 },
];

export const mostUsedFeatures = [
  { feature: "ATS Score Check", usage: 2847 },
  { feature: "Resume Review", usage: 2134 },
  { feature: "Job Matching", usage: 1923 },
  { feature: "Interview Prep", usage: 1248 },
  { feature: "Cover Letter AI", usage: 412 },
];

export const jobsPostedData = [
  { week: "W1", jobs: 380, views: 12400 },
  { week: "W2", jobs: 420, views: 13200 },
  { week: "W3", jobs: 510, views: 16800 },
  { week: "W4", jobs: 480, views: 15600 },
  { week: "W5", jobs: 620, views: 19800 },
  { week: "W6", jobs: 720, views: 23400 },
];

export const topRecruiters = [
  { name: "TechCorp Inc.", jobsPosted: 142, views: 3840 },
  { name: "Global Hiring", jobsPosted: 128, views: 3210 },
  { name: "StartUp Ventures", jobsPosted: 95, views: 2840 },
  { name: "Enterprise Sol.", jobsPosted: 87, views: 2340 },
  { name: "Innovation Labs", jobsPosted: 76, views: 1920 },
];