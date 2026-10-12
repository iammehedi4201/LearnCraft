/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SYSTEM DESIGN LESSON CONTENT ENGINE
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Authoritative 7-part interactive curriculum content for all System Design lessons:
 * 1. Mental Model & Architecture Overview
 * 2. Core Concepts & Component Roles
 * 3. Deep Dive & Architectural Mechanics
 * 4. Bad Architecture vs Better Architecture (Trade-off Matrix)
 * 5. Interactive System Playground / Simulator
 * 6. Knowledge Check & Architectural Reasoning Quiz
 * 7. Key Takeaways & System Design Interview Checklist
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import {
  ALL_SYSTEM_DESIGN_LESSONS,
} from "./system-design-curriculum";

export interface SystemDesignLessonContent {
  slug: string;
  sections: { id: string; title: string; badge?: string }[];
  part1: {
    title: string;
    bigPicture: string;
    breakdownTitle: string;
    breakdownItems: { title: string; desc: string }[];
  };
  part2: {
    title: string;
    intro: string;
    cards: {
      number: string;
      tag: string;
      color: "purple" | "emerald" | "cyan" | "amber" | "rose";
      title: string;
      description: string;
    }[];
    rule?: {
      title: string;
      content: string;
    };
  };
  part3: {
    title: string;
    intro: string;
    points: {
      title: string;
      content: string;
      codeSnippet?: string;
    }[];
  };
  part4: {
    title: string;
    bad: {
      title: string;
      code: string;
      explanation: string;
    };
    good: {
      title: string;
      code: string;
      explanation: string;
    };
  };
  part5: {
    title: string;
    intro: string;
    starterCode: string;
  };
  part6: {
    title: string;
    quiz: {
      question: string;
      options: string[];
      correctIndex: number;
      explanation: string;
    };
  };
  part7: {
    title: string;
    takeaways: { title: string; desc: string }[];
  };
}

const DEFAULT_SECTIONS = [
  { id: "part1", title: "Mental Model", badge: "Architecture" },
  { id: "part2", title: "Core Concepts", badge: "Components" },
  { id: "part3", title: "Deep Dive", badge: "Mechanics" },
  { id: "part4", title: "Bad vs Better", badge: "Trade-offs" },
  { id: "part5", title: "Playground", badge: "Simulation" },
  { id: "part6", title: "Knowledge Check", badge: "Quiz" },
  { id: "part7", title: "Takeaways", badge: "Checklist" },
];

// ─────────────────────────────────────────────────────────────
// Specific Curriculum Lessons
// ─────────────────────────────────────────────────────────────

