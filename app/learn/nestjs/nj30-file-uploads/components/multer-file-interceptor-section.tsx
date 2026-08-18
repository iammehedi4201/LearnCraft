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
// MODULE 2 — MULTER FILEINTERCEPTOR IN NESTJS
// ═══════════════════════════════════════════════════════════

export function MulterFileInterceptorSection() {
  return (
    <SectionContainer number={2} title="Multer &amp; FileInterceptor Handling">
      {/* ── 2.1 Multer FileInterceptor ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Handling Single Multipart Form-Data Uploads"
          description="Extract file buffers, original filenames, and MIME types with FileInterceptor and @UploadedFile()."
          color="sky"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📎</span> Controller Single-File Upload
          </h4>
          <EnhancedCodeBlock
            code={`# Step 1: Install Multer types
npm install -D @types/multer

// src/uploads/uploads.controller.ts
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';

@Controller('uploads')
export class UploadsController {
  @Post('avatar')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { avatar: { type: 'string', format: 'binary' } },
    },
  })
  @UseInterceptors(FileInterceptor('avatar')) // ⭐ Matches multipart form field name
  uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    return {
      originalName: file.originalname,
      mimeType: file.mimetype,
      sizeBytes: file.size,
      bufferLength: file.buffer.length,
    };
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What property of 'Express.Multer.File' contains the raw binary buffer of the uploaded file when using memory storage?"
          answer="'file.buffer' (a Node.js Buffer object containing the binary data)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
