import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx02AppFolderAndRoutesContent: StandardLessonContent = {
  slug: "nx02-app-folder-and-routes",
  code: "NX-02",
  title: "The app Folder and Routes",
  subtitle: "In the App Router, folders inside the app directory define the URLs of your website.",
  difficulty: "Easy",
  scenario: {
    question: "You need to add an /about page. Which file do you create?",
    answer: "Create app/about/page.tsx and export a React component from it.",
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
    title: "The app Folder and Routes",
    bigPicture: "In the App Router, folders inside app help define URLs. A page.tsx file makes that route a page.",
    codeSnippet: `// File-system route structure:
// app/
//   page.tsx          -> /
//   about/
//     page.tsx        -> /about
//   contact/
//     page.tsx        -> /contact

// app/about/page.tsx
export default function AboutPage() {
  return (
    <main>
      <h1>About LearnCraft</h1>
      <p>We teach modern full-stack web technologies.</p>
    </main>
  );
}`,
    breakdownTitle: "Route Mapping Rules",
    breakdownItems: [
      {
        title: "Folders Define Segments",
        desc: "Each nested folder represents a segment in the URL path (e.g. app/courses -> /courses).",
      },
      {
        title: "page.tsx Makes It Public",
        desc: "A route is only publicly accessible if it contains a page.tsx (or page.js) file.",
      },
      {
        title: "Colocated Files Stay Private",
        desc: "Non-page files inside route folders (like Button.tsx or helper.ts) are not publicly accessible routes.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "File-System Routing Rule",
      content: "The file structure directly mirrors the URL structure, making it immediately clear where every page is located.",
    },
    cards: [
      {
        number: "01",
        tag: "CONVENTION",
        title: "Predictable URLs",
        description: "Looking at the folder structure tells you exactly what URL each page responds to.",
        color: "purple",
      },
      {
        number: "02",
        tag: "LEAF FILE",
        title: "Special 'page.tsx' File",
        description: "Only folders containing a page.tsx file become publicly reachable routes in the browser.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "SAFETY",
        title: "Safe Colocation",
        description: "You can keep components, tests, and styles right inside the route folder without accidentally creating public routes.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to structure real routes in the App Router:",
    points: [
      {
        title: "1. Top-level landing page",
        content: "app/page.tsx maps directly to the root domain URL (/).",
      },
      {
        title: "2. Nested sub-pages",
        content: "Creating app/courses/page.tsx creates the /courses route, while app/courses/web/page.tsx creates /courses/web.",
      },
      {
        title: "3. Component colocation",
        content: "You can add app/about/TeamCard.tsx to hold helper UI without making /about/TeamCard a route.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Naming the File Incorrectly",
      code: `// app/about/index.tsx  (Pages Router convention, NOT App Router)
// Or:
// app/about/about.tsx  (Does not create a route in App Router)
export default function About() {
  return <h1>About</h1>;
}`,
      explanation: "In Next.js App Router, using index.tsx or custom names like about.tsx does not make the route available. You must use page.tsx.",
    },
    good: {
      title: "Using the Standard page.tsx Convention",
      code: `// app/about/page.tsx
export default function AboutPage() {
  return <h1>About</h1>;
}
// Correctly creates the /about route!`,
      explanation: "Next.js App Router specifically looks for page.tsx to expose a public route.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Explore how an about page component is written:",
    starterCode: `// app/about/page.tsx
export default function AboutPage() {
  const team = ["Rina", "Mehedi", "Alex"];

  return (
    <div>
      <h2>About Our Platform</h2>
      <p>Instructors:</p>
      <ul>
        {team.map((member) => (
          <li key={member}>{member}</li>
        ))}
      </ul>
    </div>
  );
}

// In Next.js App Router, this file lives at app/about/page.tsx to render at /about`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which file inside the app/contact folder makes the /contact route accessible to users?",
      options: [
        "page.tsx",
        "index.html",
        "contact.tsx",
        "route.html",
      ],
      correctIndex: 0,
      explanation: "Next.js App Router requires the file to be named page.tsx (or page.jsx/js) to make that route publicly accessible as a page.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Folder = URL Segment",
        desc: "Each folder nested inside app/ defines a step in the URL path.",
      },
      {
        title: "page.tsx = Route UI",
        desc: "A route only exists if its folder contains a default-exported page.tsx component.",
      },
      {
        title: "Colocation Friendly",
        desc: "Helper components inside route folders remain private unless named page.tsx.",
      },
    ],
    nextLessonPreview: {
      title: "Pages and Layouts",
      desc: "Learn how layouts share persistent UI like headers and navigation across multiple pages.",
    },
  },
};
