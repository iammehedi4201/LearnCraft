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
// MODULE 8 — VISUAL DATA MANAGEMENT WITH PRISMA STUDIO
// ═══════════════════════════════════════════════════════════

export function PrismaStudioSection() {
  return (
    <SectionContainer number={8} title="Visual Data Inspection with Prisma Studio">
      {/* ── 8.1 Prisma Studio ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The Built-In Visual Database GUI"
          description="View, filter, sort, and edit database records directly in your browser."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🖥️</span> Launching Prisma Studio
          </h4>
          <EnhancedCodeBlock
            code={`# Run in your terminal:
npx prisma studio

# Output:
# Prisma Studio is up on http://localhost:5555`}
            language="bash"
          />
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mt-3">
            Prisma Studio allows developers to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-ds-text-sub">
            <li>Visually browse all tables and columns without installing third-party SQL clients like pgAdmin or DBeaver.</li>
            <li>Double-click any cell to edit data and save changes directly.</li>
            <li>Click relational foreign key buttons to jump straight to the related parent/child records.</li>
          </ul>
        </WhyBox>

        <QuickCheck
          question="What default port does Prisma Studio run on when launched with 'npx prisma studio'?"
          answer="Port 5555 (http://localhost:5555)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
