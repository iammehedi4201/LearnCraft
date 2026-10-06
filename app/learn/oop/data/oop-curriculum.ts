/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * OOP CURRICULUM — AUTHORITATIVE DATA LAYER
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Streamlined, Essential Object-Oriented Programming (OOP) Curriculum.
 *
 * Core Philosophy: "OOP teaches OOP — only the main things."
 * Focuses on fundamental mental models, the 4 pillars, composition over
 * inheritance, the 5 SOLID principles, avoiding anti-patterns, and the capstone.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export type ContentTag = "CORE" | "BUILD" | "PROFESSIONAL" | "REFERENCE";

export interface LessonMeta {
  code: string;
  slug: string;
  name: string;
  desc: string;
  path: string;
  tag: ContentTag;
  estimatedMinutes: number;
  prerequisite?: string;
  stepNumber: number;
}

export interface CapstoneProjectMeta {
  id: string;
  stageNumber: number;
  slug: string;
  title: string;
  subtitle: string;
  desc: string;
  path: string;
  badge: string;
  xpReward: number;
  estimatedMinutes: number;
  prerequisites: string[];
  skillsTaught: string[];
  stepsCount: number;
}

export interface StageMeta {
  id: string;
  stageNumber: number;
  name: string;
  subtitle: string;
  milestone: string;
  description: string;
  theme: {
    badge: string;
    dot: string;
    border: string;
    bgSubtle: string;
    textAccent: string;
  };
  lessons: LessonMeta[];
  capstone?: CapstoneProjectMeta;
}

export interface ProgressionPhaseMeta {
  id: string;
  phaseNumber: number;
  label: string;
  tag: string;
  desc: string;
  scope: string;
  icon: "zap" | "server" | "shield" | "layers";
  lessonCodes: string[];
}

export interface PrerequisiteTopicMeta {
  id: string;
  title: string;
  desc: string;
  tag: string;
  badge: string;
  path: string;
  level?: string;
}

export interface RelatedTopicMeta {
  id: string;
  title: string;
  desc: string;
  badge: string;
  path: string;
}

// ─────────────────────────────────────────────────────────────
// Prerequisites & Related Topics (External Context)
// ─────────────────────────────────────────────────────────────

export const OOP_PREREQUISITES: PrerequisiteTopicMeta[] = [
  {
    id: "prereq-prog-basics",
    title: "Basic Programming Fundamentals",
    desc: "Variables, primitive data types, control flow (if/else, loops), functions, and basic parameter passing in any language.",
    tag: "Required Foundation",
    badge: "Foundation",
    path: "/roadmaps?category=language#skill-roadmaps",
    level: "Beginner",
  },
];

export const OOP_RELATED_TOPICS: RelatedTopicMeta[] = [
  {
    id: "rel-ts",
    title: "TypeScript",
    desc: "Static typing mental models, generics, compiler flags, and structural interfaces.",
    badge: "Language",
    path: "/learn/typescript",
  },
  {
    id: "rel-nestjs",
    title: "NestJS",
    desc: "Enterprise backend architecture powered by dependency injection and modular design.",
    badge: "Backend",
    path: "/learn/nestjs",
  },
  {
    id: "rel-nextjs",
    title: "Next.js",
    desc: "Full-stack React framework with Server Components and architecture patterns.",
    badge: "Full-Stack",
    path: "/learn/nextjs",
  },
  {
    id: "rel-tanstack",
    title: "TanStack Query",
    desc: "Asynchronous state management and optimistic caching architecture.",
    badge: "Frontend",
    path: "/learn/tanstack",
  },
];

// ─────────────────────────────────────────────────────────────
// Final Capstone Project (Pure OOP Architecture)
// ─────────────────────────────────────────────────────────────

