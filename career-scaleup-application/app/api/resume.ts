// import { toast } from "react-toastify";
import api from ".";
import { AnalysisResponse, Job, ResumeData, RewriteResponse } from "../types";

export const resumeApi = {
  getResumes: async () => {
    return api
      .get("/resume")
      .then((res) => res.data as ResumeData[])
      .catch((err) => {
        throw new Error(err);
      });
  },

  getResumeById: async (id: string) => {
    return api
      .get(`/resume/${id}`)
      .then((res) => res.data as ResumeData)
      .catch((err) => {
        throw new Error(err);
      });
  },

  uploadResume: async (file: File, onProgress?: (percent: number) => void) => {
    const formData = new FormData();
    formData.append("file", file);
    return api
      .post("/resume/upload", formData, {
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

  createResume: async (resume: any) => {
    return api
      .post("/resume/create", {
        data: resume,
      })
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.message);
      });
  },

  editEntity: async () => {},

  addEntity: async () => {},

  setResumeActive: async (resumeId: string) => {
    return api
      .patch("/resume/setActive", { resumeId })
      .then((res) => res.data as ResumeData)
      .catch((err) => {
        throw new Error(err.message);
      });
  },

  optimizeResume: async (resume: ResumeData, job: Job) => {
    return api
      .post("/resume/optimize", { resume, job })
      .then((res) => res.data as RewriteResponse)
      .catch((err) => {
        throw new Error(err.message);
      });
  },

  analyzeResume: async (resume: ResumeData, job?: Job) => {
    return api
      .post("/resume/analyze", {
        resume,
        job,
      })
      .then((res) => res.data as AnalysisResponse)
      .catch((err) => {
        throw new Error(err.message);
      });
  },

  changeTemplate: async (id: string, template: string) => {
    return api
      .patch("/resume/changeTemplate", { id, template })
      .then((res) => res.data as ResumeData)
      .catch((err) => {
        throw new Error(err.message);
      });
  },

  deleteResume: async (id: string) => {
    return api
      .delete("/resume", { data: { id } })
      .then((res) => {
        // toast.success("Resume deleted successfull");
        return res.data;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },
};
