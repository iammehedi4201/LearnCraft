/**
 * Redux Curriculum Data Layer — LearnCraft
 * 10 Progressive Phases, 26 In-Depth Lessons, and 1 Comprehensive Capstone Project.
 *
 * Strict Topic Boundary: Pure Redux & State Management Layer only.
 * Focuses on State Flow, Redux Core (Store, Actions, Reducers, Dispatch),
 * Redux Toolkit (configureStore, createSlice, Immer, action creators),
 * React-Redux integration (<Provider>, useSelector, useDispatch),
 * State Design & Selectors (derived data, createSelector),
 * Async Logic (createAsyncThunk, extraReducers), Normalization,
 * Middleware, and Redux DevTools debugging.
 */

export interface LessonMeta {
  code: string;
  slug: string;
  name: string;
  phaseId: string;
  phaseNumber: number;
  stepNumber: number;
  desc: string;
  estimatedMinutes: number;
  xpReward: number;
  prerequisite?: string;
  path: string;
  color?: string;
}

export interface PhaseMeta {
  id: string;
  phaseNumber: number;
  name: string;
  label: string;
  desc: string;
  scope: string;
  lessonCodes: string[];
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
  keyFeatures: string[];
}

export interface PrerequisiteItem {
  id: string;
  title: string;
  badge: string;
  category: "required" | "recommended";
  icon: string;
  desc: string;
  path: string;
}

export const REDUX_PROGRESSION_PHASES: PhaseMeta[] = [
  {
    id: "fundamentals",
    phaseNumber: 1,
    name: "State Management Fundamentals",
    label: "Phase 01: State Management Fundamentals",
    desc: "Understand what state is, why shared state causes prop drilling and synchronization bugs, why Redux exists, and when to use it vs local React state.",
    scope: "What is State · Local vs Global · Redux Mental Model · When to Use",
    lessonCodes: ["RDX-01", "RDX-02", "RDX-03"],
  },
  {
    id: "core-architecture",
    phaseNumber: 2,
    name: "Redux Core Architecture",
    label: "Phase 02: Redux Core Architecture",
    desc: "Master the fundamental triad of Redux: The Store as single source of truth, Action objects describing what happened, and pure Reducer functions enforcing immutability.",
    scope: "The Store · Actions & Creators · Reducers & Immutability",
    lessonCodes: ["RDX-04", "RDX-05", "RDX-06"],
  },
  {
    id: "data-flow",
    phaseNumber: 3,
    name: "Redux Data Flow & Vanilla Foundations",
    label: "Phase 03: Redux Data Flow & Vanilla Foundations",
    desc: "Trace unidirectional data flow step-by-step and write a minimal vanilla Redux store to understand what Redux Toolkit automates.",
    scope: "One-Way Data Flow · Manual createStore · Dispatch & Subscribe",
    lessonCodes: ["RDX-07", "RDX-08"],
  },
  {
    id: "redux-toolkit",
    phaseNumber: 4,
    name: "Redux Toolkit (RTK) Core",
    label: "Phase 04: Redux Toolkit (RTK) Core",
    desc: "Learn modern official Redux: configureStore with built-in good defaults, createSlice for consolidated state and reducers, and Immer's safe mutable-style updates.",
    scope: "configureStore · createSlice · Immer Mutation Model · Combining Slices",
    lessonCodes: ["RDX-09", "RDX-10", "RDX-11", "RDX-12"],
  },
  {
    id: "react-integration",
    phaseNumber: 5,
    name: "React-Redux Integration",
    label: "Phase 05: React-Redux Integration",
    desc: "Connect React components to the store with the <Provider>, read state slices with useSelector, dispatch actions with useDispatch, and configure typed hooks.",
    scope: "<Provider> · useSelector · useDispatch · Typed Hooks (useAppSelector)",
    lessonCodes: ["RDX-13", "RDX-14", "RDX-15"],
  },
  {
    id: "state-design",
    phaseNumber: 6,
    name: "State Design & Selectors",
    label: "Phase 06: State Design & Selectors",
    desc: "Design clean state trees: What belongs in Redux vs local state, computing derived data dynamically, and optimizing re-renders with memoized createSelector.",
    scope: "Global vs Local State · Derived Data · createSelector Memoization",
    lessonCodes: ["RDX-16", "RDX-17", "RDX-18"],
  },
  {
    id: "async-logic",
    phaseNumber: 7,
    name: "Async Logic & Side Effects",
    label: "Phase 07: Async Logic & Side Effects",
    desc: "Manage asynchronous requests safely: Why reducers must remain pure, the thunk pattern, createAsyncThunk lifecycle (pending, fulfilled, rejected), and extraReducers.",
    scope: "Thunks Mental Model · createAsyncThunk · extraReducers Builder",
    lessonCodes: ["RDX-19", "RDX-20", "RDX-21"],
  },
  {
    id: "normalization",
    phaseNumber: 8,
    name: "State Modeling & Normalization",
    label: "Phase 08: State Modeling & Normalization",
    desc: "Eliminate duplicate state and nested array mutation bugs by normalizing collections into lookup tables with createEntityAdapter.",
    scope: "Normalized State Shape · Entity Collections · createEntityAdapter",
    lessonCodes: ["RDX-22", "RDX-23"],
  },
  {
    id: "middleware-debugging",
    phaseNumber: 9,
    name: "Middleware & Redux DevTools",
    label: "Phase 09: Middleware & Redux DevTools",
    desc: "Understand the dispatch pipeline: How middleware intercepts actions, writing custom logger middleware, and time-travel debugging with Redux DevTools.",
    scope: "Middleware Pipeline · Custom Middleware · Redux DevTools & Time Travel",
    lessonCodes: ["RDX-24", "RDX-25"],
  },
  {
    id: "mastery",
    phaseNumber: 10,
    name: "Testing, Best Practices & Mastery",
    label: "Phase 10: Testing, Best Practices & Mastery",
    desc: "Write unit tests for pure reducers, selectors, and async thunks, avoid common anti-patterns, and evaluate when Redux is the right tool.",
    scope: "Testing Reducers & Selectors · Anti-Patterns · State Decision Checklist",
    lessonCodes: ["RDX-26"],
  },
];