export const OOP_CAPSTONE: CapstoneProjectMeta = {
  id: "capstone-oop-engine",
  stageNumber: 4,
  slug: "task-workflow-engine",
  title: "Object-Oriented Task & Workflow Engine",
  subtitle: "Final Capstone Project",
  desc: "Architect a robust, decoupled Task Management and Workflow Automation Engine demonstrating pure encapsulation, polymorphism, composition over inheritance, and full SOLID compliance.",
  path: "/learn/oop/projects/task-workflow-engine",
  badge: "🛠️ Capstone",
  xpReward: 300,
  estimatedMinutes: 60,
  prerequisites: ["OOP-02", "OOP-05", "OOP-07", "OOP-13"],
  skillsTaught: [
    "Encapsulating Invariants with Domain Entities",
    "Polymorphic Step Handlers & Strategy Dispatch",
    "Composition-Based Event Notifications & Audit Logging",
    "Applying SOLID to Eliminate Deep Inheritance Hierarchies",
    "Defensive State Transitions with State & Command Patterns",
    "Decoupling Callers from Concrete Engine Implementations",
  ],
  stepsCount: 5,
};

// ─────────────────────────────────────────────────────────────
// 4 Streamlined Pedagogy Stages (All 16 Essential Lessons)
// ─────────────────────────────────────────────────────────────

