/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * GAMIFICATION & ENGAGEMENT ENGINE
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Manages daily learning streaks, XP awards, mastery level progression,
 * streak freeze protection, and local/cloud synchronization.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import {
  UserGamificationState,
  LevelInfo,
  XPEventType,
  XPLogEntry,
  DailyActivityRecord,
} from "@/types/gamification";

const GAMIFICATION_STORAGE_KEY = "learncraft_gamification_v1";
export const GAMIFICATION_SYNC_EVENT = "learncraft:gamification-sync";

// ─── Level Progression Tiers ──────────────────────────────────────────────────
export const LEVEL_TIERS: LevelInfo[] = [
  {
    level: 1,
    title: "Novice",
    badge: "🌱",
    minXP: 0,
    maxXP: 100,
    color: "#10B981", // Emerald
  },
  {
    level: 2,
    title: "Apprentice",
    badge: "⚡",
    minXP: 101,
    maxXP: 350,
    color: "#3B82F6", // Blue
  },
  {
    level: 3,
    title: "Craftsman",
    badge: "⚔️",
    minXP: 351,
    maxXP: 800,
    color: "#8B5CF6", // Purple
  },
  {
    level: 4,
    title: "Developer",
    badge: "🚀",
    minXP: 801,
    maxXP: 1500,
    color: "#F59E0B", // Amber
  },
  {
    level: 5,
    title: "Architect",
    badge: "👑",
    minXP: 1501,
    maxXP: 5000,
    color: "#EC4899", // Pink
  },
];

export const XP_VALUES: Record<XPEventType, number> = {
  lesson_complete: 20,
  exercise_pass: 15,
  flashcard_review: 5,
  note_create: 5,
  streak_bonus: 10,
  project_complete: 100,
};

// Compute Level info from total XP
export function calculateLevelInfo(totalXP: number): {
  levelInfo: LevelInfo;
  xpToNextLevel: number;
  levelProgressPercent: number;
} {
  let matchedLevel = LEVEL_TIERS[0];

  for (const tier of LEVEL_TIERS) {
    if (totalXP >= tier.minXP) {
      matchedLevel = tier;
    }
  }

  const range = matchedLevel.maxXP - matchedLevel.minXP;
  const currentInRange = Math.max(0, totalXP - matchedLevel.minXP);
  const xpToNextLevel = Math.max(0, matchedLevel.maxXP - totalXP);
  const levelProgressPercent =
    range > 0 ? Math.min(100, Math.round((currentInRange / range) * 100)) : 100;

  return {
    levelInfo: matchedLevel,
    xpToNextLevel,
    levelProgressPercent,
  };
}

// Format date helper: YYYY-MM-DD
export function getTodayDateString(date: Date = new Date()): string {
  return date.toISOString().split("T")[0];
}

// Calculate days between two YYYY-MM-DD strings
export function daysBetween(dateStr1: string, dateStr2: string): number {
  const d1 = new Date(dateStr1 + "T00:00:00Z").getTime();
  const d2 = new Date(dateStr2 + "T00:00:00Z").getTime();
  return Math.round(Math.abs(d2 - d1) / (24 * 60 * 60 * 1000));
}

// Initial state seed
const DEFAULT_INITIAL_STATE: UserGamificationState = {
  currentStreak: 1,
  longestStreak: 1,
  lastActiveDate: getTodayDateString(),
  streakFreezeAvailable: true,
  streakFreezeUsedDate: null,
  totalXP: 45, // Seed starter XP for early satisfaction
  currentLevel: LEVEL_TIERS[0],
  xpToNextLevel: 55,
  levelProgressPercent: 45,
  weeklyGoalTarget: 5,
  weeklyGoalCompleted: 1,
  recentXPLogs: [
    {
      id: "log_init_01",
      timestamp: new Date().toISOString(),
      eventType: "lesson_complete",
      amount: 20,
      description: "Welcome to LearnCraft! Completed initial setup",
    },
  ],
  dailyHistory: {
    [getTodayDateString()]: {
      date: getTodayDateString(),
      xpEarned: 45,
      lessonsCompleted: 1,
      exercisesPassed: 1,
      flashcardsReviewed: 1,
      notesCreated: 1,
    },
  },
};

/**
 * Dispatch cross-tab update event
 */
function notifyGamificationSync(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(GAMIFICATION_SYNC_EVENT));
}

/**
 * Read current gamification state from localStorage
 */
