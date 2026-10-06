/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * GUIDED ROADMAP JOURNEY DATA
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Progressive disclosure learning paths for:
 * - Backend Engineering (6 core milestones + 4 advanced topics)
 * - Frontend Engineering (6 core milestones + 4 advanced topics)
 * - Full-Stack Engineering (7 core milestones + 4 advanced topics)
 *
 * Designed to eliminate cognitive overload for beginners:
 * - Simple outcome-oriented descriptions
 * - Explicit decision points ("Choose ONE — You only need one")
 * - Clear separation of core milestones from advanced topics
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export type JourneyRole = "backend" | "frontend" | "fullstack";

export interface DecisionOption {
  name: string;
  slug?: string;
  tag: string;
  desc?: string;
  isRecommended: boolean;
  isAvailable?: boolean;
  lessons?: number;
}

export interface DecisionPoint {
  title: string;
  explanation: string;
  options: DecisionOption[];
}

export interface CourseLink {
  title: string;
  slug: string;
  lessons: number;
}

export interface JourneyStep {
  id: string;
  number: string;
  title: string;
  outcome: string;
  duration: string;
  category: string;
  iconSlug?: string;
  whatYoullLearn: string[];
  decisionPoint?: DecisionPoint;
  courseLink?: CourseLink;
}

export interface AdvancedTopic {
  id: string;
  title: string;
  description: string;
  topics: string[];
  iconSlug?: string;
}

export interface JourneyRoadmap {
  role: JourneyRole;
  title: string;
  subtitle: string;
  experienceLevel: string;
  durationEstimate: string;
  totalCoreSteps: number;
  steps: JourneyStep[];
  advancedTopicsTitle: string;
  advancedTopicsSubtitle: string;
  advancedTopics: AdvancedTopic[];
}

// ─────────────────────────────────────────────────────────────
// BACKEND ENGINEERING ROADMAP
// ─────────────────────────────────────────────────────────────

