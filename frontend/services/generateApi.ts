import api from "@/lib/api"; 

export interface StartGenerationPayload {
  resumeFileId: string;
  s3Key: string;
  jobDescription: string;
}

export interface JobStatusResponse {
  jobId: string;
  status: "processing" | "done" | "failed";
  downloadUrl?: string;
  errorMessage?: string;
}

export const generateApi = {
  start: (payload: StartGenerationPayload) =>
    api.post<{ jobId: string; status: string }>("/generate/generate", payload),

  status: (jobId: string) =>
    api.get<JobStatusResponse>(`/generate/generate/${jobId}`),
};