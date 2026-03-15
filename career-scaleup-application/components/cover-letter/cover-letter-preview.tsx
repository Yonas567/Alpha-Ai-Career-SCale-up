"use client";

export type CoverLetterDTO = {
  id: string;
  seekerId: string;

  title: string;

  applicant: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    linkedin: string;
    github: string;
  };
  employer: {
    companyName: string;
    positionTitle: string;
    recruiterName?: string | null;
    companyAddress?: string | null;
  };
  letter: {
    date: string;
    content: string;
    signature: {
      closingLine: string;
      name: string;
    };
  };
  createdAt: Date;
};

interface props {
  data: Partial<CoverLetterDTO>;
}

export function CoverLetterPreview({ data }: props) {
  if (!data || !data.applicant || !data.employer || !data.letter) {
    return <div className="h-full flex items-center justify-center">Upload to load cover letter</div>;
  }

  const { applicant, employer, letter } = data;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-10 text-gray-900 leading-relaxed border">
      <div className="space-y-1 text-sm">
        <p className="font-semibold text-base">{applicant.fullName}</p>
        <p>{applicant.address}</p>
        <p>{applicant.email}</p>
        <p>{applicant.phone}</p>

        {applicant.linkedin && (
          <p>
            <span className="font-semibold">LinkedIn:</span>{" "}
            {applicant.linkedin}
          </p>
        )}

        {applicant.github && (
          <p>
            <span className="font-semibold">GitHub:</span> {applicant.github}
          </p>
        )}
      </div>

      <p className="mt-6">{letter.date}</p>

      <div className="mt-6">
        <p className="font-semibold text-lg">{employer.companyName}</p>
        {employer.positionTitle && (
          <p className="font-medium">Re: {employer.positionTitle}</p>
        )}
        {employer.companyAddress && <p>{employer.companyAddress}</p>}
        {employer.recruiterName && <p>Attn: {employer.recruiterName}</p>}
      </div>

      <div className="mt-8 whitespace-pre-line text-[15px]">
        {letter.content}
      </div>

      <div className="mt-10">
        <p>Kind Regards,</p>
        <p className="font-semibold mt-3">{letter.signature.name}</p>
      </div>
    </div>
  );
}
