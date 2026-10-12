/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SPACED REPETITION ENGINE — SUPERMEMO SM-2 ALGORITHM
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Implementation of the SuperMemo SM-2 algorithmic memory retention engine.
 * Computes optimal review intervals, easiness factor updates, recall quality
 * grading, Ebbinghaus forgetting curves, and daily study queues.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import {
  AnnotationItem,
  SM2Grade,
  SM2ReviewLog,
  SM2IntervalPreview,
  SpacedRepetitionStats,
  MemoryRetentionCurvePoint,
} from "@/types/revision";

export const DEFAULT_EASINESS_FACTOR = 2.5;
export const MIN_EASINESS_FACTOR = 1.3;
export const MAX_EASINESS_FACTOR = 3.5;

/**
 * Maps semantic SM2 grade to numerical recall score (1 to 5)
 */
export function gradeToScore(grade: SM2Grade): number {
  switch (grade) {
    case "again":
      return 1; // Blackout / complete failure
    case "hard":
      return 3; // Recalled with significant difficulty
    case "good":
      return 4; // Correct response after normal hesitation
    case "easy":
      return 5; // Instant, effortless perfect recall
  }
}

/**
 * Calculates updated SM-2 parameters for a flashcard based on user recall grade
 */
export function calculateSM2Review(
  card: AnnotationItem,
  grade: SM2Grade,
  reviewDate: Date = new Date()
): {
  repetition: number;
  interval: number;
  easinessFactor: number;
  nextReviewDate: string;
  lastReviewedAt: string;
  reviewLog: SM2ReviewLog;
} {
  const q = gradeToScore(grade);
  const currentRep = card.repetition ?? 0;
  const currentInterval = card.interval ?? 1;
  const currentEF = card.easinessFactor ?? DEFAULT_EASINESS_FACTOR;

  // 1. Calculate new Easiness Factor (EF)
  // Formula: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  let newEF = currentEF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  newEF = Math.max(MIN_EASINESS_FACTOR, Math.min(MAX_EASINESS_FACTOR, Number(newEF.toFixed(2))));

  // 2. Calculate new repetition count and interval (days)
  let newRepetition = 0;
  let newInterval = 1;

  if (q < 3) {
    // Failed recall: reset repetition chain back to 0, review tomorrow (1 day)
    newRepetition = 0;
    newInterval = 1;
  } else {
    // Successful recall (hard, good, or easy)
    newRepetition = currentRep + 1;

    if (newRepetition === 1) {
      newInterval = grade === "easy" ? 3 : 1;
    } else if (newRepetition === 2) {
      if (grade === "easy") newInterval = 8;
      else if (grade === "hard") newInterval = 3;
      else newInterval = 6;
    } else {
      // Repetition >= 3: exponential interval progression
      if (grade === "easy") {
        newInterval = Math.round(currentInterval * newEF * 1.3);
      } else if (grade === "hard") {
        newInterval = Math.max(currentInterval + 1, Math.round(currentInterval * 1.2));
      } else {
        newInterval = Math.max(currentInterval + 1, Math.round(currentInterval * newEF));
      }
    }
  }

  // Ensure minimum 1 day interval
  newInterval = Math.max(1, newInterval);

  const lastReviewedAt = reviewDate.toISOString();
  const nextDueDate = new Date(reviewDate.getTime() + newInterval * 24 * 60 * 60 * 1000);
  const nextReviewDate = nextDueDate.toISOString();

  const reviewLog: SM2ReviewLog = {
    timestamp: lastReviewedAt,
    grade,
    numericGrade: q,
    interval: newInterval,
    easinessFactor: newEF,
  };

  return {
    repetition: newRepetition,
    interval: newInterval,
    easinessFactor: newEF,
    nextReviewDate,
    lastReviewedAt,
    reviewLog,
  };
}

/**
 * Calculates current predicted memory retention probability (0% - 100%)
 * using Ebbinghaus Forgetting Curve: R(t) = exp(-t / S)
 */
export function getCardRetention(card: AnnotationItem, now: Date = new Date()): number {
  if (!card.lastReviewedAt) {
    const ageDays = (now.getTime() - new Date(card.createdAt).getTime()) / (24 * 60 * 60 * 1000);
    // Unreviewed card decays from 100% over 7 days to baseline 30%
    return Math.max(25, Math.round(100 * Math.exp(-ageDays / 4)));
  }

  const daysSinceReview = Math.max(0, (now.getTime() - new Date(card.lastReviewedAt).getTime()) / (24 * 60 * 60 * 1000));
  const stability = card.interval || 1;

  // R(t) = exp(-daysSinceReview / (stability * 1.1))
  const retention = Math.exp(-daysSinceReview / (stability * 1.1));
  return Math.min(100, Math.max(15, Math.round(retention * 100)));
}

/**
 * Determines whether a card is currently due for review
 */
