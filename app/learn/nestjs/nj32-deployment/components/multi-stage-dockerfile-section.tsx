"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  PredictOutputBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 2 — MULTI-STAGE PRODUCTION DOCKERFILE
// ═══════════════════════════════════════════════════════════

export function MultiStageDockerfileSection() {
  return (
    <SectionContainer number={2} title="Production Multi-Stage Dockerfile">
      {/* ── 2.1 Multi-Stage Docker ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Building an Ultra-Secure 90MB Alpine Image"
          description="Separate compilation from execution, strip devDependencies, and drop root privileges."
          color="sky"
        />

        <EnhancedCodeBlock
          code={`# ── Stage 1: Base & Dependencies ──
FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci

# ── Stage 2: TypeScript & Prisma Builder ──
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build
RUN npm prune --production # ⭐ Strip out @types, jest, and devDependencies!

# ── Stage 3: Production Runner ──
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache dumb-init

# Security: Never run containers as root!
USER node

COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["dumb-init", "node", "dist/main.js"]`}
          language="dockerfile"
        />

        <PredictOutputBox
          code={`# Single Stage Dockerfile vs Multi-Stage Alpine
# Single stage image size: ~1.2 Gigabytes
# Multi-stage Alpine image size: ~92 Megabytes`}
          answer={`Predicted Build Outcome:\n\n1. Over 92% reduction in Docker image size (from 1.2GB down to 92MB)!\n2. 5x faster container deployment and pull times in Kubernetes.\n3. Zero security vulnerabilities from build tools (gcc, git, typescript compiler removed from runner).`}
        />

        <EasyRuleCard rule="Always run 'USER node' in your runner stage to prevent container-escape privilege escalation vulnerabilities." />

        <QuickCheck
          question="Why is 'dumb-init' used as the ENTRYPOINT/CMD wrapper in Node.js Docker containers?"
          answer="Node.js was not designed to run as PID 1; dumb-init properly forwards Unix signals (like SIGTERM) and reaps zombie child processes during container shutdowns."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
