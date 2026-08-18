"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 10 — TOP 5 BEGINNER FILE UPLOAD MISTAKES
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={10} title="Top 5 Beginner File Upload Mistakes">
      {/* ── Top Mistakes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Common Storage &amp; Upload Security Pitfalls"
          description="Avoid these common mistakes that leak memory or expose your servers to malicious file execution."
          color="primary"
        />

        <MistakeBox
          title="Saving Files to Local Disk in Containers"
          description="Writing to './uploads' in Docker loses all files upon restart or deployment."
          wrong={`// ❌ Local disk destination wipes on container restart:
diskStorage({ destination: './uploads' })`}
          right={`// ✅ Memory buffer uploaded directly to Cloud S3:
memoryStorage() -> s3Service.uploadFile(file)`}
        />

        <MistakeBox
          title="Trusting Filenames Without UUIDs"
          description="Using user-provided filenames causes file collisions and path traversal attacks."
          wrong={`// ❌ Overwrites another user's file if names match:
const key = file.originalname;`}
          right={`// ✅ Unique, safe UUID key:
const key = \`\${folder}/\${crypto.randomUUID()}\${path.extname(file.originalname)}\`;`}
        />

        <MistakeBox
          title="Skipping Max File Size Validation"
          description="Unbounded file uploads allow malicious users to crash Node.js memory with 10GB payloads."
          wrong={`// ❌ No file size limit; server vulnerable to Out-Of-Memory DoS:
uploadFile(@UploadedFile() file: Express.Multer.File)`}
          right={`// ✅ Enforces strict 5MB size limit:
@UploadedFile(new ParseFilePipeBuilder().addMaxSizeValidator({ maxSize: 5 * 1024 * 1024 }).build())`}
        />

        <QuickCheck
          question="Why is validating file size at the NestJS route level essential even if you have frontend validation?"
          answer="Because an attacker can easily bypass frontend JavaScript validation and send 50GB payloads directly using Postman or cURL unless your backend enforces server-side limits."
        />
      </div>
    </SectionContainer>
  );
}
