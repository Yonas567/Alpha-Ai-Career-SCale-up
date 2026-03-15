"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { CoverLetterDTO } from "../cover-letter-preview";

interface Props {
  data: Partial<CoverLetterDTO>;
}

export function CoverLetterPDF({ data }: Props) {
  if (!data || !data.applicant || !data.employer || !data.letter) return null;

  const { applicant, employer, letter } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{applicant.fullName}</Text>
          {applicant.address && <Text>{applicant.address}</Text>}
          {applicant.email && <Text>{applicant.email}</Text>}
          {applicant.phone && <Text>{applicant.phone}</Text>}

          {applicant.linkedin && (
            <Text>
              <Text style={styles.bold}>LinkedIn:</Text> {applicant.linkedin}
            </Text>
          )}

          {applicant.github && (
            <Text>
              <Text style={styles.bold}>GitHub:</Text> {applicant.github}
            </Text>
          )}
        </View>

        {/* Date */}
        <Text style={styles.date}>{letter.date}</Text>

        <View style={styles.employer}>
          <Text style={styles.company}>{employer.companyName}</Text>

          {employer.positionTitle && (
            <Text style={styles.position}>Re: {employer.positionTitle}</Text>
          )}

          {employer.companyAddress && <Text>{employer.companyAddress}</Text>}

          {employer.recruiterName && (
            <Text>Attn: {employer.recruiterName}</Text>
          )}
        </View>

        <View style={styles.content}>
          <Text>{letter.content}</Text>
        </View>

        <View style={styles.signature}>
          <Text>Kind Regards,</Text>
          <Text style={styles.signatureName}>{letter.signature.name}</Text>
        </View>
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11.5,
    fontFamily: "Helvetica",
    lineHeight: 1.6,
    color: "#111827",
    backgroundColor: "#ffffff",
  },

  header: {
    marginBottom: 24,
    fontSize: 10.5,
  },

  name: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },

  bold: {
    fontWeight: "bold",
  },

  date: {
    marginBottom: 24,
  },

  employer: {
    marginBottom: 32,
  },

  company: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 2,
  },

  position: {
    fontSize: 11.5,
    marginBottom: 2,
  },

  content: {
    fontSize: 11.5,
    marginBottom: 40,
    whiteSpace: "pre-line",
  },

  signature: {
    marginTop: 24,
  },

  signatureName: {
    marginTop: 12,
    fontSize: 11.5,
    fontWeight: "bold",
  },
});
