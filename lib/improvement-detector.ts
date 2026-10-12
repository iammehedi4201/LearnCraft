/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * IMPROVEMENT DETECTOR — Content Location Engine
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * Analyzes pasted TSX section content and identifies:
 *   1. Which topic it belongs to (nestjs, nextjs, tanstack, etc.)
 *   2. Which lesson it belongs to (nj02-oop-foundations, etc.)
 *   3. Which specific section file it targets (methods-section.tsx, etc.)
 *
 * Detection strategy (3-pass):
 *   Pass 1 — Topic detection via keyword scoring
 *   Pass 2 — Function export name → section file matching
 *   Pass 3 — SectionContainer title matching across all lesson files
 *
 * Returns a DetectionResult with a confidence score (0-100).
 * If confidence < 70, the UI falls back to manual picker.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DetectedTopic {
  id: string;
  title: string;
  dirPath: string; // e.g. "app/learn/nestjs"
}

export interface DetectedLesson {
  slug: string;     // e.g. "nj02-oop-foundations"
  name: string;     // e.g. "OOP Foundations"
  dirPath: string;  // e.g. "app/learn/nestjs/nj02-oop-foundations"
}

export interface DetectedSection {
  fileName: string;     // e.g. "methods-section.tsx"
  exportName: string;   // e.g. "MethodsSection"
  title: string;        // e.g. "Methods"  (from SectionContainer title="...")
  sectionNumber: number; // e.g. 4
  filePath: string;     // full relative path
}

export interface DetectionResult {
  confidence: number;         // 0-100
  topic: DetectedTopic | null;
  lesson: DetectedLesson | null;
  section: DetectedSection | null;
  /** Reasons explaining the confidence score (for debug display) */
  signals: string[];
  /** If true, the UI should prompt for manual confirmation even if confident */
  requiresConfirmation: boolean;
}

export interface SectionFileMeta {
  fileName: string;
  exportName: string;
  title: string;
  sectionNumber: number;
  filePath: string;       // relative to project root
  lessonSlug: string;
  topicId: string;
}

// ─── Topic keyword maps ────────────────────────────────────────────────────────

const TOPIC_KEYWORDS: Record<string, string[]> = {
  nestjs: [
    "@Controller", "@Injectable", "@Module", "@Get", "@Post", "@Put", "@Delete",
    "@Patch", "@Body", "@Param", "@Query", "@Headers", "@UseGuards", "@UsePipes",
    "@UseInterceptors", "@UseFilters", "NestFactory", "NestModule", "APP_GUARD",
    "APP_PIPE", "APP_INTERCEPTOR", "APP_FILTER", "ConfigModule", "TypeOrmModule",
    "PrismaService", "AuthGuard", "JwtModule", "PassportModule", "ValidationPipe",
    "HttpException", "HttpStatus", "InjectRepository", "@nestjs/",
    "MiddlewareConsumer", "RequestMethod", "ExecutionContext", "CallHandler",
    "ExceptionFilter", "ArgumentsHost",
  ],
  nextjs: [
    "getServerSideProps", "getStaticProps", "getStaticPaths", "useRouter",
    "next/navigation", "next/link", "next/image", "next/font", "App Router",
    "Server Component", "Client Component", "use client", "use server",
    "generateMetadata", "HydrationBoundary", "prefetchQuery", "Suspense",
    "loading.tsx", "error.tsx", "layout.tsx", "page.tsx", "middleware.ts",
    "next/headers", "cookies()", "headers()", "revalidatePath", "revalidateTag",
  ],
  tanstack: [
    "useQuery", "useMutation", "useInfiniteQuery", "useQueries", "QueryClient",
    "QueryClientProvider", "useQueryClient", "queryKey", "queryFn", "staleTime",
    "gcTime", "invalidateQueries", "prefetchQuery", "dehydrate", "hydrate",
    "HydrationBoundary", "onSuccess", "onError", "onSettled", "isLoading",
    "isFetching", "isError", "isSuccess", "refetch", "@tanstack/react-query",
    "fetchNextPage", "hasNextPage", "isFetchingNextPage", "pageParam",
  ],
  typescript: [
    "interface ", "type ", "generic", "Record<", "Partial<", "Required<",
    "Readonly<", "Pick<", "Omit<", "Exclude<", "Extract<", "NonNullable<",
    "ReturnType<", "Parameters<", "ConstructorParameters<", "InstanceType<",
    "keyof ", "typeof ", "infer ", "satisfies ", "as const", "declare ",
    "namespace ", "enum ", "abstract class",
  ],
};

