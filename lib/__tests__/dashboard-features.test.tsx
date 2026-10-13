import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { calculateLevelInfo } from "@/lib/gamification";
import { TRACK_METAS } from "@/lib/dashboard-metadata";
import { ContinueLearningCard } from "@/components/dashboard/ContinueLearningCard";
import { TrackProgressDonut } from "@/components/dashboard/TrackProgressDonut";
import { XPProgressionChart } from "@/components/dashboard/XPProgressionChart";
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap";
import { InterviewReadinessWidget } from "@/components/dashboard/InterviewReadinessWidget";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";

describe("Dashboard Level Progression Calculations", () => {
  it("correctly identifies Level 1 Novice tier (0 - 100 XP)", () => {
    const res = calculateLevelInfo(50);
    expect(res.levelInfo.level).toBe(1);
    expect(res.levelInfo.title).toBe("Novice");
    expect(res.xpToNextLevel).toBe(50);
    expect(res.levelProgressPercent).toBe(50);
  });

  it("correctly advances to Level 2 Apprentice tier at 101+ XP", () => {
    const res = calculateLevelInfo(200);
    expect(res.levelInfo.level).toBe(2);
    expect(res.levelInfo.title).toBe("Apprentice");
    expect(res.levelInfo.badge).toBe("⚡");
    expect(res.xpToNextLevel).toBe(150);
  });

  it("handles high XP levels up to Architect tier (1501+ XP)", () => {
    const res = calculateLevelInfo(2500);
    expect(res.levelInfo.level).toBe(5);
    expect(res.levelInfo.title).toBe("Architect");
    expect(res.levelInfo.badge).toBe("👑");
  });
});

