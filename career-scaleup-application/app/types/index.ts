import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";

export enum Role {
  Seeker = "Seeker",
  Recruiter = "Recruiter",
  Admin = "Admin",
}

export type userRegistrationData = {
  accessToken: string;
  userId: string;
  fullName: string;
  email: string;
  role: Role;
  otp?: string;
};

export type UserRegistrationData = {
  fullName: string;
  email: string;
  password: string;
  role: Role;
  otp?: string;
};

export interface AuthContextType {
  userRegistrationData: UserRegistrationData | null;
  login: (email: string, password: string) => Promise<void>;
  sendOtpVerificationCode: (
    fullName: string,
    email: string,
    password: string,
    role: Role
  ) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (
    email: string,
    newPassword: string,
    confirmPassword: string
  ) => Promise<void>;
  verifyAndRegisterUser: (
    userRegistrationData: UserRegistrationData
  ) => Promise<void>;
}

// Resume

export interface ResumeBuilderProps {
  isOpen: boolean;
  onClose: () => void;
}

export type Section =
  | "basics"
  | "education"
  | "experience"
  | "projects"
  | "skills"
  | "keywords"
  | "preview"
  | "awards"
  | "hobbies"
  | "ai-cover-letter";

export type ResumeData = {
  id: string;
  userId: string;
  generatedAt: string;
  hobbies: string[];
  isActive: boolean;
  isOptimized: boolean;
  template: string;
  basics: {
    id: string;
    fullName: string;
    title: string;
    email: string;
    phone: string;
    website: string;
    linkedin: string;
    github: string;
    summary: string;
    locationId: string;
    resumeId: string;
  };
  skills: {
    id: string;
    languages: string[];
    frameworks: string[];
    databases: string[];
    tools: string[];
    other: string[];
  };
  educations: Array<{
    id: string;
    resumeId: string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    details: string[];
  }>;
  experiences: Array<{
    id: string;
    resumeId: string;
    position: string;
    company: string;
    organization: string;
    startDate: string;
    endDate: string;
    achievements: string[];
    technologies: string[];
    location: string;
  }>;
  projects: Array<{
    id: string;
    resumeId: string;
    name: string;
    description: string;
    link: string;
    technologies: string[];
    startDate: string;
    endDate: string;
    highlights: string[];
  }>;
  awards: Array<{
    id: string;
    resumeId: string;
    title: string;
    issuer: string;
    year: string;
    details: string;
  }>;
  certifications: Array<{
    id: string;
    resumeId: string;
    name: string;
    issuer: string;
    issueDate: Date;
    expiryDate: Date;
    credentialUrl: string;
  }>;
  languages: Array<{
    id: string;
    resumeId: string;
    name: string;
    proficiency: string;
  }>;
  volunteerings: Array<{
    id: string;
    resumeId: string;
    organization: string;
    role: string;
    startDate: Date;
    endDate: Date;
    description: string;
  }>;
};

export type BasicsFormData = {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  summary: string;
};

export type BasicsSectionProps = {
  data: ResumeData["basics"];
};

export type EducationFormData = {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
};

export type EducationSectionProps = {
  data: ResumeData["educations"];
  setEntryData: (sectionId: SectionId, entry: any) => void;
};

