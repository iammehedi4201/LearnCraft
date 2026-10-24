import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nj18AuthenticationVsAuthorizationContent: StandardLessonContent = {
  slug: "nj18-authentication-vs-authorization",
  code: "NJ-18",
  title: "Authentication vs. Authorization",
  subtitle: "Authentication checks who you are; authorization checks what you are allowed to do.",
  difficulty: "Moderate",
  scenario: {
    question: "A user is signed in but tries to delete a course that only admins can delete. What must the application check?",
    answer: "Authentication confirms who the user is. Authorization must check whether that user has admin permission to delete the course.",
  },
  interviewQuestion: {
    question: "What is the difference between authentication and authorization?",
    answer: "Authentication checks who the user is; authorization checks what that user is allowed to do.",
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
    title: "Authentication vs. Authorization",
    bigPicture: "Authentication answers, “Who are you?” Authorization answers, “Are you allowed to do this?” They solve different problems and are often used together. For example: Authentication checks that a request belongs to a signed-in user. Authorization checks whether that user has permission to delete a course.",
    analogy: "Imagine entering a private office building: Showing your passport at the security desk to prove your identity is Authentication. Swiping your keycard to see if you have access to the Executive Penthouse floor is Authorization.",
    codeSnippet: "import {\n  CanActivate,\n  ExecutionContext,\n  Injectable,\n  UnauthorizedException,\n  ForbiddenException,\n} from '@nestjs/common';\n\n@Injectable()\nexport class RolesGuard implements CanActivate {\n  canActivate(context: ExecutionContext): boolean {\n    const request = context.switchToHttp().getRequest();\n    const user = request.user;\n\n    // 1. Authentication check\n    if (!user) {\n      throw new UnauthorizedException('Authentication required');\n    }\n\n    // 2. Authorization check\n    if (user.role !== 'admin') {\n      throw new ForbiddenException('Admin role required');\n    }\n\n    return true;\n  }\n}",
    breakdownTitle: "How the Example Works Step-by-Step",
    breakdownItems: [
      {
            "title": "1. Authentication Verification",
            "desc": "Checks if request.user exists (set by Passport/JWT middleware). If missing, throws 401 Unauthorized."
      },
      {
            "title": "2. Authorization Permission Check",
            "desc": "Checks user.role to see if the user is authorized to perform the action. If not, throws 403 Forbidden."
      },
      {
            "title": "3. Clean Error Separation",
            "desc": "401 means \"Log in first\", while 403 means \"You are logged in, but not permitted here\"."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "Two-Step Security Rule",
      "content": "Authenticate first to establish user identity, then authorize to verify permissions for the specific resource."
},
    cards: [
      {
            "number": "01",
            "tag": "AUTHN",
            "title": "Authentication (AuthN)",
            "description": "Identifies the caller via passwords, JWT tokens, or API keys; produces 401 if invalid.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "AUTHZ",
            "title": "Authorization (AuthZ)",
            "description": "Verifies permissions, roles, or ownership; produces 403 if rights are insufficient.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "STATUS",
            "title": "401 vs 403 Precision",
            "description": "401 means identity is unknown; 403 means identity is verified but permission is denied.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Applying AuthN and AuthZ in NestJS apps:",
    points: [
      {
            "title": "1. JWT Authentication Strategies",
            "content": "Passport strategies validate the JWT bearer token, decode the payload, and attach the user object to request.user."
      },
      {
            "title": "2. Role-Based Access Control (RBAC)",
            "content": "Attach roles using custom metadata decorators like @Roles('admin', 'instructor') and check them with a RolesGuard."
      },
      {
            "title": "3. Resource Ownership Checks",
            "content": "Authorization also includes checking if the current user owns the specific record (e.g. user.id === post.authorId)."
      }
],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      "title": "Returning 401 for Missing Permissions",
      "code": "// Bad: Confusing 401 and 403\nif (user.role !== 'admin') {\n  throw new UnauthorizedException(); // Misleading: implies they need to log in again!\n}",
      "explanation": "Returning 401 when the user is already logged in causes confusing client behavior (like logging out the user)."
},
    good: {
      "title": "Using Semantic 403 Forbidden",
      "code": "// Clean: Correct HTTP status codes\nif (!user) {\n  throw new UnauthorizedException('Sign in required'); // 401\n}\nif (user.role !== 'admin') {\n  throw new ForbiddenException('Admin role required'); // 403\n}",
      "explanation": "Using 401 for identity and 403 for permissions respects HTTP standards and frontend auth flows."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test checking identity vs roles in a guard:",
    starterCode: "import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';\n\n@Injectable()\nexport class AdminGuard implements CanActivate {\n  canActivate(context: ExecutionContext): boolean {\n    const req = context.switchToHttp().getRequest();\n    const user = req.user;\n\n    if (!user) throw new UnauthorizedException('Please log in');\n    if (user.role !== 'admin') throw new ForbiddenException('Access denied: Admins only');\n\n    return true;\n  }\n}",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "Which HTTP status code should be returned when a validly logged-in regular user attempts to access an admin-only endpoint?",
      "options": [
            "403 Forbidden",
            "401 Unauthorized",
            "200 OK",
            "404 Not Found"
      ],
      "correctIndex": 0,
      "explanation": "403 Forbidden is used when the user is authenticated (identity known) but lacks the required permissions or roles."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "AuthN vs AuthZ",
            "desc": "Authentication verifies identity; Authorization verifies permissions."
      },
      {
            "title": "401 vs 403",
            "desc": "Use 401 when identity is missing or invalid; use 403 when access is denied."
      },
      {
            "title": "Guards Implement Both",
            "desc": "NestJS guards enforce both token validation and role permissions."
      }
],
    nextLessonPreview: {
      "title": "Testing a NestJS Service",
      "desc": "Learn how to write fast, isolated unit tests for NestJS services."
},
  },
};
