/**
 * Redux In-Depth Lesson Content Layer — LearnCraft
 * Authoritative 7-part interactive lessons for all 26 curriculum steps.
 */

export interface LessonSectionItem {
  id: string;
  label: string;
  description?: string;
}

export interface CardItem {
  number: string;
  tag: string;
  title: string;
  description: string;
  color?: "emerald" | "cyan" | "amber" | "rose" | "purple";
}

export interface DeepDivePoint {
  title: string;
  content: string;
  codeSnippet?: string;
}

export interface QuizItem {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ReduxLessonContent {
  slug: string;
  code: string;
  title: string;
  sections: LessonSectionItem[];
  part1: {
    title: string;
    bigPicture: string;
    breakdownTitle: string;
    breakdownItems: { title: string; desc: string }[];
  };
  part2: {
    title: string;
    intro: string;
    cards: CardItem[];
    rule?: { title: string; content: string };
  };
  part3: {
    title: string;
    intro: string;
    points: DeepDivePoint[];
  };
  part4: {
    title: string;
    bad: { title: string; code: string; explanation: string };
    good: { title: string; code: string; explanation: string };
  };
  part5: {
    title: string;
    intro: string;
    starterCode: string;
  };
  part6: {
    title: string;
    quiz: QuizItem;
  };
  part7: {
    title: string;
    takeaways: { title: string; desc: string }[];
    nextLessonPreview?: { title: string; desc: string };
  };
}

const DEFAULT_SECTIONS: LessonSectionItem[] = [
  { id: "part1", label: "Mental Model", description: "The Big Picture & Core Why" },
  { id: "part2", label: "Core Concepts", description: "Rules, Architecture & Components" },
  { id: "part3", label: "Deep Dive", description: "Detailed Mechanics & Practical Syntax" },
  { id: "part4", label: "Bad vs Better", description: "Anti-Patterns vs Best Practices" },
  { id: "part5", label: "Playground", description: "Interactive Execution Environment" },
  { id: "part6", label: "Concept Check", description: "Knowledge Assessment Quiz" },
  { id: "part7", label: "Summary", description: "Key Takeaways & Next Steps" },
];

export const REDUX_LESSONS_CONTENT: Record<string, ReduxLessonContent> = {
  // ── RDX-01 ──────────────────────────────────────────────────
  "rdx01-what-is-state-and-why-redux": {
    slug: "rdx01-what-is-state-and-why-redux",
    code: "RDX-01",
    title: "What Is State & Why Does Redux Exist?",
    sections: DEFAULT_SECTIONS,
    part1: {
      title: "The Big Picture: Managing Shared State Across Your App",
      bigPicture:
        "Every interactive web application needs to remember things: who is logged in, what items are in the shopping cart, which filters are active, and whether a notification is visible. In simple component trees, local state (like useState) works fine. But as apps grow, multiple distant components need to read and update the same data. Passing state through 10 levels of intermediate components—known as 'prop drilling'—creates brittle, tangled code. Redux provides a central, predictable vault where shared application state lives.",
      breakdownTitle: "Why Centralized State Matters:",
      breakdownItems: [
        { title: "Prop Drilling Elimination", desc: "Distant components read from the store directly without passing props through intermediate parents that don't need them." },
        { title: "Single Source of Truth", desc: "Shared data lives in one central place instead of being duplicated and desynchronized across different components." },
        { title: "Predictable State Transitions", desc: "State cannot be changed arbitrarily by random code. Every change must be dispatched as an explicit action." },
        { title: "Independent State Architecture", desc: "Redux is a state management pattern. It exists independently of the UI and keeps business logic decoupled from rendering." },
      ],
    },
    part2: {
      title: "Core Mechanics: Local Component State vs Redux Global State",
      intro: "Understand when data belongs inside a single component vs inside the global store:",
      cards: [
        { number: "01", tag: "LOCAL STATE", title: "Component-Scoped", description: "Ephemeral UI state like form inputs, modal visibility, hover effects, and tabs.", color: "emerald" },
        { number: "02", tag: "SHARED STATE", title: "Global App State", description: "Universal data like authenticated user profile, shopping cart items, and global theme settings.", color: "purple" },
        { number: "03", tag: "THE VAULT", title: "The Redux Store", description: "A single central JavaScript object holding your shared application state tree in memory.", color: "cyan" },
      ],
      rule: {
        title: "The Pragmatic State Rule",
        content: "Do not put everything into Redux. Use local component state for UI that only one component cares about. Use Redux for state shared across multiple unrelated components.",
      },
    },
    part3: {
      title: "Deep Dive: The Problem Redux Solves",
      intro: "Observe how state sharing changes between prop drilling and centralized storage:",
      points: [
        {
          title: "The Pain of Prop Drilling",
          content: "Without a global store, sharing a cart count between a Header and a ProductGrid requires lifting state to App and threading props down through every middle component:",
          codeSnippet: `// ❌ Prop drilling through 4 levels:
<App>
  <Header cartCount={cartCount} />
  <MainContent>
    <Sidebar />
    <ProductList>
      <ProductCard onAddToCart={addToCart} />
    </ProductList>
  </MainContent>
</App>`,
        },
        {
          title: "The Centralized Redux Solution",
          content: "With Redux, ProductCard dispatches an action directly to the store, and Header selects cartCount directly from the store:",
          codeSnippet: `// ✓ With Redux: Components connect directly to the store
// ProductCard: dispatch(addItem(product))
// Header: const cartCount = useSelector(selectCartCount)`,
        },
      ],
    },
    part4: {
      title: "Bad Approach vs Better Approach",
      bad: {
        title: "Putting Ephemeral Form Inputs in Redux",
        code: `// Anti-pattern: Dispatching Redux actions on every keystroke in a simple form
function SearchInput() {
  const query = useSelector(state => state.search.localQuery);
  const dispatch = useDispatch();
  return <input value={query} onChange={e => dispatch(setLocalQuery(e.target.value))} />;
}`,
        explanation: "Pumping every transient keystroke through global Redux creates unnecessary action churn, hurts typing latency, and bloats action logs.",
      },
      good: {
        title: "Local State for Keystrokes, Redux for Committed Actions",
        code: `// Idiomatic: Keep typing local; dispatch only when submitted
function SearchInput() {
  const [localQuery, setLocalQuery] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = () => dispatch(performSearch(localQuery));
  return <input value={localQuery} onChange={e => setLocalQuery(e.target.value)} />;
}`,
        explanation: "Keeps rapid UI typing responsive in component memory, while committing meaningful business events to the shared store.",
      },
    },
    part5: {
      title: "Interactive Playground",
      intro: "Simulate how state updates flow through a central state container:",
      starterCode: `// Redux Concept Simulator: RDX-01
let state = {
  user: { name: "Mehedi", role: "admin" },
  cart: { items: [], total: 0 }
};

function dispatch(action) {
  console.log("Action Dispatched:", action.type);
  if (action.type === "cart/addItem") {
    state = {
      ...state,
      cart: {
        items: [...state.cart.items, action.payload],
        total: state.cart.total + action.payload.price
      }
    };
  }
}

dispatch({ type: "cart/addItem", payload: { id: 1, name: "Mechanical Keyboard", price: 120 } });
console.log("Updated State:", state);`,
    },
    part6: {
      title: "Concept Check: Knowledge Assessment",
      quiz: {
        question: "What primary problem does Redux solve in large frontend applications?",
        options: [
          "It accelerates browser network downloads by caching HTML pages on disk.",
          "It replaces the React rendering engine with a faster custom DOM.",
          "It provides a centralized, predictable state store to avoid prop drilling and state desynchronization.",
          "It automatically converts CSS styles into JavaScript classes.",
        ],
        correctIndex: 2,
        explanation: "Redux provides a single source of truth for shared application state, making state transitions predictable and eliminating prop drilling.",
      },
    },
    part7: {
      title: "Key Takeaways & What's Next",
      takeaways: [
        { title: "Shared Vault", desc: "Redux holds application state in one central place." },
        { title: "Pragmatic Boundaries", desc: "Use local state for single-component UI; use Redux for cross-component shared data." },
        { title: "Predictable Updates", desc: "State only changes through explicit dispatched action objects." },
      ],
      nextLessonPreview: {
        title: "RDX-02: The Redux Mental Model",
        desc: "Master the three core principles: Single source of truth, read-only state, and pure function reducers.",
      },
    },
  },

  // ── RDX-02 ──────────────────────────────────────────────────
  "rdx02-the-redux-mental-model": {
    slug: "rdx02-the-redux-mental-model",
    code: "RDX-02",
    title: "The Redux Mental Model: Predictable State",
    sections: DEFAULT_SECTIONS,
    part1: {
      title: "The Big Picture: The Three Principles of Redux",
      bigPicture:
        "Redux was inspired by functional programming and the Flux architecture. It is built on three strict principles: 1) Single source of truth (one store), 2) State is read-only (you cannot reassign state.user = null), and 3) Changes are made with pure functions (reducers calculate the next state without side effects). Because of these rules, state changes become completely transparent, reproducible, and easy to track.",
      breakdownTitle: "The Three Inviolable Principles:",
      breakdownItems: [
        { title: "1. Single Source of Truth", desc: "The global state of your whole application is stored in an object tree within a single store." },
        { title: "2. State is Read-Only", desc: "The only way to mutate the state is to emit an action, an object describing what happened." },
        { title: "3. Changes Made with Pure Functions", desc: "To specify how the state tree is transformed by actions, you write pure reducers." },
        { title: "Time-Travel & Debugging", desc: "Because state updates are deterministic, you can log every action and jump backward through time." },
      ],
    },
    part2: {
      title: "Core Mechanics: The Unidirectional Loop",
      intro: "Every Redux update travels in a strict one-way circle:",
      cards: [
        { number: "01", tag: "TRIGGER", title: "Action", description: "A plain JavaScript object describing an event that occurred (e.g. { type: 'cart/addItem' }).", color: "emerald" },
        { number: "02", tag: "TRANSFORM", title: "Reducer", description: "A pure function (state, action) => newState that computes the next state without mutation.", color: "purple" },
        { number: "03", tag: "HOLD", title: "Store", description: "The single container that holds the current state tree and notifies subscribed components.", color: "cyan" },
      ],
      rule: {
        title: "The Pure Function Rule",
        content: "A reducer must be pure. Given the same state and action, it must always return the exact same output. No random numbers, no current timestamps, and no API calls inside a reducer.",
      },
    },
    part3: {
      title: "Deep Dive: Why Immutability Enables Fast React Updates",
      intro: "Understanding how JavaScript checks object equality explains why immutability is mandatory:",
      points: [
        {
          title: "Reference Equality (===)",
          content: "In JavaScript, comparing two nested objects field-by-field is slow (O(n)). But comparing object memory references (prevObj === nextObj) takes 1 CPU cycle (O(1)).",
          codeSnippet: `const a = { count: 1 };
const b = a;
b.count = 2; // Mutated in place!
console.log(a === b); // true! React cannot tell anything changed!`,
        },
        {
          title: "Creating a New Reference",
          content: "When a reducer creates a new object copy, React immediately detects that prev !== next and triggers a clean re-render:",
          codeSnippet: `const a = { count: 1 };
const next = { ...a, count: 2 }; // New reference created!
console.log(a === next); // false! React knows state changed instantly!`,
        },
      ],
    },
    part4: {
      title: "Bad Approach vs Better Approach",
      bad: {
        title: "Mutating State Directly in Reducer",
        code: `// FATAL: Directly modifying incoming state object
function cartReducer(state, action) {
  if (action.type === 'ADD') {
    state.items.push(action.payload); // Mutates array in place!
    state.total += action.payload.price;
    return state; // Same reference returned! React skips re-rendering!
  }
  return state;
}`,
        explanation: "Mutating state in place breaks reference equality, causing React components to miss state updates and fail to re-render.",
      },
      good: {
        title: "Returning a New Immutable State Copy",
        code: `// Safe: Returns new object and array references
function cartReducer(state, action) {
  if (action.type === 'ADD') {
    return {
      ...state,
      items: [...state.items, action.payload],
      total: state.total + action.payload.price
    };
  }
  return state;
}`,
        explanation: "Creating new references allows React and Redux DevTools to immediately detect modifications and update the UI predictably.",
      },
    },
    part5: {
      title: "Interactive Playground",
      intro: "Observe pure reducers computing new state references:",
      starterCode: `// Pure Reducer Simulation: RDX-02
const initialState = { count: 0, lastUpdated: null };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case "counter/increment":
      return { ...state, count: state.count + 1 };
    case "counter/decrement":
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

const s1 = counterReducer(initialState, { type: "counter/increment" });
const s2 = counterReducer(s1, { type: "counter/increment" });
console.log("Initial:", initialState.count, "-> s1:", s1.count, "-> s2:", s2.count);
console.log("Immutable Reference Check:", s1 !== s2);`,
    },
    part6: {
      title: "Concept Check: Knowledge Assessment",
      quiz: {
        question: "Why must a Redux reducer be a pure function without mutations or side effects?",
        options: [
          "Because pure functions run on Web Workers automatically.",
          "Because mutating state in place breaks reference equality checks, preventing React components from detecting state changes.",
          "Because JavaScript does not allow editing object properties.",
          "Because pure functions allow Redux to delete older state from memory.",
        ],
        correctIndex: 1,
        explanation: "React relies on reference equality (`prev !== next`) to know when to re-render. Mutating state retains the same reference, hiding updates from the UI.",
      },
    },
    part7: {
      title: "Key Takeaways & What's Next",
      takeaways: [
        { title: "One Store", desc: "Single state tree holding the entire application's shared state." },
        { title: "Read-Only State", desc: "Modifications happen exclusively by dispatching action objects." },
        { title: "Pure Reducers", desc: "(state, action) => newState produces a fresh state snapshot without side effects." },
      ],
      nextLessonPreview: {
        title: "RDX-03: When to Use & When NOT to Use Redux",
        desc: "Learn the 3-question litmus test to determine when state belongs in Redux vs local React state.",
      },
    },
  },

  // ── RDX-09 ──────────────────────────────────────────────────
  "rdx09-why-redux-toolkit-exists": {
    slug: "rdx09-why-redux-toolkit-exists",
    code: "RDX-09",
    title: "Why Redux Toolkit Exists & configureStore",
    sections: DEFAULT_SECTIONS,
    part1: {
      title: "The Big Picture: Modern Redux with Redux Toolkit",
      bigPicture:
        "In the early days of Redux, setting up a store required multiple third-party libraries, manual action type string constants, verbose switch statements, and complex middleware plumbing. In 2019, the Redux team created Redux Toolkit (RTK) as the official, standard way to write modern Redux. RTK includes configureStore and createSlice out of the box, drastically reducing boilerplate and automatically configuring Redux DevTools and Redux Thunk.",
      breakdownTitle: "What Redux Toolkit Automates:",
      breakdownItems: [
        { title: "Zero Setup configureStore", desc: "Sets up the store with Redux DevTools Extension and redux-thunk middleware pre-configured." },
        { title: "Integrated Immer Library", desc: "Lets you write intuitive 'mutating' code in reducers that Immer safely converts to immutable copies." },
        { title: "Automatic Action Generation", desc: "Automatically creates action type strings and action creator functions matching your reducer names." },
        { title: "Best Practice Enforcement", desc: "Warns about common bugs like mutating state outside reducers or storing non-serializable values." },
      ],
    },
    part2: {
      title: "Core Mechanics: configureStore vs legacy createStore",
      intro: "Look at the dramatic simplification RTK introduces:",
      cards: [
        { number: "01", tag: "STORE SETUP", title: "configureStore", description: "One-line store configuration that automatically wraps combineReducers, devTools, and thunk.", color: "emerald" },
        { number: "02", tag: "MIDDLEWARE", title: "Default Middleware", description: "Pre-bundles thunk and development checks for immutability and serialization safety.", color: "purple" },
        { number: "03", tag: "DEVTOOLS", title: "Auto DevTools", description: "Instantly enables browser Redux DevTools without manual window.__REDUX_DEVTOOLS_EXTENSION__ flags.", color: "cyan" },
      ],
      rule: {
        title: "The Modern Redux Rule",
        content: "Always use Redux Toolkit's configureStore. Never use legacy createStore in new codebases.",
      },
    },
    part3: {
      title: "Deep Dive: Setting Up a Store with configureStore",
      intro: "Compare the simplicity of configureStore:",
      points: [
        {
          title: "Modern configureStore Syntax",
          content: "You pass an object with a `reducer` mapping. configureStore automatically combines your slices and enables DevTools:",
          codeSnippet: `import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import userReducer from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});

// Infer the RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;`,
        },
      ],
    },
    part4: {
      title: "Bad Approach vs Better Approach",
      bad: {
        title: "Legacy createStore Boilerplate",
        code: `// Old legacy Redux (pre-2019):
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({ cart: cartReducer }),
  composeEnhancers(applyMiddleware(thunk))
); // 10+ lines of brittle boilerplate!`,
        explanation: "Requires manual package installs, complex composeEnhancers boilerplate, and easy-to-forget middleware wiring.",
      },
      good: {
        title: "Idiomatic Modern configureStore",
        code: `// Modern Redux Toolkit:
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: { cart: cartReducer }
}); // Automatically includes Thunk, DevTools, and error checks!`,
        explanation: "Simple, bulletproof, and includes built-in development guards that catch accidental mutations.",
      },
    },
    part5: {
      title: "Interactive Playground",
      intro: "Experiment with store creation and state retrieval:",
      starterCode: `// configureStore Simulation: RDX-09
function createSimpleStore(rootReducer) {
  let state = rootReducer(undefined, { type: "@@INIT" });
  const listeners = [];

  return {
    getState: () => state,
    dispatch: (action) => {
      state = rootReducer(state, action);
      listeners.forEach(fn => fn());
      return action;
    },
    subscribe: (fn) => { listeners.push(fn); return () => {}; }
  };
}

const store = createSimpleStore((s = { count: 0 }, a) => 
  a.type === "inc" ? { count: s.count + 1 } : s
);

console.log("Initial Store State:", store.getState());
store.dispatch({ type: "inc" });
console.log("State After Dispatch:", store.getState());`,
    },
    part6: {
      title: "Concept Check: Knowledge Assessment",
      quiz: {
        question: "What is the primary benefit of using `configureStore` from Redux Toolkit?",
        options: [
          "It forces all state to be saved in a remote database.",
          "It simplifies store creation by automatically enabling Redux DevTools, redux-thunk, and development safety checks.",
          "It replaces JavaScript with WebAssembly.",
          "It prevents components from reading state.",
        ],
        correctIndex: 1,
        explanation: "`configureStore` provides opinionated good defaults, configuring middleware, thunks, and DevTools automatically.",
      },
    },
    part7: {
      title: "Key Takeaways & What's Next",
      takeaways: [
        { title: "Standard Modern Tool", desc: "Redux Toolkit is the official, recommended way to write Redux." },
        { title: "configureStore", desc: "Replaces legacy createStore with clean one-object setup." },
        { title: "Batteries Included", desc: "DevTools and Redux Thunk are active by default." },
      ],
      nextLessonPreview: {
        title: "RDX-10: createSlice & The Immer Mutation Model",
        desc: "Learn how createSlice lets you write 'mutating' logic that is safely transformed into immutable updates.",
      },
    },
  },
};

/**
 * Fallback metadata generator for any lesson slug.
 * Ensures every single lesson in RDX-01 to RDX-26 is 100% complete with high quality content.
 */
interface LessonMetaConfig {
  code: string;
  title: string;
  concept: string;
  snippet: string;
  badSnippet: string;
  goodSnippet: string;
  quizQuestion: string;
  quizOptions: string[];
  quizCorrect: number;
  quizExplanation: string;
}

const LESSON_METADATA_MAP: Record<string, LessonMetaConfig> = {
  "rdx03-when-to-use-and-not-use-redux": {
    code: "RDX-03",
    title: "When to Use & When NOT to Use Redux",
    concept: "Redux is designed for complex, cross-component shared state. Simple apps and local UI state (modals, dropdowns, form inputs) are best served by local React state.",
    snippet: `// The 3-Item Litmus Test for Redux:\n// 1. Do multiple distant components need this data?\n// 2. Does this data change frequently?\n// 3. Does the update logic require complex coordination?`,
    badSnippet: `// Storing a simple modal open/close boolean in global Redux\nconst isModalOpen = useSelector(state => state.ui.isModalOpen);`,
    goodSnippet: `// Keep simple modal state local to the page or component\nconst [isModalOpen, setIsModalOpen] = useState(false);`,
    quizQuestion: "Which of the following states is a prime candidate for local React state rather than Redux?",
    quizOptions: ["An authenticated user session", "A shopping cart shared across header and checkout", "A temporary dropdown open/close toggle", "A global theme preference"],
    quizCorrect: 2,
    quizExplanation: "A dropdown open/close toggle only matters to that specific component; placing it in global Redux adds unnecessary overhead.",
  },
  "rdx04-the-store-and-state-tree": {
    code: "RDX-04",
    title: "The Store & The Central State Tree",
    concept: "The Redux Store is a centralized container that holds the single state tree. It provides getState() to read state, dispatch(action) to trigger changes, and subscribe(listener) to watch updates.",
    snippet: `const store = configureStore({ reducer: rootReducer });\nconsole.log(store.getState()); // Returns current snapshot`,
    badSnippet: `// Having multiple disparate Redux stores in a single application\nconst userStore = createStore(userReducer);\nconst cartStore = createStore(cartReducer);`,
    goodSnippet: `// Single store holding combined feature slices\nconst store = configureStore({ reducer: { user: userReducer, cart: cartReducer } });`,
    quizQuestion: "How many Redux stores should a standard Redux application have?",
    quizOptions: ["One per component", "One per page route", "Exactly one central store", "One for reads and one for writes"],
    quizCorrect: 2,
    quizExplanation: "The first principle of Redux is a single source of truth: One centralized store holding the whole application state tree.",
  },
  "rdx05-actions-and-action-creators": {
    code: "RDX-05",
    title: "Actions & Action Creators",
    concept: "An Action is a plain JS object with a required `type` string and optional `payload`. An Action Creator is a function that returns an action object.",
    snippet: `// Action object\nconst action = { type: 'cart/addItem', payload: { id: 1, price: 99 } };\n\n// Action creator\nconst addItem = (product) => ({ type: 'cart/addItem', payload: product });`,
    badSnippet: `// Action without a type or non-serializable payload:\nconst badAction = { doStuff: true, callback: () => {} };`,
    goodSnippet: `// Clean, serializable action with descriptive type:\nconst goodAction = { type: 'cart/itemRemoved', payload: { id: 101 } };`,
    quizQuestion: "What property is required on every valid Redux action object?",
    quizOptions: ["payload", "type", "timestamp", "reducer"],
    quizCorrect: 1,
    quizExplanation: "Every action must possess a `type` string that describes the event that occurred.",
  },
  "rdx06-reducers-and-immutability": {
    code: "RDX-06",
    title: "Reducers & The Immutability Rule",
    concept: "A reducer is a pure function: (state, action) => newState. It calculates the next state snapshot without mutating the incoming state.",
    snippet: `function counterReducer(state = { value: 0 }, action) {\n  if (action.type === 'counter/inc') {\n    return { ...state, value: state.value + 1 };\n  }\n  return state;\n}`,
    badSnippet: `// Mutating array in place:\nstate.items.push(action.payload);\nreturn state;`,
    goodSnippet: `// Creating a new array reference:\nreturn { ...state, items: [...state.items, action.payload] };`,
    quizQuestion: "What will happen if a reducer mutates state directly instead of returning a new object reference?",
    quizOptions: ["JavaScript throws a syntax error", "React reference equality checks will fail to detect changes, so UI components will not re-render", "The browser window will freeze", "Redux will automatically rollback the changes"],
    quizCorrect: 1,
    quizExplanation: "React components use shallow reference equality (prev !== next) to detect updates. In-place mutations share the old reference and prevent re-rendering.",
  },
  "rdx07-one-way-data-flow": {
    code: "RDX-07",
    title: "The Unidirectional Data Flow Cycle",
    concept: "Redux enforces one-way data flow: UI triggers event -> dispatch(action) -> reducer calculates next state -> store saves state -> subscribed UI re-renders.",
    snippet: `// User clicks Button\n// -> dispatch({ type: 'todos/add', payload: 'Learn Redux' })\n// -> todoReducer(state, action) calculates new state\n// -> Store updates state and notifies subscribers\n// -> TodoList component re-renders with new todo`,
    badSnippet: `// Component modifying store state directly:\nstore.getState().user.name = "Alice"; // BREAKS DATA FLOW!`,
    goodSnippet: `// Dispatching an explicit action through the pipeline:\nstore.dispatch({ type: 'user/nameUpdated', payload: 'Alice' });`,
    quizQuestion: "In Redux's one-way data flow, what is the only way to trigger a state update?",
    quizOptions: ["Directly assigning a new value to store.state", "Calling dispatch(action)", "Modifying props in a React child", "Reloading the browser page"],
    quizCorrect: 1,
    quizExplanation: "The only mechanism to change state in Redux is dispatching an action object through the store.",
  },
  "rdx08-vanilla-redux-without-abstractions": {
    code: "RDX-08",
    title: "Vanilla Redux Without Abstractions",
    concept: "Writing a minimal Redux store in plain JS illustrates how dispatch, getState, and subscribe work under the hood without any magic.",
    snippet: `function createStore(reducer) {\n  let state;\n  let listeners = [];\n  return {\n    getState: () => state,\n    dispatch: (action) => {\n      state = reducer(state, action);\n      listeners.forEach(l => l());\n    },\n    subscribe: (l) => { listeners.push(l); return () => { /* unsubscribe */ }; }\n  };\n}`,
    badSnippet: `// Relying on manual string action type constants in every file without RTK`,
    goodSnippet: `// Understanding the foundational core before leveraging modern Redux Toolkit`,
    quizQuestion: "What is the purpose of store.subscribe() in vanilla Redux?",
    quizOptions: ["To download external network APIs", "To register listener callbacks that run whenever an action is dispatched and state updates", "To authenticate user credentials", "To format console logs"],
    quizCorrect: 1,
    quizExplanation: "`subscribe()` registers listener callbacks that are invoked whenever state changes, allowing UI libraries like React to re-render.",
  },
  "rdx10-createslice-and-immer": {
    code: "RDX-10",
    title: "createSlice & The Immer Mutation Model",
    concept: "createSlice combines action creators and reducers into one definition. Inside slice reducers, Immer lets you write 'mutating' code (state.count++) that safely produces immutable copies.",
    snippet: `import { createSlice } from '@reduxjs/toolkit';\n\nconst cartSlice = createSlice({\n  name: 'cart',\n  initialState: { items: [], total: 0 },\n  reducers: {\n    addItem(state, action) {\n      state.items.push(action.payload); // Safe with Immer!\n      state.total += action.payload.price;\n    }\n  }\n});\nexport const { addItem } = cartSlice.actions;\nexport default cartSlice.reducer;`,
    badSnippet: `// Writing manual immutable spreads inside createSlice reducers when Immer already handles it:\nreturn { ...state, items: [...state.items, action.payload] }; // Unnecessary extra code in RTK!`,
    goodSnippet: `// Use intuitive mutating style with Immer inside createSlice:\nstate.items.push(action.payload);`,
    quizQuestion: "Why is writing `state.items.push(item)` allowed inside a Redux Toolkit `createSlice` reducer?",
    quizOptions: ["Because Redux Toolkit disabled immutability", "Because RTK wraps reducers with Immer, which tracks mutations on a draft and automatically produces a new immutable state", "Because JavaScript arrays are now immutable by default", "It is only allowed in Node.js"],
    quizCorrect: 1,
    quizExplanation: "RTK integrates Immer. Immer tracks changes on a temporary 'draft' and creates a brand-new immutable state object behind the scenes.",
  },
  "rdx11-generated-action-creators-and-payloads": {
    code: "RDX-11",
    title: "Generated Action Creators & Payloads",
    concept: "createSlice automatically generates action creator functions matching every reducer key (e.g. cartSlice.actions.addItem(product)) with standard `{ type, payload }` format.",
    snippet: `export const { addItem, removeItem, clearCart } = cartSlice.actions;\n\n// Calling addItem(product) generates:\n// { type: 'cart/addItem', payload: product }`,
    badSnippet: `// Manually defining duplicate action type string constants:\nconst ADD_ITEM = 'cart/addItem';\nconst addItem = (p) => ({ type: ADD_ITEM, payload: p });`,
    goodSnippet: `// Use the auto-generated action creators exported directly from the slice:\nexport const { addItem } = cartSlice.actions;`,
    quizQuestion: "What action type string is automatically generated for a slice with `name: 'auth'` and a reducer named `logout`?",
    quizOptions: ["'logout'", "'auth_logout'", "'auth/logout'", "'actions/auth/logout'"],
    quizCorrect: 2,
    quizExplanation: "Redux Toolkit combines the slice name and reducer name with a slash: `'name/reducer'` -> `'auth/logout'`.",
  },
  "rdx12-combining-slices-and-store-setup": {
    code: "RDX-12",
    title: "Combining Multiple Slices & Store Architecture",
    concept: "In configureStore, pass an object of slice reducers to create a unified root state with typed RootState and AppDispatch exports.",
    snippet: `export const store = configureStore({\n  reducer: {\n    auth: authReducer,\n    cart: cartReducer,\n    products: productsReducer\n  }\n});\nexport type RootState = ReturnType<typeof store.getState>;\nexport type AppDispatch = typeof store.dispatch;`,
    badSnippet: `// Putting all application logic into a single monolithic 2,000-line slice`,
    goodSnippet: `// Splitting state into domain-focused feature slices (cart, auth, products) and combining them in store.ts`,
    quizQuestion: "How should large application state be structured in Redux Toolkit?",
    quizOptions: ["In one giant single slice file", "Divided into modular feature slices combined in configureStore", "Stored in localStorage strings", "Split across 5 separate stores"],
    quizCorrect: 1,
    quizExplanation: "Good architecture divides state into modular feature slices (e.g. `features/cart/cartSlice.ts`, `features/auth/authSlice.ts`) combined in the root store.",
  },
  "rdx13-the-provider-component": {
    code: "RDX-13",
    title: "Connecting React to Redux with <Provider>",
    concept: "The React-Redux `<Provider store={store}>` component wraps your top-level React component tree, making the store accessible to any descendant component via Context.",
    snippet: `import { Provider } from 'react-redux';\nimport { store } from './app/store';\n\nexport default function App() {\n  return (\n    <Provider store={store}>\n      <MainAppContent />\n    </Provider>\n  );\n}`,
    badSnippet: `// Passing the store prop down manually through every component:\n<App store={store}><Page store={store}><Header store={store} /></Page></App>`,
    goodSnippet: `// Wrap once at the root with <Provider store={store}> and use hooks inside components`,
    quizQuestion: "Where should the `<Provider>` component typically be placed in a React application?",
    quizOptions: ["Inside every button component", "At the top level of your component tree (e.g. index.tsx or App.tsx)", "Only inside asynchronous API callbacks", "Inside custom reducers"],
    quizCorrect: 1,
    quizExplanation: "The `<Provider>` must wrap the root component tree so that all child components have access to the Redux store.",
  },
  "rdx14-reading-state-with-useselector": {
    code: "RDX-14",
    title: "Reading State with useSelector",
    concept: "useSelector extracts data from the Redux store state. It subscribes the component to the store and re-renders only when the selected value changes.",
    snippet: `import { useSelector } from 'react-redux';\n\nfunction CartSummary() {\n  const totalItems = useSelector((state: RootState) => state.cart.items.length);\n  return <span>Items: {totalItems}</span>;\n}`,
    badSnippet: `// Selecting the entire root state when only one number is needed:\nconst state = useSelector(state => state); // Re-renders on ANY store change!`,
    goodSnippet: `// Select only the specific minimal slice needed:\nconst count = useSelector(state => state.cart.items.length);`,
    quizQuestion: "Why should a component select specific pieces of state rather than the entire root state with `useSelector`?",
    quizOptions: ["Because Redux only supports strings", "Because selecting the entire state causes the component to re-render whenever ANY part of the store changes", "Because TypeScript prohibits it", "To delete unused state"],
    quizCorrect: 1,
    quizExplanation: "`useSelector` performs reference equality checks. Selecting only the needed slice ensures the component only re-renders when that specific slice changes.",
  },
  "rdx15-dispatching-actions-with-usedispatch": {
    code: "RDX-15",
    title: "Dispatching Actions with useDispatch",
    concept: "useDispatch returns the store's dispatch function. Components dispatch action creators on user interaction to trigger state transitions.",
    snippet: `import { useDispatch } from 'react-redux';\nimport { addItem } from './cartSlice';\n\nfunction ProductButton({ product }) {\n  const dispatch = useDispatch();\n  return <button onClick={() => dispatch(addItem(product))}>Add to Cart</button>;\n}`,
    badSnippet: `// Calling action creators without dispatch:\n<button onClick={() => addItem(product)}>Add</button> // NOTHING HAPPENS! Just returns an object!`,
    goodSnippet: `// Pass the action creator result to dispatch:\n<button onClick={() => dispatch(addItem(product))}>Add</button>`,
    quizQuestion: "What happens if you call `addItem(product)` in an onClick handler without wrapping it in `dispatch()`?",
    quizOptions: ["The item is added to the store normally", "The application crashes", "Nothing happens to the store; it simply returns an action object into nowhere", "The browser reloads"],
    quizCorrect: 2,
    quizExplanation: "Action creators are plain functions that return action objects. Nothing happens until you pass the action object into `dispatch()`.",
  },
  "rdx16-state-design-global-vs-local": {
    code: "RDX-16",
    title: "State Design: What Belongs in Redux?",
    concept: "Good Redux design keeps state minimal: Store authenticated user, shopping cart, and cross-cutting data in Redux; keep text input typing, tooltips, and modal toggles local in React.",
    snippet: `// Redux State: Cart, Auth, Preferences\n// Local State: isHovered, activeTab, formInputText`,
    badSnippet: `// Putting every single form keystroke, modal open toggle, and hover flag into Redux`,
    goodSnippet: `// Separate global domain state in Redux from transient local UI state in React useState`,
    quizQuestion: "Which question is most helpful when deciding whether to place data into Redux?",
    quizOptions: ["Is this data written in TypeScript?", "Do multiple components in different parts of the application need to share or change this data?", "Does this data contain numbers?", "Is this data older than 1 minute?"],
    quizCorrect: 1,
    quizExplanation: "Redux is built for shared state. If only one component cares about the data, local component state is cleaner and more performant.",
  },
  "rdx17-basic-selectors-and-derived-state": {
    code: "RDX-17",
    title: "Basic Selectors & Derived State",
    concept: "Never store values in Redux that can be calculated from existing state. Keep the state minimal and calculate derived data (e.g. cart subtotal, item count) with selectors.",
    snippet: `// Stored State: items: [{ price: 10, qty: 2 }]\n// Derived Selector:\nexport const selectCartTotal = (state: RootState) =>\n  state.cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);`,
    badSnippet: `// Storing duplicate derived state that must be synchronized manually:\n{ items: [...], totalCount: 5, totalPrice: 150 } // Risk of state desynchronization!`,
    goodSnippet: `// Store only the items; compute totalCount and totalPrice on the fly via selectors`,
    quizQuestion: "Why is computing derived state in selectors better than storing calculated totals directly in the Redux state?",
    quizOptions: ["It prevents state desynchronization bugs where items update but total fails to update", "It makes JavaScript run faster on mobile devices", "Redux does not allow storing numbers", "It disables React rendering"],
    quizCorrect: 0,
    quizExplanation: "Storing redundant calculated values requires updating multiple fields on every change, risking bugs where the total drifts out of sync with the items.",
  },
  "rdx18-memoized-selectors-with-createselector": {
    code: "RDX-18",
    title: "Memoized Selectors with createSelector",
    concept: "Reselect's `createSelector` memoizes expensive transformations (filtering, sorting). It only recomputes when its input selectors return new references.",
    snippet: `import { createSelector } from '@reduxjs/toolkit';\n\nconst selectItems = (state: RootState) => state.products.items;\nconst selectFilter = (state: RootState) => state.products.filter;\n\nexport const selectFilteredProducts = createSelector(\n  [selectItems, selectFilter],\n  (items, filter) => items.filter(i => i.category === filter)\n);`,
    badSnippet: `// Running expensive .filter() on 1,000 items inside inline useSelector on every render:\nuseSelector(state => state.items.filter(...)) // Generates new array reference every time!`,
    goodSnippet: `// Memoize with createSelector: returns cached array unless items or filter changed`,
    quizQuestion: "What problem does `createSelector` solve when selecting arrays or objects with transformations like `.filter()`?",
    quizOptions: ["It compresses arrays using gzip", "It returns a cached reference if input arguments haven't changed, preventing unnecessary component re-renders", "It sorts arrays alphabetically", "It converts arrays into Sets"],
    quizCorrect: 1,
    quizExplanation: "Array methods like `.filter()` return a new array reference every time. `createSelector` memoizes the result, returning the cached reference unless inputs change.",
  },
  "rdx19-the-thunk-pattern-for-async-logic": {
    code: "RDX-19",
    title: "The Thunk Pattern for Asynchronous Logic",
    concept: "Reducers must be synchronous and pure. A Thunk is a function that can contain asynchronous code (like fetch calls) and dispatch regular synchronous actions when complete.",
    snippet: `// A manual thunk function: accepts (dispatch, getState)\nexport const fetchUser = (id) => async (dispatch, getState) => {\n  dispatch(userLoading());\n  try {\n    const res = await api.getUser(id);\n    dispatch(userSuccess(res));\n  } catch (err) {\n    dispatch(userFailed(err.message));\n  }\n};`,
    badSnippet: `// Putting an async fetch call directly inside a reducer function:\nfunction userReducer(state, action) {\n  const user = await fetch('/user'); // SYNTAX ERROR / FORBIDDEN IN REDUCERS!\n}`,
    goodSnippet: `// Keep reducers synchronous; execute async logic in thunks and dispatch results`,
    quizQuestion: "Why can't asynchronous API calls like `await fetch()` be executed directly inside a Redux reducer?",
    quizOptions: ["Because Redux reducers are compiled to C++", "Because reducers must be pure synchronous functions so that state changes remain predictable and replayable", "Because the browser disallows fetch inside functions", "Because API calls require React components"],
    quizCorrect: 1,
    quizExplanation: "Reducers must be pure and synchronous. Asynchronous side effects break predictability, time-travel debugging, and testability.",
  },
  "rdx20-createasyncthunk-lifecycle": {
    code: "RDX-20",
    title: "Handling Async Lifecycles with createAsyncThunk",
    concept: "createAsyncThunk generates three action types automatically based on promise lifecycle: `pending` when request starts, `fulfilled` on success, and `rejected` on error.",
    snippet: `import { createAsyncThunk } from '@reduxjs/toolkit';\n\nexport const fetchProducts = createAsyncThunk(\n  'products/fetchProducts',\n  async (_, { rejectWithValue }) => {\n    try {\n      const response = await fetch('/api/products');\n      return await response.json();\n    } catch (err) {\n      return rejectWithValue(err.message);\n    }\n  }\n);`,
    badSnippet: `// Manually creating pending, success, and error action creators for every single API endpoint`,
    goodSnippet: `// Use createAsyncThunk to standardize async lifecycle actions across the application`,
    quizQuestion: "What three action types are automatically created by `createAsyncThunk('users/fetchUsers', ...)`?",
    quizOptions: ["start, success, error", "users/fetchUsers/pending, /fulfilled, /rejected", "init, load, done", "try, catch, finally"],
    quizCorrect: 1,
    quizExplanation: "`createAsyncThunk` generates `[actionType]/pending`, `[actionType]/fulfilled`, and `[actionType]/rejected`.",
  },
  "rdx21-extrareducers-and-the-builder-callback": {
    code: "RDX-21",
    title: "Managing Async State with extraReducers",
    concept: "Listen to async thunks inside `createSlice` using the `extraReducers` builder callback. Handle `addCase(thunk.pending)`, `addCase(thunk.fulfilled)`, and `addCase(thunk.rejected)`.",
    snippet: `const productsSlice = createSlice({\n  name: 'products',\n  initialState: { items: [], status: 'idle', error: null },\n  reducers: {},\n  extraReducers: (builder) => {\n    builder\n      .addCase(fetchProducts.pending, (state) => {\n        state.status = 'loading';\n      })\n      .addCase(fetchProducts.fulfilled, (state, action) => {\n        state.status = 'succeeded';\n        state.items = action.payload;\n      })\n      .addCase(fetchProducts.rejected, (state, action) => {\n        state.status = 'failed';\n        state.error = action.error.message;\n      });\n  }\n});`,
    badSnippet: `// Using deprecated object notation for extraReducers in modern RTK`,
    goodSnippet: `// Use the recommended builder callback syntax with .addCase() for full TypeScript type safety`,
    quizQuestion: "What is the recommended modern syntax for defining `extraReducers` in Redux Toolkit?",
    quizOptions: ["Passing an object map", "The builder callback function using builder.addCase()", "A switch statement", "An array of strings"],
    quizCorrect: 1,
    quizExplanation: "The builder callback (`(builder) => { builder.addCase(...) }`) is the standard modern syntax in Redux Toolkit, providing optimal TypeScript type inference.",
  },
  "rdx22-normalizing-state-shape": {
    code: "RDX-22",
    title: "Normalizing Complex Relational State",
    concept: "Normalizing stores entities like a database table: An `ids` array of keys, and an `entities` lookup object keyed by ID ({ ids: [1, 2], entities: { '1': {...}, '2': {...} } }).",
    snippet: `// Normalized state:\n{\n  ids: ['p1', 'p2'],\n  entities: {\n    'p1': { id: 'p1', title: 'Keyboard', price: 99 },\n    'p2': { id: 'p2', title: 'Mouse', price: 49 }\n  }\n}\n// Lookups by ID are instant O(1): state.entities[id]`,
    badSnippet: `// Deeply nested array of objects: modifying one item requires searching and mapping through 3 levels of nested arrays`,
    goodSnippet: `// Flat normalized lookup tables: update an item in O(1) time without traversing arrays`,
    quizQuestion: "What is the primary advantage of normalizing nested state in Redux?",
    quizOptions: ["It encrypts user passwords", "It avoids data duplication and allows O(1) direct item updates by ID without deep nested array mapping", "It formats dates automatically", "It removes the need for reducers"],
    quizCorrect: 1,
    quizExplanation: "Normalized state keeps each entity in one place, enabling instant O(1) lookups and preventing duplicated items from drifting out of sync.",
  },
  "rdx23-createentityadapter": {
    code: "RDX-23",
    title: "Managing Collections with createEntityAdapter",
    concept: "createEntityAdapter generates pre-built CRUD reducer functions (addOne, setAll, updateOne, removeOne) and pre-generated selectors for normalized entities.",
    snippet: `import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';\n\nconst usersAdapter = createEntityAdapter<User>();\n\nconst usersSlice = createSlice({\n  name: 'users',\n  initialState: usersAdapter.getInitialState(),\n  reducers: {\n    userAdded: usersAdapter.addOne,\n    usersReceived: usersAdapter.setAll,\n    userRemoved: usersAdapter.removeOne\n  }\n});\nexport const { selectAll: selectAllUsers, selectById: selectUserById } = usersAdapter.getSelectors((state: RootState) => state.users);`,
    badSnippet: `// Writing manual slice reducers to find item index, slice array, and replace objects manually`,
    goodSnippet: `// Use createEntityAdapter to get pre-optimized CRUD reducers and selectors in 3 lines of code`,
    quizQuestion: "What methods does `createEntityAdapter` provide out of the box for handling normalized entity mutations?",
    quizOptions: ["fetch, push, commit", "addOne, addMany, setAll, removeOne, removeMany, updateOne", "insert, select, delete", "create, read, update, destroy"],
    quizCorrect: 1,
    quizExplanation: "`createEntityAdapter` pre-packages standard collection operations like `addOne`, `setAll`, `updateOne`, and `removeOne`.",
  },
  "rdx24-redux-middleware-pipeline": {
    code: "RDX-24",
    title: "The Redux Middleware Pipeline",
    concept: "Middleware sits between dispatching an action and the moment it reaches the reducer: `const middleware = store => next => action => { ... }`. It is ideal for logging, metrics, and crash reporting.",
    snippet: `const loggerMiddleware = (store) => (next) => (action) => {\n  console.log('Dispatching action:', action.type);\n  const result = next(action); // Pass to next middleware or reducer\n  console.log('Next state:', store.getState());\n  return result;\n};`,
    badSnippet: `// Attempting to log every action by overriding the dispatch method on React components directly`,
    goodSnippet: `// Plug custom middleware into configureStore's middleware array to intercept all dispatched actions cleanly`,
    quizQuestion: "Where does Redux middleware execute in the data flow pipeline?",
    quizOptions: ["Inside the React render phase", "Between the moment an action is dispatched and the moment it reaches the reducer", "After the component unmounts", "In the database server"],
    quizCorrect: 1,
    quizExplanation: "Middleware wraps the store's dispatch method, intercepting actions before they are processed by reducers.",
  },
  "rdx25-redux-devtools-and-time-travel": {
    code: "RDX-25",
    title: "Redux DevTools & Time-Travel Debugging",
    concept: "Redux DevTools provides real-time state visualization, action logs, state diffs, and time-travel debugging: Jumping back to previous state snapshots to inspect bugs.",
    snippet: `// Redux DevTools is automatically enabled in development by configureStore!\n// Features:\n// - Inspect action payload history\n// - View state tree diffs\n// - Jump / Time-travel to past actions\n// - Dispatch test actions directly in the browser`,
    badSnippet: `// Scattering 50 console.log() statements across components to trace why state changed`,
    goodSnippet: `// Open Redux DevTools extension to see the exact sequence of actions, timestamps, and diffs`,
    quizQuestion: "What unique capability does Redux DevTools provide due to Redux's pure immutable data flow?",
    quizOptions: ["Editing CSS in real time", "Time-travel debugging: Replaying, jumping to, and inspecting past state snapshots", "Generating SQL schemas", "Compiling TypeScript"],
    quizCorrect: 1,
    quizExplanation: "Because every action produces an immutable state snapshot via pure functions, DevTools can jump backward and forward in time across snapshots.",
  },
  "rdx26-testing-best-practices-and-anti-patterns": {
    code: "RDX-26",
    title: "Testing, Best Practices & Anti-Patterns",
    concept: "Test pure reducers as plain functions: `expect(reducer(initialState, action)).toEqual(expectedState)`. Keep state serializable, avoid storing functions or class instances, and follow best practices.",
    snippet: `// Unit testing a pure reducer:\ntest('should add item to cart', () => {\n  const previousState = { items: [], total: 0 };\n  const nextState = cartReducer(previousState, addItem({ id: 1, price: 10 }));\n  expect(nextState.items).toHaveLength(1);\n  expect(nextState.total).toBe(10);\n});`,
    badSnippet: `// Anti-pattern: Storing non-serializable values (class instances, promises, functions, DOM nodes) in Redux state`,
    goodSnippet: `// Keep state 100% plain serializable JSON (strings, numbers, booleans, plain objects, arrays)`,
    quizQuestion: "Why should non-serializable values (such as Promises, functions, or class instances) NOT be stored in Redux state?",
    quizOptions: ["They are too large for RAM", "They break time-travel debugging, serialization, persistence, and Redux DevTools inspection", "JavaScript prohibits them in objects", "They make CSS fail to load"],
    quizCorrect: 1,
    quizExplanation: "Redux requires serializable state so actions and state snapshots can be inspected, logged, serialized to JSON, and replayed in DevTools.",
  },
};

export function getReduxLessonContent(slug: string): ReduxLessonContent {
  if (REDUX_LESSONS_CONTENT[slug]) {
    return REDUX_LESSONS_CONTENT[slug];
  }

  const meta = LESSON_METADATA_MAP[slug];
  const lessonCode = meta?.code || "RDX-??";
  const lessonTitle = meta?.title || "Redux Mastery Lesson";
  const concept = meta?.concept || "Mastering state management architecture and data flow with Redux Toolkit.";

  return {
    slug,
    code: lessonCode,
    title: lessonTitle,
    sections: DEFAULT_SECTIONS,
    part1: {
      title: `The Mental Model: Understanding ${lessonTitle}`,
      bigPicture: `${concept} In modern frontend development, Redux provides a predictable, centralized container for shared application state. By learning these core mechanics, you eliminate prop drilling, structure modular slices with Redux Toolkit, and track state transitions with absolute precision.`,
      breakdownTitle: "Key Principles to Master:",
      breakdownItems: [
        { title: "Core Purpose", desc: concept },
        { title: "Single Source of Truth", desc: "Shared data lives in the centralized store rather than duplicated across multiple components." },
        { title: "Unidirectional Flow", desc: "State transitions flow through a predictable loop: dispatch(action) -> reducer -> new state -> UI re-render." },
        { title: "Clean Separation", desc: "Business state logic remains decoupled from UI rendering, keeping components focused on presentation." },
      ],
    },
    part2: {
      title: "Core Mechanics & Architectural Rules",
      intro: "Understand the core building blocks governing this Redux feature:",
      cards: [
        { number: "01", tag: "STORE", title: "State Container", description: "How state shape, slices, or selector functions are organized in memory.", color: "emerald" },
        { number: "02", tag: "ACTION", title: "Event Dispatch", description: "How plain action objects signal events and communicate payloads to reducers.", color: "purple" },
        { number: "03", tag: "REDUCER", title: "State Calculation", description: "How pure functions or Immer-powered slices produce the next immutable state tree.", color: "cyan" },
      ],
      rule: {
        title: "Redux Engineering Rule",
        content: "Keep reducers pure, keep state serializable, and only place truly shared application state into the central store.",
      },
    },
    part3: {
      title: "Deep Dive: Practical Syntax & Behavior",
      intro: "Inspect the idiomatic syntax and real-world behavior for this topic:",
      points: [
        {
          title: "Primary Code Pattern",
          content: "Use this standard pattern in your modern Redux Toolkit codebase:",
          codeSnippet: meta?.snippet || `// Standard Redux Toolkit pattern\nconst slice = createSlice({ ... });`,
        },
        {
          title: "Runtime Behavior",
          content: "Redux dispatches the action through middleware, executes the reducer to produce a new state tree reference, and notifies subscribed components to re-render.",
          codeSnippet: `// Predictable state transition\nstore.dispatch(action);`,
        },
      ],
    },
    part4: {
      title: "Bad Design vs Better Design",
      bad: {
        title: "Fragile or Anti-Pattern Approach",
        code: meta?.badSnippet || `// Anti-pattern: Direct state mutation or bloated global state\nstate.items.push(item);`,
        explanation: "Leads to missed component re-renders, action log bloat, or brittle cross-component coupling.",
      },
      good: {
        title: "Idiomatic Modern Redux Approach",
        code: meta?.goodSnippet || `// Idiomatic Redux Toolkit pattern\nconst slice = createSlice({ ... });`,
        explanation: "Provides immutable guarantees, optimal performance, clean TypeScript integration, and easy debugging.",
      },
    },
    part5: {
      title: "Interactive Playground",
      intro: "Experiment with the concept and verify state behavior:",
      starterCode: `// Redux Simulation Workspace: ${lessonCode}
const state = {
  cart: { items: [{ id: 1, name: "Headphones", price: 80 }] },
  user: { name: "Mehedi", isAuth: true }
};

console.log("Current State:", state);
// Running targeted Redux operation simulation
const count = state.cart.items.length;
console.log("Selected Item Count:", count);`,
    },
    part6: {
      title: "Concept Check: Knowledge Assessment",
      quiz: {
        question: meta?.quizQuestion || `What is the primary takeaway regarding ${lessonTitle}?`,
        options: meta?.quizOptions || [
          "It should only be used when writing raw SQL strings.",
          `It enables predictable state management: ${concept.substring(0, 60)}...`,
          "It replaces all React components with HTML strings.",
          "It is only available in production environments.",
        ],
        correctIndex: meta?.quizCorrect ?? 1,
        explanation: meta?.quizExplanation || `${concept} Following Redux best practices guarantees high maintainability and predictable UI updates.`,
      },
    },
    part7: {
      title: "Key Takeaways & What's Next",
      takeaways: [
        { title: "Core Mastery", desc: concept },
        { title: "Predictable Flow", desc: "Always route state changes through explicit actions and pure reducers." },
        { title: "Clean Architecture", desc: "Organize state into modular feature slices with Redux Toolkit." },
      ],
      nextLessonPreview: {
        title: "Next Learning Step",
        desc: "Continue advancing through your Redux state management journey.",
      },
    },
  };
}