export type ExperienceFormData = {
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type ExperienceSectionProps = {
  data: ResumeData["experiences"];
  setEntryData: (sectionId: SectionId, entry: any) => void;
};

export type AwardSectionProps = {
  data: ResumeData["awards"];
  setEntryData: (sectionId: SectionId, entry: any) => void;
};

export type CertificationSectionProps = {
  data: ResumeData["certifications"];
  setEntryData: (sectionId: SectionId, entry: any) => void;
};

export type SkillsSectionProps = {
  data: ResumeData["skills"];
  setEntryData: (sectionId: SectionId, entry: any) => void;
};

export type HobbiesSectionProps = {
  data: ResumeData["hobbies"];
  setEntryData: (sectionId: SectionId, entry: any) => void;
};

export type LanguagesSectionProps = {
  data: ResumeData["languages"];
  setEntryData: (sectionId: SectionId, entry: any) => void;
};

export type VolunteeringsSectionProps = {
  data: ResumeData["volunteerings"];
  setEntryData: (sectionId: SectionId, entry: any) => void;
};

export type ProjectsSectionProps = {
  data: ResumeData["projects"];
  setEntryData: (sectionId: SectionId, entry: any) => void;
};

export type ProjectsFormData = {
  projectName: string;
  description: string;
  technologies: string;
  projectLink: string;
};

export type ResumePreviewProps = {
  resumeData: ResumeData;
};

export type ResumeManagerContextType = {
  resumes: ResumeData[];
  resumeData: ResumeData;
  setResumeData: Dispatch<SetStateAction<ResumeData>>;
  activeResume: ResumeData | undefined;
  createResume: () => Promise<ResumeData>;
  uploadResume: (formData: FormData) => Promise<string | undefined>;

  analyses: Record<string, ResumeResponse>;
  setResumeAnalysis: (resumeId: string, data: ResumeResponse) => void;

  addEntity: UseMutationResult<
    void,
    Error,
    {
      id: string;
      section: SectionId;
      data: any;
    },
    unknown
  >;
  editEntity: (id: string, section: SectionId, data: any) => void;

  uploadProgress: number;
  isUploading: boolean;
  setIsUploading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  // selectedResume: ResumeData;
  // selectResume: (resume: ResumeData) => void;

  getResumeById: (id: string) => Promise<ResumeData | undefined>;
  getResumes: () => void;
};

export type ResumeBuilderNavigationProps = {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  enabledOptionalSections: Section[];
};

export type FieldConfig = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "date" | "url" | "number" | "select";
  placeholder?: string;
  multiline?: boolean;
};

export type SectionId =
  | "basics"
  | "educations"
  | "experiences"
  | "projects"
  | "certifications"
  | "awards"
  | "languages"
  | "volunteerings"
  | "skills"
  | "hobbies";

export type AddEntryProps = {
  sectionId: SectionId;
  entry?: any;
  setEntry: Dispatch<SetStateAction<any>>;
  setIsAddingEntry: Dispatch<SetStateAction<boolean>>;
  onDelete?: (id: string) => void;
};

export const resumeModelMap: Record<string, string> = {
  basics: "basics",
  educations: "education",
  experiences: "experience",
  projects: "project",
  awards: "award",
  certifications: "certification",
  skills: "skills",
  volunteerings: "volunteering",
  languages: "language",
};

export interface AnalysisSection {
  section_name: string;
  alignment_score: number;
  strengths: string[];
  gaps: string[];
  specific_improvements: string[];
  optimization_report: string;
}

export interface SkillCoverage {
  hard_skills: AnalysisSkillsSection;
  soft_skills: AnalysisSkillsSection;
  summary: SkillSummary;
}

export interface AnalysisSkillsSection {
  total_skills: number;
  matched_skills: string[];
  missing_skills: string[];
  coverage_percentage: number;
}

export interface SkillSummary {
  overall_alignment: string;
  notable_strengths: string[];
  notable_gaps: string[];
  recommendations: string[];
}

export interface AnalysisResponse {
  mode: string;
  sections: Record<string, AnalysisSection>;
  skill_coverage: SkillCoverage;
}

//Resume Optimization
export type ResumeSection<T> = {
  section_name: string;
  original_content: T;
  optimized_content: T;
  optimization_report: {
    changes_made: string[];
    keywords_added: string[];
    improvements: string[];
  };
};

export type BasicsContent = {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  github: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  summary: string;
};

export type SkillsContent = {
  languages: string[];
  frameworks: string[];
  databases: string[];
  tools: string[];
  other: string[];
};

export type EducationItem = {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  details: string[];
};

export type ExperienceContent = {
  position: string;
  company: string;
  organization: string;
  startDate: string;
  endDate: string;
  achievements: string[];
  technologies: string[];
  location: string;
};

