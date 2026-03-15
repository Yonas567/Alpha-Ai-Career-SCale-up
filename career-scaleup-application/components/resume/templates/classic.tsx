import { ResumeData } from "@/app/types";

export default function Classic({ resumeData }: { resumeData: ResumeData }) {
  const { basics, experiences, educations, skills, projects } = resumeData;

  return (
    <div
      className="
        bg-white text-black font-sans
        text-[11px] leading-[1.55] h-full
      "
    >
      <header className="mb-[6mm]">
        <h1 className="text-[20px] font-bold uppercase tracking-tight">
          {basics.fullName}
        </h1>

        {basics.title && (
          <p className="text-[12px] font-medium mt-[0.5mm]">{basics.title}</p>
        )}

        <p className="text-[10px] text-gray-700 mt-[1.5mm] leading-snug">
          {[basics.email, basics.phone, basics.linkedin, basics.github]
            .filter(Boolean)
            .join(" • ")}
        </p>
      </header>

      {basics.summary && (
        <section className="mb-[5mm]">
          <Section title="Summary" />
          <p className="mt-[1.5mm]">{basics.summary}</p>
        </section>
      )}

      {experiences.length > 0 && (
        <section className="mb-[5mm]">
          <Section title="Experience" />

          {experiences.map((exp) => (
            <div key={exp.id} className="mb-[4mm]">
              <div className="flex justify-between gap-[6mm]">
                <p className="font-semibold">
                  {exp.position}
                  {exp.company && (
                    <span className="font-normal"> — {exp.company}</span>
                  )}
                </p>

                <p className="text-[10px] text-gray-600 whitespace-nowrap">
                  {year(exp.startDate)} – {year(exp.endDate)}
                </p>
              </div>

              <ul className="list-disc ml-[5mm] mt-[1.5mm] space-y-[1mm]">
                {exp.achievements.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {educations.length > 0 && (
        <section className="mb-[5mm]">
          <Section title="Education" />

          {educations.map((edu) => (
            <p key={edu.id} className="mt-[2mm]">
              <span className="font-semibold">{edu.degree}</span>
              {edu.fieldOfStudy && `, ${edu.fieldOfStudy}`} — {edu.institution}
              <span className="text-gray-600">
                {" "}
                ({year(edu.startDate)} – {year(edu.endDate)})
              </span>
            </p>
          ))}
        </section>
      )}

      {hasSkills(skills) && (
        <section className="mb-[5mm]">
          <Section title="Skills" />
          <p className="mt-[1.5mm]">
            {[
              ...skills.languages,
              ...skills.frameworks,
              ...skills.databases,
              ...skills.tools,
              ...skills.other,
            ].join(", ")}
          </p>
        </section>
      )}

      {projects.length > 0 && (
        <section>
          <Section title="Projects" />

          {projects.map((p) => (
            <div key={p.id} className="mb-[3mm]">
              <p className="font-semibold">{p.name}</p>
              <ul className="list-disc ml-[5mm] mt-[1mm] space-y-[1mm]">
                {p.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

function Section({ title }: { title: string }) {
  return (
    <h2 className="text-[11px] font-bold uppercase tracking-wide border-b border-gray-300 pb-[0.8mm]">
      {title}
    </h2>
  );
}

function year(date?: string) {
  if (!date) return "Present";
  return new Date(date).getFullYear();
}

function hasSkills(skills: ResumeData["skills"]) {
  const allSkills = [
    ...(skills.languages || []),
    ...(skills.frameworks || []),
    ...(skills.databases || []),
    ...(skills.tools || []),
    ...(skills.other || []),
  ].filter(Boolean);

  return allSkills.length > 0;
}
