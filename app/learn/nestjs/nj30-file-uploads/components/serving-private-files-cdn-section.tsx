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
// MODULE 9 — SERVING PRIVATE FILES & CLOUDFRONT CDN
// ═══════════════════════════════════════════════════════════

export function ServingPrivateFilesCdnSection() {
  return (
    <SectionContainer number={9} title="Serving Private Files &amp; CloudFront CDN">
      {/* ── 9.1 Private Files ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Protecting Confidential Documents"
          description="Generate expiring download URLs for private files (invoices, contracts, medical records)."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔒</span> Pre-Signed Download URL (GetObjectCommand)
          </h4>
          <EnhancedCodeBlock
            code={`import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3StorageService {
  async getPrivateDownloadUrl(fileKey: string, expiresInSeconds = 60): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey,
      ResponseContentDisposition: 'attachment; filename="invoice.pdf"', // Force browser download
    });

    // ⭐ Expiring download link valid for only 60 seconds:
    return getSignedUrl(this.s3Client, command, { expiresIn: expiresInSeconds });
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="How do you ensure private user files stored in an S3 bucket cannot be accessed by arbitrary internet users?"
          answer="Keep the S3 bucket 100% private with 'Block Public Access' enabled, and only serve private files via short-lived Pre-Signed GetObject URLs generated on authenticated endpoints."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
