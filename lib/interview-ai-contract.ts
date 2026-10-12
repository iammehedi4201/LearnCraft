/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FUTURE AI QUESTION GENERATION CONTRACT & ADMIN APPROVAL WORKFLOW
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Defines the provider-independent contract for future Gemini integration,
 * candidate normalization, quality gates, and admin approval lifecycle.
 *
 * NOTE: Live Gemini API calls are NOT implemented in this phase.
 * A mock provider is supplied for deterministic, offline testing.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import {
  InterviewQuestion,
  Difficulty,
  StandardCategory,
  QuestionStatus,
} from "@/types/interview";
import {
  detectDuplicateQuestion,
  validateQuestionQuality,
} from "@/lib/interview-quality";
import { ALL_INTERVIEW_QUESTIONS } from "@/lib/interview-questions";

export interface QuestionGenerationRequest {
  topic: string; // e.g. "React", "Node.js"
  subtopic?: string; // e.g. "Custom Hooks", "Event Loop"
  difficulty: Difficulty; // "beginner" | "intermediate" | "advanced" | "easy" | "medium" | "hard"
  category?: StandardCategory; // "conceptual" | "practical" | "coding" | etc.
  count: number; // typically 1 to 5
  targetRole?: "junior" | "mid" | "senior";
  guidanceNote?: string;
}

export interface CandidateDraftQuestion extends InterviewQuestion {
  status: QuestionStatus; // "draft" | "approved" | "rejected"
  generatedAt: string; // ISO timestamp
  providerName: string; // "gemini-1.5-pro", "mock-provider", etc.
  rejectionReason?: string;
  adminNotes?: string;
  duplicateScore?: number;
}

export interface AIQuestionGenerator {
  providerName: string;
  generateCandidates(
    request: QuestionGenerationRequest
  ): Promise<CandidateDraftQuestion[]>;
}

/**
 * Mock AI Generator for automated tests and development.
 * Simulates future Gemini generation without requiring network or API keys.
 */
export class MockAIQuestionGenerator implements AIQuestionGenerator {
  providerName = "mock-gemini-provider";

  async generateCandidates(
    request: QuestionGenerationRequest
  ): Promise<CandidateDraftQuestion[]> {
    const count = Math.max(1, Math.min(request.count || 1, 10));
    const candidates: CandidateDraftQuestion[] = [];

    for (let i = 1; i <= count; i++) {
      const id = `ai-${request.topic.toLowerCase().replace(/[^a-z0-9]/g, "")}-draft-${Date.now()}-${i}`;
      const prompt = `What is ${request.subtopic || request.topic} in software development, and how is it used? (Draft #${i})`;

      // Run duplicate check against curated questions
      const dupCheck = detectDuplicateQuestion(prompt, ALL_INTERVIEW_QUESTIONS);

      const candidate: CandidateDraftQuestion = {
        id,
        trackKey: request.topic.toLowerCase().replace(/\.js$/, ""),
        topic: request.topic,
        subtopic: request.subtopic || "Core Fundamentals",
        category: request.category || "conceptual",
        type: request.category === "coding" ? "coding" : "conceptual",
        difficulty: request.difficulty,
        source: "ai",
        status: "draft", // Stored as draft initially!
        generatedAt: new Date().toISOString(),
        providerName: this.providerName,
        question: prompt,
        answer: `### Simple answer:
${request.subtopic || request.topic} is an essential concept in modern engineering.

### How it works:
It provides a structured way to handle logic and manage state efficiently.

### Example:
\`\`\`typescript
const example = "${request.topic}";
console.log(example);
\`\`\`

### Interview answer:
In an interview, explain what the concept means, why developers use it, and how it improves application architecture.`,
        followUps: [
          `What are common trade-offs with ${request.subtopic || request.topic}?`,
          `How does this differ in production environments?`,
        ],
        keyPoints: [
          "Core definition and motivation",
          "Practical real-world application",
          "Trade-offs and architectural considerations",
        ],
        tags: [
          request.topic.toLowerCase(),
          request.subtopic?.toLowerCase() || "fundamentals",
          "ai-draft",
        ],
        duplicateScore: dupCheck.similarityScore,
      };

      candidates.push(candidate);
    }

    return candidates;
  }
}

/**
 * Admin Approval Service
 * Handles reviewing, editing, approving, and rejecting generated draft candidates.
 */
export class AdminQuestionReviewService {
  /**
   * Validate a draft candidate before review
   */
  validateCandidate(candidate: CandidateDraftQuestion) {
    const quality = validateQuestionQuality(candidate);
    const duplicate = detectDuplicateQuestion(candidate.question, ALL_INTERVIEW_QUESTIONS);

    return {
      quality,
      duplicate,
      canApprove: quality.isValid && !duplicate.isDuplicate,
    };
  }

  /**
   * Approve a candidate question and convert to an official published question
   */
  approveCandidate(
    candidate: CandidateDraftQuestion,
    adminEdits?: Partial<InterviewQuestion>
  ): InterviewQuestion {
    const merged: InterviewQuestion = {
      ...candidate,
      ...adminEdits,
      status: "approved",
      source: "ai",
    };

    const validation = validateQuestionQuality(merged);
    if (!validation.isValid) {
      throw new Error(`Cannot approve question: ${validation.errors.join(", ")}`);
    }

    return merged;
  }

  /**
   * Reject a candidate question with an explainable reason
   */
  rejectCandidate(
    candidate: CandidateDraftQuestion,
    reason: string
  ): CandidateDraftQuestion {
    return {
      ...candidate,
      status: "rejected",
      rejectionReason: reason,
    };
  }
}
