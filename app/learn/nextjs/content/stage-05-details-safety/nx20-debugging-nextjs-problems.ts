import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx20DebuggingNextjsProblemsContent: StandardLessonContent = {
  slug: "nx20-debugging-nextjs-problems",
  code: "NX-20",
  title: "Debugging Next.js Problems",
  subtitle: "Systematically isolate, diagnose, and resolve common Next.js App Router errors with a practical checklist.",
  difficulty: "Moderate",
  scenario: {
    question: "You get an error saying that `useState` can only be used in a Client Component. What should you check?",
    answer: "Check that the component using `useState` is a Client Component and has `\"use client\"` at the top. Keep the client boundary as small as practical.",
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
    bigPicture: "When a Next.js app shows a red error screen, don't panic! 90% of Next.js beginner errors fall into three simple buckets: using React state in a Server Component, mismatching HTML during hydration, or typos in file names. The secret to fast debugging is knowing WHERE to look: Server errors log in your VS Code terminal, while Client errors log in your browser DevTools console.",
    codeSnippet: `// ❌ THE #1 MOST COMMON NEXT.JS ERROR:
// Error: "useState can only be used in a Client Component."

// app/counter/page.tsx (This is a Server Component by default!)
import { useState } from "react";

export default function Counter() {
  // 💥 CRASH: Server Components run on Node.js and cannot hold interactive state!
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// ─────────────────────────────────────────────────────────────
// ✅ THE 1-LINE FIX: Add "use client" at the very top of the file!
// ─────────────────────────────────────────────────────────────
"use client"; // Tells Next.js to enable React hooks and event listeners!

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0); // ✅ Works perfectly!
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`,
    breakdownTitle: "The 3-Step Debugging Checklist",
    breakdownItems: [
      {
        title: "1. Look at Where It Logged",
        desc: "If the error appears in your terminal, it happened on the server (Server Component or Server Action). If it appears in browser DevTools, it happened on the client.",
      },
      {
        title: "2. Read the First Useful Line",
        desc: "Don't get overwhelmed by long stack traces. Look at the very top line for the exact file name (e.g. app/courses/page.tsx) and line number.",
      },
      {
        title: "3. Check Special File Names",
        desc: "Make sure special files are all lowercase: page.tsx (not Page.tsx), layout.tsx, loading.tsx, error.tsx, and not-found.tsx.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Systematic Isolation Rule",
      content: "Don't make random changes to package.json or dependencies. First identify if the failure is: (1) a build typo, (2) a server boundary mismatch, or (3) a client hydration issue.",
    },
    cards: [
      {
        number: "01",
        tag: "SERVER VS CLIENT",
        title: "Terminal vs DevTools",
        description: "Server Components log to your command line terminal. Client Components log to the browser DevTools console.",
        color: "purple",
      },
      {
        number: "02",
        tag: "TOP OF STACK",
        title: "Read the Top Line",
        description: "The top line of the error tells you the exact component and line number. Ignore the internal Next.js node_modules frames.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "HYDRATION ERROR",
        title: "Hydration Mismatches",
        description: "Happens when server HTML differs from browser render (e.g. using new Date() or window before component mounts).",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "How to fix the 3 most frequent Next.js App Router errors:",
    points: [
      {
        title: "1. 'useState / useEffect only in Client Component'",
        content: "Fix: Add 'use client' at the very top of the file, or move the interactive button into a separate component file marked with 'use client'.",
      },
      {
        title: "2. 'Text content did not match server-rendered HTML'",
        content: "Fix: Occurs when rendering client-only values like window.innerWidth or new Date() on initial load. Use an useEffect to set state only after mounting in the browser.",
      },
      {
        title: "3. 'Module not found / Can't resolve'",
        content: "Fix: Verify your import path and check that required packages are installed in package.json dependencies.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Directly Rendering Browser-Only Values (Hydration Crash)",
      code: `// ❌ HYDRATION ERROR: Server HTML and Browser HTML will not match!
"use client";

export default function TimeDisplay() {
  // Server renders at 10:00:00 AM, but by the time the browser loads,
  // it is 10:00:02 AM! React detects the mismatch and crashes with a warning!
  return <p>Current Time: {new Date().toLocaleTimeString()}</p>;
}`,
      explanation: "Initial client render must match the server HTML exactly. Values that change between server and browser cause hydration errors.",
    },
    good: {
      title: "Wait Until Component Mounts with useEffect",
      code: `// ✅ CLEAN FIX: Render browser-specific values after mount
"use client";
import { useState, useEffect } from "react";

export default function TimeDisplay() {
  const [time, setTime] = useState("");

  useEffect(() => {
    // Only runs in the browser AFTER hydration succeeds:
    setTime(new Date().toLocaleTimeString());
  }, []);

  return <p>Current Time: {time || "Loading time..."}</p>;
}`,
      explanation: "Using useEffect ensures the initial HTML matches the server, avoiding any hydration mismatch warnings.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Here is the standard mounted pattern used in production to safely render browser-only data:",
    starterCode: `// app/components/ClientOnlyValue.tsx
"use client";

import React, { useState, useEffect } from "react";

export default function SafeBrowserRender() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Runs only in the browser window:
    setIsClient(true);
  }, []);

  return (
    <div style={{ padding: "1rem", border: "1px solid #d1d5db", borderRadius: "6px" }}>
      <h4>Hydration-Safe Component</h4>
      <p>
        Status: {isClient ? "✅ Running in browser window" : "⏳ Server pre-render"}
      </p>
    </div>
  );
}`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "You get an error saying 'useState can only be used in a Client Component'. What is the correct fix?",
      options: [
        "Add 'use client' at the top of the component file, or extract the interactive piece into a Client Component",
        "Delete the useState hook and never make interactive apps",
        "Reboot your computer and reinstall Windows",
        "Rename the file from .tsx to .css",
      ],
      correctIndex: 0,
      explanation: "React state hooks like useState require client-side interactivity. Adding 'use client' declares that component as a Client Component.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Terminal = Server",
        desc: "Errors in Server Components, database queries, and Server Actions log to your VS Code terminal.",
      },
      {
        title: "DevTools = Client",
        desc: "Errors in event listeners, client hooks, and hydration log to your browser DevTools console.",
      },
      {
        title: "Read First Line",
        desc: "The top of the error stack contains the exact file path and line number you need to fix.",
      },
    ],
    nextLessonPreview: {
      title: "Website Performance Optimization",
      desc: "Master Core Web Vitals, next/image optimization, parallel data loading, and server-side database pagination.",
    },
  },
};
