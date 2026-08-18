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
// MODULE 1 — THE BIG PICTURE (FILE UPLOADS & CLOUD S3)
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: File Uploads &amp; AWS S3">
      {/* ── 1.1 Why S3 ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Why Production Apps Never Store Uploads on Local Disks"
          description="Stateless Docker containers, infinite cloud storage, and direct-to-S3 streaming architecture."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📦</span> The Ephemeral Container Trap
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            In local development, saving user avatars to <code>/uploads/avatar.png</code> on your hard drive works fine. But in cloud deployments (Kubernetes, AWS ECS, Heroku, Railway):
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-ds-text-sub mb-3">
            <li><strong>Containers are Disposable:</strong> Every time you deploy new code or scale containers up/down, local disk storage is wiped clean!</li>
            <li><strong>Multiple Replicas:</strong> If user Alice uploads a photo to Container #1, Container #2 will return <code>404 Not Found</code> when user Bob tries to view it.</li>
          </ul>
          <p className="text-xs sm:text-sm text-ds-text-strong leading-relaxed">
            <strong>Cloud Object Storage (AWS S3, Cloudflare R2, Google Cloud Storage)</strong> provides central, infinitely scalable, 99.999999999% durable storage accessible by all server replicas and global CDNs!
          </p>
        </WhyBox>

        <AnalogyBox title="The Airport Passenger Desk vs Direct Cargo Drop">
          <p className="mb-2">
            Think of cloud file uploads like luggage transport:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-ds-text-sub">
            <li>
              <strong>Server-Mediated Upload (Multer + S3):</strong> You hand your 50kg suitcase to the flight check-in agent (NestJS). The agent inspects weight and size, then loads it onto the airplane cargo hold (AWS S3).
            </li>
            <li>
              <strong>Pre-Signed Direct Upload (Client to S3):</strong> The agent hands you a temporary VIP security badge (Pre-Signed URL). You walk directly to the cargo bay and load your 2GB video file directly into AWS S3 without consuming any server CPU or bandwidth!
            </li>
          </ul>
        </AnalogyBox>

        <EasyRuleCard rule="For small files (< 5MB avatars), upload through NestJS with Multer. For large files (> 20MB videos), generate an S3 Pre-Signed URL so the frontend uploads directly to S3." />

        <QuickCheck
          question="Why should production Docker containers never save uploaded files to local disk paths like './uploads'?"
          answer="Because Docker containers have ephemeral file systems; any saved files will be permanently destroyed whenever the container restarts or redeploys."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
