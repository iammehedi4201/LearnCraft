import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const exp09RoutersAndOrganizingRoutesContent: StandardLessonContent = {
  slug: "exp09-routers-and-organizing-routes",
  code: "EXP-09",
  title: "Routers and Organizing Routes",
  subtitle: "Express Routers let you split and group related routes into modular files to keep large servers readable and maintainable.",
  difficulty: "Moderate",
  scenario: {
    question: "Your server has many user routes and the main file is becoming hard to read. What can you do?",
    answer: "Move related user routes into an Express Router and mount it under /users.",
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
    title: "Routers and Organizing Routes",
    bigPicture:
      "An Express Router lets you group related routes in a separate file. This keeps a growing server easier to read.",
    codeSnippet: `// routes/users.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([{ id: 1, name: 'Ava' }]);
});

module.exports = router;

// server.js
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);`,
    breakdownTitle: "How it works",
    breakdownItems: [
      {
        title: "1. Router definition",
        desc: "The router defines a route for `/` within the users group.",
      },
      {
        title: "2. Base path mounting",
        desc: "`app.use('/users', usersRouter)` adds `/users` as the base path.",
      },
      {
        title: "3. Combined endpoint",
        desc: "The combined endpoint becomes `GET /users`.",
      },
    ],
  },
  part2: {
    title: "Why Modular Routers Matter",
    intro:
      "As an application grows, having all routes in a single file becomes overwhelming. Express Router acts as a mini-application that can have its own middleware and routing rules, mounted cleanly onto the main app.",
    rule: {
      title: "Prefix Mounting Rule",
      content:
        "Routes inside an Express router are relative to the prefix where the router is mounted with app.use(). If router.get('/') is mounted at '/users', the route becomes GET /users.",
    },
    cards: [
      {
        number: "01",
        tag: "MODULARITY",
        title: "Separation of Concerns",
        description:
          "Keep each domain or resource (users, products, orders) in its own dedicated router file.",
        color: "purple",
      },
      {
        number: "02",
        tag: "MOUNT PATH",
        title: "Rooted Sub-paths",
        description:
          "Define paths relative to the router root (`/`, `/:id`). The mount path prefixes all routes.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "MIDDLEWARE",
        title: "Router-Level Middleware",
        description:
          "Apply middleware specifically to an entire group of routes by calling router.use() on that router instance.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "Scenario & Practical Organizing",
    intro: "Managing growing Express codebases cleanly:",
    points: [
      {
        title: "Organizing User Routes",
        content:
          "When server.js is becoming cluttered, create `routes/users.js`, export an Express router instance, and mount it with `app.use('/users', usersRouter)`.",
      },
      {
        title: "Router Reusability",
        content:
          "Routers can be nested and composed. A router can mount sub-routers to handle complex nested resources like `/users/:id/orders`.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Duplicating the mount path inside router handlers (e.g. `router.get('/users')` while mounting at `/users`), resulting in `/users/users`.",
    bad: {
      title: "Accidental Path Duplication",
      code: `// routes/users.js\nrouter.get('/users', (req, res) => {\n  res.json([]);\n});\n\n// server.js\napp.use('/users', usersRouter); // Creates GET /users/users!`,
      explanation:
        "The router is already mounted at '/users', so router.get('/users') matches '/users/users'.",
    },
    good: {
      title: "Relative Route Paths",
      code: `// routes/users.js\nrouter.get('/', (req, res) => {\n  res.json([]);\n});\n\n// server.js\napp.use('/users', usersRouter); // Matches GET /users`,
      explanation:
        "Use '/' inside the router; it correctly resolves to '/users' when mounted.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Experiment with an Express Router modular pattern:",
    starterCode: `const express = require('express');\nconst app = express();\n\nconst userRouter = express.Router();\nuserRouter.get('/', (req, res) => res.json([{ id: 1, name: 'Ava' }]));\nuserRouter.get('/:id', (req, res) => res.json({ id: req.params.id }));\n\napp.use('/users', userRouter);\n\nconsole.log("Mounted /users router successfully.");`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "Your server has many user routes and the main file is becoming hard to read. What can you do?",
      options: [
        "Move related user routes into an Express Router and mount it under /users.",
        "Delete all user routes to reduce line count.",
        "Combine all routes into a single gigantic inline string.",
        "Change the project language to HTML.",
      ],
      correctIndex: 0,
      explanation:
        "Express Router allows you to modularize routes into dedicated files and mount them under a base URL prefix such as /users.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "express.Router()",
        desc: "Creates a modular, isolated mini-app for handling a cohesive group of routes.",
      },
      {
        title: "app.use(path, router)",
        desc: "Mounts the router at a specific base path prefix.",
      },
      {
        title: "Relative Paths",
        desc: "Define routes within the router relative to its mount point.",
      },
    ],
  },
};
