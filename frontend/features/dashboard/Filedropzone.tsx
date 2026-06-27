"use client";

import { useRef, useState, DragEvent, ChangeEvent } from "react";
import { Upload, FileText, X } from "lucide-react";

interface Props {
  onFile: (file: File) => void;
  file: File | null;
  disabled?: boolean;
}

export default function FileDropzone({ onFile, file, disabled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type === "application/pdf") onFile(dropped);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    if (picked) onFile(picked);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (file) {
    return (
      <>
        <style>{`
          .ap-file-selected {
            display: flex; align-items: center; gap: 14px;
            background: #EEF2FF; border: 1.5px solid #C7D2FE;
            border-radius: 14px; padding: 14px 16px;
          }
          .ap-file-icon {
            width: 42px; height: 42px; border-radius: 10px;
            background: #fff; border: 1px solid #C7D2FE;
            display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          }
          .ap-file-name {
            font-size: 0.9rem; font-weight: 600;
            color: #1E2D40; margin-bottom: 2px;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          }
          .ap-file-size { font-size: 0.78rem; color: #64748B; }
          .ap-file-remove {
            margin-left: auto; flex-shrink: 0;
            display: flex; align-items: center; justify-content: center;
            width: 28px; height: 28px; border-radius: 6px;
            background: none; border: none; cursor: pointer;
            color: #94A3B8; transition: color 0.18s, background 0.18s;
          }
          .ap-file-remove:hover { color: #EF4444; background: #FEF2F2; }
        `}</style>

        <div className="ap-file-selected">
          <div className="ap-file-icon">
            <FileText size={20} color="#4F46E5" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="ap-file-name">{file.name}</div>
            <div className="ap-file-size">{formatSize(file.size)}</div>
          </div>
          {!disabled && (
            <button
              className="ap-file-remove"
              onClick={() => {
                if (inputRef.current) inputRef.current.value = "";
                onFile(null as unknown as File);
              }}
              aria-label="Remove file"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        .ap-dropzone {
          border: 2px dashed #C7D2FE;
          border-radius: 16px;
          padding: 2.5rem 2rem;
          text-align: center;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          background: #FAFAFA;
          font-family: 'Inter', sans-serif;
        }
        .ap-dropzone:hover {
          border-color: #818CF8;
          background: #EEF2FF;
        }
        .ap-dropzone.dragging {
          border-color: #4F46E5;
          background: #EEF2FF;
        }
        .ap-dropzone.ap-disabled {
          opacity: 0.5; cursor: not-allowed;
        }
        .ap-dropzone-icon {
          width: 52px; height: 52px; border-radius: 14px;
          background: #EEF2FF; border: 1.5px solid #C7D2FE;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1.1rem;
        }
        .ap-dropzone-title {
          font-size: 0.95rem; font-weight: 600; color: #1E2D40; margin-bottom: 4px;
        }
        .ap-dropzone-sub { font-size: 0.82rem; color: #94A3B8; margin-bottom: 1.1rem; }
        .ap-dropzone-pill {
          display: inline-flex; align-items: center; gap: 6px;
          background: #fff; border: 1.5px solid #E2E8F0;
          border-radius: 999px; padding: 0.35rem 1rem;
          font-size: 0.78rem; font-weight: 600; color: #4F46E5;
        }
      `}</style>

      <div
        className={`ap-dropzone${dragging ? " dragging" : ""}${disabled ? " ap-disabled" : ""}`}
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={!disabled ? handleDrop : undefined}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload PDF resume"
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); !disabled && inputRef.current?.click(); } }}
      >
        <div className="ap-dropzone-icon">
          <Upload size={22} color="#4F46E5" />
        </div>
        <div className="ap-dropzone-title">
          {dragging ? "Release to upload" : "Drop your resume PDF here"}
        </div>
        <div className="ap-dropzone-sub">or click to browse your files</div>
        <div className="ap-dropzone-pill">
          <FileText size={12} />
          PDF only · max 10 MB
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          style={{ display: "none" }}
          onChange={handleChange}
          disabled={disabled}
        />
      </div>
    </>
  );
}