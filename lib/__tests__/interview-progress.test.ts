import { describe, it, expect, beforeEach } from "vitest";
import {
  recordQuestionGrade,
  getAllQuestionProgress,
  getQuestionProgress,
  getTrackStats,
  getOverallInterviewStats,
  getDueQuestions,
  saveMockInterviewResult,
  getMockInterviewHistory,
  resetTrackProgress,
} from "../interview-progress";
import { JAVASCRIPT_QUESTIONS } from "../interview-questions/javascript-questions";
import { MockInterviewResult } from "@/types/interview";

describe("Spaced Repetition (SM-2) & Progress Tracking Engine", () => {
  let mockStorage: Record<string, string> = {};

  beforeEach(() => {
    mockStorage = {};

    // Setup global window and localStorage mock
    const localStorageMock = {
      getItem: (key: string) => mockStorage[key] || null,
      setItem: (key: string, value: string) => {
        mockStorage[key] = value;
      },
      removeItem: (key: string) => {
        delete mockStorage[key];
      },
      clear: () => {
        mockStorage = {};
      },
    };

    (global as any).window = {
      dispatchEvent: () => true,
    };
    (global as any).localStorage = localStorageMock;
  });

  it("should record a new review with grade 'again' and reset intervals", () => {
    const fixedDate = new Date("2026-01-01T12:00:00Z");
    const progress = recordQuestionGrade("js-q01", "again", fixedDate);

    expect(progress.questionId).toBe("js-q01");
    expect(progress.repetition).toBe(0);
    expect(progress.interval).toBe(1);
    expect(progress.consecutiveGood).toBe(0);
    expect(progress.isMastered).toBe(false);
    expect(progress.timesReviewed).toBe(1);
  });

  it("should advance intervals on consecutive 'good' and 'easy' grades", () => {
    const d1 = new Date("2026-01-01T12:00:00Z");
    const p1 = recordQuestionGrade("js-q02", "good", d1);
    expect(p1.repetition).toBe(1);
    expect(p1.interval).toBe(1);
    expect(p1.consecutiveGood).toBe(1);

    const d2 = new Date("2026-01-02T12:00:00Z");
    const p2 = recordQuestionGrade("js-q02", "good", d2);
    expect(p2.repetition).toBe(2);
    expect(p2.interval).toBe(4);
    expect(p2.consecutiveGood).toBe(2);

    const d3 = new Date("2026-01-06T12:00:00Z");
    const p3 = recordQuestionGrade("js-q02", "easy", d3);
    expect(p3.repetition).toBe(3);
    expect(p3.interval).toBeGreaterThan(4);
    expect(p3.consecutiveGood).toBe(3);
    expect(p3.isMastered).toBe(true);
  });

  it("should accurately compute track stats and due queues", () => {
    // Brand new state
    const stats = getTrackStats("javascript", JAVASCRIPT_QUESTIONS);
    expect(stats.trackKey).toBe("javascript");
    expect(stats.totalQuestions).toBe(30);
    expect(stats.questionsReviewed).toBe(0);
    expect(stats.dueForReview).toBe(30); // All unreviewed are due

    // Review one question
    recordQuestionGrade("js-q01", "good");
    const updatedStats = getTrackStats("javascript", JAVASCRIPT_QUESTIONS);
    expect(updatedStats.questionsReviewed).toBe(1);

    const all = getAllQuestionProgress();
    expect(all["js-q01"]).toBeDefined();

    const due = getDueQuestions("javascript");
    expect(due.length).toBeGreaterThan(0);
  });

  it("should retrieve overall interview stats across all 14 tracks", () => {
    const overall = getOverallInterviewStats();
    expect(overall.totalQuestions).toBe(203);
    expect(overall.totalTracks).toBe(14);
    expect(overall.questionsReviewed).toBe(0);
  });

  it("should save and retrieve mock interview results", () => {
    const result: MockInterviewResult = {
      id: "mock_test_1",
      timestamp: new Date().toISOString(),
      trackKeys: ["javascript", "react"],
      totalQuestions: 10,
      scorePercent: 90,
      timeSpentSeconds: 320,
      xpEarned: 75,
      grades: { "js-q01": "good", "react-q01": "easy" },
      answersSummary: [],
    };

    saveMockInterviewResult(result);
    const history = getMockInterviewHistory();

    expect(history.length).toBe(1);
    expect(history[0].id).toBe("mock_test_1");
    expect(history[0].scorePercent).toBe(90);
  });

  it("should reset track progress without affecting other tracks", () => {
    recordQuestionGrade("js-q01", "good");
    recordQuestionGrade("react-q01", "good");

    expect(getQuestionProgress("js-q01")).not.toBeNull();
    expect(getQuestionProgress("react-q01")).not.toBeNull();

    resetTrackProgress("javascript");

    expect(getQuestionProgress("js-q01")).toBeNull();
    expect(getQuestionProgress("react-q01")).not.toBeNull();
  });
});
