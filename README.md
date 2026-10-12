# ⚡ LearnCraft — Master Modern Web Engineering

<div align="center">

![Next.js 16](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)
![React 18](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=for-the-badge&logo=reactquery)
![Prisma](https://img.shields.io/badge/Prisma_ORM-5.10-2D3748?style=for-the-badge&logo=prisma)
![Neon Postgres](https://img.shields.io/badge/Neon_PostgreSQL-Serverless-00E599?style=for-the-badge&logo=postgresql)
![Tests Passing](https://img.shields.io/badge/Tests-138%2F138%20Passing-emerald?style=for-the-badge&logo=vitest)

**High-impact engineering education platform featuring 12 technology tracks, local-first zero-latency synchronization, interactive sandboxes, and SuperMemo SM-2 spaced repetition interview prep.**

[Demo & Visuals](#-live-platform-tour--walkthrough) • [Key Features](#-key-features) • [Curriculum Tracks](#-curriculum-tracks) • [System Architecture](#-system-architecture) • [Getting Started](#-getting-started) • [Performance Engineering](#-performance-engineering) • [Testing](#-testing--verification)

</div>

---

## 🎬 Live Platform Tour & Walkthrough

Here is a full walkthrough demonstrating LearnCraft's local-first reactivity, real-time curriculum navigation, SuperMemo SM-2 interview drills, multi-block notes, and live TypeScript sandboxes:

<div align="center">
  <img src="./docs/assets/learncraft_demo_tour.webp" alt="LearnCraft Platform Walkthrough" width="100%" style="border-radius: 8px; border: 1px solid #334155;" />
</div>

---

## 📸 Platform Gallery & Screenshots

Explore the key interfaces across LearnCraft:

### 1. Curriculum Hub & Roadmaps
<table>
  <tr>
    <td width="50%">
      <b>Curriculum Hub (12 Tracks)</b><br/>
      <img src="./docs/assets/learn_hub.png" alt="Curriculum Hub" width="100%" />
    </td>
    <td width="50%">
      <b>Engineering Roadmaps & Skill Trees</b><br/>
      <img src="./docs/assets/roadmaps_hub.png" alt="Engineering Roadmaps" width="100%" />
    </td>
  </tr>
</table>

### 2. Spaced Repetition Interview Prep & Practice Session
<table>
  <tr>
    <td width="50%">
      <b>Interview Prep Hub (14 Topics)</b><br/>
      <img src="./docs/assets/interview_prep_hub.png" alt="Interview Prep Hub" width="100%" />
    </td>
    <td width="50%">
      <b>Interactive SM-2 Recall Session</b><br/>
      <img src="./docs/assets/interview_session.png" alt="Interactive SM-2 Recall Session" width="100%" />
    </td>
  </tr>
</table>

### 3. Study Notebook & Spaced Review Center
<table>
  <tr>
    <td width="50%">
      <b>Unified Study Notes & Code Bookmarks</b><br/>
      <img src="./docs/assets/notes_bookmarks.png" alt="Study Notes and Code Bookmarks" width="100%" />
    </td>
    <td width="50%">
      <b>Active Recall Flashcard Center</b><br/>
      <img src="./docs/assets/revision_center.png" alt="Active Recall Revision Center" width="100%" />
    </td>
  </tr>
</table>

### 4. Interactive Lesson & Live TypeScript Code Sandbox
<table>
  <tr>
    <td width="50%">
      <b>Interactive Capstone Code Sandbox</b><br/>
      <img src="./docs/assets/code_sandbox.png" alt="Interactive Capstone Code Sandbox" width="100%" />
    </td>
    <td width="50%">
      <b>7-Part Pedagogical Lesson View</b><br/>
      <img src="./docs/assets/interactive_lesson.png" alt="Pedagogical Lesson View" width="100%" />
    </td>
  </tr>
</table>

---

## 🌟 Key Features

- 🎯 **12 Complete Technology Tracks**: Frontend, Backend, Databases, DevOps, and Distributed System Design.
- ⚡ **Local-First Zero-Latency Sync**: Immediate local updates via `localStorage` with authoritative background cloud reconciliation to Neon Serverless PostgreSQL.
- 🧠 **SuperMemo SM-2 Spaced Repetition**: Scientific active recall engine powering technical interview preparation across 14 topic domains.
- 💻 **Interactive Sandboxes & Playgrounds**: Code execution, syntax-highlighted diffs, and live exercises directly within lessons.
- 📝 **Unified Study Notebook**: Rich multi-block notes (text, code snippets, Q&A cards) and syntax-highlighted code bookmarks.
- 🎮 **Gamification & Habit Formation**: Daily streaks, XP levels, streak freezes, and activity heatmaps.
- 🛡️ **Multi-User Cache Isolation**: Safe session-scoped in-memory caching with automatic purge upon sign-out or account switching.
- 🚀 **Production-Audited Performance**: Sub-second client navigation, non-blocking Suspense boundaries, strict DB column projections, and Core Web Vitals telemetry.

---

## 📚 Curriculum Tracks

| Domain | Technology Track | Scope & Modules |
| :--- | :--- | :--- |
| **Frontend** | **React** | Hooks, reconciliation, concurrent mode, performance, custom hooks, and capstone task manager. |
| **Frontend** | **Next.js** | App Router, Server Components, Streaming, Route Handlers, ISR, Server Actions, Middleware. |
| **Frontend** | **TanStack Query** | Query keys, staleTime/gcTime, optimistic mutations, infinite scrolling, prefetching, hydration. |
| **Frontend** | **Redux Toolkit** | RTK slices, createAsyncThunk, selectors, middleware, immutable state machines. |
| **Core** | **TypeScript** | Generics, template literal types, conditional types, mapped types, in-memory query engine. |
| **Core** | **JavaScript (ESNext)** | Event loop, closures, prototypes, microtask queue, memory management, garbage collection. |
| **Backend** | **Node.js** | Event-driven architecture, streams, buffers, cluster module, child processes, worker threads. |
| **Backend** | **Express.js** | Middleware pipelines, routing, error handling, rate limiting, security best practices. |
| **Backend** | **NestJS** | Dependency injection, modules, decorators, pipes, guards, interceptors, RBAC, Microservices. |
| **Databases**| **PostgreSQL** | Relational modeling, B-tree indexes, transactions & ACID, execution plans (EXPLAIN ANALYZE). |
| **Databases**| **MongoDB** | Document schemas, aggregation pipelines, replica sets, sharding, indexing strategies. |
| **Databases**| **Prisma ORM** | Schema design, migrations, relation queries, client extensions, batch operations. |
| **System** | **System Design** | Scalability, load balancing, caching (CDN/Redis), database sharding, CAP theorem, message brokers. |

---

## 🏗️ System Architecture

LearnCraft is architected as a **Local-First, Cloud-Authoritative Next.js App Router** application backed by Neon Serverless PostgreSQL via Prisma ORM.

```mermaid
graph TD
    subgraph BrowserClient ["Browser Client Layer"]
        UI["React 18 UI & Navigation"]
        TQ["TanStack Query Cache (staleTime: 2m, gcTime: 10m)"]
        LS[("Browser LocalStorage")]
        SM2["SuperMemo SM-2 Engine"]
        SyncEngine["Local-First Sync Engine (In-Flight Deduplication + 60s TTL)"]
    end

    subgraph NextServer ["Next.js Server Layer (App Router)"]
        AuthMiddleware["NextAuth.js Session Validation"]
        RouteHandlers["Route Handlers (/api/progress, /api/gamification, /api/notes)"]
        ColumnProjection["Targeted Column Projections (select & notIn filters)"]
    end

    subgraph DatabaseLayer ["Cloud Database Layer"]
        PrismaClient["Prisma Client"]
        NeonDB[("Neon Serverless PostgreSQL")]
    end

    UI --> TQ
    UI --> LS
    UI --> SM2
    SM2 --> LS

    UI --> SyncEngine
    SyncEngine --> LS
    SyncEngine -->|Deduplicated HTTP| RouteHandlers

    RouteHandlers --> AuthMiddleware
    AuthMiddleware --> ColumnProjection
    ColumnProjection --> PrismaClient
    PrismaClient --> NeonDB
```

### Local-First Sync & In-Flight Deduplication Flow

```mermaid
sequenceDiagram
    participant User as Learner (Browser)
    participant Local as localStorage
    participant Sync as ProgressSync Engine
    participant API as Next.js API (/api/progress)
    participant DB as Neon PostgreSQL

    User->>Local: Complete Lesson / Save Note
    Local-->>User: Instant UI Update (0ms Latency)
    
    User->>Sync: reconcileCloudProgress(userId)
    alt Fresh TTL Cache (< 60s) & Same User
        Sync-->>User: Return In-Memory Cache (Instant)
    else In-Flight Request Active
        Sync-->>User: Reuse in-flight Promise (Deduplicated)
    else Stale or User Switch
        Sync->>API: GET /api/progress (no-store)
        API->>DB: Query projected columns (notIn internal JSONs)
        DB-->>API: Stream records
        API-->>Sync: Return JSON { data: [...] }
        Sync->>Local: Reconcile & Hydrate missing records
        Sync-->>User: Dispatch 'learncraft:progress-sync'
    end
```

### SuperMemo SM-2 Spaced Repetition Workflow

```mermaid
flowchart LR
    Question["Interview Question"] --> UserReview{"Learner Recall Rating"}
    UserReview -->|"Again (1)"| Reset["Interval = 1d<br/>Repetition = 0<br/>EF Decreased"]
    UserReview -->|"Hard (3)"| Hard["Interval = 2d<br/>Repetition + 1<br/>EF Decreased"]
    UserReview -->|"Good (4)"| Good["Interval = 4d<br/>Repetition + 1<br/>EF Maintained"]
    UserReview -->|"Easy (5)"| Easy["Interval = 7d<br/>Repetition + 1<br/>EF Increased"]
    
    Reset --> Schedule[("Calculate Next Review Date")]
    Hard --> Schedule
    Good --> Schedule
    Easy --> Schedule
    
    Schedule --> XP["Award Gamification XP"]
```

---

## ⚡ Performance Engineering

LearnCraft underwent a rigorous evidence-based performance audit:

1. **Multi-User Cache Isolation**:
   - In-memory sync caches (`progress-sync`, `gamification`, `notes-bookmarks`) are strictly scoped by `userId`.
   - `clearAllClientCaches()` completely wipes the TanStack `QueryClient`, progress, and revision states upon account changes, sign-out, or `401 Unauthorized` responses.
2. **Neon DB Column Projection & Zero JSON Bloat**:
   - `GET /api/progress` excludes internal serialization blocks (`__user_notes__`, `__user_bookmarks__`, `__gamification__`) and selects only `{ module, completed, score, activeModule, updatedAt }`, reducing payload size by **~92%–99%**.
   - All batch routes employ `select: { completedModules: true }` to avoid transferring unnecessary columns.
3. **Responsive Main Thread & Virtualized Computation**:
   - Precalculates track statistics dictionaries ($O(1)$ lookup) in the Interview Hub, eliminating 140+ synchronous `localStorage.getItem` and `JSON.parse` operations per keystroke.
   - Markdown AST tokenization memoized with `React.memo` and `useMemo`.
4. **Client-Side Core Web Vitals Observability**:
   - Integrated lightweight `WebVitals` telemetry component tracking FCP, LCP, CLS, FID/INP, and TTFB without leaking sensitive information.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.18.0 or newer
- **npm**: v9.0.0 or newer
- **PostgreSQL**: Neon Serverless Postgres connection URL or local Postgres instance

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/iammehedi4201/LearnCraft.git
cd LearnCraft
npm install
```

### 2. Environment Configuration

Create a `.env` file in the project root:

```env
# Neon Serverless PostgreSQL Database Connection
DATABASE_URL="postgresql://user:password@ep-sample-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"

# NextAuth.js Configuration
AUTH_SECRET="your-strong-random-auth-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers (Optional for local development)
GITHUB_ID=""
GITHUB_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

### 3. Database Schema Setup

Sync the Prisma schema with your database:

```bash
npx prisma db push
```

### 4. Start Development Server

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🧪 Testing & Verification

LearnCraft includes an automated test suite powered by **Vitest** testing state machines, SM-2 algorithms, cache isolation, and curriculum unlock progression.

```bash
# Run the 138-test Vitest test suite
npm test

# Run TypeScript type verification (zero errors)
npm run type-check

# Run production-grade Webpack build (148 static pages)
npm run build
```

---

## 📂 Project Organization

```text
LearnCraft/
├── app/                          # Next.js App Router (148 static + 16 dynamic routes)
│   ├── api/                      # Route handlers (/api/progress, /api/gamification, etc.)
│   ├── learn/                    # Curriculum hubs and individual lessons
│   ├── interview/                # Technical interview prep & mock exam sessions
│   ├── roadmaps/                 # Technology career roadmaps & interactive skill trees
│   ├── notes/                    # Unified personal notebook & code bookmarks
│   ├── revision/                 # Active recall flashcard queue & revision center
│   ├── layout.tsx                # Root layout with global providers & Core Web Vitals
│   └── globals.css               # Design system tokens and styling
├── components/                   # Reusable UI components
│   ├── curriculum/               # Curriculum progress bars, lesson trees, phase badges
│   ├── interview/                # SM-2 rating cards, track cards, mock quiz interfaces
│   ├── revision/                 # MarkdownRenderer, flashcards, annotation layer
│   ├── global-overlays.tsx       # Dynamic lazy-loaded floating action overlays
│   └── web-vitals.tsx            # Core Web Vitals telemetry collector
├── context/                      # React context providers (RevisionContext, ThemeContext)
├── lib/                          # Core business logic & synchronization engines
│   ├── progress-sync.ts          # Local-first progress engine with in-flight deduplication
│   ├── gamification.ts           # XP leveling, streaks, daily activity logs
│   ├── interview-progress.ts     # SuperMemo SM-2 spaced repetition scheduler
│   ├── notes-bookmarks.ts        # Unified notebook & bookmark management
│   ├── query-client.ts           # TanStack Query client & cache purge coordinator
│   └── prisma.ts                 # Prisma ORM singleton client
├── prisma/                       # Database schema (User, Account, Session, Progress)
└── types/                        # Full TypeScript interfaces & contracts
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
