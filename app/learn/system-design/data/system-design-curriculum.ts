/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SYSTEM DESIGN CURRICULUM DATA MODEL
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Authoritative learning progression for System Design & Scalable Architecture.
 * Follows the LearnCraft philosophy:
 * One Topic → Strong Fundamentals → Practical Skills → Deeper Understanding → Problem Solving → Capstone → Mastery
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import type { Course } from "@/components/curriculum/types";

export interface LessonMeta {
  code: string;
  name: string;
  slug: string;
  path: string;
  desc: string;
  estimatedMinutes: number;
  xpReward: number;
  prerequisite?: string;
}

export interface ProgressionPhase {
  id: string;
  phaseNumber: number;
  label: string;
  title: string;
  tagline: string;
  desc: string;
  lessonCodes: string[];
}

export interface PrerequisiteItem {
  id: string;
  title: string;
  badge: string;
  desc: string;
}

export interface CapstoneMeta {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  path: string;
  estimatedMinutes: number;
  xpReward: number;
  keyFeatures: string[];
}

export interface RelatedTopic {
  id: string;
  title: string;
  path: string;
}

// ─────────────────────────────────────────────────────────────
// Prerequisites & Boundaries
// ─────────────────────────────────────────────────────────────

export const SYSTEM_DESIGN_PREREQUISITES: PrerequisiteItem[] = [
  {
    id: "programming-fundamentals",
    title: "Basic Programming Knowledge",
    badge: "Language",
    desc: "Understanding functions, data structures, and how programs execute logic in memory.",
  },
  {
    id: "http-apis",
    title: "Basic HTTP & API Concepts",
    badge: "Web Protocols",
    desc: "Client-server request/response cycles, status codes, and JSON serialization boundaries.",
  },
  {
    id: "database-concepts",
    title: "Basic Database Concepts",
    badge: "Storage",
    desc: "Tabular vs document storage, basic CRUD operations, and primary key identity.",
  },
];

// ─────────────────────────────────────────────────────────────
// Comprehensive 11-Phase System Design Progression
// ─────────────────────────────────────────────────────────────

