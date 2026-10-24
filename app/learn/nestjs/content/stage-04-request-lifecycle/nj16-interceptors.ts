import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nj16InterceptorsContent: StandardLessonContent = {
  slug: "nj16-interceptors",
  code: "NJ-16",
  title: "Interceptors",
  subtitle: "An interceptor can run code before and after a controller method executes.",
  difficulty: "Moderate",
  scenario: {
    question: "You want to measure how long controller handlers take without adding timing code to every controller. What could you use?",
    answer: "An interceptor can share that timing logic across selected routes.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
    { id: "part3", label: "Real-World Scenarios & Practice", tag: "SCENARIOS & PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
    { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
  ],
  part1: {
    title: "Interceptors",
    bigPicture: "An interceptor can run code before and after a controller method. It is useful for shared tasks such as measuring response time or changing the shape of returned data.",
    analogy: "An interceptor is like a stopwatch and gift-wrapping station. Before the package is shipped, the timer starts. After the product is made, the interceptor wraps it in a gift box, calculates total handling time, and sends it on.",
    codeSnippet: "import {\n  CallHandler,\n  ExecutionContext,\n  Injectable,\n  NestInterceptor,\n} from '@nestjs/common';\nimport { Observable, tap } from 'rxjs';\n\n@Injectable()\nexport class LoggingInterceptor implements NestInterceptor {\n  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {\n    const now = Date.now();\n    return next\n      .handle()\n      .pipe(tap(() => console.log(`Done in ${Date.now() - now}ms`)));\n  }\n}",
    breakdownTitle: "How the Example Works Step-by-Step",
    breakdownItems: [
      {
            "title": "1. NestInterceptor Interface",
            "desc": "Requires the intercept(context, next) method."
      },
      {
            "title": "2. Before-Handler Logic",
            "desc": "const now = Date.now() captures the start time before the controller method runs."
      },
      {
            "title": "3. next.handle()",
            "desc": "Invokes the route handler and returns an RxJS Observable."
      },
      {
            "title": "4. tap() Operator",
            "desc": "Runs after the handler finishes successfully, logging the elapsed time."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "Wrap-Around Execution Rule",
      "content": "Use interceptors when you need logic that spans both before and after method execution (e.g. timing, response caching, response envelope formatting)."
},
    cards: [
      {
            "number": "01",
            "tag": "TIMING",
            "title": "Performance & Benchmarking",
            "description": "Measure execution duration across endpoints to identify slow database queries.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "TRANSFORM",
            "title": "Response Transformation",
            "description": "Wrap raw handler output into a consistent envelope like { data: result, success: true }.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "RXJS",
            "title": "RxJS Operators",
            "description": "Harness the power of RxJS operators like map, tap, timeout, and catchError.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Common use cases for interceptors:",
    points: [
      {
            "title": "1. Global Response Formatting",
            "content": "Transform all API responses into standard { success: true, timestamp, data } structures."
      },
      {
            "title": "2. Timeout Interceptor",
            "content": "Use RxJS timeout(5000) to cancel and return a 408 Request Timeout if a handler takes longer than 5 seconds."
      },
      {
            "title": "3. Binding with @UseInterceptors()",
            "content": "Bind interceptors to specific methods, controllers, or globally via app.useGlobalInterceptors()."
      }
],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      "title": "Manually Timing Every Controller Handler",
      "code": "// Bad: Duplicating stopwatch logic across controllers\n@Get()\ngetUsers() {\n  const t0 = performance.now();\n  const res = this.service.getUsers();\n  console.log('Took: ' + (performance.now() - t0));\n  return res;\n}",
      "explanation": "Writing timing boilerplate in each method violates DRY and is easy to miss."
},
    good: {
      "title": "Centralizing with an Interceptor",
      "code": "// Clean: Reusable interceptor\n@UseInterceptors(LoggingInterceptor)\n@Get()\ngetUsers() {\n  return this.service.getUsers();\n}",
      "explanation": "Interceptors encapsulate cross-cutting execution logic cleanly."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test an interceptor that formats responses:",
    starterCode: "import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';\nimport { Observable } from 'rxjs';\nimport { map } from 'rxjs/operators';\n\n@Injectable()\nexport class TransformInterceptor implements NestInterceptor {\n  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {\n    return next.handle().pipe(\n      map(data => ({ success: true, data, timestamp: new Date().toISOString() }))\n    );\n  }\n}",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "Which NestJS tool is designed to run code both BEFORE and AFTER a controller method executes?",
      "options": [
            "Interceptor",
            "Pipe",
            "DTO",
            "Module"
      ],
      "correctIndex": 0,
      "explanation": "Interceptors have access to the stream before and after handler execution via RxJS next.handle()."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Pre & Post Execution",
            "desc": "Interceptors run code before and after controller methods."
      },
      {
            "title": "RxJS Observable Stream",
            "desc": "Uses next.handle() with operators like tap() and map()."
      },
      {
            "title": "Ideal For Envelopes & Timing",
            "desc": "Standardizes response shapes, logging, and performance metrics."
      }
],
    nextLessonPreview: {
      "title": "The Request Lifecycle",
      "desc": "Review the complete order of middleware, guards, interceptors, pipes, and handlers."
},
  },
};