// ─── Known lesson metadata (generated from topic-registry.ts structure) ────────

export const KNOWN_TOPIC_LESSONS: Record<
  string,
  Array<{ slug: string; name: string; keywords: string[] }>
> = {
  nestjs: [
    { slug: "nj01-typescript-essentials", name: "TypeScript Essentials", keywords: ["typescript", "types", "interfaces", "enums", "generics"] },
    { slug: "nj02-oop-foundations", name: "OOP Foundations", keywords: ["class", "constructor", "inheritance", "encapsulation", "polymorphism", "abstraction", "OOP", "object", "extends", "super"] },
    { slug: "nj03-decorators", name: "Decorators Deep Dive", keywords: ["@", "decorator", "metadata", "reflect", "class decorator", "method decorator", "property decorator", "parameter decorator"] },
    { slug: "nj04-solid", name: "SOLID Principles", keywords: ["SOLID", "single responsibility", "open closed", "liskov", "interface segregation", "dependency inversion"] },
    { slug: "nj05-setup", name: "NestJS Setup & CLI", keywords: ["nest new", "CLI", "project setup", "main.ts", "NestFactory.create"] },
    { slug: "nj06-modules", name: "Modules & Architecture", keywords: ["@Module", "imports", "exports", "providers", "controllers", "AppModule", "Feature module"] },
    { slug: "nj07-controllers", name: "Controllers & Routing", keywords: ["@Controller", "@Get", "@Post", "@Put", "@Delete", "route", "endpoint"] },
    { slug: "nj08-services", name: "Services & Business Logic", keywords: ["@Injectable", "service", "business logic", "provider"] },
    { slug: "nj09-dependency-injection", name: "Dependency Injection", keywords: ["DI", "dependency injection", "inject", "provider", "token", "useValue", "useClass", "useFactory"] },
    { slug: "nj10-dto-validation", name: "DTOs & Validation", keywords: ["DTO", "class-validator", "class-transformer", "IsString", "IsEmail", "IsNumber", "@IsNotEmpty"] },
    { slug: "nj11-request-lifecycle", name: "Request Lifecycle", keywords: ["lifecycle", "middleware", "guard", "interceptor", "pipe", "exception filter", "request", "response"] },
    { slug: "nj12-pipes", name: "Pipes & Transformation", keywords: ["@UsePipes", "PipeTransform", "ValidationPipe", "ParseIntPipe", "transform"] },
    { slug: "nj13-guards", name: "Guards & Authorization", keywords: ["@UseGuards", "CanActivate", "AuthGuard", "RolesGuard", "ExecutionContext"] },
    { slug: "nj14-interceptors", name: "Interceptors & Logging", keywords: ["@UseInterceptors", "NestInterceptor", "CallHandler", "Observable", "tap", "map"] },
    { slug: "nj15-exception-filters", name: "Exception Filters", keywords: ["@Catch", "ExceptionFilter", "ArgumentsHost", "HttpException", "HttpStatus"] },
    { slug: "nj16-middleware", name: "Middleware", keywords: ["NestMiddleware", "use()", "MiddlewareConsumer", "configure", "apply"] },
    { slug: "nj17-custom-decorators", name: "Custom Decorators", keywords: ["createParamDecorator", "SetMetadata", "Reflector", "applyDecorators", "custom decorator"] },
    { slug: "nj18-auth-jwt", name: "Auth & JWT Strategy", keywords: ["JWT", "passport", "strategy", "bearer", "token", "sign", "verify", "JwtService"] },
    { slug: "nj19-rbac", name: "RBAC", keywords: ["role", "permission", "RBAC", "role-based", "RolesGuard", "@Roles"] },
    { slug: "nj20-security", name: "Security", keywords: ["CORS", "helmet", "rate limit", "throttle", "csrf", "xss", "security"] },
    { slug: "nj21-database-prisma", name: "Database & Prisma", keywords: ["Prisma", "PrismaClient", "schema.prisma", "datasource", "generator", "model", "migrate"] },
    { slug: "nj22-entities-relations", name: "Entities & Relations", keywords: ["relation", "one-to-many", "many-to-many", "one-to-one", "include", "connect", "nested"] },
    { slug: "nj23-migrations-seeding", name: "Migrations & Seeding", keywords: ["migration", "seed", "prisma migrate", "prisma db seed", "db push"] },
    { slug: "nj24-pagination-filtering", name: "Pagination & Filtering", keywords: ["pagination", "skip", "take", "cursor", "where", "orderBy", "filter"] },
    { slug: "nj25-serialization", name: "Serialization", keywords: ["serialize", "Exclude", "Expose", "plainToClass", "ClassSerializerInterceptor", "Interceptor"] },
    { slug: "nj26-config", name: "Configuration", keywords: ["ConfigModule", "ConfigService", "env", ".env", "process.env", "forRoot", "isGlobal"] },
    { slug: "nj27-logging", name: "Logging", keywords: ["Logger", "log", "warn", "error", "debug", "verbose", "LoggerService"] },
    { slug: "nj28-testing", name: "Testing", keywords: ["describe", "it", "expect", "jest", "Test.createTestingModule", "supertest", "e2e", "unit test"] },
    { slug: "nj29-swagger", name: "Swagger & OpenAPI", keywords: ["@ApiProperty", "@ApiOperation", "@ApiTags", "SwaggerModule", "DocumentBuilder", "swagger"] },
    { slug: "nj30-file-uploads", name: "File Uploads", keywords: ["multer", "FileInterceptor", "FilesInterceptor", "UploadedFile", "storage", "diskStorage"] },
    { slug: "nj31-caching", name: "Caching", keywords: ["cache", "CacheModule", "CacheInterceptor", "TTL", "Redis", "CacheManagerService"] },
    { slug: "nj32-deployment", name: "Deployment", keywords: ["docker", "Dockerfile", "docker-compose", "production", "deploy", "PM2", "health check"] },
  ],
  nextjs: [
    { slug: "nx01-app-router", name: "App Router Fundamentals", keywords: ["App Router", "app directory", "page.tsx", "layout.tsx"] },
    { slug: "nx02-routing", name: "File-Based Routing", keywords: ["routing", "file-based", "dynamic route", "nested route", "[id]", "route group"] },
    { slug: "nx03-server-client", name: "Server vs Client Components", keywords: ["Server Component", "Client Component", "use client", "use server", "boundary"] },
    { slug: "nx04-layouts", name: "Layouts & Nested Structures", keywords: ["layout", "RootLayout", "nested layout", "template"] },
    { slug: "nx05-dynamic", name: "Dynamic Routing", keywords: ["[slug]", "[id]", "generateStaticParams", "dynamic segment", "catch-all"] },
    { slug: "nx06-server-fetch", name: "Server-side Data Fetching", keywords: ["fetch", "async component", "cache", "revalidate", "server-side"] },
    { slug: "nx07-client-fetch", name: "Client-side Data Fetching", keywords: ["useEffect", "useState", "client fetch", "SWR", "loading state"] },
    { slug: "nx08-errors", name: "Error Boundaries", keywords: ["error.tsx", "ErrorBoundary", "reset", "notFound()", "redirect()"] },
    { slug: "nx09-loading", name: "Streaming & Loading UI", keywords: ["loading.tsx", "Suspense", "streaming", "skeleton"] },
    { slug: "nx10-route-handlers", name: "Route Handlers", keywords: ["route.ts", "GET", "POST", "NextRequest", "NextResponse", "API route"] },
    { slug: "nx11-middleware", name: "Edge Middleware", keywords: ["middleware.ts", "NextResponse.next", "matcher", "edge runtime"] },
    { slug: "nx12-metadata", name: "SEO & Metadata", keywords: ["generateMetadata", "metadata", "title", "description", "openGraph", "twitter"] },
    { slug: "nx13-images", name: "Image Optimization", keywords: ["next/image", "Image", "fill", "sizes", "priority", "blur"] },
    { slug: "nx14-fonts", name: "Font Optimization", keywords: ["next/font", "Inter", "localFont", "variable font", "font-display"] },
    { slug: "nx15-scripts", name: "Script Loading", keywords: ["next/script", "Script", "beforeInteractive", "afterInteractive", "lazyOnload"] },
    { slug: "nx16-ssg", name: "Static Site Generation", keywords: ["generateStaticParams", "SSG", "static", "build time", "getStaticProps"] },
    { slug: "nx17-isr", name: "ISR", keywords: ["revalidate", "ISR", "on-demand", "Incremental Static Regeneration"] },
    { slug: "nx18-caching", name: "Next.js Caching", keywords: ["cache", "force-cache", "no-store", "unstable_cache", "revalidateTag", "revalidatePath"] },
    { slug: "nx19-env", name: "Environment Variables", keywords: [".env", "NEXT_PUBLIC_", "process.env", "environment variable"] },
    { slug: "nx20-deployment", name: "Deployment", keywords: ["Vercel", "docker", "output: export", "standalone", "build", "deploy"] },
  ],
  tanstack: [
    { slug: "tq01-setup", name: "Setup & QueryClient", keywords: ["QueryClient", "QueryClientProvider", "setup"] },
    { slug: "tq02-use-query", name: "useQuery Basics", keywords: ["useQuery", "data", "isLoading", "isError"] },
    { slug: "tq03-queries-keys", name: "Query Keys", keywords: ["queryKey", "array key", "hierarchical", "cache key"] },
    { slug: "tq04-staletime-gctime", name: "staleTime vs gcTime", keywords: ["staleTime", "gcTime", "cacheTime", "fresh", "stale", "garbage"] },
    { slug: "tq05-dependent", name: "Dependent Queries", keywords: ["enabled", "dependent", "serial", "conditional query"] },
    { slug: "tq06-parallel", name: "Parallel Queries", keywords: ["useQueries", "parallel", "multiple queries"] },
    { slug: "tq07-mutation-basics", name: "useMutation", keywords: ["useMutation", "mutate", "mutateAsync", "onSuccess", "onError"] },
    { slug: "tq08-optimistic", name: "Optimistic Updates", keywords: ["optimistic", "onMutate", "onError rollback", "cancelQueries", "setQueryData"] },
    { slug: "tq09-invalidation", name: "Query Invalidation", keywords: ["invalidateQueries", "refetch", "cache sync", "invalidation"] },
    { slug: "tq10-pagination", name: "Pagination", keywords: ["page", "pageParam", "keepPreviousData", "placeholderData", "pagination"] },
    { slug: "tq11-placeholder-data", name: "Placeholder Data", keywords: ["placeholderData", "initialData", "placeholder", "skeleton"] },
    { slug: "tq12-infinite", name: "Infinite Scroll", keywords: ["useInfiniteQuery", "fetchNextPage", "hasNextPage", "infinite scroll", "cursor"] },
    { slug: "tq13-prefetching", name: "Prefetching", keywords: ["prefetchQuery", "prefetch", "hover", "route warmup"] },
    { slug: "tq14-select", name: "Data Transformation", keywords: ["select", "transform", "filter", "computed", "derived"] },
    { slug: "tq15-enabled", name: "Conditional Queries", keywords: ["enabled", "conditional", "skip", "dependent enabled"] },
    { slug: "tq16-polling", name: "Polling", keywords: ["refetchInterval", "polling", "auto-refresh", "real-time", "interval"] },
    { slug: "tq17-error-handling", name: "Error Handling", keywords: ["retry", "retryDelay", "onError", "error boundary", "global error"] },
    { slug: "tq18-cancellation", name: "Cancellation", keywords: ["AbortSignal", "signal", "cancel", "abort"] },
    { slug: "tq19-mutations", name: "Complex Mutations", keywords: ["complex mutation", "multi-step", "orchestration", "sequential mutation"] },
    { slug: "tq20-custom-hooks", name: "Custom Hooks", keywords: ["custom hook", "useX", "reusable", "encapsulate query"] },
    { slug: "tq21-suspense", name: "React Suspense", keywords: ["useSuspenseQuery", "Suspense", "ErrorBoundary", "suspense mode"] },
    { slug: "tq22-ssr", name: "SSR Dehydration", keywords: ["dehydrate", "hydrate", "HydrationBoundary", "prefetchQuery", "server-side"] },
  ],
};

