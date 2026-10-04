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
// MODULE 4 — MANY-TO-MANY DOMAIN ASSOCIATIONS (POSTS & TAGS)
// ═══════════════════════════════════════════════════════════

export function ManyToManyImplicitSection() {
  return (
    <SectionContainer number={4} title="Many-to-Many Associations (Posts & Tags)">
      {/* ── 4.1 M-to-N with ID Sets ── */}
      <div className="mb-16">
        <TopicHeader
          number={4}
          title="Modeling Many-to-Many Without Circular References"
          description="How to associate entities many-to-many in NestJS using Set<string> identity references."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🏷️</span> Identity Referencing Over Object Nesting
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            In Node.js backends, nesting full objects bidirectionally (e.g. <code>post.tags[0].posts[0].tags[0]...</code>) causes JSON serialization crashes and memory leaks. In domain models, reference each other using unique IDs:
          </p>
          <EnhancedCodeBlock
            code={`export class TagEntity {
  constructor(
    public readonly id: string,
    public name: string,
  ) {
    this.name = name.toLowerCase().trim();
  }
}

export class ArticleEntity {
  private readonly _tagIds = new Set<string>();

  constructor(
    public readonly id: string,
    public title: string,
    public content: string,
  ) {}

  get tagIds(): readonly string[] {
    return Array.from(this._tagIds);
  }

  addTag(tagId: string): void {
    if (this._tagIds.size >= 10) {
      throw new Error("An article cannot have more than 10 tags");
    }
    this._tagIds.add(tagId);
  }

  removeTag(tagId: string): void {
    this._tagIds.delete(tagId);
  }

  hasTag(tagId: string): boolean {
    return this._tagIds.has(tagId);
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why use 'Set<string>' for tag IDs rather than a simple array?"
          answer="Set guarantees tag uniqueness (O(1) duplicate prevention) and O(1) membership checks without needing manual .includes() or .indexOf() loops."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