export const OOP_STAGES: StageMeta[] = [
  {
    id: "stage-1",
    stageNumber: 1,
    name: "Foundations & The 4 Pillars",
    subtitle: "Mental Models, Encapsulation, Abstraction, Inheritance & Polymorphism",
    milestone: "Shift from procedural data-passing to autonomous entities and master the four fundamental pillars.",
    description: "Understand why OOP exists, how classes bundle state with behavior, and how encapsulation, abstraction, inheritance, and polymorphism interact.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "OOP-01",
        stepNumber: 1,
        slug: "oop01-why-oop",
        name: "Object-Oriented Thinking: Objects, Classes, State & Behavior",
        desc: "Why OOP exists: bundle your data and functions together into organized, self-protecting objects.",
        path: "/learn/oop/oop01-why-oop",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "Basic Programming Fundamentals",
      },
      {
        code: "OOP-02",
        stepNumber: 2,
        slug: "oop02-encapsulation",
        name: "Encapsulation: Protecting State & Invariants",
        desc: "Keep internal secrets hidden: use private fields so outsiders cannot tamper with your data directly.",
        path: "/learn/oop/oop02-encapsulation",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "OOP-01 (Object-Oriented Thinking)",
      },
      {
        code: "OOP-03",
        stepNumber: 3,
        slug: "oop03-abstraction",
        name: "Abstraction & Interfaces: Contracts Over Implementations",
        desc: "Hide complicated gears: expose simple buttons and use Interfaces to swap tools effortlessly.",
        path: "/learn/oop/oop03-abstraction",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "OOP-02 (Encapsulation)",
      },
      {
        code: "OOP-04",
        stepNumber: 4,
        slug: "oop04-inheritance",
        name: "Inheritance: Sharing Common Traits ('Is-A' Relationship)",
        desc: "Share common traits: create specialized child classes from a parent class so you don't repeat code.",
        path: "/learn/oop/oop04-inheritance",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "OOP-03 (Abstraction & Interfaces)",
      },
      {
        code: "OOP-05",
        stepNumber: 5,
        slug: "oop05-polymorphism",
        name: "Polymorphism: Eliminating Conditionals with Dynamic Dispatch",
        desc: "One command, many behaviors: trigger different actions on different objects without messy if/else statements.",
        path: "/learn/oop/oop05-polymorphism",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "OOP-04 (Inheritance)",
      },
    ],
  },
  {
    id: "stage-2",
    stageNumber: 2,
    name: "Relationships & Composition",
    subtitle: "Association, Composition Over Inheritance, Coupling & Cohesion",
    milestone: "Connect multiple objects cleanly and build flexible systems with Lego-like composition.",
    description: "Learn how objects connect with each other, when to share data, and why building with components beats deep inheritance.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "OOP-06",
        stepNumber: 6,
        slug: "oop06-object-relationships",
        name: "Object Relationships: Association, Aggregation & Composition",
        desc: "How objects work together: understanding uses-a, has-a, and whole-part relationships.",
        path: "/learn/oop/oop06-object-relationships",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "OOP-05 (Polymorphism)",
      },
      {
        code: "OOP-07",
        stepNumber: 7,
        slug: "oop07-composition-over-inheritance",
        name: "Favor Composition Over Inheritance",
        desc: "Build like Lego blocks: assemble small pluggable components instead of deep, fragile family trees.",
        path: "/learn/oop/oop07-composition-over-inheritance",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "OOP-06 (Object Relationships)",
      },
      {
        code: "OOP-08",
        stepNumber: 8,
        slug: "oop08-coupling-and-cohesion",
        name: "Coupling & Cohesion: The Twin Metrics of Clean Design",
        desc: "Do one job well (High Cohesion) and keep loose connections (Low Coupling) so changes are simple.",
        path: "/learn/oop/oop08-coupling-and-cohesion",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "OOP-07 (Composition Over Inheritance)",
      },
    ],
  },
  {
    id: "stage-3",
    stageNumber: 3,
    name: "The SOLID Principles",
    subtitle: "SRP, OCP, LSP, ISP & DIP: Simple Rules for Clean Architecture",
    milestone: "Master the 5 famous SOLID rules to design robust, clean, and extensible software.",
    description: "Learn each SOLID principle with clear real-world analogies: Chef roles, App Stores, Rubber Ducks, Menus, and Wall Sockets.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "OOP-09",
        stepNumber: 9,
        slug: "oop09-single-responsibility",
        name: "Single Responsibility Principle (SRP)",
        desc: "One class, one job: a class should have one, and only one, reason to change.",
        path: "/learn/oop/oop09-single-responsibility",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "OOP-08 (Coupling & Cohesion)",
      },
      {
        code: "OOP-10",
        stepNumber: 10,
        slug: "oop10-open-closed",
        name: "Open/Closed Principle (OCP)",
        desc: "Open for extension, closed for modification: add new features without breaking existing code.",
        path: "/learn/oop/oop10-open-closed",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "OOP-09 (Single Responsibility)",
      },
      {
        code: "OOP-11",
        stepNumber: 11,
        slug: "oop11-liskov-substitution",
        name: "Liskov Substitution Principle (LSP)",
        desc: "No surprises: any child class should be able to substitute its parent without crashing.",
        path: "/learn/oop/oop11-liskov-substitution",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "OOP-10 (Open/Closed)",
      },
      {
        code: "OOP-12",
        stepNumber: 12,
        slug: "oop12-interface-segregation",
        name: "Interface Segregation Principle (ISP)",
        desc: "Keep menus small: don't force classes to implement methods they never use.",
        path: "/learn/oop/oop12-interface-segregation",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "OOP-11 (Liskov Substitution)",
      },
      {
        code: "OOP-13",
        stepNumber: 13,
        slug: "oop13-dependency-inversion",
        name: "Dependency Inversion Principle (DIP)",
        desc: "Use standard sockets: plug tools into your code with interfaces instead of hardwiring them.",
        path: "/learn/oop/oop13-dependency-inversion",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "OOP-12 (Interface Segregation)",
      },
    ],
  },
  {
    id: "stage-4",
    stageNumber: 4,
    name: "Design Smells, Patterns & Capstone",
    subtitle: "Avoiding Bad Habits, Daily Patterns & Final Project",
    milestone: "Avoid bad OOP habits, master Strategy & Factory patterns, and complete the Capstone Engine.",
    description: "Learn what to avoid (God objects), apply essential patterns, and build the final workflow engine.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    capstone: OOP_CAPSTONE,
    lessons: [
      {
        code: "OOP-14",
        stepNumber: 14,
        slug: "oop14-design-smells",
        name: "Common OOP Anti-Patterns & Code Smells",
        desc: "Spot bad habits: avoid God objects, anemic models, and know when simple functions are better.",
        path: "/learn/oop/oop14-design-smells",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "OOP-13 (Dependency Inversion)",
      },
      {
        code: "OOP-15",
        stepNumber: 15,
        slug: "oop15-pragmatic-patterns",
        name: "Pragmatic Design Patterns: Strategy & Factory in Practice",
        desc: "The 2 patterns you will use every day: Strategy (swappable ways) and Factory (clean object creation).",
        path: "/learn/oop/oop15-pragmatic-patterns",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "OOP-14 (Design Smells)",
      },
      {
        code: "OOP-16",
        stepNumber: 16,
        slug: "oop16-architectural-reasoning-capstone",
        name: "Architectural Reasoning & Capstone Review",
        desc: "Put it all together: think like a software architect and construct the final workflow engine.",
        path: "/learn/oop/oop16-architectural-reasoning-capstone",
        tag: "PROFESSIONAL",
        estimatedMinutes: 30,
        prerequisite: "OOP-15 (Pragmatic Patterns)",
      },
    ],
  },
];

