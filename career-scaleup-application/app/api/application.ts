import api from ".";

export const applicationsApi = {
  createApplication: async ({
    jobId,
    seekerId,
    status,
    coverLetter, 
    resumeUrl
  }: {
    jobId: string;
    seekerId: string;
    status: ApplicationStatus;
    coverLetter?: string;
    resumeUrl?: string;
  }) => {
    return api.post("/applications", {
      jobId,
      seekerId,
      status,
      coverLetter, 
      resumeUrl
    });
  },

  updateApplicationStatus: async (
    applicationId: string,
    status: "Applied" | "ShortListed" | "Hired" | "Rejected"
  ) => {
    return api
      .patch("/applications", { applicationId, status })
      .then((res) => res.data)
      .catch((err) => {
        throw new Error();
      });
  },
};

export type ApplicationStatus =
  | "Applied"
  | "ShortListed"
  | "Hired"
  | "Rejected"
  | "Withdraw";

export type CreateApplicationDTO = {
  jobId: string;

  seekerId: string;

  coverLetter?: string | null;

  resumeUrl?: string | null;

  status: ApplicationStatus;
};
