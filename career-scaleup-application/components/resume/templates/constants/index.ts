import { ResumeData } from "@/app/types";

export const MOCK_TEMPLATE_DATA: ResumeData = {
  id: "demo_resume_001",
  userId: "demo_user",
  generatedAt: new Date().toISOString(),
  hobbies: ["Reading", "Problem Solving"],
  isActive: true,
  isOptimized: false,
  template: "classic",

  basics: {
    id: "demo_basics",
    fullName: "Alex Johnson",
    title: "Software Engineer",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    website: "www.alexjohnson.dev",
    linkedin: "linkedin.com/in/alexjohnson",
    github: "github.com/alexjohnson",
    summary:
      "Detail-oriented software engineer with experience building scalable web applications and working across the full development lifecycle. Strong focus on clean architecture, performance, and usability.",
    locationId: "new-york",
    resumeId: "demo_resume_001",
  },

  skills: {
    id: "demo_skills",
    languages: ["JavaScript", "TypeScript", "Python"],
    frameworks: ["React", "Next.js", "Express"],
    databases: ["PostgreSQL", "MongoDB"],
    tools: ["Git", "Docker", "Vercel", "Jest"],
    other: ["REST APIs", "System Design", "Agile"],
  },

  educations: [
    {
      id: "demo_edu",
      resumeId: "demo_resume_001",
      institution: "Metropolitan University",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startDate: "2018-09-01",
      endDate: "2022-06-01",
      details: [
        "Graduated with honors",
        "Coursework included data structures and software engineering",
      ],
    },
  ],

  experiences: [
    {
      id: "demo_exp_1",
      resumeId: "demo_resume_001",
      position: "Software Engineer",
      company: "Innovatech Solutions",
      organization: "Innovatech",
      startDate: "2022-07-01",
      endDate: "Present",
      achievements: [
        "Developed reusable React components for internal products",
        "Improved application performance and accessibility",
        "Collaborated with cross-functional teams to deliver features",
      ],
      technologies: ["React", "TypeScript", "Next.js"],
      location: "Remote",
    },
    {
      id: "demo_exp_2",
      resumeId: "demo_resume_001",
      position: "Software Engineering Intern",
      company: "Bright Labs",
      organization: "Bright Labs",
      startDate: "2021-05-01",
      endDate: "2021-08-01",
      achievements: [
        "Assisted in developing REST APIs",
        "Wrote unit tests and documentation",
      ],
      technologies: ["JavaScript", "Node.js"],
      location: "New York, USA",
    },
  ],

  projects: [
    {
      id: "demo_proj",
      resumeId: "demo_resume_001",
      name: "Task Management Dashboard",
      description:
        "A web-based dashboard for managing tasks, tracking progress, and collaborating with teams.",
      link: "https://example.com/project",
      technologies: ["Next.js", "PostgreSQL", "Tailwind CSS"],
      startDate: "2023-01-01",
      endDate: "2023-03-01",
      highlights: [
        "Responsive layout optimized for desktop and mobile",
        "Role-based access control",
      ],
    },
  ],

  awards: [
    {
      id: "demo_award",
      resumeId: "demo_resume_001",
      title: "Employee of the Quarter",
      issuer: "Innovatech Solutions",
      year: "2023",
      details: "Recognized for outstanding performance and collaboration",
    },
  ],

  certifications: [
    {
      id: "demo_cert",
      resumeId: "demo_resume_001",
      name: "Full-Stack Web Development",
      issuer: "Online Learning Platform",
      issueDate: new Date("2021-04-01"),
      expiryDate: new Date("2026-04-01"),
      credentialUrl: "https://example.com/certificate",
    },
  ],

  languages: [
    {
      id: "demo_lang_1",
      resumeId: "demo_resume_001",
      name: "English",
      proficiency: "Native",
    },
    {
      id: "demo_lang_2",
      resumeId: "demo_resume_001",
      name: "Spanish",
      proficiency: "Conversational",
    },
  ],

  volunteerings: [
    {
      id: "demo_vol",
      resumeId: "demo_resume_001",
      organization: "Community Tech Hub",
      role: "Volunteer Developer",
      startDate: new Date("2020-01-01"),
      endDate: new Date("2020-12-01"),
      description:
        "Helped build and maintain websites for local non-profit organizations.",
    },
  ],
};
