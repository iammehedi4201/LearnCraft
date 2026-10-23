import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx14RevalidatingDataContent: StandardLessonContent = {
  slug: "nx14-revalidating-data",
  code: "NX-14",
  title: "Revalidating Data After a Change",
  subtitle: "Purge stale caches on-demand with revalidatePath and revalidateTag after mutating data.",
  difficulty: "Difficult",
  scenario: {
    question: "An admin edits a course title, but the course list still shows the old title because of the way its data is cached. What should you consider?",
    answer: "After saving the new title, revalidate the affected route or data tag using the method that matches the project's caching setup.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
    { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
  ],
  part1: {
    title: "Revalidating Data After a Change",
    bigPicture: "Sometimes a page displays saved or cached data. After changing that data in a Server Action or Route Handler, the app must tell Next.js to purge the cached HTML and data so users immediately see updated content. Next.js provides revalidatePath and revalidateTag for this purpose.",
    codeSnippet: `// app/actions.ts
"use server";

import { revalidatePath } from "next/cache";

export async function updateCourseTitle(courseId: string, newTitle: string) {
  // 1. Check user permission
  // 2. Validate input
  // 3. Update database record:
  await db.course.update({ where: { id: courseId }, data: { title: newTitle } });

  // 4. Invalidate the cached course list page so it refreshes:
  revalidatePath("/courses");
}`,
    breakdownTitle: "Revalidation Mechanics",
    breakdownItems: [
      {
        title: "revalidatePath('/path')",
        desc: "Purges all cached data and rendered HTML for a specific route path or hierarchy.",
      },
      {
        title: "revalidateTag('tag-name')",
        desc: "Purges only the specific fetch requests that were tagged with { next: { tags: ['tag-name'] } }.",
      },
      {
        title: "Next Request Serves Fresh Data",
        desc: "The very next visit to the route triggers fresh data retrieval without requiring redeployment.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Cache Coherence Rule",
      content: "Whenever a mutation modifies data that is displayed on cached pages, call revalidatePath or revalidateTag immediately after persisting the change.",
    },
    cards: [
      {
        number: "01",
        tag: "FRESH DATA",
        title: "Immediate Consistency",
        description: "Users see their edits instantly without waiting for an arbitrary background timer to expire.",
        color: "purple",
      },
      {
        number: "02",
        tag: "PATH PURGE",
        title: "revalidatePath",
        description: "Best when you know exactly which page URL needs to reflect the new state (e.g. /courses).",
        color: "cyan",
      },
      {
        number: "03",
        tag: "TAG PURGE",
        title: "revalidateTag",
        description: "Best for data that appears in multiple unrelated places across the app (like a user avatar).",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is the lifecycle of an on-demand revalidation:",
    points: [
      {
        title: "1. The user mutates data",
        content: "A user submits a form that updates a record in PostgreSQL via a Server Action.",
      },
      {
        title: "2. The server saves the change",
        content: "The action writes to the database and awaits confirmation that the record was updated.",
      },
      {
        title: "3. Invalidation triggers",
        content: "revalidatePath('/courses') marks the route cache as stale. Next.js fetches fresh data for the caller and updates the UI.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Forgetting to Revalidate After DB Writes",
      code: `"use server";
export async function updateTitle(id: string, title: string) {
  await db.updateCourse(id, title);
  // ❌ Missing revalidatePath!
  // The user navigates back to /courses and still sees the old title!
}`,
      explanation: "Next.js aggressively caches rendered pages; without revalidation, cached HTML continues serving stale data.",
    },
    good: {
      title: "Calling revalidatePath Directly After Write",
      code: `"use server";
import { revalidatePath } from "next/cache";

export async function updateTitle(id: string, title: string) {
  await db.updateCourse(id, title);
  // ✅ Purges cache so fresh data renders immediately
  revalidatePath("/courses");
}`,
      explanation: "Ensures the catalog page re-fetches updated database records on the next render.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Explore how revalidation functions in an async Server Action:",
    starterCode: `// app/actions.ts
"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function editCourseTitleAction(courseId: string, newTitle: string) {
  console.log("1. Authenticating user session...");
  console.log("2. Updating DB record for course:", courseId, "to:", newTitle);

  // Invalidate by path:
  revalidatePath("/courses");

  // Invalidate by tag:
  revalidateTag(\`course-\${courseId}\`);

  return { success: true };
}`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the purpose of revalidatePath('/courses') inside a Server Action?",
      options: [
        "It tells Next.js to purge the cached version of /courses so fresh data is loaded",
        "It permanently deletes the /courses folder from your hard drive",
        "It redirects all users to a 404 error page",
        "It compresses all CSS files into a zip archive",
      ],
      correctIndex: 0,
      explanation: "revalidatePath purges the cached route segment on-demand, ensuring subsequent requests fetch and render fresh database records.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Cache Invalidation",
        desc: "revalidatePath and revalidateTag clear stale data after server mutations.",
      },
      {
        title: "Path vs Tag",
        desc: "Use path for specific route URLs; use tags for data shared across multiple pages.",
      },
      {
        title: "Runs on Server",
        desc: "Must be called inside Server Actions, Route Handlers, or server-side functions.",
      },
    ],
    nextLessonPreview: {
      title: "Page Titles and Metadata",
      desc: "Learn how to export static and dynamic metadata to customize browser tab titles and SEO tags.",
    },
  },
};
