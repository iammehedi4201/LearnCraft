import { describe, it, expect, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { UnifiedLessonNavBar } from "../UnifiedLessonNavBar";
import { NextjsLessonSidebar } from "@/app/learn/nextjs/components/lesson-sidebar";
import { NextjsLessonNavFooter } from "@/app/learn/nextjs/components/lesson-nav-footer";

describe("UnifiedLessonNavBar Component", () => {
  it("renders first lesson state with disabled Previous and active Next lesson button", () => {
    const html = renderToStaticMarkup(
      <UnifiedLessonNavBar
        currentIndex={0}
        totalLessons={6}
        onPrevLesson={vi.fn()}
        onNextLesson={vi.fn()}
        isLessonCompleted={false}
      />
    );

    // Dynamic position indicator
    expect(html).toContain("Lesson 1 of 6");

    // Previous lesson disabled
    expect(html).toContain("Previous lesson");
    expect(html).toContain("disabled=\"\"");

    // Next lesson action
    expect(html).toContain("Next lesson");
    expect(html).toContain("bg-purple-600");

    // Must NOT contain old competing module buttons
    expect(html).not.toContain("Previous: NX-");
    expect(html).not.toContain("Next: NX-");
    expect(html).not.toContain("Module Quiz (+30 XP)");
  });

  it("renders intermediate lesson state (e.g. Lesson 5 of 6) with both Previous and Next enabled", () => {
    const html = renderToStaticMarkup(
      <UnifiedLessonNavBar
        currentIndex={4}
        totalLessons={6}
        onPrevLesson={vi.fn()}
        onNextLesson={vi.fn()}
        isLessonCompleted={false}
      />
    );

    // Dynamic position indicator
    expect(html).toContain("Lesson 5 of 6");

    // Previous lesson enabled
    expect(html).toContain("Previous lesson");
    expect(html).not.toContain("disabled=\"\"");

    // Next lesson primary purple button
    expect(html).toContain("Next lesson");
    expect(html).toContain("bg-purple-600");

    // Does not prematurely show Complete module or Next module
    expect(html).not.toContain("Complete module");
    expect(html).not.toContain("Next module");
  });

  it("renders final lesson state when module is incomplete with Complete module action", () => {
    const html = renderToStaticMarkup(
      <UnifiedLessonNavBar
        currentIndex={5}
        totalLessons={6}
        onPrevLesson={vi.fn()}
        onNextLesson={vi.fn()}
        isLessonCompleted={false}
        nextModuleHref="/learn/nextjs/nx04-dynamic-routes"
        nextModuleCode="NX-04"
      />
    );

    // Dynamic position indicator
    expect(html).toContain("Lesson 6 of 6");

    // Previous button enabled
    expect(html).toContain("Previous lesson");

    // Complete module button is shown
    expect(html).toContain("Complete module");

    // NEVER suggest or link to next module until module is actually completed
    expect(html).not.toContain("Next module: NX-04");
  });

  it("renders final lesson state when module IS completed with Next module link", () => {
    const html = renderToStaticMarkup(
      <UnifiedLessonNavBar
        currentIndex={5}
        totalLessons={6}
        onPrevLesson={vi.fn()}
        onNextLesson={vi.fn()}
        isLessonCompleted={true}
        nextModuleHref="/learn/nextjs/nx04-dynamic-routes"
        nextModuleCode="NX-04"
      />
    );

    // Dynamic position indicator
    expect(html).toContain("Lesson 6 of 6");

    // Displays Next module link with code
    expect(html).toContain("Next module: NX-04");
    expect(html).toContain("href=\"/learn/nextjs/nx04-dynamic-routes\"");

    // Does not show Complete module once already completed
    expect(html).not.toContain("Complete module");
  });

  it("renders course completed banner when on final lesson of final module with no next module", () => {
    const html = renderToStaticMarkup(
      <UnifiedLessonNavBar
        currentIndex={5}
        totalLessons={6}
        onPrevLesson={vi.fn()}
        onNextLesson={vi.fn()}
        isLessonCompleted={true}
        nextModuleHref={null}
      />
    );

    expect(html).toContain("Lesson 6 of 6");
    expect(html).toContain("Course completed");
    expect(html).toContain("🎓");
  });
});

describe("Simplified NextjsLessonSidebar", () => {
  const dummySections = [
    { id: "part1", label: "Mental Model" },
    { id: "part2", label: "layout vs template" },
    { id: "part3", label: "Interactive Lab" },
    { id: "part4", label: "Route Groups" },
    { id: "part5", label: "Pitfalls & Traps" },
    { id: "part6", label: "Knowledge Check Quiz" },
  ];

  it("preserves structure, progress, and curriculum link but REMOVES sidebar Prev/Next buttons", () => {
    const html = renderToStaticMarkup(
      <NextjsLessonSidebar
        lessonCode="NX-03"
        sections={dummySections}
        currentIndex={4}
        progressPercent={17}
        completedSectionsCount={1}
        isAuthenticated={true}
        isLessonCompleted={false}
        getStepState={(i) => (i === 4 ? "active" : i === 0 ? "done" : "todo")}
        onSelectSection={vi.fn()}
      />
    );

    // Preserves header and total count
    expect(html).toContain("NX-03 Modules");
    expect(html).toContain("6 parts");

    // Preserves lesson titles
    expect(html).toContain("Mental Model");
    expect(html).toContain("layout vs template");
    expect(html).toContain("Pitfalls &amp; Traps");
    expect(html).toContain("Knowledge Check Quiz");

    // Preserves active and completed states
    expect(html).toContain("In progress");
    expect(html).toContain("Completed");

    // Preserves progress bar and stats
    expect(html).toContain("17%");
    expect(html).toContain("1 of 6 parts completed");

    // Preserves Curriculum hub link
    expect(html).toContain("Next.js Curriculum");

    // CRITICAL: Sidebar Prev and Next buttons MUST BE REMOVED!
    expect(html).not.toContain("← Prev");
    expect(html).not.toContain("Finish Lesson ✓");
  });
});

describe("NextjsLessonNavFooter with Unified Navigation", () => {
  it("renders unified lesson navigation bar instead of duplicate module buttons", () => {
    const html = renderToStaticMarkup(
      <NextjsLessonNavFooter
        currentSlug="nx03-layouts"
        currentIndex={4}
        totalLessons={6}
        onPrevLesson={vi.fn()}
        onNextLesson={vi.fn()}
        isLessonCompleted={false}
      />
    );

    // Single unified navigation bar
    expect(html).toContain("Lesson 5 of 6");
    expect(html).toContain("Previous lesson");
    expect(html).toContain("Next lesson");

    // Confusing duplicate module pagination controls removed
    expect(html).not.toContain("Previous: NX-02");
    expect(html).not.toContain("Next: NX-04");
  });
});
