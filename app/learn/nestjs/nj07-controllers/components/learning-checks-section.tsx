"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
  PredictOutputBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 12 — LEARNING CHECKS & QUIZZES
// ═══════════════════════════════════════════════════════════

export function LearningChecksSection() {
  return (
    <SectionContainer number={12} title="Learning Checks & Quizzes">
      {/* ── Route Matching Puzzles ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Predict the Matched Route Puzzles"
          description="Look at the controller definition and determine which URL it matches."
          color="primary"
        />

        <PredictOutputBox
          code={`@Controller('api/v1/posts')
export class PostsController {
  @Get(':postId/comments')
  getComments(@Param('postId') postId: string) {}
}`}
          answer={`Matched Endpoint: GET /api/v1/posts/:postId/comments\n\nExample Match: GET /api/v1/posts/42/comments\nExtracted Parameter: postId = "42"`}
        />

        <PredictOutputBox
          code={`@Controller('shop')
export class ShopController {
  @Get('items')
  getItems(@Query('sort') sort: string, @Query('limit') limit: number) {}
}`}
          answer={`Matched Endpoint: GET /shop/items?sort=price&limit=20\n\nExtracted Query Parameters: sort = "price", limit = 20`}
        />
      </div>

      <Divider />

      {/* ── Scenario-Based Quizzes ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Controller Scenario Checks"
          description="Test your understanding of controller design."
          color="sky"
        />

        <div className="space-y-4">
          <QuickCheck
            question="Scenario 1: You are building a blog API. You need an endpoint to like a post: POST /posts/99/like. How should you write the controller method?"
            answer="@Post(':id/like')\nlikePost(@Param('id') id: string) {\n  return this.postsService.addLike(id);\n}"
          />

          <QuickCheck
            question="Scenario 2: When creating a new user via POST /users, what HTTP status code should your API return according to standard REST conventions, and how do you achieve that in NestJS?"
            answer="201 Created. In NestJS, @Post() methods return 201 Created automatically by default, so you don't even need to add @HttpCode()!"
          />
        </div>
      </div>
    </SectionContainer>
  );
}