describe("Dashboard 14 Tracks Metadata Completeness", () => {
  it("contains exactly 14 full-stack tracks with unique keys and prefixes", () => {
    expect(TRACK_METAS.length).toBe(14);
    const keys = new Set(TRACK_METAS.map((t) => t.key));
    expect(keys.size).toBe(14);

    // Verify key tracks exist
    expect(keys.has("nextjs")).toBe(true);
    expect(keys.has("react")).toBe(true);
    expect(keys.has("typescript")).toBe(true);
    expect(keys.has("nodejs")).toBe(true);
    expect(keys.has("express")).toBe(true);
    expect(keys.has("nestjs")).toBe(true);
    expect(keys.has("postgresql")).toBe(true);
    expect(keys.has("mongodb")).toBe(true);
    expect(keys.has("redux")).toBe(true);
    expect(keys.has("prisma")).toBe(true);
    expect(keys.has("system-design")).toBe(true);
    expect(keys.has("oop")).toBe(true);
    expect(keys.has("javascript")).toBe(true);
    expect(keys.has("tanstack")).toBe(true);

    // Verify every track has prefixes defined for code matching
    TRACK_METAS.forEach((track) => {
      expect(track.prefixes.length).toBeGreaterThan(0);
      expect(track.totalLessons).toBeGreaterThan(0);
      expect(track.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });

    // Sum total lessons across all 14 tracks
    const totalLessons = TRACK_METAS.reduce((sum, t) => sum + t.totalLessons, 0);
    expect(totalLessons).toBe(354);
  });
});

describe("ContinueLearningCard Widget", () => {
  it("renders empty state fallback when no recommendation is provided", () => {
    const html = renderToStaticMarkup(<ContinueLearningCard recommendation={null} />);
    expect(html).toContain("Start Your Learning Journey");
    expect(html).toContain("Begin Next.js Track");
    expect(html).toContain("/learn/nextjs");
  });

  it("renders active recommendation with lesson details and resume CTA", () => {
    const rec = {
      trackKey: "nodejs",
      trackTitle: "Node.js",
      lessonId: "node-01",
      lessonTitle: "What Is Node.js? Server Runtime & V8 Engine",
      phaseName: "Fundamentals & Runtime",
      phaseNumber: 1,
      minutes: 25,
      href: "/learn/nodejs",
      progressPercent: 15,
    };

    const html = renderToStaticMarkup(<ContinueLearningCard recommendation={rec} />);
    expect(html).toContain("CONTINUE LEARNING");
    expect(html).toContain("What Is Node.js? Server Runtime &amp; V8 Engine");
    expect(html).toContain("Phase 1 (Fundamentals &amp; Runtime)");
    expect(html).toContain("~25 mins");
    expect(html).toContain("Track Progress: 15%");
    expect(html).toContain("Resume Lesson");
    expect(html).toContain('href="/learn/nodejs"');
  });
});

describe("TrackProgressDonut Visualization", () => {
  it("renders circular SVG donut and dynamic track counter", () => {
    const mockTracks = TRACK_METAS.map((t) => ({
      trackKey: t.key,
      title: t.title,
      totalLessons: t.totalLessons,
      completedLessons: t.key === "nextjs" ? 11 : 0,
      percent: t.key === "nextjs" ? 50 : 0,
      color: t.color,
    }));

    const html = renderToStaticMarkup(<TrackProgressDonut tracks={mockTracks} />);
    expect(html).toContain("Curriculum Mastery Breakdown");
    expect(html).toContain("11 of 354 total lessons mastered across 14 tracks");
    expect(html).toContain("Structured across 14 full-stack tracks");
    expect(html).toContain("3%"); // overall mastery ~ 11/354 = 3%
    expect(html).toContain("Mastery");
    expect(html).toContain("/learn");
  });

  it("handles 0 completed lessons cleanly without NaN", () => {
    const mockTracks = TRACK_METAS.map((t) => ({
      trackKey: t.key,
      title: t.title,
      totalLessons: t.totalLessons,
      completedLessons: 0,
      percent: 0,
      color: t.color,
    }));

    const html = renderToStaticMarkup(<TrackProgressDonut tracks={mockTracks} />);
    expect(html).toContain("0%");
    expect(html).not.toContain("NaN");
  });
});

describe("XPProgressionChart Component", () => {
  it("renders SVG spline and range selector buttons", () => {
    const html = renderToStaticMarkup(
      <XPProgressionChart
        totalXP={250}
        xpHistory={[]}
        dailyActivity={{}}
      />
    );

    expect(html).toContain("XP Growth &amp; Progression");
    expect(html).toContain("7D");
    expect(html).toContain("30D");
    expect(html).toContain("ALL");
    expect(html).toContain("<svg");
    expect(html).toContain("linearGradient");
    expect(html).not.toContain("NaN");
  });
});

describe("ActivityHeatmap Component", () => {
  it("renders streak badges and SVG day matrix", () => {
    const html = renderToStaticMarkup(
      <ActivityHeatmap
        currentStreak={5}
        longestStreak={12}
        dailyActivity={{}}
      />
    );

    expect(html).toContain("Learning Activity &amp; Streak Heatmap");
    expect(html).toContain("5 Days");
    expect(html).toContain("12 Days");
    expect(html).toContain("Mon");
    expect(html).toContain("Wed");
    expect(html).toContain("Fri");
    expect(html).toContain("Less");
    expect(html).toContain("More");
  });
});

describe("InterviewReadinessWidget Component", () => {
  it("renders key stats and Review Flashcards button with correct /interview href", () => {
    const stats = {
      totalQuestions: 193,
      questionsReviewed: 20,
      masteredCount: 15,
      dueForReview: 5,
      overallPercentMastered: 8,
      totalTracks: 8,
    };

    const html = renderToStaticMarkup(<InterviewReadinessWidget stats={stats} />);
    expect(html).toContain("Spaced Repetition &amp; Interview Readiness");
    expect(html).toContain("Cards Due Today");
    expect(html).toContain("5");
    expect(html).toContain("Mastered (SM-2)");
    expect(html).toContain("15");
    expect(html).toContain("Total Questions");
    expect(html).toContain("193");
    expect(html).toContain("Retention Health");
    expect(html).toContain("75%"); // 15 / 20 = 75%
    expect(html).toContain("Review Flashcards");
    expect(html).toContain('href="/interview"');
  });

  it("renders congratulations message when no cards are due", () => {
    const stats = {
      totalQuestions: 193,
      questionsReviewed: 50,
      masteredCount: 50,
      dueForReview: 0,
      overallPercentMastered: 26,
      totalTracks: 8,
    };

    const html = renderToStaticMarkup(<InterviewReadinessWidget stats={stats} />);
    expect(html).toContain("All scheduled cards reviewed!");
    expect(html).toContain("Try a Mock Interview");
    expect(html).toContain("/interview/mock");
  });
});

describe("DashboardSkeleton Completeness", () => {
  it("renders full skeleton layout with canonical Footer", () => {
    const html = renderToStaticMarkup(<DashboardSkeleton />);
    expect(html).toContain("animate-pulse");
    expect(html).toContain("max-w-7xl");
    expect(html).toContain("Elevating the developer community");
    expect(html).toContain("Next.js Mastery");
  });
});
