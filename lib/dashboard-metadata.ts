export interface TrackMeta {
  key: string;
  title: string;
  totalLessons: number;
  color: string;
  prefixes: string[];
  defaultLessonTitle: string;
  defaultPhaseName: string;
}

// 14 Core Curriculum Tracks metadata
export const TRACK_METAS: TrackMeta[] = [
  { key: "nextjs", title: "Next.js", totalLessons: 22, color: "#8C71F6", prefixes: ["nx", "next"], defaultLessonTitle: "The App Router Architecture", defaultPhaseName: "App Router & Foundations" },
  { key: "react", title: "React.js", totalLessons: 24, color: "#38BDF8", prefixes: ["rc", "react"], defaultLessonTitle: "Thinking in React & Modern Mental Models", defaultPhaseName: "Core Foundations" },
  { key: "typescript", title: "TypeScript", totalLessons: 21, color: "#3B82F6", prefixes: ["ts", "typescript"], defaultLessonTitle: "Types vs Values & The Static Type System", defaultPhaseName: "Static Type System" },
  { key: "javascript", title: "JavaScript", totalLessons: 25, color: "#F59E0B", prefixes: ["js", "javascript"], defaultLessonTitle: "Modern JavaScript Engine & Execution Context", defaultPhaseName: "Language Mechanics" },
  { key: "nodejs", title: "Node.js", totalLessons: 24, color: "#10B981", prefixes: ["node", "nodejs"], defaultLessonTitle: "What Is Node.js? Server Runtime & V8 Engine", defaultPhaseName: "Fundamentals & Runtime" },
  { key: "express", title: "Express.js", totalLessons: 28, color: "#6366F1", prefixes: ["exp", "express"], defaultLessonTitle: "What is Express & Routing Fundamentals", defaultPhaseName: "Core Routing & Middleware" },
  { key: "nestjs", title: "NestJS", totalLessons: 32, color: "#E11D48", prefixes: ["nj", "nestjs"], defaultLessonTitle: "NestJS Architecture & Dependency Injection", defaultPhaseName: "Architecture & Modules" },
  { key: "postgresql", title: "PostgreSQL", totalLessons: 29, color: "#0EA5E9", prefixes: ["pg", "postgresql"], defaultLessonTitle: "Relational Modeling & Schema Design", defaultPhaseName: "Relational Foundations" },
  { key: "mongodb", title: "MongoDB", totalLessons: 26, color: "#10B981", prefixes: ["mdb", "mongodb"], defaultLessonTitle: "Document Model & BSON Architecture", defaultPhaseName: "Document Foundations" },
  { key: "redux", title: "Redux", totalLessons: 26, color: "#7C3AED", prefixes: ["rdx", "redux"], defaultLessonTitle: "State Architecture & Redux Toolkit", defaultPhaseName: "State Fundamentals" },
  { key: "prisma", title: "Prisma", totalLessons: 27, color: "#14B8A6", prefixes: ["pri", "prisma"], defaultLessonTitle: "Prisma Schema & Type-Safe Database Client", defaultPhaseName: "Schema & Client" },
  { key: "system-design", title: "System Design", totalLessons: 28, color: "#EC4899", prefixes: ["sys", "system-design"], defaultLessonTitle: "What Is System Design & Scale Architecture", defaultPhaseName: "High-Level Architecture" },
  { key: "oop", title: "OOP", totalLessons: 20, color: "#F97316", prefixes: ["oop"], defaultLessonTitle: "OOP Foundations & SOLID Principles", defaultPhaseName: "Core OOP Principles" },
  { key: "tanstack", title: "TanStack Query", totalLessons: 22, color: "#EF4444", prefixes: ["tq", "tanstack"], defaultLessonTitle: "QueryClient & Declarative Server State", defaultPhaseName: "Core Query Concepts" },
];
