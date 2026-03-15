import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/app/types";

interface ClassicPDFProps {
  resumeData: ResumeData;
}

export const ClassicPDF: React.FC<ClassicPDFProps> = ({ resumeData }) => {
  const { basics, experiences, educations, skills, projects } = resumeData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{basics.fullName}</Text>
          {basics.title && <Text style={styles.title}>{basics.title}</Text>}
          <Text style={styles.contact}>
            {[basics.email, basics.phone, basics.linkedin, basics.github]
              .filter(Boolean)
              .join(" • ")}
          </Text>
        </View>

        {basics.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.sectionContent}>{basics.summary}</Text>
          </View>
        )}

        {experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experiences.map((exp) => (
              <View key={exp.id} style={styles.item}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>
                    {exp.position}
                    {exp.company && (
                      <Text style={styles.itemCompany}> — {exp.company}</Text>
                    )}
                  </Text>
                  <Text style={styles.itemDate}>
                    {formatYear(exp.startDate)} – {formatYear(exp.endDate)}
                  </Text>
                </View>
                {exp.achievements.length > 0 && (
                  <View style={styles.itemList}>
                    {exp.achievements.map((a, i) => (
                      <Text key={i} style={styles.listItem}>
                        • {a}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {educations.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {educations.map((edu) => (
              <Text key={edu.id} style={styles.sectionContent}>
                <Text style={{ fontWeight: "bold" }}>{edu.degree}</Text>
                {edu.fieldOfStudy && `, ${edu.fieldOfStudy}`} —{" "}
                {edu.institution}{" "}
                <Text style={{ color: "#555" }}>
                  ({formatYear(edu.startDate)} – {formatYear(edu.endDate)})
                </Text>
              </Text>
            ))}
          </View>
        )}

        {hasSkills(skills) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.sectionContent}>
              {[
                ...skills.languages,
                ...skills.frameworks,
                ...skills.databases,
                ...skills.tools,
                ...skills.other,
              ].join(", ")}
            </Text>
          </View>
        )}

        {projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((p) => (
              <View key={p.id} style={styles.item}>
                <Text style={styles.itemTitle}>{p.name}</Text>
                {p.highlights.length > 0 && (
                  <View style={styles.itemList}>
                    {p.highlights.map((h, i) => (
                      <Text key={i} style={styles.listItem}>
                        • {h}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

const formatYear = (date?: string) => {
  if (!date) return "Present";
  return new Date(date).getFullYear();
};

const hasSkills = (skills: ResumeData["skills"]) =>
  skills.languages.length ||
  skills.frameworks.length ||
  skills.databases.length ||
  skills.tools.length ||
  skills.other.length;

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    padding: 30,
    lineHeight: 1.6,
    color: "#222",
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 14,
    fontWeight: "medium",
    marginTop: 2,
    color: "#555",
  },
  contact: {
    fontSize: 10,
    marginTop: 4,
    color: "#888",
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 2,
    marginBottom: 4,
  },
  sectionContent: {
    fontSize: 11,
    color: "#333",
  },
  item: {
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#222",
  },
  itemCompany: {
    fontWeight: "normal",
    color: "#555",
  },
  itemDate: {
    fontSize: 10,
    color: "#888",
  },
  itemList: {
    marginLeft: 10,
    marginTop: 2,
  },
  listItem: {
    fontSize: 11,
    color: "#333",
    marginBottom: 2,
  },
});
