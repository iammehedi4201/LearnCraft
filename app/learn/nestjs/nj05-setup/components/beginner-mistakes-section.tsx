"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 8 — BEGINNER MISTAKES & SETUP GOTCHAS
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={8} title="Beginner Mistakes & Setup Gotchas">
      {/* ── Top 4 Setup Mistakes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Common Setup Mistakes & How to Fix Them"
          description="Avoid these common gotchas when creating and running your first NestJS projects."
          color="primary"
        />

        <MistakeBox
          title="Running 'npm run start:dev' from the Wrong Folder"
          description="After running 'nest new my-api', developers often forget to 'cd my-api' before running start:dev, which causes 'Missing script: start:dev' error!"
          wrong={`# ❌ Forgetting to cd into the new project:
nest new my-api
npm run start:dev # Error: Missing script!`}
          right={`# ✅ Always cd into the folder first:
nest new my-api
cd my-api
npm run start:dev`}
        />

        <MistakeBox
          title="Port 3000 Already in Use (EADDRINUSE)"
          description="If you have Next.js, React, or another server running on port 3000, NestJS will crash with error EADDRINUSE."
          wrong={`// ❌ Hardcoded 3000 crashing when port is busy:
await app.listen(3000);`}
          right={`// ✅ Use a fallback port or environment variable:
const port = process.env.PORT || 4000;
await app.listen(port);`}
        />

        <MistakeBox
          title="Creating Files Manually and Forgetting AppModule"
          description="Creating a controller file manually with 'New File' in VS Code, but forgetting to add it to the controllers array in app.module.ts."
          wrong={`// ❌ Manually making users.controller.ts
// but leaving app.module.ts unchanged.
// Endpoint returns 404 Not Found!`}
          right={`// ✅ Use the CLI so it registers automatically:
nest g co users
// NestJS automatically updates app.module.ts!`}
        />

        <QuickCheck
          question="What should you do if your terminal says: 'Error: listen EADDRINUSE: address already in use :::3000'?"
          answer="Change the port in src/main.ts from 3000 to another number (like 3001 or 4000), or close the other program currently using port 3000."
        />
      </div>
    </SectionContainer>
  );
}
