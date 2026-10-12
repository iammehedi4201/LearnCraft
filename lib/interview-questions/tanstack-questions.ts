import { InterviewQuestion } from "@/types/interview";

export const TANSTACK_QUESTIONS: InterviewQuestion[] = [
  {
    id: "tanstack-q01",
    trackKey: "tanstack",
    category: "Async State & Caching",
    subtopic: "staleTime vs gcTime",
    type: "conceptual",
    difficulty: "medium",
    source: "curated",
    question: "What is the difference between `staleTime` and `gcTime` (formerly `cacheTime`) in TanStack Query?",
    answer: `### Simple answer:
- **\`staleTime\`**: Determines **how long fetched data is considered fresh**. While fresh, TanStack Query will never refetch automatically.
- **\`gcTime\` (Garbage Collection Time)**: Determines **how long inactive / unmounted cached data remains in memory** before being deleted.

### How they work:
1. **\`staleTime\` (Fresh vs Stale):**
   - **Default:** \`0\` ms (data is considered stale immediately upon arrival).
   - Once data is stale, any trigger (window refocus, component remount, network reconnect) will trigger a background refetch (Stale-While-Revalidate).
   - If \`staleTime: 60000\` (1 min), no background refetches will happen for that minute.

2. **\`gcTime\` (Memory retention):**
   - **Default:** \`5\` minutes (300,000 ms).
   - The countdown starts the moment the last component using that query **unmounts**.
   - If the component mounts again before \`gcTime\` expires, the user sees cached data instantly while a background refetch happens.

\`\`\`typescript
const { data } = useQuery({
  queryKey: ["user", userId],
  queryFn: () => fetchUser(userId),
  staleTime: 60 * 1000,      // Fresh for 1 minute: zero background refetches
  gcTime: 10 * 60 * 1000,    // Retained in memory for 10 minutes after unmount
});
\`\`\`

### Common Misconception:
Setting \`gcTime: 0\` does not disable caching during a component's lifetime; it simply wipes the cache the instant all consumer components unmount.

### Interview answer:
\`staleTime\` governs when data is considered out of date and needs a background refetch on remount or window refocus (defaulting to 0). \`gcTime\` governs how long inactive query data remains in memory after all consuming components have unmounted before being garbage collected (defaulting to 5 minutes).`,
    followUps: [
      "What happens if gcTime is shorter than staleTime?",
      "How does queryClient.invalidateQueries() trigger immediate background refetches?",
      "How do optimistic mutations work with queryClient.setQueryData() and rollback onError?"
    ],
    keyPoints: [
      "staleTime controls when data is considered out of date and needs refetching",
      "gcTime controls when unused inactive queries are deleted from memory",
      "Default staleTime is 0 (refetches on window focus/remount)",
      "Default gcTime is 5 minutes after all consumer components unmount"
    ],
    tags: ["tanstack-query", "react-query", "caching", "staleTime", "gcTime"],
    relatedLessonSlug: "/learn/tanstack/tan03-stale-time-and-cache-lifecycle",
    relatedLessonName: "TAN-03: Stale Time & Cache Lifecycle"
  },
  {
    id: "tanstack-q02",
    trackKey: "tanstack",
    category: "Fundamentals",
    subtopic: "Server State vs Client State",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What is TanStack Query (React Query), and why is it described as an Asynchronous Server State manager?",
    answer: `### Simple answer:
TanStack Query is a dedicated library for fetching, caching, synchronizing, and updating **Server State** in web applications.

### What is Server State vs Client State?
- **Client State (Local UI state):** Synchronous, owned by the browser, and always up to date (e.g. is modal open, current dark mode theme, form draft text). Handled well by \`useState\` or \`Zustand\`.
- **Server State:** Asynchronous, stored on a remote server/database, not owned by the browser, and can become **outdated at any moment** by another user's action!

### What TanStack Query automates:
1. **Deduplicating multiple requests** for the same data across components into a single fetch.
2. **Caching** and background updates (Stale-While-Revalidate).
3. **Automatic refetching** on window refocus, network reconnect, or interval polling.
4. **Pagination and infinite scrolling**.
5. **Garbage collection** of unused memory.

### Interview answer:
TanStack Query manages server state—data that originates remotely, is asynchronous, and can become stale. Unlike local state tools (like useState or Redux), it handles the challenges of server data: automatic caching, deduplication, background revalidation, error retries, and cache synchronization out of the box.`,
    followUps: [
      "Why did managing server data in Redux cause so much boilerplate historically?",
      "How does TanStack Query handle network offline/reconnect transitions?",
      "What are the benefits of window focus refetching (refetchOnWindowFocus)?"
    ],
    keyPoints: [
      "Manages asynchronous server state distinct from local client UI state",
      "Implements Stale-While-Revalidate caching pattern",
      "Deduplicates simultaneous identical API requests across components",
      "Automates background refetching on window refocus and reconnect"
    ],
    tags: ["tanstack-query", "server-state", "caching", "react-query", "architecture"],
    relatedLessonSlug: "/learn/tanstack/tan01-what-is-tanstack-query",
    relatedLessonName: "TAN-01: What is TanStack Query & Server State Architecture"
  },
  {
    id: "tanstack-q03",
    trackKey: "tanstack",
    category: "Query Basics",
    subtopic: "useQuery Lifecycle",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "Explain the core mechanics of `useQuery`: Query Keys, Query Functions, and returned states.",
    answer: `### Simple answer:
The \`useQuery\` hook is the primary tool for reading data in TanStack Query. It requires at minimum two arguments:
1. **\`queryKey\`**: A unique array that identifies and caches the query.
2. **\`queryFn\`**: An async function that returns a Promise resolving the data.

### Example:
\`\`\`tsx
import { useQuery } from "@tanstack/react-query";

function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["users", userId], // Key uniquely identifies this user
    queryFn: async () => {
      const res = await fetch(\`/api/users/\${userId}\`);
      if (!res.ok) throw new Error("Failed to fetch user");
      return res.json();
    },
    enabled: !!userId, // Dependent query: only runs if userId is truthy!
  });

  if (isLoading) return <div>Loading user profile...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return <div>Welcome, {data.name}!</div>;
}
\`\`\`

### Key State Flags:
- **\`isLoading\`**: First time loading (no cached data available yet).
- **\`isFetching\`**: Any time the query function is running (including background refetches).
- **\`isError\`**: Query function threw an error (retried 3 times by default before setting \`isError\`).

### Interview answer:
\`useQuery\` takes a \`queryKey\` array for cache tracking and a \`queryFn\` returning a promise. It provides state flags like \`data\`, \`isLoading\` (initial load with no cache), \`isFetching\` (active network request, including background refetches), and \`isError\` with automated exponential backoff retries.`,
    followUps: [
      "What is the difference between isLoading and isFetching in TanStack Query?",
      "Why must queryFn throw an error or reject a promise for isError to trigger (fetch 404/500 gotcha)?",
      "What does the enabled option do (dependent queries)?"
    ],
    keyPoints: [
      "queryKey uniquely identifies the cache entry as an array",
      "queryFn must return a Promise that resolves data or throws an Error",
      "isLoading is true only on first mount when no cache exists",
      "isFetching is true whenever any network request is in flight",
      "enabled option controls conditional or dependent execution"
    ],
    tags: ["useQuery", "queryKey", "queryFn", "isLoading", "isFetching"],
    relatedLessonSlug: "/learn/tanstack/tan02-usequery-and-query-keys",
    relatedLessonName: "TAN-02: useQuery & Query Key Architecture"
  },
  {
    id: "tanstack-q04",
    trackKey: "tanstack",
    category: "Query Keys",
    subtopic: "Hierarchical Query Keys",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "Why must Query Keys be arrays in TanStack Query, and how do you organize them hierarchically?",
    answer: `### Simple answer:
In TanStack Query v4 and v5, all Query Keys must be **Arrays**. When any variable in the array changes, TanStack Query **automatically refetches** the query because it treats it as a brand new cache entry.

### Organizing Keys Hierarchically:
Organize keys from generic to specific:
- \`["todos"]\`: All todos
- \`["todos", "list", { filter: "done" }]\`: Filtered list
- \`["todos", "detail", todoId]\`: Specific todo detail

### Query Key Factory Pattern (Best Practice):
Avoid scattering raw string arrays throughout components. Use a centralized factory:
\`\`\`typescript
export const todoKeys = {
  all: ["todos"] as const,
  lists: () => [...todoKeys.all, "list"] as const,
  list: (filter: string) => [...todoKeys.lists(), { filter }] as const,
  details: () => [...todoKeys.all, "detail"] as const,
  detail: (id: string) => [...todoKeys.details(), id] as const,
};

// Usage in queries:
useQuery({ queryKey: todoKeys.detail(id), queryFn: ... });

// Invalidate ALL todo queries with one line:
queryClient.invalidateQueries({ queryKey: todoKeys.all });
\`\`\`

### Partial Matching / Fuzzy Invalidation:
Invalidating \`["todos"]\` automatically invalidates **all sub-keys** (\`["todos", "list"]\`, \`["todos", "detail", 1]\`)!

### Interview answer:
Query Keys must be arrays. When any dependency inside the array changes, TanStack Query automatically triggers a refetch. Best practice is structuring keys hierarchically from generic domain to specific ID using the Query Key Factory pattern, allowing fuzzy invalidation of entire subtrees at once.`,
    followUps: [
      "How does TanStack Query compare query key arrays by deterministic serialization?",
      "Do object property orders inside query keys matter (e.g. { a: 1, b: 2 } vs { b: 2, a: 1 })?",
      "How does exact: true change invalidation matching?"
    ],
    keyPoints: [
      "Query keys must be arrays and act as query dependencies",
      "Changing an array element automatically triggers a refetch",
      "Query Key Factory pattern centralizes key definitions",
      "Invalidation matches hierarchically from left to right"
    ],
    tags: ["query-keys", "query-key-factory", "invalidation", "tanstack-query"],
    relatedLessonSlug: "/learn/tanstack/tan02-usequery-and-query-keys",
    relatedLessonName: "TAN-02: useQuery & Query Key Architecture"
  },
  {
    id: "tanstack-q05",
    trackKey: "tanstack",
    category: "Mutations",
    subtopic: "useMutation",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "How does `useMutation` work in TanStack Query for creating, updating, and deleting data?",
    answer: `### Simple answer:
While \`useQuery\` is for **reading data** automatically, **\`useMutation\`** is for **modifying data** (POST, PUT, DELETE) on user interaction. It does not run automatically on mount; you trigger it imperatively via \`mutate()\` or \`mutateAsync()\`.

### Example:
\`\`\`tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";

function CreateTodo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newTodo: { title: string }) => {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
      if (!res.ok) throw new Error("Failed to create todo");
      return res.json();
    },
    onSuccess: () => {
      // Automatically refresh the todo list query in the background!
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      alert(\`Error: \${error.message}\`);
    },
  });

  return (
    <button
      onClick={() => mutation.mutate({ title: "Buy groceries" })}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? "Adding..." : "Add Todo"}
    </button>
  );
}
\`\`\`

### \`mutate\` vs \`mutateAsync\`:
- **\`mutate()\`**: Fire-and-forget callback style. Does not return a Promise to the caller (errors handled in \`onError\`).
- **\`mutateAsync()\`**: Returns a real Promise that can be awaited in a \`try/catch\` block.

### Interview answer:
\`useMutation\` handles server side effects like creates, updates, and deletes. It is invoked imperatively using \`mutate()\`. On success, its \`onSuccess\` callback typically calls \`queryClient.invalidateQueries()\` to automatically refetch and update related cached queries.`,
    followUps: [
      "What is the difference between mutate and mutateAsync?",
      "Why should mutate usually be preferred over mutateAsync in React event handlers?",
      "What is the onSettled callback in useMutation?"
    ],
    keyPoints: [
      "useMutation handles creates, updates, and deletes imperatively",
      "Triggered with mutate(variables)",
      "Provides isPending, isSuccess, isError status flags",
      "onSuccess typically calls queryClient.invalidateQueries to refresh data"
    ],
    tags: ["useMutation", "mutations", "side-effects", "tanstack-query"],
    relatedLessonSlug: "/learn/tanstack/tan04-usemutation-and-invalidations",
    relatedLessonName: "TAN-04: Mutations & Cache Invalidation Patterns"
  },
  {
    id: "tanstack-q06",
    trackKey: "tanstack",
    category: "Cache Invalidation",
    subtopic: "invalidateQueries",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "How does `queryClient.invalidateQueries()` work, and what is the difference between invalidation and refetching?",
    answer: `### Simple answer:
\`queryClient.invalidateQueries()\` marks cached query data as **stale** and, if the query is currently being rendered on screen by an active component, **automatically refetches it in the background**.

### What happens when you invalidate a query:
1. The cached entry is immediately marked **stale**, overriding any remaining \`staleTime\`.
2. If any component currently on the screen is using that query key, it **refetches immediately in the background**.
3. If no active component is using the query, it does **not** make an immediate network request. Instead, it waits until a component mounts that query in the future.

### Invalidation vs Immediate \`refetch()\`:
- **\`refetch()\`**: Forces an immediate network request right now, regardless of whether any component is mounted or whether the query is stale.
- **\`invalidateQueries()\`**: Smarter! Marks stale and only refetches queries that are actively visible on the user's screen.

### Example:
\`\`\`typescript
// Invalidate all queries matching ['todos']:
await queryClient.invalidateQueries({
  queryKey: ["todos"],
  exact: false, // matches ['todos', 'list'], ['todos', 1]
});

// Exact match only:
await queryClient.invalidateQueries({
  queryKey: ["todos"],
  exact: true, // only matches ['todos'] exactly
});
\`\`\`

### Interview answer:
\`queryClient.invalidateQueries()\` marks queries as stale. For queries currently rendered by active components on the screen, it triggers an immediate background refetch. For inactive queries, it delays refetching until a component mounts them again, preventing wasted network calls.`,
    followUps: [
      "What is the refetchType option in invalidateQueries (active, inactive, all)?",
      "Can invalidateQueries accept predicate filter functions?",
      "How does queryClient.resetQueries() differ from invalidateQueries()?"
    ],
    keyPoints: [
      "Marks cached data as stale immediately",
      "Triggers automatic background refetch for actively mounted queries",
      "Inactive queries are refreshed lazily on next mount",
      "Supports exact matching and fuzzy prefix hierarchy matching"
    ],
    tags: ["invalidation", "invalidateQueries", "caching", "refetching"],
    relatedLessonSlug: "/learn/tanstack/tan04-usemutation-and-invalidations",
    relatedLessonName: "TAN-04: Mutations & Cache Invalidation Patterns"
  },
  {
    id: "tanstack-q07",
    trackKey: "tanstack",
    category: "Mutations & Optimistic UI",
    subtopic: "Optimistic Updates",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "How do you implement Optimistic Updates with `useMutation` in TanStack Query, including automatic rollback on error?",
    answer: `### Simple answer:
An **Optimistic Update** immediately updates the UI with the expected outcome before the server network call finishes, providing an instant (zero-latency) user experience. If the server request fails, it automatically rolls back the cache to the previous state.

### The 4 Steps of Optimistic Updates:
1. **Cancel outgoing refetches:** (\`cancelQueries\`) so an in-flight refetch doesn't overwrite our optimistic update.
2. **Snapshot previous data:** Save the current cache so we can restore it if things fail.
3. **Optimistically update cache:** Use \`setQueryData\` to update the UI instantly.
4. **Rollback onError:** If the request fails, restore the previous snapshot from context.
5. **Always revalidate onSettled:** Refetch to ensure the client is in sync with the real database.

### Implementation:
\`\`\`tsx
const mutation = useMutation({
  mutationFn: updateTodoOnServer,
  onMutate: async (newTodo) => {
    // 1. Cancel in-flight queries:
    await queryClient.cancelQueries({ queryKey: ["todos"] });

    // 2. Snapshot current state:
    const previousTodos = queryClient.getQueryData(["todos"]);

    // 3. Optimistically set new data:
    queryClient.setQueryData(["todos"], (old: any) => [...old, newTodo]);

    // Return context object with snapshot:
    return { previousTodos };
  },
  onError: (err, newTodo, context) => {
    // 4. Rollback to previous state on failure!
    if (context?.previousTodos) {
      queryClient.setQueryData(["todos"], context.previousTodos);
    }
  },
  onSettled: () => {
    // 5. Always refetch to sync with server truth:
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
});
\`\`\`

### Interview answer:
Optimistic updates update the cache via \`onMutate\` using \`queryClient.setQueryData()\` before the network request resolves, returning a snapshot of previous data. If an error occurs, \`onError\` rolls back the cache using that snapshot, and \`onSettled\` invalidates the query to guarantee synchronization with server truth.`,
    followUps: [
      "Why is queryClient.cancelQueries() essential in onMutate?",
      "How do temporary optimistic IDs get replaced with real database IDs?",
      "How does React 19's useOptimistic compare to TanStack Query's onMutate?"
    ],
    keyPoints: [
      "onMutate cancels in-flight queries, snapshots previous cache, and updates UI optimistically",
      "onError receives snapshot context to roll back on failure",
      "onSettled invalidates query to ensure true server state alignment",
      "Essential for instant perceived performance on likes, toggles, and comments"
    ],
    tags: ["optimistic-updates", "useMutation", "rollback", "setQueryData", "ux"],
    relatedLessonSlug: "/learn/tanstack/tan05-optimistic-updates",
    relatedLessonName: "TAN-05: Optimistic Updates & Cache Rollback"
  },
  {
    id: "tanstack-q08",
    trackKey: "tanstack",
    category: "Pagination & Infinite Scrolling",
    subtopic: "useInfiniteQuery",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "How does `useInfiniteQuery` work in TanStack Query for Infinite Scrolling and 'Load More' buttons?",
    answer: `### Simple answer:
\`useInfiniteQuery\` is designed for paginated datasets where new pages are appended to existing pages (like Twitter feeds or product grids) instead of replacing them.

### How it works:
- Returns \`data.pages\` (an array of pages) and \`data.pageParams\`.
- Requires a **\`getNextPageParam\`** function to calculate the cursor or next page number from the last fetched page.
- Triggered by calling **\`fetchNextPage()\`**.

### Example:
\`\`\`tsx
import { useInfiniteQuery } from "@tanstack/react-query";

function InfinitePostList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", "infinite"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(\`/api/posts?page=\${pageParam}&limit=10\`);
      return res.json(); // returns { items: [...], nextPage: 2 }
    },
    initialPageParam: 1, // Required in TanStack Query v5!
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined, // undefined = no more pages!
  });

  return (
    <div>
      {data?.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.items.map((post) => <div key={post.id}>{post.title}</div>)}
        </React.Fragment>
      ))}

      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Load More" : "No more posts"}
      </button>
    </div>
  );
}
\`\`\`

### Interview answer:
\`useInfiniteQuery\` manages append-style paginated data. It requires an \`initialPageParam\` and a \`getNextPageParam\` callback to compute the next cursor. Calling \`fetchNextPage()\` appends the next page to \`data.pages\`, providing flags like \`hasNextPage\` and \`isFetchingNextPage\` for infinite scrolling.`,
    followUps: [
      "How do you connect useInfiniteQuery with IntersectionObserver for automatic infinite scroll?",
      "How does maxPages in TanStack Query v5 prevent memory exhaustion on infinite lists?",
      "What is getPreviousPageParam for bi-directional chat scrolling?"
    ],
    keyPoints: [
      "Stores paginated data as an array of pages (data.pages)",
      "initialPageParam sets starting cursor",
      "getNextPageParam calculates next cursor or returns undefined when finished",
      "fetchNextPage() loads next page; hasNextPage indicates if more pages exist"
    ],
    tags: ["useInfiniteQuery", "infinite-scroll", "pagination", "cursors"],
    relatedLessonSlug: "/learn/tanstack/tan06-infinite-queries-and-pagination",
    relatedLessonName: "TAN-06: Pagination & Infinite Query Streaming"
  },
  {
    id: "tanstack-q09",
    trackKey: "tanstack",
    category: "Performance & Prefetching",
    subtopic: "Prefetching",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "How do you prefetch queries in TanStack Query (`queryClient.prefetchQuery`) to make page transitions feel instantaneous?",
    answer: `### Simple answer:
Prefetching fetches query data into the cache **before the user navigates to the page** (e.g. on button hover or link prefetch). When the user clicks, the target component reads the cached data immediately with **zero loading spinner**.

### Example: Prefetch on Mouse Hover:
\`\`\`tsx
function ProductLink({ productId }: { productId: string }) {
  const queryClient = useQueryClient();

  const handleMouseEnter = () => {
    // Prefetch into cache on hover!
    queryClient.prefetchQuery({
      queryKey: ["product", productId],
      queryFn: () => fetchProduct(productId),
      staleTime: 60 * 1000, // keep fresh for 1 min so it doesn't refetch on click
    });
  };

  return (
    <Link
      href={\`/products/\${productId}\`}
      onMouseEnter={handleMouseEnter}
    >
      View Product
    </Link>
  );
}
\`\`\`

### In Pagination:
When a user is on page 1, automatically prefetch page 2 in the background:
\`\`\`typescript
useEffect(() => {
  if (data?.hasMore) {
    queryClient.prefetchQuery({
      queryKey: ["users", page + 1],
      queryFn: () => fetchUsers(page + 1),
    });
  }
}, [page, data, queryClient]);
\`\`\`

### Interview answer:
\`queryClient.prefetchQuery()\` loads query data into the cache proactively ahead of time (such as on link hover or prefetching the next pagination page). When the user navigates, the target component reads the fresh cache entry instantly with zero loading latency.`,
    followUps: [
      "What happens if prefetchQuery fails with an error (does it throw)?",
      "How does initialData differ from placeholderData in useQuery?",
      "Why is setting a non-zero staleTime important when prefetching?"
    ],
    keyPoints: [
      "prefetchQuery loads data into cache ahead of component mounting",
      "Ideal for mouse hover on links and next pagination pages",
      "Ensure staleTime is > 0 so the component doesn't immediately refetch on click",
      "Silently catches errors without crashing the caller"
    ],
    tags: ["prefetchQuery", "prefetching", "performance", "instant-navigation"],
    relatedLessonSlug: "/learn/tanstack/tan07-prefetching-and-ssr",
    relatedLessonName: "TAN-07: Prefetching, Hydration & SSR Integration"
  },
  {
    id: "tanstack-q10",
    trackKey: "tanstack",
    category: "SSR & Next.js",
    subtopic: "SSR Hydration",
    type: "architecture",
    difficulty: "hard",
    source: "curated",
    question: "How do you integrate TanStack Query with Next.js App Router using `HydrationBoundary` and `dehydrate`?",
    answer: `### Simple answer:
To prevent double-fetching and loading flickers when using TanStack Query in Next.js Server Components, you fetch data on the server, **dehydrate** the query cache into serialized JSON, and **hydrate** it on the client using **\`<HydrationBoundary>\`**.

### Architecture Workflow:
1. Server Component creates a per-request \`QueryClient\`.
2. Server Component calls \`prefetchQuery()\` to fetch and populate the cache on the server.
3. Server Component wraps Client Components in \`<HydrationBoundary state={dehydrate(queryClient)}>\`.
4. The Client Component calls standard \`useQuery()\`—and gets the pre-fetched data **instantaneously** with no client network request!

### Implementation in Next.js App Router:
\`\`\`tsx
// app/posts/page.tsx (Server Component):
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { PostsList } from "./PostsList"; // Client component

export default async function PostsPage() {
  const queryClient = new QueryClient();

  // Prefetch data on the server:
  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: fetchPostsOnServer,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsList />
    </HydrationBoundary>
  );
}

// app/posts/PostsList.tsx (Client Component):
"use client";
import { useQuery } from "@tanstack/react-query";

export function PostsList() {
  // Reads directly from hydrated server cache with NO loading spinner!
  const { data } = useQuery({ queryKey: ["posts"], queryFn: fetchPostsClient });
  return <ul>{data.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}
\`\`\`

### Interview answer:
To integrate TanStack Query with Next.js App Router, we prefetch data on the server using a per-request \`QueryClient\`, serialize the cache via \`dehydrate()\`, and pass it to \`<HydrationBoundary>\`. Client components calling \`useQuery()\` hydrate with this pre-rendered data immediately without duplicate client-side network requests.`,
    followUps: [
      "Why must a new QueryClient be created per request on the server to prevent cross-request cache leaks?",
      "How does TanStack Query's React Query Streamed Suspense work in React 18+?",
      "When might Next.js native fetch with React Server Components be simpler than TanStack Query?"
    ],
    keyPoints: [
      "Always create a new QueryClient per server request to prevent data leakage between users",
      "dehydrate() serializes the server cache into transferrable JSON",
      "HydrationBoundary hydrates client-side queries immediately",
      "Client components call useQuery with zero initial loading state"
    ],
    tags: ["ssr", "hydration", "dehydrate", "nextjs", "hydration-boundary"],
    relatedLessonSlug: "/learn/tanstack/tan07-prefetching-and-ssr",
    relatedLessonName: "TAN-07: Prefetching, Hydration & SSR Integration"
  }
];
