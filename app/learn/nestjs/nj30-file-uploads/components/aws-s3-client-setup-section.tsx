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
// MODULE 5 — AWS S3 CLIENT SETUP (AWS SDK V3)
// ═══════════════════════════════════════════════════════════

export function AwsS3ClientSetupSection() {
  return (
    <SectionContainer number={5} title="AWS S3 SDK v3 Integration">
      {/* ── 5.1 S3 SDK Setup ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Modular S3Client Service Architecture"
          description="Install the modern modular AWS SDK v3 and create an injectable storage service."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>☁️</span> Injectable S3StorageService
          </h4>
          <EnhancedCodeBlock
            code={`# Install AWS SDK v3 modular client:
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner

// src/storage/s3-storage.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class S3StorageService {
  public readonly s3Client: S3Client;
  public readonly bucketName: string;

  constructor(private readonly config: ConfigService) {
    this.bucketName = this.config.get<string>('AWS_S3_BUCKET', 'learncraft-uploads');

    this.s3Client = new S3Client({
      region: this.config.get<string>('AWS_REGION', 'us-east-1'),
      credentials: {
        accessKeyId: this.config.get<string>('AWS_ACCESS_KEY_ID', ''),
        secretAccessKey: this.config.get<string>('AWS_SECRET_ACCESS_KEY', ''),
      },
    });
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why is AWS SDK v3 preferred over the legacy AWS SDK v2 in NestJS applications?"
          answer="AWS SDK v3 is modular and tree-shakeable: importing only '@aws-sdk/client-s3' reduces your server bundle size and cold-start time by over 75% compared to the monolithic v2 package."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