export type ProjectItem = {
  name: string;
  description: string;
  technologies: string[];
  link: string;
  startDate: string;
  endDate?: string;
  highlights?: string[];
};

export type AwardItem = {
  title: string;
  issuer: string;
  year: string;
  details: string;
};

export type CertificationItem = {
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string | null;
  credentialUrl: string;
};

export type LanguageItem = {
  name: string;
  proficiency: string;
};

export type VolunteeringItem = {
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type ResumeResponse = {
  mode: string;
  sections: {
    basics: ResumeSection<BasicsContent>;
    skills: ResumeSection<SkillsContent>;
    educations: ResumeSection<EducationItem[]>;
    experiences: ResumeSection<ExperienceContent>;
    projects: ResumeSection<ProjectItem[]>;
    awards: ResumeSection<AwardItem[]>;
    certifications: ResumeSection<CertificationItem[]>;
    languages: ResumeSection<LanguageItem[]>;
    volunteerings: ResumeSection<VolunteeringItem[]>;
    hobbies: ResumeSection<string[]>;
  };
};

//Jobs Manager
export interface JobListingsProps {
  selectedJob: Job | null;
  onSelectJob: (jobId: string) => void;
}

export interface Job {
  id: string;
  recruiterId: string;

  companyName: string;
  companyLogo?: string | null;
  companyWebsite?: string | null;

  title: string;
  jobType: string;
  description: string;

  qualifications?: string[];
  benefits?: string[];
  responsibilities?: string[];

  location?: string | null;
  country?: string | null;

  status: "Open" | "Closed";
  workType: "Onsite" | "Hybrid" | "Remote";

  applications?: Application[];

  hourlyRate?: number | null;
  fixedBudget?: number | null;

  salaryMin?: number | null;
  salaryMax?: number | null;

  applicationLink: string;
  source: "internal" | "external";
  easyApplied: boolean;

  postedAt: number;
}

export interface CreateJobDto {
  title: string;
  jobType: string;
  hourlyRate: number;
  fixedBudget: number;
  salaryMin: number;
  salaryMax: number;
  location: string;
  country: string;
  qualifications: Array<string>;
  benefits: Array<string>;
  description: string;
  responsibilities: Array<string>;
  workType: string;
}

export interface CreateJobModalProps {
  onClose: () => void;
}

export interface Application {
  id: string;
  jobId: string;
  seekerId: string;
  coverLetter: string;
  resumeUrl: string;
  status: "Applied" | "ShortListed" | "Hired" | "Rejected";

  seeker?: object;
  appliedAt: Date;
}

export interface JobsAPIResponse {
  pages: string;
  num_pages: string;
  jobs: Job[];
}
export interface JobManagerContextType {
  jobsData: JobsAPIResponse | undefined;
  loading: boolean;
  error: string | null;

  selectedJob: Job | null;
  setSelectedJob: Dispatch<SetStateAction<Job | null>>;
  selectJob: (id: string) => void;

  saveJob: UseMutationResult<
    AxiosResponse<any, any, unknown>,
    Error,
    {
      job: Job;
      source: "external" | "internal";
    },
    unknown
  >;

  searchJobs: (searchTerm: string, location: string) => void;
  searchJobsMutation: UseMutationResult<
    JobsAPIResponse,
    Error,
    {
      searchTerm: string;
      location: string;
    },
    unknown
  >;
}

// resume optimization
// Define the base structure for an optimization report
export type OptimizationReport = {
  changes_made: string[];
  keywords_added: string[];
  improvements: string[];
};

// Define common location type
export type Location = {
  city: string;
  state: string;
  country: string;
};

// Define the structure for each section type
export type BasicsSection = {
  section_name: string;
  original_content: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    website: string;
    linkedin: string;
    github: string;
    location: Location;
    summary: string;
  };
  optimized_content: BasicsSection["original_content"];
  optimization_report: OptimizationReport;
};

export type SkillsSection = {
  section_name: string;
  original_content: {
    languages: string[];
    frameworks: string[];
    databases: string[];
    tools: string[];
    other: string[];
  };
  optimized_content: SkillsSection["original_content"];
  optimization_report: OptimizationReport;
};

