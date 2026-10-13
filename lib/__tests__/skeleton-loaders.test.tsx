import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonBadge,
  SkeletonButton,
  SkeletonCodeBlock,
} from "@/components/ui/skeleton";
import { NotesSkeleton } from "@/components/notes/NotesSkeleton";
import { InterviewHubSkeleton } from "@/components/interview/InterviewHubSkeleton";
import { TrackPracticeSkeleton } from "@/components/interview/TrackPracticeSkeleton";
import { TrackBrowseSkeleton } from "@/components/interview/TrackBrowseSkeleton";
import { MockInterviewSkeleton } from "@/components/interview/MockInterviewSkeleton";
import { CurriculumHubSkeleton } from "@/components/curriculum/CurriculumHubSkeleton";
import { TopicCurriculumSkeleton } from "@/components/curriculum/TopicCurriculumSkeleton";
import { LessonSkeleton } from "@/components/curriculum/LessonSkeleton";
import { RoadmapsSkeleton } from "@/components/roadmap/RoadmapsSkeleton";
import { RevisionSkeleton } from "@/components/revision/RevisionSkeleton";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";

describe("Skeleton Primitives", () => {
  it("renders base Skeleton with animate-pulse", () => {
    const html = renderToStaticMarkup(<Skeleton className="h-6 w-24" />);
    expect(html).toContain("animate-pulse");
    expect(html).toContain("h-6 w-24");
  });

  it("renders SkeletonText with default and custom lines", () => {
    const defaultHtml = renderToStaticMarkup(<SkeletonText />);
    // Default is 3 lines
    expect(defaultHtml).toContain("space-y-2");

    const customHtml = renderToStaticMarkup(
      <SkeletonText lines={5} lastLineWidth="w-1/2" />
    );
    expect(customHtml).toContain("w-1/2");
  });

  it("renders SkeletonCard matching dark glassmorphic design token", () => {
    const html = renderToStaticMarkup(
      <SkeletonCard>
        <span>Card Content</span>
      </SkeletonCard>
    );
    expect(html).toContain("bg-[#0E121B]");
    expect(html).toContain("border-white/[0.08]");
    expect(html).toContain("Card Content");
  });

  it("renders SkeletonBadge with color variants", () => {
    const purpleBadge = renderToStaticMarkup(<SkeletonBadge variant="purple" />);
    expect(purpleBadge).toContain("bg-purple-500/15");

    const defaultBadge = renderToStaticMarkup(<SkeletonBadge />);
    expect(defaultBadge).toContain("bg-white/[0.08]");
  });

  it("renders SkeletonButton and SkeletonCodeBlock", () => {
    const btnHtml = renderToStaticMarkup(<SkeletonButton variant="primary" />);
    expect(btnHtml).toContain("bg-purple-600/30");

    const codeHtml = renderToStaticMarkup(<SkeletonCodeBlock lines={4} />);
    expect(codeHtml).toContain("font-mono");
    expect(codeHtml).toContain("bg-black/60");
  });
});

describe("Page-Specific Skeleton Loaders", () => {
  it("renders NotesSkeleton with search bar and note cards", () => {
    const html = renderToStaticMarkup(<NotesSkeleton />);
    expect(html).toContain("animate-pulse");
    expect(html).toContain("grid-cols-1 md:grid-cols-2 lg:grid-cols-3");
  });

  it("renders InterviewHubSkeleton with metrics and topic cards", () => {
    const html = renderToStaticMarkup(<InterviewHubSkeleton />);
    expect(html).toContain("grid-cols-2 sm:grid-cols-4");
    expect(html).toContain("grid-cols-1 md:grid-cols-2 lg:grid-cols-3");
  });

  it("renders TrackPracticeSkeleton matching flashcard mode layout", () => {
    const html = renderToStaticMarkup(<TrackPracticeSkeleton />);
    expect(html).toContain("min-h-[420px]");
    expect(html).toContain("rounded-3xl");
  });

  it("renders TrackBrowseSkeleton matching Q&A layout", () => {
    const html = renderToStaticMarkup(<TrackBrowseSkeleton />);
    expect(html).toContain("max-w-5xl");
  });

  it("renders MockInterviewSkeleton matching configuration screen", () => {
    const html = renderToStaticMarkup(<MockInterviewSkeleton />);
    expect(html).toContain("max-w-4xl");
  });

  it("renders CurriculumHubSkeleton matching /learn hub layout", () => {
    const html = renderToStaticMarkup(<CurriculumHubSkeleton />);
    expect(html).toContain("max-w-[95rem]");
  });

  it("renders TopicCurriculumSkeleton matching /learn/[topic] layout", () => {
    const html = renderToStaticMarkup(<TopicCurriculumSkeleton />);
    expect(html).toContain("max-w-5xl lg:max-w-6xl");
    expect(html).toContain("border-l-2 border-white/[0.06]");
  });

  it("renders LessonSkeleton matching 2-column sidebar and content layout", () => {
    const html = renderToStaticMarkup(<LessonSkeleton />);
    expect(html).toContain("lg:w-72 xl:w-80");
    expect(html).toContain("max-w-5xl");
  });

  it("renders RoadmapsSkeleton matching skill grid layout", () => {
    const html = renderToStaticMarkup(<RoadmapsSkeleton />);
    expect(html).toContain("grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4");
  });

  it("renders RevisionSkeleton matching flashcard review layout", () => {
    const html = renderToStaticMarkup(<RevisionSkeleton />);
    expect(html).toContain("min-h-[320px]");
  });

  it("renders DashboardSkeleton consistently", () => {
    const html = renderToStaticMarkup(<DashboardSkeleton />);
    expect(html).toContain("animate-pulse");
    expect(html).toContain("max-w-7xl");
  });
});
