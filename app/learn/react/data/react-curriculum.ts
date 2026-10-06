/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * REACT.JS CURRICULUM DATA LAYER — LEARNCRAFT
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Authoritative curriculum metadata for React.js:
 * 9 Phases, 27 Lessons, Capstone Project & Pedagogical Metadata.
 * 
 * Strict Topic Boundary: Pure React.js only.
 * Teaches mental models, components, JSX, props, state, effects, hooks,
 * rendering cycles, forms, async UI, debugging, and testing fundamentals.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export interface LessonMeta {
  code: string;
  stepNumber: number;
  slug: string;
  name: string;
  desc: string;
  path: string;
  tag: "CORE" | "HOOKS" | "PATTERNS" | "PRACTICE" | "CAPSTONE";
  estimatedMinutes: number;
  prerequisite?: string;
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

export const REACT_PREREQUISITES: PrerequisiteTopicMeta[] = [
  {
    id: "prereq-js",
    title: "JavaScript Fundamentals",
    desc: "Functions, arrow syntax, objects, arrays, destructuring, modules, and basic DOM.",
    tag: "Required Foundation",
    badge: "Core JS",
    path: "/learn/javascript",
    level: "Intermediate",
  },
];

export const REACT_RELATED_TOPICS: RelatedTopicMeta[] = [
  {
    id: "rel-nextjs",
    title: "Next.js",
    desc: "Full-stack React framework with server components, routing, and SSR.",
    badge: "Framework",
    path: "/learn/nextjs",
  },
  /*
  {
    id: "rel-tanstack",
    title: "TanStack Query",
    desc: "Powerful asynchronous server-state management and caching for React.",
    badge: "Data Fetching",
    path: "/learn/tanstack",
  },
  */
  {
    id: "rel-ts",
    title: "TypeScript",
    desc: "Add static typing, prop interfaces, and compile-time guarantees to React.",
    badge: "Language",
    path: "/learn/typescript",
  },
];

// ─────────────────────────────────────────────────────────────
// Final Capstone Project (Pure React App)
// ─────────────────────────────────────────────────────────────

export const REACT_CAPSTONE: CapstoneProjectMeta = {
  id: "capstone-task-dashboard",
  stageNumber: 9,
  slug: "task-workflow-dashboard",
  title: "Interactive Task & Workflow Dashboard",
  subtitle: "Final React.js Capstone Project",
  desc: "Build a complete, modular React application demonstrating state lifting, controlled forms, custom hooks, context, asynchronous data fetching, and optimistic UI updates.",
  path: "/learn/react/projects/task-manager",
  badge: "⚛️ Capstone",
  xpReward: 300,
  estimatedMinutes: 60,
  prerequisites: ["REACT-07", "REACT-13", "REACT-14", "REACT-17", "REACT-20"],
  skillsTaught: [
    "Modular component tree and slot composition",
    "Complex state management with useState and useReducer",
    "Controlled forms with inline input validation",
    "Custom hooks for persistent storage and API syncing",
    "Asynchronous data flow with loading and error boundaries",
    "Performance optimization with derived state and memoization",
  ],
  stepsCount: 5,
};

// ─────────────────────────────────────────────────────────────
// Stages & All 27 React Lessons
// ─────────────────────────────────────────────────────────────

export const REACT_STAGES: StageMeta[] = [
  {
    id: "stage-1",
    stageNumber: 1,
    name: "React Fundamentals & Mental Model",
    subtitle: "Declarative UI, Components & JSX",
    milestone: "Understand how React differs from imperative DOM manipulation and write your first components.",
    description: "Learn what React is, why it was invented, the declarative mental model, JSX syntax rules, and component composition.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "REACT-01",
        stepNumber: 1,
        slug: "react01-what-is-react",
        name: "What Is React? The Declarative Mental Model",
        desc: "Why React exists, imperative vs declarative programming, and how components describe the UI.",
        path: "/learn/react/react01-what-is-react",
        tag: "CORE",
        estimatedMinutes: 15,
        prerequisite: "None",
      },
      {
        code: "REACT-02",
        stepNumber: 2,
        slug: "react02-jsx-and-elements",
        name: "JSX: Writing HTML Inside JavaScript & Expressions",
        desc: "How JSX translates to JavaScript, embedding dynamic expressions with curly braces, and strict syntax rules.",
        path: "/learn/react/react02-jsx-and-elements",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "REACT-01",
      },
      {
        code: "REACT-03",
        stepNumber: 3,
        slug: "react03-components-and-composition",
        name: "Components & Composition: Building Reusable Blocks",
        desc: "Creating functional components, organizing component hierarchies, and nesting UI cleanly.",
        path: "/learn/react/react03-components-and-composition",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "REACT-02",
      },
    ],
  },
  {
    id: "stage-2",
    stageNumber: 2,
    name: "Props & Component Communication",
    subtitle: "Passing Data, Callbacks & One-Way Data Flow",
    milestone: "Master passing data down via props and communicating events back to parent components.",
    description: "Learn how props work as component arguments, pass callback functions, use the children prop, and embrace one-way data flow.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "REACT-04",
        stepNumber: 4,
        slug: "react04-props-and-data-flow",
        name: "Props & One-Way Data Flow: Passing Data Down",
        desc: "Pass data into components like function parameters, set default props, and enforce one-way flow.",
        path: "/learn/react/react04-props-and-data-flow",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "REACT-03",
      },
      {
        code: "REACT-05",
        stepNumber: 5,
        slug: "react05-passing-functions-and-callbacks",
        name: "Callback Props: Child-to-Parent Communication",
        desc: "Pass handler functions as props so child components can notify parents of user actions.",
        path: "/learn/react/react05-passing-functions-and-callbacks",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "REACT-04",
      },
      {
        code: "REACT-06",
        stepNumber: 6,
        slug: "react06-children-and-slot-composition",
        name: "Component Composition: The children Prop & Layout Slots",
        desc: "Build flexible wrapper and container components using the special children prop.",
        path: "/learn/react/react06-children-and-slot-composition",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "REACT-05",
      },
    ],
  },
  {
    id: "stage-3",
    stageNumber: 3,
    name: "State & Interactivity",
    subtitle: "Component Memory, Events & Lifting State",
    milestone: "Add interactive memory to components using useState and handle user clicks and inputs.",
    description: "Understand what state is, how useState triggers re-renders, functional state updates, and lifting state to common ancestors.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "REACT-07",
        stepNumber: 7,
        slug: "react07-state-and-usestate",
        name: "What Is State? The useState Hook & Component Memory",
        desc: "Store dynamic values that persist across renders and trigger UI updates with useState.",
        path: "/learn/react/react07-state-and-usestate",
        tag: "HOOKS",
        estimatedMinutes: 25,
        prerequisite: "REACT-06",
      },
      {
        code: "REACT-08",
        stepNumber: 8,
        slug: "react08-event-handling-and-updates",
        name: "Event Handling & Functional State Updates",
        desc: "Handle onClick, onChange, and use updater functions prev => next to avoid stale state bugs.",
        path: "/learn/react/react08-event-handling-and-updates",
        tag: "HOOKS",
        estimatedMinutes: 20,
        prerequisite: "REACT-07",
      },
      {
        code: "REACT-09",
        stepNumber: 9,
        slug: "react09-lifting-state-up",
        name: "Lifting State Up: Sharing State Between Siblings",
        desc: "Move state to the closest common parent when multiple components need to share data.",
        path: "/learn/react/react09-lifting-state-up",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "REACT-08",
      },
      {
        code: "REACT-10",
        stepNumber: 10,
        slug: "react10-derived-state-vs-stored-state",
        name: "Derived State: Calculating Values on the Fly",
        desc: "Avoid redundant state variables by calculating derived values during render.",
        path: "/learn/react/react10-derived-state-vs-stored-state",
        tag: "PATTERNS",
        estimatedMinutes: 20,
        prerequisite: "REACT-09",
      },
    ],
  },
  {
    id: "stage-4",
    stageNumber: 4,
    name: "Lists, Conditional UI & Forms",
    subtitle: "Dynamic Lists, Keys, Ternaries & Controlled Inputs",
    milestone: "Render dynamic data arrays, show/hide elements conditionally, and handle user form inputs.",
    description: "Learn map() for lists, the critical role of stable keys, ternary operators, and controlled form inputs.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "REACT-11",
        stepNumber: 11,
        slug: "react11-conditional-rendering",
        name: "Conditional Rendering: Ternaries, && & Guard Clauses",
        desc: "Render different UI elements based on state using if, ternary operators, and logical AND.",
        path: "/learn/react/react11-conditional-rendering",
        tag: "CORE",
        estimatedMinutes: 20,
        prerequisite: "REACT-10",
      },
      {
        code: "REACT-12",
        stepNumber: 12,
        slug: "react12-rendering-lists-and-keys",
        name: "Rendering Lists with map() & Why Keys Matter",
        desc: "Transform arrays into UI elements and use unique, stable keys to prevent DOM corruption.",
        path: "/learn/react/react12-rendering-lists-and-keys",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "REACT-11",
      },
      {
        code: "REACT-13",
        stepNumber: 13,
        slug: "react13-controlled-inputs-and-forms",
        name: "Controlled Inputs & Handling User Forms",
        desc: "Bind form inputs to React state, handle onSubmit, validate fields, and clear inputs.",
        path: "/learn/react/react13-controlled-inputs-and-forms",
        tag: "CORE",
        estimatedMinutes: 25,
        prerequisite: "REACT-12",
      },
    ],
  },
  {
    id: "stage-5",
    stageNumber: 5,
    name: "Core Hooks & Side Effects",
    subtitle: "useEffect, useRef & useContext",
    milestone: "Synchronize with browser APIs and share application context without prop drilling.",
    description: "Master useEffect, dependency arrays, cleanup functions, useRef for DOM access, and useContext for shared state.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "REACT-14",
        stepNumber: 14,
        slug: "react14-useeffect-fundamentals",
        name: "useEffect: Synchronizing with External Systems",
        desc: "When and why Effects are needed, dependency arrays, and avoiding unnecessary Effects.",
        path: "/learn/react/react14-useeffect-fundamentals",
        tag: "HOOKS",
        estimatedMinutes: 25,
        prerequisite: "REACT-13",
      },
      {
        code: "REACT-15",
        stepNumber: 15,
        slug: "react15-effect-cleanup-and-mistakes",
        name: "Effect Cleanups, Subscriptions & Common Traps",
        desc: "Return cleanup functions to cancel timers and listeners; avoid infinite render loops.",
        path: "/learn/react/react15-effect-cleanup-and-mistakes",
        tag: "HOOKS",
        estimatedMinutes: 20,
        prerequisite: "REACT-14",
      },
      {
        code: "REACT-16",
        stepNumber: 16,
        slug: "react16-useref-and-dom-access",
        name: "useRef: Retaining Values Without Re-rendering & DOM Access",
        desc: "Store mutable values that do not trigger re-renders, and directly focus or measure DOM elements.",
        path: "/learn/react/react16-useref-and-dom-access",
        tag: "HOOKS",
        estimatedMinutes: 20,
        prerequisite: "REACT-15",
      },
      {
        code: "REACT-17",
        stepNumber: 17,
        slug: "react17-usecontext-and-shared-state",
        name: "useContext: Sharing Global Context Without Prop Drilling",
        desc: "Create contexts, wrap component trees in Providers, and consume shared data cleanly.",
        path: "/learn/react/react17-usecontext-and-shared-state",
        tag: "HOOKS",
        estimatedMinutes: 25,
        prerequisite: "REACT-16",
      },
    ],
  },
  {
    id: "stage-6",
    stageNumber: 6,
    name: "How React Renders & Reconciles",
    subtitle: "Render Cycle, Virtual DOM & State Reset",
    milestone: "Understand exactly what happens under the hood when a component renders or re-renders.",
    description: "Learn the Trigger-Render-Commit pipeline, reconciliation, component identity, and state preservation rules.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "REACT-18",
        stepNumber: 18,
        slug: "react18-render-cycle-and-reconciliation",
        name: "The Render Cycle: Trigger, Render, Commit & Virtual DOM",
        desc: "How React schedules renders, compares virtual trees (diffing), and commits minimal DOM updates.",
        path: "/learn/react/react18-render-cycle-and-reconciliation",
        tag: "PATTERNS",
        estimatedMinutes: 25,
        prerequisite: "REACT-17",
      },
      {
        code: "REACT-19",
        stepNumber: 19,
        slug: "react19-component-identity-and-state-preservation",
        name: "Component Identity, Keys & State Reset Rules",
        desc: "Why state is tied to position in the UI tree, and how changing keys forces a clean state reset.",
        path: "/learn/react/react19-component-identity-and-state-preservation",
        tag: "PATTERNS",
        estimatedMinutes: 20,
        prerequisite: "REACT-18",
      },
    ],
  },
  {
    id: "stage-7",
    stageNumber: 7,
    name: "Async Data Fetching & State Handling",
    subtitle: "Loading States, Error Handling & Race Conditions",
    milestone: "Fetch API data safely in React components with comprehensive status handling.",
    description: "Manage loading, success, error, and empty states gracefully, and prevent race conditions with AbortController.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "REACT-20",
        stepNumber: 20,
        slug: "react20-data-fetching-and-async-ui",
        name: "Data Fetching: Loading, Success, Error & Empty States",
        desc: "Fetch backend data inside useEffect and model UI states cleanly with status flags.",
        path: "/learn/react/react20-data-fetching-and-async-ui",
        tag: "PATTERNS",
        estimatedMinutes: 25,
        prerequisite: "REACT-19",
      },
      {
        code: "REACT-21",
        stepNumber: 21,
        slug: "react21-race-conditions-and-cleanup",
        name: "Race Conditions, AbortControllers & Fetch Cleanup",
        desc: "Prevent stale network responses from overwriting new data using AbortController and active flags.",
        path: "/learn/react/react21-race-conditions-and-cleanup",
        tag: "PATTERNS",
        estimatedMinutes: 20,
        prerequisite: "REACT-20",
      },
    ],
  },
  {
    id: "stage-8",
    stageNumber: 8,
    name: "Advanced State & Performance",
    subtitle: "useReducer, Custom Hooks & Memoization",
    milestone: "Scale complex state with reducers, encapsulate reusable logic, and optimize re-renders.",
    description: "Learn useReducer for predictable state transitions, write Custom Hooks, and understand when memoization actually helps.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    lessons: [
      {
        code: "REACT-22",
        stepNumber: 22,
        slug: "react22-usereducer-complex-state",
        name: "useReducer: Predictable State Transitions for Complex UI",
        desc: "Consolidate complex multi-step state logic into a single reducer function with action types.",
        path: "/learn/react/react22-usereducer-complex-state",
        tag: "HOOKS",
        estimatedMinutes: 25,
        prerequisite: "REACT-21",
      },
      {
        code: "REACT-23",
        stepNumber: 23,
        slug: "react23-performance-memo-usememo-usecallback",
        name: "Performance: When to use memo, useMemo & useCallback",
        desc: "Understand what causes re-renders and apply memoization only when fixing genuine performance bottlenecks.",
        path: "/learn/react/react23-performance-memo-usememo-usecallback",
        tag: "PATTERNS",
        estimatedMinutes: 25,
        prerequisite: "REACT-22",
      },
      {
        code: "REACT-24",
        stepNumber: 24,
        slug: "react24-custom-hooks",
        name: "Custom Hooks: Extracting & Sharing Reusable Logic",
        desc: "Package stateful logic into custom use... functions to share across components without repetition.",
        path: "/learn/react/react24-custom-hooks",
        tag: "HOOKS",
        estimatedMinutes: 25,
        prerequisite: "REACT-23",
      },
    ],
  },
  {
    id: "stage-9",
    stageNumber: 9,
    name: "Debugging, Testing & Capstone",
    subtitle: "Error Boundaries, React DevTools, Testing & Capstone",
    milestone: "Debug production React bugs, test user interactions, and build the final Capstone project.",
    description: "Catch render crashes with Error Boundaries, inspect state with React DevTools, write user-focused tests, and build the Capstone.",
    theme: {
      badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      dot: "bg-purple-400",
      border: "border-purple-500/30",
      bgSubtle: "bg-purple-500/[0.03]",
      textAccent: "text-purple-400",
    },
    capstone: REACT_CAPSTONE,
    lessons: [
      {
        code: "REACT-25",
        stepNumber: 25,
        slug: "react25-error-boundaries-and-debugging",
        name: "Error Boundaries, React DevTools & Debugging Common Bugs",
        desc: "Catch rendering errors gracefully with Error Boundaries and debug props and state using DevTools.",
        path: "/learn/react/react25-error-boundaries-and-debugging",
        tag: "PATTERNS",
        estimatedMinutes: 25,
        prerequisite: "REACT-24",
      },
      {
        code: "REACT-26",
        stepNumber: 26,
        slug: "react26-testing-fundamentals",
        name: "Testing Fundamentals: User-Centric Component Tests",
        desc: "Test what users see and do: render outputs, user interactions, and loading/error states.",
        path: "/learn/react/react26-testing-fundamentals",
        tag: "PRACTICE",
        estimatedMinutes: 25,
        prerequisite: "REACT-25",
      },
      {
        code: "REACT-27",
        stepNumber: 27,
        slug: "react27-react-capstone-project",
        name: "React Capstone: Task & Workflow Dashboard",
        desc: "Architect a complete, modular React application from scratch demonstrating all core React competencies.",
        path: "/learn/react/react27-react-capstone-project",
        tag: "CAPSTONE",
        estimatedMinutes: 60,
        prerequisite: "REACT-26",
      },
    ],
  },
];

