import { ResumeData } from "@/app/types";

export default function Compact({
  resumeData,
}: {
  resumeData: ResumeData;
}) {
  if (!resumeData) return null;

  const {
    basics,
    experiences,
    educations,
    skills,
    projects,
    awards,
    certifications,
    languages,
  } = resumeData;

  return (
    <div className="bg-white text-black text-[10.5px] leading-snug font-sans">
      {basics && (
        <header className="mb-4">
          <h1 className="text-[18px] font-bold tracking-tight">
            {basics.fullName}
          </h1>
          <p className="font-medium">{basics.title}</p>

          <div className="mt-1 text-[9.5px] text-gray-700 space-x-2">
            {basics.email && <span>{basics.email}</span>}
            {basics.linkedin && <span>• {basics.linkedin}</span>}
            {basics.github && <span>• {basics.github}</span>}
          </div>

          {basics.summary && (
            <p className="mt-2 text-gray-800">{basics.summary}</p>
          )}
        </header>
      )}

      {experiences?.length > 0 && (
        <Section title="Experience">
          {experiences.map((exp) => (
            <div key={exp.id} className="mb-2">
              <div className="flex justify-between font-semibold">
                <span>
                  {exp.position} — {exp.company}
                </span>
                <span className="text-gray-600">
                  {exp.startDate} – {exp.endDate}
                </span>
              </div>

              {exp.achievements?.length > 0 && (
                <ul className="list-disc ml-4 mt-1">
                  {exp.achievements.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {educations?.length > 0 && (
        <Section title="Education">
          {educations.map((edu) => (
            <div key={edu.id} className="mb-1">
              <span className="font-semibold">
                {edu.degree}
                {edu.fieldOfStudy && `, ${edu.fieldOfStudy}`}
              </span>
              <span className="text-gray-700"> — {edu.institution}</span>
            </div>
          ))}
        </Section>
      )}

      {projects?.length > 0 && (
        <Section title="Projects">
          {projects.map((project) => (
            <div key={project.id} className="mb-2">
              <p className="font-semibold">{project.name}</p>
              {project.description && (
                <p className="text-gray-800">{project.description}</p>
              )}
            </div>
          ))}
        </Section>
      )}

      {skills && (
        <Section title="Skills">
          {skills.languages?.length > 0 && (
            <SkillRow label="Languages" items={skills.languages} />
          )}
          {skills.frameworks?.length > 0 && (
            <SkillRow label="Frameworks" items={skills.frameworks} />
          )}
          {skills.tools?.length > 0 && (
            <SkillRow label="Tools" items={skills.tools} />
          )}
        </Section>
      )}

      {certifications?.length > 0 && (
        <Section title="Certifications">
          {certifications.map((cert) => (
            <p key={cert.id}>
              <span className="font-semibold">{cert.name}</span> — {cert.issuer}
            </p>
          ))}
        </Section>
      )}

      {awards?.length > 0 && (
        <Section title="Awards">
          {awards.map((award) => (
            <p key={award.id}>
              <span className="font-semibold">{award.title}</span> —{" "}
              {award.issuer} ({award.year})
            </p>
          ))}
        </Section>
      )}

      {languages?.length > 0 && (
        <Section title="Languages">
          <p>
            {languages.map((l) => `${l.name} (${l.proficiency})`).join(", ")}
          </p>
        </Section>
      )}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-3">
      <h2 className="mb-1 border-b border-gray-300 font-bold uppercase text-[10px] tracking-wide">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SkillRow({ label, items }: { label: string; items: string[] }) {
  return (
    <p>
      <span className="font-semibold">{label}:</span> {items.join(", ")}
    </p>
  );
}
