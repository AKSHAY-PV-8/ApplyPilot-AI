"use client";

import { useEffect, useState, useCallback } from "react";
import { Loader2, CheckCircle2, XCircle, Download, RefreshCcw } from "lucide-react";
// import { generateApi, JobStatusResponse } from "@/lib/api";

interface Props {
  jobId: string;
  onReset: () => void;
}

const POLL_INTERVAL = 2500;

const pipelineSteps = [
  { label: "Extracting resume content", sub: "Reading your PDF" },
  { label: "AI tailoring with Groq", sub: "Matching to job description" },
  { label: "Compiling PDF output", sub: "Generating your new resume" },
];

export default function JobStatusTracker({ jobId, onReset }: Props) {
//   const [status, setStatus] = useState<JobStatusResponse | null>(null);
  const [pollError, setPollError] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  const poll = useCallback(async () => {
    // try {
    //   const res = await generateApi.status(jobId);
    //   setStatus(res.data);
    // } catch {
    //   setPollError("Failed to check generation status.");
    // }
  }, [jobId]);

  // Polling
  useEffect(() => {
    // poll();
    // const id = setInterval(() => {
    //   if (status?.status === "done" || status?.status === "failed") {
    //     clearInterval(id);
    //     return;
    //   }
    //   poll();
    // }, POLL_INTERVAL);
    // return () => clearInterval(id);
  }, [poll, status?.status]);

  // Elapsed timer
//   useEffect(() => {
//     if (!status || status.status === "done" || status.status === "failed") return;
//     const timer = setInterval(() => setElapsed((e) => e + 1), 1000);
//     return () => clearInterval(timer);
//   }, [status]);

  // Animate steps
  useEffect(() => {
    if (!status || status.status === "done" || status.status === "failed") return;
    const step = setInterval(() => {
      setActiveStep((s) => Math.min(s + 1, pipelineSteps.length - 1));
    }, 5000);
    return () => clearInterval(step);
  }, [status]);

  const formatElapsed = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
  };

  // ─── Poll error ────────────────────────────────────────────────────────────
  if (pollError) {
    return (
      <>
        <ApStyles />
        <div className="ap-tracker-center">
          <div className="ap-tracker-icon-wrap ap-tracker-fail-bg">
            <XCircle size={32} color="#EF4444" />
          </div>
          <div className="ap-tracker-heading">Connection lost</div>
          <div className="ap-tracker-sub">{pollError}</div>
          <button onClick={onReset} className="ap-tracker-btn-secondary">
            <RefreshCcw size={14} />
            Try again
          </button>
        </div>
      </>
    );
  }

  // ─── Initial load ─────────────────────────────────────────────────────────
  if (!status) {
    return (
      <>
        <ApStyles />
        <div className="ap-tracker-center">
          <div className="ap-tracker-spin-wrap">
            <Loader2 size={28} color="#4F46E5" className="ap-spin" />
          </div>
          <div className="ap-tracker-sub">Initialising generation job…</div>
        </div>
      </>
    );
  }

  // ─── Failed ───────────────────────────────────────────────────────────────
  if (status.status === "failed") {
    return (
      <>
        <ApStyles />
        <div className="ap-tracker-center">
          <div className="ap-tracker-icon-wrap ap-tracker-fail-bg">
            <XCircle size={32} color="#EF4444" />
          </div>
          <div className="ap-tracker-heading">Generation failed</div>
          <div className="ap-tracker-sub">
            {status.errorMessage ?? "An unexpected error occurred. Please try again."}
          </div>
          <button onClick={onReset} className="ap-tracker-btn-secondary">
            <RefreshCcw size={14} />
            Try again
          </button>
        </div>
      </>
    );
  }

  // ─── Done ─────────────────────────────────────────────────────────────────
  if (status.status === "done" && status.downloadUrl) {
    return (
      <>
        <ApStyles />
        <div className="ap-tracker-center">
          <div className="ap-tracker-icon-wrap ap-tracker-success-bg">
            <CheckCircle2 size={32} color="#10B981" />
          </div>
          <div className="ap-tracker-heading">Your resume is ready!</div>
          <div className="ap-tracker-sub">
            ATS-optimised PDF generated and tailored to the job description.
          </div>
          <div className="ap-tracker-actions">
            <a
              href={status.downloadUrl}
              target="_blank"
              rel="noreferrer"
              className="ap-tracker-btn-primary"
            >
              <Download size={15} />
              Download PDF
            </a>
            <button onClick={onReset} className="ap-tracker-btn-secondary">
              Generate another
            </button>
          </div>
          <div className="ap-tracker-success-note">
            ✦ Link expires in 15 minutes
          </div>
        </div>
      </>
    );
  }

  // ─── Processing ───────────────────────────────────────────────────────────
  return (
    <>
      <ApStyles />
      <div className="ap-tracker-processing">
        {/* Header */}
        <div className="ap-tracker-proc-header">
          <div className="ap-tracker-proc-icon">
            <Loader2 size={18} color="#4F46E5" className="ap-spin" />
          </div>
          <div>
            <div className="ap-tracker-proc-title">AI is building your resume…</div>
            <div className="ap-tracker-proc-elapsed">{formatElapsed(elapsed)} elapsed</div>
          </div>
        </div>

        {/* Pipeline steps */}
        <div className="ap-tracker-steps">
          {pipelineSteps.map((s, i) => {
            const isDone = i < activeStep || status.status === "done";
            const isActive = i === activeStep && status.status !== "done";
            return (
              <div key={i} className={`ap-tracker-step${isDone ? " done" : ""}${isActive ? " active" : ""}`}>
                <div className="ap-tracker-step-dot">
                  {isDone ? (
                    <CheckCircle2 size={16} color="#10B981" />
                  ) : isActive ? (
                    <div className="ap-step-pulse" />
                  ) : (
                    <div className="ap-step-empty" />
                  )}
                </div>
                <div className="ap-tracker-step-text">
                  <div className="ap-tracker-step-label">{s.label}</div>
                  <div className="ap-tracker-step-sub">{s.sub}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="ap-tracker-progress-wrap">
          <div
            className="ap-tracker-progress-bar"
            style={{ width: `${Math.min(((activeStep + 1) / pipelineSteps.length) * 100, 95)}%` }}
          />
        </div>

        <div className="ap-tracker-eta">Usually takes 15–30 seconds</div>
      </div>
    </>
  );
}

function ApStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500;600&display=swap');
      .ap-spin { animation: ap-rotate 0.8s linear infinite; }
      @keyframes ap-rotate { to { transform: rotate(360deg); } }

      .ap-tracker-center {
        display: flex; flex-direction: column; align-items: center;
        text-align: center; padding: 2rem 1rem;
        font-family: 'Inter', sans-serif;
      }
      .ap-tracker-icon-wrap {
        width: 72px; height: 72px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        margin-bottom: 1.25rem;
      }
      .ap-tracker-fail-bg { background: #FEF2F2; }
      .ap-tracker-success-bg { background: #ECFDF5; }
      .ap-tracker-spin-wrap { margin-bottom: 1rem; }
      .ap-tracker-heading {
        font-family: 'Syne', sans-serif; font-size: 1.3rem; font-weight: 800;
        color: #1E2D40; margin-bottom: 0.5rem;
      }
      .ap-tracker-sub {
        font-size: 0.9rem; color: #64748B; line-height: 1.6;
        max-width: 360px; margin-bottom: 1.75rem;
      }
      .ap-tracker-actions {
        display: flex; flex-wrap: wrap; gap: 0.75rem;
        justify-content: center; margin-bottom: 1rem;
      }
      .ap-tracker-btn-primary {
        display: inline-flex; align-items: center; gap: 7px;
        padding: 0.7rem 1.5rem; border-radius: 10px;
        background: #4F46E5; color: #fff;
        font-size: 0.9rem; font-weight: 700;
        text-decoration: none; border: none; cursor: pointer;
        font-family: 'Inter', sans-serif;
        transition: background 0.18s, transform 0.1s;
        box-shadow: 0 4px 18px rgba(79,70,229,0.25);
      }
      .ap-tracker-btn-primary:hover { background: #4338CA; transform: translateY(-1px); }
      .ap-tracker-btn-secondary {
        display: inline-flex; align-items: center; gap: 7px;
        padding: 0.7rem 1.4rem; border-radius: 10px;
        background: #fff; color: #1E2D40;
        font-size: 0.9rem; font-weight: 600;
        border: 1.5px solid #E2E8F0; cursor: pointer;
        font-family: 'Inter', sans-serif;
        transition: border-color 0.18s, background 0.18s;
      }
      .ap-tracker-btn-secondary:hover { background: #F8FAFC; border-color: #CBD5E1; }
      .ap-tracker-success-note {
        font-size: 0.78rem; color: #94A3B8; font-weight: 500;
      }

      /* Processing */
      .ap-tracker-processing {
        padding: 0.5rem 0;
        font-family: 'Inter', sans-serif;
      }
      .ap-tracker-proc-header {
        display: flex; align-items: center; gap: 14px;
        background: #EEF2FF; border: 1.5px solid #C7D2FE;
        border-radius: 12px; padding: 14px 16px;
        margin-bottom: 1.75rem;
      }
      .ap-tracker-proc-icon {
        width: 38px; height: 38px; border-radius: 10px;
        background: #fff; border: 1.5px solid #C7D2FE;
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      }
      .ap-tracker-proc-title { font-size: 0.92rem; font-weight: 700; color: #1E2D40; }
      .ap-tracker-proc-elapsed { font-size: 0.78rem; color: #64748B; margin-top: 2px; }

      .ap-tracker-steps { display: flex; flex-direction: column; gap: 1.1rem; margin-bottom: 1.75rem; }
      .ap-tracker-step {
        display: flex; align-items: flex-start; gap: 12px;
        padding: 12px 14px; border-radius: 10px;
        border: 1.5px solid #E8EAF0; background: #FAFAFA;
        transition: border-color 0.3s, background 0.3s;
      }
      .ap-tracker-step.active {
        border-color: #C7D2FE; background: #EEF2FF;
      }
      .ap-tracker-step.done {
        border-color: #A7F3D0; background: #F0FDF9;
      }
      .ap-tracker-step-dot {
        width: 22px; height: 22px; display: flex;
        align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px;
      }
      .ap-step-pulse {
        width: 10px; height: 10px; border-radius: 50%; background: #4F46E5;
        animation: ap-pulse 1.4s ease-in-out infinite;
      }
      @keyframes ap-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(0.7); }
      }
      .ap-step-empty {
        width: 10px; height: 10px; border-radius: 50%;
        border: 2px solid #CBD5E1;
      }
      .ap-tracker-step-label { font-size: 0.875rem; font-weight: 600; color: #1E2D40; }
      .ap-tracker-step-sub { font-size: 0.78rem; color: #94A3B8; margin-top: 2px; }
      .ap-tracker-step.done .ap-tracker-step-label { color: #059669; }
      .ap-tracker-step.active .ap-tracker-step-label { color: #4F46E5; }

      .ap-tracker-progress-wrap {
        height: 5px; border-radius: 999px; background: #E8EAF0;
        overflow: hidden; margin-bottom: 0.75rem;
      }
      .ap-tracker-progress-bar {
        height: 100%; background: linear-gradient(90deg, #4F46E5, #7C3AED);
        border-radius: 999px;
        transition: width 1.2s cubic-bezier(0.4,0,0.2,1);
      }
      .ap-tracker-eta { font-size: 0.78rem; color: #94A3B8; text-align: center; }
    `}</style>
  );
}