export const REDUX_LESSONS: LessonMeta[] = [
  // ── PHASE 1: STATE MANAGEMENT FUNDAMENTALS ──────────────────
  {
    code: "RDX-01",
    slug: "rdx01-what-is-state-and-why-redux",
    name: "What Is State & Why Does Redux Exist?",
    phaseId: "fundamentals",
    phaseNumber: 1,
    stepNumber: 1,
    desc: "Understand what application state is, why prop drilling and multi-component synchronization break down at scale, and why Redux was created.",
    estimatedMinutes: 20,
    xpReward: 100,
    path: "/learn/redux/rdx01-what-is-state-and-why-redux",
    color: "purple",
  },
  {
    code: "RDX-02",
    slug: "rdx02-the-redux-mental-model",
    name: "The Redux Mental Model: Predictable State",
    phaseId: "fundamentals",
    phaseNumber: 1,
    stepNumber: 2,
    desc: "Learn the three foundational principles of Redux: Single source of truth, state is read-only, and state changes are made with pure functions.",
    estimatedMinutes: 25,
    xpReward: 100,
    prerequisite: "RDX-01",
    path: "/learn/redux/rdx02-the-redux-mental-model",
    color: "purple",
  },
  {
    code: "RDX-03",
    slug: "rdx03-when-to-use-and-not-use-redux",
    name: "When to Use & When NOT to Use Redux",
    phaseId: "fundamentals",
    phaseNumber: 1,
    stepNumber: 3,
    desc: "Develop state-management pragmatism: When local component state is better, why forms and modals rarely need Redux, and the 3-question evaluation checklist.",
    estimatedMinutes: 20,
    xpReward: 100,
    prerequisite: "RDX-02",
    path: "/learn/redux/rdx03-when-to-use-and-not-use-redux",
    color: "purple",
  },

  // ── PHASE 2: REDUX CORE ARCHITECTURE ────────────────────────
  {
    code: "RDX-04",
    slug: "rdx04-the-store-and-state-tree",
    name: "The Store & The Central State Tree",
    phaseId: "core-architecture",
    phaseNumber: 2,
    stepNumber: 4,
    desc: "Explore the centralized store object, how it holds the single state tree in memory, and how getState() exposes the current state snapshot.",
    estimatedMinutes: 25,
    xpReward: 100,
    prerequisite: "RDX-03",
    path: "/learn/redux/rdx04-the-store-and-state-tree",
    color: "purple",
  },
  {
    code: "RDX-05",
    slug: "rdx05-actions-and-action-creators",
    name: "Actions & Action Creators",
    phaseId: "core-architecture",
    phaseNumber: 2,
    stepNumber: 5,
    desc: "Master action objects: Why they represent 'events that happened', serialization rules, type properties, payloads, and action creator functions.",
    estimatedMinutes: 25,
    xpReward: 100,
    prerequisite: "RDX-04",
    path: "/learn/redux/rdx05-actions-and-action-creators",
    color: "purple",
  },
  {
    code: "RDX-06",
    slug: "rdx06-reducers-and-immutability",
    name: "Reducers & The Immutability Rule",
    phaseId: "core-architecture",
    phaseNumber: 2,
    stepNumber: 6,
    desc: "Understand pure reducer functions: (state, action) => newState, why reducers must never mutate state directly, and how immutability enables change detection.",
    estimatedMinutes: 30,
    xpReward: 125,
    prerequisite: "RDX-05",
    path: "/learn/redux/rdx06-reducers-and-immutability",
    color: "purple",
  },

  // ── PHASE 3: REDUX DATA FLOW & VANILLA FOUNDATIONS ──────────
  {
    code: "RDX-07",
    slug: "rdx07-one-way-data-flow",
    name: "The Unidirectional Data Flow Cycle",
    phaseId: "data-flow",
    phaseNumber: 3,
    stepNumber: 7,
    desc: "Trace data movement through Redux: User event triggers dispatch(action) -> reducer calculates new state -> store notifies subscribers -> UI re-renders.",
    estimatedMinutes: 25,
    xpReward: 100,
    prerequisite: "RDX-06",
    path: "/learn/redux/rdx07-one-way-data-flow",
    color: "purple",
  },
  {
    code: "RDX-08",
    slug: "rdx08-vanilla-redux-without-abstractions",
    name: "Vanilla Redux Without Abstractions",
    phaseId: "data-flow",
    phaseNumber: 3,
    stepNumber: 8,
    desc: "Build a working store using vanilla JavaScript functions (store, dispatch, subscribe) to clearly see what modern Redux Toolkit automates.",
    estimatedMinutes: 30,
    xpReward: 125,
    prerequisite: "RDX-07",
    path: "/learn/redux/rdx08-vanilla-redux-without-abstractions",
    color: "purple",
  },

  // ── PHASE 4: REDUX TOOLKIT (RTK) CORE ───────────────────────
  {
    code: "RDX-09",
    slug: "rdx09-why-redux-toolkit-exists",
    name: "Why Redux Toolkit Exists & configureStore",
    phaseId: "redux-toolkit",
    phaseNumber: 4,
    stepNumber: 9,
    desc: "Discover why Redux Toolkit is the official standard: Replacing manual setup with configureStore, automatic DevTools integration, and default middleware.",
    estimatedMinutes: 25,
    xpReward: 125,
    prerequisite: "RDX-08",
    path: "/learn/redux/rdx09-why-redux-toolkit-exists",
    color: "purple",
  },
  {
    code: "RDX-10",
    slug: "rdx10-createslice-and-immer",
    name: "createSlice & The Immer Mutation Model",
    phaseId: "redux-toolkit",
    phaseNumber: 4,
    stepNumber: 10,
    desc: "Combine initialState, reducers, and action types in createSlice; write intuitive 'mutating' logic that Immer safely converts to immutable copies.",
    estimatedMinutes: 30,
    xpReward: 125,
    prerequisite: "RDX-09",
    path: "/learn/redux/rdx10-createslice-and-immer",
    color: "purple",
  },
  {
    code: "RDX-11",
    slug: "rdx11-generated-action-creators-and-payloads",
    name: "Generated Action Creators & Payloads",
    phaseId: "redux-toolkit",
    phaseNumber: 4,
    stepNumber: 11,
    desc: "Access auto-generated action creators on slice.actions, type payloads with PayloadAction<T>, and customize payloads with prepare callbacks.",
    estimatedMinutes: 25,
    xpReward: 125,
    prerequisite: "RDX-10",
    path: "/learn/redux/rdx11-generated-action-creators-and-payloads",
    color: "purple",
  },
  {
    code: "RDX-12",
    slug: "rdx12-combining-slices-and-store-setup",
    name: "Combining Multiple Slices & Store Architecture",
    phaseId: "redux-toolkit",
    phaseNumber: 4,
    stepNumber: 12,
    desc: "Structure multiple feature slices (cart, auth, products) into a cohesive root reducer, export RootState and AppDispatch types, and structure store files.",
    estimatedMinutes: 30,
    xpReward: 125,
    prerequisite: "RDX-11",
    path: "/learn/redux/rdx12-combining-slices-and-store-setup",
    color: "purple",
  },

  // ── PHASE 5: REACT-REDUX INTEGRATION ────────────────────────
  {
    code: "RDX-13",
    slug: "rdx13-the-provider-component",
    name: "Connecting React to Redux with <Provider>",
    phaseId: "react-integration",
    phaseNumber: 5,
    stepNumber: 13,
    desc: "Understand how React-Redux bridges the React component tree and the Redux store using Context via the top-level <Provider store={store}>.",
    estimatedMinutes: 20,
    xpReward: 100,
    prerequisite: "RDX-12",
    path: "/learn/redux/rdx13-the-provider-component",
    color: "purple",
  },
  {
    code: "RDX-14",
    slug: "rdx14-reading-state-with-useselector",
    name: "Reading State with useSelector",
    phaseId: "react-integration",
    phaseNumber: 5,
    stepNumber: 14,
    desc: "Extract specific data slices in React components using useSelector, understand strict reference equality checks, and avoid component over-rendering.",
    estimatedMinutes: 25,
    xpReward: 125,
    prerequisite: "RDX-13",
    path: "/learn/redux/rdx14-reading-state-with-useselector",
    color: "purple",
  },
  {
    code: "RDX-15",
    slug: "rdx15-dispatching-actions-with-usedispatch",
    name: "Dispatching Actions with useDispatch",
    phaseId: "react-integration",
    phaseNumber: 5,
    stepNumber: 15,
    desc: "Dispatch slice actions directly from React event handlers using useDispatch, and configure typed hooks (useAppDispatch, useAppSelector).",
    estimatedMinutes: 25,
    xpReward: 125,
    prerequisite: "RDX-14",
    path: "/learn/redux/rdx15-dispatching-actions-with-usedispatch",
    color: "purple",
  },

  // ── PHASE 6: STATE DESIGN & SELECTORS ───────────────────────
  {
    code: "RDX-16",
    slug: "rdx16-state-design-global-vs-local",
    name: "State Design: What Belongs in Redux?",
    phaseId: "state-design",
    phaseNumber: 6,
    stepNumber: 16,
    desc: "Establish clear state boundaries: Keep server/session/cart state global in Redux while keeping dropdowns, form inputs, and hover states local in React.",
    estimatedMinutes: 25,
    xpReward: 125,
    prerequisite: "RDX-15",
    path: "/learn/redux/rdx16-state-design-global-vs-local",
    color: "purple",
  },
  {
    code: "RDX-17",
    slug: "rdx17-basic-selectors-and-derived-state",
    name: "Basic Selectors & Derived State",
    phaseId: "state-design",
    phaseNumber: 6,
    stepNumber: 17,
    desc: "Keep state minimal: Calculate derived values (e.g. cart total, filtered list length) on the fly with selector functions rather than storing duplicate variables.",
    estimatedMinutes: 25,
    xpReward: 125,
    prerequisite: "RDX-16",
    path: "/learn/redux/rdx17-basic-selectors-and-derived-state",
    color: "purple",
  },
  {
    code: "RDX-18",
    slug: "rdx18-memoized-selectors-with-createselector",
    name: "Memoized Selectors with createSelector",
    phaseId: "state-design",
    phaseNumber: 6,
    stepNumber: 18,
    desc: "Prevent unnecessary recomputations and re-renders using Reselect's createSelector: Memoization mechanics, input selectors, and cache invalidation.",
    estimatedMinutes: 30,
    xpReward: 125,
    prerequisite: "RDX-17",
    path: "/learn/redux/rdx18-memoized-selectors-with-createselector",
    color: "purple",
  },

  // ── PHASE 7: ASYNC LOGIC & SIDE EFFECTS ─────────────────────
  {
    code: "RDX-19",
    slug: "rdx19-the-thunk-pattern-for-async-logic",
    name: "The Thunk Pattern for Asynchronous Logic",
    phaseId: "async-logic",
    phaseNumber: 7,
    stepNumber: 19,
    desc: "Understand why reducers must remain strictly synchronous, how Redux Thunk middleware intercepts function dispatches with (dispatch, getState).",
    estimatedMinutes: 25,
    xpReward: 125,
    prerequisite: "RDX-18",
    path: "/learn/redux/rdx19-the-thunk-pattern-for-async-logic",
    color: "purple",
  },
  {
    code: "RDX-20",
    slug: "rdx20-createasyncthunk-lifecycle",
    name: "Handling Async Lifecycles with createAsyncThunk",
    phaseId: "async-logic",
    phaseNumber: 7,
    stepNumber: 20,
    desc: "Generate standardized async action creators with createAsyncThunk: Tracking pending, fulfilled, and rejected action types, and error handling with rejectWithValue.",
    estimatedMinutes: 30,
    xpReward: 150,
    prerequisite: "RDX-19",
    path: "/learn/redux/rdx20-createasyncthunk-lifecycle",
    color: "purple",
  },
  {
    code: "RDX-21",
    slug: "rdx21-extrareducers-and-the-builder-callback",
    name: "Managing Async State with extraReducers",
    phaseId: "async-logic",
    phaseNumber: 7,
    stepNumber: 21,
    desc: "Handle external async actions inside createSlice using the builder callback: Managing status ('idle' | 'loading' | 'succeeded' | 'failed') and error messages.",
    estimatedMinutes: 30,
    xpReward: 150,
    prerequisite: "RDX-20",
    path: "/learn/redux/rdx21-extrareducers-and-the-builder-callback",
    color: "purple",
  },

  // ── PHASE 8: NORMALIZATION & STATE MODELING ─────────────────
  {
    code: "RDX-22",
    slug: "rdx22-normalizing-state-shape",
    name: "Normalizing Complex Relational State",
    phaseId: "normalization",
    phaseNumber: 8,
    stepNumber: 22,
    desc: "Flatten deeply nested arrays into indexed lookup tables ({ ids: [], entities: {} }), eliminating item duplication and painful multi-level immutable updates.",
    estimatedMinutes: 30,
    xpReward: 125,
    prerequisite: "RDX-21",
    path: "/learn/redux/rdx22-normalizing-state-shape",
    color: "purple",
  },
  {
    code: "RDX-23",
    slug: "rdx23-createentityadapter",
    name: "Managing Collections with createEntityAdapter",
    phaseId: "normalization",
    phaseNumber: 8,
    stepNumber: 23,
    desc: "Leverage Redux Toolkit's createEntityAdapter for turnkey normalized CRUD operations: addOne, setAll, updateOne, removeOne, and pre-generated entity selectors.",
    estimatedMinutes: 30,
    xpReward: 150,
    prerequisite: "RDX-22",
    path: "/learn/redux/rdx23-createentityadapter",
    color: "purple",
  },

  // ── PHASE 9: MIDDLEWARE & REDUX DEVTOOLS ────────────────────
  {
    code: "RDX-24",
    slug: "rdx24-redux-middleware-pipeline",
    name: "The Redux Middleware Pipeline",
    phaseId: "middleware-debugging",
    phaseNumber: 9,
    stepNumber: 24,
    desc: "Inspect how dispatch pipeline works under the hood: The curried middleware signature (store => next => action), dispatch interception, and custom logging middleware.",
    estimatedMinutes: 25,
    xpReward: 125,
    prerequisite: "RDX-23",
    path: "/learn/redux/rdx24-redux-middleware-pipeline",
    color: "purple",
  },
  {
    code: "RDX-25",
    slug: "rdx25-redux-devtools-and-time-travel",
    name: "Redux DevTools & Time-Travel Debugging",
    phaseId: "middleware-debugging",
    phaseNumber: 9,
    stepNumber: 25,
    desc: "Diagnose application state bugs visually: Inspecting action log histories, state tree diffs, dispatching test actions, and time-traveling across state snapshots.",
    estimatedMinutes: 25,
    xpReward: 125,
    prerequisite: "RDX-24",
    path: "/learn/redux/rdx25-redux-devtools-and-time-travel",
    color: "purple",
  },

  // ── PHASE 10: TESTING, BEST PRACTICES & MASTERY ─────────────
  {
    code: "RDX-26",
    slug: "rdx26-testing-best-practices-and-anti-patterns",
    name: "Testing, Best Practices & Anti-Patterns",
    phaseId: "mastery",
    phaseNumber: 10,
    stepNumber: 26,
    desc: "Test pure reducers, memoized selectors, and async thunks cleanly; avoid non-serializable values in state, and master the production state architecture checklist.",
    estimatedMinutes: 30,
    xpReward: 150,
    prerequisite: "RDX-25",
    path: "/learn/redux/rdx26-testing-best-practices-and-anti-patterns",
    color: "purple",
  },
];