export const SYSTEM_DESIGN_PROGRESSION_PHASES: ProgressionPhase[] = [
  {
    id: "fundamentals",
    phaseNumber: 1,
    label: "Fundamentals",
    title: "System Design Foundations",
    tagline: "Mental Model, Systems Structure & Trade-Offs",
    desc: "Learn what System Design actually is, how distributed systems are structured, and how to balance functional vs non-functional requirements.",
    lessonCodes: ["SYS-01", "SYS-02", "SYS-03"],
  },
  {
    id: "capacity-planning",
    phaseNumber: 2,
    label: "Capacity Planning",
    title: "Requirements & Capacity Planning",
    tagline: "Back-of-the-Envelope Estimations & Scale",
    desc: "Master mathematical estimation techniques for Requests Per Second (RPS), storage growth, memory sizing, and network bandwidth.",
    lessonCodes: ["SYS-04", "SYS-05"],
  },
  {
    id: "core-components",
    phaseNumber: 3,
    label: "Core Components",
    title: "Traffic Routing & Stateless Services",
    tagline: "Load Balancers, Reverse Proxies & Application Tier",
    desc: "Understand load balancing algorithms, Layer 4 vs Layer 7 routing, and why decoupling session state into external tiers enables horizontal scale.",
    lessonCodes: ["SYS-06", "SYS-07"],
  },
  {
    id: "caching",
    phaseNumber: 4,
    label: "Caching Architecture",
    title: "High-Performance Caching Patterns",
    tagline: "Cache Strategies, Eviction & Failure Prevention",
    desc: "Implement Cache-Aside, Read-Through, and Write-Behind strategies. Prevent cache stampede, penetration, avalanche, and consistency drift.",
    lessonCodes: ["SYS-08", "SYS-09", "SYS-10"],
  },
  {
    id: "data-architecture",
    phaseNumber: 5,
    label: "Data & Storage",
    title: "Data Layer Architecture & Scaling",
    tagline: "Replication, Read Replicas, Partitioning & Sharding",
    desc: "Reason about SQL vs NoSQL architectural trade-offs, read scaling with replicas, and horizontal sharding strategies with partition keys.",
    lessonCodes: ["SYS-11", "SYS-12", "SYS-13"],
  },
  {
    id: "async-processing",
    phaseNumber: 6,
    label: "Async Processing",
    title: "Asynchronous Work & Queues",
    tagline: "Message Queues, Decoupling & Worker Pools",
    desc: "Transform synchronous blocking flows into resilient asynchronous pipelines using message queues, dead-letter queues, and backpressure.",
    lessonCodes: ["SYS-14", "SYS-15", "SYS-16"],
  },
  {
    id: "reliability",
    phaseNumber: 7,
    label: "Reliability & Resilience",
    title: "Fault Tolerance & Failure Modes",
    tagline: "Timeouts, Retries, Circuit Breakers & SPOF Elimination",
    desc: "Guard against cascading outages using timeouts, exponential backoff with jitter, circuit breakers, idempotency keys, and redundant nodes.",
    lessonCodes: ["SYS-17", "SYS-18", "SYS-19", "SYS-20"],
  },
  {
    id: "consistency",
    phaseNumber: 8,
    label: "Consistency",
    title: "Distributed Consistency & CAP",
    tagline: "Strong vs Eventual Consistency in Practice",
    desc: "Understand replication lag, read-after-write consistency, the CAP theorem, and practical PACELC trade-offs without unnecessary academic jargon.",
    lessonCodes: ["SYS-21", "SYS-22"],
  },
  {
    id: "security-observability",
    phaseNumber: 9,
    label: "Security & Observability",
    title: "Architecture Security & Telemetry",
    tagline: "Auth Boundaries, Distributed Tracing & Health Monitoring",
    desc: "Design zero-trust architectural boundaries, edge rate limiting, structured logging, distributed tracing spans, and SLI/SLO health monitors.",
    lessonCodes: ["SYS-23", "SYS-24"],
  },
  {
    id: "patterns",
    phaseNumber: 10,
    label: "Patterns",
    title: "Architecture Patterns & Evolution",
    tagline: "Modular Monoliths to Event-Driven Systems",
    desc: "Understand how architectures organically evolve from monoliths to service-based boundaries, and how event-driven systems decouple domain logic.",
    lessonCodes: ["SYS-25", "SYS-26"],
  },
  {
    id: "case-studies",
    phaseNumber: 11,
    label: "Case Studies",
    title: "Real-World System Case Studies",
    tagline: "Iterative Architecture from Requirements to Scale",
    desc: "Design an industrial URL Shortener and a Global Distributed Rate Limiter following the 4-step framework from basic layout to high-scale resilience.",
    lessonCodes: ["SYS-27", "SYS-28"],
  },
];

// ─────────────────────────────────────────────────────────────
// Complete Lesson Definitions (SYS-01 through SYS-28)
// ─────────────────────────────────────────────────────────────

