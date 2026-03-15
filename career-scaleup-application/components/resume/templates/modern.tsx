import { ResumeData } from "@/app/types";

export default function Modern({ resumeData }: { resumeData: ResumeData }) {
  const { basics, experiences, educations, skills } = resumeData;

  return (
    <div className="font-sans text-black text-[11.5px] leading-[1.65]">
      <header className="mb-6">
        <h1 className="text-[22px] font-bold tracking-tight">
          {basics.fullName}
        </h1>

        <p className="text-[13px] font-medium mt-1">{basics.title}</p>

        <p className="text-[10.5px] text-gray-700 mt-2 leading-snug">
          {[basics.email, basics.linkedin, basics.github]
            .filter(Boolean)
            .join(" • ")}
        </p>
      </header>

      {basics.summary && (
        <section className="mb-5">
          <Section title="Professional Summary" />
          <p className="mt-2">{basics.summary}</p>
        </section>
      )}

      {experiences.length > 0 && (
        <section className="mb-5">
          <Section title="Experience" />
          {experiences.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between gap-4">
                <p className="font-semibold">
                  {exp.position}
                  {exp.company && (
                    <span className="font-normal"> — {exp.company}</span>
                  )}
                </p>
                <p className="text-[10px] text-gray-600 whitespace-nowrap">
                  {formatYear(exp.startDate)} – {formatYear(exp.endDate)}
                </p>
              </div>

              <ul className="list-disc ml-5 mt-2 space-y-1">
                {exp.achievements.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {educations.length > 0 && (
        <section className="mb-5">
          <Section title="Education" />
          {educations.map((edu) => (
            <p key={edu.id} className="mt-2">
              <span className="font-semibold">{edu.degree}</span>
              {edu.fieldOfStudy && `, ${edu.fieldOfStudy}`} — {edu.institution}
            </p>
          ))}
        </section>
      )}

      {(skills.languages.length ||
        skills.frameworks.length ||
        skills.databases.length ||
        skills.tools.length) > 0 && (
        <section>
          <Section title="Technical Skills" />
          <p className="mt-2">
            {[
              ...skills.languages,
              ...skills.frameworks,
              ...skills.databases,
              ...skills.tools,
            ].join(" • ")}
          </p>
        </section>
      )}
    </div>
  );
}

function Section({ title }: { title: string }) {
  return <h2 className="text-[12px] font-semibold tracking-wide">{title}</h2>;
}

function formatYear(date?: string) {
  if (!date) return "Present";
  return new Date(date).getFullYear();
}