// ─── Utility: string similarity (word overlap) ───────────────────────────────

export function wordOverlapSimilarity(a: string, b: string): number {
  const wordsA = new Set((a.toLowerCase().match(/\b\w{3,}\b/g) ?? []).slice(0, 500));
  const wordsB = new Set((b.toLowerCase().match(/\b\w{3,}\b/g) ?? []).slice(0, 500));
  if (wordsA.size === 0 && wordsB.size === 0) return 0;
  let intersection = 0;
  for (const w of wordsA) if (wordsB.has(w)) intersection++;
  const union = wordsA.size + wordsB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

// ─── Pass 1: Topic Detection ──────────────────────────────────────────────────

export function detectTopic(content: string): { topicId: string; score: number; signals: string[] } {
  const scores: Record<string, { count: number; matched: string[] }> = {};

  for (const [topicId, keywords] of Object.entries(TOPIC_KEYWORDS)) {
    scores[topicId] = { count: 0, matched: [] };
    for (const kw of keywords) {
      if (content.includes(kw)) {
        scores[topicId].count++;
        scores[topicId].matched.push(kw);
      }
    }
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1].count - a[1].count);
  const best = sorted[0];
  const runner = sorted[1];

  // Must have meaningful separation from 2nd place
  const margin = best[1].count - (runner?.[1].count ?? 0);
  const rawScore = Math.min(best[1].count * 8, 60); // max 60 from keywords
  const marginBonus = margin >= 3 ? 15 : margin >= 2 ? 8 : margin === 1 ? 4 : 0;

  return {
    topicId: best[0],
    score: rawScore + marginBonus,
    signals: best[1].matched.slice(0, 5).map((m) => `Keyword matched: "${m}"`),
  };
}

