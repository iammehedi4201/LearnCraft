"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 6 — BUFFER UPLOADS TO S3 (PUTOBJECTCOMMAND)
// ═══════════════════════════════════════════════════════════

export function StreamingUploadToS3Section() {
  return (
    <SectionContainer number={6} title="Direct Buffer Uploads with PutObjectCommand">
      {/* ── 6.1 PutObjectCommand ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Uploading In-Memory Buffers to Cloud S3"
          description="Generate unique UUID storage keys and push files to S3 buckets using PutObjectCommand."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🚀</span> S3 Upload Method Implementation
          </h4>
          <EnhancedCodeBlock
            code={`import { PutObjectCommand } from '@aws-sdk/client-s3';
import * as path from 'path';
import * as crypto from 'crypto';

@Injectable()
export class S3StorageService {
  // (constructor from previous step)

  async uploadFile(file: Express.Multer.File, folder = 'general'): Promise<{ key: string; url: string }> {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueId = crypto.randomUUID();
    // ⭐ Key format: avatars/a1b2c3d4-e5f6.png
    const key = \`\${folder}/\${uniqueId}\${ext}\`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.s3Client.send(command);

    const publicUrl = \`https://\${this.bucketName}.s3.amazonaws.com/\${key}\`;
    return { key, url: publicUrl };
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <EasyRuleCard rule="NEVER use the user's original filename as the S3 Key. Always generate a crypto.randomUUID() to prevent filename collisions and path traversal attacks." />

        <QuickCheck
          question="Why is it dangerous to store files in S3 using the user's raw 'file.originalname'?"
          answer="Because two users uploading 'photo.jpg' would overwrite each other's files, and malicious filenames (e.g. '../../etc/passwd') could cause security vulnerabilities."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
