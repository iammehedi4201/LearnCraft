import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx10LoadingUiContent: StandardLessonContent = {
  slug: "nx10-loading-ui",
  code: "NX-10",
  title: "Loading UI",
  subtitle: "Use loading.tsx and React Suspense boundaries to display instant feedback while content loads.",
  difficulty: "Moderate",
  scenario: {
    question: "Your course page takes a few seconds to load. You want to show 'Loading courses...' while Next.js loads the page. What can you add?",
    answer: "Add a loading.tsx file in the relevant route folder and return the loading UI from it.",
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
    title: "Loading UI",
    bigPicture: "A loading.tsx file shows a loading UI while a route segment is waiting for content. It makes navigation feel faster because users get immediate visual feedback rather than staring at a frozen screen.",
    codeSnippet: `// app/courses/loading.tsx
export default function Loading() {
  return (
    <div className="loading-container">
      <p>Loading courses...</p>
    </div>
  );
}

// Next.js automatically wraps app/courses/page.tsx in a React <Suspense>
// boundary with this Loading component as the fallback.`,
    breakdownTitle: "Suspense Automation",
    breakdownItems: [
      {
        title: "Special File Convention",
        desc: "Creating loading.tsx in any route segment automatically wraps that segment's page in a Suspense boundary.",
      },
      {
        title: "Instant Streaming",
        desc: "Next.js streams the loading fallback immediately while the server executes slower database queries in the background.",
      },
      {
        title: "Granular Boundaries",
        desc: "Each route folder can have its own loading.tsx with tailored skeleton layouts matching the destination page.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Loading State Rule",
      content: "Never leave users guessing whether a click registered. Always provide a clear loading state or skeleton UI for async routes.",
    },
    cards: [
      {
        number: "01",
        tag: "PERCEIVED SPEED",
        title: "Instant Navigation",
        description: "The browser navigates immediately and shows the skeleton while the server prepares dynamic data.",
        color: "purple",
      },
      {
        number: "02",
        tag: "AUTOMATIC",
        title: "Built-In Suspense",
        description: "No manual React <Suspense fallback={<Spinner />}> wrapper required; Next.js wires it up based on file naming.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "USER TRUST",
        title: "Prevents Rage Clicks",
        description: "Immediate visual feedback reassures the user that their action succeeded and data is on its way.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how loading.tsx coordinates with React Suspense:",
    points: [
      {
        title: "1. Navigation begins",
        content: "A user clicks a link to /courses. Next.js instantly renders the shared layout and the loading.tsx fallback UI.",
      },
      {
        title: "2. Server-side fetching finishes",
        content: "In the background, the async CoursesPage resolves its database query and renders its final HTML.",
      },
      {
        title: "3. Seamless swap",
        content: "Next.js streams the resolved page HTML into the DOM, smoothly replacing the loading UI without a full reload.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Managing Global Loading Spinners Manually",
      code: `// Manually tracking router events in pure React
const [isLoading, setIsLoading] = useState(false);
// Fragile, easy to forget on new routes, and flickers on fast connections`,
      explanation: "Manual loading flags require repetitive boilerplate and don't take advantage of React 19 streaming SSR.",
    },
    good: {
      title: "Declarative loading.tsx Segment File",
      code: `// app/courses/loading.tsx
export default function CoursesLoading() {
  return <div className="animate-pulse">Loading course catalog...</div>;
}`,
      explanation: "Next.js automatically activates this fallback whenever the segment is pending server data.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Explore a modern skeleton loading component:",
    starterCode: `// app/courses/loading.tsx
export default function Loading() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ height: "28px", width: "180px", background: "#333", borderRadius: "4px" }} />
      <div style={{ height: "16px", width: "100%", background: "#222", borderRadius: "4px" }} />
      <div style={{ height: "16px", width: "80%", background: "#222", borderRadius: "4px" }} />
      <p style={{ color: "#888" }}>Streaming initial data from server...</p>
    </div>
  );
}`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "How does Next.js handle a loading.tsx file in a route directory?",
      options: [
        "It automatically wraps page.tsx and its children in a React <Suspense> boundary using loading.tsx as the fallback",
        "It displays the loading screen permanently and prevents the page from ever loading",
        "It converts all images on the page into animated GIFs",
        "It delays the page load by a mandatory 10 seconds",
      ],
      correctIndex: 0,
      explanation: "Next.js automatically treats loading.tsx as the fallback component inside an automated React Suspense boundary around the route segment.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Suspense Fallback",
        desc: "loading.tsx becomes the automatic fallback UI for its sibling page.tsx.",
      },
      {
        title: "Segment Scoped",
        desc: "Can be defined globally in app/ or locally within specific nested folders like app/courses/.",
      },
      {
        title: "Streaming Enabled",
        desc: "Enables instant navigation while dynamic server data finishes loading in the background.",
      },
    ],
    nextLessonPreview: {
      title: "Handling Missing Pages and Errors",
      desc: "Learn how not-found.tsx, error.tsx, and the notFound() function handle errors gracefully.",
    },
  },
};
