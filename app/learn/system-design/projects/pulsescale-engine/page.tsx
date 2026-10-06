"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/app/learn/components/Footer";
import { InteractiveGrid } from "@/components/interactive-grid";
import { Playground } from "@/components/playground/Playground";
import {
  ArrowLeft,
  CheckCircle2,
} from "../../components/icons";
import { SYSTEM_DESIGN_CAPSTONE } from "../../data/system-design-curriculum";

const CAPSTONE_SIMULATION_CODE = `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SYSTEM DESIGN CAPSTONE: PULSESCALE NOTIFICATION DISPATCH ENGINE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Complete simulation of an industrial global notification delivery hub:
// 1. Ingestion Layer with JWT auth validation & schema parsing
// 2. Idempotency Filter: Prevents duplicate dispatches via key hashes
// 3. Recipient Rate Limiter: Sliding-window counter per user (e.g. max 5/min)
// 4. Priority Queue Router: Transactional (High) vs Marketing (Bulk)
// 5. Circuit Breaker & Upstream Failover: Detects gateway downtime & fails over
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class PulseScaleEngine {
  constructor() {
    this.idempotencyStore = new Set();
    this.rateLimitWindows = new Map(); // recipient -> timestamp array
    this.queues = {
      transactional: [],
      marketing: []
    };
    
    // Upstream Gateway Circuit Breaker
    this.primaryProvider = {
      name: "PrimarySMS-Gateway",
      consecutiveFailures: 0,
      state: "CLOSED", // CLOSED, OPEN, HALF_OPEN
      failureThreshold: 3
    };
    this.secondaryProvider = {
      name: "FallbackSMS-Gateway",
      healthy: true
    };

    this.dispatchedLog = [];
  }

  // 1. INGESTION & IDEMPOTENCY FILTER
  ingestEvent(event) {
    console.log(\`\\n[1. INGESTION] Event ID: \${event.id} | Recipient: \${event.recipient} | Type: \${event.type}\`);

    // Idempotency check
    if (this.idempotencyStore.has(event.idempotencyKey)) {
      console.warn(\`   ⚠️ [DUPLICATE DETECTED] Idempotency key "\${event.idempotencyKey}" already processed. Discarded.\`);
      return { success: false, reason: "Duplicate Request (Idempotent Hit)" };
    }
    this.idempotencyStore.add(event.idempotencyKey);

    // 2. RATE LIMITER (Max 3 messages per 60 seconds per recipient)
    const now = Date.now();
    const timestamps = this.rateLimitWindows.get(event.recipient) || [];
    const validTimestamps = timestamps.filter(t => now - t < 60000);

    if (validTimestamps.length >= 3) {
      console.error(\`   ❌ [RATE LIMITED] Recipient \${event.recipient} exceeded limit of 3 alerts/min!\`);
      return { success: false, reason: "Rate Limit Exceeded (HTTP 429)" };
    }

    validTimestamps.push(now);
    this.rateLimitWindows.set(event.recipient, validTimestamps);

    // 3. PRIORITY QUEUE ROUTING
    if (event.type === "TRANSACTIONAL") {
      this.queues.transactional.push(event);
      console.log("   ⚡ Enqueued to [TRANSACTIONAL_HIGH_PRIORITY_QUEUE]");
    } else {
      this.queues.marketing.push(event);
      console.log("   📦 Enqueued to [MARKETING_BULK_QUEUE]");
    }

    return { success: true, status: "QUEUED" };
  }

  // 4. DISPATCH WORKER WITH CIRCUIT BREAKER & FAILOVER
  async processNextMessage() {
    // Transactional messages are strictly dequeued first
    const msg = this.queues.transactional.shift() || this.queues.marketing.shift();
    if (!msg) return;

    console.log(\`\\n[WORKER DISPATCH] Processing alert for \${msg.recipient} via upstream provider...\`);

    // Check circuit breaker state
    let targetProvider = this.primaryProvider.name;
    if (this.primaryProvider.state === "OPEN") {
      targetProvider = this.secondaryProvider.name;
      console.warn(\`   ⚠️ [CIRCUIT OPEN] Primary provider down! Automatic failover to: \${targetProvider}\`);
    }

    // Simulate dispatch attempt
    const simulatedFailure = (msg.simulatePrimaryDown && targetProvider === this.primaryProvider.name);

    if (simulatedFailure) {
      this.primaryProvider.consecutiveFailures++;
      console.error(\`   💥 Primary Provider connection error! Failure count: \${this.primaryProvider.consecutiveFailures}\`);
      
      if (this.primaryProvider.consecutiveFailures >= this.primaryProvider.failureThreshold) {
        this.primaryProvider.state = "OPEN";
        console.error("   🚨 Circuit Breaker tripped to OPEN state! Switching all traffic to Secondary Gateway.");
      }

      // Re-enqueue message for instant retry on fallback gateway
      this.queues.transactional.unshift(msg);
      return;
    }

    // Success
    this.dispatchedLog.push({
      recipient: msg.recipient,
      provider: targetProvider,
      type: msg.type,
      timestamp: new Date().toISOString()
    });
    console.log(\`   ✅ [DELIVERED] Alert sent to \${msg.recipient} via \${targetProvider}\`);
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EXECUTION & VERIFICATION TEST SCENARIOS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const engine = new PulseScaleEngine();

console.log("🚀 Testing Scenario A: High-Priority Transactional OTP...");
engine.ingestEvent({
  id: "evt-101",
  idempotencyKey: "key-otp-001",
  recipient: "+1-555-0199",
  type: "TRANSACTIONAL",
  content: "Your security code is: 489201"
});
await engine.processNextMessage();

console.log("\\nTesting Scenario B: Duplicate Submission Handling...");
engine.ingestEvent({
  id: "evt-102",
  idempotencyKey: "key-otp-001", // Reusing same key
  recipient: "+1-555-0199",
  type: "TRANSACTIONAL",
  content: "Your security code is: 489201"
});

console.log("\\nTesting Scenario C: Recipient Rate Limiting...");
engine.ingestEvent({ id: "evt-103", idempotencyKey: "key-2", recipient: "+1-555-0199", type: "TRANSACTIONAL" });
engine.ingestEvent({ id: "evt-104", idempotencyKey: "key-3", recipient: "+1-555-0199", type: "TRANSACTIONAL" });
engine.ingestEvent({ id: "evt-105", idempotencyKey: "key-4", recipient: "+1-555-0199", type: "TRANSACTIONAL" }); // Must be blocked!

console.log("\\nTesting Scenario D: Primary Gateway Outage & Circuit Failover...");
// Queue 3 failing messages to trip the primary gateway circuit breaker
for (let i = 1; i <= 3; i++) {
  engine.ingestEvent({
    id: \`evt-fail-\${i}\`,
    idempotencyKey: \`fail-key-\${i}\`,
    recipient: \`+1-555-999\${i}\`,
    type: "TRANSACTIONAL",
    simulatePrimaryDown: true
  });
  await engine.processNextMessage();
}

// Now process the message that failed over
await engine.processNextMessage();

console.log("\\n✅ PULSESCALE ARCHITECTURE VERIFICATION COMPLETE");
`;

