import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx13RouteHandlersContent: StandardLessonContent = {
  slug: "nx13-route-handlers",
  code: "NX-13",
  title: "Route Handlers",
  subtitle: "Build custom HTTP REST API endpoints in route.ts for external webhooks, mobile clients, and JSON responses.",
  difficulty: "Moderate",
  scenario: {
    question: "A monitoring service needs to request /api/health and receive JSON showing whether your app is running. What should you create?",
    answer: "Create app/api/health/route.ts and add a GET handler that returns a JSON response.",
  },
  interviewQuestion: {
    question: "What is the difference between a Server Action and a Route Handler?",
    answer: "A Server Action is often used to perform an action from the app UI, such as saving a form. A Route Handler defines an HTTP endpoint that clients or services can call.",
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
    title: "Route Handlers",
    bigPicture: "While page.tsx returns visual HTML for website visitors, a route.ts file returns raw data (like JSON) for API clients. In Next.js, this is called a Route Handler. You use it whenever an external service needs to talk to your backend — such as a Stripe payment webhook, a mobile app (iOS/Android), or a public REST API.",
    codeSnippet: `// app/api/courses/route.ts
// This file responds to HTTP requests at "/api/courses"

// 1. Handle HTTP GET requests (reading data or query params):
export async function GET(request: Request) {
  // Extract query parameters like "/api/courses?category=nextjs"
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? "all";

  const courses = [
    { id: 1, title: "Next.js App Router", category: "nextjs" },
    { id: 2, title: "TypeScript Mastery", category: "typescript" },
  ];

  // Return standard JSON to the caller:
  return Response.json({ category, courses });
}

// 2. Handle HTTP POST requests (receiving JSON from external clients):
export async function POST(request: Request) {
  // Read incoming JSON body:
  const body = await request.json();

  if (!body.title) {
    return Response.json({ error: "Title is required" }, { status: 400 });
  }

  // Save to database and return a 201 Created status:
  return Response.json({ success: true, item: body }, { status: 201 });
}`,
    breakdownTitle: "How This Works Step by Step",
    breakdownItems: [
      {
        title: "1. The route.ts File Convention",
        desc: "Creating route.ts inside any folder creates an HTTP endpoint at that folder path (e.g. app/api/courses/route.ts -> /api/courses).",
      },
      {
        title: "2. Exporting HTTP Method Names",
        desc: "You export functions named after standard HTTP verbs: GET, POST, PUT, DELETE, or PATCH. Next.js routes incoming requests to the matching function.",
      },
      {
        title: "3. Response.json() and Status Codes",
        desc: "Uses the modern web standard Response.json() to return formatted JSON and optional HTTP status codes like { status: 201 } or { status: 400 }.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Server Action vs Route Handler Rule",
      content: "Use Server Actions when handling UI actions like website forms. Use Route Handlers when building HTTP endpoints for mobile apps, external webhooks (like Stripe), or public APIs.",
    },
    cards: [
      {
        number: "01",
        tag: "WEBHOOKS",
        title: "Third-Party Webhooks",
        description: "Services like Stripe, GitHub, or Shopify require an HTTP POST URL to notify your app when events happen.",
        color: "purple",
      },
      {
        number: "02",
        tag: "MOBILE APPS",
        title: "iOS & Android Backends",
        description: "Mobile apps cannot run Next.js Server Components; they fetch JSON directly from your Route Handlers.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "NO PAGE CONFLICT",
        title: "Never Mix with page.tsx",
        description: "A single folder can contain page.tsx OR route.ts, never both. Keep API endpoints inside an /api subfolder.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about Route Handlers in production apps:",
    points: [
      {
        title: "1. Request and Response are Web Standards",
        content: "Route Handlers use standard Web API Request and Response objects. You don't need Express req/res or third-party middleware packages.",
      },
      {
        title: "2. Reading request headers and cookies",
        content: "You can read cookies and authorization tokens directly using request.headers.get('Authorization') or the next/headers cookies() helper.",
      },
      {
        title: "3. Don't use Route Handlers for standard forms",
        content: "If you are submitting a form from your Next.js website, use Server Actions (Lesson 12). Route Handlers are meant for external HTTP consumers.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Placing page.tsx and route.ts in the Same Folder",
      code: `// ❌ WRONG: Conflict in the same folder!
// app/courses/page.tsx   (Returns HTML for /courses)
// app/courses/route.ts  (Returns JSON for /courses)

// 💥 Next.js Build Error:
// "A route cannot have both a page and a route handler in the same segment."`,
      explanation: "Next.js cannot serve both a web page and an API endpoint at the exact same URL. Keep API endpoints inside an app/api/ folder.",
    },
    good: {
      title: "Isolate API Endpoints Under /api",
      code: `// ✅ CLEAN STRUCTURE: Separate UI and API routes
// app/courses/page.tsx      -> Shows the web page at "/courses"
// app/api/courses/route.ts  -> Serves JSON for external clients at "/api/courses"

export async function GET() {
  return Response.json({ status: "ok" });
}`,
      explanation: "Placing Route Handlers in an api/ directory organizes your endpoints clearly and avoids route conflicts.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Here is how a clean GET Route Handler returns structured JSON data:",
    starterCode: `// app/api/health/route.ts
// Simulated Next.js Route Handler

export function GET(request: Request) {
  const url = new URL(request.url);
  const service = url.searchParams.get("service") || "main-api";

  return Response.json({
    status: "healthy",
    service,
    uptime: "99.98%",
    timestamp: new Date().toISOString(),
  });
}`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "When should you write a Route Handler (route.ts) instead of a Server Action?",
      options: [
        "When an external system like a Stripe webhook or mobile app needs to call your backend via an HTTP endpoint",
        "When you want to change the background color of a button",
        "Only when writing Python scripts",
        "Whenever a user clicks a link to another page",
      ],
      correctIndex: 0,
      explanation: "Route Handlers provide custom HTTP REST endpoints for external consumers like webhooks and mobile apps, while Server Actions are best for internal UI form submissions.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Named HTTP Exports",
        desc: "Export functions named GET, POST, PUT, DELETE to handle standard HTTP requests.",
      },
      {
        title: "Web Standards",
        desc: "Uses standard Request and Response.json() without requiring Express.",
      },
      {
        title: "Separate from Pages",
        desc: "Keep Route Handlers inside an app/api/ directory to avoid conflicting with page.tsx routes.",
      },
    ],
    nextLessonPreview: {
      title: "Revalidating Data After a Change",
      desc: "Learn how to purge stale cached pages and update UI instantly with revalidatePath and revalidateTag.",
    },
  },
};