export const REDUX_PREREQUISITES: PrerequisiteItem[] = [
  {
    id: "basic-javascript",
    title: "JavaScript ES6+ & Immutability",
    badge: "Core",
    category: "required",
    icon: "💛",
    desc: "Arrow functions, object/array destructuring, spread syntax (...), array methods (map, filter, reduce), and pure functions.",
    path: "/learn/javascript",
  },
  {
    id: "react-fundamentals",
    title: "React Components & State",
    badge: "Component UI",
    category: "required",
    icon: "⚛️",
    desc: "Understanding that React renders UI based on props and state, component trees, and why prop drilling becomes tedious across deep trees.",
    path: "/learn/react",
  },
  {
    id: "immutable-data",
    title: "Object Reference Equality",
    badge: "Mental Model",
    category: "recommended",
    icon: "🧩",
    desc: "Understanding how JavaScript checks object references (===) and why mutating objects in place hides changes from React re-renders.",
    path: "/learn/typescript",
  },
];

export const REDUX_CAPSTONE: CapstoneProjectMeta = {
  id: "capstone-storeflow-engine",
  stageNumber: 11,
  slug: "storeflow-engine",
  title: "StoreFlow — Enterprise State Management Engine",
  subtitle: "Production Redux Toolkit Store, Multiple Slices, Async Checkout Thunks & Memoized Selectors",
  desc: "Design and implement a complete, production-grade Redux Toolkit state architecture for an enterprise e-commerce platform. Structure modular slices (Cart, User, Products, and Filter), implement derived price/tax calculations with memoized createSelector, handle asynchronous inventory reservation with createAsyncThunk lifecycle states, configure typed hooks, and inspect state transitions using Redux DevTools.",
  path: "/learn/redux/projects/storeflow-engine",
  badge: "🔄 Capstone",
  xpReward: 500,
  estimatedMinutes: 90,
  keyFeatures: [
    "Modular Redux Toolkit store with configureStore and multiple domain slices",
    "Cart slice with Immer-powered add, quantity update, item removal, and clear actions",
    "Memoized Reselect selectors computing subtotal, discount, tax, and item counts",
    "Asynchronous checkout thunk with createAsyncThunk handling pending, fulfilled, and rejected states",
    "Typed Redux hooks (useAppDispatch and useAppSelector) for seamless React integration",
    "Clean state boundaries separating global application state from local UI component state",
  ],
};

