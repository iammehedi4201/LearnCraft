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
    bigPicture: "When a page takes a few seconds to load database data, you do not want users staring at a frozen, unresponsive screen. By adding a 'loading.tsx' file inside your route folder, Next.js automatically shows an instant loading skeleton or spinner while the server prepares the final page content.",
    analogy: "When you sit down at a great restaurant, the waiter immediately brings complimentary bread and ice water to your table while the chef cooks your main course. In Next.js, 'loading.tsx' is that bread basket: it reassures the visitor immediately while the server prepares the main meal.",
    codeSnippet: `// app/courses/loading.tsx
// 1. Create loading.tsx alongside your page.tsx:
export default function CoursesLoading() {
  // 2. Return a lightweight skeleton or spinner:
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Loading course catalog...</h2>
      <p style={{ color: "#888" }}>Fetching the latest lessons from the database.</p>
    </div>
  );
}

// How Next.js runs this behind the scenes:
// <Suspense fallback={<CoursesLoading />}>
//   <CoursesPage />
// </Suspense>`,
    breakdownTitle: "How This Works Step by Step",
    breakdownItems: [
      {
        title: "1. Create 'loading.tsx' in the Route Folder",
        desc: "Placing a file named 'loading.tsx' inside 'app/courses/' tells Next.js to use this component as the loading screen for that route.",
      },
      {
        title: "2. Automated React Suspense Boundary",
        desc: "You don't need to write manual React <Suspense> tags. Next.js automatically wraps your page.tsx inside a Suspense boundary with loading.tsx as the fallback.",
      },
      {
        title: "3. Instant Server Streaming",
        desc: "The instant a user clicks a link to '/courses', the browser immediately renders the shared layout and the loading.tsx UI—zero waiting.",
      },
      {
        title: "4. Automatic Content Swap",
        desc: "While the visitor sees the loading screen, the server finishes the async database query. As soon as the data is ready, Next.js streams the real HTML and smoothly replaces the loading screen.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Perceived Speed Rule",
      content: "Never let users guess whether their click worked. Always provide a loading.tsx skeleton for routes that fetch database or API data.",
    },
    cards: [
      {
        number: "01",
        tag: "SPEED",
        title: "Instant Perceived Speed",
        description: "The browser navigates immediately and shows the skeleton while the server prepares dynamic data.",
        color: "purple",
      },
      {
        number: "02",
        tag: "AUTOMATIC",
        title: "Zero-Config Suspense",
        description: "No manual React <Suspense fallback={<Spinner />}> wrapper required; Next.js wires it up based on file naming.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "TRUST",
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
      title: "Managing Loading Spinners with useState",
      code: `// ❌ Manual loading flags in every component:
const [isLoading, setIsLoading] = useState(true);
useEffect(() => {
  fetch("/api/courses").then(() => setIsLoading(false));
}, []);
// Requires boilerplate state, causes layout flickers, and runs on the client!`,
      explanation: "Manual loading flags require repetitive boilerplate and don't take advantage of server-side streaming.",
    },
    good: {
      title: "Declarative loading.tsx Segment File",
      code: `// app/courses/loading.tsx
// ✅ Next.js activates this automatically while the server loads data!
export default function CoursesLoading() {
  return <div className="skeleton-card">Loading course catalog...</div>;
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
