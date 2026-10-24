import { describe, it, expect } from "vitest";
import {
  REACT_STAGES,
  getAllLessons,
  getLessonBySlug,
  getLessonByCode,
  REACT_CAPSTONE,
} from "../../app/learn/react/data/react-curriculum";
import {
  getReactLessonContent,
  REACT_LESSONS_CONTENT,
} from "../../app/learn/react/data/react-lesson-content";

describe("React Curriculum Integrity & Health Suite", () => {
  it("contains exactly 9 stages and 27 authoritative lessons in curriculum", () => {
    expect(REACT_STAGES.length).toBe(9);
    const lessons = getAllLessons();
    expect(lessons.length).toBe(27);
  });

  it("ensures all 27 lessons have unique codes and slugs", () => {
    const lessons = getAllLessons();
    const codes = new Set<string>();
    const slugs = new Set<string>();

    for (const lesson of lessons) {
      expect(codes.has(lesson.code), `Duplicate lesson code: ${lesson.code}`).toBe(false);
      expect(slugs.has(lesson.slug), `Duplicate lesson slug: ${lesson.slug}`).toBe(false);
      codes.add(lesson.code);
      slugs.add(lesson.slug);
    }

    expect(codes.size).toBe(27);
    expect(slugs.size).toBe(27);
  });

  it("verifies that getLessonBySlug resolves slugs and codes properly", () => {
    const bySlug = getLessonBySlug("react01-what-is-react");
    expect(bySlug).toBeDefined();
    expect(bySlug?.code).toBe("REACT-01");

    const byCode = getLessonByCode("REACT-01");
    expect(byCode).toBeDefined();
    expect(byCode?.slug).toBe("react01-what-is-react");

    const byCapstone = getLessonBySlug("react27-react-capstone-project");
    expect(byCapstone).toBeDefined();
    expect(byCapstone?.code).toBe("REACT-27");
  });

  it("verifies all 27 lessons have rich handcrafted content with scenarios", () => {
    const lessons = getAllLessons();

    for (const lesson of lessons) {
      const content = getReactLessonContent(lesson.slug);
      expect(content, `Missing content for ${lesson.slug}`).toBeDefined();
      expect(content.slug).toBe(lesson.slug);
      expect(content.code).toBe(lesson.code);
      expect(content.title).toBeTruthy();
      expect(content.difficulty).toBeTruthy();

      // Real-world scenario verification (Required for all lessons)
      expect(content.scenario, `Missing scenario in ${lesson.slug}`).toBeDefined();
      expect(content.scenario?.question).toBeTruthy();
      expect(content.scenario?.answer).toBeTruthy();

      // Part 1: Core Concept & Code
      expect(content.part1).toBeDefined();
      expect(content.part1?.title).toBeTruthy();
      expect(content.part1?.bigPicture).toBeTruthy();

      // Part 2: Rules & Cards
      expect(content.part2).toBeDefined();
      expect(content.part2?.rule?.title).toBeTruthy();
      expect(content.part2?.cards?.length).toBeGreaterThanOrEqual(2);

      // Part 3: Mental Model / Walkthrough
      expect(content.part3).toBeDefined();
      expect(content.part3?.title).toBeTruthy();
      expect(content.part3?.points?.length).toBeGreaterThanOrEqual(2);

      // Part 4: Code Comparison (bad / good)
      expect(content.part4).toBeDefined();
      expect(content.part4?.bad).toBeDefined();
      expect(content.part4?.good).toBeDefined();
      expect(content.part4?.whyItMatters).toBeTruthy();

      // Part 5: Interactive Code Sandbox
      expect(content.part5).toBeDefined();
      expect(content.part5?.starterCode).toBeTruthy();

      // Part 6: Summary & Takeaways
      expect(content.part6).toBeDefined();
      expect(content.part6?.takeaways?.length).toBeGreaterThanOrEqual(3);

      // Part 7: Practice Quiz
      expect(content.part7).toBeDefined();
      expect(content.part7?.quiz).toBeDefined();
      expect(content.part7?.quiz?.question).toBeTruthy();
      expect(content.part7?.quiz?.options.length).toBeGreaterThanOrEqual(2);

      // Verify presence in REACT_LESSONS_CONTENT map
      expect(REACT_LESSONS_CONTENT[lesson.slug]).toBeDefined();
    }
  });

  it("verifies that important topics have targeted interview questions", () => {
    // Essential interview topics specified in the curriculum
    const interviewSlugs = [
      "react04-props-and-data-flow",
      "react05-passing-functions-and-callbacks",
      "react06-children-and-slot-composition",
      "react07-state-and-usestate",
      "react08-event-handling-and-updates",
      "react09-lifting-state-up",
      "react10-derived-state-vs-stored-state",
      "react11-conditional-rendering",
      "react12-rendering-lists-and-keys",
      "react13-controlled-inputs-and-forms",
      "react14-useeffect-fundamentals",
      "react15-effect-cleanup-and-mistakes",
      "react16-useref-and-dom-access",
      "react17-usecontext-and-shared-state",
      "react18-render-cycle-and-reconciliation",
      "react19-component-identity-and-state-preservation",
      "react20-data-fetching-and-async-ui",
      "react21-race-conditions-and-cleanup",
      "react22-usereducer-complex-state",
      "react23-performance-memo-usememo-usecallback",
      "react24-custom-hooks",
      "react25-error-boundaries-and-debugging",
      "react26-testing-fundamentals",
      "react27-react-capstone-project",
    ];

    for (const slug of interviewSlugs) {
      const content = getReactLessonContent(slug);
      expect(content.interviewQuestion, `Missing interview question for ${slug}`).toBeDefined();
      expect(content.interviewQuestion?.question).toBeTruthy();
      expect(content.interviewQuestion?.answer).toBeTruthy();
    }
  });

  it("verifies the final Capstone metadata and lesson integration", () => {
    expect(REACT_CAPSTONE.slug).toBe("task-workflow-dashboard");
    expect(REACT_CAPSTONE.prerequisites.length).toBeGreaterThan(0);
    const capstoneLesson = getReactLessonContent("react27-react-capstone-project");
    expect(capstoneLesson.code).toBe("REACT-27");
  });
});
