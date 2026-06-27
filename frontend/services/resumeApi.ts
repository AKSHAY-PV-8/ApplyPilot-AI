import api from "@/lib/api";


export interface ResumeFile {
  id: string;
  originalName: string;
  s3Key: string;
  sizeBytes: number;
  mimeType: string;
}

export const resumeApi = {
  upload: (file: File) => {
    const formData = new FormData();
    formData.append("resume", file);
    return api.post<{ success: boolean; fileId: string; s3Key: string; originalName: string }>("/resume/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};