export const ALL_SYSTEM_DESIGN_LESSONS: LessonMeta[] = [
  // Phase 1: Fundamentals
  {
    code: "SYS-01",
    name: "What Is System Design & Why It Matters",
    slug: "sys01-what-is-system-design",
    path: "/learn/system-design/sys01-what-is-system-design",
    desc: "Understand what System Design is, why systems break as scale increases, and how to transition from code-level to architecture-level thinking.",
    estimatedMinutes: 25,
    xpReward: 40,
  },
  {
    code: "SYS-02",
    name: "How Software Systems Are Structured",
    slug: "sys02-software-system-structure",
    path: "/learn/system-design/sys02-software-system-structure",
    desc: "Explore client, application, service, data, and network layers. Understand how requests travel end-to-end through a distributed topology.",
    estimatedMinutes: 25,
    xpReward: 40,
    prerequisite: "SYS-01",
  },
  {
    code: "SYS-03",
    name: "Requirements & The Trade-Off Mindset",
    slug: "sys03-requirements-and-trade-offs",
    path: "/learn/system-design/sys03-requirements-and-trade-offs",
    desc: "Distinguish functional requirements from non-functional attributes (availability, latency, consistency) and master the trade-off mindset.",
    estimatedMinutes: 25,
    xpReward: 40,
    prerequisite: "SYS-02",
  },

  // Phase 2: Capacity Planning & Estimations
  {
    code: "SYS-04",
    name: "Back-of-the-Envelope: Traffic & RPS Estimation",
    slug: "sys04-traffic-and-scale-estimation",
    path: "/learn/system-design/sys04-traffic-and-scale-estimation",
    desc: "Calculate average and peak Requests Per Second (RPS) from Daily Active Users (DAU) and determine compute instance headroom.",
    estimatedMinutes: 30,
    xpReward: 50,
    prerequisite: "SYS-03",
  },
  {
    code: "SYS-05",
    name: "Storage & Bandwidth Capacity Planning",
    slug: "sys05-storage-and-bandwidth-planning",
    path: "/learn/system-design/sys05-storage-and-bandwidth-planning",
    desc: "Estimate 5-year data storage growth, cache memory sizing with the 80/20 rule, and incoming/outgoing network bandwidth requirements.",
    estimatedMinutes: 30,
    xpReward: 50,
    prerequisite: "SYS-04",
  },

  // Phase 3: Core Components & Load Balancing
  {
    code: "SYS-06",
    name: "Load Balancers, Reverse Proxies & Traffic Routing",
    slug: "sys06-load-balancers-and-reverse-proxies",
    path: "/learn/system-design/sys06-load-balancers-and-reverse-proxies",
    desc: "Understand what load balancers do, Layer 4 TCP vs Layer 7 HTTP routing, health checking, and round-robin vs weighted least-connections algorithms.",
    estimatedMinutes: 30,
    xpReward: 50,
    prerequisite: "SYS-05",
  },
  {
    code: "SYS-07",
    name: "Stateless Architecture & Session Decoupling",
    slug: "sys07-stateless-vs-stateful-services",
    path: "/learn/system-design/sys07-stateless-vs-stateful-services",
    desc: "Why in-memory server state breaks horizontal autoscaling, and how extracting sessions into centralized data stores enables frictionless scaling.",
    estimatedMinutes: 25,
    xpReward: 40,
    prerequisite: "SYS-06",
  },

  // Phase 4: Caching Strategies
  {
    code: "SYS-08",
    name: "Caching Fundamentals & Read Strategies",
    slug: "sys08-caching-fundamentals-and-patterns",
    path: "/learn/system-design/sys08-caching-fundamentals-and-patterns",
    desc: "Understand why caching solves database read bottlenecks, cache hit ratio math, and step-by-step Cache-Aside vs Read-Through request flows.",
    estimatedMinutes: 30,
    xpReward: 50,
    prerequisite: "SYS-07",
  },
  {
    code: "SYS-09",
    name: "Write Strategies & Cache Invalidation",
    slug: "sys09-write-strategies-and-invalidation",
    path: "/learn/system-design/sys09-write-strategies-and-invalidation",
    desc: "Compare Write-Through, Write-Around, and Write-Behind (Write-Back) semantics. Master TTL expiration and proactive invalidation policies.",
    estimatedMinutes: 30,
    xpReward: 50,
    prerequisite: "SYS-08",
  },
  {
    code: "SYS-10",
    name: "Cache Stampede, Penetration & Avalanche Prevention",
    slug: "sys10-cache-stampede-and-failure-modes",
    path: "/learn/system-design/sys10-cache-stampede-and-failure-modes",
    desc: "Protect backend databases against cache stampedes using mutex locks, cache penetration using Bloom filters, and cache avalanche using TTL jitter.",
    estimatedMinutes: 30,
    xpReward: 50,
    prerequisite: "SYS-09",
  },

  // Phase 5: Data Layer Architecture & Scaling
  {
    code: "SYS-11",
    name: "SQL vs NoSQL: The Architectural Choice",
    slug: "sys11-sql-vs-nosql-architectural-choice",
    path: "/learn/system-design/sys11-sql-vs-nosql-architectural-choice",
    desc: "Architectural comparison of relational ACID systems vs non-relational document/key-value stores based on data access patterns.",
    estimatedMinutes: 30,
    xpReward: 50,
    prerequisite: "SYS-10",
  },
  {
    code: "SYS-12",
    name: "Database Replication, Read Replicas & Failover",
    slug: "sys12-database-replication-and-read-scaling",
    path: "/learn/system-design/sys12-database-replication-and-read-scaling",
    desc: "Scale heavy read workloads using primary-replica topologies, master-master trade-offs, automated health failover, and replication lag considerations.",
    estimatedMinutes: 30,
    xpReward: 50,
    prerequisite: "SYS-11",
  },
  {
    code: "SYS-13",
    name: "Database Partitioning & Horizontal Sharding",
    slug: "sys13-partitioning-and-sharding",
    path: "/learn/system-design/sys13-partitioning-and-sharding",
    desc: "Solve storage and write limits by sharding data across multiple database nodes. Evaluate range-based vs hash-based partition keys and hot spot risks.",
    estimatedMinutes: 35,
    xpReward: 60,
    prerequisite: "SYS-12",
  },

  // Phase 6: Asynchronous Processing & Message Queues
  {
    code: "SYS-14",
    name: "Sync vs Async Communication & Service Decoupling",
    slug: "sys14-sync-vs-async-communication",
    path: "/learn/system-design/sys14-sync-vs-async-communication",
    desc: "Why synchronous HTTP chains create fragile latency cascading, and how asynchronous message boundaries isolate downstream delays.",
    estimatedMinutes: 25,
    xpReward: 40,
    prerequisite: "SYS-13",
  },
  {
    code: "SYS-15",
    name: "Message Queues, Pub/Sub & Worker Pools",
    slug: "sys15-message-queues-and-pubsub",
    path: "/learn/system-design/sys15-message-queues-and-pubsub",
    desc: "Understand point-to-point queues vs publish-subscribe broadcast models, consumer worker pools, and peak load absorption.",
    estimatedMinutes: 30,
    xpReward: 50,
    prerequisite: "SYS-14",
  },
  {
    code: "SYS-16",
    name: "Dead-Letter Queues, Delivery Guarantees & Backpressure",
    slug: "sys16-dead-letter-queues-and-backpressure",
    path: "/learn/system-design/sys16-dead-letter-queues-and-backpressure",
    desc: "Handle poison messages with Dead-Letter Queues (DLQ), understand at-least-once delivery challenges, and apply consumer backpressure.",
    estimatedMinutes: 30,
    xpReward: 50,
    prerequisite: "SYS-15",
  },

  // Phase 7: Reliability & Fault Tolerance
  {
    code: "SYS-17",
    name: "Timeouts, Retries, Exponential Backoff & Jitter",
    slug: "sys17-timeouts-retries-and-backoff",
    path: "/learn/system-design/sys17-timeouts-retries-and-backoff",
    desc: "Prevent thread exhaustion with aggressive timeouts and prevent self-inflicted retry storms using exponential backoff with randomized jitter.",
    estimatedMinutes: 30,
    xpReward: 50,
    prerequisite: "SYS-16",
  },
  {
    code: "SYS-18",
    name: "Circuit Breakers & Rate Limiting Algorithms",
    slug: "sys18-circuit-breakers-and-rate-limiting",
    path: "/learn/system-design/sys18-circuit-breakers-and-rate-limiting",
    desc: "Fail fast using the Circuit Breaker pattern (Closed, Open, Half-Open states) and protect resources with Token Bucket & Leaky Bucket rate limiting.",
    estimatedMinutes: 30,
    xpReward: 50,
    prerequisite: "SYS-17",
  },
  {
    code: "SYS-19",
    name: "Idempotency Keys & Duplicate Prevention",
    slug: "sys19-idempotency-and-duplicate-prevention",
    path: "/learn/system-design/sys19-idempotency-and-duplicate-prevention",
    desc: "Design distributed mutation endpoints that safely tolerate network retries without duplicate payments, orders, or side effects using idempotency keys.",
    estimatedMinutes: 30,
    xpReward: 50,
    prerequisite: "SYS-18",
  },
  {
    code: "SYS-20",
    name: "Single Points of Failure & Redundancy Design",
    slug: "sys20-single-point-of-failure-and-redundancy",
    path: "/learn/system-design/sys20-single-point-of-failure-and-redundancy",
    desc: "Audit an architecture diagram to identify Single Points of Failure (SPOFs) across DNS, load balancers, application nodes, and persistence layers.",
    estimatedMinutes: 30,
    xpReward: 50,
    prerequisite: "SYS-19",
  },

  // Phase 8: Consistency & Distributed Systems
  {
    code: "SYS-21",
    name: "Strong vs Eventual Consistency in Practice",
    slug: "sys21-strong-vs-eventual-consistency",
    path: "/learn/system-design/sys21-strong-vs-eventual-consistency",
    desc: "Demystify linearizable strong consistency vs eventual consistency. Understand replication lag and design read-after-write user experiences.",
    estimatedMinutes: 30,
    xpReward: 50,
    prerequisite: "SYS-20",
  },
  {
    code: "SYS-22",
    name: "The CAP Theorem & PACELC in Real-World Systems",
    slug: "sys22-cap-theorem-and-pacelc-in-practice",
    path: "/learn/system-design/sys22-cap-theorem-and-pacelc-in-practice",
    desc: "Why network partitions force a choice between Availability and Consistency. Understand PACELC latency trade-offs during normal operations.",
    estimatedMinutes: 30,
    xpReward: 50,
    prerequisite: "SYS-21",
  },

  // Phase 9: Security & Observability Architecture
  {
    code: "SYS-23",
    name: "Architecture-Level Security Boundaries",
    slug: "sys23-architecture-level-security",
    path: "/learn/system-design/sys23-architecture-level-security",
    desc: "Architect perimeter defense: API Gateways, JWT vs server-side tokens, rate limiting as a DDoS defense, secrets management, and encryption at rest/transit.",
    estimatedMinutes: 25,
    xpReward: 40,
    prerequisite: "SYS-22",
  },
  {
    code: "SYS-24",
    name: "Observability: Logs, Metrics, Traces & Health",
    slug: "sys24-observability-logs-metrics-traces",
    path: "/learn/system-design/sys24-observability-logs-metrics-traces",
    desc: "The 3 pillars of observability: centralized structured logs, time-series metrics (RED method), and distributed request tracing with correlation IDs.",
    estimatedMinutes: 25,
    xpReward: 40,
    prerequisite: "SYS-23",
  },

  // Phase 10: Patterns & Evolution
  {
    code: "SYS-25",
    name: "Monolith Evolution vs Service Boundaries",
    slug: "sys25-monolith-to-microservices-evolution",
    path: "/learn/system-design/sys25-monolith-to-microservices-evolution",
    desc: "When a modular monolith is the right choice, what pain points justify service decomposition, and how to define decoupled domain boundaries.",
    estimatedMinutes: 30,
    xpReward: 50,
    prerequisite: "SYS-24",
  },
  {
    code: "SYS-26",
    name: "Event-Driven Architecture & Event Sourcing",
    slug: "sys26-event-driven-architecture",
    path: "/learn/system-design/sys26-event-driven-architecture",
    desc: "Design systems that communicate via immutable domain events, pub/sub topologies, event ordering considerations, and CQRS separation.",
    estimatedMinutes: 30,
    xpReward: 50,
    prerequisite: "SYS-25",
  },

  // Phase 11: Case Studies
  {
    code: "SYS-27",
    name: "Case Study: High-Throughput URL Shortener",
    slug: "sys27-case-study-url-shortener",
    path: "/learn/system-design/sys27-case-study-url-shortener",
    desc: "Step-by-step design of TinyURL: Functional/Non-functional requirements, Base62 encoding vs token range generators, cache sizing, and 100M daily redirects.",
    estimatedMinutes: 40,
    xpReward: 70,
    prerequisite: "SYS-26",
  },
  {
    code: "SYS-28",
    name: "Case Study: Distributed Rate Limiter & Gateway",
    slug: "sys28-case-study-distributed-rate-limiter",
    path: "/learn/system-design/sys28-case-study-distributed-rate-limiter",
    desc: "Design a high-scale global rate limiting service using sliding window counters, centralized in-memory tracking, race condition handling, and fallback headers.",
    estimatedMinutes: 40,
    xpReward: 70,
    prerequisite: "SYS-27",
  },
];

