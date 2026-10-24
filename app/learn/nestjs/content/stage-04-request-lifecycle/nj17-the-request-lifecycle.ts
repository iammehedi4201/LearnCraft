import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nj17TheRequestLifecycleContent: StandardLessonContent = {
  slug: "nj17-the-request-lifecycle",
  code: "NJ-17",
  title: "The Request Lifecycle",
  subtitle: "The deterministic sequence of steps an incoming request follows in NestJS.",
  difficulty: "Difficult",
  scenario: {
    question: "A request has invalid query parameters. Will your controller method run?",
    answer: "No. If a pipe checks the parameters and fails, NestJS sends an error response before the controller method runs.",
  },
  interviewQuestion: {
    question: "In what order do middleware, guards, pipes, and interceptors run?",
    answer: "Middleware runs first, then guards check access, interceptors start, pipes check and transform input, the controller handler runs, and the interceptor finishes the response.",
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
    title: "The Request Lifecycle",
    bigPicture: "The request lifecycle is the order NestJS uses to handle a request. Knowing the main order helps you understand why a request was blocked, changed, or failed before it reached a controller.",
    analogy: "The request lifecycle is like an assembly line: Raw materials arrive at the loading dock (Middleware) -> Security inspects the crew's badges (Guards) -> Timers and cameras turn on (Interceptors pre) -> Quality control tests the inputs (Pipes) -> The machine produces the item (Controller) -> The item is packaged and stamped (Interceptors post).",
    codeSnippet: "// 1. Incoming Request\n// 2. Middleware (runs early, broad logging)\n// 3. Guards (CanActivate - authentication & authorization)\n// 4. Interceptors (Pre-handler logic & timers start)\n// 5. Pipes (ValidationPipe - schema checking & data transformation)\n// 6. Controller Handler (Main business logic)\n// 7. Interceptors (Post-handler logic - response shaping & timers end)\n// 8. Exception Filters (Catches exceptions and formats error JSON)",
    breakdownTitle: "How the Example Works Step-by-Step",
    breakdownItems: [
      {
            "title": "1. Middleware",
            "desc": "Runs first at the Express level; logs requests and parses headers."
      },
      {
            "title": "2. Guards",
            "desc": "Evaluates authentication tokens and permissions before any controller processing."
      },
      {
            "title": "3. Interceptors (Pre)",
            "desc": "Starts stopwatches or opens transactions before the handler."
      },
      {
            "title": "4. Pipes",
            "desc": "Validates DTOs and converts parameter types right before the handler."
      },
      {
            "title": "5. Controller Handler",
            "desc": "Executes your custom business code."
      },
      {
            "title": "6. Interceptors (Post)",
            "desc": "Transforms the response or completes timing logs."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "Lifecycle Determinism Rule",
      "content": "Understand the lifecycle order to choose the right tool for the job. Do not validate in controllers when pipes run first; do not check auth in interceptors when guards run first."
},
    cards: [
      {
            "number": "01",
            "tag": "PIPELINE",
            "title": "Predictable Flow",
            "description": "Requests move through a strict, deterministic sequence of specialized stages.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "FAST_FAIL",
            "title": "Fail-Fast Optimization",
            "description": "Invalid or unauthorized requests are rejected early before running expensive database queries.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "DEBUG",
            "title": "Accurate Debugging",
            "description": "Knowing the lifecycle instantly tells you why a controller method didn't fire when a pipe failed.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Debugging request lifecycle issues:",
    points: [
      {
            "title": "1. Why Didn't My Handler Run?",
            "content": "If an endpoint never triggers its console.log(), check if a Guard returned false or a Pipe threw a Validation error earlier in the pipeline."
      },
      {
            "title": "2. Exception Filters Catch Everything",
            "content": "If an error occurs anywhere in guards, pipes, interceptors, or controllers, the Exception Filter catches it to format the HTTP response."
      },
      {
            "title": "3. Global vs Route Scopes",
            "content": "At each lifecycle step, Global elements run first, followed by Controller-scoped elements, followed by Method-scoped elements."
      }
],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      "title": "Checking Authorization in a Pipe",
      "code": "// Bad: Misusing a pipe for auth checking\n@Injectable()\nexport class WrongAuthPipe implements PipeTransform {\n  transform(value: any) {\n    if (!checkToken()) throw new UnauthorizedException();\n    return value;\n  }\n}",
      "explanation": "Pipes run after guards and interceptors, wasting execution time if the user is unauthorized."
},
    good: {
      "title": "Using Guards for Access and Pipes for Data",
      "code": "// Clean: Using the right tool at the right lifecycle stage\n// 1. Guard checks authorization:\n@UseGuards(AuthGuard)\n// 2. Pipe validates parameters:\n@Get(':id')\ngetOne(@Param('id', ParseIntPipe) id: number) {\n  return this.service.find(id);\n}",
      "explanation": "Using the proper lifecycle step keeps the pipeline efficient and idiomatic."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Review the high-level NestJS request processing pipeline:",
    starterCode: "// NestJS Request Processing Lifecycle Order:\n// [Client Request]\n//      ↓\n// 1. Middleware\n//      ↓\n// 2. Guards (CanActivate)\n//      ↓\n// 3. Interceptors (Pre-handler)\n//      ↓\n// 4. Pipes (Validation & Transformation)\n//      ↓\n// 5. Controller Route Handler\n//      ↓\n// 6. Interceptors (Post-handler & RxJS tap/map)\n//      ↓\n// 7. Exception Filters (if error thrown)\n//      ↓\n// [Client Response]",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "In the NestJS request lifecycle, which runs first: Guards or Pipes?",
      "options": [
            "Guards run first, then Pipes run after Interceptors",
            "Pipes run first, before Middleware",
            "They execute in parallel on separate threads",
            "Pipes only run after the controller returns"
      ],
      "correctIndex": 0,
      "explanation": "Guards run early to verify authentication and permissions. Pipes run later, immediately before the controller handler, to validate and transform inputs."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Deterministic Order",
            "desc": "Middleware -> Guards -> Interceptors (pre) -> Pipes -> Controller -> Interceptors (post)."
      },
      {
            "title": "Fail Fast",
            "desc": "Each stage can short-circuit the request if security or validation checks fail."
      },
      {
            "title": "Exception Filters",
            "desc": "Catch errors thrown anywhere in the lifecycle to generate standard error responses."
      }
],
    nextLessonPreview: {
      "title": "Authentication vs. Authorization",
      "desc": "Understand the core difference between identifying a user and checking permissions."
},
  },
};
