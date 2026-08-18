"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  PredictOutputBox,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 4 — FILE VALIDATION PIPES (SIZE & MIME TYPE)
// ═══════════════════════════════════════════════════════════

export function FileValidationPipesSection() {
  return (
    <SectionContainer number={4} title="File Validation Pipes (Size &amp; MIME Types)">
      {/* ── 4.1 Validation Pipes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="ParseFilePipeBuilder &amp; Built-In Validators"
          description="Enforce strict max size limits and allowed MIME type regular expressions."
          color="rose"
        />

        <EnhancedCodeBlock
          code={`import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('uploads')
export class UploadValidationController {
  @Post('profile-photo')
  @UseInterceptors(FileInterceptor('photo'))
  uploadPhoto(
    @UploadedFile(
      new ParseFilePipeBuilder()
        // ⭐ 1. Enforce 2MB Maximum File Size:
        .addMaxSizeValidator({
          maxSize: 2 * 1024 * 1024, // 2 Megabytes
          message: 'File size exceeds maximum allowed limit of 2MB',
        })
        // ⭐ 2. Restrict to image MIME types (JPEG, PNG, WEBP):
        .addFileTypeValidator({
          fileType: 'image/(jpeg|png|webp)',
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY, // 422 Unprocessable
          fileIsRequired: true,
        }),
    )
    file: Express.Multer.File,
  ) {
    return { fileName: file.originalname, size: file.size };
  }
}`}
          language="typescript"
        />

        <PredictOutputBox
          code={`// User attempts to upload 'malicious-script.sh' (Content-Type: text/x-sh) to /uploads/profile-photo`}
          answer={`Predicted Validation Failure:\n{\n  "statusCode": 422,\n  "message": "Validation failed (expected type is image/(jpeg|png|webp))",\n  "error": "Unprocessable Entity"\n}\n\nThe file is rejected immediately without saving to memory or cloud storage!`}
        />

        <QuickCheck
          question="What happens if a user submits a request without attaching a file when 'fileIsRequired: true' is set in ParseFilePipeBuilder?"
          answer="NestJS immediately throws a 422 Unprocessable Entity (or 400 Bad Request) stating that the file is required."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
