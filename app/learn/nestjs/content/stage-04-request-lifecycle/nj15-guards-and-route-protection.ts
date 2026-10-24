import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nj15GuardsAndRouteProtectionContent: StandardLessonContent = {
  slug: "nj15-guards-and-route-protection",
  code: "NJ-15",
  title: "Guards and Route Protection",
  subtitle: "A guard decides whether a request is allowed to continue to a route handler.",
  difficulty: "Difficult",
  scenario: {
    question: "Only signed-in users should open a private endpoint. Which feature can check the request before the controller method runs?",
    answer: "A guard can check whether the request is authenticated and allow it only when the check passes.",
  },
  interviewQuestion: {
    question: "What is the main job of a guard?",
    answer: "A guard decides whether a request can continue to the route handler, often based on identity or permissions.",
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
    title: "Guards and Route Protection",
    bigPicture: "A guard decides whether a request is allowed to continue to a route. Guards are often used for authentication checks and permissions.",
    analogy: "A guard is like a bouncer at the VIP entrance of a concert. Even if you made it into the building, the bouncer checks your wristband before letting you through the backstage door.",
    codeSnippet: "import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';\n\n@Injectable()\nexport class ExampleGuard implements CanActivate {\n  canActivate(context: ExecutionContext): boolean {\n    const request = context.switchToHttp().getRequest();\n    return Boolean(request.headers['authorization']);\n  }\n}",
    breakdownTitle: "How the Example Works Step-by-Step",
    breakdownItems: [
      {
            "title": "1. CanActivate Interface",
            "desc": "Guards implement CanActivate, requiring a canActivate(context) method."
      },
      {
            "title": "2. ExecutionContext",
            "desc": "Provides access to the current request, controller class, and handler method."
      },
      {
            "title": "3. Return Boolean or Promise",
            "desc": "Returning true allows the request through. Returning false causes NestJS to automatically return 403 Forbidden."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "Authorization Boundary Rule",
      "content": "Use guards for authentication checks and role-based permissions. Bind them using @UseGuards() at the controller or method level."
},
    cards: [
      {
            "number": "01",
            "tag": "ACCESS",
            "title": "Route Authorization",
            "description": "Decides whether the caller has the rights (token, role, permission) to execute the handler.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "CONTEXT",
            "title": "ExecutionContext Access",
            "description": "Can inspect metadata on the target handler, such as required roles or public route flags.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "FORBIDDEN",
            "title": "Automatic 403 / 401",
            "description": "Halts unauthorized requests immediately without running any controller logic.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Guards in production applications:",
    points: [
      {
            "title": "1. Binding with @UseGuards()",
            "content": "Add @UseGuards(AuthGuard) to a controller class to protect all routes, or to a single method to protect one endpoint."
      },
      {
            "title": "2. Difference from Middleware",
            "content": "Middleware has no knowledge of which controller handler will run next. Guards have access to the ExecutionContext and know the exact target class and method."
      },
      {
            "title": "3. Custom Exceptions",
            "content": "Instead of returning false (which gives a generic 403), guards can throw new UnauthorizedException('Token expired') for a specific 401 error."
      }
],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      "title": "Writing Auth Checks Inside Every Handler",
      "code": "// Bad: Duplicating auth checks in every controller method\n@Get('secret')\ngetSecret(@Req() req: any) {\n  if (!req.headers.authorization) {\n    throw new UnauthorizedException();\n  }\n  return { secret: 'data' };\n}",
      "explanation": "Manual checks in handlers are repetitive, easy to forget, and clutter business logic."
},
    good: {
      "title": "Using Declarative @UseGuards()",
      "code": "// Clean: Reusable guard applied declaratively\n@UseGuards(AuthGuard)\n@Get('secret')\ngetSecret() {\n  return { secret: 'data' };\n}",
      "explanation": "Guards cleanly separate access control from endpoint implementation."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Inspect an authentication guard implementation:",
    starterCode: "import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';\n\n@Injectable()\nexport class ApiKeyGuard implements CanActivate {\n  canActivate(context: ExecutionContext): boolean {\n    const req = context.switchToHttp().getRequest();\n    const apiKey = req.headers['x-api-key'];\n    if (!apiKey) {\n      throw new UnauthorizedException('Missing X-API-KEY header');\n    }\n    return true;\n  }\n}",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "What is the primary difference between middleware and a guard in NestJS?",
      "options": [
            "Guards have access to the ExecutionContext and specifically decide if a route handler may execute",
            "Guards run only in client-side React code",
            "Middleware can only return numbers",
            "Guards can never access request headers"
      ],
      "correctIndex": 0,
      "explanation": "Guards know which handler is about to be executed via ExecutionContext and specialize in authorization and permission decisions."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "CanActivate Contract",
            "desc": "Guards implement canActivate() returning a boolean or throwing an exception."
      },
      {
            "title": "Declarative Binding",
            "desc": "Bind guards using @UseGuards() at the class or method level."
      },
      {
            "title": "Authentication & Roles",
            "desc": "The canonical tool for protecting routes from unauthorized users."
      }
],
    nextLessonPreview: {
      "title": "Interceptors",
      "desc": "Learn how interceptors transform responses and measure execution time before and after handlers."
},
  },
};