// ─── Pass 2: Export function name → section file matching ─────────────────────

export function detectExportName(content: string): string | null {
  // Match "export function FooBarSection("
  const match = content.match(/export\s+function\s+([A-Z][a-zA-Z]+Section)\s*\(/);
  return match?.[1] ?? null;
}

/** Convert "MethodsSection" → "methods-section" */
export function exportNameToSlug(exportName: string): string {
  return exportName
    .replace(/Section$/, "")
    .replace(/([A-Z])/g, (_match, ch, offset) => (offset > 0 ? "-" : "") + ch.toLowerCase())
    .toLowerCase();
}

// ─── Pass 3: SectionContainer title extraction ────────────────────────────────

export function extractSectionContainerTitle(content: string): string | null {
  const match = content.match(/SectionContainer\s+number=\{(\d+)\}\s+title="([^"]+)"/);
  return match?.[2] ?? null;
}

export function extractSectionContainerNumber(content: string): number {
  const match = content.match(/SectionContainer\s+number=\{(\d+)\}/);
  return match ? parseInt(match[1], 10) : 0;
}

// ─── Main Detection Function ──────────────────────────────────────────────────

/**
 * Analyze pasted TSX content and return a DetectionResult.
 *
 * @param content - The full pasted TSX section file content
 * @param availableSections - List of known section files (fetched from API /api/improve/scan)
 */
