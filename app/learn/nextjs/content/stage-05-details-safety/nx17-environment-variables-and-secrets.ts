import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx17EnvironmentVariablesAndSecretsContent: StandardLessonContent = {
  slug: "nx17-environment-variables-and-secrets",
  code: "NX-17",
  title: "Environment Variables and Secrets",
  subtitle: "Manage sensitive API keys and configuration safely with server-only variables and the NEXT_PUBLIC_ prefix.",
  difficulty: "Moderate",
  scenario: {
    question: "Your app needs a private payment-provider key. Should you use NEXT_PUBLIC_PAYMENT_API_KEY?",
    answer: "No. Keep the key in a server-only environment variable and use it from server-side code.",
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
    title: "Environment Variables and Secrets",
    bigPicture: "Environment variables store settings outside your source code. They are used for API keys, database URLs, and environment configuration. Variables without a NEXT_PUBLIC_ prefix are strictly server-only. Variables prefixed with NEXT_PUBLIC_ are bundled into client browser JavaScript.",
    codeSnippet: `// .env.local
DATABASE_URL="postgresql://user:secret@localhost:5432/mydb"
PAYMENT_SECRET_KEY="sk_live_xyz123"
NEXT_PUBLIC_ANALYTICS_ID="G-XYZ999"

// Read on the server (Server Component, Action, Route Handler):
const dbUrl = process.env.DATABASE_URL;
const secretKey = process.env.PAYMENT_SECRET_KEY;

// Read in the browser (Client Component):
const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;`,
    breakdownTitle: "Exposure Boundaries",
    breakdownItems: [
      {
        title: "Server-Only Variables (Default)",
        desc: "Without the prefix, variables are completely invisible to the client bundle and safe for database passwords and private keys.",
      },
      {
        title: "NEXT_PUBLIC_ Prefix",
        desc: "Inlines the variable into the browser JavaScript bundle during build time. Anyone can inspect it in DevTools.",
      },
      {
        title: ".env.local Git Exclusion",
        desc: "Always include .env.local in .gitignore so developers never accidentally commit live production secrets to GitHub.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Secret Isolation Rule",
      content: "Never prefix private credentials with NEXT_PUBLIC_ or import them into Client Components. Keep secrets exclusively on the server.",
    },
    cards: [
      {
        number: "01",
        tag: "SERVER SECRETS",
        title: "Strictly Server-Only",
        description: "Variables without NEXT_PUBLIC_ evaluate to undefined in browser JavaScript to prevent accidental leaks.",
        color: "purple",
      },
      {
        number: "02",
        tag: "CLIENT CONFIG",
        title: "NEXT_PUBLIC_ Prefix",
        description: "Reserved only for non-sensitive public values like analytics IDs, publishable keys, or public hostnames.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "GIT SAFETY",
        title: "Keep Out of Version Control",
        description: "Store local credentials in .env.local and keep it strictly out of git version control repositories.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how environment variables are loaded and enforced:",
    points: [
      {
        title: "1. The .env.local file",
        content: "Next.js automatically loads .env.local on startup, populating process.env without needing external libraries like dotenv.",
      },
      {
        title: "2. Build-time inlining",
        content: "When building the client bundle, Next.js replaces text instances of process.env.NEXT_PUBLIC_VAR with the actual string value.",
      },
      {
        title: "3. Server-only protection",
        content: "If you accidentally attempt to read process.env.PAYMENT_SECRET_KEY inside a Client Component, it returns undefined.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Prefixing a Private Key with NEXT_PUBLIC_",
      code: `// .env.local
NEXT_PUBLIC_STRIPE_SECRET_KEY="sk_live_99999" // ❌ HUGE SECURITY RISK!
// Bundled into browser JavaScript and visible to any user or attacker`,
      explanation: "Using NEXT_PUBLIC_ on private credentials exposes them in plain text inside client-side JS bundles.",
    },
    good: {
      title: "Keeping Private Keys on the Server",
      code: `// .env.local
STRIPE_SECRET_KEY="sk_live_99999" // ✅ Server-only
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_11111" // ✅ Safe for client

// Read in app/actions.ts (Server Action):
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);`,
      explanation: "Keeps secret keys strictly behind the server boundary where clients cannot inspect or access them.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Explore reading environment variables in a Server Component:",
    starterCode: `// app/page.tsx (Server Component)
export default function Page() {
  // Safe to read server-side:
  const isProduction = process.env.NODE_ENV === "production";
  const publicAppUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return (
    <div>
      <h3>App Configuration</h3>
      <p>Environment: {isProduction ? "Production" : "Development"}</p>
      <p>Public Base URL: {publicAppUrl}</p>
    </div>
  );
}`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which prefix must be added to an environment variable in Next.js to make it accessible inside browser Client Components?",
      options: [
        "NEXT_PUBLIC_",
        "REACT_APP_",
        "BROWSER_VISIBLE_",
        "CLIENT_SECRET_",
      ],
      correctIndex: 0,
      explanation: "Next.js requires the NEXT_PUBLIC_ prefix to expose environment variables to the browser client bundle. All other variables remain strictly server-only.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Server by Default",
        desc: "Variables without prefixes are server-only and return undefined in the browser.",
      },
      {
        title: "NEXT_PUBLIC_ for Client",
        desc: "Only use NEXT_PUBLIC_ for non-sensitive public values like analytics IDs.",
      },
      {
        title: "Never Commit Secrets",
        desc: "Keep .env.local in .gitignore to protect production credentials.",
      },
    ],
    nextLessonPreview: {
      title: "Authentication and Authorization",
      desc: "Learn the crucial distinction between verifying who a user is versus what they are allowed to do.",
    },
  },
};
