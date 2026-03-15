import { CoverLetterDTO } from "@/components/cover-letter/cover-letter-preview";
import api from ".";
import { GenerateCoverLeterPayload, Job } from "../types";

const CoverLetterApi = {
  getCoverLetters: async () => {
    return api
      .get("/cover-letter")
      .then((res) => res.data as CoverLetterDTO[])
      .catch((error) => {
        throw new Error(error);
      });
  },

  getCoverLetterById: async (id: string) => {
    return api
      .get(`/cover-letter/${id}`)
      .then((res) => res.data as CoverLetterDTO)
      .catch((error) => {
        throw new Error(error);
      });
  },

  generateCoverLetter: async (
    mode: "mode-1" | "mode-2",
    payload: GenerateCoverLeterPayload
  ) => {
    return api
      .post("/cover-letter", {
        mode,
        payload,
      })
      .then((res) => res.data);
  },

  uploadCoverLetter: async (
    file: File,
    onProgress?: (percent: number) => void
  ) => {
    const formData = new FormData();
    formData.append("file", file);

    return api
      .post("/cover-letter/upload", formData, {
        onUploadProgress: (event) => {
          if (!event.total || !onProgress) return;
          const percent = Math.round((event.loaded * 100) / event.total);
          onProgress(percent);
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(error);
      });
  },

  optimizeCoverLetter: async (
    coverLetter: Partial<CoverLetterDTO>,
    job: Job,
    company: string
  ) => {
    return api
      .post("/cover-letter/optimize", {
        coverLetter,
        job,
        company,
      })
      .then((res) => res.data as Partial<CoverLetterDTO>)
      .catch((error) => {
        throw new Error(error);
      });
  },
};

export default CoverLetterApi;
