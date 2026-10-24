import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx02AppFolderAndRoutesContent: StandardLessonContent = {
  slug: "nx02-app-folder-and-routes",
  code: "NX-02",
  title: "The app Folder and Routes",
  subtitle: "In the App Router, folders inside the app directory define the URLs of your website.",
  difficulty: "Easy",
  scenario: {
    question: "You need to add an `/about` page. Which file do you create?",
    answer: "Create `app/about/page.tsx` and export a React component from it.",
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
    bigPicture: "In the Next.js App Router, you do not write code to configure URL paths. Instead, your folders define your URLs! Creating a folder inside the app directory creates a URL segment, and creating a file named 'page.tsx' inside that folder makes it a publicly accessible web page.",
    analogy: "Think of organizing files in folders on your computer. If you create a folder called 'about', you put everything related to 'about' inside it. In Next.js, that folder automatically becomes the web address '/about', and 'page.tsx' is the front door that visitors see when they open that address.",
    codeSnippet: `// Project folder structure:
// app/
//   page.tsx              -> Maps to: http://localhost:3000/
//   about/
//     page.tsx            -> Maps to: http://localhost:3000/about
//     TeamList.tsx        -> Private component (NOT a public URL!)
//   courses/
//     page.tsx            -> Maps to: http://localhost:3000/courses

// app/about/page.tsx
// 1. Export a default React component from page.tsx:
export default function AboutPage() {
  // 2. Return the JSX content for the /about route:
  return (
    <main>
      <h1>About LearnCraft</h1>
      <p>We teach modern full-stack web development step by step.</p>
    </main>
  );
}`,
    breakdownTitle: "How This Works Step by Step",
    breakdownItems: [
      {
        title: "1. Folder Name = URL Segment",
        desc: "Creating a folder named 'about' inside 'app' creates the '/about' route segment. Nesting another folder like 'app/about/team' creates '/about/team'.",
      },
      {
        title: "2. The Special 'page.tsx' File",
        desc: "Next.js specifically looks for a file named 'page.tsx' (or page.js). Without page.tsx, a folder is just a private organizational container and cannot be visited by users.",
      },
      {
        title: "3. Default Component Export",
        desc: "Your page component must be exported as the 'default' export (e.g., export default function AboutPage()). Next.js uses this function to render the page HTML.",
      },
      {
        title: "4. Safe File Colocation",
        desc: "You can keep helper components, tests, and CSS files right inside the route folder (like TeamList.tsx). Because it is not named page.tsx, Next.js keeps it private and never exposes it as a URL.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "File-System Routing Rule",
      content: "The folder structure directly mirrors the website's URLs. Only folders containing a page.tsx file become publicly reachable routes in the browser.",
    },
    cards: [
      {
        number: "01",
        tag: "CONVENTION",
        title: "Predictable URLs",
        description: "Looking at your project directory tells you immediately where every URL lives without checking any routing configuration files.",
        color: "purple",
      },
      {
        number: "02",
        tag: "LEAF FILE",
        title: "The Special 'page.tsx'",
        description: "Only folders containing page.tsx are accessible in the browser, returning clean 404s for folders without a page file.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "SAFETY",
        title: "Safe Colocation",
        description: "Store helper components, unit tests, and styles right inside the route folder without accidentally turning them into public pages.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how real web routes are structured in the App Router:",
    points: [
      {
        title: "1. The root landing page",
        content: "The file at 'app/page.tsx' represents the homepage of your website (http://localhost:3000/).",
      },
      {
        title: "2. Nested sub-pages",
        content: "Creating 'app/courses/page.tsx' creates the '/courses' page. Creating 'app/courses/nextjs/page.tsx' creates '/courses/nextjs'.",
      },
      {
        title: "3. Keeping helper files private",
        content: "If you add 'app/about/TeamCard.tsx', you can import it inside 'app/about/page.tsx'. Visitors cannot visit '/about/TeamCard' directly because it is not named page.tsx.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Naming the File Incorrectly",
      code: `// app/about/about.tsx  ❌ Does NOT create a route!
// app/about/index.tsx  ❌ Old Pages Router convention, not App Router!
export default function About() {
  return <h1>About</h1>;
}`,
      explanation: "In the Next.js App Router, custom file names like about.tsx or index.tsx do not create public routes. You will get a 404 error.",
    },
    good: {
      title: "Using the Standard page.tsx File Name",
      code: `// app/about/page.tsx  ✅ Correct!
export default function AboutPage() {
  return <h1>About LearnCraft</h1>;
}
// Visiting http://localhost:3000/about works immediately!`,
      explanation: "Next.js App Router specifically requires the exact file name 'page.tsx' to publish a route.",
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
