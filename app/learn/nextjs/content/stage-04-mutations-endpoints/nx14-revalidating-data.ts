import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx14RevalidatingDataContent: StandardLessonContent = {
  slug: "nx14-revalidating-data",
  code: "NX-14",
  title: "Revalidating Data After a Change",
  subtitle: "Tell Next.js to purge stale cached pages and fetch fresh data using revalidatePath and revalidateTag.",
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
    bigPicture: "Next.js caches rendered pages so they load almost instantly without querying the database every millisecond. But when you update data (like editing a course title), the cached HTML still displays the old title! Revalidation is how you tell Next.js: 'The database has changed. Throw away the saved copy of this page and generate a fresh one!'",
    codeSnippet: `// app/actions.ts
"use server";

import { revalidatePath } from "next/cache";

export async function updateCourseTitle(formData: FormData) {
  const courseId = formData.get("courseId");
  const newTitle = formData.get("title");

  // Step 1: Update the record in your database
  await db.course.update({
    where: { id: String(courseId) },
    data: { title: String(newTitle) },
  });

  // Step 2: PURGE THE CACHE!
  // Tells Next.js to throw away the saved HTML for "/courses"
  revalidatePath("/courses");

  return { success: true };
}`,
    breakdownTitle: "How Revalidation Works Step by Step",
    breakdownItems: [
      {
        title: "1. The Database Updates First",
        desc: "Your Server Action saves the new title to PostgreSQL or MongoDB.",
      },
      {
        title: "2. Calling revalidatePath('/courses')",
        desc: "Next.js marks the cached version of '/courses' as stale and clears it from memory.",
      },
      {
        title: "3. Fresh Page Generation",
        desc: "The next time anyone visits or refreshes '/courses', Next.js runs the Server Component fresh and displays the updated title.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "The Cache Invalidation Rule",
      content: "Whenever a Server Action modifies data in your database, call revalidatePath() or revalidateTag() right after saving to ensure users see fresh content.",
    },
    cards: [
      {
        number: "01",
        tag: "PATH REVALIDATION",
        title: "revalidatePath('/path')",
        description: "Best when you know the exact URL that changed, such as refreshing the course catalog at '/courses'.",
        color: "purple",
      },
      {
        number: "02",
        tag: "TAG REVALIDATION",
        title: "revalidateTag('tag')",
        description: "Best when the same data appears in multiple different pages (e.g. user profile picture in header, sidebar, and settings).",
        color: "cyan",
      },
      {
        number: "03",
        tag: "BEST PERFORMANCE",
        title: "Instant Speed + Fresh Data",
        description: "Pages stay blazingly fast because they remain cached until someone actually edits the database.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "The difference between revalidatePath and revalidateTag:",
    points: [
      {
        title: "1. When to use revalidatePath",
        content: "Use revalidatePath('/courses') when you only need to refresh one specific page URL or folder path after an edit.",
      },
      {
        title: "2. When to use revalidateTag",
        content: "If you tag a data fetch with fetch('...', { next: { tags: ['courses'] } }), calling revalidateTag('courses') automatically purges every single page that displays courses!",
      },
      {
        title: "3. Layout vs Page level",
        content: "You can revalidate an entire layout hierarchy by passing the second argument: revalidatePath('/courses', 'layout').",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Saving to Database but Forgetting revalidatePath",
      code: `// ❌ THE BUG: The user edits their name, but the page doesn't update!
"use server";

export async function updateUserName(newName: string) {
  await db.user.update({ data: { name: newName } });

  // 💥 OOPS! Forgot revalidatePath("/profile")!
  // The database updated, but Next.js continues serving the cached profile page!
  // The user refreshes the page and thinks their edit failed!
}`,
      explanation: "Without revalidatePath, Next.js serves the cached HTML copy indefinitely. Always purge the cache after modifying data.",
    },
    good: {
      title: "Always Invalidate Cache After Mutations",
      code: `// ✅ THE FIX: Call revalidatePath right after saving
"use server";
import { revalidatePath } from "next/cache";

export async function updateUserName(newName: string) {
  await db.user.update({ data: { name: newName } });

  // ✅ Next.js purges the old cache and serves fresh data immediately!
  revalidatePath("/profile");
}`,
      explanation: "Calling revalidatePath guarantees that the user sees their changes instantly on their next page view.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Here is how a clean mutation action pairs a database update with cache revalidation:",
    starterCode: `// app/actions.ts
"use server";

import { revalidatePath } from "next/cache";

export async function toggleCoursePublishAction(courseId: string, isPublished: boolean) {
  // 1. Update database status:
  console.log("Updating course publish status in DB:", { courseId, isPublished });

  // 2. Invalidate both the public catalog and the admin management pages:
  revalidatePath("/courses");
  revalidatePath("/admin/courses");

  return { success: true };
}`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "An admin edits a course title in the database, but the website still displays the old title. What is the most likely cause?",
      options: [
        "The page is cached, and the Server Action forgot to call revalidatePath('/courses') after updating the database",
        "Next.js does not support editing database records",
        "The browser monitor is unplugged",
        "The admin must delete their entire operating system to see updates",
      ],
      correctIndex: 0,
      explanation: "Next.js caches rendered pages for performance. After modifying data in a database, you must call revalidatePath or revalidateTag so Next.js purges the stale cache.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Cache Purging",
        desc: "revalidatePath('/path') purges cached HTML so the next page visit renders fresh data.",
      },
      {
        title: "Tag Revalidation",
        desc: "revalidateTag('tag') invalidates all fetch queries sharing a specific tag across the entire app.",
      },
      {
        title: "Call Right After Writes",
        desc: "Always trigger revalidation immediately after saving database mutations in Server Actions.",
      },
    ],
    nextLessonPreview: {
      title: "Page Titles and Metadata",
      desc: "Learn how to configure browser tab titles, descriptions, and dynamic SEO cards with Next.js metadata.",
    },
  },
};
