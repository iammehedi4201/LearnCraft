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
// MODULE 3 — MULTIPLE FILES & MULTI-FIELD UPLOADS
// ═══════════════════════════════════════════════════════════

export function MultipleFilesUploadSection() {
  return (
    <SectionContainer number={3} title="Multiple Files &amp; Multi-Field Uploads">
      {/* ── 3.1 Multiple Files ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="FilesInterceptor &amp; FileFieldsInterceptor"
          description="Handle photo galleries and multi-field forms (e.g. avatar + resume + tax docs)."
          color="emerald"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📚</span> Multi-Field Upload Example
          </h4>
          <EnhancedCodeBlock
            code={`import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('uploads')
export class MultiUploadController {
  // 1. Array of photos under a single field name 'gallery' (max 5 photos):
  @Post('gallery')
  @UseInterceptors(FilesInterceptor('gallery', 5))
  uploadGallery(@UploadedFiles() files: Array<Express.Multer.File>) {
    return { uploadedCount: files.length };
  }

  // 2. Multiple distinct form fields (avatar + resumes):
  @Post('application')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'resume', maxCount: 1 },
      { name: 'certificates', maxCount: 3 },
    ]),
  )
  uploadApplication(
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File[];
      resume?: Express.Multer.File[];
      certificates?: Express.Multer.File[];
    },
  ) {
    return {
      hasAvatar: Boolean(files.avatar?.[0]),
      hasResume: Boolean(files.resume?.[0]),
      certCount: files.certificates?.length || 0,
    };
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="When should you use FileFieldsInterceptor over FilesInterceptor?"
          answer="Use FilesInterceptor for an array of files under a single form field (like a photo gallery); use FileFieldsInterceptor when different form fields contain different file types (e.g. avatar, resume, ID card)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
