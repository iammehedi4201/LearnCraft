import { InterviewQuestion } from "@/types/interview";

export const REDUX_QUESTIONS: InterviewQuestion[] = [
  {
    id: "redux-q01",
    trackKey: "redux",
    category: "State Management & Selectors",
    subtopic: "Reselect & createSelector",
    type: "conceptual",
    difficulty: "medium",
    source: "curated",
    question: "How does Redux Toolkit's `createSelector` (Reselect) prevent unnecessary component re-renders, and how does memoization work?",
    answer: `### Simple answer:
\`createSelector\` creates a memoized selector function that calculates derived state from the Redux store. It caches its calculation so it only recalculates when its input values change by referential equality (\`===\`).

### How Memoization Works:
1. **Input Selectors:** \`createSelector\` extracts one or more input slices from state.
2. **Equality Check:** If and only if the input values change by **referential equality (\`===\`)**, the output transformation function runs.
3. **Cache Hit:** If inputs haven't changed since the last run, it returns the cached result without recalculating.

\`\`\`typescript
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

const selectItems = (state: RootState) => state.cart.items;
const selectTaxRate = (state: RootState) => state.cart.taxRate;

// Memoized selector:
export const selectCartTotal = createSelector(
  [selectItems, selectTaxRate],
  (items, taxRate) => {
    console.log("Recalculating total..."); // only runs when items or taxRate changes!
    const subtotal = items.reduce((acc, i) => acc + i.price * i.qty, 0);
    return subtotal * (1 + taxRate);
  }
);
\`\`\`

### Why this is critical:
Without memoization, running \`.filter()\` or \`.map()\` directly inside \`useSelector(state => state.items.filter(...))\` returns a **brand new array reference on every Redux dispatch**, forcing the component to re-render even when the items never changed!

### Interview answer:
\`createSelector\` memoizes computed Redux state based on the referential equality of its input selectors. If inputs don't change, it returns the cached result. This prevents returning new object or array references, which avoids cascading re-renders across connected React components.`,
    followUps: [
      "What is the default cache size of createSelector and how do you configure it with createDraftSafeSelector?",
      "How does Immer.js allow direct state mutations inside Redux Toolkit createSlice reducers?",
      "What is the difference between Redux middlewares and enhancers?"
    ],
    keyPoints: [
      "createSelector memoizes based on referential equality of input selectors",
      "Avoids returning new array or object references on every unrelated dispatch",
      "Prevents cascading re-renders across connected React components",
      "Redux Toolkit includes Reselect by default"
    ],
    tags: ["redux", "reselect", "createSelector", "performance", "memoization"],
    relatedLessonSlug: "/learn/redux/rdx04-selectors-and-reselect",
    relatedLessonName: "RDX-04: Reselect Memoized Selectors & Performance"
  },
  {
    id: "redux-q02",
    trackKey: "redux",
    category: "Fundamentals",
    subtopic: "Three Principles",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What is Redux, and what are the Three Fundamental Principles of Redux?",
    answer: `### Simple answer:
Redux is a predictable, centralized state management library for JavaScript applications based on the Flux architecture pattern.

### The Three Fundamental Principles:
1. **Single Source of Truth:**
   The global state of the entire application is stored in an object tree inside a **single centralized Store**. Makes debugging, logging, and persisting state straightforward.
2. **State is Read-Only:**
   The only way to mutate state is to **dispatch an Action** (a plain JavaScript object describing what happened, e.g. \`{ type: 'cart/addItem', payload: item }\`).
3. **Changes are Made with Pure Functions:**
   To specify how the state tree is transformed by actions, you write **pure Reducer functions** that take \`(previousState, action)\` and return a brand new state object without mutating the previous state.

### Interview answer:
Redux provides predictable state management based on three principles: a single source of truth (one central store), read-only state that can only be changed by dispatching explicit actions, and pure reducer functions that calculate the next state immutably without side effects.`,
    followUps: [
      "Why is having a Single Source of Truth beneficial for features like time-travel debugging?",
      "What is the difference between Redux and the Flux architecture?",
      "Can a React application have multiple Redux stores?"
    ],
    keyPoints: [
      "Single source of truth: all state resides in one central store",
      "State is read-only: mutations occur exclusively by dispatching actions",
      "Changes via pure functions: reducers calculate next state immutably",
      "Predictable state machine enables time-travel debugging"
    ],
    tags: ["redux", "flux", "principles", "state-management", "fundamentals"],
    relatedLessonSlug: "/learn/redux/rdx01-what-is-redux",
    relatedLessonName: "RDX-01: Redux Architecture & The Three Principles"
  },
  {
    id: "redux-q03",
    trackKey: "redux",
    category: "Architecture & Data Flow",
    subtopic: "Unidirectional Data Flow",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "Explain the Unidirectional Data Flow in Redux: Store, Actions, Reducers, and Dispatch.",
    answer: `### Simple answer:
Redux enforces a strict **one-way (unidirectional) data flow** where data moves in a continuous circular loop:

\`\`\`
  ┌────────────────────────────────────────────────────────┐
  ▼                                                        │
[UI Component] ──(Dispatches Action)──> [Middleware]       │
                                             │             │
                                             ▼             │
[UI Re-renders] <──(Notifies Subscribers)── [Store] <── [Reducer]
\`\`\`

### The Four Core Elements:
1. **Action:** A plain JavaScript object with a \`type\` string and optional \`payload\`:
   \`{ type: "counter/increment", payload: 5 }\`
2. **Dispatch:** The method used to send an action to the store:
   \`dispatch(increment(5))\`
3. **Reducer:** A pure function that calculates the new state:
   \`(state, action) => newState\`
4. **Store:** Holds the state tree. When state updates, it notifies UI components via \`useSelector\`, triggering targeted re-renders.

### Interview answer:
Redux follows a unidirectional data flow: UI components dispatch actions describing an event, the Store forwards the action to pure reducers, reducers return a new immutable state tree, and the Store notifies subscribers so connected UI components re-render with fresh data.`,
    followUps: [
      "What is an Action Creator function?",
      "How does useSelector hook subscribe to store changes?",
      "Why is unidirectional data flow easier to debug than bidirectional two-way data binding?"
    ],
    keyPoints: [
      "Unidirectional loop: UI -> Action -> Dispatcher -> Reducer -> Store -> UI",
      "Actions describe events; Reducers describe how state updates",
      "Store is the centralized coordinator",
      "Strict data flow eliminates unpredictable race conditions"
    ],
    tags: ["unidirectional-data-flow", "actions", "reducers", "store", "dispatch"],
    relatedLessonSlug: "/learn/redux/rdx01-what-is-redux",
    relatedLessonName: "RDX-01: Redux Architecture & The Three Principles"
  },
  {
    id: "redux-q04",
    trackKey: "redux",
    category: "Reducers & Immutability",
    subtopic: "Pure Functions",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "Why must Redux Reducers be Pure Functions, and why is state immutability required?",
    answer: `### Simple answer:
A **Pure Function** is a function that:
1. Given the same inputs, **always returns the exact same output**.
2. Produces **zero side effects** (no API calls, no modifying variables outside its scope, no \`Math.random()\`, no \`Date.now()\`).

### Why Reducers must be pure:
Redux relies on pure functions so state transitions are 100% deterministic, reproducible, and testable.

### Why Immutability is mandatory:
Redux and React detect state changes using **shallow reference equality checking (\`oldState !== newState\`)**.
- If you mutate state directly (\`state.user.name = "Bob"\`), the memory address of the state object remains identical (\`oldState === newState\`).
- Redux thinks **nothing changed**, so React will **fail to re-render the screen**!
- By returning a new copy of state, the reference changes instantly in $O(1)$ time, allowing React to trigger updates accurately.

\`\`\`javascript
// BAD (Mutation - UI will not update!):
function badReducer(state, action) {
  state.count += 1;
  return state;
}

// GOOD (Immutable copy):
function goodReducer(state, action) {
  return { ...state, count: state.count + 1 };
}
\`\`\`

### Interview answer:
Redux reducers must be pure functions so that state calculations are completely deterministic without side effects. Immutability is required because Redux uses shallow reference equality checks (\`!==\`) to detect changes; mutating state directly keeps the same memory pointer, preventing React components from re-rendering.`,
    followUps: [
      "Where should asynchronous side effects (like API calls) live if reducers must be pure?",
      "How does shallow comparison compare to deep object comparison in terms of CPU cost?",
      "How does Immer.js simplify immutability in modern Redux Toolkit?"
    ],
    keyPoints: [
      "Pure functions produce no side effects and return identical output for identical input",
      "Immutability enables O(1) shallow reference equality checking",
      "Direct state mutation prevents React components from re-rendering",
      "Side effects belong in Thunks or Middleware, never in Reducers"
    ],
    tags: ["pure-functions", "immutability", "reducers", "shallow-equality"],
    relatedLessonSlug: "/learn/redux/rdx02-reducers-and-immutability",
    relatedLessonName: "RDX-02: Pure Reducers & State Immutability"
  },
  {
    id: "redux-q05",
    trackKey: "redux",
    category: "Redux Toolkit (RTK)",
    subtopic: "createSlice",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "What is Redux Toolkit (RTK), why was it introduced, and how does `createSlice` work?",
    answer: `### Simple answer:
Redux Toolkit (RTK) is the official, opinionated, modern way to write Redux applications. It was introduced to eliminate the massive boilerplate code (separate action type constants, action creators, reducers, and immutable spread operators) historically required by legacy Redux.

### How \`createSlice\` works:
\`createSlice\` combines action types, action creators, and reducers into a **single, unified declaration**:

\`\`\`typescript
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 } as CounterState,
  reducers: {
    increment: (state) => {
      // Looks like mutation, but Immer handles immutability under the hood!
      state.value += 1;
    },
    addAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Auto-generated action creators:
export const { increment, addAmount } = counterSlice.actions;

// Auto-generated reducer:
export default counterSlice.reducer;
\`\`\`

### Configuring the store with \`configureStore\`:
\`\`\`typescript
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: { counter: counterReducer },
});
\`\`\`
Automatically configures Redux DevTools and Redux Thunk middleware with zero setup!

### Interview answer:
Redux Toolkit is the modern standard for Redux that eliminates legacy boilerplate. Its core API, \`createSlice\`, automatically generates action types and action creators alongside reducers, while integrating Immer so developers can write clean, direct state updates safely.`,
    followUps: [
      "What is configureStore and what default middlewares does it configure automatically?",
      "Can you handle actions from other slices in createSlice using extraReducers?",
      "Why is legacy Redux without Redux Toolkit strongly discouraged today?"
    ],
    keyPoints: [
      "RTK is the official, recommended standard for Redux development",
      "createSlice auto-generates action creators, types, and reducers together",
      "configureStore sets up DevTools, Thunk, and immutability checks out of the box",
      "Dramatically reduces boilerplate compared to legacy Redux"
    ],
    tags: ["redux-toolkit", "rtk", "createSlice", "configureStore", "modern-redux"],
    relatedLessonSlug: "/learn/redux/rdx03-redux-toolkit-and-slices",
    relatedLessonName: "RDX-03: Redux Toolkit & createSlice Architecture"
  },
  {
    id: "redux-q06",
    trackKey: "redux",
    category: "Redux Toolkit (RTK)",
    subtopic: "Immer.js Internals",
    type: "internals",
    difficulty: "medium",
    source: "curated",
    question: "How does Immer.js allow direct state mutations inside Redux Toolkit reducers?",
    answer: `### Simple answer:
Redux Toolkit wraps all reducers inside **Immer.js**. Immer uses JavaScript **\`Proxy\`** objects to track all mutations made to a temporary "draft" state, and then automatically produces a brand new immutable state object based on those changes.

### How it works under the hood:
1. When a reducer runs, Immer gives it a **\`draft\`** object wrapped in a JavaScript \`Proxy\`.
2. You write standard mutating code: \`state.todos.push(newTodo)\` or \`state.user.age = 30\`.
3. The Proxy intercepts every write and records the changes.
4. When the reducer finishes, Immer applies the recorded changes to produce a new, frozen immutable state tree with structural sharing.

\`\`\`typescript
// Without Immer (Tedious and error-prone spread operators):
return {
  ...state,
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      age: 30
    }
  }
};

// With Immer in RTK (Clean, readable mutation):
state.user.profile.age = 30;
\`\`\`

### The Golden Rule with Immer:
Either mutate the draft state, OR return a brand new state value. **Do not do both!**

### Interview answer:
Redux Toolkit integrates Immer.js, which wraps state in a JavaScript Proxy "draft". The Proxy tracks all direct mutations and automatically generates a new immutable state tree using structural sharing, letting developers write clean mutating code while preserving strict immutability.`,
    followUps: [
      "What is Structural Sharing in Immer.js?",
      "What happens if you return a new state object while also mutating the draft state?",
      "Why can't you console.log(state) directly inside an RTK reducer without current(state)?"
    ],
    keyPoints: [
      "Immer wraps draft state in a JavaScript Proxy",
      "Intercepts mutations and generates a fresh immutable copy",
      "Structural sharing reuses unchanged object branches to conserve memory",
      "Use current(state) from @reduxjs/toolkit to inspect draft state in console.log"
    ],
    tags: ["immer", "proxy", "immutability", "redux-toolkit", "internals"],
    relatedLessonSlug: "/learn/redux/rdx03-redux-toolkit-and-slices",
    relatedLessonName: "RDX-03: Redux Toolkit & createSlice Architecture"
  },
  {
    id: "redux-q07",
    trackKey: "redux",
    category: "Asynchronous Redux",
    subtopic: "createAsyncThunk",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "How does `createAsyncThunk` handle asynchronous API calls in Redux Toolkit, and what lifecycle actions does it dispatch?",
    answer: `### Simple answer:
\`createAsyncThunk\` is RTK's built-in utility for handling asynchronous operations. It takes an action type string and an async payload creator function, automatically generating and dispatching Promise lifecycle action types: **\`pending\`**, **\`fulfilled\`**, and **\`rejected\`**.

### Example:
\`\`\`typescript
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// 1. Define async thunk:
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (limit: number, { rejectWithValue }) => {
    try {
      const res = await fetch(\`/api/users?limit=\${limit}\`);
      if (!res.ok) throw new Error("Failed to fetch");
      return await res.json(); // Becomes action.payload in fulfilled!
    } catch (err) {
      return rejectWithValue(err.message); // Becomes action.payload in rejected!
    }
  }
);

// 2. Handle lifecycle in slice extraReducers:
const usersSlice = createSlice({
  name: "users",
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
\`\`\`

### Interview answer:
\`createAsyncThunk\` abstracts asynchronous logic in Redux Toolkit. It dispatches a \`pending\` action before execution, a \`fulfilled\` action on success with the resolved data, and a \`rejected\` action on failure. These lifecycle events are handled in the slice's \`extraReducers\` builder.`,
    followUps: [
      "What is rejectWithValue and how does it pass custom error payloads?",
      "How does unwrap() work when dispatching a thunk in React components?",
      "What is the ThunkAPI argument passed to the payload creator?"
    ],
    keyPoints: [
      "Automatically dispatches pending, fulfilled, and rejected action types",
      "Handled in extraReducers builder API",
      "rejectWithValue enables typed custom error payloads",
      "dispatch(thunk()).unwrap() allows components to handle results with try/catch"
    ],
    tags: ["createAsyncThunk", "async-redux", "thunks", "api-calls", "rtk"],
    relatedLessonSlug: "/learn/redux/rdx05-async-thunks-and-api-integration",
    relatedLessonName: "RDX-05: Asynchronous Thunks & Server Integration"
  },
  {
    id: "redux-q08",
    trackKey: "redux",
    category: "RTK Query",
    subtopic: "Data Fetching & Caching",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "What is RTK Query, and how does it compare to standard Redux Thunks for server state management?",
    answer: `### Simple answer:
RTK Query is an advanced data fetching and caching package included inside Redux Toolkit. While \`createAsyncThunk\` requires you to manually write loading states, error states, and reducer logic, RTK Query eliminates **100% of that boilerplate** by generating automatic query hooks.

### Comparison:
| Capability | \`createAsyncThunk\` | RTK Query |
|---|---|---|
| **Loading / Error states** | Written manually in slice | Automatically generated (\`isLoading\`, \`isError\`) |
| **Caching & Deduplication** | Must implement manually | **Automatic out-of-the-box caching** |
| **Refetching on Mount / Focus** | Manual event listeners | Built-in automatic refetching |
| **Optimistic Updates** | Complex manual reducer logic | Built-in \`onQueryStarted\` lifecycle |

### Example RTK Query API:
\`\`\`typescript
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
      providesTags: ["Post"], // Cache tag
    }),
    addPost: builder.mutation<Post, Partial<Post>>({
      query: (body) => ({ url: "/posts", method: "POST", body }),
      invalidatesTags: ["Post"], // Automatically triggers getPosts refetch!
    }),
  }),
});

// Auto-generated React hooks:
export const { useGetPostsQuery, useAddPostMutation } = apiSlice;
\`\`\`

### Interview answer:
RTK Query is Redux Toolkit's built-in solution for server state. Unlike \`createAsyncThunk\` which requires manual loading flags and reducers, RTK Query auto-generates React hooks with automated caching, request deduplication, polling, and tag-based cache invalidation.`,
    followUps: [
      "How do providesTags and invalidatesTags automate cache invalidation in RTK Query?",
      "How does RTK Query compare to TanStack Query (React Query)?",
      "What is optimistic updates in RTK Query using onQueryStarted?"
    ],
    keyPoints: [
      "Built-in server data fetching and caching tool in Redux Toolkit",
      "Auto-generates custom React hooks (useGetPostsQuery)",
      "Automates request deduplication, caching, and loading/error flags",
      "Tag system (providesTags / invalidatesTags) automates cache invalidation"
    ],
    tags: ["rtk-query", "caching", "server-state", "redux-toolkit", "data-fetching"],
    relatedLessonSlug: "/learn/redux/rdx06-rtk-query-caching",
    relatedLessonName: "RDX-06: RTK Query Caching & Automated Revalidation"
  },
  {
    id: "redux-q09",
    trackKey: "redux",
    category: "Middleware & Architecture",
    subtopic: "Redux Middleware",
    type: "architecture",
    difficulty: "medium",
    source: "curated",
    question: "What is Redux Middleware, how is it constructed using Currying, and how does `redux-thunk` work under the hood?",
    answer: `### Simple answer:
Redux Middleware sits between dispatching an action and the moment that action reaches the reducer. It provides a third-party extension point for logging, crash reporting, routing, and handling asynchronous actions.

### Curried Signature of Redux Middleware:
Redux middleware uses a curried 3-layer function structure:
\`\`\`javascript
const customLoggerMiddleware = (storeAPI) => (next) => (action) => {
  console.log("Dispatching action:", action);
  const result = next(action); // Passes action to next middleware/reducer
  console.log("Next state:", storeAPI.getState());
  return result;
};
\`\`\`

### How \`redux-thunk\` works under the hood (in just ~10 lines of code!):
By default, Redux only permits dispatching plain objects. \`redux-thunk\` intercepts actions:
- If the action is a **function** instead of an object, it invokes that function and passes \`(dispatch, getState)\`.
- If the action is a normal object, it calls \`next(action)\` to pass it along!

\`\`\`javascript
// Internal implementation of redux-thunk:
function createThunkMiddleware() {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState); // Execute async function!
    }
    return next(action); // Pass regular action to reducers
  };
}
\`\`\`

### Interview answer:
Redux middleware intercepts dispatched actions before they reach reducers. Built as a curried function \`store => next => action\`, it can inspect, modify, delay, or cancel actions. \`redux-thunk\` simply checks if an action is a function—if so, it calls it with \`(dispatch, getState)\`, enabling asynchronous operations.`,
    followUps: [
      "Why does Redux middleware use a curried function structure with three nested functions?",
      "What is Redux Saga and how does it use ES6 generator functions for complex workflows?",
      "How do middleware errors impact the Redux store dispatch cycle?"
    ],
    keyPoints: [
      "Middleware intercepts actions between dispatch and reducers",
      "Curried structure: storeAPI => next => action",
      "redux-thunk allows dispatching functions instead of plain objects",
      "Enables logging, crash reporting, authentication checks, and async flows"
    ],
    tags: ["middleware", "redux-thunk", "currying", "architecture", "async-actions"],
    relatedLessonSlug: "/learn/redux/rdx05-async-thunks-and-api-integration",
    relatedLessonName: "RDX-05: Asynchronous Thunks & Server Integration"
  },
  {
    id: "redux-q10",
    trackKey: "redux",
    category: "Trade-offs & Comparison",
    subtopic: "Redux vs Alternatives",
    type: "trade-offs",
    difficulty: "medium",
    source: "curated",
    question: "When should you choose Redux Toolkit today over React Context or lightweight alternatives like Zustand?",
    answer: `### Simple answer:
Modern state management has evolved into specialized tools:

| Tool | Best For | Pros | Cons |
|---|---|---|---|
| **React Context** | Low-frequency global app settings (theme, locale, current user auth) | Built directly into React, zero dependencies | Lacks selectors; re-renders all consumers on every change |
| **Zustand** | Small-to-medium client state (UI state, modal visibility, filters) | Ultra-lightweight (~1KB), minimal boilerplate, hook-based | Less standardized conventions across large enterprise teams |
| **TanStack Query** | **Server state** (caching API responses, refetching, pagination) | Dedicated server cache lifecycle | Not intended for complex local client-only state |
| **Redux Toolkit** | **Complex, large-scale client state** in enterprise teams | Strict conventions, time-travel DevTools, mature ecosystem | Larger bundle size and conceptual learning curve |

### When to choose Redux Toolkit:
1. **Large Enterprise Teams:** Where having rigid, standardized conventions is more important than minimal setup code.
2. **Complex Interdependent Client State:** Shopping carts, multi-step financial application forms, graphic editors.
3. **Advanced Debugging Requirements:** Need time-travel state debugging and full action-replay auditing.

### Modern Best Practice:
Separate **Server State** (use TanStack Query or RTK Query) from **Client State** (use Zustand for simple apps, Redux Toolkit for complex enterprise apps).

### Interview answer:
Use React Context for low-frequency global settings like themes. Use TanStack Query for server cache. For client state, choose Zustand for lightweight, boilerplate-free state, and choose Redux Toolkit for complex enterprise applications requiring strict conventions, time-travel debugging, and robust middleware pipelines.`,
    followUps: [
      "Why is dividing state into 'Server State' vs 'Client State' the modern best practice?",
      "How does Zustand compare to Redux under the hood?",
      "Can Redux DevTools be used with Zustand?"
    ],
    keyPoints: [
      "Context is for low-frequency configuration (theme/auth)",
      "Server state (caching/fetching) belongs in TanStack Query or RTK Query",
      "Zustand is best for lightweight client state",
      "Redux Toolkit excels in large enterprise apps with complex state and strict conventions"
    ],
    tags: ["redux-vs-zustand", "context-api", "state-management", "trade-offs", "architecture"],
    relatedLessonSlug: "/learn/redux/rdx01-what-is-redux",
    relatedLessonName: "RDX-01: Redux Architecture & The Three Principles"
  }
];