export function isCardDue(card: AnnotationItem, now: Date = new Date()): boolean {
  if (!card.nextReviewDate) return true; // Never reviewed -> due immediately
  return new Date(card.nextReviewDate).getTime() <= now.getTime();
}

/**
 * Retrieves the priority study queue sorted by urgency (most overdue & lowest retention first)
 */
export function getDueQueue(cards: AnnotationItem[], now: Date = new Date()): AnnotationItem[] {
  const dueCards = cards.filter((c) => isCardDue(c, now));
  
  return dueCards.sort((a, b) => {
    const aDueTime = a.nextReviewDate ? new Date(a.nextReviewDate).getTime() : 0;
    const bDueTime = b.nextReviewDate ? new Date(b.nextReviewDate).getTime() : 0;
    
    // Most overdue first
    if (aDueTime !== bDueTime) {
      return aDueTime - bDueTime;
    }
    
    // If same due time, lower retention rate first
    return getCardRetention(a, now) - getCardRetention(b, now);
  });
}

/**
 * Generates humanized interval preview for each grade button (e.g. "1d", "4d", "12d")
 */
export function getSM2IntervalPreviews(card: AnnotationItem): SM2IntervalPreview[] {
  const grades: SM2Grade[] = ["again", "hard", "good", "easy"];
  
  return grades.map((grade) => {
    const simulated = calculateSM2Review(card, grade);
    const days = simulated.interval;

    let badge = `${days}d`;
    let description = "Normal review";

    if (grade === "again") {
      badge = "< 1d";
      description = "Reset progress";
    } else if (grade === "hard") {
      badge = `${days}d`;
      description = "Shorter interval";
    } else if (grade === "good") {
      badge = `${days}d`;
      description = "Standard interval";
    } else if (grade === "easy") {
      badge = `${days}d`;
      description = "Longer boost";
    }

    return {
      grade,
      label: grade.toUpperCase(),
      intervalDays: days,
      badge,
      description,
    };
  });
}

/**
 * Computes comprehensive Spaced Repetition statistics for the dashboard
 */
export function computeSpacedRepetitionStats(
  cards: AnnotationItem[],
  now: Date = new Date()
): SpacedRepetitionStats {
  if (!cards.length) {
    return {
      totalCards: 0,
      dueTodayCount: 0,
      learningCount: 0,
      masteredCount: 0,
      newCardsCount: 0,
      averageRetentionRate: 100,
      totalReviewsCompleted: 0,
      streakDays: 0,
    };
  }

  let dueTodayCount = 0;
  let learningCount = 0;
  let masteredCount = 0;
  let newCardsCount = 0;
  let retentionSum = 0;
  let totalReviews = 0;
  const reviewDays = new Set<string>();

  cards.forEach((card) => {
    if (isCardDue(card, now)) {
      dueTodayCount++;
    }

    const rep = card.repetition ?? 0;
    const interval = card.interval ?? 0;

    if (!card.lastReviewedAt && rep === 0) {
      newCardsCount++;
    } else if (rep >= 3 && interval >= 21) {
      masteredCount++;
    } else {
      learningCount++;
    }

    retentionSum += getCardRetention(card, now);

    if (card.reviewHistory && card.reviewHistory.length > 0) {
      totalReviews += card.reviewHistory.length;
      card.reviewHistory.forEach((log) => {
        reviewDays.add(new Date(log.timestamp).toISOString().split("T")[0]);
      });
    }
  });

  const averageRetentionRate = Math.round(retentionSum / cards.length);

  // Compute active streak days
  let streak = 0;
  const checkDate = new Date(now);

  for (let i = 0; i < 365; i++) {
    const dayStr = checkDate.toISOString().split("T")[0];
    if (reviewDays.has(dayStr) || (i === 0 && dueTodayCount > 0)) {
      if (reviewDays.has(dayStr)) streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return {
    totalCards: cards.length,
    dueTodayCount,
    learningCount,
    masteredCount,
    newCardsCount,
    averageRetentionRate,
    totalReviewsCompleted: totalReviews,
    streakDays: Math.max(streak, 1),
  };
}

/**
 * Generates data points for the 30-day Ebbinghaus Memory Retention Decay Curve
 */
export function generateMemoryDecayCurveData(cards: AnnotationItem[]): MemoryRetentionCurvePoint[] {
  const points: MemoryRetentionCurvePoint[] = [];
  const avgStability = cards.length > 0
    ? cards.reduce((acc, c) => acc + (c.interval || 1), 0) / cards.length
    : 3;

  for (let day = 0; day <= 30; day += 2) {
    // Un-reviewed forgetting curve
    const decayPercent = Math.max(10, Math.round(100 * Math.exp(-day / 3.5)));
    // Spaced repetition enhanced curve
    const recalledPercent = Math.min(100, Math.max(40, Math.round(100 * Math.exp(-day / (avgStability * 3.2)))));

    points.push({
      day,
      decayPercent,
      recalledPercent,
    });
  }

  return points;
}