export function getGamificationState(): UserGamificationState {
  if (typeof window === "undefined") return DEFAULT_INITIAL_STATE;

  try {
    const raw = localStorage.getItem(GAMIFICATION_STORAGE_KEY);
    if (!raw) {
      const initial = { ...DEFAULT_INITIAL_STATE };
      const { levelInfo, xpToNextLevel, levelProgressPercent } =
        calculateLevelInfo(initial.totalXP);
      initial.currentLevel = levelInfo;
      initial.xpToNextLevel = xpToNextLevel;
      initial.levelProgressPercent = levelProgressPercent;

      localStorage.setItem(GAMIFICATION_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }

    const parsed: UserGamificationState = JSON.parse(raw);
    const { levelInfo, xpToNextLevel, levelProgressPercent } =
      calculateLevelInfo(parsed.totalXP || 0);

    parsed.currentLevel = levelInfo;
    parsed.xpToNextLevel = xpToNextLevel;
    parsed.levelProgressPercent = levelProgressPercent;

    return parsed;
  } catch (err) {
    console.error("[Gamification] Failed to parse state:", err);
    return DEFAULT_INITIAL_STATE;
  }
}

/**
 * Save updated gamification state
 */
function saveGamificationState(state: UserGamificationState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(GAMIFICATION_STORAGE_KEY, JSON.stringify(state));
    notifyGamificationSync();
  } catch (err) {
    console.error("[Gamification] Failed to save state:", err);
  }
}

/**
 * Record a user learning activity and update daily streak & XP
 */
export function recordActivity(
  eventType: XPEventType,
  description: string,
  metadata?: Record<string, any>
): { xpEarned: number; state: UserGamificationState; isStreakMaintained: boolean } {
  const state = getGamificationState();
  const today = getTodayDateString();
  const xpAward = XP_VALUES[eventType] || 10;

  // 1. Calculate and update streak
  let newStreak = state.currentStreak || 1;
  let isStreakMaintained = true;
  let freezeUsedDate = state.streakFreezeUsedDate;
  let freezeAvailable = state.streakFreezeAvailable ?? true;

  if (state.lastActiveDate) {
    const diff = daysBetween(state.lastActiveDate, today);

    if (diff === 0) {
      // Already active today, maintain current streak
      isStreakMaintained = true;
    } else if (diff === 1) {
      // Consecutive active day! Increment streak
      newStreak += 1;
    } else if (diff === 2 && freezeAvailable) {
      // Missed 1 day: consume streak freeze protection!
      freezeAvailable = false;
      freezeUsedDate = today;
      newStreak += 1; // Streak preserved!
    } else {
      // Missed more than 1 day without freeze: reset streak
      newStreak = 1;
    }
  }

  const longestStreak = Math.max(state.longestStreak || 1, newStreak);
  const newTotalXP = (state.totalXP || 0) + xpAward;

  // 2. Update Daily history
  const history = { ...(state.dailyHistory || {}) };
  const todayRecord: DailyActivityRecord = history[today] || {
    date: today,
    xpEarned: 0,
    lessonsCompleted: 0,
    exercisesPassed: 0,
    flashcardsReviewed: 0,
    notesCreated: 0,
  };

  todayRecord.xpEarned += xpAward;
  if (eventType === "lesson_complete") todayRecord.lessonsCompleted += 1;
  if (eventType === "exercise_pass") todayRecord.exercisesPassed += 1;
  if (eventType === "flashcard_review") todayRecord.flashcardsReviewed += 1;
  if (eventType === "note_create") todayRecord.notesCreated += 1;
  history[today] = todayRecord;

  // 3. Calculate weekly active days
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sun, 1 = Mon ...
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

  let weeklyActiveCount = 0;
  for (let i = 0; i < 7; i++) {
    const checkD = new Date(startOfWeek);
    checkD.setDate(startOfWeek.getDate() + i);
    const dateStr = getTodayDateString(checkD);
    if (history[dateStr] && history[dateStr].xpEarned > 0) {
      weeklyActiveCount++;
    }
  }

  // 4. Append XP log entry
  const newLog: XPLogEntry = {
    id: `xp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
    eventType,
    amount: xpAward,
    description,
    metadata,
  };

  const recentLogs = [newLog, ...(state.recentXPLogs || [])].slice(0, 20);

  const { levelInfo, xpToNextLevel, levelProgressPercent } =
    calculateLevelInfo(newTotalXP);

  const updatedState: UserGamificationState = {
    currentStreak: newStreak,
    longestStreak,
    lastActiveDate: today,
    streakFreezeAvailable: freezeAvailable,
    streakFreezeUsedDate: freezeUsedDate,
    totalXP: newTotalXP,
    currentLevel: levelInfo,
    xpToNextLevel,
    levelProgressPercent,
    weeklyGoalTarget: state.weeklyGoalTarget || 5,
    weeklyGoalCompleted: Math.min(weeklyActiveCount, 7),
    recentXPLogs: recentLogs,
    dailyHistory: history,
  };

  saveGamificationState(updatedState);

  return {
    xpEarned: xpAward,
    state: updatedState,
    isStreakMaintained,
  };
}