// ─────────────────────────────────────────────────────────────
// Roadmap Stages for the Roadmaps Engine
// ─────────────────────────────────────────────────────────────

export interface SystemDesignLesson {
  code: string;
  name: string;
  slug: string;
  path: string;
  desc: string;
  estimatedMinutes: number;
}

export interface SystemDesignStage {
  id: string;
  stageNumber: number;
  name: string;
  subtitle: string;
  description: string;
  lessons: SystemDesignLesson[];
}

export const SYSTEM_DESIGN_STAGES: SystemDesignStage[] =
  SYSTEM_DESIGN_PROGRESSION_PHASES.map((p) => ({
    id: p.id,
    stageNumber: p.phaseNumber,
    name: p.title,
    subtitle: p.tagline,
    description: p.desc,
    lessons: ALL_SYSTEM_DESIGN_LESSONS.filter((l) =>
      p.lessonCodes.includes(l.code)
    ).map((l) => ({
      code: l.code,
      name: l.name,
      slug: l.slug,
      path: l.path,
      desc: l.desc,
      estimatedMinutes: l.estimatedMinutes,
    })),
  }));

// ─────────────────────────────────────────────────────────────
// Capstone Project Specification
// ─────────────────────────────────────────────────────────────

export const SYSTEM_DESIGN_CAPSTONE: CapstoneMeta = {
  id: "pulsescale-engine",
  title: "PulseScale — Enterprise Global Notification & Event Dispatch System",
  subtitle: "High-Throughput Multi-Channel Architecture & Fault-Tolerant Event Hub",
  desc: "Design, evaluate, and trace an industrial-grade notification delivery platform capable of processing 100M events/day. Features multi-tier load balancing, sliding-window rate limiting, priority queues (Transactional vs Marketing), idempotency deduplication, circuit-breaking third-party gateways, and automated failover.",
  path: "/learn/system-design/projects/pulsescale-engine",
  estimatedMinutes: 90,
  xpReward: 500,
  keyFeatures: [
    "Requirements & Scale: 100M daily alerts (1,160 average RPS, 10,000 peak RPS) with P99 < 500ms delivery",
    "Priority Queuing: Strict isolation between urgent transactional OTPs and bulk promotional campaigns",
    "Distributed Rate Limiter: Sliding-window rate limiting per recipient to prevent message flooding and abuse",
    "Idempotency Gate: Redis/database deduplication keys ensuring zero duplicate charges or SMS dispatches",
    "Circuit Breaker & Fallback: Automatic degradation and failover between secondary upstream SMS/Email providers",
    "Full Telemetry: End-to-end distributed trace tracking from webhook intake to recipient delivery receipt",
  ],
};

