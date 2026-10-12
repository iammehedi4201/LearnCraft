# ⚡ LearnCraft — Next-Gen Web Engineering Platform

<div align="center">

<img src="./public/logo.png" width="84" alt="LearnCraft Logo" style="border-radius: 18px; margin-bottom: 8px;" />

### Master Modern Software Engineering & System Design

**Production-grade engineering education platform featuring 12 technology tracks, zero-latency local-first synchronization, SuperMemo SM-2 spaced repetition interview drills, and hands-on architectural lessons.**

<p align="center">
  <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js" alt="Next.js" /></a>
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-18.3-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://tanstack.com/query"><img src="https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" alt="TanStack Query" /></a>
  <a href="https://www.prisma.io"><img src="https://img.shields.io/badge/Prisma_ORM-5.10-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" /></a>
  <a href="https://neon.tech"><img src="https://img.shields.io/badge/Neon_PostgreSQL-Serverless-00E599?style=for-the-badge&logo=postgresql&logoColor=white" alt="Neon Postgres" /></a>
  <a href="https://vitest.dev"><img src="https://img.shields.io/badge/Tests-138%2F138%20Passing-10B981?style=for-the-badge&logo=vitest&logoColor=white" alt="Tests Passing" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License MIT" /></a>
</p>

<p align="center">
  <a href="#-live-platform-tour"><b>🎬 Live Demo</b></a> •
  <a href="#-key-features"><b>✨ Key Features</b></a> •
  <a href="#-visual-platform-tour"><b>📸 Interface Tour</b></a> •
  <a href="#-curriculum-tracks"><b>📚 Curriculum</b></a> •
  <a href="#️-system-architecture"><b>🏗️ Architecture</b></a> •
  <a href="#-performance-engineering"><b>⚡ Performance</b></a> •
  <a href="#-getting-started"><b>🚀 Quickstart</b></a> •
  <a href="#-testing--verification"><b>🧪 Testing</b></a>
</p>

</div>

---

## 🎬 Live Platform Tour

Watch LearnCraft in action — showcasing instantaneous client navigation, scientific SM-2 spaced repetition drills, interactive study notebook drawers, and real-time curriculum tracking:

<div align="center">
  <img src="./docs/assets/learncraft_demo_tour.webp" alt="LearnCraft Live Walkthrough Tour" width="100%" style="border-radius: 10px; border: 1px solid #1E293B; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);" />
</div>

---

## ✨ Key Features

LearnCraft bridges the gap between passive reading and rigorous engineering mastery with a local-first, low-latency architecture:

- ⚡ **Local-First Zero-Latency Sync**  
  Every lesson completion, rating, and note is applied instantly to `localStorage` ($0\text{ ms}$ UI latency) while an intelligent background sync engine reconciles mutations with Neon Serverless PostgreSQL using in-flight promise deduplication and a 60-second TTL cache.

- 🧠 **SuperMemo SM-2 Spaced Repetition Engine**  
  Technical interview preparation mathematically scheduled according to the SuperMemo SM-2 algorithm. Dynamically tracks Ease Factor (EF), repetition intervals, and recall ratings (`Again`, `Hard`, `Good`, `Easy`) to maximize long-term retention across 14 technology tracks.

- ⏱️ **Timed Mock Interview Simulator**  
  Simulate realistic technical screeners under time pressure. Select target domains, choose question volume (5, 10, 15), and test active recall against strict countdown timers with immediate model breakdown feedback.

- 📝 **Unified Multi-Block Study Notebook & Bookmarks**  
  Persistent global study center accessible from any lesson via `Ctrl+J`. Compose rich multi-block notes (Markdown notes, Q&A cards, syntax-highlighted code blocks) and bookmark code patterns for quick revision.

- 🎯 **12 Industry-Aligned Technology Tracks**  
  Structured multi-phase curriculums for React, Next.js, TanStack Query, Redux Toolkit, TypeScript, JavaScript (ESNext), Node.js, Express.js, NestJS, PostgreSQL, MongoDB, and Distributed System Design.

- 🔁 **Active Recall Revision Center**  
  Centralized dashboard tracking retention metrics, daily due reviews, and interactive flip flashcards to reinforce previous lessons.

- 🛡️ **Session-Isolated Cache Security**  
  Strict multi-user cache isolation guarantees that switching accounts or signing out completely flushes TanStack queries and local states, preventing unauthorized data leakage.

- 📊 **Sub-Second Performance & Core Web Vitals**  
  Database queries leverage strict column projections (`notIn` internal serialization blocks) reducing API response payloads by **92%–99%**. Includes real-time Core Web Vitals telemetry.

---

## 📸 Visual Platform Tour

Explore LearnCraft's dark-mode engineering interface:

