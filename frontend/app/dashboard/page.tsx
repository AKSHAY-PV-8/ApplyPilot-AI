// features/dashboard/DashboardPage.tsx  (replace your current file)
"use client";

import { useState } from "react";
import { Upload, FileText, Sparkles, Loader2, ChevronRight, ArrowLeft } from "lucide-react";
import FileDropzone from "@/features/dashboard/Filedropzone";
import JobStatusTracker from "@/features/dashboard/Jobstatustracker";
import { resumeApi } from "@/services/resumeApi";
import { generateApi } from "@/services/generateApi";

interface UploadedFile {
  id: string;
  s3Key: string;         
  originalName: string;  
}

type Step = "upload" | "describe" | "generating";

const steps = [
  { id: "upload", label: "Upload resume", icon: Upload },
  { id: "describe", label: "Job description", icon: FileText },
  { id: "generating", label: "Generate", icon: Sparkles },
] as const;

export default function DashboardPage() {
  const [step, setStep] = useState<Step>("upload");

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [uploadError, setUploadError] = useState("");

  const [jobDescription, setJobDescription] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generateError, setGenerateError] = useState("");

  const [jobId, setJobId] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    setUploadError("");
    setUploading(true);
    try {
      const res = await resumeApi.upload(file);
      setUploadedFile({
        id: res.data.fileId,
        s3Key: "",          
        originalName: file.name,
      });
      setStep("describe");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Upload failed. Please try again.";
      setUploadError(msg);
    } finally {
      setUploading(false);
    }
  };

  const handleGenerate = async () => {
    if (!uploadedFile || !jobDescription.trim()) return;
    setGenerateError("");
    setGenerating(true);
    try {
      const res = await generateApi.start({
        resumeFileId: uploadedFile.id,
        s3Key: uploadedFile.s3Key,
        jobDescription: jobDescription.trim(),
      });
      setJobId(res.data.jobId);
      setStep("generating");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Failed to start generation.";
      setGenerateError(msg);
    } finally {
      setGenerating(false);
    }
  };

  const handleReset = () => {
    setStep("upload");
    setFile(null);
    setUploadedFile(null);
    setJobId(null);
    setJobDescription("");
    setUploadError("");
    setGenerateError("");
  };

  const stepIndex = steps.findIndex((s) => s.id === step);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .ap-dash-page {
          min-height: calc(100svh - 62px);
          background: #FAFAFA;
          padding: clamp(1.5rem,4vw,3rem) clamp(1rem,4vw,2rem);
          font-family: 'Inter', sans-serif;
        }
        .ap-dash-inner {
          max-width: 680px; margin: 0 auto;
        }

        /* Welcome */
        .ap-dash-welcome { margin-bottom: 2.5rem; }
        .ap-dash-greeting {
          font-family: 'Syne', sans-serif; font-size: clamp(1.5rem,3vw,2rem);
          font-weight: 800; color: #1E2D40; margin-bottom: 4px;
        }
        .ap-dash-sub { font-size: 0.95rem; color: #64748B; }

        /* Step stepper */
        .ap-stepper {
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 2rem; flex-wrap: wrap;
        }
        .ap-stepper-item {
          display: flex; align-items: center; gap: 7px;
          padding: 0.4rem 1rem; border-radius: 999px;
          font-size: 0.82rem; font-weight: 600; border: none;
          transition: background 0.2s, color 0.2s;
          font-family: 'Inter', sans-serif;
          white-space: nowrap;
        }
        .ap-stepper-item.pending {
          background: #F1F5F9; color: #94A3B8;
        }
        .ap-stepper-item.completed {
          background: #EEF2FF; color: #4F46E5;
        }
        .ap-stepper-item.active {
          background: #4F46E5; color: #fff;
          box-shadow: 0 4px 14px rgba(79,70,229,0.28);
        }
        .ap-stepper-chevron { color: #CBD5E1; flex-shrink: 0; }

        /* Card */
        .ap-dash-card {
          background: #fff; border-radius: 20px;
          border: 1px solid #E8EAF0;
          padding: clamp(1.5rem,4vw,2.25rem);
          margin-bottom: 1.25rem;
        }
        .ap-card-title {
          font-family: 'Syne', sans-serif; font-size: 1.2rem;
          font-weight: 800; color: #1E2D40; margin-bottom: 4px;
        }
        .ap-card-sub { font-size: 0.875rem; color: #94A3B8; margin-bottom: 1.75rem; }

        /* Uploaded file badge */
        .ap-uploaded-badge {
          display: flex; align-items: center; gap: 10px;
          background: #F0FDF9; border: 1.5px solid #A7F3D0;
          border-radius: 12px; padding: 11px 14px; margin-bottom: 1.25rem;
        }
        .ap-uploaded-badge-label {
          font-size: 0.875rem; font-weight: 600; color: #065F46;
          flex: 1; min-width: 0;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .ap-uploaded-badge-check {
          font-size: 0.78rem; font-weight: 600; color: #10B981; flex-shrink: 0;
        }

        /* Textarea */
        .ap-label {
          display: block; font-size: 0.84rem; font-weight: 600;
          color: #374151; margin-bottom: 6px;
        }
        .ap-textarea {
          width: 100%; padding: 0.875rem 1rem;
          border: 1.5px solid #E2E8F0; border-radius: 12px;
          font-size: 0.9rem; color: #1E2D40; background: #fff;
          font-family: 'Inter', sans-serif; line-height: 1.65;
          resize: none; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .ap-textarea::placeholder { color: #CBD5E1; }
        .ap-textarea:focus {
          border-color: #818CF8;
          box-shadow: 0 0 0 3px rgba(129,140,248,0.15);
        }
        .ap-char-count { font-size: 0.78rem; color: #94A3B8; margin-top: 5px; text-align: right; }

        /* Error */
        .ap-error-msg {
          display: flex; align-items: center; gap: 8px;
          background: #FEF2F2; border: 1.5px solid #FECACA;
          border-radius: 10px; padding: 0.7rem 1rem;
          font-size: 0.875rem; color: #DC2626;
          margin-top: 1rem;
        }

        /* Buttons */
        .ap-btn-primary {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 8px; padding: 0.8rem 1.75rem;
          background: #4F46E5; color: #fff;
          border: none; border-radius: 12px;
          font-size: 0.9rem; font-weight: 700;
          font-family: 'Inter', sans-serif; cursor: pointer;
          transition: background 0.18s, transform 0.1s, box-shadow 0.18s;
          box-shadow: 0 4px 14px rgba(79,70,229,0.2);
        }
        .ap-btn-primary:hover:not(:disabled) {
          background: #4338CA; transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(79,70,229,0.3);
        }
        .ap-btn-primary:active:not(:disabled) { transform: scale(0.98); }
        .ap-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
        .ap-btn-primary.w-full { width: 100%; }

        .ap-btn-secondary {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 0.8rem 1.4rem;
          background: #fff; color: #475569;
          border: 1.5px solid #E2E8F0; border-radius: 12px;
          font-size: 0.9rem; font-weight: 600;
          font-family: 'Inter', sans-serif; cursor: pointer;
          transition: border-color 0.18s, background 0.18s;
        }
        .ap-btn-secondary:hover { background: #F8FAFC; border-color: #CBD5E1; }

        .ap-btn-row {
          display: flex; gap: 0.75rem; margin-top: 1.5rem; flex-wrap: wrap;
        }
        .ap-btn-row .ap-btn-primary { flex: 1; }

        /* Tip card */
        .ap-tip-card {
          background: #FFFBEB; border: 1.5px solid #FDE68A;
          border-radius: 14px; padding: 1.1rem 1.25rem;
        }
        .ap-tip-title {
          font-size: 0.84rem; font-weight: 700; color: #92400E;
          margin-bottom: 4px; display: flex; align-items: center; gap: 6px;
        }
        .ap-tip-text { font-size: 0.84rem; color: #B45309; line-height: 1.6; }

        /* Spin utility */
        .ap-spinning { animation: ap-spin-kf 0.8s linear infinite; }
        @keyframes ap-spin-kf { to { transform: rotate(360deg); } }

        @media (max-width: 540px) {
          .ap-stepper-item span { display: none; }
          .ap-stepper-item { padding: 0.4rem 0.75rem; }
        }
      `}</style>

      <div className="ap-dash-page">
        <div className="ap-dash-inner">

          <div className="ap-dash-welcome">
            <h1 className="ap-dash-greeting">
              {/* Hi {user?.name?.split(" ")[0] ?? "there"} */}
            </h1>
            <p className="ap-dash-sub">
              Tailor your resume to any job in seconds with AI.
            </p>
          </div>

          <div className="ap-stepper">
            {steps.map((s, i) => (
              <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  className={`ap-stepper-item ${i === stepIndex
                      ? "active"
                      : i < stepIndex
                        ? "completed"
                        : "pending"
                    }`}
                >
                  <s.icon size={13} />
                  <span>{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <ChevronRight size={15} className="ap-stepper-chevron" />
                )}
              </div>
            ))}
          </div>

          {step === "upload" && (
            <div className="ap-dash-card">
              <div className="ap-card-title">Upload your resume</div>
              <p className="ap-card-sub">PDF files only, up to 10 MB.</p>

              <FileDropzone file={file} onFile={setFile} disabled={uploading} />

              {uploadError && (
                <div className="ap-error-msg">
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {uploadError}
                </div>
              )}

              <div style={{ marginTop: "1.5rem" }}>
                <button
                  onClick={handleUpload}
                  disabled={!file || uploading}
                  className="ap-btn-primary w-full"
                >
                  {uploading && <Loader2 size={15} className="ap-spinning" />}
                  {uploading ? "Uploading…" : "Continue →"}
                </button>
              </div>
            </div>
          )}

          {step === "describe" && (
            <div className="ap-dash-card">
              <div className="ap-card-title">Paste the job description</div>
              <p className="ap-card-sub">
                AI will tailor your resume to match exactly what they&apos;re looking for.
              </p>

              {uploadedFile && (
                <div className="ap-uploaded-badge">
                  <FileText size={15} color="#10B981" />
                  <span className="ap-uploaded-badge-label">
                    {uploadedFile.originalName}
                  </span>
                  <span className="ap-uploaded-badge-check">uploaded ✓</span>
                </div>
              )}

              <label htmlFor="jd" className="ap-label">
                Job description
              </label>
              <textarea
                id="jd"
                rows={10}
                className="ap-textarea"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the full job description here — requirements, responsibilities, tech stack, company info…"
              />
              <div className="ap-char-count">{jobDescription.length} characters</div>

              {generateError && (
                <div className="ap-error-msg">
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {generateError}
                </div>
              )}

              <div className="ap-btn-row">
                <button onClick={handleReset} className="ap-btn-secondary">
                  <ArrowLeft size={14} />
                  Back
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={!jobDescription.trim() || generating}
                  className="ap-btn-primary"
                >
                  {generating && <Loader2 size={15} className="ap-spinning" />}
                  <Sparkles size={14} />
                  {generating ? "Starting…" : "Generate resume"}
                </button>
              </div>
            </div>
          )}

          {step === "generating" && jobId && (
            <div className="ap-dash-card">
              <div className="ap-card-title">Generating your resume</div>
              <p className="ap-card-sub">
                Sit tight — your AI-tailored resume is being compiled.
              </p>
              <JobStatusTracker jobId={jobId} onReset={handleReset} />
            </div>
          )}

          {step !== "generating" && (
            <div className="ap-tip-card">
              <div className="ap-tip-title">
                <svg width="14" height="14" fill="#F59E0B" viewBox="0 0 24 24">
                  <path d="M12 2a7 7 0 015.292 11.584l.208.416H16v2h-2v2h-4v-2H8v-2H6.5l.208-.416A7 7 0 0112 2zm1 14v1h-2v-1h2zm0-2v-1.101A3 3 0 0011 10V9h2v1a1 1 0 101 1v1.899A3.001 3.001 0 0013 14z" />
                </svg>
                Pro tip
              </div>
              <p className="ap-tip-text">
                Paste the full job description including requirements, responsibilities, and tech stack for the best tailoring results. More context = better match.
              </p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}