// ─────────────────────────────────────────────────────────────
// Ecosystem / Related Topics
// ─────────────────────────────────────────────────────────────

export const SYSTEM_DESIGN_RELATED_TOPICS: RelatedTopic[] = [
  { id: "postgresql", title: "PostgreSQL", path: "/learn/postgresql" },
  { id: "mongodb", title: "MongoDB", path: "/learn/mongodb" },
  { id: "prisma", title: "Prisma", path: "/learn/prisma" },
  { id: "nodejs", title: "Node.js", path: "/learn/nodejs" },
  { id: "nestjs", title: "NestJS", path: "/learn/nestjs" },
];

// ─────────────────────────────────────────────────────────────
// Query & Utility Helpers
// ─────────────────────────────────────────────────────────────

export function getAllLessons(): LessonMeta[] {
  return ALL_SYSTEM_DESIGN_LESSONS;
}

export function getLessonBySlug(slug: string): LessonMeta | undefined {
  return ALL_SYSTEM_DESIGN_LESSONS.find(
    (l) => l.slug === slug || l.slug === `sys${slug}` || l.code.toLowerCase() === slug.toLowerCase()
  );
}

export function getLessonsByPhaseId(phaseId: string): LessonMeta[] {
  const phase = SYSTEM_DESIGN_PROGRESSION_PHASES.find((p) => p.id === phaseId);
  if (!phase) return [];
  return ALL_SYSTEM_DESIGN_LESSONS.filter((l) => phase.lessonCodes.includes(l.code));
}