export const OOP_PROGRESSION_PHASES: ProgressionPhaseMeta[] = [
  {
    id: "foundations",
    phaseNumber: 1,
    label: "Foundations & 4 Pillars",
    tag: "Phase 01",
    desc: "Object-oriented thinking, encapsulation, abstraction, inheritance & polymorphism",
    scope: "Core Pillars & Invariants",
    icon: "layers",
    lessonCodes: ["OOP-01", "OOP-02", "OOP-03", "OOP-04", "OOP-05"],
  },
  {
    id: "relationships",
    phaseNumber: 2,
    label: "Relationships & Composition",
    tag: "Phase 02",
    desc: "Association, composition over inheritance, delegation, coupling & cohesion",
    scope: "Object Collaboration",
    icon: "server",
    lessonCodes: ["OOP-06", "OOP-07", "OOP-08"],
  },
  {
    id: "solid-principles",
    phaseNumber: 3,
    label: "The SOLID Principles",
    tag: "Phase 03",
    desc: "SRP, OCP, LSP, ISP & DIP: Problem → Bad Design → Principle → Clean Solution",
    scope: "Professional Architecture",
    icon: "shield",
    lessonCodes: ["OOP-09", "OOP-10", "OOP-11", "OOP-12", "OOP-13"],
  },
  {
    id: "smells-and-patterns",
    phaseNumber: 4,
    label: "Smells, Patterns & Capstone",
    tag: "Phase 04",
    desc: "Anti-patterns, God objects, Strategy & Factory patterns, and Capstone Project",
    scope: "Mastery & Capstone",
    icon: "zap",
    lessonCodes: ["OOP-14", "OOP-15", "OOP-16"],
  },
];

// ─────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────

export function getAllLessons(): LessonMeta[] {
  return OOP_STAGES.flatMap((stage) => stage.lessons);
}

export function getStages(): StageMeta[] {
  return OOP_STAGES;
}

export function getLessonBySlug(slug: string): LessonMeta | undefined {
  return getAllLessons().find(
    (l) =>
      l.slug === slug || l.path.endsWith(`/${slug}`) || l.path.includes(slug),
  );
}

export function getLessonByCode(code: string): LessonMeta | undefined {
  return getAllLessons().find(
    (l) => l.code.toUpperCase() === code.toUpperCase(),
  );
}

export function getStageByLessonSlug(slug: string): StageMeta | undefined {
  return OOP_STAGES.find((stage) =>
    stage.lessons.some(
      (l) =>
        l.slug === slug || l.path.endsWith(`/${slug}`) || l.path.includes(slug),
    ),
  );
}

export function getNextLesson(currentSlug: string): LessonMeta | null {
  const all = getAllLessons();
  const index = all.findIndex(
    (l) =>
      l.slug === currentSlug ||
      l.path.endsWith(`/${currentSlug}`) ||
      l.path.includes(currentSlug),
  );
  if (index >= 0 && index < all.length - 1) {
    return all[index + 1];
  }
  return null;
}

export function getPrevLesson(currentSlug: string): LessonMeta | null {
  const all = getAllLessons();
  const index = all.findIndex(
    (l) =>
      l.slug === currentSlug ||
      l.path.endsWith(`/${currentSlug}`) ||
      l.path.includes(currentSlug),
  );
  if (index > 0) {
    return all[index - 1];
  }
  return null;
}

export function getLessonsByPhaseId(phaseId: string): LessonMeta[] {
  const phase =
    OOP_PROGRESSION_PHASES.find((p) => p.id === phaseId) ||
    OOP_PROGRESSION_PHASES[0];
  const all = getAllLessons();
  return phase.lessonCodes
    .map((code) => all.find((l) => l.code === code))
    .filter((l): l is LessonMeta => l !== undefined);
}