export const REACT_PROGRESSION_PHASES: ProgressionPhaseMeta[] = [
  {
    id: "fundamentals",
    phaseNumber: 1,
    label: "React Fundamentals",
    tag: "Phase 01",
    desc: "What is React, declarative mental models, JSX syntax & component composition",
    scope: "Mental Model & JSX",
    icon: "layers",
    lessonCodes: ["REACT-01", "REACT-02", "REACT-03"],
  },
  {
    id: "props-communication",
    phaseNumber: 2,
    label: "Props & Communication",
    tag: "Phase 02",
    desc: "Passing props, callbacks, one-way data flow & the children slot pattern",
    scope: "Component Communication",
    icon: "zap",
    lessonCodes: ["REACT-04", "REACT-05", "REACT-06"],
  },
  {
    id: "state-interactivity",
    phaseNumber: 3,
    label: "State & Interactivity",
    tag: "Phase 03",
    desc: "useState, event handling, updater functions, lifting state & derived values",
    scope: "State & Re-renders",
    icon: "zap",
    lessonCodes: ["REACT-07", "REACT-08", "REACT-09", "REACT-10"],
  },
  {
    id: "lists-forms",
    phaseNumber: 4,
    label: "Lists, Conditions & Forms",
    tag: "Phase 04",
    desc: "Conditional rendering, map() list rendering, stable keys & controlled forms",
    scope: "Dynamic UI & Forms",
    icon: "server",
    lessonCodes: ["REACT-11", "REACT-12", "REACT-13"],
  },
  {
    id: "core-hooks",
    phaseNumber: 5,
    label: "Core Hooks & Effects",
    tag: "Phase 05",
    desc: "useEffect synchronization, cleanup traps, useRef & useContext sharing",
    scope: "Hooks & Synchronization",
    icon: "shield",
    lessonCodes: ["REACT-14", "REACT-15", "REACT-16", "REACT-17"],
  },
  {
    id: "rendering-reconciliation",
    phaseNumber: 6,
    label: "Rendering & Reconciliation",
    tag: "Phase 06",
    desc: "The render pipeline, diffing, component identity & state preservation rules",
    scope: "Under the Hood",
    icon: "layers",
    lessonCodes: ["REACT-18", "REACT-19"],
  },
  {
    id: "async-data-fetching",
    phaseNumber: 7,
    label: "Async Data & UI States",
    tag: "Phase 07",
    desc: "Data fetching with useEffect, loading/error states & race condition prevention",
    scope: "Async React",
    icon: "server",
    lessonCodes: ["REACT-20", "REACT-21"],
  },
  {
    id: "advanced-state-perf",
    phaseNumber: 8,
    label: "Advanced State & Performance",
    tag: "Phase 08",
    desc: "useReducer state machines, custom hooks & pragmatic memoization (useMemo/useCallback)",
    scope: "Advanced Patterns",
    icon: "zap",
    lessonCodes: ["REACT-22", "REACT-23", "REACT-24"],
  },
  {
    id: "debugging-capstone",
    phaseNumber: 9,
    label: "Debugging, Testing & Capstone",
    tag: "Phase 09",
    desc: "Error boundaries, DevTools inspection, component testing & the final Capstone Project",
    scope: "Mastery & Capstone",
    icon: "shield",
    lessonCodes: ["REACT-25", "REACT-26", "REACT-27"],
  },
];

