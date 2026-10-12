import { InterviewQuestion } from "@/types/interview";

export const NEXTJS_QUESTIONS: InterviewQuestion[] = [
  {
    id: "next-q01",
    trackKey: "nextjs",
    category: "React Server Components",
    subtopic: "Server vs Client Components",
    type: "conceptual",
    difficulty: "medium",
    source: "curated",
    question: "Explain the difference between React Server Components (RSC) and Client Components in Next.js App Router.",
    answer: `### Simple answer:
In Next.js App Router, all components inside \`app/\` are **Server Components** by default. They run only on the server, output HTML, and add 0 KB to the JavaScript bundle sent to the user. To add user interactivity (like clicks, state, or effects), you add **\`"use client"\`** at the top of the file to turn it into a Client Component.

### Comparison Table:
| Feature | Server Components (Default) | Client Components (\`"use client"\`) |
|---|---|---|
| **Where it executes** | Runs **only on the server** | Pre-rendered on server, hydrated in browser |
| **Client JS bundle** | **0 KB added** to client JavaScript | Included in client JS bundle |
| **Direct DB access** | Yes! Query Prisma/PostgreSQL or read server secrets directly | No! Must call API routes or Server Actions |
| **Interactivity** | No \`onClick\`, no \`useState\`, no \`useEffect\` | Full interactive hooks (\`useState\`, \`useEffect\`, listeners) |
| **Browser APIs** | Cannot use \`window\` or \`localStorage\` | Full access to browser APIs |

### Composition Pattern:
Pass Server Components as **\`children\`** into Client Components:
\`\`\`tsx
// Modal (Client Component)
"use client";
export function Modal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return isOpen ? <div className="modal">{children}</div> : null;
}

// Page (Server Component)
export default async function Page() {
  const data = await prisma.user.findMany(); // direct DB access!
  return (
    <Modal>
      <UserTable users={data} /> {/* Stays a Server Component! */}
    </Modal>
  );
}
\`\`\`

### Interview answer:
Server Components execute only on the server, adding zero JavaScript to the client bundle and enabling direct database and secret access. Client Components, marked with \`"use client"\`, hydrate in the browser to handle client state, effects, and user events.`,
    followUps: [
      "Can a Server Component be imported directly inside a Client Component file?",
      "How does Next.js serialize Server Component props passed to Client Components?",
      "What is the RSC payload protocol format sent across the network?"
    ],
    keyPoints: [
      "Server Components execute exclusively on the server and add 0kb JS to bundle",
      "Client Components are designated with 'use client' and hydrated in the browser",
      "Server components can access databases and private secrets directly",
      "Use composition (children prop) to nest Server Components inside Client Components"
    ],
    tags: ["nextjs", "app-router", "rsc", "server-components", "client-components"],
    relatedLessonSlug: "/learn/nextjs/nxt03-server-vs-client-components",
    relatedLessonName: "NXT-03: Server vs Client Components Architecture"
  },
  {
    id: "next-q02",
    trackKey: "nextjs",
    category: "Caching & Revalidation",
    subtopic: "Caching Layers",
    type: "conceptual",
    difficulty: "hard",
    source: "curated",
    question: "Break down the four layers of caching in the Next.js App Router and how each is revalidated.",
    answer: `### Simple answer:
Next.js App Router provides four distinct caching mechanisms across server and browser to make web pages load instantly and reduce backend load:

### 1. Request Memoization (Server)
- **Scope:** React render lifecycle for a single user request.
- **What it does:** Deduplicates identical \`fetch(url)\` calls with the same URL and options across different components in the same render tree.
- **Revalidation:** Automatically clears when the request finishes.

### 2. Data Cache (Server - Persistent)
- **Scope:** Persistent cross-request server cache.
- **What it does:** Stores HTTP fetch responses across multiple users.
- **Revalidation:** Time-based (\`next: { revalidate: 60 }\`) or on-demand via \`revalidateTag('tag')\` or \`revalidatePath('/path')\`.

### 3. Full Route Cache (Server)
- **Scope:** Stored on the server at build time or revalidation.
- **What it does:** Caches statically generated HTML and RSC payloads for static pages.
- **Revalidation:** Cleared whenever the underlying Data Cache is revalidated.

### 4. Router Cache (Client Browser)
- **Scope:** In-memory client browser session.
- **What it does:** Stores prefetched and visited route segments in the browser so navigating feels instantaneous.
- **Revalidation:** Automatic TTL expiry or programmatic refresh via \`router.refresh()\`.

### Interview answer:
Next.js features four caching layers: Request Memoization (deduplicating identical fetches per render), Data Cache (persisting fetch data across requests), Full Route Cache (caching static HTML and RSC payloads on the server), and Router Cache (in-memory client-side route caching in the browser).`,
    followUps: [
      "How did Next.js 15 change default fetch caching behavior compared to Next.js 14?",
      "What causes a page to automatically opt out of static generation into dynamic rendering?",
      "How do cookies() and headers() impact the Full Route Cache?"
    ],
    keyPoints: [
      "Request Memoization deduplicates identical fetches within a single render tree",
      "Data Cache persists HTTP responses across requests until revalidateTag/Path",
      "Full Route Cache serves pre-rendered HTML and RSC payloads",
      "Router Cache is client-side in-memory cache cleared via router.refresh()"
    ],
    tags: ["nextjs", "caching", "isr", "data-cache", "revalidation", "performance"],
    relatedLessonSlug: "/learn/nextjs/nxt07-caching-and-revalidation-deep-dive",
    relatedLessonName: "NXT-07: Next.js Caching Architecture & Revalidation"
  },
  {
    id: "next-q03",
    trackKey: "nextjs",
    category: "Server Actions & Mutations",
    subtopic: "Server Actions",
    type: "conceptual",
    difficulty: "medium",
    source: "curated",
    question: "What are Server Actions in Next.js, and how do they handle mutations, CSRF security, and optimistic UI updates?",
    answer: `### Simple answer:
Server Actions are asynchronous functions written with \`"use server"\` that run on the server and can be invoked directly from forms, buttons, or client components without creating manual API endpoints.

### Example:
\`\`\`tsx
// app/actions.ts:
"use server";
import { revalidatePath } from "next/cache";

export async function createNote(formData: FormData) {
  const title = formData.get("title") as string;
  await db.note.create({ data: { title } });
  revalidatePath("/notes"); // Clears cache so UI updates automatically!
}
\`\`\`

### Security Features:
1. **CSRF Protection:** Next.js Server Actions automatically verify the \`Host\` and \`Origin\` request headers against allowed origins.
2. **Encrypted Action IDs:** Action identifiers are compiled and encrypted per build so external attackers cannot invoke internal arbitrary functions.
3. **Server Execution:** Action code is stripped from client bundles, keeping secrets safe.

### Optimistic UI:
Pairs with React's \`useOptimistic\` hook to update the screen instantly before the server roundtrip finishes.

### Interview answer:
Server Actions allow direct server-side mutations triggered by client interactions. They eliminate manual API routes, protect against CSRF attacks automatically, invalidate caches using \`revalidatePath\`, and support optimistic UI updates with \`useOptimistic\`.`,
    followUps: [
      "Why must input data inside a Server Action still be validated with Zod?",
      "How does `useActionState` provide loading and error states for form submissions?",
      "What happens if a Server Action throws an unhandled Error?"
    ],
    keyPoints: [
      "Server Actions execute on the server and can be invoked from client forms or event handlers",
      "Automatic CSRF origin checking and encrypted action identifiers",
      "Supports progressive enhancement when used with HTML form action",
      "Pairs with useOptimistic and revalidatePath for instant responsive mutations"
    ],
    tags: ["server-actions", "mutations", "csrf", "useOptimistic", "nextjs"],
    relatedLessonSlug: "/learn/nextjs/nxt08-server-actions-and-mutations",
    relatedLessonName: "NXT-08: Server Actions & Mutations in Depth"
  },
  {
    id: "next-q04",
    trackKey: "nextjs",
    category: "Fundamentals",
    subtopic: "Why Next.js",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What is Next.js, and what advantages does it have over a standard Vite or Create React App single-page application?",
    answer: `### Simple answer:
Next.js is a full-stack React framework developed by Vercel. While vanilla React apps render everything on the client as a Single Page Application (SPA), Next.js provides built-in server-side rendering, routing, optimizations, and API handling out of the box.

### Key Advantages:
1. **SEO (Search Engine Optimization):** Search engine web crawlers receive pre-rendered HTML immediately rather than an empty \`<div id="root"></div>\`.
2. **Faster Initial Page Load (FCP):** Users see content instantly without waiting for a large JavaScript bundle to download and execute.
3. **File-System Routing:** No need to configure third-party routing libraries like React Router; creating folders automatically defines URLs.
4. **Automatic Optimizations:** Built-in automatic optimization for images (\`next/image\`), fonts (\`next/font\`), and scripts (\`next/script\`).
5. **Full-Stack Capabilities:** Build both backend endpoints and frontend interfaces within the same codebase.

### Interview answer:
Next.js transforms React from a client-side library into a production full-stack framework. It solves the poor initial load times and weak SEO of traditional client-rendered SPAs by offering hybrid rendering (SSR, SSG, ISR), built-in file-based routing, and automated asset optimizations.`,
    followUps: [
      "When might a client-side SPA (like Vite) still be preferable to Next.js?",
      "How does Next.js handle code splitting automatically?",
      "What is Core Web Vitals and how does Next.js optimize for them?"
    ],
    keyPoints: [
      "Full-stack React framework with server-side rendering and static site generation",
      "Superior SEO and initial page load compared to client-rendered SPAs",
      "File-system based routing eliminates manual router configs",
      "Built-in image, font, and script optimizations"
    ],
    tags: ["nextjs", "react", "ssr", "seo", "spa"],
    relatedLessonSlug: "/learn/nextjs/nxt01-what-is-nextjs",
    relatedLessonName: "NXT-01: What is Next.js & Full-Stack React"
  },
  {
    id: "next-q05",
    trackKey: "nextjs",
    category: "Architecture & Routing",
    subtopic: "App vs Pages Router",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What are the main differences between the App Router (`app/`) and the Pages Router (`pages/`) in Next.js?",
    answer: `### Simple answer:
The App Router is Next.js's modern architecture introduced in Next.js 13. It is built natively on React 18+ Server Components and nested layouts, replacing the older Pages Router.

### Key Differences:
| Feature | Pages Router (\`pages/\`) | App Router (\`app/\`) |
|---|---|---|
| **Default Component Type** | Client-side React components | **Server Components** by default |
| **Routing files** | \`pages/about.tsx\` -> \`/about\` | \`app/about/page.tsx\` -> \`/about\` |
| **Layouts** | Cumbersome custom layout wrappers | Native nested \`layout.tsx\` files that preserve state |
| **Data Fetching** | \`getServerSideProps\`, \`getStaticProps\` | Standard \`async/await\` directly in components |
| **Loading & Errors** | Manual state tracking | Special file conventions: \`loading.tsx\`, \`error.tsx\` |

### Interview answer:
The App Router replaces the Pages Router with native React Server Components, nested layouts that don't re-render on navigation, direct async/await data fetching instead of \`getStaticProps\`, and convention-based files like \`loading.tsx\` and \`error.tsx\` for Suspense streaming.`,
    followUps: [
      "Can you run both Pages Router and App Router in the same Next.js project during migration?",
      "Why do layouts in App Router preserve state and avoid re-rendering on page changes?",
      "What replaced getServerSideProps in the App Router?"
    ],
    keyPoints: [
      "App Router uses React Server Components by default",
      "Nested layouts preserve state and avoid re-renders across child route changes",
      "Async/await replaces getStaticProps and getServerSideProps",
      "Both routers can coexist in the same repo during gradual migration"
    ],
    tags: ["app-router", "pages-router", "nextjs-architecture", "migration"],
    relatedLessonSlug: "/learn/nextjs/nxt02-app-router-mental-model",
    relatedLessonName: "NXT-02: App Router Mental Model & File Conventions"
  },
  {
    id: "next-q06",
    trackKey: "nextjs",
    category: "Routing & Conventions",
    subtopic: "File Conventions",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "Explain the special file conventions in the Next.js App Router: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx`.",
    answer: `### Simple answer:
Next.js App Router uses reserved filenames inside route folders to automatically configure the UI and state handling:

- **\`page.tsx\`**: Defines the unique UI for a route. Without this file, a folder is not publicly accessible.
- **\`layout.tsx\`**: Shared UI wrapper across multiple pages (e.g. navigation bar, sidebar). Does **not** re-render when navigating between sibling pages.
- **\`loading.tsx\`**: Automatically wraps the page in a **React Suspense boundary** with a fallback loading skeleton while server data fetches.
- **\`error.tsx\`**: Automatically wraps the page in an **Error Boundary**. Must be a Client Component (\`"use client"\`) to render a retry fallback.
- **\`not-found.tsx\`**: Rendered when \`notFound()\` is thrown or when an invalid URL is accessed.

### Folder Structure Example:
\`\`\`
app/
├── layout.tsx         (Root layout with <html> and <body>)
├── page.tsx           (Home page at /)
└── dashboard/
    ├── layout.tsx     (Dashboard sidebar layout)
    ├── loading.tsx    (Dashboard skeleton UI)
    ├── error.tsx      (Dashboard error fallback)
    └── page.tsx       (Dashboard main view at /dashboard)
\`\`\`

### Interview answer:
Next.js uses convention-based files inside folders: \`page.tsx\` defines the route UI, \`layout.tsx\` wraps child pages and preserves state across navigations, \`loading.tsx\` creates an instant Suspense skeleton, \`error.tsx\` catches runtime crashes with retry capability, and \`not-found.tsx\` handles 404 views.`,
    followUps: [
      "Why must error.tsx be declared as a Client Component with 'use client'?",
      "How do template.tsx files differ from layout.tsx files?",
      "Can a nested layout access props or state from a child page?"
    ],
    keyPoints: [
      "page.tsx makes a route segment publicly addressable",
      "layout.tsx persists across navigations without re-rendering",
      "loading.tsx automatically enables streaming with React Suspense",
      "error.tsx must be a Client Component to catch rendering errors and provide reset"
    ],
    tags: ["file-conventions", "app-router", "layout", "loading", "error-handling"],
    relatedLessonSlug: "/learn/nextjs/nxt02-app-router-mental-model",
    relatedLessonName: "NXT-02: App Router Mental Model & File Conventions"
  },
  {
    id: "next-q07",
    trackKey: "nextjs",
    category: "Routing & APIs",
    subtopic: "Route Handlers",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "How do Dynamic Routes and Route Handlers (`route.ts`) work in the Next.js App Router?",
    answer: `### Simple answer:
- **Dynamic Routes:** Folders wrapped in brackets like \`[id]\` create routes with variable URL parameters (e.g. \`/users/123\`).
- **Route Handlers:** Files named \`route.ts\` define custom backend HTTP API endpoints (like \`GET\`, \`POST\`, \`PUT\`, \`DELETE\`) using the web standard \`Request\` and \`Response\` APIs.

### 1. Dynamic Route Example:
\`\`\`tsx
// app/users/[id]/page.tsx:
interface PageProps {
  params: Promise<{ id: string }>; // In Next.js 15, params is a Promise
}

export default async function UserPage({ params }: PageProps) {
  const { id } = await params;
  return <h1>User ID: {id}</h1>;
}
\`\`\`

### 2. Route Handler Example:
\`\`\`ts
// app/api/users/route.ts:
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") || "10";
  return NextResponse.json({ users: ["Alice", "Bob"], limit });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ success: true, created: body }, { status: 201 });
}
\`\`\`

### Rule:
A folder cannot have both a \`page.tsx\` and a \`route.ts\` at the same level because they would both compete to resolve the same URL path.

### Interview answer:
Dynamic routes use bracketed folder names like \`[id]\` to extract URL parameters. Route Handlers (\`route.ts\`) create REST API endpoints using standard HTTP method functions like \`GET\` and \`POST\`, returning \`NextResponse.json()\`.`,
    followUps: [
      "What is the difference between [slug] and catch-all [...slug] or optional [[...slug]] routes?",
      "Why did Next.js 15 make params and searchParams asynchronous Promises?",
      "When should you use Server Actions instead of Route Handlers?"
    ],
    keyPoints: [
      "Bracket syntax [id] creates dynamic route segments",
      "route.ts exports named HTTP functions (GET, POST, PUT, DELETE)",
      "Uses web standard Request and Response / NextResponse",
      "Cannot have page.tsx and route.ts at the exact same route segment"
    ],
    tags: ["dynamic-routes", "route-handlers", "api-routes", "rest-api"],
    relatedLessonSlug: "/learn/nextjs/nxt04-dynamic-routes-and-route-handlers",
    relatedLessonName: "NXT-04: Dynamic Routing & Route Handlers"
  },
  {
    id: "next-q08",
    trackKey: "nextjs",
    category: "Rendering Strategies",
    subtopic: "SSG vs SSR vs ISR",
    type: "conceptual",
    difficulty: "medium",
    source: "curated",
    question: "Compare SSG, SSR, and ISR in Next.js. When should you choose each rendering strategy?",
    answer: `### Simple answer:
These are three server-side rendering strategies that determine **when** HTML is created:

| Strategy | When HTML is generated | Performance | Best Use Case |
|---|---|---|---|
| **SSG (Static Site Generation)** | At **build time** once | Blazing fast (cached on global CDN) | Marketing pages, documentation, blog posts |
| **SSR (Server-Side Rendering)** | On **every user request** | Slower (waits for server calculation) | Personalized user dashboards, real-time banking data |
| **ISR (Incremental Static Regeneration)** | At build time, then **regenerated in background** on interval | Fast CDN speed + fresh content | E-commerce product catalogs, news feeds |

### How ISR Works in App Router:
\`\`\`tsx
// Statically pre-rendered, then re-fetched at most once every 60 seconds:
export default async function ProductPage() {
  const res = await fetch("https://api.store.com/products", {
    next: { revalidate: 60 } // Revalidate in background every 60s
  });
  const products = await res.json();
  return <ProductList items={products} />;
}
\`\`\`

### Interview answer:
SSG builds static HTML once at build time for maximum CDN speed. SSR generates fresh HTML on every incoming request for user-specific dynamic data. ISR provides the best of both worlds: it serves fast static HTML from CDN while periodically regenerating pages in the background when data changes.`,
    followUps: [
      "What is on-demand revalidation using revalidateTag() vs time-based revalidation?",
      "What is Partial Prerendering (PPR) in Next.js?",
      "What happens if a background ISR rebuild fails with an error?"
    ],
    keyPoints: [
      "SSG generates HTML at build time for CDN caching",
      "SSR renders dynamically on every request",
      "ISR updates static pages in background without full rebuilds",
      "revalidate option on fetch controls ISR frequency"
    ],
    tags: ["ssg", "ssr", "isr", "rendering-strategies", "performance"],
    relatedLessonSlug: "/learn/nextjs/nxt05-rendering-strategies-ssg-ssr-isr",
    relatedLessonName: "NXT-05: SSG, SSR & Incremental Static Regeneration"
  },
  {
    id: "next-q09",
    trackKey: "nextjs",
    category: "Optimization & Media",
    subtopic: "Image Optimization",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "What are the benefits of the `next/image` component, and how does it prevent Cumulative Layout Shift (CLS)?",
    answer: `### Simple answer:
The \`next/image\` component extends the standard HTML \`<img>\` tag to automatically optimize images for size, performance, and visual stability.

### Key Benefits:
1. **Prevents Cumulative Layout Shift (CLS):** Requires explicit \`width\` and \`height\` (or \`fill\`), reserving the exact space in layout before the image loads so the page does not jump around.
2. **Modern Format Serving:** Automatically converts JPEG/PNG to modern lightweight formats like **WebP** and **AVIF** based on browser support.
3. **Responsive Resizing:** Generates responsive \`srcset\` images scaled to match the user's specific screen viewport.
4. **Lazy Loading by Default:** Images load only as they approach the user's viewport, saving bandwidth.
5. **Blur-up Placeholders:** Built-in support for low-resolution blurred placeholder images while full assets load.

### Example:
\`\`\`tsx
import Image from "next/image";

export function HeroImage() {
  return (
    <Image
      src="/hero-banner.png"
      alt="LearnCraft platform dashboard"
      width={1200}
      height={630}
      priority // Use 'priority' for Largest Contentful Paint (LCP) above-the-fold images!
      placeholder="blur"
      blurDataURL="data:image/png;base64,..."
    />
  );
}
\`\`\`

### Interview answer:
\`next/image\` automatically optimizes images on-demand into WebP/AVIF, resizes them responsively, and lazy loads them. It eliminates Cumulative Layout Shift by reserving space upfront using aspect ratio dimensions, and the \`priority\` prop optimizes above-the-fold images for LCP.`,
    followUps: [
      "When should you use the fill prop instead of fixed width and height in next/image?",
      "Why must remote domains be configured in next.config.js for next/image?",
      "What is the priority prop and when should it be applied?"
    ],
    keyPoints: [
      "Reserves space upfront to eliminate Cumulative Layout Shift (CLS)",
      "Automatically serves AVIF and WebP formats",
      "Native lazy-loading; use priority for LCP images",
      "Remote image URLs must be whitelisted in next.config.js"
    ],
    tags: ["next-image", "cls", "core-web-vitals", "optimization", "performance"],
    relatedLessonSlug: "/learn/nextjs/nxt06-image-and-font-optimization",
    relatedLessonName: "NXT-06: Next.js Image & Font Optimization"
  },
  {
    id: "next-q10",
    trackKey: "nextjs",
    category: "Middleware & Edge",
    subtopic: "Middleware",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "What is Next.js Middleware (`middleware.ts`), where does it run, and what are common use cases?",
    answer: `### Simple answer:
Next.js Middleware is code that runs **before a request is completed**. It executes on the lightweight Edge runtime, allowing you to inspect requests and modify responses, redirect users, rewrite URLs, or set headers.

### Where it lives and runs:
- Placed at the root of the project: \`middleware.ts\` (or inside \`src/\`).
- Runs on the **Edge runtime** (V8 isolates), making it extremely fast with near-zero cold starts.

### Common Use Cases:
1. **Authentication & Authorization:** Check session tokens or cookies before granting access to protected routes (\`/dashboard\`).
2. **Redirects & Rewrites:** Redirect legacy URLs or rewrite paths for multi-tenant subdomains (\`customer.domain.com\`).
3. **Geo-targeting & Localization:** Detect user country and redirect to appropriate language prefix (\`/en\`, \`/de\`).
4. **Security Headers & A/B Testing:** Inject Content Security Policies or cookie flags.

### Example:
\`\`\`ts
// middleware.ts:
import { NextResponse } from "next/server";
import type { NextRequest } from "next/request";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Only run on specific paths:
export const config = {
  matcher: ["/dashboard/:path*"],
};
\`\`\`

### Interview answer:
Next.js middleware runs before incoming requests reach route handlers or pages. Operating on the Edge runtime, it inspects headers and cookies to enforce authentication guards, execute redirects or rewrites, and configure internationalization routing before page rendering begins.`,
    followUps: [
      "What is the difference between NextResponse.redirect() and NextResponse.rewrite()?",
      "Why can't you use standard Node.js APIs (like fs or child_process) inside Middleware?",
      "How do matcher config arrays optimize middleware execution?"
    ],
    keyPoints: [
      "Executes before requests reach the page or route handler",
      "Runs on Edge runtime (no Node.js fs access)",
      "NextResponse.redirect changes URL in browser; rewrite keeps URL unchanged",
      "Uses matcher to avoid executing on static assets (_next/static)"
    ],
    tags: ["middleware", "edge-runtime", "authentication", "redirects"],
    relatedLessonSlug: "/learn/nextjs/nxt09-middleware-and-edge-runtime",
    relatedLessonName: "NXT-09: Next.js Middleware & Edge Functions"
  },
  {
    id: "next-q11",
    trackKey: "nextjs",
    category: "Streaming & Suspense",
    subtopic: "Streaming UI",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "How does Streaming with React Suspense work in the Next.js App Router, and how does it prevent slow database calls from blocking the entire page?",
    answer: `### Simple answer:
In traditional SSR, if one slow database query takes 3 seconds, the entire browser page stays blank for 3 seconds. Streaming breaks the page into chunks: the server immediately sends the fast static shell (headers, navigation), and streams slower dynamic sections as soon as their data resolves.

### How it works:
1. The server flushes initial HTML with **loading skeletons** instantly.
2. Slower data fetching components are wrapped in **\`<Suspense fallback={<Skeleton />}>\`**.
3. When the async component finishes on the server, Next.js streams the final HTML and swaps it in place without a full page reload.

### Example:
\`\`\`tsx
import { Suspense } from "react";

export default function Dashboard() {
  return (
    <div>
      <Header /> {/* Renders instantly! */}
      <Suspense fallback={<AnalyticsSkeleton />}>
        <SlowAnalyticsWidget /> {/* Streams in after 2 seconds */}
      </Suspense>
      <Suspense fallback={<ActivitySkeleton />}>
        <RecentActivityWidget /> {/* Streams in after 1 second */}
      </Suspense>
    </div>
  );
}
\`\`\`

### \`loading.tsx\` convention:
Creating a \`loading.tsx\` file in any route folder automatically wraps the entire \`page.tsx\` in a Suspense boundary behind the scenes!

### Interview answer:
Streaming with Suspense prevents slow server operations from blocking the entire page. Next.js flushes the static layout and skeleton loaders immediately over HTTP, and streams in slower components as chunks as soon as their data resolves, greatly improving Time to First Byte (TTFB) and perceived performance.`,
    followUps: [
      "What is the difference between page-level loading.tsx and component-level <Suspense>?",
      "How does HTTP chunked transfer encoding enable streaming?",
      "Can Client Components be streamed, or only Server Components?"
    ],
    keyPoints: [
      "Breaks SSR HTML rendering into chunks streamed over HTTP",
      "Fast static shell renders immediately while slow data fetches resolve in parallel",
      "loading.tsx creates an automatic page-level Suspense boundary",
      "Greatly reduces Time to First Byte (TTFB) and First Contentful Paint (FCP)"
    ],
    tags: ["streaming", "suspense", "loading", "ttfb", "performance"],
    relatedLessonSlug: "/learn/nextjs/nxt02-app-router-mental-model",
    relatedLessonName: "NXT-02: App Router Mental Model & File Conventions"
  },
  {
    id: "next-q12",
    trackKey: "nextjs",
    category: "SEO & Metadata",
    subtopic: "Metadata API",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "How does the Next.js Metadata API work for Static and Dynamic SEO (`generateMetadata`)?",
    answer: `### Simple answer:
Next.js provides a built-in Metadata API to define HTML head tags (\`<title>\`, \`<meta>\`, Open Graph tags) in Server Components without needing external libraries like \`react-helmet\`.

### 1. Static Metadata:
Export a static \`metadata\` object from \`layout.tsx\` or \`page.tsx\`:
\`\`\`tsx
// app/about/page.tsx:
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | LearnCraft",
  description: "Learn modern full-stack web engineering interactively.",
  openGraph: {
    images: ["/og-about.png"],
  },
};
\`\`\`

### 2. Dynamic Metadata (\`generateMetadata\`):
For pages that rely on dynamic route parameters (like a blog post or product):
\`\`\`tsx
// app/posts/[slug]/page.tsx:
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.post.findUnique({ where: { slug } });

  return {
    title: \`\${post.title} | LearnCraft\`,
    description: post.summary,
    openGraph: {
      title: post.title,
      images: [post.coverImage],
    },
  };
}
\`\`\`

### Interview answer:
Next.js handles SEO through its Metadata API. For static pages, you export a \`metadata\` object. For dynamic pages, you export an \`async generateMetadata()\` function that fetches data and returns dynamic titles, descriptions, and Open Graph tags. Next.js automatically dedupes identical fetches made in both \`generateMetadata\` and the page component.`,
    followUps: [
      "How does Next.js deduplicate identical fetches in generateMetadata and page.tsx?",
      "How does metadata inheritance and cascading work from root layout down to pages?",
      "What is generateStaticParams and how does it relate to dynamic metadata?"
    ],
    keyPoints: [
      "Replaces third-party libraries like react-helmet",
      "Export metadata object for static tags, generateMetadata for dynamic data",
      "React Request Memoization prevents duplicate database/API fetches",
      "Supports OpenGraph, Twitter cards, canonical URLs, and robots directives"
    ],
    tags: ["metadata", "seo", "generateMetadata", "open-graph"],
    relatedLessonSlug: "/learn/nextjs/nxt10-seo-and-metadata-optimization",
    relatedLessonName: "NXT-10: Search Engine Optimization & The Metadata API"
  },
  {
    id: "next-q13",
    trackKey: "nextjs",
    category: "Advanced Routing",
    subtopic: "Route Groups and Slots",
    type: "architecture",
    difficulty: "medium",
    source: "curated",
    question: "What are Route Groups `(folder)` and Parallel Routes (`@slot`) in Next.js?",
    answer: `### Simple answer:
- **Route Groups \`(name)\`:** Organize files and layouts without affecting the public URL path.
- **Parallel Routes \`@slot\`:** Render multiple independent pages in the same layout simultaneously (like dashboards or modal overlays).

### 1. Route Groups:
Wrapping folder names in parentheses removes them from the URL:
\`\`\`
app/
├── (marketing)/
│   ├── about/page.tsx  -> Accessible at /about (NOT /marketing/about!)
│   └── layout.tsx      (Marketing layout with public navbar)
└── (auth)/
    ├── login/page.tsx  -> Accessible at /login
    └── layout.tsx      (Clean centered auth layout)
\`\`\`
Allows having **different root layouts** for different sections of the app!

### 2. Parallel Routes:
Folders prefixed with \`@\` create named "slots" passed as props to the parent layout:
\`\`\`tsx
// app/dashboard/layout.tsx:
export default function Layout({
  children,
  analytics, // from app/dashboard/@analytics/page.tsx
  team,      // from app/dashboard/@team/page.tsx
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <div className="grid grid-cols-2">{analytics}{team}</div>
    </div>
  );
}
\`\`\`

### Interview answer:
Route Groups wrapped in parentheses organize routes into logical sections and multiple layouts without adding segments to the URL path. Parallel routes prefixed with \`@slot\` allow rendering multiple independent views concurrently in the same layout, each with its own loading and error states.`,
    followUps: [
      "What are Intercepting Routes (.) and how do they combine with Parallel Routes for modal dialogs?",
      "What is default.tsx in parallel routes and when is it required?",
      "How do route groups enable completely separate Root Layouts (html/body)?"
    ],
    keyPoints: [
      "(folder) route groups omit the folder name from the final URL path",
      "Enables multiple distinct root layouts in a single application",
      "@slot parallel routes render concurrent views into a shared layout",
      "Ideal for complex split dashboards and URL-driven modal popups"
    ],
    tags: ["route-groups", "parallel-routes", "advanced-routing", "architecture"],
    relatedLessonSlug: "/learn/nextjs/nxt02-app-router-mental-model",
    relatedLessonName: "NXT-02: App Router Mental Model & File Conventions"
  },
  {
    id: "next-q14",
    trackKey: "nextjs",
    category: "Security & Configuration",
    subtopic: "Environment Variables",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "How do Environment Variables work in Next.js, and what is the difference between private secrets and `NEXT_PUBLIC_` variables?",
    answer: `### Simple answer:
Next.js supports \`.env\` files to store configuration values. By default, all environment variables are **private and server-only**. To safely expose a variable to the browser, you must prefix its name with **\`NEXT_PUBLIC_\`**.

### Comparison:
| Variable Type | Example | Accessible On Server | Accessible In Browser |
|---|---|---|---|
| **Private (Default)** | \`DATABASE_URL\`, \`STRIPE_SECRET_KEY\` | Yes | ❌ No (returns \`undefined\`) |
| **Public (\`NEXT_PUBLIC_\`)** | \`NEXT_PUBLIC_API_URL\`, \`NEXT_PUBLIC_GA_ID\` | Yes | **Yes** (inlined into client JS) |

### Security Warning:
Never prefix secret keys (like database passwords, API secret keys, or private signing keys) with \`NEXT_PUBLIC_\`! Doing so bundles the secret into the client JavaScript, where any user can inspect it via browser DevTools.

### \`.env\` Loading Hierarchy:
1. \`process.env\` (system variables)
2. \`.env.production.local\` / \`.env.development.local\`
3. \`.env.local\` (local machine overrides, git-ignored)
4. \`.env.production\` / \`.env.development\`
5. \`.env\` (defaults)

### Interview answer:
Next.js environment variables are strictly server-only by default, preventing secret leaks. Only variables explicitly prefixed with \`NEXT_PUBLIC_\` are inlined into client JavaScript bundles. Local secrets belong in \`.env.local\`, which should never be committed to git.`,
    followUps: [
      "What happens if you accidentally import a server-only variable inside a 'use client' component?",
      "How does the server-only npm package protect against leaking server secrets?",
      "How do you validate environment variables at build time using Zod (e.g. t3-env)?"
    ],
    keyPoints: [
      "Server-only by default to prevent secret leakage",
      "NEXT_PUBLIC_ prefix inlines values into client-side JS bundle",
      ".env.local is used for local overrides and must be git-ignored",
      "Use 'server-only' package or Zod validation to ensure secrets stay on the server"
    ],
    tags: ["environment-variables", "security", "config", "nextjs"],
    relatedLessonSlug: "/learn/nextjs/nxt01-what-is-nextjs",
    relatedLessonName: "NXT-01: What is Next.js & Full-Stack React"
  },
  {
    id: "next-q15",
    trackKey: "nextjs",
    category: "DevOps & Deployment",
    subtopic: "Deployment",
    type: "architecture",
    difficulty: "hard",
    source: "curated",
    question: "Compare deploying Next.js on Vercel vs self-hosting with Node.js / Docker. What are the operational trade-offs?",
    answer: `### Simple answer:
Next.js can be deployed serverlessly on Vercel or packaged as a standalone Docker container running on your own servers (AWS EC2, Kubernetes, DigitalOcean).

### Comparison:
| Aspect | Vercel (Serverless / Managed) | Self-Hosted (Docker / Node server) |
|---|---|---|
| **Setup effort** | Zero config (git push deploys) | Requires Dockerfile, reverse proxy (NGINX), SSL, CI/CD |
| **ISR & Caching** | Global distributed edge cache managed automatically | Requires shared storage (Redis/S3) or multi-pod cache sync |
| **Server Actions & API** | Serverless functions (cold starts, execution timeouts) | Long-running Node server (persistent connections, WebSockets possible) |
| **Cost at scale** | High bandwidth / function invocation costs | Predictable infrastructure costs (pay for server specs) |
| **Image Optimization** | Vercel managed image pipeline | Runs sharp inside Docker container (consumes server CPU/RAM) |

### Standalone Docker Output:
Next.js provides an \`output: "standalone"\` setting in \`next.config.js\` that bundles only the required \`node_modules\`, reducing container image sizes from ~1GB to ~80MB!

### Interview answer:
Vercel offers zero-configuration global edge deployments with automatic ISR and image optimization, but can get expensive at high traffic. Self-hosting with standalone Docker containers gives predictable infrastructure costs and long-running process control, but requires managing cache synchronization, reverse proxies, and server maintenance yourself.`,
    followUps: [
      "What is output: 'standalone' in next.config.js?",
      "How do you handle multi-container ISR caching in Kubernetes using Redis?",
      "What are the cold-start implications of serverless Next.js functions?"
    ],
    keyPoints: [
      "Vercel manages global edge caching, serverless scaling, and image optimization automatically",
      "Self-hosting uses output: 'standalone' for lightweight Docker containers (~80MB)",
      "Self-hosting provides predictable cost and eliminates serverless function execution limits",
      "Self-hosting requires custom caching adapters (Redis) for ISR across multiple pods"
    ],
    tags: ["deployment", "docker", "vercel", "self-hosting", "devops"],
    relatedLessonSlug: "/learn/nextjs/nxt10-seo-and-metadata-optimization",
    relatedLessonName: "NXT-10: Search Engine Optimization & Deployment"
  }
];