export interface StageMeta {
  id: string;
  stageNumber: number;
  name: string;
  subtitle: string;
  milestone?: string;
  description: string;
  theme?: {
    badge: string;
    dot: string;
    border: string;
    bgSubtle: string;
    textAccent: string;
  };
  lessons: LessonMeta[];
  capstone?: CapstoneProjectMeta;
}

export const REDUX_STAGES: StageMeta[] = REDUX_PROGRESSION_PHASES.map((phase) => ({
  id: phase.id,
  stageNumber: phase.phaseNumber,
  name: phase.name,
  subtitle: phase.scope,
  description: phase.desc,
  theme: {
    badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    dot: "bg-purple-400",
    border: "border-purple-500/30",
    bgSubtle: "bg-purple-500/[0.03]",
    textAccent: "text-purple-400",
  },
  lessons: REDUX_LESSONS.filter((l) => l.phaseId === phase.id),
  capstone: phase.phaseNumber === 10 ? REDUX_CAPSTONE : undefined,
}));

export const REDUX_RELATED_TOPICS = [
  {
    id: "rel-react",
    title: "React.js",
    desc: "Master component architecture, props, local state hooks, and component lifecycle that interface with Redux.",
    badge: "Frontend",
    path: "/learn/react",
  },
  {
    id: "rel-nextjs",
    title: "Next.js",
    desc: "Learn Server Components vs Client Components and where centralized client state management fits into modern hybrid apps.",
    badge: "Framework",
    path: "/learn/nextjs",
  },
  {
    id: "rel-typescript",
    title: "TypeScript",
    desc: "Deepen static type guarantees with RootState, AppDispatch, and typed action payloads across your frontend code.",
    badge: "Language",
    path: "/learn/typescript",
  },
];