export type EducationSection = {
  section_name: string;
  original_content: {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    details: string[];
  }[];
  optimized_content: EducationSection["original_content"];
  optimization_report: OptimizationReport;
};

export type ExperienceSection = {
  section_name: string;
  original_content: {
    position: string;
    company: string;
    achievements: string[];
    technologies: string[];
    location: string;
  }[];
  optimized_content: ExperienceSection["original_content"];
  optimization_report: OptimizationReport;
};

export type ProjectSection = {
  section_name: string;
  original_content: {
    name: string;
    description: string;
    technologies: string[];
    highlights: string[];
  }[];
  optimized_content: ProjectSection["original_content"];
  optimization_report: OptimizationReport;
};

export type AwardSection = {
  section_name: string;
  original_content: {
    title: string;
    issuer: string;
    year: string;
    details: string;
  }[];
  optimized_content: AwardSection["original_content"];
  optimization_report: OptimizationReport;
};

export type CertificationSection = {
  section_name: string;
  original_content: {
    name: string;
    issuer: string;
    credentialUrl: string;
  }[];
  optimized_content: CertificationSection["original_content"];
  optimization_report: OptimizationReport;
};

export type LanguageSection = {
  section_name: string;
  original_content: {
    name: string;
    proficiency: string;
  }[];
  optimized_content: LanguageSection["original_content"];
  optimization_report: OptimizationReport;
};

export type VolunteeringSection = {
  section_name: string;
  original_content: {
    organization: string;
    role: string;
    description: string;
  };
  optimized_content: VolunteeringSection["original_content"];
  optimization_report: OptimizationReport;
};

export type HobbiesSection = {
  section_name: string;
  original_content: string[];
  optimized_content: string[];
  optimization_report: OptimizationReport;
};

// Union all section types
export type OptimizationResponseSection =
  | BasicsSection
  | SkillsSection
  | EducationSection
  | ExperienceSection
  | ProjectSection
  | AwardSection
  | CertificationSection
  | LanguageSection
  | VolunteeringSection
  | HobbiesSection;

// Map of all sections in the full response
export type SectionsMap = {
  basics: BasicsSection;
  skills: SkillsSection;
  educations: EducationSection;
  experiences: ExperienceSection;
  projects: ProjectSection;
  awards: AwardSection;
  certifications: CertificationSection;
  languages: LanguageSection;
  volunteerings: VolunteeringSection;
  hobbies: HobbiesSection;
};

// Finally, the top-level type for the entire response
export type RewriteResponse = {
  optimizedResumeResponse: { mode: "rewrite"; sections: SectionsMap };
  optimizedResumeId: string;
};

// User

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: Role;

  phoneNumber: string | null;
  bio: string | null;

  profilePicture: string | null;
  profession: string | null;
  education: string | null;
  experience: string | null;
  summary: string | null;
  skills: string[];
  industry: string | null;
  website: string | null;

  companyName: string | null;
  companyDescription: string | null;
  logoUrl: string | null;

  location: string;

  projects: Project[];
  experiences: Experience[];
  testimonials: Testimonial[];

  recruiterJobs?: Job[];
  seekerApplications?: Application[];

  createdAt: Date;
}

export type Experience = {
  id: string;
  userId: string;
  position: string;
  companyName: string;
  startDate: Date;
  endDate: Date | null;
  description: string;
};

export type Project = {
  id: string;
  userId: string;
  projectName: string;
  description: string;
  technologies: string[];
};

export type Testimonial = {
  id: string;
  userId: string;
  name: string;
  company: string;
  comment: string;
};

export type GenerateCoverLeterPayload = {
  resume: any;
  job?: Job;
  jobDescription?: string;
  jobTitle?: string;
  company: string;
};

export type Candidate = {
  applicationId: string;
  status: "Applied" | "ShortListed" | "Rejected" | "Hired";
  seeker: User;
  recruiter: string;
};

export type CreateConversationDto = {
  applicationId: string;
  seekerId: string;
  recruiterId: string;
};
