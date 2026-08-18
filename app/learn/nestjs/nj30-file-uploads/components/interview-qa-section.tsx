"use client";

import { useState } from "react";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 11 — TOP 5 INTERVIEW QUESTIONS (FILE UPLOADS & S3)
// ═══════════════════════════════════════════════════════════

export function InterviewQaSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const qas = [
    {
      q: "Q1: Explain how NestJS handles multipart/form-data file uploads under the hood.",
      a: "NestJS provides interceptors (FileInterceptor, FilesInterceptor, FileFieldsInterceptor) built on top of Express's Multer middleware. It parses inbound multipart streams into Express.Multer.File objects containing the original name, MIME type, size, and in-memory buffer or disk path.",
    },
    {
      q: "Q2: What is an S3 Pre-Signed URL and when is it preferred over server uploads?",
      a: "A Pre-Signed URL is a cryptographically signed AWS URL with a short expiration time (e.g. 5 minutes) that grants temporary write or read access to a specific S3 key. It is preferred for large files (videos, PDFs) because the client uploads directly to S3, bypassing backend server memory and bandwidth entirely.",
    },
    {
      q: "Q3: How do you prevent filename collisions and security issues in S3 buckets?",
      a: "By never using the user-provided filename as the S3 object key. Instead, generate a unique UUID (crypto.randomUUID()) and append the sanitized file extension (e.g. 'avatars/uuid-v4.webp').",
    },
    {
      q: "Q4: How do you validate uploaded files in NestJS using built-in pipes?",
      a: "Using 'ParseFilePipeBuilder', chaining '.addMaxSizeValidator({ maxSize })' and '.addFileTypeValidator({ fileType })', and setting 'fileIsRequired: true'.",
    },
    {
      q: "Q5: How do you serve private files (e.g. customer invoices) securely from S3?",
      a: "Keep the S3 bucket completely private without public read access. When an authenticated user requests a download, generate a short-lived Pre-Signed GetObject URL (valid for 60 seconds) after validating their permissions.",
    },
  ];

  return (
    <SectionContainer number={11} title="Top 5 Interview Questions on File Uploads &amp; S3">
      {/* ── 11.1 Interview Q&As ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Senior-Level Interview Questions"
          description="Master these frequently asked questions on cloud storage architecture, pre-signed upload security, and streaming buffers."
          color="amber"
        />

        <div className="space-y-3">
          {qas.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm transition-all"
            >
              <div
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="flex items-center justify-between gap-4 cursor-pointer"
              >
                <h4 className="font-bold text-xs sm:text-sm text-ds-text-strong">
                  {item.q}
                </h4>
                <button className="shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold bg-ds-bg-white border border-ds-stroke-soft text-ds-feature-dark">
                  {openIdx === idx ? "Hide" : "Answer"}
                </button>
              </div>

              {openIdx === idx && (
                <div className="mt-3 pt-3 border-t border-ds-stroke-soft text-xs sm:text-sm text-ds-text-sub whitespace-pre-wrap leading-relaxed animate-in fade-in duration-200">
                  <strong className="text-ds-text-strong block mb-1">Interview-Winning Answer:</strong>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Divider />
    </SectionContainer>
  );
}