### 1. Curriculum Hub & Visual Roadmaps
<table>
  <tr>
    <td width="50%">
      <div align="center"><b>Curriculum Hub (12 Tracks & Phase Tracking)</b></div>
      <img src="./docs/assets/learn_hub.png" alt="LearnCraft Curriculum Hub" width="100%" style="border-radius: 6px;" />
    </td>
    <td width="50%">
      <div align="center"><b>Engineering Roadmaps & Skill Trees</b></div>
      <img src="./docs/assets/roadmaps_hub.png" alt="Engineering Roadmaps" width="100%" style="border-radius: 6px;" />
    </td>
  </tr>
</table>

### 2. Spaced Repetition Interview Prep & Practice Session
<table>
  <tr>
    <td width="50%">
      <div align="center"><b>Interview Prep Hub (14 Domains & Mastery Progress)</b></div>
      <img src="./docs/assets/interview_prep_hub.png" alt="Interview Prep Hub" width="100%" style="border-radius: 6px;" />
    </td>
    <td width="50%">
      <div align="center"><b>Interactive SM-2 Active Recall Drill</b></div>
      <img src="./docs/assets/interview_session.png" alt="Interactive SM-2 Session" width="100%" style="border-radius: 6px;" />
    </td>
  </tr>
</table>

### 3. Timed Mock Simulator & Spaced Revision Center
<table>
  <tr>
    <td width="50%">
      <div align="center"><b>Timed Mock Interview Simulator</b></div>
      <img src="./docs/assets/mock_interview_simulator.png" alt="Timed Mock Interview Simulator" width="100%" style="border-radius: 6px;" />
    </td>
    <td width="50%">
      <div align="center"><b>Active Recall Flashcard & Due Queue Dashboard</b></div>
      <img src="./docs/assets/revision_center.png" alt="Active Recall Revision Center" width="100%" style="border-radius: 6px;" />
    </td>
  </tr>
</table>

### 4. Pedagogical Lessons & Study Notebook Center
<table>
  <tr>
    <td width="50%">
      <div align="center"><b>7-Part Pedagogical Lesson Navigator</b></div>
      <img src="./docs/assets/interactive_lesson.png" alt="7-Part Pedagogical Lesson" width="100%" style="border-radius: 6px;" />
    </td>
    <td width="50%">
      <div align="center"><b>Unified Study Notes & Code Bookmarks</b></div>
      <img src="./docs/assets/notes_bookmarks.png" alt="Unified Study Notebook" width="100%" style="border-radius: 6px;" />
    </td>
  </tr>
</table>

---

## 📚 Curriculum Tracks

LearnCraft provides structured learning modules covering the full modern engineering spectrum:

| Domain | Technology Track | Scope & Core Modules | Key Topics & Capstones |
| :--- | :--- | :--- | :--- |
| **Frontend** | **React** | 7 Phases · 21 Lessons | Hooks, reconciliation, concurrent mode, custom hooks, and Task Manager capstone. |
| **Frontend** | **Next.js** | 8 Phases · 20 Lessons | App Router, Server Components, Streaming, Route Handlers, ISR, Middleware. |
| **Frontend** | **TanStack Query** | 7 Phases · 22 Lessons | Query keys, staleTime/gcTime, optimistic mutations, infinite scrolling, hydration. |
| **Frontend** | **Redux Toolkit** | 10 Phases · 26 Lessons | RTK slices, createAsyncThunk, entity adapters, middleware, immutable state. |
| **Core** | **TypeScript** | 8 Phases · 24 Lessons | Generics, template literals, conditional types, mapped types, in-memory query engine. |
| **Core** | **JavaScript (ESNext)** | 8 Phases · 22 Lessons | Event loop, closures, prototypes, microtask queue, memory management, garbage collection. |
| **Backend** | **Node.js** | 8 Phases · 24 Lessons | Event-driven architecture, streams, buffers, cluster module, worker threads. |
| **Backend** | **Express.js** | 10 Phases · 28 Lessons | Middleware pipelines, routing, error handling, rate limiting, security hardening. |
| **Backend** | **NestJS** | 10 Phases · 32 Lessons | Dependency injection, modules, decorators, pipes, guards, interceptors, Microservices. |
| **Databases** | **PostgreSQL** | 11 Phases · 29 Lessons | Relational modeling, B-tree indexes, transactions & ACID, EXPLAIN ANALYZE tuning. |
| **Databases** | **MongoDB** | 10 Phases · 26 Lessons | Document schemas, aggregation pipelines, replica sets, sharding, indexing strategies. |
| **Databases** | **Prisma ORM** | 10 Phases · 27 Lessons | Schema modeling, migrations, relational queries, client extensions, batch pipelines. |
| **System** | **System Design** | 11 Phases · 28 Lessons | Scalability, load balancers, caching (Redis/CDN), database sharding, CAP, message brokers. |