export function getStageByLessonSlug(slug: string): SystemDesignStage | undefined {
  const lesson = getLessonBySlug(slug);
  if (!lesson) return undefined;
  return SYSTEM_DESIGN_STAGES.find((stage) =>
    stage.lessons.some((l) => l.code === lesson.code)
  );
}

export function getNextLessonSlug(currentSlug: string): string | null {
  const all = ALL_SYSTEM_DESIGN_LESSONS;
  const idx = all.findIndex((l) => l.slug === currentSlug);
  if (idx === -1 || idx === all.length - 1) return null;
  return all[idx + 1].slug;
}

export function getPrevLessonSlug(currentSlug: string): string | null {
  const all = ALL_SYSTEM_DESIGN_LESSONS;
  const idx = all.findIndex((l) => l.slug === currentSlug);
  if (idx <= 0) return null;
  return all[idx - 1].slug;
}

export function getNextLesson(currentSlug: string): LessonMeta | null {
  const all = ALL_SYSTEM_DESIGN_LESSONS;
  const idx = all.findIndex(
    (l) => l.slug.toLowerCase() === currentSlug.toLowerCase() || l.code.toLowerCase() === currentSlug.toLowerCase()
  );
  if (idx === -1 || idx === all.length - 1) return null;
  return all[idx + 1];
}

