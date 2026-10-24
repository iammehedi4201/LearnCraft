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
    bigPicture: "Web applications need sensitive configuration values like database connection strings, payment secret keys, and third-party API tokens. You must never hardcode these into your source code. Next.js loads environment variables from a '.env.local' file. Variables without a prefix are strictly server-only. Variables prefixed with 'NEXT_PUBLIC_' are sent to the user's browser.",
    analogy: "Imagine running a bank. The master combination to the heavy steel vault in the back room is a server-only variable (like PAYMENT_SECRET_KEY)—only authorized bank staff on the server side can see it. The public customer service phone number painted on the front window is a NEXT_PUBLIC_ variable—anyone walking by can read it.",
    codeSnippet: `// .env.local
# 1. Private secret keys (STRICTLY SERVER-ONLY):
DATABASE_URL="postgresql://admin:secret123@localhost:5432/learncraft"
STRIPE_SECRET_KEY="sk_live_99887766"

# 2. Public variables visible to the browser:
NEXT_PUBLIC_ANALYTICS_ID="G-XYZ12345"

// -------------------------------------------------------------
// app/actions.ts (Server-side code):
export async function processPayment() {
  // 3. Perfectly safe: accessible only on the server
  const key = process.env.STRIPE_SECRET_KEY;
}

// app/components/Analytics.tsx (Client Component):
"use client";
export default function Analytics() {
  // 4. Accessible in the browser because of the NEXT_PUBLIC_ prefix:
  const id = process.env.NEXT_PUBLIC_ANALYTICS_ID;
  return <div>Tracking ID: {id}</div>;
}`,
    breakdownTitle: "How This Works Step by Step",
    breakdownItems: [
      {
        title: "1. The .env.local File",
        desc: "Next.js automatically loads key-value pairs from .env.local into process.env when your development server starts. No third-party packages like dotenv are needed.",
      },
      {
        title: "2. Server-Only by Default",
        desc: "Any variable without 'NEXT_PUBLIC_' (like STRIPE_SECRET_KEY) is stripped from client bundles. If browser code attempts to read process.env.STRIPE_SECRET_KEY, Next.js returns undefined to prevent leaks.",
      },
      {
        title: "3. The NEXT_PUBLIC_ Prefix",
        desc: "Adding 'NEXT_PUBLIC_' tells Next.js to replace that variable with its literal value inside the browser JavaScript bundle during build time. Use this only for public IDs or hostnames.",
      },
      {
        title: "4. Version Control Git Exclusion",
        desc: "Always keep '.env.local' listed in your '.gitignore' file. This guarantees that team members never accidentally commit private database credentials or credit card API keys to GitHub.",
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
// Bundled into browser JavaScript and visible to any user in DevTools!`,
      explanation: "Using NEXT_PUBLIC_ on private credentials exposes them in plain text inside client-side JS bundles.",
    },
    good: {
      title: "Keeping Private Keys Strictly on the Server",
      code: `// .env.local
STRIPE_SECRET_KEY="sk_live_99999" // ✅ Server-only (hidden from browser)
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