---

## 🏗️ System Architecture

LearnCraft is architected around a **Local-First, Cloud-Authoritative Reactive Model** built with the Next.js App Router and Neon Serverless PostgreSQL.

### 1. High-Level System Architecture

```mermaid
graph TD
    subgraph Client ["Browser Client Layer"]
        UI["React 18 UI Shell"]
        TQ["TanStack Query Cache (staleTime: 2m, gcTime: 10m)"]
        LS[("Browser LocalStorage")]
        SM2["SuperMemo SM-2 Spaced Repetition Engine"]
        SyncEngine["Local-First Sync Engine (In-Flight Deduplication + 60s TTL)"]
    end

    subgraph Server ["Next.js Server Layer (App Router)"]
        AuthMiddleware["NextAuth.js Session Validation"]
        RouteHandlers["API Routes (/api/progress, /api/gamification, /api/notes)"]
        ColumnProjection["Targeted Column Projections (select & notIn filters)"]
    end

    subgraph Database ["Cloud Database Layer"]
        PrismaClient["Prisma Client ORM"]
        NeonDB[("Neon Serverless PostgreSQL")]
    end

    UI --> TQ
    UI --> LS
    UI --> SM2
    SM2 --> LS

    UI --> SyncEngine
    SyncEngine --> LS
    SyncEngine -->|Deduplicated HTTP Requests| RouteHandlers

    RouteHandlers --> AuthMiddleware
    AuthMiddleware --> ColumnProjection
    ColumnProjection --> PrismaClient
    PrismaClient --> NeonDB
```

### 2. Local-First In-Flight Request Deduplication Flow

When multiple components trigger synchronization simultaneously, LearnCraft bundles mutations and reuses active in-flight promises:

```mermaid
sequenceDiagram
    participant User as Learner (Browser)
    participant Local as localStorage
    participant Sync as ProgressSync Engine
    participant API as Next.js API (/api/progress)
    participant DB as Neon PostgreSQL

    User->>Local: Complete Lesson / Rate Flashcard
    Local-->>User: Instant UI State Update (0ms)
    
    User->>Sync: reconcileCloudProgress(userId)
    alt Fresh TTL Cache (< 60s) & Identical User
        Sync-->>User: Return In-Memory Cache (Instant)
    else In-Flight Request Already Active
        Sync-->>User: Join In-Flight Promise (Deduplicated)
    else Stale Cache or Account Switch
        Sync->>API: GET /api/progress (no-store)
        API->>DB: Query projected columns (notIn internal JSON blocks)
        DB-->>API: Stream records
        API-->>Sync: Return JSON { data: [...] }
        Sync->>Local: Reconcile & Hydrate missing records
        Sync-->>User: Dispatch 'learncraft:progress-sync' Event
    end
```

### 3. SuperMemo SM-2 Interval Calculation Engine

Active recall questions are scheduled dynamically based on learner feedback:

```mermaid
flowchart LR
    Question["Interview Question"] --> UserReview{"Recall Rating"}
    UserReview -->|"Again (1)"| Reset["Interval: 1d<br/>Repetition: 0<br/>EF: Decreased"]
    UserReview -->|"Hard (3)"| Hard["Interval: 2d<br/>Repetition: +1<br/>EF: Decreased"]
    UserReview -->|"Good (4)"| Good["Interval: 4d<br/>Repetition: +1<br/>EF: Maintained"]
    UserReview -->|"Easy (5)"| Easy["Interval: 7d<br/>Repetition: +1<br/>EF: Increased"]
    
    Reset --> Schedule[("Calculate Next Review Timestamp")]
    Hard --> Schedule
    Good --> Schedule
    Easy --> Schedule
    
    Schedule --> XP["Award Gamification XP & Update Streak"]
```

---

## ⚡ Performance Engineering

LearnCraft was engineered with strict performance budgets and evidence-based optimizations:

| Bottleneck Identified | Engineering Solution | Impact / Metric |
| :--- | :--- | :--- |
| **API Payload Bloat** | Excluded internal serialization blobs (`__user_notes__`, `__gamification__`) using Prisma `notIn` filters with explicit column projection. | **~92%–99% payload reduction** on `/api/progress`. |
| **Cross-User Cache Leaks** | Added strict session-scoped `userId` validation and global cache purges (`clearAllClientCaches`) on sign-out or `401` errors. | **100% multi-user cache isolation**. |
| **Duplicate Sync Requests** | Implemented in-flight promise memoization and 60-second in-memory TTL caching in `progress-sync.ts`. | **Eliminated redundant API requests during fast navigations**. |
| **Main Thread Blocking** | Precalculated $O(1)$ track statistics dictionaries instead of parsing 140+ `localStorage` keys per keystroke. | **Sub-16ms responsive frame budget on search inputs**. |
| **Unnecessary Re-renders** | Memoized Markdown AST tokenization using `React.memo` and optimized TanStack Query cache defaults (`staleTime: 2m`, `gcTime: 10m`). | **Zero unnecessary route re-fetches during client navigation**. |
| **Telemetry & Observability** | Integrated non-blocking `WebVitals` telemetry tracking FCP, LCP, CLS, FID/INP, and TTFB. | **Production-grade client performance visibility**. |

