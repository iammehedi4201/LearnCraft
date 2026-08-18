"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  AnalogyBox,
  WhyBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 1 — THE BIG PICTURE (DEPLOYMENT, DOCKER & DEVOPS)
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: Production DevOps &amp; Deployment">
      {/* ── 1.1 Why Production DevOps ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="From Local 'Works on My Machine' to Zero-Downtime Global Cloud"
          description="Containerizing NestJS with multi-stage Docker builds, Kubernetes health probes, and graceful zero-downtime deployments."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🚀</span> The Final Frontier of Backend Engineering
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Writing elegant TypeScript controllers and Prisma database models is only half the journey. In production, your code must survive:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-ds-text-sub mb-3">
            <li><strong>Zero-Downtime Rolling Deploys:</strong> Upgrading servers while active users are completing Stripe payments.</li>
            <li><strong>Self-Healing Infrastructure:</strong> Kubernetes and AWS ECS automatically restarting frozen containers via Terminus health checks.</li>
            <li><strong>Ultra-Light Docker Images:</strong> Reducing 1.4GB development images down to 90MB Alpine containers with multi-stage builds.</li>
          </ul>
        </WhyBox>

        <AnalogyBox title="The Intermodal Standard Shipping Container">
          <p className="mb-2">
            Think of Docker and DevOps like <strong>Global Standard Shipping Containers</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-ds-text-sub">
            <li>
              <strong>Before Containers (1950):</strong> Cargo was packed in custom barrels and crates. Every crane, truck, and boat had to manually repack everything, leading to broken goods.
            </li>
            <li>
              <strong>With Docker Containers:</strong> Your NestJS application, Node.js runtime, Prisma engine, and system libraries are sealed inside a standardized ISO container. The container runs 100% identically on your laptop, a GitHub Actions test runner, AWS ECS, or a Kubernetes cluster!
            </li>
          </ul>
        </AnalogyBox>

        <EasyRuleCard rule="Always use Multi-Stage Dockerfiles (stripping TypeScript devDependencies), run as non-root user node, and enable Terminus health checks for Kubernetes probes." />

        <QuickCheck
          question="What is the primary benefit of a Multi-Stage Docker build for NestJS?"
          answer="It separates the heavy build environment (TypeScript compiler, @types packages, devDependencies) from the final production runtime, creating a lightweight (~90MB), secure container with zero build tools."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
