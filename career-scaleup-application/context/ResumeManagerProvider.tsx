import { emptyResume, emptyResumeData } from "@/app/constants";
import {
  ResumeData,
  ResumeManagerContextType,
  ResumeResponse,
  SectionId,
} from "@/app/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const ResumeManagerContext = createContext<
  ResumeManagerContextType | undefined
>(undefined);

export const useResumeManager = () => {
  const context = useContext(ResumeManagerContext);
  if (!context) {
    throw new Error(
      "useResumeManager must be used within a ResumeManagerProvider"
    );
  }
  return context;
};

export default function ResumeManagerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [resumes, setResumes] = useState<ResumeData[]>([]);

  const [resumeData, setResumeData] = useState<ResumeData>(emptyResumeData);
  const [activeResume, setActiveResume] = useState<ResumeData | undefined>(
    undefined
  );
  const [analyses, setAnalysisResults] = useState<
    Record<string, ResumeResponse>
  >({});

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    getResumes();
  }, []);

  const createResume = async () => {
    const createdResume = await fetch(`/api/resume/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: emptyResume }),
    });

    const createdResumeData = await createdResume.json();
    return createdResumeData;
  };

  const editEntity = async (id: string, section: SectionId, data: any) => {
    try {
      await fetch("/api/resume", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, section, data }),
      });
    } catch (err) {
      console.error("Failed to update resume:", err);
    }
  };

  const addEntity = useMutation({
    mutationFn: async ({
      id,
      section,
      data,
    }: {
      id: string;
      section: SectionId;
      data: any;
    }) => {
      try {
        await fetch("/api/resume/addSection", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: resumeData.id,
            section,
            data,
          }),
        });
      } catch (err) {
        console.error("Failed to update resume:", err);
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["resumes"] }),
  });

  const getResumes = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/resume`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data as ResumeData[])
      .then((data) => {
        setResumes(data);
        setActiveResume(data.find((resume) => resume.isActive));
        setResumeData(data[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        setResumes([]);
        setIsLoading(false);
        console.error("Error fetching resumes:", error);
      });
  };

  const getResumeById = async (id: string) => {
    setResumeData(emptyResumeData);
    setIsLoading(true);
    const cachedResume = resumes.find((resume) => resume.id === id);

    if (cachedResume) {
      setResumeData(cachedResume as ResumeData);
      setIsLoading(false);
      return cachedResume;
    } else {
      await fetch(`/api/resume`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })
        .then((res) => res.json())
        .then((data) => {
          setResumeData(data);
          setIsLoading(false);
          return data as ResumeData
        })
        .catch((error) => {
          console.error("Error fetching resume data:", error);
        });
    }
  };

  const uploadResume = async (formData: FormData) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const response = await axios.post("/api/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (!progressEvent.total) return;

          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          setUploadProgress(percent);
        },
      });

      if (response.data?.id) {
        await getResumes();
        return response.data.id;
      }

      return undefined;
    } catch (error) {
      console.error("Error uploading resume:", error);
      return undefined;
    } finally {
      setIsUploading(false);
    }
  };
  const setResumeAnalysis = (resumeId: string, data: ResumeResponse) => {
    setAnalysisResults((prev) => ({ ...prev, [resumeId]: data }));
  };

  return (
    <ResumeManagerContext.Provider
      value={{
        resumes,
        resumeData,
        setResumeData,
        activeResume,
        uploadResume,
        createResume,
        analyses,
        setResumeAnalysis,
        addEntity,
        editEntity,
        isLoading,
        isUploading,
        uploadProgress,
        setIsUploading,
        getResumeById,
        getResumes,
      }}
    >
      {children}
    </ResumeManagerContext.Provider>
  );
}
