import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx14RevalidatingDataContent: StandardLessonContent = {
  slug: "nx14-revalidating-data",
  code: "NX-14",
  title: "Caching and Revalidating Data",
  subtitle: "Cache public data with 'use cache' and refresh stale pages on-demand using revalidatePath, revalidateTag, and updateTag.",
  difficulty: "Difficult",
  scenario: {
    question: "An admin changes a course title. The database has the new title, but the courses page still shows the old one. What should you check?",
    answer: "Check whether the page is using cached data and whether the update flow refreshes the right route or data tag after the save succeeds.",
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
    title: "Caching and Revalidating Data",
    bigPicture: "Caching means keeping a saved copy of a result so your app can reuse it without repeating slow work. Think of a public course catalog: if 1,000 students open the page every minute, querying the database 1,000 times for the exact same list wastes database resources. Instead, Next.js caches the result. But when an admin updates a course title, the cached HTML still displays the old title! Revalidation is how you tell Next.js: 'The database has changed. Refresh the saved copy so learners see the new title!'",
    codeSnippet: `// 1. CACHING: Save public course data with modern Cache Components (Next.js 16)
import { cacheLife, cacheTag, revalidatePath, updateTag } from "next/cache";

export async function getPublicCourses() {
  "use cache";
  cacheLife("hours");        // Built-in profile: keep cached for hours
  cacheTag("courses");       // Label this saved result with a tag

  return database.course.findMany();
}

// 2. REVALIDATING: Refresh the cache after a Server Action update
export async function updateCourseTitle(formData: FormData) {
  "use server";
  const courseId = formData.get("courseId");
  const newTitle = formData.get("title");

  // Step A: Save the new title to your database first
  await database.course.update({
    where: { id: String(courseId) },
    data: { title: String(newTitle) },
  });

  // Step B: Refresh the cached data so users see the change!
  // In Next.js 16 Cache Components:
  updateTag("courses");

  // Or target the specific route URL:
  revalidatePath("/courses");

  return { success: true };
}`,
    breakdownTitle: "How Caching & Revalidation Work Step by Step",
    breakdownItems: [
      {
        title: "1. The 'use cache' Directive",
        desc: "Tells Next.js that this function's output can be safely saved and reused for other visitors without querying the database again.",
      },
      {
        title: "2. cacheLife() and cacheTag()",
        desc: "cacheLife('hours') defines how long to keep the cache fresh. cacheTag('courses') labels the cached data with a tag so you can invalidate it anytime.",
      },
      {
        title: "3. Database Mutation First",
        desc: "Your Server Action saves the new title to PostgreSQL or MongoDB before touching any cache.",
      },
      {
        title: "4. updateTag() and revalidatePath()",
        desc: "updateTag('courses') immediately shows the updated data in Server Actions. revalidatePath('/courses') clears the cached HTML for that route URL.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "The 3 Questions of Caching",
      content: "Before caching anything, understand three things: 1) What is reused? 2) How fresh does it need to be? 3) How does it get refreshed when someone edits it? Only cache safe public data, and ALWAYS revalidate right after a database write.",
    },
    cards: [
      {
        number: "01",
        tag: "MODERN CACHING",
        title: "Cache Components ('use cache')",
        description: "In Next.js 16 with cacheComponents enabled, add 'use cache' to any async function or component to cache database queries and computations directly.",
        color: "purple",
      },
      {
        number: "02",
        tag: "LEGACY FETCH",
        title: "fetch() Caching Options",
        description: "In previous Next.js versions, caching was configured on HTTP fetch calls using cache: 'force-cache' and next: { revalidate: 60 }. Know this when reading existing projects.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "ON-DEMAND REFRESH",
        title: "revalidatePath vs updateTag",
        description: "Use revalidatePath('/path') to refresh a specific route URL. In Next.js 16 Cache Components, use updateTag('tag') in Server Actions so the user sees their change immediately.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "A complete roadmap for using the modern Cache Components model, previous fetch caching, and refresh rules:",
    points: [
      {
        title: "1. Checking Which Caching Model Your Project Uses",
        content: "In Next.js 16, check next.config.ts for cacheComponents: true. If enabled, use 'use cache', cacheLife, and cacheTag. If not enabled, the project may use the previous caching model with fetch() options. Check the project setup before copying code!",
      },
      {
        title: "2. The Modern 'use cache' vs Previous fetch() Model",
        content: "In the previous model, caching was limited to HTTP fetch('...', { cache: 'force-cache', next: { revalidate: 60 } }). Modern Cache Components with 'use cache' can cache any server function—including Prisma queries, complex computations, or external APIs!",
      },
      {
        title: "3. Choosing the Right Revalidation Function",
        content: "revalidatePath('/courses') targets a single page URL. revalidateTag('courses', 'max') marks tagged data as stale across multiple pages with a short acceptable delay. In Next.js 16, updateTag('courses') immediately updates the view for the user who made the change.",
      },
      {
        title: "4. What to Cache vs What to NEVER Cache",
        content: "Safe to cache: Public course catalog, blog articles, product listings. NEVER cache in a shared cache: Private user account details, shopping carts, personal settings, or live stock availability that must always be 100% current.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    problem: "Serving stale data indefinitely or failing to refresh the cache after database changes.",
    bad: {
      title: "Insecure / Stale: Updating Database but Forgetting to Invalidate the Cache",
      code: `// ❌ ANTI-PATTERN: The database updates, but the website still shows the old title!
"use server";

export async function updateCourse(courseId: string, newTitle: string) {
  // 1. Update the database record:
  await database.course.update({
    where: { id: courseId },
    data: { title: newTitle },
  });

  // 💥 MISTAKE: Forgot updateTag("courses") and revalidatePath("/courses")!
  // The database has the new title, but Next.js continues serving the cached page!
  // The user refreshes their browser and thinks their edit failed!
}`,
      explanation: "Without revalidation, Next.js continues serving the stale cached result indefinitely. After modifying data, you must call updateTag() or revalidatePath().",
    },
    good: {
      title: "Clean Solution: Mutate Database First, Then Invalidate Tags & Path",
      code: `// ✅ CLEAN SOLUTION: Update DB first, then immediately purge the cache
"use server";
import { revalidatePath, updateTag } from "next/cache";

export async function updateCourse(courseId: string, newTitle: string) {
  // 1. Save changes to the database first
  await database.course.update({
    where: { id: courseId },
    data: { title: newTitle },
  });

  // 2. Immediately refresh the cache tags and route path!
  // In Next.js 16: updateTag shows the change to the user immediately:
  updateTag("courses");

  // Also purge the cached HTML for the public courses page:
  revalidatePath("/courses");

  return { success: true };
}`,
      explanation: "Updating the database first and then immediately calling updateTag() and revalidatePath() ensures learners see fresh content instantly while retaining maximum cache performance.",
    },
    whyItMatters: "In production, caching allows your server to handle thousands of requests per second with minimal CPU and database load. But a cache without an invalidation rule causes stale data bugs. Always pair database writes with cache revalidation.",
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Here is how modern caching with 'use cache' pairs with a Server Action mutation and cache invalidation:",
    starterCode: `// app/actions.ts
"use server";

import { cacheLife, cacheTag, revalidatePath, updateTag } from "next/cache";

// 1. Cached database fetcher function:
export async function getCatalogAction() {
  "use cache";
  cacheLife("hours");
  cacheTag("catalog");

  return [
    { id: "nextjs-101", title: "Next.js App Router Mastery", enrolled: 420 },
    { id: "ts-101", title: "TypeScript Production Patterns", enrolled: 310 },
  ];
}

// 2. Mutation action that invalidates the cache:
export async function updateCourseTitleAction(courseId: string, newTitle: string) {
  console.log("Saving new title to database:", { courseId, newTitle });

  // Refresh both the tag and the route:
  updateTag("catalog");
  revalidatePath("/courses");

  return { success: true, updatedTitle: newTitle };
}`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "An admin changes a course title. The database has the new title, but the website still displays the old one. What should you investigate?",
      options: [
        "Check which part of the data or page is cached, and ensure the Server Action calls updateTag() or revalidatePath() after the database update succeeds",
        "Next.js cannot display updated database titles without rebuilding the application from source",
        "The browser monitor must be unplugged and replugged",
        "The admin must delete their database and recreate it every time a title changes",
      ],
      correctIndex: 0,
      explanation: "Next.js caches rendered pages and 'use cache' data for speed. When the database updates, you must call updateTag() or revalidatePath() so Next.js purges the stale cache and serves the new title.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "What is Caching",
        desc: "Keeping a saved copy of a result so your app can reuse it, reducing repeated database queries and making repeat visits instant.",
      },
      {
        title: "Modern 'use cache'",
        desc: "In Next.js 16 Cache Components, use 'use cache', cacheLife('hours'), and cacheTag('name') to cache any server function directly.",
      },
      {
        title: "Revalidation APIs",
        desc: "revalidatePath('/courses') refreshes a route, revalidateTag('tag') marks data stale, and updateTag('tag') immediately shows changes in Server Actions.",
      },
      {
        title: "Safe Caching Rules",
        desc: "Cache public data like course catalogs and blog posts. Never store private user data or shopping carts in a public cache.",
      },
    ],
    nextLessonPreview: {
      title: "Page Titles and Metadata",
      desc: "Learn how to configure browser tab titles, descriptions, and dynamic SEO cards with Next.js metadata.",
    },
  },
};
