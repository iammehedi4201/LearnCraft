"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  AnalogyBox,
  WhyBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 1 — THE BIG PICTURE (RELATIONAL DATA MODELING)
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: Relational Modeling in Prisma">
      {/* ── 1.1 Why Relations Matter ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Connecting Data Tables with Relations"
          description="How relational databases link Users to Profiles, Posts, Orders, and Tags."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔗</span> Real-World Data is Interconnected
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Real apps are never built with a single table. You have:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-ds-text-sub">
            <li><strong>1-to-1:</strong> Each User has exactly ONE Profile settings record.</li>
            <li><strong>1-to-Many:</strong> An Author writes MANY blog Posts; each Post belongs to ONE Author.</li>
            <li><strong>Many-to-Many:</strong> A Post has MANY Tags; each Tag belongs to MANY Posts.</li>
          </ul>
        </WhyBox>

        <AnalogyBox title="The Social Network &amp; Passport Office">
          <p className="mb-2">
            Think of database relations like real-world relationships:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-ds-text-sub">
            <li>
              <strong>1-to-1 (Citizen &amp; Passport):</strong> You hold exactly one passport. The passport booklet contains your citizen ID number (Foreign Key).
            </li>
            <li>
              <strong>1-to-Many (Author &amp; Books):</strong> J.K. Rowling wrote 7 Harry Potter books. Every book lists &quot;Author ID: 42&quot; on the copyright page.
            </li>
            <li>
              <strong>Many-to-Many (Students &amp; Courses):</strong> A student enrolls in 4 classes; each class has 30 students. An enrollment desk (Join Table) connects student IDs with course IDs.
            </li>
          </ul>
        </AnalogyBox>

        <EasyRuleCard rule="The table that holds the Foreign Key column (e.g. userId Int) is where you place the @relation(fields: [userId], references: [id]) attribute." />

        <QuickCheck
          question="In a 1-to-Many relationship between Author and Post, which table contains the foreign key column (authorId)?"
          answer="The Post table (each post record stores the authorId of the creator)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
