# CareerScaleUp API - Complete Usage Guide

## Table of Contents

1. [Overview](#overview)
2. [Resume Analysis & Rewriting](#resume-analysis--rewriting)
3. [Resume Text Extraction](#resume-text-extraction)
4. [Interview Questions](#interview-questions)
5. [Answer Evaluation](#answer-evaluation)
6. [Cover Letter Generation](#cover-letter-generation)
7. [Chatbot Guidance](#chatbot-guidance)
8. [Data Structures](#data-structures)
9. [Error Handling](#error-handling)
10. [Complete Examples](#complete-examples)

---

## Overview

CareerScaleUp provides AI-powered resume optimization and interview preparation tools. The API processes resumes section-by-section for detailed analysis and generates personalized interview questions with comprehensive answer evaluation.

**Key Features:**

- Resume analysis against job descriptions
- Resume rewriting with optimization reports
- AI-generated interview questions
- Answer evaluation with detailed feedback
- Cover letter generation tailored to a target company
- Conversational guidance via the stateless chatbot endpoint
- Section-by-section processing for accuracy

---

## Resume Analysis & Rewriting

### Endpoint 1: Analyze or Rewrite Resume

**URL:** `POST /api/v1/ai/`

**Purpose:** Analyze resume sections against job description or rewrite sections for better alignment.

#### Analyze/Rewrite Request

```json
{
  "mode": "analyze",
  "resume": {
    /* resume data */
  },
  "job": {
    /* job data */
  }
}
```

**Parameters:**

- `mode` (string, required): Either `"analyze"` or `"rewrite"`
  - `"analyze"`: Returns alignment scores and gaps for each section and a `skill_coverage` summary comparing job hard/soft skills to the resume
  - `"rewrite"`: Returns optimized sections with improvement suggestions
- `resume` (object, required): Resume data structure (see [Resume Data Structure](#resume-data-structure))
- `job` (object, required): Job description data (see [Job Data Structure](#job-data-structure))

#### Response - Analyze Mode

```json
{
  "mode": "analyze",
  "sections": {
    "basics": {
      "section_name": "basics",
      "alignment_score": 8,
      "strengths": ["Clear professional title", "Complete contact information"],
      "gaps": ["Missing professional summary keywords"],
      "specific_improvements": [
        "Add AI/ML keywords to summary",
        "Highlight backend engineering experience"
      ],
      "optimization_report": "Your basics section is well-structured. Consider adding more specific keywords related to the job requirements."
    },
    "experience": {
      "section_name": "experience",
      "alignment_score": 7,
      "strengths": [
        "Quantified achievements",
        "Relevant technologies mentioned"
      ],
      "gaps": ["Missing AI integration examples"],
      "specific_improvements": [
        "Add LangChain or LLM integration examples",
        "Highlight system design contributions"
      ],
      "optimization_report": "Strong experience section with good metrics. Add more AI-related projects."
    },
    "education": {
      /* ... */
    },
    "skills": {
      /* ... */
    },
    "projects": {
      /* ... */
    },
    "awards": {
      /* ... */
    },
    "hobbies": {
      /* ... */
    }
  },
  "skill_coverage": {
    "hard_skills": {
      "total_skills": 5,
      "matched_skills": ["Python", "LangChain", "PostgreSQL"],
      "missing_skills": ["TensorFlow", "Vertex AI"],
      "coverage_percentage": 60
    },
    "soft_skills": {
      "total_skills": 3,
      "matched_skills": ["Collaboration", "Mentorship"],
      "missing_skills": ["Stakeholder communication"],
      "coverage_percentage": 67
    },
    "summary": {
      "overall_alignment": "Resume covers most core hard skills with minor gaps in cloud AI tooling.",
      "notable_strengths": [
        "Hands-on LangChain delivery",
        "Mentorship experience"
      ],
      "notable_gaps": ["Enterprise stakeholder communication examples"],
      "recommendations": [
        "Add examples of coordinating with business stakeholders",
        "Highlight exposure to Vertex AI"
      ]
    }
  }
}
```

#### Response - Rewrite Mode

```json
{
  "mode": "rewrite",
  "sections": {
    "basics": {
      "section_name": "basics",
      "original_content": {
        "fullName": "John Doe",
        "title": "Software Engineer",
        "summary": "Experienced developer"
      },
      "optimized_content": {
        "fullName": "John Doe",
        "title": "Backend Software Engineer - AI Integrations",
        "summary": "Experienced Backend Software Engineer specializing in AI integrations, LLM orchestration, and scalable system design. Proficient in Python, Django, and LangChain with proven expertise in building production-grade AI-powered applications."
      },
      "optimization_report": {
        "changes_made": [
          "Enhanced job title with AI specialization",
          "Expanded summary with specific technologies",
          "Added relevant keywords for job alignment"
        ],
        "keywords_added": [
          "AI integrations",
          "LLM orchestration",
          "LangChain",
          "Python",
          "Django"
        ],
        "improvements": [
          "Better alignment with job requirements",
          "More specific technical focus",
          "Improved ATS compatibility"
        ]
      }
    },
    "experience": {
      "section_name": "experience",
      "original_content": [
        /* ... */
      ],
      "optimized_content": [
        /* ... */
      ],
      "optimization_report": {
        /* ... */
      }
    }
  }
}
```

#### Analyze/Rewrite Errors

```json
{
  "error": "Resume is required.",
  "details": {}
}
```

---

## Resume Text Extraction

### Endpoint 2: Extract Resume From Text

**URL:** `POST /api/v1/resume/extract/`

**Purpose:** Convert unstructured resume text into the normalized JSON structure used across the platform.

#### Extraction Request

```json
{
  "resume_text": "Paste your full resume text here."
}
```

**Parameters:**

- `resume_text` (string, required): Raw resume content to parse. Alternate keys `resumeText` or `text` are also accepted.

#### Extraction Response

```json
{
  "resume": {
    /* normalized resume data */
  }
}
```

The returned `resume` object conforms to the structure described in [Resume Data Structure](#resume-data-structure).

#### Extraction Errors

```json
{
  "error": "Resume text is required."
}
```

---

## Interview Questions

### Endpoint 3: Generate Interview Questions

**URL:** `POST /api/v1/interview/questions/`

**Purpose:** Generate 8-10 personalized interview questions based on candidate's resume and job requirements.

#### Interview Questions Request

```json
{
  "resume": { /* resume data */ },
  "jobType": { /* job data */ }
  "diffculty":
}
```

**Parameters:**

- `resume` (object, required): Resume data structure
- `job` (object, required): Job description data

#### Interview Questions Response

```json
{
  "total_questions": 10,
  "questions": [
    {
      "question_id": 1,
      "category": "technical",
      "difficulty": "medium",
      "question": "Can you describe your experience with building scalable REST APIs and how you handle high-traffic scenarios?",
      "context": "Based on your experience at Tech Corp",
      "expected_areas": [
        "API design principles",
        "Scalability strategies",
        "Caching mechanisms",
        "Database optimization",
        "Load balancing"
      ]
    },
    {
      "question_id": 2,
      "category": "behavioral",
      "difficulty": "easy",
      "question": "Tell us about a time when you successfully integrated an AI model or LLM into a backend system.",
      "context": "Related to AI integration experience",
      "expected_areas": [
        "Problem statement",
        "Solution approach",
        "Technologies used",
        "Challenges faced",
        "Outcome and impact"
      ]
    },
    {
      "question_id": 3,
      "category": "scenario",
      "difficulty": "hard",
      "question": "How would you design a system to handle multiple LLM providers with automatic fallback and load balancing?",
      "context": "System design for AI integrations",
      "expected_areas": [
        "Architecture design",
        "Provider selection",
        "Error handling",
        "Performance optimization",
        "Cost considerations"
      ]
    }
  ]
}
```

**Question Categories:**

- `technical`: Tests specific technical knowledge and skills
- `behavioral`: Explores past experiences and decision-making
- `scenario`: Presents hypothetical situations to assess problem-solving

**Difficulty Levels:**

- `easy`: Foundational questions, warm-up
- `medium`: Core competency questions
- `hard`: Advanced questions, system design

#### Interview Questions Errors

```json
{
  "error": "Job description is required."
}
```

---

## Answer Evaluation

### Endpoint 4: Evaluate Interview Answers

**URL:** `POST /api/v1/interview/evaluate/`

**Purpose:** Evaluate candidate answers to interview questions with detailed feedback and scoring.

#### Evaluation Request

```json
{
  "resume": {
    /* resume data */
  },
  "questions": [
    {
      "question_id": 1,
      "category": "technical",
      "difficulty": "medium",
      "question": "Can you describe your experience with building scalable REST APIs?",
      "context": "Based on your experience",
      "expected_areas": ["API design", "Scalability"]
    }
  ],
  "answers": [
    {
      "question_id": 1,
      "answer": "I have built REST APIs using Django and Go. In my projects, I focused on scalability by implementing caching strategies and database optimization..."
    }
  ]
}
```

**Parameters:**

- `resume` (object, required): Resume data structure
- `questions` (array, required): Array of question objects (from generate questions endpoint)
- `answers` (array, required): Array of answer objects with `question_id` and `answer` text

#### Evaluation Response

```json
{
  "evaluations": {
    "question_1": {
      "question_id": 1,
      "question": "Can you describe your experience with building scalable REST APIs?",
      "candidate_answer": "I have built REST APIs using Django and Go...",
      "evaluation": {
        "score": 8,
        "max_score": 10,
        "assessment": "good",
        "strengths": [
          "Mentioned specific technologies (Django, Go)",
          "Provided concrete project examples",
          "Addressed scalability concerns with specific strategies"
        ],
        "weaknesses": [
          "Could have mentioned API versioning strategy",
          "No discussion of error handling patterns"
        ],
        "feedback": "Strong answer with good technical depth. You demonstrated practical experience with multiple backend technologies and provided concrete examples. Consider discussing error handling and API versioning in future interviews.",
        "suggested_improvements": [
          "Mention specific API design patterns (REST best practices, versioning)",
          "Discuss error handling and rate limiting approaches",
          "Explain security measures (authentication, authorization)",
          "Include performance metrics from your projects"
        ],
        "ideal_answer_elements": [
          "Specific technologies and frameworks used",
          "Concrete project examples with metrics",
          "Scalability strategies (caching, load balancing, database optimization)",
          "API design patterns and best practices",
          "Error handling and monitoring approaches",
          "Security considerations"
        ]
      }
    },
    "question_2": {
      "question_id": 2,
      "question": "Tell us about a time when you successfully integrated an AI model...",
      "candidate_answer": "In my EthioCAD project, I integrated LangChain...",
      "evaluation": {
        "score": 9,
        "max_score": 10,
        "assessment": "excellent",
        "strengths": [
          "Excellent use of specific AI framework (LangChain)",
          "Clear problem statement and solution",
          "Demonstrated understanding of LLM integration challenges",
          "Provided measurable outcomes"
        ],
        "weaknesses": [
          "Could have mentioned performance optimization techniques"
        ],
        "feedback": "Excellent answer! You clearly understand AI integration and provided a compelling example of your work with specific technologies and measurable impact.",
        "suggested_improvements": [
          "Include performance metrics and optimization techniques",
          "Discuss how you handled edge cases"
        ],
        "ideal_answer_elements": [
          "Problem statement and context",
          "Solution approach and architecture",
          "Technologies and frameworks used",
          "Challenges faced and solutions",
          "Measurable outcomes and impact",
          "Lessons learned"
        ]
      }
    }
  },
  "summary": {
    "total_questions": 2,
    "answered_questions": 2,
    "total_score": 17,
    "average_score": 8.5,
    "overall_assessment": "excellent"
  }
}
```

**Scoring Scale:**

- `0-3`: Poor - Significant gaps, inaccurate information
- `4-5`: Fair - Basic understanding, missing details
- `6-7`: Good - Solid answer, minor gaps
- `8-9`: Excellent - Comprehensive, well-articulated
- `10`: Perfect - Complete, insightful, exceptional

**Assessment Levels:**

- `poor`: Score 0-3
- `fair`: Score 4-5
- `good`: Score 6-7
- `excellent`: Score 8-10

#### Evaluation Errors

```json
{
  "error": "Answers are required."
}
```

---

## Cover Letter Generation

### Endpoint 5: Generate Cover Letter

**URL:** `POST /api/v1/cover-letter/generate/`

**Purpose:** Create a tailored cover letter using the candidate's resume, the target job, and an explicit company name.

#### Cover Letter Request

The endpoint supports two modes. Wrap your input in a `mode` selector and a `payload` object:

```json
{
  "mode": "mode-1",
  "payload": {
    "resume": {
      /* resume data */
    },
    "job": {
      /* job data */
    },
    "company": "Future Tech"
  }
}
```

```json
{
  "mode": "mode-2",
  "payload": {
    "resume": {
      /* resume data */
    },
    "jobDescription": "Work on backend services and AI integrations.",
    "jobTitle": "Software Engineer",
    "company": "Future Tech",
    "jobLocation": "Remote"
  }
}
```

**Parameters:**

- `mode` (string, optional): Defaults to `"mode-1"` when omitted. Supported values are `"mode-1"` and `"mode-2"`.
- `payload` (object, required): Container for mode-specific fields. Must be an object.
  - **Mode 1** (`mode-1`):
    - `resume` (object, required): Resume data structure (see [Resume Data Structure](#resume-data-structure)).
    - `job` (object, required): Job description data (see [Job Data Structure](#job-data-structure)).
    - `company` (string, required): Explicit company name. Alternate keys `company_name`, `companyName`, and `company-name` are also accepted.
  - **Mode 2** (`mode-2`):
    - `resume` (object, required): Resume data structure.
    - `jobDescription` (string, required): Plain-text job description. Alternate keys `job_description` or `job_description_text` are accepted.
    - `jobTitle` (string, optional but recommended): Job title; falls back to the `job` object when included.
    - `company` (string, required): Company name. Alternate keys from Mode 1 apply.
    - Optional supporting fields: `jobLocation`, `jobResponsibilities`, `jobRequirements`, `jobType`, `salaryMin`, `salaryMax`, `hourly`, `fixedBudget`. These enrich the generated cover letter and are normalized into the job record automatically.

#### Cover Letter Response

```json
{
  "cover_letter": {
    "applicant": {
      "full_name": "Jane Doe",
      "email": "jane@example.com",
      "phone": "+1-555-0100",
      "address": "Seattle, WA, USA",
      "linkedin": "https://linkedin.com/in/janedoe",
      "github": "https://github.com/janedoe"
    },
    "employer": {
      "company_name": "Future Tech",
      "position_title": "Software Engineer",
      "recruiter_name": "Hiring Manager",
      "company_address": "Remote"
    },
    "letter": {
      "date": "2025-11-07",
      "content": "Dear Hiring Manager,\n\nThank you for your consideration...",
      "signature": {
        "closing_line": "Sincerely,",
        "name": "Jane Doe"
      }
    }
  }
}
```

#### Cover Letter Errors

```json
{
  "error": "Company name is required."
}
```

---

## Cover Letter Optimization

### Endpoint 6: Optimize Cover Letter

**URL:** `POST /api/v1/cover-letter/optimize/`

**Purpose:** Improve an existing cover letter so it reflects the job description's keywords, tone, and expectations without inventing new facts.

#### Optimization Request

```json
{
  "cover_letter": "Dear Hiring Manager, ...",
  "job": {
    /* job data */
  },
  "company": "Future Tech"
}
```

**Parameters:**

- `cover_letter` (string, required): The full body of the cover letter to optimize. Alternate key `coverLetter` is also accepted.
- `job` (object, required): Job description data (see [Job Data Structure](#job-data-structure)).
- `company` (string, optional): Preferred company name override; when omitted the job information is used.

#### Optimization Response

```json
{
  "optimized_cover_letter": {
    "original_content": "Dear Hiring Manager, ...",
    "optimized_content": "Dear Future Tech AI Team, ...",
    "changes_made": [
      "Strengthened opening hook with company-specific value",
      "Added quantifiable metric to second paragraph"
    ],
    "keywords_added": ["Python", "LLM orchestration"],
    "recommendations": [
      "Mention a recent collaboration example if available",
      "Close with a call-to-action tied to interview availability"
    ]
  }
}
```

#### Optimization Errors

```json
{
  "error": "Cover letter is required."
}
```

---

## Chatbot Guidance

### Endpoint 7: Stateless Chatbot WebSocket

**URL:** `ws://localhost:8000/ws/chatbot/{userId}/` (use `wss://` in production)

**Purpose:** Provide quick, single-turn guidance about using the platform over a persistent WebSocket connection. Each message is evaluated independently, so no conversational history is maintained server-side.

#### Connection Steps

1. Establish a WebSocket connection to `/ws/chatbot/{userId}/`, replacing `{userId}` with the identifier for the active user.
2. After the connection is accepted, send JSON messages that follow the structure below.
3. Read JSON responses from the server for each message you send.
4. Close the socket when you are done.

#### Client Message Format

```json
{
  "query": "How do I submit my resume for analysis?"
}
```

- `query` (string, required): User question. Alternate keys `question` or `message` are also accepted.
- Conversation history is not supported. Do not include `history` or related fields.

#### Server Response Format

```json
{
  "answer": "Open your dashboard, select Resume Analysis, and upload your resume file or paste the resume text."
}
```

#### Chatbot Errors

```json
{
  "error": "Chatbot is stateless; omit conversation history."
}
```

---

## Data Structures

### Resume Data Structure

```json
{
  "data": {
    "basics": {
      "fullName": "John Doe",
      "title": "Backend Developer",
      "email": "john.doe@example.com",
      "phone": "+1-555-123-4567",
      "website": "https://johndoe.dev",
      "linkedin": "https://linkedin.com/in/johndoe",
      "github": "https://github.com/johndoe",
      "summary": "Versatile backend developer focused on shipping reliable, scalable web applications with AI-enhanced features.",
      "location": {
        "city": "Springfield",
        "state": "IL",
        "country": "USA"
      }
    },

    "skills": {
      "languages": ["Python", "JavaScript", "Go"],
      "frameworks": ["Django", "FastAPI", "React"],
      "databases": ["PostgreSQL", "MongoDB"],
      "tools": ["Git", "Docker", "Figma", "Postman"],
      "other": ["REST APIs", "Responsive Design", "Unit Testing"]
    },

    "educations": [
      {
        "institution": "State University",
        "degree": "Bachelor of Science",
        "fieldOfStudy": "Computer Science",
        "startDate": "2016-09-01T00:00:00.000Z",
        "endDate": "2020-05-15T00:00:00.000Z",
        "details": [
          "Graduated with honors",
          "Capstone project: AI-assisted career advisor"
        ]
      }
    ],

    "experiences": [
      {
        "position": "Backend Developer",
        "company": "Acme Tech",
        "organization": "Acme Tech",
        "startDate": "2020-06-01T00:00:00.000Z",
        "endDate": "2024-03-01T00:00:00.000Z",
        "achievements": [
          "Built job matching services with personalized scoring models",
          "Improved API response times by 35% through caching and profiling",
          "Collaborated with platform team to integrate LLM-powered guidance"
        ],
        "technologies": ["Python", "TypeScript", "LangChain", "Redis"],
        "location": "Remote"
      }
    ],

    "projects": [
      {
        "name": "Career Compass",
        "description": "A job discovery platform delivering tailored recommendations and interview prep tips.",
        "link": "https://careercompass.example.com",
        "technologies": ["React", "Next.js", "NestJS", "Prisma"],
        "startDate": "2022-01-01T00:00:00.000Z",
        "endDate": "2023-06-01T00:00:00.000Z",
        "highlights": [
          "Implemented resume upload and automated parsing pipeline",
          "Designed responsive UI optimized for mobile and desktop"
        ]
      },
      {
        "name": "Personal Portfolio",
        "description": "A portfolio site highlighting projects, resume, and contact information.",
        "link": "https://johndoe.dev",
        "technologies": ["Next.js", "TailwindCSS", "Vercel"],
        "startDate": "2023-05-01"
      }
    ],

    "awards": [
      {
        "title": "Outstanding Developer Award",
        "issuer": "Acme Tech",
        "year": 2023,
        "details": "Recognized for leading key platform enhancements."
      }
    ],

    "certifications": [
      {
        "name": "Certified Cloud Practitioner",
        "issuer": "AWS",
        "issueDate": "2021-11-15T00:00:00.000Z",
        "expiryDate": null,
        "credentialUrl": "https://aws.amazon.com/certification"
      }
    ],

    "languages": [
      { "name": "English", "proficiency": "Fluent" },
      { "name": "Spanish", "proficiency": "Professional" }
    ],

    "volunteerings": [
      {
        "organization": "Code for Good",
        "role": "Volunteer Backend Developer",
        "startDate": "2021-04-01T00:00:00.000Z",
        "endDate": "2022-12-01T00:00:00.000Z",
        "description": "Built web tools for nonprofits to track social initiatives."
      }
    ],

    "hobbies": ["Reading", "Photography", "Open Source Contribution"]
  }
}
```

### Job Data Structure

```json
{
  "title": "Backend Software Engineer (AI Integrations)",
  "jobType": "Full-time",
  "description": "We are looking for a Backend Software Engineer to build scalable systems with AI integration capabilities...",
  "location": "Remote",
  "responsibilities": [
    "Design and develop scalable REST APIs",
    "Integrate LLMs for automation",
    "Optimize database queries",
    "Implement caching strategies"
  ],
  "requirements": [
    "5+ years backend development",
    "Python or Go",
    "Django or Gin",
    "LangChain or Vertex AI",
    "PostgreSQL or MongoDB"
  ],
  "hourly": null,
  "fixedBudget": null,
  "salaryMin": 100000,
  "salaryMax": 150000,
  "createdAt": "2024-02-01T10:00:00Z"
}
```

---

## Error Handling

### Common Error Responses

**Missing Required Field:**

```json
{
  "error": "Resume is required."
}
```

**Invalid Data:**

```json
{
  "error": "Invalid resume",
  "details": {
    "data": ["This field is required."]
  }
}
```

**Server Error:**

```json
{
  "error": "An error occurred while processing your request"
}
```

### HTTP Status Codes

- `200 OK`: Successful request
- `400 Bad Request`: Missing or invalid parameters
- `500 Internal Server Error`: Server-side error

---

## Complete Examples

### Example 1: Full Interview Preparation Flow

#### Example 1 Step 1: Generate Questions

```bash
curl -X POST http://localhost:8000/api/v1/interview/questions/ \
  -H "Content-Type: application/json" \
  -d '{
    "resume": { /* resume data */ },
    "job": { /* job data */ }
  }'
```

**Step 2: Candidate Prepares Answers**
(Candidate reviews questions and writes answers)

#### Example 1 Step 3: Evaluate Answers

```bash
curl -X POST http://localhost:8000/api/v1/interview/evaluate/ \
  -H "Content-Type: application/json" \
  -d '{
    "resume": { /* resume data */ },
    "questions": [ /* from step 1 */ ],
    "answers": [
      { "question_id": 1, "answer": "..." },
      { "question_id": 2, "answer": "..." }
    ]
  }'
```

### Example 2: Resume Optimization Flow

#### Example 2 Step 1: Analyze Resume

```bash
curl -X POST http://localhost:8000/api/v1/ai/ \
  -H "Content-Type: application/json" \
  -d '{
    "mode": "analyze",
    "resume": { /* resume data */ },
    "job": { /* job data */ }
  }'
```

**Step 2: Review Analysis**
(Review alignment scores and gaps)

#### Example 2 Step 3: Rewrite Resume

```bash
curl -X POST http://localhost:8000/api/v1/ai/ \
  -H "Content-Type: application/json" \
  -d '{
    "mode": "rewrite",
    "resume": { /* resume data */ },
    "job": { /* job data */ }
  }'
```

---

## Best Practices

1. **Complete Resume Data**: Ensure all resume fields are filled accurately
2. **Detailed Job Description**: Provide comprehensive job requirements for better analysis
3. **Specific Answers**: Give detailed, specific answers for better evaluation
4. **Review Feedback**: Use evaluation feedback to improve answers
5. **Practice Multiple Times**: Use the API multiple times to prepare thoroughly
6. **Update Resume**: Keep resume updated with latest projects and skills

---

## Support

For issues or questions, please refer to the project documentation or contact support.
