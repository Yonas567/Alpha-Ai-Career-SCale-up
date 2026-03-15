import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/app/types";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11.5,
    lineHeight: 1.65,
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 45,
    color: "#000",
  },

  /* Header */
  header: {
    marginBottom: 18,
  },
  name: {
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: -0.3,
  },
  title: {
    fontSize: 13,
    fontWeight: 500,
    marginTop: 4,
  },
  contact: {
    fontSize: 10.5,
    color: "#4b5563",
    marginTop: 8,
  },

  /* Sections */
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 0.3,
    marginBottom: 6,
  },

  /* Experience */
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  experienceTitle: {
    fontWeight: 600,
  },
  experienceDate: {
    fontSize: 10,
    color: "#6b7280",
  },
  bulletList: {
    marginTop: 6,
    paddingLeft: 12,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 4,
  },
  bulletDot: {
    width: 6,
    fontSize: 12,
  },
  bulletText: {
    flex: 1,
  },

  /* Education */
  educationItem: {
    marginTop: 6,
  },
  degree: {
    fontWeight: 600,
  },

  /* Skills */
  skills: {
    marginTop: 6,
  },
});

export default function ModernPDF({ resumeData }: { resumeData: ResumeData }) {
  const { basics, experiences, educations, skills } = resumeData;

  const skillList = [
    ...skills.languages,
    ...skills.frameworks,
    ...skills.databases,
    ...skills.tools,
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{basics.fullName}</Text>
          <Text style={styles.title}>{basics.title}</Text>

          <Text style={styles.contact}>
            {[basics.email, basics.linkedin, basics.github]
              .filter(Boolean)
              .join(" • ")}
          </Text>
        </View>

        {basics.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text>{basics.summary}</Text>
          </View>
        )}

        {experiences?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>

            {experiences.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.experienceTitle}>
                    {exp.position}
                    {exp.company ? ` — ${exp.company}` : ""}
                  </Text>

                  <Text style={styles.experienceDate}>
                    {formatYear(exp.startDate)} – {formatYear(exp.endDate)}
                  </Text>
                </View>

                <View style={styles.bulletList}>
                  {exp.achievements.map((a, i) => (
                    <View key={i} style={styles.bullet}>
                      <Text style={styles.bulletDot}>•</Text>
                      <Text style={styles.bulletText}>{a}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {educations?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>

            {educations.map((edu) => (
              <Text key={edu.id} style={styles.educationItem}>
                <Text style={styles.degree}>{edu.degree}</Text>
                {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""} —{" "}
                {edu.institution}
              </Text>
            ))}
          </View>
        )}

        {skillList.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            <Text style={styles.skills}>{skillList.join(" • ")}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}

function formatYear(date?: string) {
  if (!date) return "Present";
  return new Date(date).getFullYear().toString();
}
