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
  pushGamificationToCloud();

  return {
    xpEarned: xpAward,
    state: updatedState,
    isStreakMaintained,
  };
}

/**
 * Merge local and remote gamification states deterministically (Local-First CRDT strategy)
 */
export function mergeGamificationStates(
  local: UserGamificationState,
  remote: UserGamificationState
): UserGamificationState {
  const totalXP = Math.max(local.totalXP || 0, remote.totalXP || 0);
  const currentStreak = Math.max(local.currentStreak || 1, remote.currentStreak || 1);
  const longestStreak = Math.max(local.longestStreak || 1, remote.longestStreak || 1, currentStreak);

  let lastActiveDate = local.lastActiveDate;
  if (!lastActiveDate || (remote.lastActiveDate && remote.lastActiveDate > lastActiveDate)) {
    lastActiveDate = remote.lastActiveDate;
  }

  const mergedHistory: Record<string, DailyActivityRecord> = {
    ...(remote.dailyHistory || {}),
  };
  for (const [date, localRec] of Object.entries(local.dailyHistory || {})) {
    if (!mergedHistory[date]) {
      mergedHistory[date] = localRec;
    } else {
      const remRec = mergedHistory[date];
      mergedHistory[date] = {
        date,
        xpEarned: Math.max(localRec.xpEarned || 0, remRec.xpEarned || 0),
        lessonsCompleted: Math.max(localRec.lessonsCompleted || 0, remRec.lessonsCompleted || 0),
        exercisesPassed: Math.max(localRec.exercisesPassed || 0, remRec.exercisesPassed || 0),
        flashcardsReviewed: Math.max(localRec.flashcardsReviewed || 0, remRec.flashcardsReviewed || 0),
        notesCreated: Math.max(localRec.notesCreated || 0, remRec.notesCreated || 0),
      };
    }
  }

  const logMap = new Map<string, XPLogEntry>();
  for (const log of [...(remote.recentXPLogs || []), ...(local.recentXPLogs || [])]) {
    if (log && log.id && !logMap.has(log.id)) {
      logMap.set(log.id, log);
    }
  }
  const mergedLogs = Array.from(logMap.values())
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 20);

  const { levelInfo, xpToNextLevel, levelProgressPercent } =
    calculateLevelInfo(totalXP);

  return {
    currentStreak,
    longestStreak,
    lastActiveDate: lastActiveDate ?? null,
    streakFreezeAvailable: local.streakFreezeAvailable ?? remote.streakFreezeAvailable ?? true,
    streakFreezeUsedDate: local.streakFreezeUsedDate || remote.streakFreezeUsedDate || null,
    totalXP,
    currentLevel: levelInfo,
    xpToNextLevel,
    levelProgressPercent,
    weeklyGoalTarget: local.weeklyGoalTarget || remote.weeklyGoalTarget || 5,
    weeklyGoalCompleted: Math.max(local.weeklyGoalCompleted || 0, remote.weeklyGoalCompleted || 0),
    recentXPLogs: mergedLogs,
    dailyHistory: mergedHistory,
  };
}

let syncTimeout: any = null;

/**
 * Push current local state to cloud (debounced)
 */
export function pushGamificationToCloud(): void {
  if (typeof window === "undefined") return;
  if (syncTimeout) clearTimeout(syncTimeout);

  syncTimeout = setTimeout(async () => {
    try {
      const current = getGamificationState();
      await fetch("/api/gamification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(current),
      });
    } catch (err) {
      console.warn("[Gamification] Cloud sync failed:", err);
    }
  }, 1000);
}

/**
 * Reconcile local gamification state with PostgreSQL cloud state
 */
export async function syncGamificationWithCloud(): Promise<UserGamificationState> {
  const localState = getGamificationState();
  if (typeof window === "undefined") return localState;

  try {
    const res = await fetch("/api/gamification", { cache: "no-store" });
    if (!res.ok) return localState;

    const data = await res.json();
    if (!data.success) return localState;

    if (!data.state) {
      // Cloud is empty, push local state to initialize
      pushGamificationToCloud();
      return localState;
    }

    const merged = mergeGamificationStates(localState, data.state);
    saveGamificationState(merged);

    // If local state had more XP or progress, push merged back to cloud
    if (
      (localState.totalXP || 0) > (data.state.totalXP || 0) ||
      (localState.currentStreak || 1) > (data.state.currentStreak || 1)
    ) {
      pushGamificationToCloud();
    }

    return merged;
  } catch (err) {
    console.warn("[Gamification] Error reconciling with cloud:", err);
    return localState;
  }
}

