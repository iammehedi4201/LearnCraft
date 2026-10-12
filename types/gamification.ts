/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * GAMIFICATION & ENGAGEMENT ENGINE — TYPE DEFINITIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Data models for Learning Streaks, XP Points, Level Progression,
 * Daily Goal Loops, and Achievement Milestones across LearnCraft.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export type XPEventType =
  | "lesson_complete"     // +20 XP
  | "exercise_pass"       // +15 XP
  | "flashcard_review"    // +5 XP
  | "note_create"         // +5 XP
  | "streak_bonus"        // +10 XP
  | "project_complete";   // +100 XP

export interface XPLogEntry {
  id: string;
  timestamp: string;
  eventType: XPEventType;
  amount: number;
  description: string;
  metadata?: Record<string, any>;
}

export type MasteryLevel = "Novice" | "Apprentice" | "Craftsman" | "Developer" | "Architect";

export interface LevelInfo {
  level: number;
  title: MasteryLevel;
  badge: string;
  minXP: number;
  maxXP: number;
  color: string;
}

export interface DailyActivityRecord {
  date: string; // YYYY-MM-DD
  xpEarned: number;
  lessonsCompleted: number;
  exercisesPassed: number;
  flashcardsReviewed: number;
  notesCreated: number;
}

export interface UserGamificationState {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;       // YYYY-MM-DD
  streakFreezeAvailable: boolean;      // 1 free missed day per week
  streakFreezeUsedDate: string | null; // YYYY-MM-DD
  totalXP: number;
  currentLevel: LevelInfo;
  xpToNextLevel: number;
  levelProgressPercent: number;        // 0 - 100%
  weeklyGoalTarget: number;            // e.g. 5 active days per week
  weeklyGoalCompleted: number;         // days active in current week (0 - 7)
  recentXPLogs: XPLogEntry[];
  dailyHistory: Record<string, DailyActivityRecord>; // keyed by YYYY-MM-DD
}