---

## 🚀 Getting Started

Follow these instructions to run LearnCraft locally:

### Prerequisites

- **Node.js**: `v18.18.0` or higher
- **npm**: `v9.0.0` or higher
- **PostgreSQL**: Neon Serverless Postgres connection or local PostgreSQL instance

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/iammehedi4201/LearnCraft.git
cd LearnCraft
npm install
```

### 2. Environment Variables Configuration

Create a `.env` file in the project root:

```env
# Neon Serverless PostgreSQL Connection String
DATABASE_URL="postgresql://user:password@ep-sample-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"

# NextAuth.js Configuration
AUTH_SECRET="your-strong-random-auth-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Authentication Providers (Optional for local development)
GITHUB_ID=""
GITHUB_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

### 3. Initialize Database Schema

Push the Prisma schema to your PostgreSQL database:

```bash
npx prisma db push
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Verification

LearnCraft includes an automated Vitest test suite validating curriculum progress state machines, the SuperMemo SM-2 mathematical scheduler, multi-user cache isolation, and gamification streaks:

```bash
# Run all 138 automated Vitest unit & integration tests
npm test

# Run strict TypeScript type verification (zero errors)
npm run type-check

# Run production-grade Next.js build (148 static pages + 16 route handlers)
npm run build
```

### Test Suite Summary

```text
 ✓ components/curriculum/__tests__/curriculum-state.test.ts (60 tests)
 ✓ lib/__tests__/interview-progress.test.ts (6 tests)
 ✓ lib/__tests__/interview-questions.test.ts (8 tests)
 ✓ lib/__tests__/interview-ai-contract.test.ts (5 tests)
 ✓ lib/__tests__/interview-service.test.ts (8 tests)
 ✓ lib/__tests__/cache-correctness.test.ts (9 tests)
 ✓ lib/__tests__/gamification.test.ts (10 tests)
 ✓ lib/__tests__/notes-bookmarks.test.ts (4 tests)
 ✓ lib/__tests__/interview-quality.test.ts (7 tests)

 Test Files  10 passed (10)
      Tests  138 passed (138)
```

---

## 📂 Project Organization

```text
LearnCraft/
├── app/                          # Next.js App Router (148 static + 16 dynamic routes)
│   ├── api/                      # Route Handlers (/api/progress, /api/gamification, /api/notes)
│   ├── learn/                    # 12 Curriculum tracks, phase trees & pedagogical lessons
│   ├── interview/                # Technical interview prep, flashcards & mock exam simulator
│   ├── roadmaps/                 # Engineering career roadmaps & interactive skill trees
│   ├── notes/                    # Global study notebook & code bookmarks
│   ├── revision/                 # Active recall flashcard queue & revision center
│   ├── layout.tsx                # Root layout with Theme, Query, Session & WebVitals providers
│   └── globals.css               # Design system tokens and styling
├── components/                   # Reusable UI component modules
│   ├── curriculum/               # Curriculum progress bars, lesson trees, phase badges
│   ├── interview/                # SM-2 rating cards, track cards, mock quiz interfaces
│   ├── revision/                 # MarkdownRenderer, flashcards, annotation layer
│   ├── playground/               # Interactive code sandbox & syntax highlighter
│   ├── global-overlays.tsx       # Dynamic lazy-loaded floating action overlays
│   └── web-vitals.tsx            # Core Web Vitals telemetry collector
├── context/                      # React context providers (RevisionContext, ThemeContext)
├── docs/                         # Documentation assets, demo walkthroughs & diagrams
│   └── assets/                   # High-resolution screenshots and animated walkthroughs
├── lib/                          # Core business logic & synchronization engines
│   ├── progress-sync.ts          # Local-first progress engine with in-flight deduplication
│   ├── gamification.ts           # XP leveling, streaks, daily activity logs
│   ├── interview-progress.ts     # SuperMemo SM-2 spaced repetition scheduler
│   ├── notes-bookmarks.ts        # Unified notebook & bookmark management
│   ├── query-client.ts           # TanStack Query client & cache purge coordinator
│   └── prisma.ts                 # Prisma ORM singleton client
├── prisma/                       # Prisma database schema (User, Account, Session, Progress)
└── types/                        # Full TypeScript interfaces & contracts
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
