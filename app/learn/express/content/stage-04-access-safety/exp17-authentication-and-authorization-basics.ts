import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const exp17AuthenticationAndAuthorizationBasicsContent: StandardLessonContent = {
  slug: "exp17-authentication-and-authorization-basics",
  code: "EXP-17",
  title: "Authentication and Authorization Basics",
  subtitle: "Authentication identifies who the user is; authorization determines what actions they are permitted to perform.",
  difficulty: "Moderate",
  scenario: {
    question: "A logged-in user tries to delete an admin-only report. Does being logged in mean they are allowed?",
    answer: "No. Authentication proves who the user is; authorization checks whether that user has permission.",
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
    title: "Authentication and Authorization Basics",
    bigPicture:
      "Authentication asks, “Who are you?” Authorization asks, “Are you allowed to do this?” Express does not automatically provide a complete login system; applications add suitable authentication tools and checks.\n\nA protected route should check the user's identity and permissions before returning private data or changing it.",
    codeSnippet: `function requireAdmin(req, res, next) {
  // Example only: in a real app, use a trusted authentication system.
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  next();
}

app.delete('/admin/reports', requireAdmin, (req, res) => {
  res.json({ message: 'Report deleted' });
});`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Identity verification",
        desc: "Authentication middleware verifies the user and sets trusted user details on `req.user`.",
      },
      {
        title: "2. Role inspection",
        desc: "`requireAdmin` checks the user's role.",
      },
      {
        title: "3. 403 Forbidden rejection",
        desc: "If the user is not an admin, the route returns `403 Forbidden` and terminates.",
      },
      {
        title: "4. next() handoff",
        desc: "If the user is an admin, `next()` lets the request continue to the handler.",
      },
    ],
  },
  part2: {
    title: "Why Auth & Auth Distinction Matters",
    intro:
      "This snippet assumes earlier authentication middleware has set `req.user`. It is not a complete authentication system.\n\nMixing up authentication (401 Unauthorized) and authorization (403 Forbidden) is a common API design flaw.",
    rule: {
      title: "401 vs 403 Status Code Rule",
      content:
        "Return 401 Unauthorized when credentials are missing or invalid (unauthenticated). Return 403 Forbidden when the user is recognized but lacks permission for the specific action.",
    },
    cards: [
      {
        number: "01",
        tag: "AUTHENTICATION",
        title: "Who Are You?",
        description:
          "Verifies identity using tokens (JWT), sessions, or API keys, attaching authenticated user details to `req.user`.",
        color: "purple",
      },
      {
        number: "02",
        tag: "AUTHORIZATION",
        title: "What Can You Do?",
        description:
          "Enforces permissions, roles, or ownership rules (RBAC/ABAC) on the verified identity.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "MIDDLEWARE",
        title: "Composable Guards",
        description:
          "Apply auth middleware functions directly before specific route handlers: `app.delete(path, requireAdmin, handler)`.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "Scenario & Practical Permissions",
    intro: "Distinguishing identity from capability:",
    points: [
      {
        title: "Logged-In User Rights",
        content:
          "Just because a user holds a valid session does not grant them administrative capabilities. Authorization middleware must check roles (`role === 'admin'`).",
      },
      {
        title: "Decoupled Checks",
        content:
          "Run an `authenticate` middleware first across all private routes, then chain specialized guards like `requireAdmin` or `requireOwner` where needed.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Returning 401 instead of 403 when a recognized user attempts an unauthorized operation, causing client apps to wrongly clear login tokens.",
    bad: {
      title: "Confusing 401 and 403",
      code: `if (req.user.role !== 'admin') {\n  // Bad: 401 means 'please log in', causing client to logout valid user\n  return res.status(401).json({ error: 'Unauthorized' });\n}`,
      explanation:
        "401 triggers login prompts; 403 correctly tells the user they are forbidden from this action.",
    },
    good: {
      title: "Accurate HTTP Status Codes",
      code: `if (!req.user) {\n  return res.status(401).json({ error: 'Authentication required' });\n}\nif (req.user.role !== 'admin') {\n  return res.status(403).json({ error: 'Forbidden: Admins only' });\n}`,
      explanation:
        "401 for unauthenticated clients; 403 for authenticated clients lacking permission.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test authentication and authorization guard flow:",
    starterCode: `function guard(req, requiredRole) {\n  if (!req.user) return { status: 401, error: "Authentication required" };\n  if (req.user.role !== requiredRole) return { status: 403, error: "Forbidden" };\n  return { status: 200, message: "Access granted" };\n}\n\nconsole.log("Guest:", guard({}, 'admin'));\nconsole.log("Regular user:", guard({ user: { name: 'Bob', role: 'member' } }, 'admin'));\nconsole.log("Admin user:", guard({ user: { name: 'Ava', role: 'admin' } }, 'admin'));`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "A logged-in user tries to delete an admin-only report. Does being logged in mean they are allowed?",
      options: [
        "No. Authentication proves who the user is; authorization checks whether that user has permission.",
        "Yes, every logged-in user has full administrative privileges.",
        "Yes, databases do not distinguish between users.",
        "No, but the server will delete their account automatically.",
      ],
      correctIndex: 0,
      explanation:
        "Authentication validates user identity. Authorization enforces what that identified identity is permitted to do.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Authentication",
        desc: "Confirms user identity and attaches trusted user object to `req`.",
      },
      {
        title: "Authorization",
        desc: "Inspects roles and permissions to permit or deny specific actions (403 Forbidden).",
      },
      {
        title: "Route Guards",
        desc: "Chain middleware functions to guard individual routes or entire router groups.",
      },
    ],
  },
};
