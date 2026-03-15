import { ResumeData } from "@/app/types";

export default function ReziProfessional({
  resumeData,
}: {
  resumeData: ResumeData;
}) {
  const { basics, experiences, educations, skills, awards } = resumeData;

  return (
    <div
      className="
        bg-white text-black font-sans
        text-[11.5px] leading-[1.55]
      "
    >
      <header className="mb-[8mm]">
        <h1 className="text-[22px] font-extrabold tracking-tight">
          {basics.fullName}
        </h1>

        <p className="uppercase font-semibold text-[12px] mt-[1mm]">
          {basics.title}
        </p>

        <p className="text-[10.5px] text-gray-700 mt-[2mm]">
          {[basics.email, basics.linkedin].filter(Boolean).join(" • ")}
        </p>
      </header>

      {basics.summary && (
        <section className="mb-[6mm]">
          <Section title="Professional Summary" />
          <p className="mt-[2mm]">{basics.summary}</p>
        </section>
      )}

      {experiences.length > 0 && (
        <section className="mb-[6mm]">
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
        <section className="mb-[6mm]">
          <Section title="Education" />
          {educations.map((edu) => (
            <p key={edu.id} className="mt-[2mm]">
              <span className="font-semibold">{edu.degree}</span>,{" "}
              {edu.institution}
            </p>
          ))}
        </section>
      )}

      {awards.length > 0 && (
        <section className="mb-[6mm]">
          <Section title="Awards" />
          {awards.map((a) => (
            <p key={a.id} className="mt-[1.5mm]">
              <span className="font-semibold">{a.title}</span> — {a.issuer} (
              {a.year})
            </p>
          ))}
        </section>
      )}

      {skills.frameworks.length > 0 && (
        <section>
          <Section title="Core Skills" />
          <p className="mt-[2mm]">{skills.frameworks.join(", ")}</p>
        </section>
      )}
    </div>
  );
}

function Section({ title }: { title: string }) {
  return (
    <h2 className="text-[11px] font-bold tracking-wide border-b border-gray-300 pb-[1mm]">
      {title}
    </h2>
  );
}

function year(date?: string) {
  if (!date) return "Present";
  return new Date(date).getFullYear();
}