const LESSON_SYS01: SystemDesignLessonContent = {
  slug: "sys01-what-is-system-design",
  sections: DEFAULT_SECTIONS,
  part1: {
    title: "What Is System Design & The Problem It Solves",
    bigPicture:
      "When an application runs on a single laptop, everything is simple: one CPU, one memory space, and zero network delays. But when millions of users arrive simultaneously, a single machine runs out of CPU, memory, disk, and socket connections. System Design is the discipline of architecting software systems across multiple machines so they remain available, fast, cost-effective, and easy to maintain as scale grows.",
    breakdownTitle: "The Core Transition: Code vs Architecture",
    breakdownItems: [
      {
        title: "From Lines of Code to System Components",
        desc: "Instead of focusing on loops and variables, System Design reasons about boundaries: clients, network gateways, compute services, caches, queues, and persistent storage engines.",
      },
      {
        title: "From 'Does It Work?' to 'How Does It Scale?'",
        desc: "A feature that functions for 10 users will often catastrophically fail at 100,000 requests per second due to locking, connection starvation, or memory exhaustion.",
      },
      {
        title: "The Reality of Network Latency",
        desc: "Inside a single machine, memory access takes ~100 nanoseconds. Over a datacenter network, an RPC call takes ~1 millisecond (10,000x slower). Over the public Internet, it takes ~50-200ms.",
      },
      {
        title: "The Trade-Off Mindset",
        desc: "There is no 'perfect' architecture in distributed systems. Every architectural decision exchanges one scarce resource (latency, consistency, cost, complexity) for another.",
      },
    ],
  },
  part2: {
    title: "The Problem-First Architectural Framework",
    intro:
      "Engineers do not add components because they look impressive on an architecture diagram. Components are added strictly to solve specific physical bottlenecks.",
    cards: [
      {
        number: "01",
        tag: "Compute Bottleneck",
        color: "rose",
        title: "Server CPU / RAM Overload",
        description:
          "Traffic exceeds single-server capability. Solution: Add horizontal stateless nodes behind a load balancer to distribute the request load.",
      },
      {
        number: "02",
        tag: "I/O Bottleneck",
        color: "amber",
        title: "Database Read Saturation",
        description:
          "Queries overwhelm disk I/O. Solution: Introduce an in-memory cache layer (Cache-Aside) and read replicas to absorb repetitive reads.",
      },
      {
        number: "03",
        tag: "Latency Cascades",
        color: "purple",
        title: "Synchronous Blocking Chains",
        description:
          "User requests wait for slow external operations (emails, analytics). Solution: Decouple tasks into asynchronous background worker queues.",
      },
    ],
    rule: {
      title: "The Golden Rule of System Design",
      content:
        "Never introduce an architectural component (cache, queue, sharded database) unless you can explicitly identify the exact bottleneck it solves and the new failure mode it introduces.",
    },
  },
  part3: {
    title: "Deep Dive: The Life of a Distributed Request",
    intro:
      "Trace how a single user action travels across distributed boundaries from browser to storage.",
    points: [
      {
        title: "1. DNS Resolution & Edge Routing",
        content:
          "The client resolves the domain name into an IP address via DNS. Edge Anycast routing directs the request to the nearest datacenter Point of Presence (PoP) to minimize physical fiber latency.",
        codeSnippet: `// 1. DNS & Layer 7 Gateway
User -> DNS Resolution -> Public IP
Request -> Edge CDN / Anycast PoP -> Cloud Gateway`,
      },
      {
        title: "2. Load Balancer & TLS Termination",
        content:
          "The Load Balancer terminates the expensive TLS/HTTPS handshake, runs health checks across available backend nodes, and forwards the clean HTTP request using round-robin or least-connections.",
      },
      {
        title: "3. Stateless Application Processing",
        content:
          "An application server validates headers, checks auth tokens, and queries the fast in-memory cache before hitting the relational database.",
        codeSnippet: `// 2. Read Path Optimization
async function getProduct(id) {
  // Check fast cache first (~1ms)
  const cached = await cache.get(\`prod:\${id}\`);
  if (cached) return cached;

  // Fallback to primary database (~20ms)
  const product = await db.query('SELECT * FROM products WHERE id = ?', [id]);
  await cache.set(\`prod:\${id}\`, product, { ttl: 300 });
  return product;
}`,
      },
    ],
  },
  part4: {
    title: "Monolithic Bottleneck vs Layered Decoupled Architecture",
    bad: {
      title: "The All-In-One Monolithic Server (SPOF)",
      code: `// ANTI-PATTERN: Everything running on one machine
[Browser]
    ↓ (HTTP)
[Single Server (Web + App + DB + File Storage on Disk)]
// Problems:
// 1. If CPU spikes from image resizing, user logins fail.
// 2. If the hard disk fills up, the database crashes.
// 3. Single Point of Failure: 1 crash = 100% outage for all users.`,
      explanation:
        "Tightly coupling compute, memory, database, and background processing onto a single node creates a catastrophic Single Point of Failure and prevents independent autoscaling.",
    },
    good: {
      title: "Decoupled Multi-Tier Topology",
      code: `// PRODUCTION-GRADE: Decoupled by Architectural Role
[Client Traffic]
       ↓
[Load Balancer] (Health checks & round-robin)
    ↙       ↘
[Server A]  [Server B] (Stateless compute instances)
    ↓           ↓
[In-Memory Cache Tier] (Absorbs 85% of repetitive reads)
    ↓
[Relational DB Primary] ──(Replication)──> [Read Replicas]
    ↓ (Async Events)
[Message Queue] ──> [Worker Pool] (Image processing & emails)`,
      explanation:
        "Each tier scales according to its specific bottleneck: compute instances scale on CPU, the cache tier scales on RAM, and database read replicas scale on query volume.",
    },
  },
  part5: {
    title: "Interactive System Simulator: Bottleneck Detection",
    intro:
      "Run this simulator to see what happens when user traffic scales from 100 RPS to 10,000 RPS on a single server versus a load-balanced cluster.",
    starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SYSTEM SIMULATOR: SINGLE NODE VS LOAD-BALANCED CLUSTER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class ServerNode {
  constructor(id, maxCapacityRPS = 1000) {
    this.id = id;
    this.maxCapacityRPS = maxCapacityRPS;
    this.currentLoad = 0;
  }

  handleRequests(rps) {
    this.currentLoad = rps;
    if (this.currentLoad > this.maxCapacityRPS) {
      const dropped = this.currentLoad - this.maxCapacityRPS;
      const latencyMs = 800 + Math.floor(Math.random() * 1200);
      return {
        status: "OVERLOADED",
        successRPS: this.maxCapacityRPS,
        droppedRPS: dropped,
        latencyMs,
        error: \`CPU Throttled! Dropped \${dropped} requests/sec\`
      };
    }
    return {
      status: "HEALTHY",
      successRPS: this.currentLoad,
      droppedRPS: 0,
      latencyMs: 35 + Math.floor((this.currentLoad / this.maxCapacityRPS) * 80),
      error: null
    };
  }
}

// 1. Single Node Architecture Under Peak Traffic (4,000 RPS)
console.log("=== SCENARIO 1: SINGLE SERVER UNDER 4,000 RPS ===");
const singleServer = new ServerNode("Server-1", 1000);
const singleResult = singleServer.handleRequests(4000);
console.log(singleResult);

// 2. Load-Balanced Cluster (4 Nodes x 1,000 RPS)
console.log("\\n=== SCENARIO 2: LOAD-BALANCED CLUSTER (4 NODES) ===");
const cluster = [
  new ServerNode("Node-A", 1000),
  new ServerNode("Node-B", 1000),
  new ServerNode("Node-C", 1000),
  new ServerNode("Node-D", 1000)
];

const totalRps = 4000;
const rpsPerNode = totalRps / cluster.length;

cluster.forEach(node => {
  const result = node.handleRequests(rpsPerNode);
  console.log(\`[\${node.id}] Status: \${result.status} | Latency: \${result.latencyMs}ms | Dropped: \${result.droppedRPS}\`);
});

console.log("\\n✅ Cluster successfully absorbed 4,000 RPS with zero dropped requests!");`,
  },
  part6: {
    title: "Knowledge Check: System Design Mental Model",
    quiz: {
      question:
        "Why is adding a cache or message queue not always the correct first step in system design?",
      options: [
        "Because caches and queues can only be used with NoSQL databases.",
        "Because every additional component introduces operational complexity, new failure modes, and consistency challenges.",
        "Because message queues always increase overall system latency by at least 10 seconds.",
        "Because caches do not work unless the application runs on a single physical machine.",
      ],
      correctIndex: 1,
      explanation:
        "Correct! In System Design, every component comes with trade-offs. Adding a cache introduces cache invalidation and consistency challenges; adding a queue introduces message ordering and at-least-once delivery issues. Components must only be added when solving a verified bottleneck.",
    },
  },
  part7: {
    title: "Key Takeaways & Architecture Principles",
    takeaways: [
      {
        title: "Think in Bottlenecks",
        desc: "Always ask: Where is the physical constraint? Is it CPU compute, RAM capacity, disk I/O throughput, or network bandwidth?",
      },
      {
        title: "Stateless Compute",
        desc: "Keep application servers stateless so any instance can handle any user request, allowing instant horizontal autoscaling.",
      },
      {
        title: "Every Solution Has a Trade-Off",
        desc: "There are no free lunches in distributed architecture. Every gain in scale or speed costs complexity, money, or consistency.",
      },
    ],
  },
};

const LESSON_SYS06: SystemDesignLessonContent = {
  slug: "sys06-load-balancers-and-reverse-proxies",
  sections: DEFAULT_SECTIONS,
  part1: {
    title: "Load Balancers, Reverse Proxies & Traffic Routing",
    bigPicture:
      "When you scale horizontally from 1 server to 10 servers, incoming user requests need a single point of entry that distributes the workload evenly. A Load Balancer acts as an intelligent traffic cop standing in front of your server pool, routing requests across healthy nodes, terminating TLS connections, and protecting backend instances from direct exposure to the public Internet.",
    breakdownTitle: "Key Roles of a Load Balancer",
    breakdownItems: [
      {
        title: "Traffic Distribution",
        desc: "Spreads millions of HTTP/TCP connections across dozens of backend application servers so no single machine becomes overwhelmed.",
      },
      {
        title: "Active Health Checks",
        desc: "Regularly pings backend nodes via heartbeat endpoints. If a server crashes, the load balancer automatically stops sending traffic to it in milliseconds.",
      },
      {
        title: "TLS / SSL Termination",
        desc: "Decrypts incoming HTTPS traffic at the edge, relieving backend application instances of CPU-heavy cryptographic handshakes.",
      },
      {
        title: "Layer 4 vs Layer 7 Routing",
        desc: "Layer 4 routes packets blindly based on IP and TCP port. Layer 7 inspects HTTP headers, cookies, and URL paths (e.g., routing /api/video to video servers).",
      },
    ],
  },
  part2: {
    title: "Balancing Algorithms & Routing Decisions",
    intro:
      "How does a load balancer decide which backend server receives the next incoming request?",
    cards: [
      {
        number: "01",
        tag: "Round Robin",
        color: "cyan",
        title: "Round Robin / Weighted Round Robin",
        description:
          "Sequentially loops through the list of servers (1, 2, 3, 1, 2, 3). Simple and predictable when all servers have equal hardware specifications.",
      },
      {
        number: "02",
        tag: "Least Connections",
        color: "purple",
        title: "Least Connections / Weighted",
        description:
          "Sends the request to the server currently processing the fewest active TCP connections. Ideal for long-lived requests such as file uploads or WebSocket streams.",
      },
      {
        number: "03",
        tag: "IP Hash",
        color: "emerald",
        title: "IP Hash / Sticky Sessions",
        description:
          "Hashes client IP to ensure requests from the same user consistently hit the same server node. Often used as a legacy bridge for stateful apps.",
      },
    ],
    rule: {
      title: "High Availability for the Balancer Itself",
      content:
        "A single load balancer is a Single Point of Failure (SPOF). Production systems always run active-passive or active-active pairs with Floating Virtual IPs (VRRP/Keepalived) and DNS Anycast.",
    },
  },
  part3: {
    title: "Deep Dive: Layer 4 vs Layer 7 Load Balancing",
    intro:
      "Understand the architectural trade-offs between transport-level and application-level routing.",
    points: [
      {
        title: "Layer 4 (Transport Layer - TCP/UDP)",
        content:
          "Operates at the network protocol layer without inspecting the payload. It only looks at Source IP, Destination IP, and Port. Because it does not decrypt or parse HTTP, it delivers extreme throughput with microsecond latency.",
      },
      {
        title: "Layer 7 (Application Layer - HTTP/HTTPS/gRPC)",
        content:
          "Terminates the TCP connection and inspects HTTP headers, cookies, request methods, and URI paths. Allows intelligent routing: routing /images/* to object storage, /auth/* to the auth cluster, and rate-limiting abusive User-Agents.",
        codeSnippet: `// Layer 7 Routing Rule Example (Nginx / HAProxy mental model)
if (request.path.startsWith("/api/checkout")) {
  routeTo(pool_checkout_servers); // High CPU priority
} else if (request.path.startsWith("/static")) {
  routeTo(pool_static_cdn);        // Fast cached static edge
} else {
  routeTo(pool_general_app);
}`,
      },
    ],
  },
  part4: {
    title: "Single Entry Bottleneck vs Redundant Load-Balanced Gateway",
    bad: {
      title: "Direct Client Connection to Single Server",
      code: `// ANTI-PATTERN: Client talks directly to public server IP
[Client] ──(Direct IP: 198.51.100.4)──> [Backend Server]
// If Server crashes: Total outage.
// If Server needs deployment: Total downtime during restart.
// No way to add second server without updating DNS globally (takes hours).`,
      explanation:
        "Direct client-to-server coupling exposes backend infrastructure directly to attacks, prevents zero-downtime rolling deployments, and provides zero automated failover.",
    },
    good: {
      title: "Redundant Layer 7 Load Balancer with Health Checks",
      code: `// PRODUCTION-GRADE: High-Availability Edge Balancer
[Clients (Anycast DNS)]
       ↓
[Virtual IP (Keepalived)]
   ├── [Active Load Balancer] (terminates TLS, checks health)
   └── [Passive Standby Balancer] (heartbeat takeover on crash)
              ↓
  ┌───────────┼───────────┐
  ↓           ↓           ↓
[Node 1]    [Node 2]    [Node 3] (Private subnet, internal IPs)`,
      explanation:
        "The load balancer abstracts backend server topology completely. Nodes can be added, patched, or taken offline for rolling deployments without dropping user requests.",
    },
  },
  part5: {
    title: "Interactive Playground: Round Robin vs Least Connections",
    intro:
      "Simulate how different balancing algorithms distribute fast requests vs slow blocking requests across a cluster.",
    starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SIMULATOR: ROUND ROBIN VS LEAST CONNECTIONS ALGORITHMS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class BackendNode {
  constructor(name) {
    this.name = name;
    this.activeConnections = 0;
  }
}

class LoadBalancer {
  constructor(nodes, algorithm = "round-robin") {
    this.nodes = nodes;
    this.algorithm = algorithm;
    this.rrIndex = 0;
  }

  routeNext() {
    if (this.algorithm === "round-robin") {
      const selected = this.nodes[this.rrIndex];
      this.rrIndex = (this.rrIndex + 1) % this.nodes.length;
      return selected;
    }

    if (this.algorithm === "least-connections") {
      // Find node with fewest active connections
      return this.nodes.reduce((minNode, currNode) => 
        currNode.activeConnections < minNode.activeConnections ? currNode : minNode
      );
    }
  }
}

// Setup 3 backend servers
const servers = [new BackendNode("Server-A"), new BackendNode("Server-B"), new BackendNode("Server-C")];

// Simulate: Server-B is currently bogged down with 8 heavy background reports
servers[1].activeConnections = 8;
servers[0].activeConnections = 1;
servers[2].activeConnections = 2;

console.log("=== CURRENT SERVER LOADS ===");
servers.forEach(s => console.log(\`\${s.name}: \${s.activeConnections} active requests\`));

// TEST 1: Round Robin (Blindly distributes without checking load)
console.log("\\n=== TEST 1: ROUND ROBIN (3 New Requests) ===");
const rrBalancer = new LoadBalancer(servers, "round-robin");
for (let i = 1; i <= 3; i++) {
  const chosen = rrBalancer.routeNext();
  console.log(\`Request #\${i} sent to: \${chosen.name} (Active: \${chosen.activeConnections})\`);
}

// TEST 2: Least Connections (Intelligently avoids bogged down Server-B)
console.log("\\n=== TEST 2: LEAST CONNECTIONS (3 New Requests) ===");
const lcBalancer = new LoadBalancer(servers, "least-connections");
for (let i = 1; i <= 3; i++) {
  const chosen = lcBalancer.routeNext();
  chosen.activeConnections++; // Simulate new connection
  console.log(\`Request #\${i} sent to: \${chosen.name} (New Active: \${chosen.activeConnections})\`);
}
`,
  },
  part6: {
    title: "Knowledge Check: Load Balancing & Layer 7",
    quiz: {
      question:
        "When would you choose Layer 7 load balancing over Layer 4 load balancing?",
      options: [
        "When you need maximum packet-per-second throughput and do not need to read HTTP headers.",
        "When you need to route requests to different server pools based on the URL path, HTTP cookies, or API headers.",
        "When your backend servers are using UDP streaming protocols instead of TCP.",
        "When you do not want to terminate TLS/HTTPS at the load balancer.",
      ],
      correctIndex: 1,
      explanation:
        "Correct! Layer 7 operates at the application layer, allowing the load balancer to inspect URL paths (e.g., routing /api/video vs /api/users to separate microservice clusters) and evaluate session cookies.",
    },
  },
  part7: {
    title: "Key Takeaways & Load Balancer Best Practices",
    takeaways: [
      {
        title: "Layer 4 vs Layer 7",
        desc: "Use Layer 4 for extreme throughput packet forwarding; use Layer 7 for intelligent HTTP path routing, auth token checks, and SSL termination.",
      },
      {
        title: "Health Checks Are Mandatory",
        desc: "Without active health checking, a load balancer will continue forwarding traffic into crashed servers, turning a single-node failure into a 33% outage.",
      },
      {
        title: "Avoid Sticky Sessions",
        desc: "Design stateless backends so any server can handle any request. Sticky sessions cause uneven traffic spikes when a few users perform heavy actions.",
      },
    ],
  },
};

// ─────────────────────────────────────────────────────────────
// Dynamic Lesson Content Generator for all 28 lessons
// ─────────────────────────────────────────────────────────────

export function getSystemDesignLessonContent(
  slug: string
): SystemDesignLessonContent {
  if (slug === "sys01-what-is-system-design") return LESSON_SYS01;
  if (slug === "sys06-load-balancers-and-reverse-proxies") return LESSON_SYS06;

  const found = ALL_SYSTEM_DESIGN_LESSONS.find((l) => l.slug === slug);
  const code = found?.code || "SYS";
  const name = found?.name || "System Design Topic";
  const desc =
    found?.desc ||
    "Master foundational principles, architectural trade-offs, and failure prevention in distributed systems.";

  return {
    slug,
    sections: DEFAULT_SECTIONS,
    part1: {
      title: `${name} — Architectural Purpose & Mental Model`,
      bigPicture: `${desc} In distributed systems, this component solves critical bottlenecks by establishing clear service boundaries, isolating failure domains, and ensuring predictable performance under scale.`,
      breakdownTitle: "Why This Architectural Problem Exists",
      breakdownItems: [
        {
          title: "The Physical Bottleneck",
          desc: "Hardware constraints (CPU saturation, disk I/O seek times, socket connection exhaustion) prevent naive single-tier implementations from scaling.",
        },
        {
          title: "The Architectural Solution",
          desc: `Applying ${name} decouples operations, introduces specialized storage/routing tiers, and prevents cascading outages across the cluster.`,
        },
        {
          title: "Request Flow Impact",
          desc: "Incoming traffic passes through deterministic layers, ensuring high availability, lower P99 latencies, and resilient failover.",
        },
        {
          title: "System Trade-Offs",
          desc: "Every architectural improvement introduces operational overhead, consistency considerations, or additional network hop latencies.",
        },
      ],
    },
    part2: {
      title: `${name} — Core Concepts & Role Boundaries`,
      intro: `Understand the fundamental responsibilities, placement, and invariants governing ${name} in real-world infrastructure.`,
      cards: [
        {
          number: "01",
          tag: "Primary Function",
          color: "purple",
          title: "Core Responsibility",
          description: `Directly mitigates system bottlenecks by managing data flow, compute isolation, or storage partitioning.`,
        },
        {
          number: "02",
          tag: "System Placement",
          color: "cyan",
          title: "Topology Boundary",
          description: `Sits between client gateways and core persistence, shielding backend datastores from direct client burst traffic.`,
        },
        {
          number: "03",
          tag: "Failure Mode",
          color: "rose",
          title: "Failure Isolation",
          description: `When this layer experiences degraded performance, circuit breakers and fallbacks prevent total system outage.`,
        },
      ],
      rule: {
        title: "Engineering Invariant",
        content: `Always design ${name} assuming network partitions, partial node failures, and high concurrency race conditions will happen in production.`,
      },
    },
    part3: {
      title: `Deep Dive: Engineering Mechanics of ${code}`,
      intro: `Analyze the internal protocols, data structures, and algorithms that make ${name} performant under enterprise load.`,
      points: [
        {
          title: "1. Operational Mechanics",
          content: `How ${name} coordinates across distributed nodes, manages state synchronization, and executes fast lookups.`,
          codeSnippet: `// Architectural Mechanics Representation
class DistributedCoordinator {
  async execute(request) {
    const validated = this.validateConstraints(request);
    const routedNode = this.selectHealthyTarget(validated);
    return await routedNode.process(validated);
  }
}`,
        },
        {
          title: "2. Throughput & Latency Optimization",
          content:
            "Minimizing serialization overhead, connection pooling, and leveraging batching pipelines to maximize IOPS efficiency.",
        },
        {
          title: "3. Resilience & Graceful Degradation",
          content:
            "Handling network partition spikes with exponential backoff, jitter, and fallback defaults instead of bubbling errors up to users.",
        },
      ],
    },
    part4: {
      title: "Bad Architecture vs Recommended Production Design",
      bad: {
        title: "Naive Unbounded Architecture",
        code: `// ANTI-PATTERN: Direct, unbounded, unthrottled access
async function handleUserAction(req) {
  // Synchronously hits primary database without cache or rate limiting
  const res = await db.rawQuery("SELECT * FROM large_table WHERE data = ?", [req.val]);
  // Blocks thread on third-party webhook
  await sendThirdPartyNotification(res);
  return res;
}`,
        explanation:
          "Lacks caching, rate limiting, and asynchronous decoupling. A burst of 1,000 requests per second will exhaust database connection pools and crash the application.",
      },
      good: {
        title: "Resilient Distributed Pattern",
        code: `// PRODUCTION-GRADE: Rate-limited, cached, and asynchronously decoupled
async function handleUserAction(req) {
  await rateLimiter.consume(req.userId); // 1. Guard against abuse
  
  const cached = await cache.get(req.cacheKey); // 2. Fast cache hit
  if (cached) return cached;
  
  const res = await db.query(req.query);
  await cache.set(req.cacheKey, res, { ttl: 300 });
  
  await queue.publish("events.notification", { id: res.id }); // 3. Async decoupling
  return res;
}`,
        explanation:
          "Protects resources at every step: rate limits abusive clients, absorbs 90% of read traffic in memory, and pushes slow tasks to asynchronous worker queues.",
      },
    },
    part5: {
      title: `Interactive Architecture Simulator: ${code}`,
      intro: `Run this live JavaScript simulation to test the architectural behavior, error handling, and latency profiles of ${name}.`,
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SYSTEM SIMULATION: ${code} - ${name.toUpperCase()}
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class ArchitectureSimulator {
  constructor() {
    this.processedCount = 0;
    this.failureCount = 0;
    this.latencyHistory = [];
  }

  simulateRequest(isPeakLoad = false) {
    const latency = isPeakLoad ? Math.floor(Math.random() * 250) + 120 : Math.floor(Math.random() * 25) + 5;
    this.latencyHistory.push(latency);
    
    if (isPeakLoad && Math.random() < 0.05) {
      this.failureCount++;
      return { success: false, latencyMs: latency, reason: "Transient Network Timeout" };
    }
    
    this.processedCount++;
    return { success: true, latencyMs: latency };
  }

  getP99Latency() {
    const sorted = [...this.latencyHistory].sort((a, b) => a - b);
    const p99Index = Math.floor(sorted.length * 0.99);
    return sorted[p99Index] || 0;
  }
}

const sim = new ArchitectureSimulator();

console.log("🚀 Executing Baseline Traffic (100 Requests)...");
for (let i = 0; i < 100; i++) sim.simulateRequest(false);

console.log("⚡ Executing Peak Load Spikes (50 Requests)...");
for (let i = 0; i < 50; i++) sim.simulateRequest(true);

console.log("\\n=== SIMULATION RESULTS ===");
console.log("Total Processed:", sim.processedCount);
console.log("Total Failures:", sim.failureCount);
console.log("P99 Latency:", sim.getP99Latency() + "ms");
console.log("\\n✅ System resilience thresholds verified successfully.");`,
    },
    part6: {
      title: `Knowledge Check: Architectural Reasoning for ${code}`,
      quiz: {
        question: `When designing for high scalability with ${name}, what is the most critical trade-off to consider?`,
        options: [
          "Hardware must always be upgraded to the largest single mainframe server available.",
          "Introducing additional components increases availability and scale, but introduces distributed consistency challenges and operational complexity.",
          "All network communication must be strictly synchronous HTTP calls without timeouts.",
          "Databases must never use primary keys or indexes under high throughput.",
        ],
        correctIndex: 1,
        explanation:
          "Correct! Every distributed architectural solution exchanges simplicity for scale. Adding layers (caches, replicas, queues) increases throughput but requires managing consistency, replication lag, and partial failure modes.",
      },
    },
    part7: {
      title: `Key Takeaways & Interview Checklist: ${code}`,
      takeaways: [
        {
          title: "Identify the Bottleneck First",
          desc: "Never propose an architecture component until you clarify whether the constraint is CPU, RAM, disk I/O, or network bandwidth.",
        },
        {
          title: "State Trade-Offs Explicitly",
          desc: "In system design interviews and production design docs, always state what you gain and what you give up (e.g., eventual consistency for lower latency).",
        },
        {
          title: "Design for Partial Failure",
          desc: "Networks will partition and servers will crash. Always include health checks, timeouts, retries with backoff, and circuit-breaker fallbacks.",
        },
      ],
    },
  };
}
