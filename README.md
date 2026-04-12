# Next.js 14+ & TanStack Query v5 Learning Project

A comprehensive, production-ready learning project that teaches **Next.js 14+ (App Router)** and **TanStack Query v5** from zero to advanced.

Each feature teaches one core concept with working code, detailed explanations, and real-world use cases.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Visit **http://localhost:3000** in your browser. You'll be redirected to **/learn** where you can explore all features.

## 📚 Learning Path

### **Foundation (F-01 to F-06)**
Learn the core TanStack Query concepts:
- **F-01**: Project setup with QueryClientProvider
- **F-02**: useQuery basics (fetching, loading, errors, data)
- **F-03**: Query keys and caching mechanics
- **F-04**: staleTime & gcTime (controlling freshness and garbage collection)
- **F-05**: Dependent queries (conditional fetching)
- **F-06**: Parallel queries (multiple independent requests)

### **Mutations (M-01 to M-03)**
Write data with full control:
- **M-01**: useMutation basics (POST, PUT, DELETE)
- **M-02**: Optimistic updates (update UI before server confirms)
- **M-03**: Query invalidation (keep cache in sync)

### **Pagination & Infinite Scroll (P-01 to P-03)**
Handle large datasets:
- **P-01**: Traditional pagination with page numbers
- **P-02**: Smooth transitions with placeholderData
- **P-03**: useInfiniteQuery for infinite scroll

### **Advanced Patterns (A-01 to A-10)**
Production-grade techniques:
- **A-01**: Prefetching (load data before needed)
- **A-02**: SSR with HydrationBoundary (Next.js server integration)
- **A-03**: Suspense integration (React Suspense boundaries)
- **A-04**: Select transform (filter/transform data in query)
- **A-05**: Enabled flag (conditional query execution)
- **A-06**: Polling (auto-refresh data)
- **A-07**: Global error handling (centralized error logic)
- **A-08**: Query cancellation (AbortSignal)
- **A-09**: Complex mutations (multi-step operations)
- **A-10**: Custom hooks (reusable query/mutation logic)

## 📂 Project Structure

```
app/
  layout.tsx                    ← QueryClientProvider root
  page.tsx                      ← Redirects to /learn
  globals.css                   ← Tailwind styles
  learn/
    page.tsx                    ← Feature index/hub
    (foundations)/
      f01-setup/page.tsx
      f02-use-query/page.tsx
      ...
    (mutations)/
      m01-use-mutation/page.tsx
      ...
    (pagination)/
      p01-paginated/page.tsx
      ...
    (advanced)/
      a01-prefetching/page.tsx
      ...

lib/
  query-client.ts              ← TanStack Query config
  api.ts                       ← All fetch functions

components/
  nav.tsx                      ← Navigation component
  code-note.tsx                ← Explanation block display

hooks/                         ← App can add custom hooks here

tsconfig.json                  ← TypeScript config
tailwind.config.ts             ← Tailwind CSS config
next.config.js                 ← Next.js config
package.json                   ← Dependencies
```

## 🔑 Key Concepts Explained

### What Each File Contains

Every feature page starts with a **large comment block** explaining:
1. **TANSTACK QUERY CONCEPT** — What TanStack Query idea is taught
2. **HOW IT WORKS UNDER THE HOOD** — Internal mechanics (no hand-waving)
3. **NEXT.JS CONCEPT** — Relevant Next.js 14 App Router pattern
4. **WHEN TO USE THIS** — Real-world use cases

### Production-Quality Code

- Fully typed with **TypeScript**
- No magic values or placeholder code
- Follows best practices
- Code examples show complete, working implementations

## 🌐 API

This project uses **JSONPlaceholder** — a free mock API:
- **Base URL**: https://jsonplaceholder.typicode.com/
- **No authentication needed**
- **Resources**: /posts, /users, /comments

All fetch functions are in `lib/api.ts`.

