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
// MODULE 8 — IMAGE PROCESSING & THUMBNAILS WITH SHARP
// ═══════════════════════════════════════════════════════════

export function ImageResizingSharpSection() {
  return (
    <SectionContainer number={8} title="Image Processing &amp; Compression with Sharp">
      {/* ── 8.1 Sharp Image Resizing ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Fast C++ Native Image Optimization"
          description="Compress avatars to lightweight WebP format and generate 200x200 thumbnails."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🖼️</span> Avatar Thumbnail Generation
          </h4>
          <EnhancedCodeBlock
            code={`# Install Sharp image processing engine:
npm install sharp
npm install -D @types/sharp

import * as sharp from 'sharp';

@Injectable()
export class ImageOptimizationService {
  async processAvatar(buffer: Buffer): Promise<{ thumbnailBuffer: Buffer; webpBuffer: Buffer }> {
    // 1. Convert to standardized WebP format:
    const webpBuffer = await sharp(buffer)
      .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    // 2. Generate small 150x150 square avatar thumbnail:
    const thumbnailBuffer = await sharp(buffer)
      .resize(150, 150, { fit: 'cover', position: 'center' })
      .webp({ quality: 75 })
      .toBuffer();

    return { thumbnailBuffer, webpBuffer };
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why should user-uploaded JPEG/PNG images be converted to WebP before S3 storage?"
          answer="WebP provides 30% to 50% smaller file sizes with zero noticeable loss in quality, dramatically decreasing S3 storage costs and accelerating frontend page load times."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
