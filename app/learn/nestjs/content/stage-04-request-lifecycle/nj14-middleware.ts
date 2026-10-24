import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nj14MiddlewareContent: StandardLessonContent = {
  slug: "nj14-middleware",
  code: "NJ-14",
  title: "Middleware",
  subtitle: "Middleware runs early in the request process, before the controller method handles the request.",
  difficulty: "Moderate",
  scenario: {
    question: "You want to log the URL of incoming requests before controllers handle them. Which NestJS feature can help?",
    answer: "Middleware, because it runs early and can inspect the incoming request.",
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
    title: "Middleware",
    bigPicture: "Middleware runs early in the request process, before the controller method. It is useful for work that applies broadly, such as logging that a request arrived.",
    analogy: "Middleware is like a security guard standing at the front entrance of a building. Every person entering the building must pass through the front doors, have their badge checked or logged into a visitor logbook, before being allowed into the elevators.",
    codeSnippet: "import { Injectable, NestMiddleware } from '@nestjs/common';\nimport { NextFunction, Request, Response } from 'express';\n\n@Injectable()\nexport class LoggerMiddleware implements NestMiddleware {\n  use(req: Request, res: Response, next: NextFunction) {\n    console.log(`[Request] ${req.method} ${req.originalUrl}`);\n    next();\n  }\n}",
    breakdownTitle: "How the Example Works Step-by-Step",
    breakdownItems: [
      {
            "title": "1. NestMiddleware Interface",
            "desc": "Implements the use(req, res, next) method standard in Express/Node.js."
      },
      {
            "title": "2. Request Inspection",
            "desc": "Accesses req.method and req.originalUrl to log incoming traffic details."
      },
      {
            "title": "3. Calling next()",
            "desc": "Calls next() to pass control to the next middleware or route handler. Forgetting next() hangs the request!"
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "Early Pipeline Rule",
      "content": "Use middleware for broad, transport-level tasks like request logging, header normalization, or rate-limiting that execute before route matching."
},
    cards: [
      {
            "number": "01",
            "tag": "LOGGING",
            "title": "Request Logging & Metrics",
            "description": "Logs timestamps, IP addresses, and HTTP verbs for all incoming requests.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "COMPAT",
            "title": "Express/Fastify Compatible",
            "description": "Works with existing Express ecosystem middleware like helmet, cors, and compression.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "MODULE",
            "title": "Configured in Modules",
            "description": "Applied via the NestModule configure() method to specific routes or wildcard paths.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Applying middleware in NestJS modules:",
    points: [
      {
            "title": "1. Binding in AppModule",
            "content": "Implement NestModule on AppModule and use consumer.apply(LoggerMiddleware).forRoutes('*') to apply logging globally."
      },
      {
            "title": "2. Functional Middleware",
            "content": "If your middleware has no dependencies, write it as a simple function: (req, res, next) => { ... next(); }."
      },
      {
            "title": "3. Don't Forget next()",
            "content": "Always call next() inside middleware, unless you intentionally send an early response with res.send()."
      }
],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      "title": "Forgetting to Call next()",
      "code": "// Bad: Request hangs forever\n@Injectable()\nexport class BrokenMiddleware implements NestMiddleware {\n  use(req: Request, res: Response, next: NextFunction) {\n    console.log(req.url);\n    // Missing next()! Client waits until connection timeout!\n  }\n}",
      "explanation": "If next() is omitted, NestJS never advances the request pipeline to the controller."
},
    good: {
      "title": "Always Invoking next()",
      "code": "// Clean: Passes control to next step\n@Injectable()\nexport class CleanMiddleware implements NestMiddleware {\n  use(req: Request, res: Response, next: NextFunction) {\n    console.log(req.url);\n    next(); // Crucial: pipeline continues\n  }\n}",
      "explanation": "Calling next() allows the request to reach guards, interceptors, and controller handlers."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Inspect a custom request logging middleware:",
    starterCode: "import { Injectable, NestMiddleware } from '@nestjs/common';\nimport { Request, Response, NextFunction } from 'express';\n\n@Injectable()\nexport class SimpleLoggerMiddleware implements NestMiddleware {\n  use(req: Request, res: Response, next: NextFunction) {\n    const start = Date.now();\n    console.log(`-> Incoming ${req.method} ${req.url}`);\n    next();\n  }\n}",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "What happens if a NestJS middleware does not call next() and does not end the response?",
      "options": [
            "The incoming client request will hang indefinitely until it times out",
            "NestJS automatically skips to the controller handler",
            "The server crashes with a segmentation fault",
            "The response is automatically converted to XML"
      ],
      "correctIndex": 0,
      "explanation": "Middleware in Node.js/Express must either call next() to pass control forward or explicitly terminate the response (e.g. res.status().send()), otherwise the request hangs."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Early Execution",
            "desc": "Middleware runs before guards, interceptors, and controller route handlers."
      },
      {
            "title": "Broad Scope",
            "desc": "Ideal for request logging, header manipulation, and third-party Express packages."
      },
      {
            "title": "Pipeline Flow",
            "desc": "Must call next() to advance execution through the request pipeline."
      }
],
    nextLessonPreview: {
      "title": "Guards and Route Protection",
      "desc": "Learn how guards check authentication and permissions to allow or deny route access."
},
  },
};