## 🛠 Development

### Start Dev Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## 📖 How to Use This Project

### 1. **Follow the Learning Path**
Start with **F-01** and progress sequentially. Each feature builds on previous concepts.

### 2. **Read the Explanation Blocks**
Every page has a detailed comment block at the top. Read it first to understand the concept.

### 3. **Study the Code**
Each example is concise, typed, and production-ready. Understand how it works.

### 4. **Check React Query Devtools**
Open the **React Query Devtools** (bottom right corner) to inspect:
- Active queries
- Query cache
- Stale states
- Refetch behavior
- Mutations

### 5. **Experiment**
Modify the code, change parameters, trigger mutations. Learn by doing!

### 6. **Reference the Code**
Use this project as a reference when building real applications.

## 🎯 Key Takeaways

### TanStack Query Fundamentals
- **useQuery** for fetching (GET)
- **useMutation** for writing (POST, PUT, DELETE)
- **Query keys** for caching and invalidation
- **staleTime & gcTime** control cache behavior
- **Dependent/Parallel** queries for advanced flows

### Next.js 14 Integration
- **App Router** with route groups
- **Server Components** by default, **Client Components** for interactivity
- **Data fetching strategies**: SSR (server), CSR (client), Streaming
- **Suspense** for loading states
- **Error boundaries** for error handling

### Production Patterns
- **Optimistic updates** for better UX
- **Query invalidation** for cache synchronization
- **Prefetching** for perceived performance
- **Error handling** globally and per-query
- **Custom hooks** for reusability and testing

## 🚀 Next Steps After Learning

### 1. Build a Real App
Use these patterns to build a Next.js app with:
- **Server Components** for initial data
- **HydrationBoundary** for SSR
- **Client mutations** for interactivity
- **Error boundaries** for resilience

### 2. Add a Backend
Replace JSONPlaceholder with your own API:
- Update `lib/api.ts` fetch URLs
- Patterns remain the same

### 3. Explore Advanced Topics
- WebSockets for real-time data
- Optimistic vs pessimistic updates
- Offline support with Persist
- React Native with TanStack Query

### 4. Join the Community
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Next.js Docs](https://nextjs.org/docs)
- [TanStack Discord](https://tlinz.com/discord)

## 📝 Tips & Tricks

### Debug with React Query Devtools
```typescript
// Devtools open by default on localhost, disabled in production
<ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
```

### Use Query Keys Consistently
```typescript
// Good: Hierarchical, predictable
const POSTS_KEYS = {
  all: ["posts"],
  lists: () => [...POSTS_KEYS.all, "list"],
  list: (filters) => [...POSTS_KEYS.lists(), filters],
  detail: (id) => [...POSTS_KEYS.all, "detail", id],
};
```

### Prefetch on Navigation
```typescript
const router = useRouter();
const handleNavigate = () => {
  queryClient.prefetchQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
  });
  router.push(`/post/${id}`);
};
```

### Global Error Handler
Set in `lib/query-client.ts`'s `QueryClient` default options:
```typescript
defaultOptions: {
  queries: {
    onError: (error) => {
      console.error(error);
      // Show toast, log to service, redirect, etc.
    },
  },
}
```

## ❓ Troubleshooting

### Query not refetching?
Check `staleTime` — if data is fresh, it won't refetch. Lower it or invalidate explicitly.

### Mutations not showing success/error?
Ensure you have `onSuccess` and `onError` handlers, or check component state after mutation.

### HydrationBoundary not working?
Ensure root layout wraps app with `QueryClientProvider`. SSR requires server-side `prefetchQuery` + dehydrate.

## 📄 License

This project is open source and free to use for learning.

## 🤝 Contributing

Found an issue? Want to improve an explanation? Create an issue or PR!

---

**Happy Learning!** 🎓

Start with the [Learn Hub](/learn) and explore each feature at your own pace.
# LearnCraft