// ─────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────

export function getAllLessons(): LessonMeta[] {
  return REACT_STAGES.flatMap((stage) => stage.lessons);
}

export function getStages(): StageMeta[] {
  return REACT_STAGES;
}

export function getLessonBySlug(slug: string): LessonMeta | undefined {
  return getAllLessons().find(
    (l) =>
      l.slug === slug || l.path.endsWith(`/${slug}`) || l.path.includes(slug)
  );
}

export function getLessonByCode(code: string): LessonMeta | undefined {
  return getAllLessons().find(
    (l) => l.code.toUpperCase() === code.toUpperCase()
  );
}

export function getStageByLessonSlug(slug: string): StageMeta | undefined {
  return REACT_STAGES.find((stage) =>
    stage.lessons.some(
      (l) =>
        l.slug === slug || l.path.endsWith(`/${slug}`) || l.path.includes(slug)
    )
  );
}

export function getNextLesson(currentSlug: string): LessonMeta | null {
  const all = getAllLessons();
  const index = all.findIndex(
    (l) =>
      l.slug === currentSlug ||
      l.path.endsWith(`/${currentSlug}`) ||
      l.path.includes(currentSlug)
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
      l.path.includes(currentSlug)
  );
  if (index > 0) {
    return all[index - 1];
  }
  return null;
}

export function getLessonsByPhaseId(phaseId: string): LessonMeta[] {
  const phase =
    REACT_PROGRESSION_PHASES.find((p) => p.id === phaseId) ||
    REACT_PROGRESSION_PHASES[0];
  const all = getAllLessons();
  return phase.lessonCodes
    .map((code) => all.find((l) => l.code === code))
    .filter((l): l is LessonMeta => l !== undefined);
}
