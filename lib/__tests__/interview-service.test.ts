import { describe, it, expect } from "vitest";
import {
  CuratedQuestionProvider,
  ApprovedDbQuestionProvider,
  InterviewQuestionService,
  defaultQuestionService,
} from "../interview-service";
import { InterviewQuestion } from "@/types/interview";

describe("Interview Question Service Layer (Phase 4 Provider Pattern)", () => {
  const curatedProvider = new CuratedQuestionProvider();

  it("should retrieve all curated questions via CuratedQuestionProvider", () => {
    const all = curatedProvider.getQuestions();
    expect(all.length).toBe(193);
  });

  it("should filter by trackKey accurately", () => {
    const reactQs = curatedProvider.getQuestions({ trackKey: "react" });
    expect(reactQs.length).toBe(20);
    expect(reactQs.every((q) => q.trackKey === "react")).toBe(true);
  });

  it("should filter by difficulty aliases (easy <=> beginner, hard <=> advanced)", () => {
    const beginnerQs = curatedProvider.getQuestions({
      trackKey: "javascript",
      difficulty: "beginner",
    });
    expect(beginnerQs.length).toBeGreaterThan(0);
    expect(beginnerQs.every((q) => q.difficulty === "beginner" || q.difficulty === "easy")).toBe(true);

    const advancedQs = curatedProvider.getQuestions({
      trackKey: "system-design",
      difficulty: "hard",
    });
    expect(advancedQs.length).toBeGreaterThan(0);
    expect(advancedQs.every((q) => q.difficulty === "hard" || q.difficulty === "advanced")).toBe(true);
  });

  it("should filter by search query across question text, answer, and tags", () => {
    const results = curatedProvider.getQuestions({
      searchQuery: "closure",
    });
    expect(results.length).toBeGreaterThan(0);
    expect(
      results.some((q) => q.question.toLowerCase().includes("closure") || q.tags.includes("closures"))
    ).toBe(true);
  });

  it("should support pagination limits and offsets", () => {
    const page1 = curatedProvider.getQuestions({ limit: 5, offset: 0 });
    const page2 = curatedProvider.getQuestions({ limit: 5, offset: 5 });

    expect(page1.length).toBe(5);
    expect(page2.length).toBe(5);
    expect(page1[0].id).not.toBe(page2[0].id);
  });

  it("should support ApprovedDbQuestionProvider with approval status filtering", () => {
    const sampleDbQuestion: InterviewQuestion = {
      id: "ai-gen-01",
      trackKey: "react",
      category: "Hooks",
      type: "conceptual",
      difficulty: "intermediate",
      question: "What is useId hook used for in React 18?",
      answer: "useId generates unique IDs for accessibility attributes.",
      followUps: ["Can useId be used for keys in lists?"],
      keyPoints: ["Generates SSR-safe unique IDs", "Do not use for list keys"],
      tags: ["useId", "react18", "accessibility"],
      status: "approved",
      source: "ai",
    };

    const draftQuestion: InterviewQuestion = {
      ...sampleDbQuestion,
      id: "ai-draft-02",
      status: "draft",
    };

    const dbProvider = new ApprovedDbQuestionProvider([sampleDbQuestion, draftQuestion]);
    const approvedOnly = dbProvider.getQuestions();

    expect(approvedOnly.length).toBe(1);
    expect(approvedOnly[0].id).toBe("ai-gen-01");
  });

  it("should combine curated and DB providers in InterviewQuestionService with deduplication", async () => {
    const overrideReactQ01: InterviewQuestion = {
      id: "react-q01",
      trackKey: "react",
      category: "Core React",
      type: "conceptual",
      difficulty: "medium",
      question: "Custom Override Question",
      answer: "Custom Answer",
      followUps: [],
      keyPoints: ["Point 1", "Point 2"],
      tags: ["custom"],
      status: "approved",
      source: "community",
    };

    const dbProvider = new ApprovedDbQuestionProvider([overrideReactQ01]);
    const service = new InterviewQuestionService([curatedProvider, dbProvider]);

    const all = await service.getAllQuestions();
    // Total should still equal curated count because react-q01 was deduplicated
    expect(all.length).toBe(193);

    const reactQ01 = await service.getQuestionById("react-q01");
    expect(reactQ01).toBeDefined();
    expect(reactQ01?.id).toBe("react-q01");
  });

  it("should provide track metadata through defaultQuestionService", () => {
    const tracks = defaultQuestionService.getTracks();
    expect(tracks.length).toBe(14);
  });
});
