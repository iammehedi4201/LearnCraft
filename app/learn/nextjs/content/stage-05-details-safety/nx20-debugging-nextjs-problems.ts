import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx20DebuggingNextjsProblemsContent: StandardLessonContent = {
  slug: "nx20-debugging-nextjs-problems",
  code: "NX-20",
  title: "Debugging Next.js Problems",
  subtitle: "Systematically isolate, diagnose, and resolve common Next.js App Router errors with a practical checklist.",
  difficulty: "Moderate",
  scenario: {
    question: "You get an error saying that useState can only be used in a Client Component. What should you check?",
    answer: "Check that the component using useState is a Client Component and has 'use client' at the top. Keep the client boundary as small as practical.",
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
    title: "Debugging Next.js Problems",
    bigPicture: "When a Next.js page fails, first identify where the problem happens: a wrong file name, an incorrect route, a Server/Client Component mismatch, a failed data request, a missing environment variable, or a TypeScript compilation error.",
    codeSnippet: `// Practical Debugging Checklist:
// 1. Read the first useful error message, not just the last line.
// 2. Check the file path and route convention (e.g. page.tsx vs index.tsx).
// 3. Check whether the code uses browser APIs or event handlers in a Server Component.
// 4. Check data requests and their response status codes.
// 5. Check environment variables and whether they are available in the current environment.
// 6. Make one change at a time, then run the relevant checks again.`,
    breakdownTitle: "Common Error Categories",
    breakdownItems: [
      {
        title: "Boundary Mismatch",
        desc: "Using useState, useEffect, or window inside a Server Component without 'use client'.",
      },
      {
        title: "File Convention Typos",
        desc: "Naming a file Page.tsx with a capital P, or using Pages Router naming like _app.tsx.",
      },
      {
        title: "Missing Environment Variables",
        desc: "Calling a database or Stripe API when process.env.API_KEY is undefined on local or preview environments.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Systematic Debugging Rule",
      content: "Don't guess randomly. Isolate the failing layer: identify if the failure is build-time, server-render-time, or client-hydration-time.",
    },
    cards: [
      {
        number: "01",
        tag: "READ TERMINAL",
        title: "First Useful Line",
        description: "The top of the error stack contains the exact file and line number; bottom lines are usually Next.js internal frames.",
        color: "purple",
      },
      {
        number: "02",
        tag: "ISOLATE BOUNDARY",
        title: "Check Environment",
        description: "Look at whether the error printed in your VS Code terminal (server) or your browser DevTools console (client).",
        color: "cyan",
      },
      {
        number: "03",
        tag: "ITERATE",
        title: "One Fix at a Time",
        description: "Apply one targeted fix and re-test to verify causality rather than changing multiple files at once.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to resolve the most common Next.js bugs:",
    points: [
      {
        title: "1. useState in Server Component error",
        content: "Add 'use client' at the top of the file, or extract the interactive piece into a small Client Component.",
      },
      {
        title: "2. Hydration mismatch error",
        content: "Occurs when server HTML differs from initial client render (e.g. rendering new Date().toLocaleTimeString() or checking window). Use useEffect for client-only timestamps.",
      },
      {
        title: "3. 404 Route Not Found",
        content: "Verify that the folder has a page.tsx file spelled in all lowercase letters, and check route group parentheses.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Hydration Mismatch from Date.now() or window",
      code: `// Rendering dynamic browser values during initial SSR:
export default function Clock() {
  // Server generates time X, but by hydration client time is X+1!
  // Next.js warns: Text content does not match server-rendered HTML!
  return <p>Current time: {new Date().toLocaleTimeString()}</p>;
}`,
      explanation: "Server and client must produce identical initial HTML. Differences trigger React hydration warnings.",
    },
    good: {
      title: "Mounting Client-Only Values with useEffect",
      code: `"use client";
import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
  }, []);

  if (!time) return <p>Loading time...</p>;
  return <p>Current time: {time}</p>;
}`,
      explanation: "Renders consistent placeholder HTML on server and updates cleanly after hydration.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Explore a safe client-only mounted pattern:",
    starterCode: `"use client";

import { useState, useEffect } from "react";

export default function SafeBrowserRender() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={{ padding: "1rem", border: "1px solid #333" }}>
      <h4>Safe Hydration Pattern</h4>
      <p>
        Status: {mounted ? "✅ Hydrated in browser window" : "⏳ Pre-rendered on server"}
      </p>
    </div>
  );
}`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Where should you first look when a Next.js Server Component throws a runtime error?",
      options: [
        "In your terminal / server console output, looking at the first lines of the error stack",
        "In your computer's BIOS settings",
        "In your browser's history tab",
        "In your router's WiFi password settings",
      ],
      correctIndex: 0,
      explanation: "Server Components execute on the server, so their logs and error stacks appear in the Node.js / server terminal console.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Follow the Checklist",
        desc: "Check file paths, Server/Client boundaries, network statuses, and environment variables.",
      },
      {
        title: "Terminal vs DevTools",
        desc: "Server errors log to the terminal; Client errors log to browser DevTools.",
      },
      {
        title: "Hydration Consistency",
        desc: "Ensure initial server HTML and initial client render match exactly to prevent hydration warnings.",
      },
    ],
  },
};
