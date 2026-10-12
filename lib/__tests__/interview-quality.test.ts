import { describe, it, expect } from "vitest";
import {
  normalizeText,
  calculateTextSimilarity,
  detectDuplicateQuestion,
  validateQuestionQuality,
} from "../interview-quality";
import { ALL_INTERVIEW_QUESTIONS } from "../interview-questions";
import { InterviewQuestion } from "@/types/interview";

describe("Interview Question Quality & Duplicate Detection (Phase 7)", () => {
  it("should normalize text deterministically", () => {
    const raw = "  What is the Virtual DOM in React? (Explain In Detail!)  ";
    const normalized = normalizeText(raw);
    expect(normalized).toBe("what is the virtual dom in react explain in detail");
  });

  it("should calculate bigram Dice coefficient text similarity", () => {
    const s1 = "What is the Virtual DOM in React?";
    const s2 = "What is the Virtual DOM in React?";
    expect(calculateTextSimilarity(s1, s2)).toBe(1.0);

    const s3 = "Explain how the Virtual DOM works in React";
    const similarity = calculateTextSimilarity(s1, s3);
    expect(similarity).toBeGreaterThan(0.4);
    expect(similarity).toBeLessThan(1.0);

    const s4 = "How to configure Docker containers for Node.js?";
    expect(calculateTextSimilarity(s1, s4)).toBeLessThan(0.2);
  });

  it("should detect exact duplicate question prompts", () => {
    const existing = ALL_INTERVIEW_QUESTIONS.slice(0, 5);
    const candidatePrompt = existing[0].question;

    const result = detectDuplicateQuestion(candidatePrompt, existing);
    expect(result.isDuplicate).toBe(true);
    expect(result.similarityScore).toBe(1.0);
    expect(result.matchedQuestionId).toBe(existing[0].id);
  });

  it("should detect near-exact duplicate prompts above threshold", () => {
    const sampleQuestions: InterviewQuestion[] = [
      {
        id: "test-01",
        trackKey: "react",
        category: "Hooks",
        type: "conceptual",
        difficulty: "easy",
        question: "Explain the purpose of the useEffect hook in React.",
        answer: "useEffect handles side effects in React function components.",
        followUps: [],
        keyPoints: [],
        tags: [],
      },
    ];

    const nearDuplicatePrompt = "Explain the purpose of the useEffect hook in React component.";
    const result = detectDuplicateQuestion(nearDuplicatePrompt, sampleQuestions, 0.75);

    expect(result.isDuplicate).toBe(true);
    expect(result.similarityScore).toBeGreaterThanOrEqual(0.75);
    expect(result.matchedQuestionId).toBe("test-01");
  });

  it("should validate complete questions with no errors", () => {
    const validQuestion: Partial<InterviewQuestion> = {
      id: "val-01",
      trackKey: "javascript",
      category: "Fundamentals",
      type: "conceptual",
      difficulty: "beginner",
      question: "What is the difference between let, const, and var?",
      answer: `### Simple answer:
let and const are block-scoped, while var is function-scoped.

### How it works:
- var attaches to the global object and is hoisted with undefined.
- let and const stay inside curly braces and live in the Temporal Dead Zone.

### Interview answer:
Always prefer const by default and let when reassigning.`,
      keyPoints: ["var is function-scoped", "let/const are block-scoped"],
      followUps: ["What is the Temporal Dead Zone?"],
      tags: ["scope", "variables"],
    };

    const res = validateQuestionQuality(validQuestion);
    expect(res.isValid).toBe(true);
    expect(res.errors.length).toBe(0);
    expect(res.readabilityScore).toBeGreaterThanOrEqual(75);
  });

  it("should flag invalid questions missing required fields", () => {
    const incompleteQuestion: Partial<InterviewQuestion> = {
      id: "",
      trackKey: "",
      question: "Short?",
      answer: "Too short",
    };

    const res = validateQuestionQuality(incompleteQuestion);
    expect(res.isValid).toBe(false);
    expect(res.errors).toContain("Question ID is required and cannot be empty.");
    expect(res.errors).toContain("Track key (topic) is required.");
    expect(res.errors).toContain("Question prompt must be at least 10 characters long.");
    expect(res.errors).toContain("Answer must be at least 20 characters long.");
  });

  it("should warn if an answer lacks beginner-friendly structured sections", () => {
    const unstructuredQuestion: Partial<InterviewQuestion> = {
      id: "unstruct-01",
      trackKey: "react",
      difficulty: "intermediate",
      question: "How does the reconciliation algorithm work in React fiber?",
      answer: "Reconciliation is the process through which React updates the DOM by comparing previous and current virtual DOM trees using heuristic O(n) algorithms.",
    };

    const res = validateQuestionQuality(unstructuredQuestion);
    expect(res.warnings.some((w) => w.includes("lacks beginner-friendly section headers"))).toBe(true);
    expect(res.readabilityScore).toBeLessThan(80);
  });
});