export const BACKEND_JOURNEY: JourneyRoadmap = {
  role: "backend",
  title: "Backend Engineering Roadmap",
  subtitle: "Learn backend development step by step, from programming fundamentals to building production-ready applications.",
  experienceLevel: "Beginner friendly",
  durationEstimate: "4–6 months",
  totalCoreSteps: 6,
  steps: [
    {
      id: "be-step-1",
      number: "01",
      title: "Programming Fundamentals",
      outcome: "Learn the programming fundamentals you'll use throughout the roadmap.",
      duration: "2–3 weeks",
      category: "Language Core",
      iconSlug: "nodejs",
      whatYoullLearn: [
        "Variables, loops, functions, and control flow",
        "Key data structures (Arrays, Objects, Maps, and Sets)",
        "Asynchronous programming (Promises, async/await, and the event loop)",
        "Error handling, try/catch patterns, and debugging",
        "Modules, package management (npm), and environment variables",
      ],
      decisionPoint: {
        title: "Choose one language to start with",
        explanation: "You only need one language to master backend development. You can always learn another later.",
        options: [
          {
            name: "Node.js (JavaScript / TypeScript)",
            slug: "nodejs",
            tag: "High industry demand • Shared frontend stack",
            desc: "The most popular runtime for modern web development and full-stack integration.",
            isRecommended: true,
          },
          {
            name: "Python",
            slug: "python",
            tag: "Readable syntax • Great for data & AI",
            desc: "Excellent beginner readability with a vast ecosystem for APIs and machine learning.",
            isRecommended: false,
          },
          {
            name: "Go (Golang)",
            slug: "go",
            tag: "High concurrency • Fast execution",
            desc: "Clean, compiled language favored by cloud infrastructure teams.",
            isRecommended: false,
          },
        ],
      },
    },
    {
      id: "be-step-2",
      number: "02",
      title: "Backend Fundamentals",
      outcome: "Understand servers, HTTP, REST APIs, requests, and responses.",
      duration: "2–3 weeks",
      category: "Web Mechanics",
      iconSlug: "git",
      whatYoullLearn: [
        "How the client-server model and internet protocols work",
        "HTTP methods (GET, POST, PUT, DELETE, PATCH) and status codes",
        "Request headers, query parameters, URL routing, and request bodies",
        "Building clean RESTful API endpoint structures",
        "JSON serialization, parsing, and basic input validation",
      ],
    },
    {
      id: "be-step-3",
      number: "03",
      title: "Backend Framework",
      outcome: "Choose ONE framework and learn how to build production-ready APIs.",
      duration: "3–4 weeks",
      category: "API Architecture",
      iconSlug: "nestjs",
      courseLink: {
        title: "NestJS Elite Architecture",
        slug: "nestjs",
        lessons: 32,
      },
      whatYoullLearn: [
        "Routing, request controllers, and service layers",
        "Middleware pipelines, interceptors, and request lifecycles",
        "Dependency Injection (DI) for testable, modular code",
        "Request body validation using DTOs and decorators",
        "Structured error handling and logging",
      ],
      decisionPoint: {
        title: "Choose your backend framework",
        explanation: "You only need one framework. You can always learn another later.",
        options: [
          {
            name: "NestJS",
            slug: "nestjs",
            tag: "Enterprise standard • TypeScript first",
            desc: "Structured modular architecture with built-in Dependency Injection, Guards, and validation.",
            isRecommended: true,
            isAvailable: true,
            lessons: 32,
          },
          {
            name: "Express.js",
            slug: "express",
            tag: "Minimalist & unopinionated",
            desc: "Lightweight routing and bare-metal HTTP handling with maximum configuration freedom.",
            isRecommended: false,
            isAvailable: true,
            lessons: 28,
          },
          {
            name: "Fastify",
            slug: "fastify",
            tag: "High-throughput performance",
            desc: "Low-overhead web framework focusing on speed and JSON schema validation.",
            isRecommended: false,
          },
        ],
      },
    },
    {
      id: "be-step-4",
      number: "04",
      title: "Databases & Data Persistence",
      outcome: "Learn how applications securely store, query, and retrieve data.",
      duration: "3–4 weeks",
      category: "Data Storage",
      iconSlug: "postgresql",
      whatYoullLearn: [
        "Relational table design, primary keys, and foreign keys",
        "Writing SQL queries (SELECT, INSERT, UPDATE, JOINs, aggregations)",
        "ACID transactions to guarantee data integrity",
        "Using ORMs / query builders (TypeORM or Prisma) to interact safely with databases",
        "Database migrations to evolve schemas over time",
        "In-memory caching basics with Redis",
      ],
      decisionPoint: {
        title: "Start with a relational database",
        explanation: "Relational SQL databases are the foundational standard across backend engineering. Learn SQL first.",
        options: [
          {
            name: "PostgreSQL",
            slug: "postgresql",
            tag: "Industry gold standard • ACID compliance",
            desc: "Rock-solid relational database with rich indexing, JSON support, and high reliability.",
            isRecommended: true,
          },
          {
            name: "MongoDB",
            slug: "mongodb",
            tag: "Document store • Flexible schema",
            desc: "JSON-like document database suited for rapid prototyping and flexible data shapes.",
            isRecommended: false,
          },
        ],
      },
    },
    {
      id: "be-step-5",
      number: "05",
      title: "Authentication & Security",
      outcome: "Learn how to securely log users in and protect private parts of your application.",
      duration: "2–3 weeks",
      category: "Application Security",
      iconSlug: "auth",
      courseLink: {
        title: "Security & Auth in NestJS",
        slug: "nestjs",
        lessons: 32,
      },
      whatYoullLearn: [
        "Password hashing with bcrypt or Argon2 (never store raw passwords)",
        "Stateless token authentication using JSON Web Tokens (JWT)",
        "Refresh token rotation and secure HTTP-only cookie storage",
        "Role-Based Access Control (RBAC) to protect specific routes",
        "Defense essentials: CORS policies, rate limiting, and Helmet security headers",
      ],
    },
    {
      id: "be-step-6",
      number: "06",
      title: "Build a Real Backend Project",
      outcome: "Combine all your backend skills to build, test, and deploy a practical API.",
      duration: "3–4 weeks",
      category: "Portfolio Capstone",
      iconSlug: "docker",
      whatYoullLearn: [
        "Architecting a complete real-world API (e.g., E-commerce API, Booking System, or SaaS backend)",
        "Modeling relational schemas and writing automated seeders and migrations",
        "Implementing full authentication, authorization, and payments integration",
        "Writing automated unit and integration tests with Jest or Vitest",
        "Packaging the backend into a Docker container and deploying to cloud hosting",
      ],
    },
  ],
  advancedTopicsTitle: "Advanced Topics",
  advancedTopicsSubtitle: "Learn these after you're comfortable building backend applications.",
  advancedTopics: [
    {
      id: "be-adv-1",
      title: "System Design & Architecture",
      description: "Learn architectural trade-offs, load balancers, caching strategies, horizontal scaling, and capacity estimation.",
      topics: ["Load Balancing", "Horizontal Scaling", "CDN & Cache Patterns", "Database Sharding"],
      iconSlug: "architect",
    },
    {
      id: "be-adv-2",
      title: "Microservices & Message Brokers",
      description: "Decouple monolithic services into resilient, event-driven microservices communicating via message queues.",
      topics: ["Event-Driven Messaging", "RabbitMQ / Kafka", "gRPC / TCP Transports", "API Gateway Routing"],
      iconSlug: "microservice",
    },
    {
      id: "be-adv-3",
      title: "Docker, CI/CD & Deployment",
      description: "Automate code quality checks, multi-stage Docker builds, and automated deployments with GitHub Actions.",
      topics: ["Multi-Stage Dockerfiles", "GitHub Actions CI/CD", "Container Networking", "Cloud Hosting"],
      iconSlug: "docker",
    },
    {
      id: "be-adv-4",
      title: "Performance & Scaling",
      description: "Diagnose bottlenecks, optimize SQL queries with EXPLAIN ANALYZE, tune connection pools, and monitor metrics.",
      topics: ["EXPLAIN ANALYZE", "Connection Pooling", "Memory Profiling", "Prometheus & Grafana"],
      iconSlug: "system",
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// FRONTEND ENGINEERING ROADMAP
// ─────────────────────────────────────────────────────────────

export const FRONTEND_JOURNEY: JourneyRoadmap = {
  role: "frontend",
  title: "Frontend Engineering Roadmap",
  subtitle: "Learn frontend development step by step, from web fundamentals to building modern, performant web applications.",
  experienceLevel: "Beginner friendly",
  durationEstimate: "3–5 months",
  totalCoreSteps: 6,
  steps: [
    {
      id: "fe-step-1",
      number: "01",
      title: "Web Fundamentals",
      outcome: "Master HTML semantics, modern CSS layouts, and JavaScript fundamentals.",
      duration: "3–4 weeks",
      category: "Web Foundations",
      iconSlug: "javascript",
      whatYoullLearn: [
        "Semantic HTML5 tags for accessible, SEO-friendly structure",
        "Modern CSS: Flexbox, CSS Grid, custom properties, and responsive design",
        "Modern JavaScript (ES6+): variables, arrow functions, destructuring, and array methods",
        "DOM manipulation, browser event listeners, and event bubbling",
        "Asynchronous JavaScript: Fetch API, Promises, and async/await",
      ],
    },
    {
      id: "fe-step-2",
      number: "02",
      title: "TypeScript",
      outcome: "Learn safer, scalable JavaScript with static types.",
      duration: "2 weeks",
      category: "Type Safety",
      iconSlug: "typescript",
      whatYoullLearn: [
        "Primitive types, type inference, and union types",
        "Interfaces and type aliases for describing complex data shapes",
        "Typing function arguments, return values, and asynchronous calls",
        "Generics basics for reusable, flexible utilities",
        "Configuring TypeScript and avoiding 'any' for clean, robust code",
      ],
    },
    {
      id: "fe-step-3",
      number: "03",
      title: "React Fundamentals",
      outcome: "Build dynamic, interactive user interfaces with components.",
      duration: "3–4 weeks",
      category: "UI Engine",
      iconSlug: "react",
      whatYoullLearn: [
        "Component-driven thinking and JSX syntax",
        "Passing data with props and managing local state with useState",
        "Handling side effects, lifecycles, and subscriptions with useEffect",
        "Lifting state up and communicating between parent and child components",
        "Building reusable, accessible UI component primitives",
      ],
    },
    {
      id: "fe-step-4",
      number: "04",
      title: "Choose a Framework",
      outcome: "Pick ONE modern framework for routing, SSR, and production builds.",
      duration: "3–4 weeks",
      category: "Production Framework",
      iconSlug: "nextjs",
      courseLink: {
        title: "Next.js 15+ Mastery",
        slug: "nextjs",
        lessons: 20,
      },
      whatYoullLearn: [
        "File-based routing, shared layouts, and nested pages",
        "React Server Components (RSC) vs Client Components ('use client')",
        "Server-Side Rendering (SSR), Static Site Generation (SSG), and streaming",
        "Image and font optimization for instant page loads",
        "Server Actions and route handlers for seamless full-stack capabilities",
      ],
      decisionPoint: {
        title: "Choose your React framework",
        explanation: "You only need one framework. Next.js is the industry standard for production React web applications.",
        options: [
          {
            name: "Next.js (App Router)",
            slug: "nextjs",
            tag: "Production standard • Full-stack React",
            desc: "Modern App Router architecture with Server Components, streaming UI, and built-in optimization.",
            isRecommended: true,
            isAvailable: true,
            lessons: 20,
          },
          {
            name: "Vite + React Router",
            slug: "vite",
            tag: "Lightweight Client SPA",
            desc: "Ultra-fast development server for pure single-page client applications without server rendering.",
            isRecommended: false,
          },
        ],
      },
    },
    {
      id: "fe-step-5",
      number: "05",
      title: "State & Data Management",
      outcome: "Master API data fetching, deterministic caching, and application state.",
      duration: "2–3 weeks",
      category: "State Engine",
      iconSlug: "tanstack",
      courseLink: {
        title: "TanStack Query v5 Mastery",
        slug: "tanstack",
        lessons: 22,
      },
      whatYoullLearn: [
        "Distinguishing between Server State (API data) and Client UI State (modals, dark mode)",
        "Automated data fetching, deduplication, and background refetching",
        "Optimistic UI updates and mutation rollback handlers for snappy interactions",
        "Pagination and infinite scroll lists without race conditions",
        "Simple global client state management using Zustand or React Context",
      ],
      decisionPoint: {
        title: "Choose your server state strategy",
        explanation: "Separate server data caching from local UI state. TanStack Query manages 90% of data fetching complexity.",
        options: [
          {
            name: "TanStack Query v5",
            slug: "tanstack",
            tag: "Async server state standard",
            desc: "Eliminates loading spinners and race conditions with declarative caching and mutations.",
            isRecommended: true,
            isAvailable: true,
            lessons: 22,
          },
          {
            name: "Zustand / Redux Toolkit",
            slug: "zustand",
            tag: "Client-side state store",
            desc: "Lightweight state stores for global client settings, user sessions, and shopping carts.",
            isRecommended: false,
          },
        ],
      },
    },
    {
      id: "fe-step-6",
      number: "06",
      title: "Build a Real Frontend Project",
      outcome: "Combine your skills to build, polish, and launch a complete web application.",
      duration: "3–4 weeks",
      category: "Portfolio Capstone",
      iconSlug: "react",
      whatYoullLearn: [
        "Translating Figma design specifications into pixel-perfect, responsive layouts",
        "Consuming real-world REST or GraphQL APIs with error and empty states",
        "Implementing accessible keyboard navigation and ARIA tags",
        "Form validation with React Hook Form and Zod",
        "Optimizing bundle size and deploying the application to Vercel or Cloudflare Pages",
      ],
    },
  ],
  advancedTopicsTitle: "Advanced Topics",
  advancedTopicsSubtitle: "Learn these after you're comfortable building frontend applications.",
  advancedTopics: [
    {
      id: "fe-adv-1",
      title: "Performance & Core Web Vitals",
      description: "Optimize Largest Contentful Paint (LCP), Interaction to Next Paint (INP), Cumulative Layout Shift (CLS), and analyze bundle sizes.",
      topics: ["Core Web Vitals", "Bundle Splitting", "Dynamic Imports", "Image & Font Optimization"],
      iconSlug: "system",
    },
    {
      id: "fe-adv-2",
      title: "Design Systems & Component Libraries",
      description: "Build reusable, accessible component systems using Radix UI primitives, TailwindCSS, and Storybook documentation.",
      topics: ["Accessible Primitives", "Storybook", "Token Systems", "Polymorphic Components"],
      iconSlug: "architect",
    },
    {
      id: "fe-adv-3",
      title: "Automated Testing (Unit & E2E)",
      description: "Protect applications against regressions using unit tests with Vitest, component tests with React Testing Library, and E2E with Playwright.",
      topics: ["Vitest Unit Tests", "React Testing Library", "Playwright E2E", "Mock Service Worker (MSW)"],
      iconSlug: "git",
    },
    {
      id: "fe-adv-4",
      title: "Edge Computing & Progressive Web Apps",
      description: "Execute personalized rendering at CDN edge nodes and provide offline-capable experiences with service workers.",
      topics: ["Edge Middleware", "Service Workers", "Offline Cache", "Web Manifest & PWA"],
      iconSlug: "docker",
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// FULL-STACK ENGINEERING ROADMAP
// ─────────────────────────────────────────────────────────────

export const FULLSTACK_JOURNEY: JourneyRoadmap = {
  role: "fullstack",
  title: "Full-Stack Engineering Roadmap",
  subtitle: "Learn full-stack development step by step, connecting frontend interfaces with robust backend architectures.",
  experienceLevel: "Beginner friendly",
  durationEstimate: "6–8 months",
  totalCoreSteps: 7,
  steps: [
    {
      id: "fs-step-1",
      number: "01",
      title: "Web Fundamentals",
      outcome: "Master HTML, CSS, modern JavaScript, and web mechanics.",
      duration: "3–4 weeks",
      category: "Foundations",
      iconSlug: "javascript",
      whatYoullLearn: [
        "Semantic HTML and responsive CSS layouts (Flexbox and Grid)",
        "Modern JavaScript (ES6+), async/await, and browser DOM manipulation",
        "Understanding how browsers communicate with web servers over HTTP",
        "Git version control, branches, and collaborative workflows",
      ],
    },
    {
      id: "fs-step-2",
      number: "02",
      title: "Frontend Framework",
      outcome: "Build interactive user interfaces using React and modern component architecture.",
      duration: "3–4 weeks",
      category: "Frontend UI",
      iconSlug: "nextjs",
      courseLink: {
        title: "Next.js 15+ Mastery",
        slug: "nextjs",
        lessons: 20,
      },
      whatYoullLearn: [
        "React component hierarchy, props, and state management",
        "Next.js App Router: file-based routing, nested layouts, and streaming UI",
        "Server Components for fast initial loads and Client Components for interactivity",
        "Styling with TailwindCSS and building responsive component layouts",
      ],
      decisionPoint: {
        title: "Choose your full-stack React framework",
        explanation: "Next.js bridges client UI and server execution in a single unified framework.",
        options: [
          {
            name: "Next.js 15+",
            slug: "nextjs",
            tag: "Production full-stack standard",
            desc: "Full-stack React with App Router, Server Components, and built-in caching.",
            isRecommended: true,
            isAvailable: true,
            lessons: 20,
          },
          {
            name: "React + Vite SPA",
            slug: "react",
            tag: "Pure client SPA",
            desc: "Fast client-side React bundle paired with a standalone backend API.",
            isRecommended: false,
          },
        ],
      },
    },
    {
      id: "fs-step-3",
      number: "03",
      title: "Backend Fundamentals",
      outcome: "Understand how servers process requests, run business logic, and send responses.",
      duration: "2–3 weeks",
      category: "Backend Engine",
      iconSlug: "nestjs",
      courseLink: {
        title: "NestJS Elite Architecture",
        slug: "nestjs",
        lessons: 32,
      },
      whatYoullLearn: [
        "Building RESTful API endpoints and handling incoming payloads",
        "Organizing code into controllers, business services, and data layers",
        "Request validation, status code conventions, and clean error handling",
        "TypeScript shared interfaces between client and server",
      ],
      decisionPoint: {
        title: "Choose your backend framework",
        explanation: "You only need one backend engine. You can choose a dedicated enterprise framework or unified Next.js API routes.",
        options: [
          {
            name: "NestJS",
            slug: "nestjs",
            tag: "Enterprise architecture standard",
            desc: "Structured modular backend with Dependency Injection and TypeORM persistence.",
            isRecommended: true,
            isAvailable: true,
            lessons: 32,
          },
          {
            name: "Express.js / Next.js Server Actions",
            slug: "express",
            tag: "Minimalist & fast",
            desc: "Lightweight routing or direct full-stack server functions.",
            isRecommended: false,
            isAvailable: true,
            lessons: 28,
          },
        ],
      },
    },
    {
      id: "fs-step-4",
      number: "04",
      title: "Databases & Persistence",
      outcome: "Model, query, and persist application data reliably.",
      duration: "3 weeks",
      category: "Data Storage",
      iconSlug: "postgresql",
      whatYoullLearn: [
        "Relational database modeling with PostgreSQL",
        "Writing SQL queries and understanding table relationships (1-to-many, many-to-many)",
        "Type-safe database access using ORMs (TypeORM or Prisma)",
        "Creating and running database schema migrations safely",
      ],
      decisionPoint: {
        title: "Start with a relational database",
        explanation: "PostgreSQL handles 95% of web application data modeling requirements.",
        options: [
          {
            name: "PostgreSQL",
            slug: "postgresql",
            tag: "Relational standard • High reliability",
            desc: "Robust relational database with rich indexing and data integrity.",
            isRecommended: true,
          },
          {
            name: "MongoDB",
            slug: "mongodb",
            tag: "Document database",
            desc: "NoSQL document storage for unstructured or flexible data models.",
            isRecommended: false,
          },
        ],
      },
    },
    {
      id: "fs-step-5",
      number: "05",
      title: "Authentication & Security",
      outcome: "Securely authenticate users and manage access across frontend and backend.",
      duration: "2 weeks",
      category: "Security",
      iconSlug: "auth",
      courseLink: {
        title: "NestJS Auth & Security",
        slug: "nestjs",
        lessons: 32,
      },
      whatYoullLearn: [
        "Hashing passwords securely before storing in the database",
        "JWT token authentication and refresh token lifecycles",
        "Protecting frontend pages and backend endpoints with authorization guards",
        "Managing user session cookies and avoiding common vulnerabilities (XSS and CSRF)",
      ],
    },
    {
      id: "fs-step-6",
      number: "06",
      title: "Connect Frontend + Backend",
      outcome: "Synchronize client UI with server state seamlessly.",
      duration: "2–3 weeks",
      category: "Integration",
      iconSlug: "tanstack",
      courseLink: {
        title: "TanStack Query v5 Mastery",
        slug: "tanstack",
        lessons: 22,
      },
      whatYoullLearn: [
        "Sharing TypeScript models between frontend and backend for end-to-end type safety",
        "Fetching, caching, and invalidating server state with TanStack Query",
        "Optimistic UI updates so user actions feel instant before server confirmation",
        "Handling network error states, loading skeletons, and retry logic gracefully",
      ],
    },
    {
      id: "fs-step-7",
      number: "07",
      title: "Build & Deploy a Full-Stack Application",
      outcome: "Ship a production-grade full-stack web application from scratch to cloud.",
      duration: "3–4 weeks",
      category: "Production Launch",
      iconSlug: "docker",
      whatYoullLearn: [
        "Architecting an end-to-end web product (e.g. SaaS workspace, E-commerce, or Marketplace)",
        "Configuring production environment variables and security secrets",
        "Dockerizing the backend and database using Docker Compose for reproducible builds",
        "Deploying frontend to Vercel and backend to managed cloud containers (Railway, AWS, Render)",
        "Monitoring production logs, error reporting, and database backups",
      ],
    },
  ],
  advancedTopicsTitle: "Advanced Topics",
  advancedTopicsSubtitle: "Take your full-stack engineering skills to the next level.",
  advancedTopics: [
    {
      id: "fs-adv-1",
      title: "Microservices & Event Architecture",
      description: "Break complex systems into independent services coordinated by asynchronous event brokers.",
      topics: ["Event-Driven Messaging", "RabbitMQ / Kafka", "gRPC Microservices", "API Gateways"],
      iconSlug: "microservice",
    },
    {
      id: "fs-adv-2",
      title: "Distributed Caching & Queues",
      description: "Scale application throughput using Redis caches, background worker queues, and distributed locks.",
      topics: ["Redis Key-Value Cache", "BullMQ Task Queues", "Rate Limiting", "WebSocket Gateways"],
      iconSlug: "queue",
    },
    {
      id: "fs-adv-3",
      title: "CI/CD Pipelines & Cloud DevOps",
      description: "Set up automated test and build workflows using GitHub Actions and zero-downtime rolling deployments.",
      topics: ["GitHub Actions", "Docker Compose Orchestration", "Infrastructure as Code", "Staging Environments"],
      iconSlug: "docker",
    },
    {
      id: "fs-adv-4",
      title: "System Design & Scalability",
      description: "Master distributed systems principles: load balancing, read replicas, database sharding, and CDN edge caching.",
      topics: ["Load Balancers", "Database Read Replicas", "CAP Theorem", "High Availability"],
      iconSlug: "architect",
    },
  ],
};

export const JOURNEY_ROADMAPS: Record<JourneyRole, JourneyRoadmap> = {
  backend: BACKEND_JOURNEY,
  frontend: FRONTEND_JOURNEY,
  fullstack: FULLSTACK_JOURNEY,
};

export function getJourneyRoadmap(role: JourneyRole): JourneyRoadmap {
  return JOURNEY_ROADMAPS[role];
}
