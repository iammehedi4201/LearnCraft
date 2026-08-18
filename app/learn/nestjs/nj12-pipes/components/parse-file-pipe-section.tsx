"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 8 — PARSEFILEPIPE & FILE UPLOAD VALIDATION
// ═══════════════════════════════════════════════════════════

export function ParseFilePipeSection() {
  return (
    <SectionContainer number={8} title="ParseFilePipe & File Upload Validation">
      {/* ── 8.1 ParseFilePipe ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Validating Uploaded Files with ParseFilePipe"
          description="Enforce file size limits and MIME types declaratively."
          color="rose"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📁</span> Declarative File Validation
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            NestJS provides <code>ParseFilePipe</code> with built-in validators like <code>MaxFileSizeValidator</code> and <code>FileTypeValidator</code> to protect your server from oversized or malicious uploads:
          </p>
          <EnhancedCodeBlock
            code={`import { Controller, Post, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('avatars')
export class AvatarsController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadAvatar(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // Max size: 2MB (2 * 1024 * 1024 bytes)
          new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }),
          // Allowed MIME types (e.g. JPEG or PNG images)
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return { fileName: file.originalname, size: file.size };
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What validator inside ParseFilePipe ensures an uploaded file does not exceed a maximum byte threshold?"
          answer="MaxFileSizeValidator({ maxSize: byteLimit })."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
