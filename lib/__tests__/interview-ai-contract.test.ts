import { describe, it, expect } from "vitest";
import {
  MockAIQuestionGenerator,
  AdminQuestionReviewService,
  QuestionGenerationRequest,
} from "../interview-ai-contract";

describe("AI Question Generation Contract & Admin Review (Phases 5 & 6)", () => {
  const generator = new MockAIQuestionGenerator();
  const reviewService = new AdminQuestionReviewService();

  it("should generate structured draft candidates matching the request parameters", async () => {
    const request: QuestionGenerationRequest = {
      topic: "React",
      subtopic: "Custom Hooks",
      difficulty: "intermediate",
      category: "practical",
      count: 2,
    };

    const candidates = await generator.generateCandidates(request);
    expect(candidates.length).toBe(2);

    for (const draft of candidates) {
      expect(draft.id).toContain("ai-react-draft");
      expect(draft.status).toBe("draft"); // Draft status initially!
      expect(draft.source).toBe("ai");
      expect(draft.providerName).toBe("mock-gemini-provider");
      expect(draft.trackKey).toBe("react");
      expect(draft.difficulty).toBe("intermediate");
      expect(draft.answer).toContain("### Simple answer:");
      expect(draft.answer).toContain("### How it works:");
      expect(draft.answer).toContain("### Interview answer:");
      expect(draft.keyPoints.length).toBeGreaterThanOrEqual(2);
      expect(draft.followUps.length).toBeGreaterThanOrEqual(2);
      expect(draft.tags).toContain("ai-draft");
    }
  });

  it("should validate candidate before review and report quality / duplicate scores", async () => {
    const candidates = await generator.generateCandidates({
      topic: "TypeScript",
      difficulty: "beginner",
      count: 1,
    });
    const candidate = candidates[0];

    const result = reviewService.validateCandidate(candidate);
    expect(result.quality.isValid).toBe(true);
    expect(result.duplicate.isDuplicate).toBe(false);
    expect(result.canApprove).toBe(true);
  });

  it("should approve candidate and transition status to approved", async () => {
    const candidates = await generator.generateCandidates({
      topic: "Node.js",
      difficulty: "intermediate",
      count: 1,
    });
    const candidate = candidates[0];

    const approved = reviewService.approveCandidate(candidate);
    expect(approved.status).toBe("approved");
    expect(approved.source).toBe("ai");
    expect(approved.id).toBe(candidate.id);
  });

  it("should allow admin edits during the approval process", async () => {
    const candidates = await generator.generateCandidates({
      topic: "PostgreSQL",
      difficulty: "hard",
      count: 1,
    });
    const candidate = candidates[0];

    const approvedWithEdits = reviewService.approveCandidate(candidate, {
      question: "Polished Admin Question: Explain PostgreSQL WAL internals in detail?",
      subtopic: "Write-Ahead Logging",
    });

    expect(approvedWithEdits.status).toBe("approved");
    expect(approvedWithEdits.question).toBe(
      "Polished Admin Question: Explain PostgreSQL WAL internals in detail?"
    );
    expect(approvedWithEdits.subtopic).toBe("Write-Ahead Logging");
  });

  it("should reject candidate with an explainable reason", async () => {
    const candidates = await generator.generateCandidates({
      topic: "Prisma",
      difficulty: "beginner",
      count: 1,
    });
    const candidate = candidates[0];

    const rejected = reviewService.rejectCandidate(
      candidate,
      "Question is too generic and duplicates basic ORM overview."
    );

    expect(rejected.status).toBe("rejected");
    expect(rejected.rejectionReason).toBe(
      "Question is too generic and duplicates basic ORM overview."
    );
  });
});
