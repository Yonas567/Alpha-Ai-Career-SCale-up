import api from ".";
import { CreateJobDto, Job, JobsAPIResponse } from "../types";

interface FetchJobsParams {
  query: string;
  location: string;
  pages: string;
  num_pages: string;
  date_posted: string;
}

export const jobApi = {
  fetchJobs: async (params: FetchJobsParams): Promise<JobsAPIResponse> => {
    return api
      .get("/job", { params })
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response?.data?.message || "Failed to load jobs");
      });
  },

  searchJob: async (
    searchTerm: string,
    location: string
  ): Promise<JobsAPIResponse> => {
    return api
      .get("/job", {
        params: { query: searchTerm, country: location },
      })
      .then((res) => res.data as JobsAPIResponse)
      .catch((err) => {
        throw new Error("Failed to load jobs");
      });
  },

  saveJob: async (job: Job, source: "external" | "internal") => {
    return api
      .post("/job", {
        job,
        source,
      })
      .then((res) => res.data)
      .catch((err) => {
        throw new Error("Failed to save jobs");
      });
  },

  createJob: async (job: CreateJobDto) => {
    return api
      .post("/job/create", { job })
      .then((res) => res.data)
      .catch((err) => {
        throw new Error("Failed to create job");
      });
  },

  deleteJob: async (jobId: string) => {
    return api
      .delete("/job", { data: { jobId } })
      .then((res) => res.data)
      .catch((err) => {
        throw new Error("Failed to delete Job");
      });
  },

  getRecruiterJobs: async () => {
    return api
      .get("/recruiter/jobs")
      .then((res) => res.data as Job[])
      .catch((err) => {
        throw new Error("Failed to fetch Jobs");
      });
  },

  updateJobStatus: async (jobId: string, status: "Open" | "Closed") => {
    return api
      .patch("/recruiter/jobs", { jobId, status })
      .then((res) => res.data)
      .catch((err) => {
        throw new Error("Failed to change Job status");
      });
  },

  editJob: async (jobId: string, job: Job) => {
    return api
      .patch("/recruiter/jobs", { jobId, ...job })
      .then((res) => res.data)
      .catch((err) => {
        throw new Error("Failed to edit Job");
      });
  },
};
