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
    bigPicture: "A Route Handler defines an HTTP endpoint in a route.ts file. Use one when an external client or another service needs an API endpoint, or when you need a custom HTTP response such as webhooks, file downloads, or health checks.",
    codeSnippet: `// app/api/health/route.ts
export function GET() {
  return Response.json({ status: "ok", timestamp: Date.now() });
}

// Opening '/api/health' in a browser or tool like curl sends a GET request
// and returns this JSON response.`,
    breakdownTitle: "Supported HTTP Verbs",
    breakdownItems: [
      {
        title: "Named HTTP Method Exports",
        desc: "Export functions named GET, POST, PUT, PATCH, DELETE, HEAD, or OPTIONS to handle specific methods.",
      },
      {
        title: "Standard Web Request/Response",
        desc: "Uses modern Web APIs (Request, Response, Headers) without proprietary Express req/res objects.",
      },
      {
        title: "Cannot Share Folder with page.tsx",
        desc: "A route folder can have either page.tsx OR route.ts, never both at the same level.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Action vs Route Handler Rule",
      content: "Use Server Actions for internal UI mutations like submitting forms. Use Route Handlers for external consumers like third-party webhooks, mobile apps, and public REST APIs.",
    },
    cards: [
      {
        number: "01",
        tag: "WEBHOOKS",
        title: "Third-Party Hooks",
        description: "Services like Stripe or GitHub require dedicated HTTP POST webhook endpoints to deliver events.",
        color: "purple",
      },
      {
        number: "02",
        tag: "STANDARDS",
        title: "Web Standards",
        description: "Built on standard Request and Response objects, making them portable and easy to understand.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "CUSTOM FORMATS",
        title: "Binary & Custom Data",
        description: "Perfect for generating dynamic SVG badges, PDF downloads, RSS feeds, and XML sitemaps.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to structure real Route Handlers:",
    points: [
      {
        title: "1. Handling GET queries",
        content: "Export export async function GET(request: Request). Extract query strings using new URL(request.url).searchParams.",
      },
      {
        title: "2. Handling POST bodies",
        content: "Read JSON payloads with const body = await request.json(). Verify signatures for third-party webhooks.",
      },
      {
        title: "3. Returning status codes",
        content: "Return custom statuses: return Response.json({ error: 'Not found' }, { status: 404 }).",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Colocating page.tsx and route.ts in Same Folder",
      code: `// app/courses/
//   page.tsx   <- Route conflict!
//   route.ts   <- Next.js throws build error!`,
      explanation: "A single route segment cannot serve both an HTML page and a raw HTTP route handler. Next.js will throw a build conflict.",
    },
    good: {
      title: "Isolating Route Handlers in /api Subfolder",
      code: `// app/courses/page.tsx      -> /courses (HTML Page)
// app/api/courses/route.ts  -> /api/courses (JSON REST API)`,
      explanation: "Separating API handlers under an /api folder prevents collisions and keeps the architecture clean.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Explore how a Route Handler processes a POST request:",
    starterCode: `// app/api/courses/route.ts
export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.title) {
      return Response.json({ error: "Missing required field: title" }, { status: 400 });
    }

    return Response.json({
      success: true,
      created: { id: "c_123", title: data.title },
    }, { status: 201 });
  } catch {
    return Response.json({ error: "Invalid JSON payload" }, { status: 400 });
  }
}`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "When should you prefer a Route Handler (route.ts) over a Server Action ('use server')?",
      options: [
        "When external services need an HTTP endpoint (like a Stripe webhook or mobile app API)",
        "When handling an internal form submit button inside an existing page",
        "When you want to display an interactive button in the browser",
        "When styling text with CSS",
      ],
      correctIndex: 0,
      explanation: "Route Handlers provide standard HTTP REST endpoints for external consumers and webhooks. Internal UI mutations are better served by Server Actions.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Named HTTP Exports",
        desc: "Export GET, POST, DELETE functions from route.ts to handle specific HTTP methods.",
      },
      {
        title: "Standard Web APIs",
        desc: "Uses standard Request and Response objects directly.",
      },
      {
        title: "Route Conflict Rule",
        desc: "Cannot colocate page.tsx and route.ts in the exact same directory.",
      },
    ],
    nextLessonPreview: {
      title: "Revalidating Data After a Change",
      desc: "Learn how revalidatePath and revalidateTag purge stale cache and update rendered pages immediately.",
    },
  },
};
