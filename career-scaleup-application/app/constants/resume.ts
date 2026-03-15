import { FieldConfig, ResumeData, Section } from "../types";

export const init_resume = {
  basics: {
    fullName: "",
    professionalTitle: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    summary: "",
  },
  education: [
    {
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
    },
  ],
  experience: [
    {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
  projects: [
    {
      projectName: "",
      description: "",
      technologies: "",
      projectLink: "",
    },
  ],
  skills: "",
};

export const emptyResumeData: ResumeData = {
  id: "",
  userId: "",
  generatedAt: "",
  hobbies: [],
  isActive: false,
  isOptimized: false,
  template: "",
  basics: {
    id: "",
    fullName: "",
    title: "",
    email: "",
    phone: "",
    website: "",
    linkedin: "",
    github: "",
    summary: "",
    locationId: "",
    resumeId: "",
  },
  skills: {
    id: "",
    languages: [],
    frameworks: [],
    databases: [],
    tools: [],
    other: [],
  },
  educations: [],
  experiences: [],
  projects: [],
  awards: [],
  certifications: [],
  languages: [],
  volunteerings: [],
};

export const sample_cover_letters = [
  { id: "1", name: "Tech Company Cover Letter", createdAt: "2024-10-15" },
  { id: "2", name: "Startup Application", createdAt: "2024-10-12" },
];

export const mainSections: { id: Section; label: string }[] = [
  { id: "basics", label: "About" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
];

export const optionalSections: { id: Section; label: string }[] = [
  { id: "awards", label: "Awards" },
  { id: "hobbies", label: "Hobbies" },
];

export const emptyResume = {
  generatedAt: new Date(),
  hobbies: [],
  basics: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    website: "",
    linkedin: "",
    github: "",
    summary: "",
  },
  skills: {
    languages: [],
    frameworks: [],
    databases: [],
    tools: [],
    other: [],
  },
  educations: [],
  experiences: [],
  projects: [],
  awards: [],
  certifications: [],
  languages: [],
  volunteerings: [],
};

export const sectionFields: Record<string, FieldConfig[]> = {
  basics: [
    { key: "fullName", label: "Full Name" },
    { key: "title", label: "Title" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "website", label: "Website", type: "url" },
    { key: "linkedin", label: "LinkedIn", type: "url" },
    { key: "github", label: "GitHub", type: "url" },
    { key: "summary", label: "Summary", type: "textarea", multiline: true },
  ],
  educations: [
    { key: "institution", label: "Institution" },
    { key: "degree", label: "Degree" },
    { key: "fieldOfStudy", label: "Field of Study" },
    { key: "startDate", label: "Start Date", type: "date" },
    { key: "endDate", label: "End Date", type: "date" },
    { key: "details", label: "Details", type: "textarea", multiline: true },
  ],
  experiences: [
    { key: "position", label: "Job Title" },
    { key: "company", label: "Company" },
    { key: "organization", label: "Organization" },
    { key: "location", label: "Location" },
    { key: "startDate", label: "Start Date", type: "date" },
    { key: "endDate", label: "End Date", type: "date" },
    {
      key: "achievements",
      label: "Achievements",
      type: "textarea",
      multiline: true,
    },
    {
      key: "technologies",
      label: "Technologies",
      type: "textarea",
      multiline: true,
    },
  ],
  projects: [
    { key: "name", label: "Project Name" },
    {
      key: "description",
      label: "Description",
      type: "textarea",
      multiline: true,
    },
    { key: "link", label: "Link", type: "url" },
    {
      key: "technologies",
      label: "Technologies",
      type: "textarea",
      multiline: true,
    },
    { key: "startDate", label: "Start Date", type: "date" },
    { key: "endDate", label: "End Date", type: "date" },
    {
      key: "highlights",
      label: "Highlights",
      type: "textarea",
      multiline: true,
    },
  ],
  awards: [
    { key: "title", label: "Award Title" },
    { key: "issuer", label: "Issuer / Organization" },
    { key: "year", label: "Year", type: "number" },
    { key: "details", label: "Details", type: "textarea", multiline: true },
  ],

  certifications: [
    { key: "name", label: "Certification Name" },
    { key: "issuer", label: "Issuing Organization" },
    { key: "issueDate", label: "Issue Date", type: "date" },
    { key: "expiryDate", label: "Expiry Date", type: "date" },
    { key: "credentialId", label: "Credential ID" },
    { key: "credentialUrl", label: "Credential URL", type: "url" },
    { key: "details", label: "Details", type: "textarea", multiline: true },
  ],

  languages: [
    { key: "name", label: "Language" },
    {
      key: "proficiency",
      label: "Proficiency",
      type: "select",
      // options: [
      //   "Native",
      //   "Fluent",
      //   "Professional Working",
      //   "Intermediate",
      //   "Beginner",
      // ],
    },
  ],

  volunteerings: [
    { key: "organization", label: "Organization" },
    { key: "role", label: "Role / Position" },
    { key: "startDate", label: "Start Date", type: "date" },
    { key: "endDate", label: "End Date", type: "date" },
    {
      key: "description",
      label: "Description",
      type: "textarea",
      multiline: true,
    },
  ],

  skills: [
    { key: "skills", label: "Skills", type: "textarea", multiline: true },
  ],
};

export const sampleRewriteData = {
  mode: "rewrite",
  sections: {
    basics: {
      section_name: "BASICS",
      original_content: {
        fullName: "Yonas Seyoum",
        title: "Frontend Developer",
        email: "yonas@example.com",
        phone: "+251912345678",
        website: "https://yonasseyoum.dev",
        linkedin: "https://linkedin.com/in/yonasseyoum",
        github: "https://github.com/yonasseyoum",
        location: {
          city: "Addis Ababa",
          state: "Addis Ababa",
          country: "Ethiopia",
        },
        summary:
          "Creative and detail-oriented Frontend Developer with a passion for building modern, responsive, and user-friendly web applications.",
      },
      optimized_content: {
        fullName: "Yonas Seyoum",
        title: "Frontend Developer",
        email: "yonas@example.com",
        phone: "+251912345678",
        website: "https://yonasseyoum.dev",
        linkedin: "https://linkedin.com/in/yonasseyoum",
        github: "https://github.com/yonasseyoum",
        location: {
          city: "Addis Ababa",
          state: "Addis Ababa",
          country: "Ethiopia",
        },
        summary:
          "Detail-oriented and creative developer passionate about building modern, high-quality applications.",
      },
      optimization_report: {
        changes_made: [
          "Rephrased the summary to be less specific to frontend development and more broadly applicable to general software development.",
        ],
        keywords_added: [],
        improvements: [
          "The summary was adjusted to remove highly frontend-specific terms ('responsive', 'user-friendly web applications') while retaining transferable qualities ('detail-oriented', 'creative', 'building modern applications'). This makes the profile slightly more versatile for roles beyond pure frontend.",
        ],
      },
    },
    skills: {
      section_name: "SKILLS",
      original_content: {
        languages: ["JavaScript", "TypeScript", "Python"],
        frameworks: ["React", "Next.js", "NestJS"],
        databases: ["PostgreSQL", "MongoDB"],
        tools: ["Git", "Docker", "Figma", "Postman"],
        other: ["REST APIs", "Responsive Design", "Unit Testing"],
      },
      optimized_content: {
        languages: ["Python", "JavaScript", "TypeScript"],
        frameworks: ["NestJS", "React", "Next.js"],
        databases: ["PostgreSQL", "MongoDB"],
        tools: ["Git", "Docker", "Postman", "Figma"],
        other: ["REST APIs", "Unit Testing", "Responsive Design"],
      },
      optimization_report: {
        changes_made: [
          "Reordered items within the 'languages' list to prioritize Python, a key requirement for backend and AI integration.",
          "Reordered items within the 'frameworks' list to prioritize NestJS, a backend framework, over frontend frameworks.",
          "Reordered items within the 'tools' list to prioritize backend development tools.",
        ],
        keywords_added: [
          "No new keywords were added to the skills list, as per constraints. Existing skills were reordered and highlighted to align with job requirements.",
        ],
        improvements: [
          "**Enhanced Alignment with Backend Focus:** By prioritizing Python, NestJS, PostgreSQL, MongoDB, REST APIs, Docker, and Git, the section now strongly emphasizes backend development capabilities.",
          "**Highlights AI Integration Potential:** Python is moved to the forefront, signaling proficiency in the primary language used for AI/ML and LLM integrations.",
          "**Emphasizes Scalable Systems:** Skills like 'REST APIs' and 'Docker' are positioned prominently, indicating experience with building and deploying scalable systems.",
        ],
      },
    },
    educations: {
      section_name: "EDUCATION",
      original_content: [
        {
          institution: "Addis Ababa University",
          degree: "Bachelor of Science",
          fieldOfStudy: "Computer Science",
          details: [
            "Graduated with honors",
            "Final year project: AI-powered resume parser",
          ],
        },
      ],
      optimized_content: [
        {
          institution: "Addis Ababa University",
          degree: "Bachelor of Science",
          fieldOfStudy: "Computer Science",
          details: [
            "Graduated with honors",
            "Final year project: Designed and developed an **AI-powered** resume parser, demonstrating foundational **backend development** skills and early experience with **AI integration** for **automation**.",
          ],
        },
      ],
      optimization_report: {
        changes_made: [
          "The description of the 'Final year project' was expanded to highlight its relevance to backend development and AI integration.",
        ],
        keywords_added: [
          "AI-powered",
          "backend development",
          "AI integration",
          "automation",
        ],
        improvements: [
          "Directly aligns the candidate's academic project with the core responsibilities and requirements of the Backend Software Engineer (AI Integrations) role.",
          "Showcases early exposure and interest in AI integration and backend systems, even at the foundational academic level.",
        ],
      },
    },
    experiences: {
      section_name: "EXPERIENCE",
      original_content: [
        {
          position: "Frontend Developer",
          company: "TechBridge Solutions",
          achievements: [
            "Developed job filtering system with advanced search and sorting features",
            "Optimized React UI performance by 35%",
            "Collaborated with backend team to integrate NestJS APIs",
          ],
          technologies: ["React", "TypeScript", "TailwindCSS", "Firebase"],
          location: "Addis Ababa, Ethiopia",
        },
      ],
      optimized_content: [
        {
          position: "Frontend Developer",
          company: "TechBridge Solutions",
          achievements: [
            "Engineered a robust job filtering system, implementing advanced search and sorting features for enhanced user experience and efficient data retrieval.",
            "Enhanced system performance by optimizing React UI, resulting in a 35% improvement in load times and responsiveness.",
            "Collaborated closely with backend engineers to integrate scalable NestJS APIs, ensuring seamless data flow and system interoperability.",
          ],
          technologies: ["React", "TypeScript", "TailwindCSS", "Firebase"],
          location: "Addis Ababa, Ethiopia",
        },
      ],
      optimization_report: {
        changes_made: [
          "Rephrased to emphasize system-level thinking and backend collaboration",
          "Enhanced language to highlight performance and scalability concerns",
        ],
        keywords_added: [
          "robust",
          "efficient data retrieval",
          "system performance",
          "scalable",
          "seamless data flow",
          "system interoperability",
        ],
        improvements: [
          "**Emphasized transferable skills** relevant to backend engineering, such as system design and data handling.",
          "**Highlighted performance optimization** skills by connecting UI optimization to overall system performance.",
          "**Strengthened backend collaboration** description by using terms like 'scalable APIs' and 'system interoperability'.",
        ],
      },
    },
    projects: {
      section_name: "PROJECTS",
      original_content: [
        {
          name: "JobQuest",
          description:
            "A modern job searching platform featuring real-time filtering and personalized recommendations.",
          technologies: ["React", "Next.js", "NestJS", "Prisma"],
          highlights: [
            "Implemented dynamic resume upload and parsing feature",
            "Designed responsive UI for mobile and desktop",
          ],
        },
      ],
      optimized_content: [
        {
          name: "JobQuest",
          description:
            "Developed a scalable backend system for a modern job searching platform, enabling real-time filtering and personalized recommendations.",
          technologies: ["React", "Next.js", "NestJS", "Prisma"],
          highlights: [
            "Designed and developed scalable REST APIs using NestJS to power real-time filtering and personalized recommendations.",
            "Implemented a robust backend service for dynamic resume upload and advanced parsing, extracting structured data for candidate matching.",
            "Optimized data retrieval and processing for real-time filtering, enhancing user experience.",
          ],
        },
      ],
      optimization_report: {
        changes_made: [
          "Rewrote project description to emphasize backend system development and scalability.",
          "Added new highlights focusing on REST API design and data processing.",
        ],
        keywords_added: [
          "scalable systems",
          "backend system",
          "REST APIs",
          "robust backend service",
          "advanced parsing",
          "structured data",
        ],
        improvements: [
          "**Significantly enhanced alignment** with the 'Backend Software Engineer (AI Integrations)' role by highlighting backend development and data processing.",
          "**Emphasized foundational skills** for AI integration by detailing structured data extraction.",
          "**Incorporated strong action verbs** and specific technical contributions relevant to backend engineering.",
        ],
      },
    },
    awards: {
      section_name: "AWARDS",
      original_content: [
        {
          title: "Best Frontend Developer Award",
          issuer: "TechBridge Solutions",
          year: "2024",
          details:
            "Recognized for outstanding contribution to frontend development projects.",
        },
      ],
      optimized_content: [
        {
          title: "Best Frontend Developer Award",
          issuer: "TechBridge Solutions",
          year: "2024",
          details:
            "Recognized for outstanding contributions to complex development projects, demonstrating strong engineering principles and delivering high-quality solutions.",
        },
      ],
      optimization_report: {
        changes_made: [
          "Rephrased the 'details' of the award to generalize the achievement.",
        ],
        keywords_added: [
          "complex development projects",
          "engineering principles",
          "high-quality solutions",
        ],
        improvements: [
          "**Generalized the description** to highlight transferable engineering excellence and impact, rather than specific frontend work.",
          "**Emphasized foundational development skills** and the delivery of quality solutions, which are valuable in any engineering discipline.",
        ],
      },
    },
    certifications: {
      section_name: "CERTIFICATIONS",
      original_content: [
        {
          name: "React Developer Certification",
          issuer: "Meta",
          credentialUrl: "https://coursera.org/verify/meta-react-cert",
        },
      ],
      optimized_content: [
        {
          name: "React Developer Certification",
          issuer: "Meta",
          credentialUrl: "https://coursera.org/verify/meta-react-cert",
        },
      ],
      optimization_report: {
        changes_made: [
          "No changes were made to the content of this specific certification.",
        ],
        keywords_added: [],
        improvements: [
          "The 'React Developer Certification' is frontend-focused. The target role is 'Backend Software Engineer (AI Integrations)'. It is recommended to include backend-specific certifications or relevant project experience in other sections to better align with this role.",
        ],
      },
    },
    languages: {
      section_name: "LANGUAGES",
      original_content: [
        { name: "English", proficiency: "Fluent" },
        { name: "Amharic", proficiency: "Native" },
      ],
      optimized_content: [
        { name: "English", proficiency: "Fluent" },
        { name: "Amharic", proficiency: "Native" },
      ],
      optimization_report: {
        changes_made: [],
        keywords_added: [],
        improvements: [
          "The 'LANGUAGES' section, referring to spoken human languages, is not directly optimizable with technical keywords from the job description.",
          "Preserved original facts and structure to ensure no new information was invented.",
        ],
      },
    },
    volunteerings: {
      section_name: "VOLUNTEERING",
      original_content: {
        organization: "Code for Africa",
        role: "Volunteer Frontend Developer",
        description: "Built web tools for local NGOs to track social projects.",
      },
      optimized_content: {
        organization: "Code for Africa",
        role: "Volunteer Frontend Developer",
        description:
          "Developed user-facing web tools to enable local NGOs to efficiently track and manage social project data.",
      },
      optimization_report: {
        changes_made: [
          "Rephrased the description to use stronger action verbs and emphasize data management aspects.",
        ],
        keywords_added: ["data", "manage"],
        improvements: [
          "The description now uses more professional language and highlights the functional impact of the developed tools.",
          "Subtle emphasis on data management, which is a core concern for backend systems.",
        ],
      },
    },
    hobbies: {
      section_name: "HOBBIES",
      original_content: [
        "UI Design",
        "Photography",
        "Open Source Contribution",
      ],
      optimized_content: [
        "Appreciation for intuitive UI/UX design, informing a user-centric approach to API development.",
        "Cultivating keen observational skills and attention to detail through photography.",
        "Actively contributing to open-source projects, demonstrating collaborative development, problem-solving, and continuous learning in software engineering.",
      ],
      optimization_report: {
        changes_made: [
          "Expanded 'UI Design' to highlight relevance to API development.",
          "Expanded 'Photography' to emphasize transferable skills.",
          "Expanded 'Open Source Contribution' to showcase collaborative development.",
        ],
        keywords_added: [
          "API development",
          "user-centric approach",
          "attention to detail",
          "collaborative development",
          "problem-solving",
          "continuous learning",
        ],
        improvements: [
          "**Reframed hobbies** to subtly align with the Backend Software Engineer role by emphasizing transferable skills.",
          "**Transformed generic descriptions** into statements that reflect valuable traits for a technical role.",
          "**Leveraged Open Source** contribution to highlight engagement with software development principles and continuous skill enhancement.",
        ],
      },
    },
  },
};

export const sampleAnalysisData = {
  mode: "analyze",
  sections: {
    basics: {
      section_name: "basics",
      alignment_score: 1,
      strengths: [
        "Comprehensive contact information (Email, Phone, Website, LinkedIn, GitHub) is provided.",
        "Candidate's location (Addis Ababa, Addis Ababa, Ethiopia) is compatible with a remote job description.",
      ],
      gaps: [
        "The candidate's stated 'Title: Frontend Developer' does not align with the 'Backend Software Engineer (AI Integrations)' job title.",
        "The 'Summary' explicitly identifies the candidate as a 'Frontend Developer' and focuses on 'modern, responsive, and user-friendly web applications,' which does not align with the backend and AI integration focus of the job description.",
      ],
      specific_improvements: [
        "Update the 'Title' to reflect backend development experience or a more general 'Software Engineer' title if applicable, to better align with the job description.",
        "Rewrite the 'Summary' to highlight backend development skills, experience with scalable systems, and any relevant AI integration capabilities, directly addressing the job description's requirements. Remove explicit mention of 'Frontend Developer' if applying for a backend role.",
      ],
      optimization_report:
        "The 'basics' section presents a significant misalignment with the job description primarily due to the candidate's self-identified role and summary. The candidate's 'Title' and 'Summary' explicitly state 'Frontend Developer' and focus on frontend-specific skills, which directly contradicts the 'Backend Software Engineer (AI Integrations)' role. While contact information is complete and the location is compatible with a remote role, the core professional branding in this section is not optimized for the target position. To improve alignment, the candidate must rebrand this section to emphasize backend engineering and AI integration, starting with the professional title and a tailored summary.",
    },
    skills: {
      section_name: "SKILLS",
      alignment_score: 40,
      strengths: [
        "Explicitly lists 'Python', which matches a required language (Python or Go).",
        "Explicitly lists 'PostgreSQL' and 'MongoDB', matching both required database options.",
        "Explicitly lists 'REST APIs', aligning with the responsibility to 'Design and develop scalable REST APIs'.",
        "Includes 'NestJS', a backend framework, and 'Docker', a relevant tool for scalable systems.",
      ],
      gaps: [
        "Does not list 'Django' or 'Gin', which are specified as required backend frameworks.",
        "Does not list 'LangChain' or 'Vertex AI', which are specified as required AI integration tools.",
        "Lacks explicit skills related to LLM integration, which is central to the 'AI Integrations' aspect of the job title and 'Integrate LLMs for automation' responsibility.",
        "Does not explicitly list skills for 'Optimize database queries' or 'Implement caching strategies', which are listed responsibilities.",
        "Includes frontend frameworks (React, Next.js) and design tools (Figma) which are not directly relevant to a 'Backend Software Engineer' role, potentially diluting focus.",
      ],
      specific_improvements: [
        "Add 'Django' or 'Gin' to frameworks if applicable to experience.",
        "Add 'LangChain' or 'Vertex AI' to skills if applicable to experience, or other relevant AI/ML integration tools.",
        "Include skills related to database query optimization (e.g., specific ORM optimization techniques, SQL tuning).",
        "Add skills related to caching strategies (e.g., Redis, Memcached).",
        "Consider removing or de-emphasizing purely frontend skills (React, Next.js, Figma, Responsive Design) to sharpen the focus on backend and AI integration for this specific role.",
      ],
      optimization_report:
        "The 'SKILLS' section demonstrates partial alignment with the job description, notably matching Python and the required databases (PostgreSQL, MongoDB), and explicitly listing 'REST APIs'. However, there are significant gaps in core backend frameworks (Django/Gin) and, critically, in AI integration tools (LangChain/Vertex AI), which are central to the 'Backend Software Engineer (AI Integrations)' role. The absence of skills related to LLM integration, database query optimization, and caching strategies further weakens the alignment. To optimize, the candidate should prioritize adding specific backend frameworks and AI integration tools from the job description, and include skills directly addressing the responsibilities of database optimization and caching. De-emphasizing non-backend skills would also help to present a more focused profile for this specialized role.",
    },
    educations: {
      section_name: "EDUCATION",
      alignment_score: 4,
      strengths: [
        "The 'Bachelor of Science' in 'Computer Science' provides a foundational academic background relevant to a 'Backend Software Engineer' role.",
        "The 'Final year project: AI-powered resume parser' directly aligns with the job's focus on 'AI integration capabilities' and the responsibility to 'Integrate LLMs for automation'.",
        "Graduating 'with honors' indicates strong academic performance.",
      ],
      gaps: [
        "The provided dates for the degree (2018-09-01 to 2018-09-01) are identical and do not reflect a typical duration for a Bachelor's degree, which could be a factual error or incomplete information.",
        "This section does not provide information regarding the '5+ years backend development' experience requirement.",
        "No specific technologies mentioned in the job requirements (e.g., Python, Go, Django, Gin, LangChain, Vertex AI, PostgreSQL, MongoDB) are explicitly listed within this education section.",
      ],
      specific_improvements: [
        "Correct or clarify the dates for the Bachelor of Science degree to accurately reflect the duration of study.",
        "If the 'AI-powered resume parser' project utilized any of the technologies specified in the job description (e.g., Python, LangChain, PostgreSQL), explicitly state them within the project details to enhance alignment.",
      ],
      optimization_report:
        "The education section effectively showcases a relevant academic background in Computer Science and a highly pertinent AI-focused final year project, directly addressing the 'AI Integrations' aspect of the job. The 'graduated with honors' detail is a positive indicator. However, the identical start and end dates for the degree are a significant factual discrepancy that needs correction. To further optimize this section, explicitly detailing any job-relevant technologies used in the AI project would significantly strengthen its alignment with the technical requirements of the role. This section alone does not address the experience duration or specific technology requirements beyond the conceptual alignment of the AI project.",
    },
    experiences: {
      section_name: "experiences",
      alignment_score: 0,
      strengths: [],
      gaps: [
        "The listed experience is for a 'Frontend Developer', which does not align with the 'Backend Software Engineer' role.",
        "The experience duration for the listed role is 0 years (2018-09-01 to 2018-09-01), which does not meet the '5+ years backend development' requirement.",
        "No explicit mention of backend development experience using Python or Go.",
        "No explicit mention of backend framework experience with Django or Gin.",
        "No explicit mention of AI integration experience with LangChain or Vertex AI.",
        "No explicit mention of database experience with PostgreSQL or MongoDB.",
        "No explicit mention of designing and developing scalable REST APIs as a primary responsibility.",
        "No explicit mention of integrating LLMs for automation.",
        "No explicit mention of optimizing database queries.",
        "No explicit mention of implementing caching strategies.",
      ],
      specific_improvements: [
        "Add experience sections that explicitly detail backend development roles and responsibilities.",
        "Ensure any backend experience listed clearly states the duration to meet or exceed the '5+ years backend development' requirement.",
        "Include specific backend technologies used, such as Python, Go, Django, Gin, PostgreSQL, or MongoDB, if applicable.",
        "Highlight any experience with AI integration tools like LangChain or Vertex AI, or general LLM integration.",
        "Detail achievements related to designing and developing scalable REST APIs, optimizing database queries, and implementing caching strategies.",
        "Correct the date range for the 'Frontend Developer' role if it is an error, as it currently indicates 0 years of experience.",
      ],
      optimization_report:
        "The 'experiences' section, specifically the 'Frontend Developer' role, shows no direct alignment with the 'Backend Software Engineer (AI Integrations)' job description. There is a fundamental mismatch in the role type (Frontend vs. Backend), the required years of experience (0 years listed vs. 5+ years required for backend), and the specific technologies and responsibilities (e.g., Python/Go, Django/Gin, LangChain/Vertex AI, scalable REST APIs, LLM integration, database optimization, caching strategies) are entirely absent from this entry. To improve alignment, the resume needs to introduce backend-focused experience that directly addresses the job's requirements and responsibilities.",
    },
    projects: {
      section_name: "PROJECTS",
      alignment_score: 10,
      strengths: [
        "The 'JobQuest' project utilizes 'NestJS', indicating experience with a backend framework.",
        "The 'JobQuest' project highlights 'Implemented dynamic resume upload and parsing feature', suggesting experience with backend logic and data processing.",
      ],
      gaps: [
        "The projects do not explicitly mention experience with 'Integrate LLMs for automation', which is a key responsibility.",
        "There is no explicit mention of 'LangChain or Vertex AI' technologies, which are required.",
        "The projects do not demonstrate experience with 'Python or Go' languages, which are required.",
        "The projects do not demonstrate experience with 'Django or Gin' frameworks, which are required.",
        "There is no explicit mention of 'PostgreSQL or MongoDB' databases, which are required (Prisma is an ORM, but the underlying database is not specified).",
        "The projects do not explicitly mention 'Design and develop scalable REST APIs' as a highlight, though NestJS implies API development.",
        "The projects do not mention 'Optimize database queries' or 'Implement caching strategies', which are responsibilities.",
      ],
      specific_improvements: [
        "Add details to the 'JobQuest' project or include new projects that explicitly demonstrate experience with LLM integration for automation.",
        "Include projects that showcase proficiency in 'Python or Go' and 'Django or Gin' frameworks.",
        "Specify the database used with 'Prisma' in 'JobQuest' and highlight any optimization efforts if it aligns with 'PostgreSQL or MongoDB'.",
        "Add specific highlights to projects detailing the 'Design and develop scalable REST APIs', 'Optimize database queries', and 'Implement caching strategies' if applicable.",
        "Introduce projects that utilize 'LangChain or Vertex AI' to address the AI integration requirement.",
      ],
      optimization_report:
        "The 'PROJECTS' section currently shows general backend development experience with NestJS and some data processing. However, it significantly lacks alignment with the core requirements of the 'Backend Software Engineer (AI Integrations)' role. There is no explicit mention of AI integration (LLMs, LangChain, Vertex AI), nor are the required backend languages (Python, Go) or frameworks (Django, Gin) present. Database specifics (PostgreSQL, MongoDB) and optimization/caching strategies are also missing. To optimize, the candidate should prioritize adding projects that directly demonstrate experience with AI integration, specifically LLMs and relevant frameworks like LangChain or Vertex AI. Projects showcasing Python/Go with Django/Gin, explicit REST API design, database optimization, and caching strategies would greatly enhance alignment.",
    },
    awards: {
      section_name: "awards",
      alignment_score: 1,
      strengths: [
        "The award indicates recognition for 'outstanding contribution' and 'Best Developer', suggesting high performance and skill.",
        "The award is recent, dated 2024.",
      ],
      gaps: [
        "The award is for 'Best Frontend Developer' and 'frontend development projects', which does not align with the 'Backend Software Engineer' role specified in the job description.",
        "The award does not provide evidence of skills or contributions related to backend development, scalable systems, AI integration, or specific backend technologies mentioned in the job description (e.g., Python, Go, Django, Gin, LangChain, Vertex AI, PostgreSQL, MongoDB).",
      ],
      specific_improvements: [
        "Include any awards or recognitions directly related to backend development, scalable systems, AI integrations, or relevant backend technologies if available.",
      ],
      optimization_report:
        "The 'Best Frontend Developer Award' highlights strong performance and recognition in frontend development. However, the job description is for a 'Backend Software Engineer (AI Integrations)'. This award does not explicitly demonstrate alignment with the backend focus, responsibilities (e.g., REST APIs, LLM integration, database optimization), or required backend technologies (e.g., Python, Go, Django, LangChain, PostgreSQL). To optimize this section for the target role, the candidate should prioritize awards or recognitions that directly showcase expertise and contributions in backend software engineering, scalable systems, or AI integration capabilities.",
    },
    certifications: {
      section_name: "certifications",
      alignment_score: 0,
      strengths: [],
      gaps: [
        "The 'React Developer Certification' is for a frontend technology, while the job is for a 'Backend Software Engineer'.",
        "No certifications are listed for backend development requirements such as Python, Go, Django, or Gin.",
        "No certifications are listed for AI integration requirements such as LangChain or Vertex AI.",
        "No certifications are listed for database requirements such as PostgreSQL or MongoDB.",
      ],
      specific_improvements: [
        "Add certifications relevant to backend development technologies (e.g., Python, Go, Django, Gin).",
        "Add certifications relevant to AI integration (e.g., LangChain, Vertex AI, LLMs).",
        "Add certifications relevant to database technologies (e.g., PostgreSQL, MongoDB).",
      ],
      optimization_report:
        "The 'certifications' section currently lists a 'React Developer Certification', which is a frontend skill. The job description is for a 'Backend Software Engineer' with specific requirements for backend languages (Python, Go), frameworks (Django, Gin), AI integration tools (LangChain, Vertex AI), and databases (PostgreSQL, MongoDB). To optimize this section, the candidate should add certifications that directly align with these backend and AI integration requirements. The current certification does not contribute to the alignment for this specific backend role.",
    },
    languages: {
      section_name: "LANGUAGES",
      alignment_score: 0,
      strengths: [],
      gaps: [
        "The job description requires specific programming languages (Python or Go) and technologies (Django or Gin, LangChain or Vertex AI, PostgreSQL or MongoDB) which are not present in this 'LANGUAGES' section.",
        "The 'LANGUAGES' section lists human languages, while the job description's technical requirements are for programming languages and frameworks.",
      ],
      specific_improvements: [
        "Create a dedicated 'Technical Skills' or 'Programming Languages' section to list proficiency in required technologies such as Python, Go, Django, Gin, LangChain, Vertex AI, PostgreSQL, or MongoDB.",
        "Ensure that any listed technical skills directly align with the job description's requirements.",
      ],
      optimization_report:
        "The current 'LANGUAGES' section details human language proficiency, which is not a stated requirement in the job description. The job description explicitly lists required programming languages and technical skills (e.g., Python, Go, Django, LangChain, PostgreSQL). This resume section does not address any of these technical requirements. To optimize, a separate, prominent section for 'Technical Skills' or 'Programming Languages' must be added to showcase alignment with the job's core technical demands.",
    },
    volunteerings: {
      section_name: "VOLUNTEERING",
      alignment_score: 0,
      strengths: [
        "The candidate has volunteer experience, indicating community involvement.",
        "The candidate has experience building 'web tools', demonstrating general software development exposure.",
      ],
      gaps: [
        "The role listed is 'Volunteer Frontend Developer', which does not align with the 'Backend Software Engineer' job title.",
        "The description 'Built web tools' does not explicitly mention backend development, designing REST APIs, integrating LLMs, optimizing database queries, or implementing caching strategies, which are key responsibilities.",
        "No specific backend technologies (Python, Go, Django, Gin, LangChain, Vertex AI, PostgreSQL, MongoDB) required by the job description are mentioned.",
        "The listed dates (2018-09-01 to 2018-09-01) do not meet the '5+ years backend development' experience requirement.",
      ],
      specific_improvements: [
        "If any backend development was involved in 'Built web tools', explicitly state the backend technologies used (e.g., Python, Go, Django, Gin, PostgreSQL, MongoDB).",
        "If REST APIs were designed or developed, explicitly mention this.",
        "If database optimization or caching strategies were implemented, explicitly state these contributions.",
        "Correct the dates to accurately reflect the duration of the volunteering experience if it was longer than a single day.",
      ],
      optimization_report:
        "This volunteering entry currently shows no direct alignment with the Backend Software Engineer (AI Integrations) role. To improve alignment, the candidate should revise the description to highlight any backend contributions, specific technologies used, and relevant responsibilities that align with the job description's requirements (e.g., API development, database interaction, scalable systems). The listed dates should also be corrected to reflect the actual duration of the experience.",
    },
    hobbies: {
      section_name: "HOBBIES",
      alignment_score: 1,
      strengths: [
        "The mention of 'Open Source Contribution' could indicate general involvement in software development, which is broadly relevant to a 'Backend Software Engineer' role.",
      ],
      gaps: [
        "The hobbies section does not explicitly demonstrate any of the required backend development experience (5+ years).",
        "It does not mention proficiency in Python or Go, which are required languages.",
        "It does not indicate experience with Django or Gin frameworks.",
        "It does not show experience with LangChain or Vertex AI for AI integrations.",
        "It does not demonstrate experience with PostgreSQL or MongoDB databases.",
        "The hobbies 'UI Design' and 'Photography' are not directly relevant to the responsibilities of a Backend Software Engineer, such as designing REST APIs, integrating LLMs, optimizing database queries, or implementing caching strategies.",
      ],
      specific_improvements: [
        "Remove 'UI Design' and 'Photography' as they do not align with the technical requirements of a Backend Software Engineer role.",
        "If 'Open Source Contribution' involves backend development, AI integration, or use of specified technologies (Python, Go, Django, Gin, LangChain, Vertex AI, PostgreSQL, MongoDB), move this information to a 'Projects' or 'Experience' section with specific details, technologies used, and impact.",
        "If 'Open Source Contribution' is not directly relevant to backend or AI integration, consider removing it from the hobbies section to focus on more impactful content.",
      ],
      optimization_report:
        "The 'HOBBIES' section provides minimal alignment with the 'Backend Software Engineer (AI Integrations)' job description. 'UI Design' and 'Photography' are irrelevant to the technical requirements. While 'Open Source Contribution' hints at software involvement, it lacks the specificity needed to demonstrate alignment with backend development, AI integration, or the required technologies (Python, Go, Django, Gin, LangChain, Vertex AI, PostgreSQL, MongoDB). For a role requiring 5+ years of backend experience and specific AI integration skills, this section does not contribute to showcasing the candidate's qualifications. It is recommended to remove irrelevant hobbies and, if 'Open Source Contribution' is significant and relevant to the job's technical requirements, relocate it to a more appropriate section (e.g., 'Projects' or 'Experience') with detailed descriptions of the backend work performed and technologies utilized.",
    },
  },
};