export default function SystemDesignCapstonePage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "capacity" | "queues" | "resilience"
  >("overview");

  return (
    <InteractiveGrid className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-purple-500/20 selection:text-purple-200">
      <Nav />

      <main className="flex-1 max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 w-full space-y-8">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/learn/system-design"
            className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to System Design Curriculum</span>
          </Link>
        </div>

        {/* Hero Banner */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[#0E121B] border border-white/[0.08] relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 space-y-4 max-w-4xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
                Final Capstone
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                +{SYSTEM_DESIGN_CAPSTONE.xpReward} XP Reward
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-mono text-slate-400">
                ⏱️ {SYSTEM_DESIGN_CAPSTONE.estimatedMinutes} Mins
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              {SYSTEM_DESIGN_CAPSTONE.title} — {SYSTEM_DESIGN_CAPSTONE.subtitle}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {SYSTEM_DESIGN_CAPSTONE.desc}
            </p>
          </div>
        </section>

        {/* Capstone Content Tabs */}
        <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3 overflow-x-auto">
          {[
            { id: "overview", label: "System Architecture Overview" },
            { id: "capacity", label: "Capacity & Back-of-Envelope" },
            { id: "queues", label: "Priority Queues & Idempotency" },
            { id: "resilience", label: "Circuit Breakers & Failover" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                  : "bg-[#0E121B] text-slate-400 hover:text-white border border-white/[0.08] hover:border-purple-500/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2 Cols): Active Tab Code / Specs */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === "overview" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-white">System Architecture & Component Boundaries</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  PulseScale is designed to ingest 100 million events per day across multi-tenant microservices.
                  It isolates burst incoming traffic using API gateways, verifies idempotency keys in high-speed in-memory caches,
                  separates urgent OTP dispatches from bulk marketing jobs using dedicated queues, and protects upstream SMS/Email providers.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#090C14] border border-white/[0.06] space-y-2">
                    <span className="text-xs font-bold text-purple-300">Ingestion Gateway & Auth</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Stateless API instances terminating TLS, validating client JWT signatures, and checking per-sender rate limits.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#090C14] border border-white/[0.06] space-y-2">
                    <span className="text-xs font-bold text-emerald-300">Queue Broker & Workers</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Durable priority queues backed by autoscaling consumer worker pools with backpressure throttling.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "capacity" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-white">Back-of-the-Envelope Capacity Calculations</h3>
                <pre className="p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-white/[0.08]">
{`# 1. Traffic Throughput
Daily Events:       100,000,000 events / day
Seconds in a day:   86,400 seconds (~100,000 for quick math)
Average RPS:        100,000,000 / 86,400 ≈ 1,160 RPS
Peak Factor:        8x (During flash sales / system alerts)
Peak RPS:           1,160 * 8 ≈ 9,280 RPS (~10,000 RPS)

# 2. Storage Estimation (Audit Trail)
Payload per event:  1 KB (metadata, recipient, message template)
Daily Storage:      100M * 1 KB = 100 GB / day
Annual Storage:     100 GB * 365 ≈ 36.5 TB / year (Retain 3 years in cold object store)

# 3. Cache Memory (Idempotency Window)
TTL Window:         24 hours (86,400 seconds)
Active Keys:        100,000,000 keys
Key Size:           64 bytes (Hash + Metadata)
Required RAM:       100M * 64 bytes = 6.4 GB RAM (Easily fits in single Redis cluster node)`}
                </pre>
              </div>
            )}

            {activeTab === "queues" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-white">Priority Queue Architecture & Idempotency Gate</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Promotional newsletters must never block time-sensitive 2-Factor Authentication (OTP) codes.
                  PulseScale enforces strict multi-lane queue topologies with independent worker allocations.
                </p>
                <pre className="p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-white/[0.08]">
{`// Idempotency Gate Implementation
async function handleIngest(req) {
  const { idempotencyKey, recipient, type, payload } = req.body;

  // 1. Atomic SETNX in distributed cache
  const acquired = await redis.set(\`idemp:\${idempotencyKey}\`, "PROCESSING", "NX", "EX", 86400);
  if (!acquired) {
    return { status: 409, message: "Duplicate event detected. Skipped." };
  }

  // 2. Route to appropriate isolated queue lane
  if (type === "TRANSACTIONAL") {
    await queue.publish("alerts.priority.high", payload); // Dedicated worker cluster
  } else {
    await queue.publish("alerts.marketing.bulk", payload); // Low-priority batch worker cluster
  }

  return { status: 202, message: "Accepted for delivery" };
}`}
                </pre>
              </div>
            )}

            {activeTab === "resilience" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-white">Circuit Breaker & Automatic Upstream Failover</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Third-party telecommunication gateways (Twilio, SendGrid, AWS SES) frequently experience transient brownouts.
                  When consecutive timeouts occur, the circuit breaker trips to OPEN, instantly rerouting traffic to secondary providers.
                </p>
                <pre className="p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-white/[0.08]">
{`class GatewayCircuitBreaker {
  constructor(primaryGateway, fallbackGateway) {
    this.primary = primaryGateway;
    this.fallback = fallbackGateway;
    this.state = "CLOSED"; // CLOSED, OPEN, HALF_OPEN
    this.failures = 0;
  }

  async send(message) {
    if (this.state === "OPEN") {
      // Direct pass to secondary fallback gateway without wasting time on dead primary
      return await this.fallback.dispatch(message);
    }

    try {
      const res = await this.primary.dispatchWithTimeout(message, 300); // 300ms timeout
      this.failures = 0;
      return res;
    } catch (err) {
      this.failures++;
      if (this.failures >= 3) {
        this.state = "OPEN";
        setTimeout(() => { this.state = "HALF_OPEN"; }, 30000); // Probe after 30s
      }
      // Instant failover to secondary
      return await this.fallback.dispatch(message);
    }
  }
}`}
                </pre>
              </div>
            )}

            {/* Interactive Simulation Playground */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">PulseScale Architecture Simulator</h3>
                <span className="text-xs font-mono text-purple-300 font-bold bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
                  Live System Simulation
                </span>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/[0.08]">
                <Playground runtime="javascript" starterCode={CAPSTONE_SIMULATION_CODE} height="500px" />
              </div>
            </div>
          </div>

          {/* Right Column (1 Col): Verification Checklist & Next Steps */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-4">
              <h3 className="text-base font-bold text-white">Verification Checklist</h3>
              <div className="space-y-3">
                {SYSTEM_DESIGN_CAPSTONE.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-purple-500/[0.05] border border-purple-500/20 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-white">System Design Mastery Achieved!</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                By completing the lessons and this capstone, you have demonstrated comprehensive competency
                in requirement scoping, capacity calculations, load balancing, caching architectures, database sharding,
                asynchronous decoupling, circuit breakers, and fault-tolerant system design.
              </p>
              <Link
                href="/learn/system-design/sys01-what-is-system-design"
                className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs text-center block transition-all shadow-md shadow-purple-600/20 cursor-pointer"
              >
                Review Course from Lesson 1
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </InteractiveGrid>
  );
}
