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
// MODULE 7 — PRE-SIGNED DIRECT S3 UPLOADS
// ═══════════════════════════════════════════════════════════

export function PresignedUrlsDirectUploadSection() {
  return (
    <SectionContainer number={7} title="Pre-Signed URLs for Direct Frontend-to-S3 Uploads">
      {/* ── 7.1 Pre-Signed URLs ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Zero-Bandwidth Direct Upload Architecture"
          description="Offload multi-gigabyte video and document uploads directly to AWS S3."
          color="amber"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚡</span> Generating Pre-Signed Upload URLs
          </h4>
          <EnhancedCodeBlock
            code={`import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class S3StorageService {
  async getPresignedUploadUrl(
    fileName: string,
    contentType: string,
    userId: string,
  ): Promise<{ uploadUrl: string; fileKey: string }> {
    const fileKey = \`videos/\${userId}/\${crypto.randomUUID()}-\${fileName}\`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey,
      ContentType: contentType,
    });

    // ⭐ URL expires automatically after 5 minutes (300 seconds):
    const uploadUrl = await getSignedUrl(this.s3Client, command, { expiresIn: 300 });

    return { uploadUrl, fileKey };
  }
}

// Controller endpoint:
@Post('presigned-url')
getPresignedUrl(@Body() body: { fileName: string; contentType: string }, @CurrentUser() user: any) {
  return this.s3Service.getPresignedUploadUrl(body.fileName, body.contentType, user.id);
}`}
            language="typescript"
          />
        </WhyBox>

        <EasyRuleCard rule="The frontend calls POST /uploads/presigned-url, receives a secure S3 URL, and executes 'fetch(uploadUrl, { method: 'PUT', body: file })' directly to S3 with zero server RAM usage!" />

        <QuickCheck
          question="What is the primary advantage of Pre-Signed S3 uploads over standard Multer file uploads?"
          answer="It bypasses your NestJS server entirely during the file upload transfer, saving CPU, memory, and bandwidth while allowing direct multi-gigabyte file transfers to S3."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
