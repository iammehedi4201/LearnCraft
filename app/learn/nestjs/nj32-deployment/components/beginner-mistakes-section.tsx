"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 10 — TOP 5 BEGINNER DEPLOYMENT MISTAKES
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={10} title="Top 5 Beginner Deployment Mistakes">
      {/* ── Top Mistakes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Common DevOps &amp; Production Architecture Pitfalls"
          description="Avoid these common mistakes that lead to broken deployments or server security breaches."
          color="primary"
        />

        <MistakeBox
          title="Running Production Docker Containers as Root"
          description="Running as root allows attackers who exploit a vulnerability to gain root access to the host server kernel."
          wrong={`# ❌ Default root execution:
FROM node:20-alpine
CMD ["node", "dist/main.js"]`}
          right={`# ✅ Dropping privileges to unprivileged user:
FROM node:20-alpine
USER node
CMD ["dumb-init", "node", "dist/main.js"]`}
        />

        <MistakeBox
          title="Omitting enableShutdownHooks() in main.ts"
          description="When Kubernetes sends SIGTERM during a rolling deployment, NestJS ignores it until Docker forcefully kills it with SIGKILL, aborting active user requests."
          wrong={`// ❌ In-flight payments dropped during deployment:
const app = await NestFactory.create(AppModule);
await app.listen(3000);`}
          right={`// ✅ Clean draining of active HTTP requests and DB connections:
const app = await NestFactory.create(AppModule);
app.enableShutdownHooks();
await app.listen(3000);`}
        />

        <MistakeBox
          title="Running prisma migrate dev in CI/CD"
          description="'migrate dev' is interactive and generates new migrations; in production CI/CD always use 'migrate deploy'."
          wrong={`# ❌ Fails or prompts interactively in CI:
npx prisma migrate dev`}
          right={`# ✅ Applies pending migrations non-interactively:
npx prisma migrate deploy`}
        />

        <QuickCheck
          question="Why does running as 'USER node' enhance Docker container security?"
          answer="It ensures that if an attacker discovers a remote code execution vulnerability in a dependency, they cannot modify system packages, access root files, or break out of the container."
        />
      </div>
    </SectionContainer>
  );
}