export function getPrevLesson(currentSlug: string): LessonMeta | null {
  const all = ALL_SYSTEM_DESIGN_LESSONS;
  const idx = all.findIndex(
    (l) => l.slug.toLowerCase() === currentSlug.toLowerCase() || l.code.toLowerCase() === currentSlug.toLowerCase()
  );
  if (idx <= 0) return null;
  return all[idx - 1];
}

export const PROGRESSION_PHASES = SYSTEM_DESIGN_PROGRESSION_PHASES;
export const SYSTEM_DESIGN_LESSONS = ALL_SYSTEM_DESIGN_LESSONS;

export function getSystemDesignCourse(): Course {
  const allLessons = getAllLessons();
  return {
    id: "system-design",
    title: "Learn System Design",
    prerequisites: {
      items: [
        "Basic programming knowledge: functions, data structures, and in-memory execution",
        "Client-server architecture, HTTP request-response cycle, and REST APIs",
        "Basic database concepts: relational tables, document storage, and CRUD",
      ],
      refresherHref: "/learn/nodejs",
      refresherLabel: "Need a refresher? Open the Node.js curriculum",
    },
    capstone: {
      title: SYSTEM_DESIGN_CAPSTONE.title,
      description:
        "Your finish line: architect and trace PulseScale, an industrial-grade notification delivery platform processing 100M events/day with multi-tier routing, sliding-window rate limiting, priority queues, and circuit breakers.",
      href: SYSTEM_DESIGN_CAPSTONE.path,
    },
    phases: SYSTEM_DESIGN_PROGRESSION_PHASES.map((phase) => ({
      id: phase.id,
      name: phase.title,
      summary: phase.desc,
      lessons: phase.lessonCodes
        .map((code) => allLessons.find((l) => l.code === code))
        .filter((l): l is LessonMeta => l !== undefined)
        .map((l) => ({
          id: l.slug,
          code: l.code,
          title: l.name,
          description: l.desc,
          minutes: l.estimatedMinutes,
          requires: l.prerequisite,
          href: l.path,
        })),
    })),
  };
}

