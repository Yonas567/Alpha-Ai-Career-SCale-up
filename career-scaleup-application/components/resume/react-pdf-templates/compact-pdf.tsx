"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/app/types";

interface Props {
  resumeData: ResumeData;
}

export function CompactPDF({ resumeData }: Props) {
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
    <Document>
      <Page size="A4" style={styles.page}>
        {basics && (
          <View style={styles.header}>
            <Text style={styles.name}>{basics.fullName}</Text>
            <Text style={styles.title}>{basics.title}</Text>
            <Text style={styles.contact}>
              {[basics.email, basics.linkedin, basics.github]
                .filter(Boolean)
                .join(" • ")}
            </Text>
            {basics.summary && (
              <Text style={styles.summary}>{basics.summary}</Text>
            )}
          </View>
        )}

        {experiences?.length > 0 && (
          <SectionPDF title="Experience">
            {experiences.map((exp) => (
              <View key={exp.id} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>
                    {exp.position} — {exp.company}
                  </Text>
                  <Text style={styles.entryDate}>
                    {exp.startDate} – {exp.endDate}
                  </Text>
                </View>
                {exp.achievements?.length > 0 && (
                  <View style={styles.list}>
                    {exp.achievements.map((a, i) => (
                      <Text key={i} style={styles.listItem}>
                        • {a}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </SectionPDF>
        )}

        {educations?.length > 0 && (
          <SectionPDF title="Education">
            {educations.map((edu) => (
              <Text key={edu.id} style={styles.entryText}>
                <Text style={styles.bold}>{edu.degree}</Text>
                {edu.fieldOfStudy && `, ${edu.fieldOfStudy}`} —{" "}
                {edu.institution}
              </Text>
            ))}
          </SectionPDF>
        )}

        {projects?.length > 0 && (
          <SectionPDF title="Projects">
            {projects.map((p) => (
              <View key={p.id} style={styles.entry}>
                <Text style={styles.entryTitle}>{p.name}</Text>
                {p.description && (
                  <Text style={styles.entryText}>{p.description}</Text>
                )}
              </View>
            ))}
          </SectionPDF>
        )}

        {skills && (
          <SectionPDF title="Skills">
            {skills.languages?.length > 0 && (
              <SkillRowPDF label="Languages" items={skills.languages} />
            )}
            {skills.frameworks?.length > 0 && (
              <SkillRowPDF label="Frameworks" items={skills.frameworks} />
            )}
            {skills.tools?.length > 0 && (
              <SkillRowPDF label="Tools" items={skills.tools} />
            )}
          </SectionPDF>
        )}

        {certifications?.length > 0 && (
          <SectionPDF title="Certifications">
            {certifications.map((c) => (
              <Text key={c.id} style={styles.entryText}>
                <Text style={styles.bold}>{c.name}</Text> — {c.issuer}
              </Text>
            ))}
          </SectionPDF>
        )}

        {awards?.length > 0 && (
          <SectionPDF title="Awards">
            {awards.map((a) => (
              <Text key={a.id} style={styles.entryText}>
                <Text style={styles.bold}>{a.title}</Text> — {a.issuer} (
                {a.year})
              </Text>
            ))}
          </SectionPDF>
        )}

        {languages?.length > 0 && (
          <SectionPDF title="Languages">
            <Text style={styles.entryText}>
              {languages.map((l) => `${l.name} (${l.proficiency})`).join(", ")}
            </Text>
          </SectionPDF>
        )}
      </Page>
    </Document>
  );
}

const SectionPDF = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const SkillRowPDF = ({ label, items }: { label: string; items: string[] }) => (
  <Text style={styles.entryText}>
    <Text style={styles.bold}>{label}:</Text> {items.join(", ")}
  </Text>
);

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 10.5,
    fontFamily: "Helvetica",
    lineHeight: 1.4,
    backgroundColor: "#ffffff",
    color: "#000000",
  },
  header: {
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 12,
    marginTop: 2,
  },
  contact: {
    fontSize: 9.5,
    marginTop: 2,
    color: "#555555",
  },
  summary: {
    marginTop: 4,
    fontSize: 10,
    color: "#333333",
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    marginBottom: 2,
    paddingBottom: 1,
  },
  entry: {
    marginBottom: 4,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: "bold",
  },
  entryTitle: {
    fontSize: 10.5,
    fontWeight: "bold",
  },
  entryDate: {
    fontSize: 9,
    color: "#555555",
  },
  entryText: {
    fontSize: 10,
    marginBottom: 1,
  },
  bold: {
    fontWeight: "bold",
  },
  list: {
    marginLeft: 8,
    marginTop: 2,
  },
  listItem: {
    fontSize: 10,
  },
});
