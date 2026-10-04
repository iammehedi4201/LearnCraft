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
// MODULE 3 — 1-TO-MANY DOMAIN COLLECTIONS (USER & POSTS)
// ═══════════════════════════════════════════════════════════

export function OneToManySection() {
  return (
    <SectionContainer number={3} title="1-to-Many Collections (Authors & Posts)">
      {/* ── 3.1 One-to-Many ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="Encapsulating Domain Collections in NestJS"
          description="How parent entities manage child collections and enforce business rules on child additions."
          color="emerald"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📝</span> The Author &amp; Posts Aggregate
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            In clean architecture, child entities should be manipulated through the parent aggregate root rather than directly mutated in controllers:
          </p>
          <EnhancedCodeBlock
            code={`export class PostEntity {
  constructor(
    public readonly id: string,
    public title: string,
    public content: string,
    public readonly authorId: string,
    public isPublished: boolean = false,
  ) {}

  publish(): void {
    if (this.content.length < 50) {
      throw new Error("Post must have at least 50 characters to publish");
    }
    this.isPublished = true;
  }
}

export class AuthorEntity {
  private _posts: PostEntity[] = [];

  constructor(
    public readonly id: string,
    public readonly name: string,
    public isVerified: boolean = false,
  ) {}

  get posts(): readonly PostEntity[] {
    return Object.freeze([...this._posts]);
  }

  createPost(id: string, title: string, content: string): PostEntity {
    if (!this.isVerified && this._posts.length >= 3) {
      throw new Error("Unverified authors cannot create more than 3 posts");
    }
    const newPost = new PostEntity(id, title, content, this.id);
    this._posts.push(newPost);
    return newPost;
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why return 'readonly PostEntity[]' with Object.freeze in 'get posts()'?"
          answer="It prevents external callers from directly pushing or splicing elements into the internal array, bypassing business rules like post limits."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
