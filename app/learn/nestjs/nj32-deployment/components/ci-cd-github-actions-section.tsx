"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 7 — CI/CD AUTOMATION WITH GITHUB ACTIONS
// ═══════════════════════════════════════════════════════════

export function CiCdGithubActionsSection() {
  return (
    <SectionContainer number={7} title="Automated CI/CD with GitHub Actions">
      {/* ── 7.1 GitHub Actions ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Automated Lint, Test, Build &amp; Deploy Pipeline"
          description="Build a production CI/CD workflow that tests every commit and deploys to Docker registry automatically."
          color="amber"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🚀</span> .github/workflows/deploy.yml
          </h4>
          <EnhancedCodeBlock
            code={`name: CI/CD Production Pipeline

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: TypeScript & Lint Check
        run: |
          npx tsc --noEmit
          npm run lint

      - name: Run Test Suites
        run: npm run test

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Log in to Docker Hub
        uses: docker/login-action@v3
        with:
          username: \${{ secrets.DOCKERHUB_USERNAME }}
          password: \${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and Push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: myorg/learncraft-api:latest,myorg/learncraft-api:\${{ github.sha }}`}
            language="yaml"
          />
        </WhyBox>

        <QuickCheck
          question="Why does the 'build-and-push' job declare 'needs: test'?"
          answer="It creates a dependency gate: Docker images are only built and pushed if all TypeScript checks, linters, and unit tests pass with zero errors."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