export function detectImprovement(
  content: string,
  availableSections: SectionFileMeta[]
): DetectionResult {
  const signals: string[] = [];
  let confidence = 0;

  // ── Pass 1: Topic Detection ──
  const { topicId, score: topicScore, signals: topicSignals } = detectTopic(content);
  confidence += topicScore;
  signals.push(...topicSignals);

  const topicMeta: Record<string, { id: string; title: string }> = {
    nestjs: { id: "nestjs", title: "NestJS" },
    nextjs: { id: "nextjs", title: "Next.js" },
    tanstack: { id: "tanstack", title: "TanStack Query" },
    typescript: { id: "typescript", title: "TypeScript" },
  };
  const topic = topicMeta[topicId]
    ? { ...topicMeta[topicId], dirPath: `app/learn/${topicId}` }
    : null;

  // ── Pass 2: Function Export Name Matching ──
  const exportName = detectExportName(content);
  let section: DetectedSection | null = null;
  let lesson: DetectedLesson | null = null;

  if (exportName) {
    signals.push(`Export function detected: "${exportName}"`);
    const slug = exportNameToSlug(exportName); // e.g. "methods"
    const fileBaseName = `${slug}-section.tsx`;    // e.g. "methods-section.tsx"

    // Find all sections with this file name (possibly across lessons)
    const candidates = availableSections.filter(
      (s) =>
        s.fileName === fileBaseName ||
        s.exportName === exportName
    );

    if (candidates.length === 1) {
      // Perfect unambiguous match
      const c = candidates[0];
      section = c;
      confidence += 25;
      signals.push(`Unique section file matched: "${c.fileName}" in ${c.lessonSlug}`);

      // Derive lesson from the section match
      const lessonInfo = KNOWN_TOPIC_LESSONS[topicId]?.find((l) => l.slug === c.lessonSlug);
      if (lessonInfo) {
        lesson = {
          slug: c.lessonSlug,
          name: lessonInfo.name,
          dirPath: `app/learn/${topicId}/${c.lessonSlug}`,
        };
        confidence += 10;
      }
    } else if (candidates.length > 1) {
      signals.push(`Ambiguous: "${fileBaseName}" exists in ${candidates.length} lessons — using content similarity to disambiguate`);
    }
  }

  // ── Pass 3: SectionContainer title matching ──
  const containerTitle = extractSectionContainerTitle(content);
  const containerNumber = extractSectionContainerNumber(content);

  if (containerTitle) {
    signals.push(`SectionContainer title: "${containerTitle}" (section #${containerNumber})`);

    if (!section) {
      // Try to find by title across all sections
      const byTitle = availableSections.filter(
        (s) => s.title.toLowerCase() === containerTitle.toLowerCase()
      );
      if (byTitle.length === 1) {
        section = byTitle[0];
        confidence += 20;
        signals.push(`Matched section by title: "${containerTitle}"`);
      }
    } else {
      // Verify title matches the detected section (bonus confidence)
      if (section.title.toLowerCase() === containerTitle.toLowerCase()) {
        confidence += 10;
        signals.push(`Title match confirmed: "${containerTitle}"`);
      }
    }
  }

  // ── Pass 4: Lesson keyword matching (if lesson not yet resolved) ──
  if (!lesson && topic) {
    const topicLessons = KNOWN_TOPIC_LESSONS[topicId] ?? [];
    const scored = topicLessons.map((l) => {
      const kw = l.keywords.filter((k) => content.toLowerCase().includes(k.toLowerCase()));
      return { ...l, score: kw.length, matched: kw };
    });
    scored.sort((a, b) => b.score - a.score);

    const bestLesson = scored[0];
    if (bestLesson && bestLesson.score >= 2) {
      lesson = {
        slug: bestLesson.slug,
        name: bestLesson.name,
        dirPath: `app/learn/${topicId}/${bestLesson.slug}`,
      };
      confidence += Math.min(bestLesson.score * 4, 15);
      signals.push(
        `Lesson matched by keywords (${bestLesson.score} hits): ${bestLesson.matched.slice(0, 3).join(", ")}`
      );

      // If still no section, try to find it within this lesson's sections
      if (!section) {
        const lessonSections = availableSections.filter((s) => s.lessonSlug === bestLesson.slug);
        if (lessonSections.length > 0 && exportName) {
          const fileBase = `${exportNameToSlug(exportName)}-section.tsx`;
          const found = lessonSections.find((s) => s.fileName === fileBase);
          if (found) {
            section = found;
            confidence += 15;
            signals.push(`Section found in matched lesson: "${found.fileName}"`);
          }
        }
      }
    }
  }

  // ── Content similarity fallback for section ──
  if (!section && lesson && availableSections.length > 0) {
    const lessonSections = availableSections.filter((s) => s.lessonSlug === lesson?.slug);
    // Without file content from the server, we can't do full similarity here.
    // The API /api/improve/detect does the heavy similarity pass server-side.
    // This client-side version does best-effort matching.
    if (lessonSections.length === 1) {
      section = lessonSections[0];
      confidence += 5;
      signals.push(`Only one section in lesson — defaulting to: "${section.fileName}"`);
    }
  }

  // Cap confidence at 99 (100 = perfect manual confirmation)
  confidence = Math.min(confidence, 99);

  return {
    confidence,
    topic,
    lesson,
    section: section as DetectedSection | null,
    signals,
    requiresConfirmation: confidence < 80,
  };
}
