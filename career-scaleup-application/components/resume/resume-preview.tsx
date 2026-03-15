"use client";

import { ResumePreviewProps } from "@/app/types";
import { Mail, Phone, Globe, Linkedin, Github } from "lucide-react";

export default function ResumePreview({ resumeData }: ResumePreviewProps) {
  const { basics, educations, experiences, hobbies, skills } = resumeData!;

  return (
    <div className="w-[8.5in] h-full rounded-lg overflow-hidden shadow-lg">
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-10 py-8">
        <h1 className="text-4xl font-extrabold tracking-tight">
          {basics?.fullName || "Your Name"}
        </h1>
        <p className="text-sm text-gray-200 mt-1">
          {basics?.title || "Your Professional Title"}
        </p>

        <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-300">
          {basics?.email && (
            <span className="flex items-center gap-1">
              <Mail size={12} /> {basics.email}
            </span>
          )}
          {basics?.phone && (
            <span className="flex items-center gap-1">
              <Phone size={12} /> {basics.phone}
            </span>
          )}
          {basics?.website && (
            <span className="flex items-center gap-1">
              <Globe size={12} /> {basics.website}
            </span>
          )}
        </div>
      </header>

      <main className="grid grid-cols-3 gap-8 px-10 py-8 text-[13px] text-gray-800 bg-white">
        <div className="col-span-1 border-r border-gray-200 pr-8 space-y-8">
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-blue-700 mb-2">
              Online Profiles
            </h2>
            <ul className="space-y-1 text-gray-700 text-sm">
              {basics?.linkedin && (
                <li className="flex items-center gap-2">
                  <Linkedin size={14} className="text-blue-600" />{" "}
                  {basics.linkedin}
                </li>
              )}
              {basics?.github && (
                <li className="flex items-center gap-2">
                  <Github size={14} className="text-gray-800" /> {basics.github}
                </li>
              )}
            </ul>
          </section>

          {skills && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-blue-700 mb-2">
                Skills
              </h2>
              <div className="space-y-3">
                {Object.entries(skills).map(([key, value]) => {
                  if (key === "id" || !Array.isArray(value) || !value.length)
                    return null;
                  return (
                    <div key={key}>
                      <p className="font-medium text-[12px] capitalize text-gray-900">
                        {key}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {value.join(", ")}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {hobbies?.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-blue-700 mb-2">
                Interests
              </h2>
              <p className="text-xs text-gray-700 leading-relaxed">
                {hobbies.join(", ")}
              </p>
            </section>
          )}
        </div>

        <div className="col-span-2 space-y-8">
          {basics?.summary && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-2">
                Profile
              </h2>
              <p className="text-[13px] text-gray-700 leading-relaxed">
                {basics.summary}
              </p>
            </section>
          )}

          {experiences?.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-3">
                Experience
              </h2>
              <div className="space-y-5">
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-center">
                      <h3 className="text-[14px] font-bold text-gray-900">
                        {exp.position}
                      </h3>
                      <p className="text-[11px] text-gray-500">
                        {exp.startDate
                          ? new Date(exp.startDate).toLocaleDateString()
                          : ""}{" "}
                        -{" "}
                        {exp.endDate
                          ? new Date(exp.endDate).toLocaleDateString()
                          : "Present"}
                      </p>
                    </div>
                    <p className="text-xs text-gray-700">
                      {exp.company} • {exp.location}
                    </p>
                    {exp.achievements?.length > 0 && (
                      <ul className="list-disc list-inside text-xs text-gray-600 mt-1 space-y-1">
                        {exp.achievements.map((a, i) => (
                          <li key={i}>{a}</li>
                        ))}
                      </ul>
                    )}
                    {exp.technologies?.length > 0 && (
                      <p className="text-[11px] text-gray-500 mt-1 italic">
                        Tech: {exp.technologies.join(", ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {educations?.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-3">
                Education
              </h2>
              <div className="space-y-4">
                {educations.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-[14px] font-bold text-gray-900">
                      {edu.degree} in {edu.fieldOfStudy}
                    </h3>
                    <p className="text-xs text-gray-700">
                      {edu.institution} •{" "}
                      {new Date(edu.startDate).toLocaleDateString()} -{" "}
                      {new Date(edu.endDate).toLocaleDateString()}
                    </p>
                    {edu.details?.length > 0 && (
                      <ul className="list-disc list-inside text-xs text-gray-600 mt-1 space-y-1">
                        {edu.details.map((detail, i) => (
                          <li key={i}>{detail}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
