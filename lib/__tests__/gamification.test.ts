import { describe, it, expect } from "vitest";
import {
  calculateLevelInfo,
  daysBetween,
  getTodayDateString,
  mergeGamificationStates,
  LEVEL_TIERS,
} from "../gamification";
import type { UserGamificationState } from "@/types/gamification";

describe("Gamification Engine — Level Calculation", () => {
  it("correctly identifies Novice level at 0 XP", () => {
    const { levelInfo, xpToNextLevel, levelProgressPercent } = calculateLevelInfo(0);
    expect(levelInfo.level).toBe(1);
    expect(levelInfo.title).toBe("Novice");
    expect(levelProgressPercent).toBe(0);
    expect(xpToNextLevel).toBe(100);
  });

  it("correctly identifies Apprentice level at 150 XP", () => {
    const { levelInfo, xpToNextLevel, levelProgressPercent } = calculateLevelInfo(150);
    expect(levelInfo.level).toBe(2);
    expect(levelInfo.title).toBe("Apprentice");
    expect(xpToNextLevel).toBe(200);
    expect(levelProgressPercent).toBeGreaterThan(0);
  });

  it("correctly identifies Architect tier at 2000 XP", () => {
    const { levelInfo } = calculateLevelInfo(2000);
    expect(levelInfo.level).toBe(5);
    expect(levelInfo.title).toBe("Architect");
  });
});

describe("Gamification Engine — Date Calculations", () => {
  it("formats today's date in YYYY-MM-DD format", () => {
    const today = getTodayDateString(new Date("2026-10-10T12:00:00Z"));
    expect(today).toBe("2026-10-10");
  });

  it("calculates exact days between date strings", () => {
    expect(daysBetween("2026-10-08", "2026-10-10")).toBe(2);
    expect(daysBetween("2026-10-10", "2026-10-10")).toBe(0);
    expect(daysBetween("2026-10-09", "2026-10-10")).toBe(1);
  });
});

describe("Gamification Engine — Cloud CRDT State Merge", () => {
  const baseLocalState: UserGamificationState = {
    currentStreak: 3,
    longestStreak: 5,
    lastActiveDate: "2026-10-09",
    streakFreezeAvailable: true,
    streakFreezeUsedDate: null,
    totalXP: 250,
    currentLevel: LEVEL_TIERS[1],
    xpToNextLevel: 100,
    levelProgressPercent: 50,
    weeklyGoalTarget: 5,
    weeklyGoalCompleted: 3,
    recentXPLogs: [
      {
        id: "log_1",
        timestamp: "2026-10-09T10:00:00Z",
        eventType: "lesson_complete",
        amount: 20,
        description: "Local lesson completed",
      },
    ],
    dailyHistory: {
      "2026-10-09": {
        date: "2026-10-09",
        xpEarned: 20,
        lessonsCompleted: 1,
        exercisesPassed: 0,
        flashcardsReviewed: 0,
        notesCreated: 0,
      },
    },
  };

  const baseRemoteState: UserGamificationState = {
    currentStreak: 4,
    longestStreak: 4,
    lastActiveDate: "2026-10-10",
    streakFreezeAvailable: false,
    streakFreezeUsedDate: "2026-10-08",
    totalXP: 300,
    currentLevel: LEVEL_TIERS[1],
    xpToNextLevel: 50,
    levelProgressPercent: 70,
    weeklyGoalTarget: 5,
    weeklyGoalCompleted: 4,
    recentXPLogs: [
      {
        id: "log_2",
        timestamp: "2026-10-10T09:00:00Z",
        eventType: "exercise_pass",
        amount: 15,
        description: "Cloud exercise passed",
      },
    ],
    dailyHistory: {
      "2026-10-09": {
        date: "2026-10-09",
        xpEarned: 40,
        lessonsCompleted: 2,
        exercisesPassed: 1,
        flashcardsReviewed: 0,
        notesCreated: 0,
      },
      "2026-10-10": {
        date: "2026-10-10",
        xpEarned: 15,
        lessonsCompleted: 0,
        exercisesPassed: 1,
        flashcardsReviewed: 0,
        notesCreated: 0,
      },
    },
  };

  it("takes the maximum XP between local and remote states", () => {
    const merged = mergeGamificationStates(baseLocalState, baseRemoteState);
    expect(merged.totalXP).toBe(300);
  });

  it("takes the maximum streak between local and remote states", () => {
    const merged = mergeGamificationStates(baseLocalState, baseRemoteState);
    expect(merged.currentStreak).toBe(4);
    expect(merged.longestStreak).toBe(5);
  });

  it("picks the latest lastActiveDate", () => {
    const merged = mergeGamificationStates(baseLocalState, baseRemoteState);
    expect(merged.lastActiveDate).toBe("2026-10-10");
  });

  it("unions and merges daily history records taking max counters", () => {
    const merged = mergeGamificationStates(baseLocalState, baseRemoteState);
    expect(merged.dailyHistory["2026-10-09"].xpEarned).toBe(40);
    expect(merged.dailyHistory["2026-10-09"].lessonsCompleted).toBe(2);
    expect(merged.dailyHistory["2026-10-10"].xpEarned).toBe(15);
  });

  it("deduplicates recent XP logs and sorts them chronologically descending", () => {
    const merged = mergeGamificationStates(baseLocalState, baseRemoteState);
    expect(merged.recentXPLogs.length).toBe(2);
    expect(merged.recentXPLogs[0].id).toBe("log_2"); // latest timestamp first
    expect(merged.recentXPLogs[1].id).toBe("log_1");
  });
});
