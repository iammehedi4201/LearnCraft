import { describe, it, expect, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { PartStepper } from "../PartStepper";
import { DataDrivenLessonView } from "../DataDrivenLessonView";
import { sanitizeSequentialCompleted } from "../use-lesson-progress";

// Mock next-auth
vi.mock("next-auth/react", () => ({
  useSession: () => ({ data: null, status: "unauthenticated" }),
  signOut: vi.fn(),
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({ slug: "js01-how-js-runs" }),
}));

// Mock playground component for lightweight test rendering
vi.mock("@/components/playground/Playground", () => ({
  Playground: ({ onRun }: { onRun?: () => void }) => (
    <div data-testid="mock-playground">
      <button onClick={onRun}>Run Code</button>
    </div>
  ),
}));

describe("PartStepper Scroll-Spy Component", () => {
  const dummySections = [
    { id: "part1", label: "Overview & Real-Life Analogy" },
    { id: "part2", label: "Core Concepts & Mechanics" },
    { id: "part3", label: "Mental Model & Structure" },
    { id: "part4", label: "Bad Code vs Clean Code" },
    { id: "part5", label: "Interactive Code Sandbox" },
    { id: "part6", label: "Summary & Key Takeaways" },
    { id: "part7", label: "Knowledge Check Quiz" },
  ];

  it("renders 7 equal segments with sticky positioning and accessible step attributes", () => {
    const html = renderToStaticMarkup(
      <PartStepper
        sections={dummySections}
        activeSectionId="part1"
        currentIndex={0}
        onSelectPart={vi.fn()}
        getStepState={(idx) => (idx === 0 ? "active" : "todo")}
        progressPercent={14}
        sticky={true}
      />
    );

    // Sticky scroll-spy classes
    expect(html).toContain("sticky");
    expect(html).toContain("z-30");
    expect(html).toContain("backdrop-blur");

    // Accessibility
    expect(html).toContain("aria-label=\"Lesson parts\"");
    expect(html).toContain("aria-current=\"step\"");

    // Part label & progress
    expect(html).toContain("Part 1 of 7");
    expect(html).toContain("Overview &amp; Real-Life Analogy");
    expect(html).toContain("14%");
  });

  it("highlights completed segments with accent color and upcoming segments as muted", () => {
    const html = renderToStaticMarkup(
      <PartStepper
        sections={dummySections}
        activeSectionId="part3"
        currentIndex={2}
        onSelectPart={vi.fn()}
        getStepState={(idx) => (idx < 2 ? "done" : idx === 2 ? "active" : "todo")}
        progressPercent={28}
        sticky={true}
      />
    );

    expect(html).toContain("Part 3 of 7");
    expect(html).toContain("Mental Model &amp; Structure");
    expect(html).toContain("bg-white/40"); // Done segment fill (monochrome)
    expect(html).toContain("bg-white"); // Active segment highlight (monochrome)
  });

  it("pins to viewport top with 0px gap fallback to prevent unwanted space when scrolling down", () => {
    const html = renderToStaticMarkup(
      <PartStepper
        sections={dummySections}
        activeSectionId="part2"
        currentIndex={1}
        onSelectPart={vi.fn()}
        getStepState={(idx) => (idx === 0 ? "done" : idx === 1 ? "active" : "todo")}
        progressPercent={28}
        floating={true}
      />
    );

    // Verifies 0px fallback for zero gap above sticky stepper
    expect(html).toContain("top:var(--navbar-offset, 0px)");
    expect(html).toContain("bg-[#0E121B]/95");
  });
});

describe("DataDrivenLessonView Single Vertical Layout", () => {
  const dummyContent = {
    sections: [
      { id: "part1", label: "Overview & Real-Life Analogy" },
      { id: "part2", label: "Core Concepts & Mechanics" },
      { id: "part3", label: "Mental Model & Structure" },
      { id: "part4", label: "Bad Code vs Clean Code" },
      { id: "part5", label: "Interactive Code Sandbox" },
      { id: "part6", label: "Summary & Key Takeaways" },
      { id: "part7", label: "Knowledge Check Quiz" },
    ],
    part1: {
      title: "How JavaScript Executes",
      explanation: "JavaScript runs in an engine with an event loop.",
      analogy: "Think of it as a single-chef restaurant kitchen.",
    },
    part2: {
      title: "Engines and Runtimes",
      intro: "Core mechanics of V8 and Node.",
    },
    part3: {
      title: "Call Stack and Event Loop",
      intro: "The mental model of the execution context.",
    },
    part4: {
      title: "Blocking vs Non-blocking Code",
      bad: { title: "Blocking Synchronous Loop", code: "while(true){}", explanation: "Freezes UI" },
      good: { title: "Async Scheduling", code: "setTimeout(()=>{},0)", explanation: "Non-blocking" },
    },
    part5: {
      title: "Live Execution Sandbox",
      intro: "Run some JavaScript code.",
      starterCode: "console.log('Hello');",
    },
    part6: {
      title: "Core Takeaways",
      takeaways: [{ title: "Non-blocking", desc: "Never freeze the event loop." }],
    },
    part7: {
      title: "Knowledge Check Quiz",
      quiz: {
        question: "Is JS single threaded?",
        options: ["Yes", "No"],
        correctIndex: 0,
        explanation: "JavaScript has a single call stack.",
      },
    },
  };

  const dummyLesson = {
    slug: "js01-how-js-runs",
    code: "JS-01",
    title: "How JavaScript Runs",
    minutes: 15,
  };

  it("renders all 7 parts as stacked <section> elements with IDs part-1 through part-7", () => {
    const html = renderToStaticMarkup(
      <DataDrivenLessonView
        trackKey="javascript"
        trackTitle="JavaScript"
        trackHref="/learn/javascript"
        lesson={dummyLesson}
        content={dummyContent as any}
        nextLesson={{ slug: "js02-variables", code: "JS-02", title: "Variables & Types" }}
      />
    );

    // All 7 parts present simultaneously in the DOM with part-1 to part-7 IDs
    expect(html).toContain("id=\"part-1\"");
    expect(html).toContain("id=\"part-2\"");
    expect(html).toContain("id=\"part-3\"");
    expect(html).toContain("id=\"part-4\"");
    expect(html).toContain("id=\"part-5\"");
    expect(html).toContain("id=\"part-6\"");
    expect(html).toContain("id=\"part-7\"");

    // Each section preserves its badge
    expect(html).toContain("PART 01 · CORE CONCEPT");
    expect(html).toContain("PART 02 · CORE MECHANICS");
    expect(html).toContain("PART 03 · DEEP DIVE &amp; STRUCTURE");
    expect(html).toContain("PART 04 · PATTERNS &amp; TRAPS");
    expect(html).toContain("PART 05 · INTERACTIVE SANDBOX");
    expect(html).toContain("PART 06 · SUMMARY &amp; KEY TAKEAWAYS");
    expect(html).toContain("PART 07 · KNOWLEDGE CHECK QUIZ");

    // Scroll margins for sticky header offset
    expect(html).toContain("scroll-mt-36");
    expect(html).toContain("scroll-margin-top:calc(var(--navbar-offset, 64px) + 76px)");

    // Floating stepper styling: flat top, rounded bottom, border, shadow, backdrop blur
    expect(html).toContain("rounded-b-2xl");
    expect(html).toContain("shadow-xl");
    expect(html).toContain("backdrop-blur");
    expect(html).toContain("var(--navbar-offset");

    // Old previous/next pagination footer and "Part X of 7" buttons must be gone
    expect(html).not.toContain("Previous lesson");
    expect(html).not.toContain("Lesson 1 of 7");

    // End of page renders single "Next lesson →" button
    expect(html).toContain("Next lesson →");
    expect(html).toContain("href=\"/learn/javascript/js02-variables\"");
  });
});

describe("sanitizeSequentialCompleted — Contiguous Progress Engine", () => {
  const sections = [
    { id: "part1", label: "Part 1" },
    { id: "part2", label: "Part 2" },
    { id: "part3", label: "Part 3" },
    { id: "part4", label: "Part 4" },
    { id: "part5", label: "Part 5" },
    { id: "part6", label: "Part 6" },
    { id: "part7", label: "Part 7" },
  ];

  it("prunes out-of-order anomalies such as part6 being marked before part3, 4, 5", () => {
    const input = ["part1", "part2", "part6"];
    const result = sanitizeSequentialCompleted(input, sections);

    // Only part1 and part2 are retained; part6 is pruned out because part3 was not completed!
    expect(Array.from(result)).toEqual(["part1", "part2"]);
  });

  it("returns empty set when initial section is missing even if later sections exist", () => {
    const input = ["part6", "part7"];
    const result = sanitizeSequentialCompleted(input, sections);

    expect(Array.from(result)).toEqual([]);
  });

  it("preserves fully contiguous progress from part1 through part7", () => {
    const input = ["part1", "part2", "part3", "part4", "part5", "part6", "part7"];
    const result = sanitizeSequentialCompleted(input, sections);

    expect(Array.from(result)).toEqual(input);
  });
});