export function getAllLessons(): LessonMeta[] {
  return REDUX_LESSONS;
}

export function getLessonBySlug(slug: string): LessonMeta | undefined {
  return REDUX_LESSONS.find((l) => l.slug === slug);
}

export function getLessonByCode(code: string): LessonMeta | undefined {
  return REDUX_LESSONS.find((l) => l.code === code);
}

export function getLessonsByPhaseId(phaseId: string): LessonMeta[] {
  return REDUX_LESSONS.filter((l) => l.phaseId === phaseId);
}

export function getNextLesson(currentSlug: string): LessonMeta | null {
  const index = REDUX_LESSONS.findIndex((l) => l.slug === currentSlug);
  if (index >= 0 && index < REDUX_LESSONS.length - 1) {
    return REDUX_LESSONS[index + 1];
  }
  return null;
}

export function getPrevLesson(currentSlug: string): LessonMeta | null {
  const index = REDUX_LESSONS.findIndex((l) => l.slug === currentSlug);
  if (index > 0) {
    return REDUX_LESSONS[index - 1];
  }
  return null;
}

export function getStageByLessonSlug(slug: string): StageMeta | undefined {
  const lesson = getLessonBySlug(slug);
  if (!lesson) return undefined;
  return REDUX_STAGES.find((s) => s.id === lesson.phaseId);
}
